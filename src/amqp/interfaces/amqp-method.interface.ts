/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

export interface IAmqpMethod<TCreate, TCallback, TSend> {
  create(callback: TCallback): Promise<TCreate>;
  send(data: string): Promise<TSend>;
  send(data: object): Promise<TSend>;
  send(data: Buffer): Promise<TSend>;
  send(data: string | object | Buffer): Promise<TSend>;
}

export interface IAmqpSeverityMethod<TCallback> {
  create(severities: string[], callback: TCallback): Promise<void>;
  send(severity: string, data: string): Promise<void>;
  send(severity: string, data: object): Promise<void>;
  send(severity: string, data: Buffer): Promise<void>;
  send(severity: string, data: string | object | Buffer): Promise<void>;
}
