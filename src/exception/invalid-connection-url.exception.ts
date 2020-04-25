/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

export class InvalidConnectionUrlException {
  public constructor(
    public readonly message = 'connection url does not match with regex pattern'
  ) { }
}
