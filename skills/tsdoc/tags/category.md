# @category

TypeDoc のドキュメントでシンボルをグループ化するブロックタグ。

## 構文

```
@category カテゴリ名
```

## プロジェクトのカテゴリ名

| カテゴリ名 | 対象 |
|-----------|------|
| `UI` | UI コンポーネント（Button, Tag, Select 等） |
| `Layout` | レイアウトコンポーネント（Container, Fieldset, Clickable 等） |
| `Icon` | アイコン関連（Icon, IconProvider, シンボル） |
| `Model` | 型定義、interface |
| `Data` | 定数、データオブジェクト |
| `Hooks` | カスタムフック |
| `Utils` | ユーティリティ関数 |
| `Config` | 設定関連 |

## 使用例

```typescript
/**
 * 星アイコンと数値で評価を表示するコンポーネント。
 *
 * @category UI
 */
const StarRating = ({ ... }: Props) => { ... };

/**
 * カテゴリカードに表示するアイテムの型。
 *
 * @category Model
 */
export interface CategoryCardItem { ... }

/**
 * 業種カテゴリの一覧データ。
 *
 * @category Data
 */
export const INDUSTRY_LIST = [ ... ];

/**
 * Fieldset のコンテキスト値を取得するフック。
 *
 * @category Hooks
 */
export const useFieldset = () => useContext(FieldsetContext);
```

## 注意

- TypeDoc 独自のタグ（TSDoc 標準にはない）
- プロジェクト内で上記の統一名を使用する
- 1 つのシンボルに複数の `@category` を指定可能
