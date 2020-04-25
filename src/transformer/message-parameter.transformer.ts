/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { ITransformer } from './interface';

export type IMessageParameterTransformer = ITransformer<Buffer, string | object | Buffer>;

export class MessageParameterTransformer implements IMessageParameterTransformer {
  public transform(data: string | object | Buffer): Buffer {
    if (!(data instanceof Buffer)) {
      if (typeof data === 'string') {
        return Buffer.from(data);
      }
      return Buffer.from(JSON.stringify(data));
    }
    return data;
  }
}
