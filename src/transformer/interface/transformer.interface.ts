/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

export interface ITransformer<T> {
  transform<From>(data: From): T;
}
