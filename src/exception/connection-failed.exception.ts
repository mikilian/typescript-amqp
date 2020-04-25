/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

export class ConnectionFailedException {
  public constructor(
    public readonly message = 'failed to connect to amqp server'
  ) { }
}
