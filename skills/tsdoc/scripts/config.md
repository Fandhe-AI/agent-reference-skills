# Config

`tsdoc.json` 設定ファイルの作成と管理。

## 基本的な tsdoc.json の作成

```sh
# tsconfig.json と同じディレクトリに tsdoc.json を作成する
```

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
  "tagDefinitions": [
    {
      "tagName": "@myTag",
      "syntaxKind": "modifier"
    }
  ]
}
```

`tsdoc.json` は `tsconfig.json` または `package.json` が存在するディレクトリに配置する。ローダーがディレクトリを上方向に探索して最寄りの設定ファイルを読み込む。

## 共有設定の継承

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/tsdoc/v0/tsdoc.schema.json",
  "extends": [
    "my-package/dist/tsdoc-base.json",
    "./path/to/local/tsdoc-local.json"
  ]
}
```

ローカルファイルを参照する場合は `./` から始めるパスを指定する。`./` なしの文字列は npm パッケージ名として解釈される。
