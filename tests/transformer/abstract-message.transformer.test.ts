/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { ITransformer }                   from '@src/transformer/interface';
import { IMessage }                       from '@src/amqp';
import { AbstractMessageTransformerFake } from './fixture/abstract-message-transformer.fake';
import { MessageStub }                    from './fixture/message.stub';

describe('AbstractMessageTransformer', () => {
  let sut: ITransformer<IMessage>;

  beforeEach(() => {
    sut = new AbstractMessageTransformerFake();
  });

  it('undefined transformation must return undefined', () => {
    const result = sut.transform(undefined);

    expect(result).toBeUndefined();
  });

  it('transformed result has two new methods', () => {
    const result = sut.transform(MessageStub);

    expect(result.text).not.toBeUndefined();
    expect(result.json).not.toBeUndefined();
  });

  it('json function returns an object', () => {
    const result = sut.transform(MessageStub);
    const obj    = result.json<{ message: string }>();

    expect(obj.message).not.toBeUndefined();
    expect(obj.message.length).toBeGreaterThan(0);
  });
});
