/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IConnectionAdapter } from '@src/adapter/interface';
import { ConnectionAdapter }  from '@src/adapter';
import {
  ConnectionFailedException,
  InvalidConnectionUrlException,
  MissingConnectionException
} from '@src/exception';

describe('ConnectionAdapter', () => {
  let sut: IConnectionAdapter;

  beforeEach(async () => {
    if (sut && sut.getConnection()) {
      await sut.disconnect();
    }

    sut = new ConnectionAdapter();
  });

  it('disconnect requires a valid connection', async () => {
    try {
      await sut.disconnect();
    } catch (err) {
      expect(err).toBeInstanceOf(MissingConnectionException);
    }
  });

  it('connect throws exception on invalid url', async () => {
    try {
      await sut.connect('invalid url');
    } catch (err) {
      expect(err).toBeInstanceOf(InvalidConnectionUrlException);
    }
  });

  it('connect throws exception on api error', async () => {
    try {
      await sut.connect('amqp://admin:admin@localhost');
    } catch (err) {
      expect(err).toBeInstanceOf(ConnectionFailedException);
    }
  });

  it('can connect to server', async () => {
    try {
      const connection = await sut.connect('amqp://admin:admin@192.168.178.35:5672');

      expect(connection).not.toBeUndefined();

      await sut.disconnect();
    } catch (err) { }
  });
});
