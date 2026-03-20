# 内部パッケージの作成

1パッケージ1責務の設計が推奨。

## 作成手順

### 1. ディレクトリを作成

```
packages/math/
  src/
    add.ts
    subtract.ts
  package.json
  tsconfig.json
```

### 2. package.json

```json
{
  "name": "@repo/math",
  "type": "module",
  "exports": {
    "./add": { "types": "./dist/add.d.ts", "default": "./dist/add.js" },
    "./subtract": { "types": "./dist/subtract.d.ts", "default": "./dist/subtract.js" }
  },
  "scripts": {
    "dev": "tsc --watch",
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "latest",
    "@repo/typescript-config": "workspace:*"
  }
}
```

### 3. tsconfig.json

```json
{
  "extends": "@repo/typescript-config/base.json",
  "compilerOptions": { "outDir": "dist", "rootDir": "src" },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}
```

`include` / `exclude` はベース設定から継承されないので必ず明記する。

### 4. アプリへの組み込み

```json
{ "dependencies": { "@repo/math": "workspace:*" } }
```

### 5. キャッシュ設定

```json
{
  "tasks": {
    "build": {
      "outputs": [".next/**", "!.next/cache/**", "dist/**"]
    }
  }
}
```
