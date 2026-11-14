# openapi-import

`*.openapi.yaml` を TypeScript モジュールのように import し、`kubb.config.ts` の全 plugin の出力（型・enum など）を生成ファイル無しで得る [`openapi-import`](https://github.com/kubb-labs/openapi-import)。

## Signature / Usage

```ts
import { type Pet, petStatusEnum } from './petStore.openapi.yaml'
```

`openapi-import` は [TypeScript content mapper](https://github.com/microsoft/typescript-go/pull/4712) で、`tsc` とエディターが spec の代わりに plugin 出力を型チェックする。定義へ移動・ホバー・リネームは生成された型と spec のキーの間で機能する。

experimental で、TypeScript 7.1.0-beta 以降と `--runExternalCode` が必要。

### Install

```shell
pnpm add -D kubb openapi-import typescript@beta
```

```shell
npm install -D kubb openapi-import typescript@beta
```

### Register the extension

content mapper を `tsconfig.json` に追加し、spec を `<name>.openapi.yaml` と名付ける:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noEmit": true
  },
  "contentMappers": [{ "package": "openapi-import", "extensions": [".openapi.yaml", ".openapi.yml"] }],
  "include": ["./src/**/*"]
}
```

### Run the type check

```shell
pnpm tsc --noEmit --runExternalCode
```

```shell
node node_modules/typescript/bin/tsc --noEmit --runExternalCode
```

npm では素の `tsc` が TypeScript 6 を実行するため、`typescript` のバイナリを直接呼ぶ。VS Code は信頼されたワークスペースでのみ `--runExternalCode` を渡す。

### Choose the plugins

plugin オプションの設定や他の plugin の実行には `kubb.config.ts` を追加し、import する plugin をそれぞれインストールする:

```shell
pnpm add -D @kubb/plugin-ts
```

```ts
import { pluginTs } from '@kubb/plugin-ts'
import { defineConfig } from 'kubb/config'

export default defineConfig({
  output: { path: './src/gen' },
  plugins: [pluginTs()],
})
```

`tsconfig.json` の `include` に `./kubb.config.ts` を追加する。mapper は CLI と同様に config を探し、変更時に再読み込みする。config が複数ある場合、spec は `input` が一致するものを使う。

### Load the spec at run time

TypeScript は spec を JavaScript に出力しないため、`petStatusEnum` のような値にはバンドラーが要る。[ビルドツール連携](./overview.md) の `kubb()` を `config` オプション無しで追加すると、`tsc` と同じ `kubb.config.ts` を読む:

```ts
import kubb from 'kubb/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [kubb()],
})
```

型と値は同じ import から得られる:

```ts
import { type GetPetByIdPath, type GetPetByIdResponse, petStatusEnum } from '../petStore.openapi.yaml'

export async function getAvailablePet({ petId }: GetPetByIdPath): Promise<GetPetByIdResponse | undefined> {
  const response = await fetch(`https://petstore3.swagger.io/api/v3/pet/${petId}`)
  const pet: GetPetByIdResponse = await response.json()

  return pet.status === petStatusEnum.available ? pet : undefined
}
```

`input` を持つ config はビルド時に生成ファイルも書く。spec の import だけにするなら `input` を省く。バンドラーは `kubb.config.ts` を 1 度だけ読むため、config を変えたら再起動する。

## Notes

- 制限: plugin が別ファイルに書くコード（バンドルされた client ランタイム等）は含まれない。client の `importPath` のような import はパッケージを指す。`kubb.config.ts` が import するファイルは監視されないため、変更後は TypeScript サーバーを再起動する。spec が変わると Kubb のフルビルドが走る（10 KB の spec で約 0.4 秒、1.4 MB の spec で約 2.6 秒）。
- 関係: これは TypeScript 側の型チェック用連携。ビルドツール連携（`unplugin-kubb`、`kubb/vite` など）の `*.openapi.yaml` import は overview.md の "Import a spec" と unplugin.md を参照。bundler 側が実行時の値を、`openapi-import` が `tsc` / エディターの型を担う。
- Migration (5.11 → 5.20): the `*.openapi.yaml` import via `kubb()` without a `config` option was added in 5.12.6 (unplugin-kubb, #4402), and `root` defaults to the folder of `kubb.config.ts` with a `*.openapi.yaml` import using only a config whose `input` is that spec in 5.12.7 (#4409). The `openapi-import` page itself is new in the 5.20.0 docs.
- Source: https://kubb.dev/docs/5.x/integrations/openapi-import （kubb@5.20.0 の docs/5.x/integrations/openapi-import.md、取得日 2026-11-14）

## Related

- [overview.md](./overview.md)
- [unplugin.md](../helpers/unplugin.md)
