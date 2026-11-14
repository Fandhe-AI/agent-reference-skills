# Installation

Kubb のインストール方法とシステム要件（Kubb 5.20.0 / docs 5.x の how-to/installation に準拠）。

## システム要件

- **Node.js:** 22.22 以上（必須）
- **TypeScript:** 5 以上（TypeScript の config を使う場合、または生成された型を import する場合）
- パッケージマネージャー: npm / pnpm / yarn / bun いずれも対応

## インストール方法

### 1. Kubb と必要なプラグインをインストール

各出力は個別のプラグインパッケージから生成されるため、`kubb` と必要なプラグインだけをインストールする。以下は TypeScript プラグインの例:

```bash
pnpm add -D kubb @kubb/plugin-ts typescript
npm install -D kubb @kubb/plugin-ts typescript
yarn add -D kubb @kubb/plugin-ts typescript
bun add -d kubb @kubb/plugin-ts typescript
```

出力に必要なランタイムライブラリも別途インストールする（Axios クライアントなら `axios`、React Query フックなら `react` と `@tanstack/react-query`）。各プラグインページに要件が記載されている。

### 2. インストール確認

```bash
npx kubb --version
```

パッケージマネージャーに応じて `pnpm exec kubb` / `yarn kubb` / `bunx kubb` を使う。

### 3. config を作成

初期化ウィザードで仕様ファイル・出力ディレクトリ・プラグインを選ぶか、`kubb.config.ts` を直接書く。

```bash
npx kubb init
```

その後 `npx kubb generate` を実行すると、生成ファイルが `output.path` に書き出される。

### プラグインを後から追加する

config 作成後は `kubb add` が Kubb レジストリで pin されたバージョンのプラグインをインストールし、`kubb.config.ts` に追加する。

```bash
npx kubb add plugin-zod
```

`kubb list` で拡張一覧を確認し、`kubb update` で pin されたバージョンへ更新する。

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

## Notes

- Source: https://kubb.dev/docs/5.x/how-to/installation （kubb@5.20.0 の docs/5.x/how-to/installation.md、取得日 2026-11-14）
- Migration (5.11 → 5.20): the Node.js requirement is 22.22+ (was 22.12+); the 5.13.0 changelog records "Require Node.js 22.22+" for `@kubb/adapter-oas` (#4426). The 5.20.0 installation page no longer lists what the `kubb` package ships, while the 5.20.0 `kubb remove` page states that `@kubb/adapter-oas`, `@kubb/parser-ts`, `@kubb/parser-md` and `@kubb/plugin-barrel` ship with `kubb`.
- 安定版 5.x では `@beta` タグは不要（`kubb init` / `npx kubb init` も同様）
- 旧 `@kubb/cli` + `@kubb/core` の手動インストールは不要。CLI パッケージは `kubb`
- グローバルインストールよりプロジェクトごとのインストールを推奨
- 必要なプラグインだけをインストールすればよい
- 推奨 TypeScript 設定は旧版ページ由来で、5.x の公式 installation ページには記載がない

## Related

- [introduction.md](./introduction.md)
- [quick-start.md](./quick-start.md)
