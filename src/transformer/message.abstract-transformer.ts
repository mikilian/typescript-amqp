/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IMessage }     from '../amqp';
import { ITransformer } from './interface';
import { Message }      from 'amqplib';

export abstract class AbstractMessageTransformer<T extends IMessage> implements ITransformer<T, Message | null> {
  public transform(data: Message): T {
    const response = data as unknown as T;

    if (response != undefined) {
      response.text = (encoding?: string): string => {
        return response.content.toString(encoding || 'utf-8');
      };

      response.json = <T extends any>(): T => {
        return JSON.parse(response.text());
      };
    }

    return response;
  }
}
