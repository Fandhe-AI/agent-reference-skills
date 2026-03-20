# turbo gen

```bash
turbo gen [subcommand] [options]
```

エイリアス: `turbo generate`

## turbo gen workspace

```bash
turbo gen workspace [options]
```

| オプション | 説明 |
|---|---|
| `--name` | ワークスペースの名前 |
| `--empty` | 空のワークスペースを作成（デフォルト: `true`） |
| `--copy` | 既存ワークスペースまたは GitHub リポジトリをコピー |
| `--destination` | 作成先のパス |
| `--type` | `app` または `package` |

## turbo gen run

```bash
turbo gen run [generator-name] [options]
```

| オプション | 説明 |
|---|---|
| `--args` | ジェネレーターのプロンプトに直接渡す回答 |
| `--config` | ジェネレーター設定ファイル（デフォルト: `turbo/generators/config.js`） |
| `--root` | リポジトリルートのパス |

## @turbo/gen の型定義

```ts
import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("name", {
    description: "description",
    prompts: [],
    actions: [],
  });
}
```
