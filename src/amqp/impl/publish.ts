/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  AbstractAmqpConnection,
  IPublishSubscribe,
  PublishSubscribeServerCallback
} from '../interfaces';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export class AmqpPublishSubscribe extends AbstractAmqpConnection implements  IPublishSubscribe {
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

  public async create(callback: PublishSubscribeServerCallback): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertExchange(this.exchange, 'fanout', { durable: false });
    const queueData = await channel.assertQueue('', { exclusive: true });

    await channel.bindQueue(queueData.queue, this.exchange, '');
    await channel.consume(queueData.queue, msg => callback(this.consumeMessageTransformer.transform(msg)), {
      noAck: true
    });
  }

  public async send(data: string): Promise<void>
  public async send(data: object): Promise<void>
  public async send(data: Buffer): Promise<void>
  public async send(data: string | object | Buffer): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertExchange(this.exchange, 'fanout', { durable: false });
    await channel.publish(this.exchange, '', this.messageParameterTransformer.transform(data));
    await channel.close();
  }
}
