/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { AbstractMessageTransformer } from './message.abstract-transformer';
import { IMessage }                   from '../amqp/interfaces';

export class MessageTransformer extends AbstractMessageTransformer<IMessage> { }
