# Vitest

## アプローチ 1: パッケージ単位（推奨）

```json
{
  "scripts": { "test": "vitest run", "test:watch": "vitest --watch" }
}
```

```json
{
  "tasks": {
    "test": { "dependsOn": ["^test"] },
    "test:watch": { "cache": false, "persistent": true }
  }
}
```

カバレッジマージ: `nyc merge` → `nyc report`

## アプローチ 2: Vitest Projects（ルート一元管理）

```ts
export default defineConfig({
  projects: [
    { name: "web", root: "./apps/web", test: { include: ["src/**/*.test.ts"] } },
  ],
});
```

```json
{ "tasks": { "//#test": { "outputs": ["coverage/**"] } } }
```

デメリット: どのパッケージを変更しても全体キャッシュミスが発生。

## アプローチ 3: ハイブリッド

共有設定パッケージ `@repo/vitest-config` を作成し、各パッケージがインポート。

## 注意

- `workspaces` は非推奨。`projects` を使う
- サンプル: `npx create-turbo@latest --example with-vitest`
