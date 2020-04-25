/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  AbstractAmqpConnection,
  IListener,
  IMessage
} from '../interfaces';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export class AmqpListener extends AbstractAmqpConnection implements IListener {
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

  public async create(callback: (msg: IMessage | null) => any) {
    const channel = await this.connection.createChannel();

    await channel.assertQueue(this.queue, { durable: false });
    await channel.consume(this.queue, msg => callback(this.consumeMessageTransformer.transform(msg)), {
      noAck: true
    });
  }

  public async send(data: string): Promise<void>
  public async send(data: object): Promise<void>
  public async send(data: Buffer): Promise<void>
  public async send(data: string | object | Buffer): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertQueue(this.queue, { durable: false });
    await channel.sendToQueue(this.queue, this.messageParameterTransformer.transform(data));
    await channel.close();
  }
}
