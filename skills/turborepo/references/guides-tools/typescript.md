# TypeScript

## 設定共有 — @repo/typescript-config

```
packages/typescript-config/
  base.json
  nextjs.json
  react-library.json
```

```json
// base.json の代表的なオプション
{ "compilerOptions": { "target": "es2022", "module": "NodeNext", "strict": true, "isolatedModules": true } }
```

## exports フィールド

```json
{
  "exports": {
    "./*": { "types": "./src/*.ts", "default": "./dist/*.js" }
  }
}
```

## 型チェック

```json
{ "scripts": { "check-types": "tsc --noEmit" } }
```

## ベストプラクティス

- bundler ではなく `tsc` を使う
- `declaration: true` と `declarationMap: true` を有効にする
- TypeScript の `paths` より Node.js の subpath imports を使う（TS 5.4+）
- ルートの `tsconfig.json` は作成しない
- **TypeScript Project References は使わない**（設定が複雑になりキャッシュ効率も悪化）
- ワークスペース全体で TypeScript のバージョンを統一する
