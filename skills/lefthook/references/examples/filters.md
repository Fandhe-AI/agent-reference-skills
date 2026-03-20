# Filters（ファイルフィルタリング）

Source: https://lefthook.dev/examples/filters

フックに渡されるファイルをフィルタリングするためのオプションについて説明します。

## 利用可能なフィルタオプション

フックに渡されるファイルは、以下のオプションでフィルタリングできます:

- **`glob`** - ファイル名のパターンマッチング
- **`exclude`** - 除外パターン
- **`file_types`** - ファイルタイプによるフィルタ
- **`root`** - ルートディレクトリの指定

## 設定例

```yaml
# lefthook.yml

pre-commit:
  commands:
    lint:
      run: yarn lint {staged_files} --fix
      glob: "*.{js,ts}"
      root: frontend
      exclude:
        - *.config.js
        - *.config.ts
      file_types:
        - not executable
```

## フィルタリングの動作例

### 入力ファイル（ステージされたファイル）

- `backend/asset.js`
- `frontend/src/index.ts`
- `frontend/bin/cli.js`（実行可能ファイル）
- `frontend/eslint.config.js`
- `frontend/README.md`

### フィルタリング後の結果

```
yarn lint frontend/src/index.ts --fix
```

## フィルタの適用順序

各フィルタは以下のようにファイルを絞り込みます:

1. **`root: frontend`** - `frontend` ディレクトリ外のファイル（`backend/asset.js`）を除外
2. **`glob: "*.{js,ts}"`** - JavaScript/TypeScript 以外のファイル（`frontend/README.md`）を除外
3. **`exclude`** - 設定ファイル（`frontend/eslint.config.js`）を除外
4. **`file_types: not executable`** - 実行可能ファイル（`frontend/bin/cli.js`）を除外

最終的に `frontend/src/index.ts` のみがコマンドに渡されます。
