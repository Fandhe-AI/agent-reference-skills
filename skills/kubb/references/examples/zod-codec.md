# Zod Codec Example

`@kubb/plugin-zod` の `inferred: 'codec'` とカスタム `printer.nodes`（`customCodecs`）で、`date` / `date-time` を `Date`、`int64` を `bigint`、`uri` を `URL` として扱う codec を生成し、`@kubb/plugin-fetch` の `validator` で params・body・response の全スロットに通す設定例。アプリ側はドメイン値、通信上は wire 値（文字列）のまま。

## kubb.config.ts

```typescript
import { adapterOas } from '@kubb/adapter-oas'
import { parserTs } from '@kubb/parser-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginZod } from '@kubb/plugin-zod'
import { defineConfig } from 'kubb/config'
import { customCodecs } from './codecs.ts'

export default defineConfig({
  root: '.',
  input: './petStore.yaml',
  output: {
    path: './src/gen',
    clean: true,
    barrel: false,
    format: false,
    lint: false,
  },
  adapter: adapterOas({ server: { index: 0 } }),
  parsers: [parserTs({ extension: { '.ts': '.ts' } })],
  plugins: [
    pluginZod({
      // infer codec types per direction (request & params: domain -> wire, response: wire -> domain)
      inferred: 'codec',
      output: {
        path: './zod',
        barrel: false,
      },
      printer: {
        nodes: customCodecs,
      },
    }),
    pluginFetch({
      // validate every slot with zod so the codecs run on params, body, and response
      validator: {
        request: 'zod',
        params: 'zod',
        response: 'zod',
      },
      output: {
        path: './clients',
        barrel: false,
      },
    }),
  ],
})
```

## codecs.ts

```typescript
import type { PrinterZodNodes } from '@kubb/plugin-zod'

/**
 * Custom codecs, one per format, branching on the direction: request (encode) schemas take the domain value
 * and transform it to the wire value, response (decode) schemas transform the wire value back.
 * - `format: uri` (`url` node): `URL` <-> its string
 * - `format: int64` (`bigint` node): `bigint` <-> its decimal string
 * - `format: date` (`date` node): `Date` <-> `YYYY-MM-DD`
 * - `format: date-time` (`datetime` node): `Date` <-> ISO date-time
 */
export const customCodecs: PrinterZodNodes = {
  url() {
    return this.options.direction === 'encode' ? 'z.instanceof(URL).transform((url) => url.href)' : 'z.url().transform((value) => new URL(value))'
  },
  bigint() {
    return this.options.direction === 'encode' ? 'z.bigint().transform((value) => value.toString())' : 'z.string().transform((value) => BigInt(value))'
  },
  date() {
    return this.options.direction === 'encode'
      ? 'z.date().transform((value) => value.toISOString().slice(0, 10))'
      : 'z.iso.date().transform((value) => new Date(value))'
  },
  datetime() {
    return this.options.direction === 'encode' ? 'z.date().transform((value) => value.toISOString())' : 'z.iso.datetime().transform((value) => new Date(value))'
  },
}
```

## 依存関係

```json
{
  "dependencies": {
    "@kubb/adapter-oas": "catalog:",
    "@kubb/parser-ts": "catalog:",
    "@kubb/plugin-fetch": "workspace:*",
    "@kubb/plugin-zod": "workspace:*",
    "kubb": "catalog:",
    "zod": "^4.6.7"
  },
  "devDependencies": {
    "@types/node": "catalog:",
    "typescript": "catalog:"
  },
  "scripts": {
    "clean": "node -e \"require('node:fs').rmSync('./dist', {recursive:true,force:true})\"",
    "generate": "KUBB_DISABLE_TELEMETRY=1 kubb generate --config kubb.config.ts",
    "start": "node --experimental-strip-types ./src/index.ts",
    "typecheck": "tsc -p ./tsconfig.json --noEmit --emitDeclarationOnly false"
  }
}
```

## Notes

- Source: https://github.com/kubb-labs/plugins/tree/@kubb/plugin-client@6.0.1/examples/zod-codec — `examples/zod-codec` of kubb-labs/plugins at tag `@kubb/plugin-client@6.0.1` (commit 8e70d907e7bb968e612990f1c8c31347257ac9ee, fetched 2026-11-14) (`kubb.config.ts`, `codecs.ts`, `package.json`). `catalog:` / `workspace:*` are monorepo specifiers; replace with real versions outside the repo
- Versions outside the monorepo (the releases published with the pinned tags): `kubb` 5.20.0, `@kubb/adapter-oas` 5.20.0, `@kubb/parser-ts` 5.20.0, `@kubb/plugin-fetch` 6.0.1, `@kubb/plugin-zod` 5.9.1; `@types/node` and `typescript`: use your project's version
- `inferred: 'codec'` infers request and parameter types per direction (domain → wire, `z.input`) and response types wire → domain (`z.output`). Each `customCodecs` entry branches on `this.options.direction` (`'encode'` for request, otherwise decode). See [../plugins/plugin-zod.md](../plugins/plugin-zod.md)
- The package declares `node >=22` and `pnpm >=11.0.0`; its `start` script runs `node --experimental-strip-types ./src/index.ts` against an in-memory transport (the generated `src/gen/` output and `src/index.ts` are not reproduced here)
- Unlike [zod.md](./zod.md), which generates schemas with `inferred: true`, this example uses codecs so that values are transformed on the wire boundary; the fetch client must run the Zod validator for the codecs to take effect

## Related

- [zod.md](./zod.md)
- [fetch.md](./fetch.md)
- [../plugins/plugin-zod.md](../plugins/plugin-zod.md)
