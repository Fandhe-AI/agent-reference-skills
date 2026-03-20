# Duplicate Keys

子ロガーのバインディングとログ呼び出しのオブジェクトで同名キーが存在する場合の挙動。

## 発生条件

子ロガーに設定したバインディングと、ログメソッドに渡すオブジェクトに同じキーがあると、JSON 出力に重複キーが含まれる。

```js
const pino = require('pino')
pino(pino.destination('./my-log'))
  .child({ a: 'property' })
  .child({ a: 'prop' })
  .info('howdy')
```

出力される JSON:

```json
{"pid":95469,"hostname":"MacBook-Pro-3.home","level":30,"msg":"howdy","time":1459534114473,"a":"property","a":"prop"}
```

2つの `a` キーが存在する。子のプロパティは親のプロパティの後に出力される。

## 解決の挙動

`JSON.parse` で解析すると、最後に出現した値が採用される:

```sh
$ cat my-log | node -e "process.stdin.once('data', (line) => console.log(JSON.stringify(JSON.parse(line))))"
{"pid":95469,"hostname":"MacBook-Pro-3.home","level":30,"msg":"howdy","time":"2016-04-01T18:08:34.473Z","a":"prop"}
```

これは Bunyan の子ロガーと同じ挙動（最後の値が勝つ）。

## Notes

- Pino はパフォーマンスのためにオブジェクトを構築・stringify せず文字列を直接組み立てるため、重複キーが出力される
- 別の JSON パーサーを使用する場合、重複キーの処理が異なる可能性がある
- 子ロガー作成時にキー名の衝突に注意すること

## Related

- [Child Loggers](../features/child-loggers.md)
- [logger.child()](../api/logger-child.md)
- [Avoid Message Conflict](./avoid-message-conflict.md)
