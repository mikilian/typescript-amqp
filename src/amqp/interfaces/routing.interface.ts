/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */
import { IAmqpSeverityMethod, IMessage } from '@src/amqp';

export type RoutingServerCallback = (msg: IMessage | null) => any;
export type IRouting              = IAmqpSeverityMethod<RoutingServerCallback, boolean>;
