# Big Projects

Source: https://biomejs.dev/guides/big-projects

## モノレポでの Biome 設定

大規模プロジェクトやモノレポで Biome を効果的に設定する方法。

## ルート設定

プロジェクト直下に `biome.json` を配置する。全パッケージ共通の設定を記述する。

## ネスト設定

各パッケージに独自の `biome.json` を配置し、ルート設定を継承する。

```json
{
  "root": false,
  "extends": "//"
}
```

- `"root": false` -- このファイルがルート設定ではないことを示す
- `"extends": "//"` -- ルート設定（プロジェクト直下の biome.json）を継承する

## 独立設定

`extends` を省略すると、ルート設定を継承せず完全に独立した設定になる。

## 共有設定

### 相対パスで共有

```json
{
  "extends": ["./common.json"]
}
```

### NPM パッケージで共有

```json
{
  "extends": ["@org/shared-configs/biome"]
}
```

NPM パッケージ側の `package.json` で exports を設定する:

```json
{
  "exports": {
    "./biome": "./biome.json"
  }
}
```
