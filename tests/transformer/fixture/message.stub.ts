/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { Message, MessageProperties } from 'amqplib';

export const MessageStub: Message = {
  content: Buffer.from('{"message":"some test"}'),
  fields: {
    deliveryTag: 1,
    redelivered: false,
    exchange: 'some exchange',
    routingKey: 'some routing key'
  },
  properties: {} as MessageProperties
};
