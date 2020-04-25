/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { GetMessageFields } from 'amqplib';
import { IMessage }         from './message.interface';

export interface IGetMessage extends IMessage {
  fields: GetMessageFields;
}

