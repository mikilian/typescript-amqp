/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  AbstractAmqpConnection,
  IRpc,
  RpcServerCallback
} from '../interfaces';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export class AmqpRpc extends AbstractAmqpConnection implements IRpc {
  public constructor(
    private readonly queue:      string,
    connection:                  Connection,
    messageParameterTransformer: IMessageParameterTransformer,
    messageTransformer:          IMessageTransformer
  )
  {
    super(connection, messageParameterTransformer, messageTransformer);
  }

  public async create(callback: RpcServerCallback): Promise<void> {
    const channel = await this.connection.createChannel();

    await channel.assertQueue(this.queue, { durable: true });
    await channel.prefetch(1);
    await channel.consume(this.queue, msg => callback(channel, this.messageTransformer.transform(msg)));
  }

  public async send(data: string): Promise<Buffer>
  public async send(data: object): Promise<Buffer>
  public async send(data: Buffer): Promise<Buffer>
  public async send(data: string | object | Buffer): Promise<Buffer> {
    return new Promise<Buffer>(resolve => {
      // https://stackoverflow.com/a/2117523
      const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });

      return this.connection.createChannel()
        .then(channel => {
          return channel.assertQueue('', { exclusive: true })
            .then(queueData => {
              return channel.consume(queueData.queue, async msg => {
                if (msg && msg.properties.correlationId === id) {
                  await channel.deleteQueue(queueData.queue);
                  await channel.close();

                  resolve(msg.content);
                }
              }, { noAck: true })
                .then(() => channel.sendToQueue(
                  this.queue,
                  this.messageParameterTransformer.transform(data),
                  { correlationId: id, replyTo: queueData.queue }
                ))
            })
        })
    });
  }
}
