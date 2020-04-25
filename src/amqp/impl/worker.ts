/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  AbstractAmqpConnection,
  IWorker,
  WorkerServerCallback
} from '../interfaces';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export class AmqpWorker extends AbstractAmqpConnection implements IWorker {
  public constructor(
    private readonly queue:      string,
    connection:                  Connection,
    messageParameterTransformer: IMessageParameterTransformer,
    messageTransformer:          IMessageTransformer,
    consumeMessageTransformer:   IMessageTransformer
  )
  {
    super(connection, messageParameterTransformer, messageTransformer, consumeMessageTransformer);
  }

  public async create(callback: WorkerServerCallback): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertQueue(this.queue, { durable: true });
    await channel.prefetch(1);
    await channel.consume(this.queue, msg => callback(channel, this.consumeMessageTransformer.transform(msg)), {
      noAck: false
    });
  }

  public async send(data: string): Promise<void>
  public async send(data: object): Promise<void>
  public async send(data: Buffer): Promise<void>
  public async send(data: string | object | Buffer): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertQueue(this.queue, { durable: true });
    await channel.sendToQueue(this.queue, this.messageParameterTransformer.transform(data), { persistent: true });
    await channel.close();
  }

}
