# validate

TypeDoc のバリデーション・検証コマンド集。ドキュメントの品質チェックに使用する。

## バリデーション付きでドキュメント生成

```sh
npx typedoc --entryPoints src/index.ts --out docs --validation.notDocumented
```

ドキュメントコメントのないリフレクションに対して警告を出す。

## 警告をエラーとして扱う

```sh
npx typedoc --entryPoints src/index.ts --out docs --treatWarningsAsErrors
```

TypeDoc が報告した警告をすべて致命的エラーとして扱い、ドキュメント生成を失敗させる。

## バリデーション警告をエラーとして扱う

```sh
npx typedoc --entryPoints src/index.ts --out docs --treatValidationWarningsAsErrors
```

## 出力なしで変換・検証のみ実行

```sh
npx typedoc --entryPoints src/index.ts --emit none
```

ファイルを出力せずに変換と検証のみを実行する。CI でのチェックに使用できる。

## ログレベルを詳細に設定して実行

```sh
npx typedoc --entryPoints src/index.ts --out docs --logLevel Verbose
```

利用可能なログレベル: `Verbose` / `Info` / `Warn` / `Error` / `None`
