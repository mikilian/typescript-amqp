/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { ConnectionAdapter } from '@src/adapter/connection.adapter';
import { IAmqp } from '@src/amqp/amqp.interface';
import { IListener } from '@src/amqp/interfaces/listener.interface';
import { MissingConnectionException } from '@src/exception';
import { AmqpListener } from '@src/amqp/impl';
import {
  IMessageParameterTransformer,
  IMessageTransformer,
  MessageParameterTransformer,
  MessageTransformer
} from '@src/transformer';
import { Connection } from 'amqplib';

export class Amqp extends ConnectionAdapter implements IAmqp {
  private readonly listeners = new Map<string, IListener>();

  public constructor(
    private readonly messageParameterTransformer: IMessageParameterTransformer = new MessageParameterTransformer(),
    private readonly messageTransformer:          IMessageTransformer          = new MessageTransformer()
  ) {
    super();
  }

  public createListener(queue: string): IListener {
    const connection = this.getConnection();

    if (connection == undefined) {
      throw new MissingConnectionException();
    }

    return this.prepareListener(queue, connection);
  }

  public getListener(queue: string): IListener | undefined {
    return this.listeners.get(queue);
  }

  private prepareListener(queue: string, connection: Connection): IListener {
    if (!this.listeners.has(queue)) {
      this.listeners.set(queue, new AmqpListener(
        queue,
        connection,
        this.messageParameterTransformer,
        this.messageTransformer
      ));
    }
    return this.listeners.get(queue) as IListener;
  }
}
