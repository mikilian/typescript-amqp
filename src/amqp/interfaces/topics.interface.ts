/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IAmqpSeverityMethod, IMessage } from '@src/amqp';

export type TopicsServerCallback = (msg: IMessage | null) => any;
export type ITopics              = IAmqpSeverityMethod<TopicsServerCallback>;
