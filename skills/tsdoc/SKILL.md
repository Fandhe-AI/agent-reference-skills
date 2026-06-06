---
name: tsdoc
description: >
  TSDoc (TypeScript ドキュメンテーションコメント) ガイドライン。
  @param, @returns, @example, @remarks, @public / @internal / @beta、
  @deprecated, @see, @throws、TypeDoc 互換タグのみ使用。
  コード作成・レビュー・リファクタリング時に自動参照。
user-invocable: false
model: sonnet
---

# TSDoc コメント ガイドライン

タグの詳細・構文・使用例は `tags/<tag-name>.md` を参照。

## 必須ルール

- TSDoc 形式（`/** ... */`）のみ使用する（`//` や `/* */` は TSDoc として認識されない）
- TypeDoc がサポートするタグのみ使用する（独自タグは禁止）
- 説明文は日本語で記述する
- `@param` の説明にはハイフン区切りを使用する: `@param name - 説明`
- `@param` には型を記述しない（TypeScript の型情報から自動推論される）
- 1 行目は概要（summary）— 簡潔に 1 文で記述する
- 詳細説明が必要な場合は空行を挟んで `@remarks` を使用する
- コンポーネントの Props interface には `@param` ではなくプロパティごとに TSDoc を記述する
- `export default` のコンポーネントにはコンポーネント定義の直前に TSDoc を記述する
- named export（型、定数、ユーティリティ）には各 export の直前に TSDoc を記述する

## 使用可能なタグ

### ブロックタグ

`@param`, `@typeParam`, `@returns`, `@throws`, `@remarks`, `@example`, `@see`, `@deprecated`, `@defaultValue`, `@category`, `@since`

### モディファイアタグ

`@internal`

### インラインタグ

`{@link}`, `{@linkcode}`, `{@linkplain}`

## TSDoc が必要なエクスポート

| 対象 | 必須レベル | 理由 |
|------|----------|------|
| 共有コンポーネント（`shared-ui-*`） | 必須 | 複数パッケージから使用される公開 API |
| 共有型定義（`export interface/type`） | 必須 | パッケージ境界をまたぐ型契約 |
| 共有定数（`export const`） | 必須 | 公開データ定義 |
| ユーティリティ関数 | 必須 | ロジックの意図を明確化 |
| カスタムフック | 必須 | 使用方法と戻り値の説明 |
| features / widgets コンポーネント | 推奨 | pages から使用される |
| pages コンポーネント | 任意 | app からの使用のみ |
| 非公開ヘルパー関数 | 任意 | ファイル内のみ |

## エンティティ別テンプレート

### React コンポーネント（tailwind-variants 使用）

```tsx
import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";
import type { VariantProps } from "tailwind-variants";

const styles = tv({
  base: "...",
  variants: {
    size: { sm: "...", md: "..." },
  },
  defaultVariants: { size: "md" },
});

interface Props extends ComponentProps<"div">, VariantProps<typeof styles> {
  /** 評価値（0〜5 の数値） */
  rating: number;
  /**
   * 小数点以下の桁数。
   *
   * @defaultValue 2
   */
  fractionDigits?: number;
}

/**
 * 星アイコンと数値で評価を表示するコンポーネント。
 *
 * @remarks
 * `size` バリアントで見た目を制御する。
 * `className` でルート要素のスタイルをオーバーライド可能。
 *
 * @example
 * ```tsx
 * <StarRating rating={4.5} />
 * <StarRating rating={3.0} size="sm" fractionDigits={1} />
 * ```
 *
 * @category UI
 */
const StarRating = ({ rating, size, fractionDigits = 2, className, ...rest }: Props) => {
  // ...
};

export default StarRating;
```

### React コンポーネント（Radix UI 使用）

`"use client"` は Radix UI 使用時でも useState/useEffect/イベントハンドラが必要な場合のみ記述する。

```tsx
"use client"; // useState/useEffect/イベントハンドラ使用時のみ

import * as SelectPrimitive from "@radix-ui/react-select";
import type { ComponentProps } from "react";

/** セレクトボックスの選択肢。 */
interface Option {
  /** 表示テキスト */
  label: string;
  /** フォーム送信時の値 */
  value: string;
}

interface Props extends ComponentProps<typeof SelectPrimitive.Root> {
  /** 選択肢のリスト */
  options: readonly Option[];
  /** 未選択時のプレースホルダーテキスト */
  placeholder?: string;
}

/**
 * Radix UI Select をベースにしたセレクトボックス。
 *
 * @remarks
 * アクセシビリティ対応済み。キーボード操作とスクリーンリーダーをサポートする。
 *
 * @example
 * ```tsx
 * <Select
 *   options={[
 *     { label: "東京都", value: "tokyo" },
 *     { label: "大阪府", value: "osaka" },
 *   ]}
 *   placeholder="選択してください"
 *   onValueChange={(value) => console.log(value)}
 * />
 * ```
 *
 * @category UI
 */
const Select = ({ options, placeholder, className, ...rest }: Props) => {
  // ...
};

export default Select;
```

### 型定義（interface / type）

```typescript
/**
 * カテゴリカードに表示するアイテムの型。
 *
 * @category Model
 */
export interface CategoryCardItem {
  /** カテゴリの一意識別子 */
  id: string;
  /** カテゴリの表示名 */
  name: string;
  /** カテゴリのサムネイル画像 */
  image: StaticImageData;
  /** カテゴリ詳細ページへのパス */
  href: string;
}
```

