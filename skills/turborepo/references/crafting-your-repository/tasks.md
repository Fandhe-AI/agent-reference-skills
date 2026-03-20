# タスクの設定

## dependsOn（依存関係）

### ^ トポロジカル依存

```json
{ "build": { "dependsOn": ["^build"] } }
```

全依存パッケージの `build` を先に実行。

### 同一パッケージ依存

```json
{ "test": { "dependsOn": ["build"] } }
```

同じパッケージ内の `build` を先に実行。

### package#task 構文

```json
{ "lint": { "dependsOn": ["utils#build"] } }
```

特定パッケージの特定タスクへの依存を明示。

### 依存なし（並列実行）

`dependsOn` を省略するか空配列にする。

## outputs（キャッシュ対象）

```json
{ "build": { "outputs": [".next/**", "!.next/cache/**", "dist/**"] } }
```

`outputs` を定義しないとファイルキャッシュなし（ログのみ）。

## inputs（ハッシュ対象ファイル）

```json
{ "spell-check": { "inputs": ["**/*.md", "**/*.mdx"] } }
```

特殊値:
- `$TURBO_DEFAULT$`: デフォルト挙動を維持しつつ追加・除外
- `$TURBO_ROOT$`: リポジトリルートからの相対パス
- `$TURBO_EXTENDS$`: 継承した値に追記

## ルートタスク

```json
{ "//#lint:root": {} }
```

ワークスペースルートの `package.json` スクリプトを実行。

## cache: false（副作用タスク）

```json
{ "deploy": { "dependsOn": ["^build"], "cache": false } }
```

## persistent + with（長時間実行タスク）

```json
{
  "dev": {
    "with": ["api#dev"],
    "persistent": true,
    "cache": false
  }
}
```
