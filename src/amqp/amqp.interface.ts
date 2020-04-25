/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IConnectionAdapter } from '../adapter/interface/connection.adapter-interface';
import { IListener } from '@src/amqp/interfaces/listener.interface';

export interface IAmqp extends IConnectionAdapter {
  /**
   * @throws MissingConnectionException
   */
  createListener(queue: string): IListener;
  getListener(queue: string): IListener | undefined;
}
