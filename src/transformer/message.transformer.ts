/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { AbstractMessageTransformer } from './message.abstract-transformer';
import { IMessage }                   from '../amqp/interfaces';
import { ITransformer }               from './interface';
import { Message }                    from 'amqplib';

export type IMessageTransformer = ITransformer<IMessage, Message | null>;
export class MessageTransformer extends AbstractMessageTransformer<IMessage> implements IMessageTransformer { }
