/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection }                   from 'amqplib';
import { AmqpMethodConstructor, IAmqp } from './amqp.interface';
import { AmqpListener, AmqpRpc }        from './impl';
import { ConnectionAdapter }            from '../adapter';
import { IListener, IRpc }              from './interfaces';
import { MissingConnectionException }   from '../exception';
import {
  IMessageParameterTransformer,
  IMessageTransformer,
  MessageParameterTransformer,
  MessageTransformer
} from '../transformer';

export class Amqp extends ConnectionAdapter implements IAmqp {
  private readonly listener = new Map<string, IListener>();
  private readonly rpc      = new Map<string, IRpc>();

  public constructor(
    private readonly messageParameterTransformer: IMessageParameterTransformer = new MessageParameterTransformer(),
    private readonly messageTransformer:          IMessageTransformer          = new MessageTransformer()
  ) {
    super();
  }

  public createListener(queue: string): IListener {
    return this.createStub(queue, this.listener, AmqpListener);
  }

  public getListener(queue: string): IListener | undefined {
    return this.listener.get(queue);
  }

  public createRpc(queue: string): IRpc {
    return this.createStub(queue, this.rpc, AmqpRpc);
  }

  public getRpc(queue: string): IRpc | undefined {
    return this.rpc.get(queue);
  }

  private createStub<T>(queue: string, map: Map<string, T>, classData: AmqpMethodConstructor<T>): T {
    const connection = this.getConnection();

    if (connection == undefined) {
      throw new MissingConnectionException();
    }

    return this.prepare(queue, connection, map, classData);
  }

  private prepare<T>(
    queue:      string,
    connection: Connection,
    map:        Map<string, T>,
    classData:  AmqpMethodConstructor<T>
  ): T {
    if (!map.has(queue)) {
      map.set(queue, new classData(
        queue,
        connection,
        this.messageParameterTransformer,
        this.messageTransformer
      ));
    }
    return map.get(queue) as T;
  }
}
