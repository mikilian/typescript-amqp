/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Message } from 'amqplib';

export interface IMessage extends Message {
  text(encoding?: string): string;
  json<T extends any>(): T;
}
