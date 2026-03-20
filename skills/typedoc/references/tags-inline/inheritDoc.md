# @inheritDoc

他のリフレクション（シンボル）からドキュメントをコピーするインラインタグ。TSDoc仕様に準拠し、特定のドキュメント要素のみがコピーされる。

## 構文

### ブレース付き形式（TSDoc標準）

```
{@inheritDoc ReferenceName}
```

### ブレースなし形式（JSDoc互換）

```
@inheritDoc
```

ブレースなし形式の場合、TypeDocは「親」リフレクション（親クラスやインターフェースの対応するメンバー）からコメントを継承する。

## 詳細説明

### コピーされる要素

TypeDocはTSDoc仕様に従い、以下の要素のみをコピーする：

- **summary** — コメントの要約部分
- **@remarks** ブロック
- **@param** ブロック — パラメータの説明
- **@typeParam** ブロック — 型パラメータの説明
- **@returns** ブロック — 戻り値の説明

### 宣言リファレンスによる参照

ブレース付き形式では、宣言リファレンス（Declaration Reference）を使って任意のリフレクションを参照できる。クラス階層に関係なく、任意のシンボルからドキュメントをコピーできる。

### JSDoc互換性

TypeDocはTSDocとJSDocの両方の構文をサポートしている：

- `{@inheritDoc}` — TSDoc標準のインラインタグ形式
- `@inheritDoc` — JSDocスタイルのブロックレベル形式

JSDocスタイル（ブレースなし）の場合、TypeDocは親リフレクションから自動的にコメントを継承する。

## コード例

### 基本的な使用例

```typescript
/**
 * 基底クラスのドキュメント。
 * このクラスはデータの処理を行う。
 *
 * @remarks
 * 詳細な実装ノート。
 */
export class SomeClass {}

/** {@inheritDoc SomeClass} */
export interface SomeUnrelatedClass {}
```

この例では、`SomeClass` のドキュメント（summary、@remarks）が `SomeUnrelatedClass` にコピーされる。

### クラス階層での使用

```typescript
export class Base {
  /**
   * 要素を処理する。
   *
   * @param input - 処理対象の入力値
   * @returns 処理結果
   */
  process(input: string): string {
    return input;
  }
}

export class Derived extends Base {
  /** {@inheritDoc Base.process} */
  process(input: string): string {
    return input.toUpperCase();
  }
}
```

### JSDocスタイルの自動継承

```typescript
export class Base {
  /**
   * 初期化処理を実行する。
   */
  init(): void {}
}

export class Child extends Base {
  /**
   * @inheritDoc
   */
  init(): void {
    // 親クラスのドキュメントが自動的に継承される
  }
}
```

## 注意点

- TSDoc仕様に基づき、コピーされるのはsummary、@remarks、@param、@typeParam、@returnsのみ
- `{@inheritDoc}` （ブレース付き）はインラインタグとして扱われる
- `@inheritDoc` （ブレースなし）はブロックレベルタグとして扱われ、親リフレクションからの継承を行う
- TSDocではインラインタグ、JSDocではブロックレベルタグという分類の違いがある
- 宣言リファレンスの構文に従って参照先を指定する

## 関連

- [@include](./include.md) — 外部ファイルからのコンテンツ取り込み
- [@link](./link.md) — 他のリフレクションへのリンク作成
- [Declaration References](../guides/declaration-references.md) — 宣言リファレンスの構文
