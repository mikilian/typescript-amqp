/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  AbstractAmqpConnection,
  IRouting,
  RoutingServerCallback, WorkerServerCallback
} from '../interfaces';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export class AmqpRouting extends AbstractAmqpConnection implements IRouting {
  public constructor(
    private readonly exchange:   string,
    connection:                  Connection,
    messageParameterTransformer: IMessageParameterTransformer,
    messageTransformer:          IMessageTransformer,
    consumeMessageTransformer:   IMessageTransformer
  )
  {
    super(connection, messageParameterTransformer, messageTransformer, consumeMessageTransformer);
  }

  public async create(severities: string[], callback: RoutingServerCallback): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertExchange(this.exchange, 'direct', { durable: false });
    const { queue } = await channel.assertQueue('', { exclusive: true });

    for (const severity of severities) {
      await channel.bindQueue(queue, this.exchange, severity);
    }

    await channel.consume(queue, msg => callback(this.consumeMessageTransformer.transform(msg)), {
      noAck: true
    });
  }

  public async send(severity: string, data: string): Promise<boolean>
  public async send(severity: string, data: object): Promise<boolean>
  public async send(severity: string, data: Buffer): Promise<boolean>
  public async send(severity: string, data: string | object | Buffer): Promise<boolean> {
    const channel = await this.connection.createChannel();

    await channel.assertExchange(this.exchange, 'direct', { durable: false });
    const status = channel.publish(this.exchange, severity, this.messageParameterTransformer.transform(data));

    await channel.close();
    return status;
  }
}
