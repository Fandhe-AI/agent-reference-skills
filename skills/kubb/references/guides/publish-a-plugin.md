# Publish a plugin

Plugin を npm へ publish し、Kubb registry に登録すると、ユーザーは `kubb add` でインストールでき Studio からも見つけられる。テスト付きの動く Plugin（Create and extend a plugin で作ったもの等）から始める。Adapter と parser も同じ手順。

## Build the package

package のエントリポイントから factory を export する。相対 import は `.js` 拡張子にして、コンパイル後の ESM を Node で動かす。

```typescript
// src/index.ts
export { pluginExample } from './plugin.js'
```

TypeScript のビルド設定:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "declaration": true,
    "skipLibCheck": true,
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/index.ts", "src/plugin.ts"]
}
```

既存の `package.json` に以下のフィールドを追加する（先にインストールした開発依存は残す）。publish 前に package 名を自分が所有する空き名へ置き換える。

```json
{
  "name": "kubb-plugin-example",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist", "kubb-extension.json", "docs"],
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "vitest run src/plugin.test.ts",
    "prepack": "npm run build && npm test"
  },
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js"
    },
    "./kubb-extension.json": "./kubb-extension.json",
    "./package.json": "./package.json"
  },
  "peerDependencies": { "kubb": "^5.0.0" }
}
```

`files` は manifest と次に追加する docs フォルダーを同梱する。`exports` map は列挙しないパスを隠すため、`kubb-extension.json` と `package.json` は明示的に列挙して import 可能に保つ。`kubb` はローカルのビルド・テスト用に開発依存として残し、peer dependency でユーザーに互換バージョンを要求する。

## Add the manifest

package ルートに `kubb-extension.json` を作る。registry・`kubb add`・Studio に、package の種別と呼び出す factory を伝える。

```json
{
  "$schema": "https://kubb.dev/schemas/kubb-extension.json",
  "kind": "plugin",
  "name": "plugin-example",
  "export": "pluginExample",
  "displayName": "Example",
  "description": "Writes a comment with the HTTP method and path of every operation.",
  "maintainers": [{ "name": "Acme", "github": "acme" }],
  "compatibility": { "kubb": ">=5.8.3", "node": ">=22" },
  "options": [
    {
      "key": "prefix",
      "path": ["prefix"],
      "label": "Prefix",
      "description": "Text written at the start of every comment.",
      "type": "text"
    }
  ]
}
```

`name` は Plugin の `meta.name`、`export` は `src/index.ts` が export する factory に合わせる。Studio で編集させたい option ごとに `options` エントリを追加する。`src/plugin.ts` の `meta.compatibility` にも同じ範囲 `{ kubb: '>=5.8.3', node: '>=22' }` を与えると、Kubb が実行時にも検査する。bundler 使用時は manifest から `compatibility` を import する（Extension manifest の "Import compatibility into meta" 参照）。`maintainers` / `dependencies` を含む全フィールドは Extension manifest リファレンスを参照。

## Write the docs

manifest の隣に `docs/` フォルダーを作る。kubb.dev がこれを extension のページとして描画し、Studio は overview を要約として表示する。

```text
docs/
├── overview.md        required
├── options.md         optional
└── guides/
    └── <id>.md        optional, one file per how-to guide
```

各ファイルは `#` タイトルと 1 段落の説明で始める。命名規則と描画される Markdown は Extension docs リファレンスを参照。`overview.md` には extension の役割、自明でない場合は仕組み、必要なセットアップ、知っておくべき option と制約を書く。完全な option リファレンスは `options.md`、各タスクは個別の guide に置く。install コマンドはページ側が表示するため書かない。installation と Kubb config 例を含む README とライセンスファイルも用意する。

## Check the tarball

ビルドし、npm が含めるファイルを確認し、ローカル tarball を作る。

```shell
npm run build
npm pack --dry-run
npm pack
```

dry run には `dist/` のファイル、`kubb-extension.json`、`docs/` のファイル、`package.json` が並び、fixture・tests・生成 client ファイルは含まれないこと。`prepack` が先にビルドと両テストを実行する。

## Publish to npm

tarball と package 名・バージョンが正しければ、npm にサインインして publish する。

```shell
npm login
npm publish --access public
```

## Submit to the registry

`kubb add` でインストールできるよう package を registry に submit する。submission issue・レビュー・新バージョンの配信・npm の代わりに GitHub release から publish する方法は submit-to-the-registry.md を参照。

## Notes

- 出典: https://kubb.dev/docs/5.x/how-to/publish-a-plugin（kubb@5.11.0）

## Related

- [creating-plugins.md](./creating-plugins.md)
- [submit-to-the-registry.md](./submit-to-the-registry.md)
