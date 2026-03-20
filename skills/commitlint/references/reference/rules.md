# Rules

> Source: https://commitlint.js.org/reference/rules

commitlint の全ルール一覧。各ルールは `[Level, Applicable, Value]` の形式で設定する。

## case に指定可能な値

以下のルールで `case` を指定する場合に使用できる値:

- `lower-case` — 小文字（例: `somename`）
- `upper-case` — 大文字（例: `SOMENAME`）
- `camel-case` — キャメルケース（例: `someName`）
- `kebab-case` — ケバブケース（例: `some-name`）
- `pascal-case` — パスカルケース（例: `SomeName`）
- `sentence-case` — 文頭のみ大文字（例: `Some name`）
- `snake-case` — スネークケース（例: `some_name`）
- `start-case` — 各語頭を大文字（例: `Some Name`）

---

## body ルール

### body-case

- **条件**: body が指定された case であること
- **Applicable**: `always`
- **デフォルト値**: `lower-case`
- **設定可能な値**: 上記 case 一覧

### body-empty

- **条件**: body が空であること
- **Applicable**: `never`

### body-full-stop

- **条件**: body が指定値で終わること
- **Applicable**: `never`
- **デフォルト値**: `'.'`

### body-leading-blank

- **条件**: body が空行で始まること
- **Applicable**: `always`

### body-max-length

- **条件**: body が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### body-max-line-length

- **条件**: body の各行が指定値以下の文字数であること（URL を含む行は除外）
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### body-min-length

- **条件**: body が指定値以上の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `0`

---

## header ルール

### header-case

- **条件**: header が指定された case であること
- **Applicable**: `always`
- **デフォルト値**: `lower-case`
- **設定可能な値**: 上記 case 一覧

### header-full-stop

- **条件**: header が指定値で終わること
- **Applicable**: `never`
- **デフォルト値**: `'.'`

### header-max-length

- **条件**: header が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `72`

### header-min-length

- **条件**: header が指定値以上の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `0`

### header-trim

- **条件**: header の先頭・末尾に空白がないこと
- **Applicable**: `always`

---

## type ルール

### type-case

- **条件**: type が指定された case であること
- **Applicable**: `always`
- **デフォルト値**: `lower-case`
- **設定可能な値**: 上記 case 一覧

### type-empty

- **条件**: type が空であること
- **Applicable**: `never`

### type-enum

- **条件**: type が指定値のいずれかであること
- **Applicable**: `always`
- **デフォルト値**: `["build", "chore", "ci", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"]`

```javascript
// 使用例: 許可する type を制限
export default {
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "docs", "chore"]],
  },
};
```

### type-max-length

- **条件**: type が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### type-min-length

- **条件**: type が指定値以上の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `0`

---

## scope ルール

### scope-case

- **条件**: scope が指定された case であること
- **Applicable**: `always`
- **デフォルト値**: `lower-case`
- **設定可能な値**: 上記 case 一覧

拡張設定（オブジェクト形式）:

```javascript
// オブジェクト形式で case とデリミタを指定
{
  cases: ["kebab-case"],
  delimiters: ["/"]
}
```

- `cases`: 許可する case のリスト
- `delimiters`: マルチセグメント scope を分割するデリミタ（デフォルト: `["/", "\\", ","]`）

### scope-delimiter-style

- **条件**: scope 内の全デリミタが指定値と一致すること
- **Applicable**: `always`
- **デフォルト値**: `["/", "\\", ","]`

### scope-empty

- **条件**: scope が空であること
- **Applicable**: `never`

### scope-enum

- **条件**: scope が指定値のいずれかであること
- **Applicable**: `always`
- **デフォルト値**: `[]`（空配列 = 全て許可）

```javascript
// 使用例: 許可する scope を制限
export default {
  rules: {
    "scope-enum": [2, "always", ["core", "ui", "api", "docs"]],
  },
};
```

拡張設定（オブジェクト形式）:

```javascript
// オブジェクト形式で scope とデリミタを指定
{
  scopes: ["foo", "bar"],
  delimiters: ["/"]
}
```

- `scopes`: 許可する scope 値のリスト
- `delimiters`: scope を分割するデリミタ（デフォルト: `["/", "\\", ","]`）

> **注意**: `scope-case`, `scope-enum`, `scope-delimiter-style` を併用する場合は、同じ `delimiters` 設定を使用すること。そうしないと scope のパースが不整合になる可能性がある。

### scope-max-length

- **条件**: scope が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### scope-min-length

- **条件**: scope が指定値以上の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `0`

---

## subject ルール

### subject-case

- **条件**: subject が指定された case であること
- **Applicable**: `always`
- **デフォルト値**: `["sentence-case", "start-case", "pascal-case", "upper-case"]`
- **設定可能な値**: 上記 case 一覧

### subject-empty

- **条件**: subject が空であること
- **Applicable**: `never`

### subject-exclamation-mark

- **条件**: subject の `:` マーカーの前に `!` があること
- **Applicable**: `never`

### subject-full-stop

- **条件**: subject が指定値で終わること
- **Applicable**: `never`
- **デフォルト値**: `'.'`

### subject-max-length

- **条件**: subject が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### subject-min-length

- **条件**: subject が指定値以上の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `0`

---

## footer ルール

### footer-empty

- **条件**: footer が空であること
- **Applicable**: `never`

### footer-leading-blank

- **条件**: footer が空行で始まること
- **Applicable**: `always`

### footer-max-length

- **条件**: footer が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### footer-max-line-length

- **条件**: footer の各行が指定値以下の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `Infinity`

### footer-min-length

- **条件**: footer が指定値以上の文字数であること
- **Applicable**: `always`
- **デフォルト値**: `0`

---

## その他のルール

### breaking-change-exclamation-mark

- **条件**: header の `:` マーカーの前に `!` があるかどうかと、footer に `BREAKING CHANGE:` または `BREAKING-CHANGE:` にマッチする行があるかどうかの XNOR
- **Applicable**: `always`
- **動作**: 両方が存在するか、両方が存在しない場合にパス。一方のみ存在する場合は失敗

### references-empty

- **条件**: references に少なくとも 1 つのエントリがあること
- **Applicable**: `never`

### signed-off-by

- **条件**: メッセージに指定値が含まれること
- **Applicable**: `always`
- **デフォルト値**: `'Signed-off-by:'`

### trailer-exists

- **条件**: メッセージに指定のトレーラーが含まれること
- **Applicable**: `always`
- **デフォルト値**: `'Signed-off-by:'`
