/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import {
  IMessageParameterTransformer,
  IMessageTransformer
} from '../../transformer';

export abstract class AbstractAmqpConnection {
  protected constructor(
    protected readonly connection:                  Connection,
    protected readonly messageParameterTransformer: IMessageParameterTransformer,
    protected readonly messageTransformer:          IMessageTransformer,
    protected readonly consumeMessageTransformer:   IMessageTransformer
  ) { }
}
