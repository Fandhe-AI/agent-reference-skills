# Troubleshooting

Kubbでよく発生する問題とその解決方法。

## インストール問題

### Node.jsバージョンエラー

**症状:** バージョン関連のエラーが発生する

**解決策:** Kubbは **Node.js 20以上** が必須。

```bash
node --version
# v20.x.x 以上であることを確認
```

### パッケージマネージャーの競合

**症状:** 依存関係のインストールが失敗する、または予期しないバージョンが入る

**解決策:** キャッシュをクリアして依存関係を再インストールする:

```bash
# npm
npm cache clean --force && npm install

# pnpm
pnpm store prune && pnpm install

# yarn
yarn cache clean && yarn install

# bun
bun pm cache rm && bun install
```

## 設定問題

### 設定ファイルが認識されない

**症状:** `kubb generate` 実行時に設定ファイルが見つからないエラー

**解決策:** Kubbが受け付ける設定ファイル名は以下のいずれか:

- `kubb.config.ts`
- `kubb.config.js`
- `kubb.config.mjs`
- `kubb.config.cjs`

### OpenAPI仕様のバリデーションエラー

**症状:** OpenAPIファイルのパースエラー

**解決策:** [Swagger Editor](https://editor.swagger.io/) でOpenAPI仕様を事前にバリデーションする。

### モジュールエラー（ESM）

**症状:** `require is not defined` または `Cannot use import statement` エラー

**解決策:** `package.json` に `"type": "module"` を追加するか、設定ファイルの拡張子を `.mjs` にする:

```json
{
  "type": "module"
}
```

## 生成の失敗

### プラグインが見つからない

**症状:** プラグイン関連のエラーが発生する

**解決策:** ほとんどのプラグインは `@kubb/plugin-oas` を依存として必要とする:

```bash
npm install --save-dev @kubb/plugin-oas
```

### 出力が空になる

**症状:** 生成コマンドは成功するが、ファイルが生成されない

**解決策:**
1. OpenAPIファイルの内容を確認する
2. プラグインの `include` / `exclude` 設定を確認する

### TypeScriptエラー

**症状:** 生成されたコードでTypeScriptコンパイルエラーが発生する

**解決策:** `tsconfig.json` の `moduleResolution` 設定を確認する:

```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
  }
}
```

## パフォーマンス問題

### 生成が遅い

**解決策:** `include` オプションで必要なエンドポイントのみを生成し、不要なプラグインを無効化する。

### メモリ不足エラー

**症状:** `JavaScript heap out of memory` エラー

**解決策:** Node.jsのヒープサイズを増やす:

```bash
NODE_OPTIONS="--max-old-space-size=4096" npx kubb generate
```

## ランタイム問題

### インポートエラー

**症状:** 生成されたコードのインポートが解決できない

**解決策:**
- 出力パスとインポート文が一致しているか確認する
- バレルファイル（`index.ts`）の生成設定を確認する（`output.barrelType`）

### クライアントリクエストの失敗

**症状:** 生成されたHTTPクライアントがリクエストに失敗する

**解決策:**
- `baseURL` の設定が正しいか確認する
- CORSの設定を確認する

## デバッグモード

詳細なログを `.kubb` ディレクトリに出力する:

```bash
kubb generate --debug
```

このログファイルを使って問題を特定できる。

## サポート

問題が解決しない場合は以下を活用する:

- **GitHub Issues:** github.com/kubb-labs/kubb/issues（バージョン番号と最小再現手順を添えて報告）
- **Discord:** discord.gg/shfBFeczrm

## Related

- [installation.md](./installation.md)
- [configure.md](./configure.md)
- [telemetry.md](./telemetry.md)
