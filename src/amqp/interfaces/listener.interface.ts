/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IMessage } from './';

export interface IListener {
  create(callback: (msg: IMessage | null) => any): Promise<void>;
  send(data: string): Promise<void>;
  send(data: object): Promise<void>;
  send(data: Buffer): Promise<void>;
  send(data: string | object | Buffer): Promise<void>;
}
