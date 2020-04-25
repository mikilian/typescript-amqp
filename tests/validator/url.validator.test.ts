/**
 * @author      Michael Kilian
 * @copyright   2020, https://github.com/michaelkilian
 * @license     MIT
 */

import { IUrlValidator } from '@src/validator/interface/url.validator-interface';
import { UrlValidator }  from '@src/validator/url.validator';

describe('UrlValidator', () => {
  let sut: IUrlValidator;

  beforeEach(() => {
    sut = new UrlValidator();
  });

  it('can parse localhost', () => {
    const valid = sut.isValid('amqp://admin:admin@localhost');

    expect(valid).toBeTruthy();
  });

  it('can parse url in connection url', () => {
    const valid = sut.isValid('amqp://admin:admin@rabbitmq.example.org');

    expect(valid).toBeTruthy();
  });

  it('can parse ipv4 in connection url', () => {
    const valid = sut.isValid('amqp://admin:admin@127.0.0.1:5672');

    expect(valid).toBeTruthy();
  });

  it('can not parse because of missing amqp begin', () => {
    const valid = sut.isValid('admin:admin@localhost');

    expect(valid).toBeFalsy();
  });

  it('can not parse because of missing server', () => {
    const valid = sut.isValid('amqp://admin:admin');

    expect(valid).toBeFalsy();
  });

  it('connection url does not begin with amqp', () => {
    const valid = sut.isValid(' amqp://admin:admin@localhost');

    expect(valid).toBeFalsy();
  });
});
