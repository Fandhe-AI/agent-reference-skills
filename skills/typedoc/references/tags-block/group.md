# @group

ドキュメント項目のグルーピングと表示を制御するタグ群。このページでは `@group`、`@groupDescription`、`@showGroups`、`@hideGroups`、`@disableGroups` を扱う。

## 構文

```
@group グループ名
```

```
@groupDescription グループ名
グループの説明文
```

```
@showGroups
@hideGroups
@disableGroups
```

## 詳細説明

### @group（ブロックタグ）

関連するAPI項目をページのインデックス内で共通のヘッダー下に配置する。

- 複数回指定して1つのリフレクションを複数の見出し下に表示可能
- `@category` と異なり、`@group` が指定されていない場合はリフレクションが種類別に自動グルーピングされる
- カスタムメンバー型のシミュレーションが可能
- `@event` は `@group Events` と同等、`@eventProperty` も Events グループに配置される

### @groupDescription（ブロックタグ）

リフレクショングループに追加のコンテキストを提供する。最初の行がグループ名として、続く行が説明として使用される。グループを含む親リフレクションのコメントに配置する。

### @showGroups / @hideGroups（モディファイアタグ）

ナビゲーションツリーにおけるグループの表示を選択的に制御するモディファイアタグ。`navigation.includeGroups` オプションと連携する。ナビゲーションにのみ影響し、ページの内容には影響しない。

### @disableGroups（モディファイアタグ）

親要素単位でTypeDocの自動グルーピングを無効にする。メンバーが少ないドキュメントにのみ推奨される。

## コード例

```typescript
/**
 * @groupDescription Hooks
 * Custom React hooks for state management.
 */
export class MyComponent {
    /**
     * @group Hooks
     */
    useState(): void;

    /**
     * @group Hooks
     */
    useEffect(): void;

    /**
     * @group Lifecycle
     */
    componentDidMount(): void;
}
```

## 注意点

- `@group` を指定しない場合、リフレクションは種類別（メソッド、プロパティなど）に自動グルーピングされる
- `@disableCategories` タグは存在しない（カテゴリは `@category` で明示的に要求された場合のみ作成されるため）
- `@showGroups` と `@hideGroups` はナビゲーションツリーのみに影響する
- `@event` は `@group Events` のショートカット

## 関連

- [@category](./category.md) -- 代替のカテゴリ分類メカニズム
- `--searchGroupBoosts` オプション
- `--navigation.includeGroups` オプション
