# Installation

Kubb のインストール方法とシステム要件。

## システム要件

- **Node.js:** 20以上（必須）
- **TypeScript:** 4.7以上（任意）
- パッケージマネージャー: npm / pnpm / yarn / bun いずれも対応

## インストール方法

### 推奨: インタラクティブセットアップ

```bash
npx kubb init
```

このコマンドが自動的に以下を行う:

1. `package.json` を検出または作成
2. OpenAPI/Swagger 仕様ファイルの場所を確認
3. 出力ディレクトリパスを確認
4. 使用プラグインを選択（TypeScript, React Query, Zod など）
5. 必要なnpmパッケージをすべてインストール
6. `kubb.config.ts` を生成

セットアップ完了後:

```bash
npx kubb generate
```

### 手動インストール

**コアパッケージ:**

```bash
npm install --save-dev @kubb/cli @kubb/core
```

**オプションプラグイン（カテゴリ別）:**

*TypeScript & HTTP:*

```bash
npm install --save-dev @kubb/plugin-ts       # TypeScriptインターフェース生成
npm install --save-dev @kubb/plugin-client   # HTTPクライアント生成
```

*Data Fetching:*

```bash
npm install --save-dev @kubb/plugin-react-query
npm install --save-dev @kubb/plugin-swr
npm install --save-dev @kubb/plugin-vue-query
npm install --save-dev @kubb/plugin-solid-query
npm install --save-dev @kubb/plugin-svelte-query
```

*Validation & Testing:*

```bash
npm install --save-dev @kubb/plugin-zod     # ランタイムバリデーション
npm install --save-dev @kubb/plugin-faker   # モックデータ生成
npm install --save-dev @kubb/plugin-msw     # Mock Service Workerハンドラー生成
npm install --save-dev @kubb/plugin-cypress # E2Eテストユーティリティ生成
```

## 推奨 TypeScript 設定

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2022",
    "lib": ["ES2023"]
  }
}
```

## インストール確認

```bash
npx kubb --version
```

## Notes

- グローバルインストールよりプロジェクトごとのインストールを推奨
- ピア依存関係の警告は通常無視して問題ない
- 必要なプラグインだけをインストールすればよい

## Related

- [introduction.md](./introduction.md)
- [quick-start.md](./quick-start.md)
- [configure.md](./configure.md)
