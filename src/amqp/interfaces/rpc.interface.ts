/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IAmqpMethod, IMessage } from './';
import { Channel }               from 'amqplib';

export type RpcServerCallback = (channel: Channel, msg: IMessage | null) => any;
export type IRpc              = IAmqpMethod<void, RpcServerCallback, Buffer>;
