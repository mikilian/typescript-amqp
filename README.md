# typescript-amqp

> Development of `typescript-amqp` takes place in branch `develop`. Do not push to the `master` branch!

`typescript-amqp` was developed to facilitate the use of the [amqplib](https://github.com/squaremo/amqp.node) and to
avoid code duplication.

# Installation

```bash
yarn add typescript-amqp
```

## Advantages

-[x] native TypeScript support
-[x] easy usage

## Supports

-[x] basic listener (e.g. [Hello World!](https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html))
-[x] [Work queues](https://www.rabbitmq.com/tutorials/tutorial-two-javascript.html)
-[x] [Publish/Subscribe](https://www.rabbitmq.com/tutorials/tutorial-three-javascript.html)
-[x] [Routing](https://www.rabbitmq.com/tutorials/tutorial-four-javascript.html)
-[x] [Topics](https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html)
-[x] [Remote procedure call (RPC)](https://www.rabbitmq.com/tutorials/tutorial-six-javascript.html)
-[ ] [Publisher Confirms](https://www.rabbitmq.com/tutorials/tutorial-seven-java.html)

## Amqp

Must be created once and includes the connection as well as any methods.

```TypeScript
import { Amqp } from 'typescript-amqp'

const amqp = new Amqp();
```

### .connect(options, socketOptions?)

> Establishes a connection to the server.

- `options` - `string` or `amqplib.Options.Connect`
    - If the type is `string`, then it must be a valid amqp-url string (`amqp://user:password@server`)!
- socketOptions - (_optional_) `object`

**returns** `Promise<amqplib.Connection>`

### .disconnect()

> Disconnects the connection to the server.

**returns** `Promise<void>`

### .getConnection()

> Returns the current (existing) connection to the server.

**returns** `amqplib.Connection | undefined`

### .createListener(queue)

- `queue` - `string` Name of the server queue

**returns** `AmqpListener`

### .getListener(queue)

- `queue` - `string` Name of the server queue

**returns** `AmqpListener` if `queue` could be found, `undefined` otherwise.

### .createRpc(queue)

- `queue` - `string` Name of the server queue

**returns** `AmqpRpc`

### .getRpc(queue)

- `queue` - `string` Name of the server queue

**returns** `AmqpRpc` if `queue` could be found, `undefined` otherwise.

### .createWorker(queue)

- `queue` - `string` Name of the server queue

**returns** `AmqpWorker`

### .getWorker(queue)

- `queue` - `string` Name of the server queue

**returns** `AmqpWorker` if `queue` could be found, `undefined` otherwise.

### .createPublisherAndSubscriber(exchange)

- `exchange` - `string` Name of the server exchange

**returns** `AmqpPublishSubscribe`

### .getPublisherAndSubscriber(exchange)

- `exchange` - `string` Name of the server exchange

**returns** `AmqpPublishSubscribe` if `exchange` could be found, `undefined` otherwise.

### .createRouting(exchange)

- `exchange` - `string` Name of the server exchange

**returns** `AmqpRouting`

### .getRouting(exchange)

- `exchange` - `string` Name of the server exchange

**returns** `AmqpRouting` if `exchange` could be found, `undefined` otherwise.

### .createTopics(exchange)

- `exchange` - `string` Name of the server exchange

**returns** `AmqpTopics`

### .getTopics(exchange)

- `exchange` - `string` Name of the server exchange

**returns** `AmqpTopics` if `exchange` could be found, `undefined` otherwise.

## AmqpListener

### .create(callback)

- `callback` - `ListenerServerCallback`
  - `(msg: IMessage | null) => any`

**returns** `Promise<void>`

### .send(mesage)

- `message`
  - `string`
  - `object`
  - `Buffer`

**returns** `Promise<boolean>`

## AmqpPublishSubscribe

### .create(callback)

- `callback` - `PublishSubscribeServerCallback`
  - `(msg: IMessage | null) => any`

**returns** `Promise<void>`

### .send(mesage)

- `message`
  - `string`
  - `object`
  - `Buffer`

**returns** `Promise<boolean>`

## AmqpRouting

### .create(callback)

- `callback` - `RoutingServerCallback`
  - `(msg: IMessage | null) => any`

**returns** `Promise<void>`

### .send(mesage)

- `message`
  - `string`
  - `object`
  - `Buffer`

**returns** `Promise<boolean>`

## AmqpRpc

### .create(callback)

- `callback` - `RpcServerCallback`
  - `(channel: amqplib.Channel, msg: IMessage | null) => any`

**returns** `Promise<void>`

### .send(mesage)

- `message`
  - `string`
  - `object`
  - `Buffer`

**returns** `Promise<Buffer>`

## AmqpTopics

### .create(severities, callback)

- `severities` - `string[]`
- `callback` - `TopicsServerCallback`
  - `(msg: IMessage | null) => any`

**returns** `Promise<void>`

### .send(severity, mesage)

- `severity` - `string`
- `message`
  - `string`
  - `object`
  - `Buffer`

**returns** `Promise<boolean>`

## AmqpTopics

### .create(severities, callback)

- `severities` - `string[]`
- `callback` - `WorkerServerCallback`
  - `(channel: amqplib.Channel, msg: IMessage | null) => any`

**returns** `Promise<void>`

### .send(severity, mesage)

- `severity` - `string`
- `message`
  - `string`
  - `object`
  - `Buffer`

**returns** `Promise<boolean>`
