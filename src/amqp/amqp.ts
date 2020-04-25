/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { AmqpListener }                from './impl';
import { ConnectionAdapter }           from '../adapter';
import { IAmqp }                       from './amqp.interface';
import { IListener }                   from './interfaces';
import { MissingConnectionException }  from '../exception';
import {
  IMessageParameterTransformer,
  IMessageTransformer,
  MessageParameterTransformer,
  MessageTransformer
} from '../transformer';
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
