# @link / @linkcode / @linkplain

他のリフレクション（シンボル）やURL等へのリンクを作成するインラインタグ。TSDoc仕様に準拠。3つのバリアントが存在し、それぞれリンクテキストの表示方法が異なる。

## 構文

### @link

```
{@link Target}
{@link Target | カスタムテキスト}
{@link Target カスタムテキスト}
```

### @linkcode

```
{@linkcode Target}
{@linkcode Target | カスタムテキスト}
```

### @linkplain

```
{@linkplain Target}
{@linkplain Target | カスタムテキスト}
```

### 構文パターンの詳細

1. **基本形式**: `{@link Foo.Bar}` — ターゲットの最後のセグメント（`Bar`）がリンクテキストになる
2. **パイプ形式**: `{@link Foo.Bar | カスタムテキスト}` — パイプの後のテキストがリンクテキストになる
3. **スペース区切り形式**（TypeDoc拡張）: `{@link Foo.Bar カスタムテキスト}` — パイプなしでカスタムテキストを指定できる

## 詳細説明

### 3つのバリアントの違い

- **@link** — デフォルトのリンク表示。TypeDocの設定によってコードフォントで表示される場合がある
- **@linkcode** — リンクテキストをコードフォント（`<code>`）で表示する
- **@linkplain** — リンクテキストをプレーンテキスト（通常フォント）で表示する

### リンク解決メカニズム

TypeDocは2段階のリンク解決を行う：

#### 1. TypeScript解決（プライマリ）

`--useTsLinkResolution` オプション（デフォルトで有効）により、TypeScriptのシンボル解決を利用する。これはVisual Studio Codeのリンク解決と同じ動作をする。

#### 2. 宣言リファレンス解決（フォールバック）

`--useTsLinkResolution` が無効の場合、またはTypeScript解決が失敗した場合、TypeDocは宣言リファレンス（Declaration Reference）による解決を試みる。

### TypeScript解決の制限

TypeScriptのリンク解決は、意味修飾子（meaning qualifier）をサポートしない。例えば `:namespace` や `:enum` といった修飾子は使用できない。同じ名前がnamespaceとenumの両方を指す場合、TypeScript解決ではenumのみがターゲットになる。

この場合、`--useTsLinkResolution` を無効にするか、宣言リファレンスの修飾子を使って明示的に指定する必要がある。

### 宣言リファレンス構文

TypeDocはTSDocのオリジナル構文ではなく、新しい宣言リファレンス仕様を実装している。

## コード例

### 基本的なリンク

```typescript
/**
 * 詳細は {@link SomeClass} を参照。
 */
export function helper(): void {}
```

### カスタムテキスト付きリンク

```typescript
/**
 * 設定については {@link Config | 設定オブジェクト} を参照。
 * または {@link Config 設定オブジェクト} でも可。
 */
export function initialize(): void {}
```

### @linkcode の使用

```typescript
/**
 * この関数は内部で {@linkcode processData} を呼び出す。
 * リンクテキストがコードフォントで表示される。
 */
export function run(): void {}
```

### @linkplain の使用

```typescript
/**
 * 詳細は {@linkplain Config 設定ドキュメント} を参照。
 * リンクテキストがプレーンテキストで表示される。
 */
export function setup(): void {}
```

### メンバーへのリンク

```typescript
/**
 * {@link SomeClass.someMethod} を使って処理を実行する。
 * {@link SomeModule.SomeClass.someMethod | メソッドの詳細}
 */
export function execute(): void {}
```

### ラベル付きオーバーロードへのリンク

```typescript
/**
 * 精度指定丸めには {@link round:PRECISION} を使用する。
 */
export const value = round(3.14159, 2);
```

### 意味修飾子を使った明確化

```typescript
/**
 * namespaceとしての {@link MyModule:namespace} と
 * enumとしての {@link MyModule:enum} は異なる。
 *
 * 注意: 意味修飾子はuseTsLinkResolutionが無効の場合のみ機能する。
 */
```

## 注意点

- `--useTsLinkResolution` はデフォルトで有効。TypeScriptのスコープ内シンボルに基づいてリンクを解決する
- TypeScript解決は意味修飾子（`:namespace`、`:enum` 等）をサポートしない
- 同名のnamespaceとenumが存在する場合、TypeScript解決ではenumが優先される
- スペース区切り形式（`{@link Target text}`）はTypeDoc独自の拡張
- JSDocの `@linkplain` と `@linkcode` も認識され、同じ解決ロジックが適用される
- TypeDocは新しい宣言リファレンス仕様を実装しており、TSDocのオリジナル構文とは異なる

## 関連

- [@label](./label.md) — オーバーロードシグネチャにラベルを付けて参照可能にする
- [@inheritDoc](./inheritDoc.md) — 他のリフレクションからドキュメントをコピー
- [Declaration References](../guides/declaration-references.md) — 宣言リファレンスの構文
