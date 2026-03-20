# プラットフォーム対応

## Node.js バージョン対応

`package.json` の `engines` キーで自動検出:

```json
{ "engines": { "node": ">=18.0.0" } }
```

## OS・アーキテクチャ対応

### Step 1: キャッシュキー生成スクリプト

```js
const { writeFileSync } = require("fs");
const { platform, arch } = process;
writeFileSync("turbo-cache-key.json", JSON.stringify({ platform, arch }));
```

### Step 2: .gitignore に追加

```
turbo-cache-key.json
```

### Step 3: inputs に登録

```json
{
  "tasks": {
    "build-for-platforms": {
      "inputs": ["$TURBO_DEFAULT$", "turbo-cache-key.json"]
    }
  }
}
```

または全タスクに適用:

```json
{ "globalDependencies": ["turbo-cache-key.json"] }
```

### Step 4: Turborepo 実行前にスクリプトを実行

```json
{
  "scripts": {
    "build-for-platforms": "node ./scripts/create-turbo-cache-key.js && turbo run build"
  }
}
```

ファイル生成は Turborepo 実行前に行う必要がある。
