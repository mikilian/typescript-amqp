/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IAmqpMethod, IMessage } from './';

export type ListenerServerCallback = (msg: IMessage | null) => any;
export type IListener = IAmqpMethod<void, ListenerServerCallback, void>;

