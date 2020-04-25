/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';
import { IMessageTransformer } from '@src/transformer';

export abstract class AbstractAmqpConnection {
  protected constructor(
    protected readonly connection:         Connection,
    protected readonly messageTransformer: IMessageTransformer
  ) { }
}
