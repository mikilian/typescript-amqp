/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection }                 from 'amqplib';
import { ConnectionAdapter }          from '../adapter';
import { MissingConnectionException } from '../exception';
import {
  AmqpMethodConstructor,
  IAmqp
} from './amqp.interface';
import {
  IListener,
  IRpc,
  IWorker
} from './interfaces';
import {
  AmqpListener,
  AmqpRpc,
  AmqpWorker
} from './impl';
import {
  IMessageParameterTransformer,
  IMessageTransformer,
  MessageParameterTransformer,
  MessageTransformer
} from '../transformer';

export class Amqp extends ConnectionAdapter implements IAmqp {
  private readonly listener = new Map<string, IListener>();
  private readonly rpc      = new Map<string, IRpc>();
  private readonly worker   = new Map<string, IWorker>();

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

  public createWorker(queue: string): IWorker {
    return this.createStub(queue, this.worker, AmqpWorker);
  }

  public getWorker(queue: string): IWorker | undefined {
    return this.worker.get(queue);
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