### 定数・データオブジェクト

```typescript
/**
 * 業種カテゴリの一覧データ。
 *
 * @remarks
 * トップページのカテゴリセクションで使用する。
 *
 * @category Data
 */
export const INDUSTRY_LIST = [
  // ...
] as const satisfies CategoryCardItem[];
```

### ユーティリティ関数

```typescript
/**
 * 画像ソースから `srcset` 属性用の文字列を解決する。
 *
 * @param srcSet - `StaticImageData` または文字列の画像ソース
 * @returns `srcset` 属性に使用する URL 文字列
 *
 * @internal
 */
const resolveSrcSet = (srcSet: StaticImageData | string): string =>
  typeof srcSet === "string" ? srcSet : srcSet.src;
```

### カスタムフック

```typescript
/**
 * デバウンスされた検索入力を管理するフック。
 *
 * @param initialQuery - 初期検索文字列
 * @param delay - デバウンス遅延時間（ミリ秒）
 * @returns デバウンスされた検索状態と更新関数
 *
 * @example
 * ```tsx
 * const { query, debouncedQuery, setQuery } = useSearchInput("", 300);
 * ```
 *
 * @category Hooks
 */
export const useSearchInput = (initialQuery: string, delay: number) => {
  // ...
};
```

## `@category` 統一名

| カテゴリ名 | 対象 |
|-----------|------|
| `UI` | UI コンポーネント（Button, Tag, Select 等） |
| `Layout` | レイアウトコンポーネント（Container, Fieldset 等） |
| `Icon` | アイコン関連コンポーネント |
| `Model` | 型定義、interface |
| `Data` | 定数、データオブジェクト |
| `Hooks` | カスタムフック |
| `Utils` | ユーティリティ関数 |
| `Config` | 設定関連 |

## よくある間違い

1. **`@param` に型を記述する** → TypeScript から自動推論されるため不要。`@param {string} name` ではなく `@param name - 説明`
2. **Props の各プロパティに `@param` を使う** → interface のプロパティには直接 `/** ... */` を記述する
3. **コンポーネントの TSDoc を interface の上に書く** → コンポーネント定義（`const Component = ...`）の直前に記述する
4. **`@return` を使う** → TSDoc では `@returns`（末尾に s）が正しい
5. **`@defaultValue` にバッククォートを使う** → 値をそのまま記述する（`@defaultValue 2`）
6. **`@example` にコードフェンスなしでコードを書く** → 必ず ` ```tsx ` ... ` ``` ` で囲む
7. **非公開ヘルパーに冗長な TSDoc を書く** → ファイル内のみの関数は概要 1 行で十分
8. **`@link` に波括弧を付けない** → インラインタグは `{@link Target}` で波括弧が必要
9. **概要が長すぎる** → 1 行目は 1 文で簡潔に。詳細は `@remarks` に分離する
10. **`@category` の不統一** → 上記の統一名を使用する

## ディレクトリ構成

```text
skills/tsdoc/
  SKILL.md
  tags/
    param.md
    returns.md
    remarks.md
    example.md
    throws.md
    deprecated.md
    see.md
    internal.md
    default-value.md
    category.md
    since.md
    type-param.md
    link.md
  samples/
    README.md
    function-comment.md
    react-component.md
    interface-type.md
    custom-hook.md
    deprecation.md
    modifier-tags.md
    multiple-examples.md
    tsdoc-config.md
  scripts/
    README.md
    install.md
    lint.md
    config.md
```

## 探索手順

タスクからカテゴリを引き、カテゴリの README.md で目的のページを特定する:

1. 下記マッピング表でタスクに対応するカテゴリを探す
2. タグの詳細は `tags/<tag-name>.md` を直接 Read して確認する
3. 使用例は `samples/README.md` を参照してから該当ページを Read する
4. コマンド・設定は `scripts/README.md` を参照してから該当ページを Read する

## タスク → カテゴリ マッピング

| タスク | カテゴリ | 参照先 |
|--------|---------|--------|
| `@param` / `@returns` / `@throws` の構文を確認したい | tags | [tags/param.md](tags/param.md), [tags/returns.md](tags/returns.md), [tags/throws.md](tags/throws.md) |
| `@remarks` / `@example` / `@see` の使い方を知りたい | tags | [tags/remarks.md](tags/remarks.md), [tags/example.md](tags/example.md), [tags/see.md](tags/see.md) |
| `@deprecated` / `@internal` / `@since` の使い方を知りたい | tags | [tags/deprecated.md](tags/deprecated.md), [tags/internal.md](tags/internal.md), [tags/since.md](tags/since.md) |
| `@defaultValue` / `@category` / `@typeParam` / `{@link}` を調べたい | tags | [tags/default-value.md](tags/default-value.md), [tags/category.md](tags/category.md), [tags/type-param.md](tags/type-param.md), [tags/link.md](tags/link.md) |
| 典型的な TSDoc コメントの書き方を知りたい | samples | [samples/README.md](samples/README.md) |
| インストール・lint・tsdoc.json 設定のコマンドを知りたい | scripts | [scripts/README.md](scripts/README.md) |
