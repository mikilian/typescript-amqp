/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IConnectionAdapter } from './interface/connection.adapter-interface';
import { IUrlValidator }      from '../validator/interface/url.validator-interface';
import { UrlValidator }       from '../validator/url.validator';
import {
  connect,
  Connection,
  Options
} from 'amqplib';

import {
  ConnectionFailedException,
  InvalidConnectionUrlException, MissingConnectionException
} from '@src/exception';

export class ConnectionAdapter implements IConnectionAdapter {
  private connection: Connection | null = null;

  public constructor(
    private readonly urlValidator: IUrlValidator = new UrlValidator()
  ) { }

  public async connect(options: Options.Connect, socketOptions?: any): Promise<Connection>
  public async connect(url: string, socketOptions?: any): Promise<Connection>
  public async connect(options: Options.Connect | string, socketOptions?: any): Promise<Connection> {
    if (typeof options === 'string' && !this.urlValidator.isValid(options)) {
      throw new InvalidConnectionUrlException();
    }

    try {
      this.connection = await connect(options, socketOptions);
      return this.connection;
    } catch (err) {
      throw new ConnectionFailedException();
    }
  }

  public async disconnect(): Promise<void> {
    if (this.connection === null) {
      throw new MissingConnectionException();
    }

    await this.connection.close();

    this.connection = null;
  }

  public getConnection(): Connection | null {
    return this.connection;
  }
}
