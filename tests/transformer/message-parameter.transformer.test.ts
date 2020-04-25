/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import {
  IMessageParameterTransformer,
  MessageParameterTransformer
} from '@src/transformer/message-parameter.transformer';

describe('MessageParameterTransformer', (): void => {
  let sut: IMessageParameterTransformer;

  beforeEach(() => {
    sut = new MessageParameterTransformer();
  });

  it('can transform an object', () => {
    const obj = {
      message: 'test'
    };

    const result = sut.transform(obj);

    expect(result).toStrictEqual(Buffer.from(JSON.stringify(obj)));
  });

  it('can transform a string', () => {
    const str = 'test';

    const result = sut.transform(str);

    expect(result).toStrictEqual(Buffer.from(str));
  });

  it('will return input buffer', () => {
    const buffer = Buffer.from('test');
    const result = sut.transform(buffer);

    expect(result).toStrictEqual(buffer);
  });
});
