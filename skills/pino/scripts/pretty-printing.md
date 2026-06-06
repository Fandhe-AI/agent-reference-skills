# pretty-printing

開発時の人間可読なログ出力（pino-pretty）の実行

## ログを pino-pretty にパイプ

```sh
node app.js | pino-pretty
```

## カラー出力を有効化

```sh
node app.js | pino-pretty --colorize
```

```sh
node app.js | pino-pretty -c
```

## タイムスタンプを人間可読形式に変換

```sh
node app.js | pino-pretty --translateTime
```

```sh
node app.js | pino-pretty -t
```

## ログレベルを先頭に表示

```sh
node app.js | pino-pretty --levelFirst
```

```sh
node app.js | pino-pretty -l
```

## 最低出力レベルの指定

```sh
node app.js | pino-pretty --minimumLevel warn
```

```sh
node app.js | pino-pretty -L warn
```

## 特定のキーを無視

```sh
node app.js | pino-pretty --ignore pid,hostname
```

```sh
node app.js | pino-pretty -i pid,hostname
```

## 特定のキーのみ出力

```sh
node app.js | pino-pretty --include level,msg
```

```sh
node app.js | pino-pretty -I level,msg
```

## 1 行に収めて出力

```sh
node app.js | pino-pretty --singleLine
```

```sh
node app.js | pino-pretty -S
```

## メッセージキーの指定

```sh
node app.js | pino-pretty --messageKey msg
```

```sh
node app.js | pino-pretty -m msg
```

## 設定ファイルを指定

```sh
node app.js | pino-pretty --config .pino-prettyrc
```

デフォルトで `.pino-prettyrc` を参照する。

## カスタムメッセージフォーマット

```sh
node app.js | pino-pretty --messageFormat "{levelLabel} - {pid} - url:{req.url}"
```

```sh
node app.js | pino-pretty -o "{levelLabel} - {pid}"
```

## カスタムレベルの定義

```sh
node app.js | pino-pretty --customLevels err:99,info:1
```

```sh
node app.js | pino-pretty -x err:99,info:1
```

## カスタムカラーの定義

```sh
node app.js | pino-pretty --customColors err:red,info:blue
```

```sh
node app.js | pino-pretty -X err:red,info:blue
```
