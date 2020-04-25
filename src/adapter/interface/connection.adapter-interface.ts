/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */
import { Connection, Options } from 'amqplib';

export interface IConnectionAdapter {
  /**
   * @throws ConnectionFailedException
   */
  connect(options: Options.Connect, socketOptions?: any): Promise<Connection>;
  /**
   * @throws ConnectionFailedException
   * @throws InvalidConnectionUrlException
   */
  connect(url: string, socketOptions?: any): Promise<Connection>;
  /**
   * @throws ConnectionFailedException
   * @throws InvalidConnectionUrlException
   */
  connect(options: Options.Connect | string, socketOptions?: any): Promise<Connection>;
  /**
   * @throws MissingConnectionException
   */
  disconnect(): Promise<void>;
  getConnection(): Connection | null;
}
