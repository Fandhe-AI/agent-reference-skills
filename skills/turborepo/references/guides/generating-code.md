# コード生成

## ビルトイン生成コマンド

```bash
turbo gen workspace              # 空のパッケージを追加
turbo gen workspace --copy       # 既存パッケージをテンプレートとして複製
turbo gen workspace --copy https://github.com/...  # リモートから複製
```

## カスタムジェネレーター

内部的に Plop の設定形式を使用。設定ファイルの配置場所:
- モノレポルート: `turbo/generators/config.ts`
- 任意のワークスペース内: `{workspace}/turbo/generators/config.ts`

```ts
import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("Generator name", {
    description: "Generator description",
    prompts: [
      { type: "input", name: "name", message: "What is the name?" },
    ],
    actions: [
      { type: "add", path: "src/{{name}}.ts", templateFile: "templates/component.hbs" },
    ],
  });
}
```

## 実行方法

```bash
turbo gen [generator-name]
turbo gen [generator-name] --args answer1 answer2
```

## 注意点

- ESM 依存関係は現在非対応
- TypeScript 使用時は `@turbo/gen` を devDependency としてインストール
