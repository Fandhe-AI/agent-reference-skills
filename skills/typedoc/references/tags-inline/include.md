# @include / @includeCode

外部ファイルの内容をドキュメントコメントに直接取り込むためのインラインタグ。`@include` はMarkdownコンテンツをそのまま挿入し、`@includeCode` はファイル内容をコードブロックとして挿入する（ファイル拡張子に基づくシンタックスハイライト付き）。

## 構文

```
{@include ./path/to/file.md}
{@includeCode ./path/to/file.ts}
```

### 部分的なファイル取り込み（リージョン指定）

名前付きリージョンを使って、ファイルの特定部分のみを取り込むことができる。リージョンの区切りはVS Codeの折りたたみ規約に従う。

```
{@includeCode ./file.ts#regionName}
{@includeCode ./file.ts#region1,region2}
```

#### 言語別リージョン構文

- **TypeScript / JavaScript:**
  ```typescript
  // #region regionName
  // コード
  // #endregion regionName
  ```

- **Markdown:**
  ```markdown
  <!-- #region regionName -->
  コンテンツ
  <!-- #endregion regionName -->
  ```

- **Python:**
  ```python
  # region regionName
  # コード
  # endregion regionName
  ```
  または:
  ```python
  #region regionName
  #endregion regionName
  ```

- **C# / PHP / PowerShell:**
  ```csharp
  #region regionName
  // コード
  #endregion regionName
  ```

### 部分的なファイル取り込み（行番号指定）

リージョンコメントを追加できない場合、行番号で範囲を指定できる。

```
{@includeCode ../../package.json:2,6-7}
```

- コロン（`:`）の後に行番号をカンマ区切りで指定
- 範囲指定にはハイフン（`-`）を使用（例: `6-7`）
- 行番号は1始まり（Line 1が先頭行）

## 詳細説明

### @include の動作

`@include` タグが検出されると、TypeDocは指定されたファイルのコンテンツを読み込み、タグの位置にそのままMarkdownとして挿入する。これにより、共通のドキュメントを複数の場所で再利用できる。

### @includeCode の動作

`@includeCode` は `@include` と同様にファイルを読み込むが、内容をコードブロック（フェンスドコードブロック）で囲んで挿入する。ファイル拡張子に基づいて自動的にシンタックスハイライトが適用される。

### パス指定

パスはPOSIXスタイルのスラッシュ（`/`）を使用すること。Windowsスタイルのパス区切り文字（`\`）は使用しない。これにより、クロスプラットフォームでの互換性が確保される。

## コード例

### 基本的な使用例

```typescript
/**
 * この関数の使い方の詳細は以下を参照：
 *
 * {@include ./docs/usage-guide.md}
 */
export function processData(input: string): void { /* ... */ }
```

### コードファイルの取り込み

```typescript
/**
 * 設定ファイルの例：
 *
 * {@includeCode ./examples/config.ts}
 */
export interface Config { /* ... */ }
```

### リージョン指定の使用例

```typescript
// examples/helpers.ts
// #region validation
function validateInput(input: string): boolean {
  return input.length > 0;
}
// #endregion validation

// ドキュメントコメント内で使用
/**
 * バリデーション処理の例：
 *
 * {@includeCode ./examples/helpers.ts#validation}
 */
export function validate(input: string): boolean { /* ... */ }
```

### 複数リージョンの取り込み

```typescript
/**
 * 以下のコードを参照：
 *
 * {@includeCode ./examples/helpers.ts#setup,validation}
 */
```

### 行番号指定の使用例

```typescript
/**
 * package.jsonの関連部分：
 *
 * {@includeCode ../../package.json:2,6-7}
 */
```

## 注意点

- パスはPOSIXスタイルのスラッシュ（`/`）を使用すること。Windowsスタイルのバックスラッシュは使用不可
- 行番号による指定は、ファイルが変更されるたびに参照が壊れる可能性があるため、できるだけリージョン指定を使用すること
- 行番号は1始まり（エディタの表示と同じ）
- 複数のリージョンはカンマ区切りで指定可能
- `jsdocCompatibility` オプションが関連するドキュメント処理の動作を制御する

## 関連

- [@link](./link.md) — 他の要素へのリンク作成
- [@inheritDoc](./inheritDoc.md) — 他のリフレクションからドキュメントをコピー
