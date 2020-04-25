/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IUrlValidator } from './interface';

export class UrlValidator implements IUrlValidator {
  public isValid(url: string): boolean {
    UrlValidator.REGEX.lastIndex = 0;
    return UrlValidator.REGEX.test(url);
  }

  private static REGEX = /^amqp:\/\/(.+):(.+)(@)([a-zA-Z0-9.:]+)$/g;
}
