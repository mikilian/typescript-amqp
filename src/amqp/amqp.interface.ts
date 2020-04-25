/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IConnectionAdapter } from '../adapter';
import { IListener }          from '../amqp';

export interface IAmqp extends IConnectionAdapter {
  /**
   * @throws MissingConnectionException
   */
  createListener(queue: string): IListener;
  getListener(queue: string): IListener | undefined;
}
