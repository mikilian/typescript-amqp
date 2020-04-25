/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { ConsumeMessageFields } from 'amqplib';
import { IMessage }             from './message.interface';

export interface IConsumeMessage extends IMessage {
  fields: ConsumeMessageFields;
}
