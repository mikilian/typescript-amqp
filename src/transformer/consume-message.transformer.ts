/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { AbstractMessageTransformer } from './message.abstract-transformer';
import { IConsumeMessage }            from '../amqp';
import { ITransformer }               from './interface';
import { ConsumeMessage }             from 'amqplib';

export type IConsumeMessageTransformer = ITransformer<IConsumeMessage, ConsumeMessage | null>;
export class ConsumeMessageTransformer
  extends AbstractMessageTransformer<IConsumeMessage>
  implements  IConsumeMessageTransformer
{ }
