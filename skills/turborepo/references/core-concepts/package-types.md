# Package Types

## Application Packages

ワークスペースから直接デプロイするために設計されたパッケージ。

- 通常 `./apps` ディレクトリに配置
- Next.js、Svelte、Vite、CLI アプリなど
- パッケージグラフの「終端ノード」として機能
- 通常は他のパッケージの依存関係としてインストールしない

## Library Packages

ワークスペース全体で共有されるコードを含むパッケージ。

- 単独ではデプロイ不可
- 「Internal Packages」とも呼ばれる

## Internal Packages の3つのコンパイル戦略

### 1. Just-in-Time（JIT）パッケージ

アプリケーションのバンドラーが TypeScript ソースファイルを直接コンパイル。

- 設定が最小限で済む
- ビルドステップ不要
- 制限: トランスパイル可能なコンシューマーでのみ動作、TypeScript の `paths` 使用不可、Turborepo のビルドキャッシュ不可

### 2. Compiled Packages

`tsc` 等でコンパイル。Turborepo がビルド出力をキャッシュ可能。

```json
{
  "exports": {
    "./add": {
      "types": "./dist/add.d.ts",
      "default": "./dist/add.js"
    }
  }
}
```

### 3. Publishable Packages

npm レジストリへの配布を準備したパッケージ。`changesets` の使用を推奨。

## インストール構文

| パッケージマネージャー | 構文 |
|---|---|
| pnpm / bun | `"@repo/ui": "workspace:*"` |
| yarn / npm | `"@repo/ui": "*"` |
