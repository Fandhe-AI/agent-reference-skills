# TypeDoc 国際化 (Internationalization)

TypeDoc v0.26 で導入された国際化機能。コンソール出力と生成される HTML/JSON の言語を制御する。

## 詳細説明

### --lang オプション

`--lang` オプションでコンソール出力と生成されるドキュメントの言語を指定する:

```bash
typedoc --lang ja
```

```json
{
  "lang": "ja"
}
```

### ロケールの構造

ロケールファイルは `src/lib/internationalization/locales` ディレクトリに格納される。デフォルトの英語ロケールは `src/lib/internationalization/translatable.ts` に定義されている。

#### ロケールファイルの形式

```typescript
import { buildTranslation } from "../translatable";

export = buildTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  // 他の翻訳キー...
});
```

### 新しいロケールの追加

1. `src/lib/internationalization/locales` に新しいファイルを作成
2. `buildTranslation()` を使用して完全な翻訳を提供するか、`buildIncompleteTranslation()` を使用して部分的な翻訳を提供する
3. 未翻訳の文字列は自動的に英語にフォールバックする

#### 完全な翻訳

```typescript
import { buildTranslation } from "../translatable";

export = buildTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  kind_class: "クラス",
  kind_function: "関数",
  // すべてのキーを含める
});
```

#### 部分的な翻訳

```typescript
import { buildIncompleteTranslation } from "../translatable";

export = buildIncompleteTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  // 一部のキーのみ
});
```

### プレースホルダー構文

翻訳キー名の末尾の数字はプレースホルダーの数を示す:

- `docs_generated_at_0` — `{0}` プレースホルダー 1 つ
- `tag_param_0_is_not_defined_1` — `{0}` と `{1}` の 2 つのプレースホルダー

翻訳文字列では `{n}` 形式でプレースホルダーを使用:

```typescript
{
  docs_generated_at_0: "Documentation generated at {0}",
  tag_param_0_is_not_defined_1: "Parameter {0} is not defined in {1}",
}
```

### バリデーション

`buildTranslation` と `buildIncompleteTranslation` 関数は以下を検証する:

- 翻訳文字列がデフォルトロケールと同じ数のプレースホルダーを含むこと
- デフォルトロケールに存在しないキーがないこと
- ユニットテストで未定義のプレースホルダーの使用を検出

### プラグインでの翻訳可能文字列

プラグインは `Application.internationalization.addTranslations()` を使用して翻訳を統合できる。

#### 手順

1. `TranslatableStrings` インターフェースに宣言マージを行う
2. プレースホルダー引数を配列形式で指定
3. キー名にインデックス番号を含む命名規則に従う

## コード例

### プラグインでの国際化

```typescript
import { Application } from "typedoc";

// TranslatableStrings インターフェースの拡張
declare module "typedoc" {
  interface TranslatableStrings {
    // 引数なしの文字列
    my_plugin_greeting: [];
    // 1つの string 引数を持つ文字列
    my_plugin_found_0: [string];
    // 2つの引数を持つ文字列
    my_plugin_processed_0_of_1: [string, string];
  }
}

export function load(app: Application) {
  // デフォルト（英語）の翻訳を追加
  app.internationalization.addTranslations("en", {
    my_plugin_greeting: "Hello from my plugin",
    my_plugin_found_0: "Found {0} items",
    my_plugin_processed_0_of_1: "Processed {0} of {1} items",
  });

  // 日本語の翻訳を追加
  app.internationalization.addTranslations("ja", {
    my_plugin_greeting: "プラグインからこんにちは",
    my_plugin_found_0: "{0} 件のアイテムが見つかりました",
    my_plugin_processed_0_of_1: "{1} 件中 {0} 件を処理しました",
  });

  // 翻訳の使用
  app.converter.on("end", () => {
    const message = app.internationalization.translate(
      "my_plugin_found_0",
      "42"
    );
    app.logger.info(message);
  });
}
```

### ロケールファイルの作成例

```typescript
// src/lib/internationalization/locales/ja.ts
import { buildIncompleteTranslation } from "../translatable";

export = buildIncompleteTranslation({
  docs_generated_at_0: "ドキュメントは {0} に生成されました",
  kind_class: "クラス",
  kind_enum: "列挙型",
  kind_function: "関数",
  kind_interface: "インターフェース",
  kind_module: "モジュール",
  kind_namespace: "名前空間",
  kind_type_alias: "型エイリアス",
  kind_variable: "変数",
});
```

## 注意点

- 機械翻訳のみで不慣れな言語の翻訳を提出しないこと
- 部分的な翻訳は `buildIncompleteTranslation` を使用する
- 未翻訳の文字列は自動的に英語にフォールバックする
- プレースホルダーの数はキー名の末尾の数字で示される
- プラグインの翻訳キーは `TranslatableStrings` インターフェースの宣言マージで型安全に追加する
- ユニットテストが翻訳の整合性を検証する

## 関連

- [プラグイン開発](./plugin-development.md)
- [Application クラス](../api/application.md)
