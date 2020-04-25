/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IAmqpMethod, IMessage } from './';

export type PublishSubscribeServerCallback = (msg: IMessage | null) => any;
export type IPublishSubscribe              = IAmqpMethod<void, PublishSubscribeServerCallback, void>;
