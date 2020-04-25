/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  AbstractAmqpConnection,
  ITopics,
  TopicsServerCallback
} from '../interfaces';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export class AmqpTopics extends AbstractAmqpConnection implements ITopics {
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

  public async create(severities: string[], callback: TopicsServerCallback): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertExchange(this.exchange, 'topic', { durable: false });
    const { queue } = await channel.assertQueue('', { exclusive: true });

    for (const key of severities) {
      await channel.bindQueue(queue, this.exchange, key);
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

    await channel.assertExchange(this.exchange, 'topic', { durable: false });
    const status = channel.publish(this.exchange, severity, this.messageParameterTransformer.transform(data));

    await channel.close();
    return status;
  }
}
