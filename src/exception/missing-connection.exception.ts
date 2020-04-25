/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

export class MissingConnectionException {
  public constructor(
    public readonly message = 'missing connection to an amqp server'
  ) { }
}
