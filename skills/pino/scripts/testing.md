# testing

pino-test を使ったログ出力の検証

## pino-test のインストール

```sh
npm install pino-test --save-dev
```

## 単一ログの検証（Node.js test runner）

```js
const test = require('node:test')
const pino = require('pino')
const pinoTest = require('pino-test')

test('pino should log a info message', async () => {
  const stream = pinoTest.sink()
  const logger = pino(stream)
  logger.info('hello world')

  const expected = { msg: 'hello world', level: 30 }
  await pinoTest.once(stream, expected)
})
```

`pinoTest.sink()` で検証用ストリームを作成し、`pinoTest.once()` で単一ログをアサートする。

## 連続ログの検証

```js
logger.info('hello world')
logger.info('hi world')

const expected = [
  { msg: 'hello world', level: 30 },
  { msg: 'hi world', level: 30 }
]

await pinoTest.consecutive(stream, expected)
```

`pinoTest.consecutive()` で複数ログを順序付きでアサートする。
