/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Connection } from 'amqplib';

export abstract class AbstractAmqpConnection {
  public constructor(
    protected readonly connection: Connection
  ) { }
}
