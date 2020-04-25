/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */
import { AbstractMessageTransformer } from '@src/transformer/message.abstract-transformer';
import { IMessage }                   from '@src/amqp';

export class AbstractMessageTransformerFake extends AbstractMessageTransformer<IMessage> { }
