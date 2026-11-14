---
source: https://editorconfig.org/
---

# EditorConfig ベストプラクティス

`.editorconfig` の設定例、FAQ、よくあるパターン。

## Signature / Usage

### 基本的な設定例

```ini
# プロジェクトルート
root = true

# デフォルト設定（全ファイル）
[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2
```

### 言語別の設定パターン

#### Web 開発（JavaScript / TypeScript）

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

#### Python

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.py]
indent_style = space
indent_size = 4

[*.{yml,yaml}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
```

#### Go

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8

[*.go]
indent_style = tab
indent_size = 4

[*.{yml,yaml,json}]
indent_style = space
indent_size = 2

[Makefile]
indent_style = tab
```

#### Java / Kotlin

```ini
root = true

[*]
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
charset = utf-8
indent_style = space
indent_size = 4

[*.{xml,gradle,kts}]
indent_size = 4

[*.{yml,yaml,json}]
indent_size = 2

[Makefile]
indent_style = tab
```

### よくあるパターン

#### Markdown の末尾空白を保持

Markdown では行末の2つのスペースが改行を意味するため、`trim_trailing_whitespace` を無効にする。

```ini
[*.md]
trim_trailing_whitespace = false
```

#### Makefile はタブ必須

Makefile のレシピ行はハードタブが必須。

```ini
[Makefile]
indent_style = tab
```

#### 特定プロパティの無効化

`unset` を使ってプロパティの効果を打ち消し、エディタのデフォルトに戻す。

```ini
[*.generated.*]
indent_size = unset
indent_style = unset
```

#### 複数ファイルタイプをまとめて設定

波括弧で複数の拡張子をグループ化できる。

```ini
[*.{json,yml,yaml,toml}]
indent_style = space
indent_size = 2

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2
```

## Notes

### FAQ

#### Q: EditorConfig は既存ファイルを自動リフォーマットする？

**A: しない。** EditorConfig プラグインは新しく入力された行にのみ設定を適用する。既存コードのリフォーマットには別ツール（eclint, editorconfig-checker 等）が必要。

#### Q: EditorConfig とフォーマッター（Prettier, Biome 等）の関係は？

**A:** 公式ドキュメントはフォーマッターとの連携を規定していない。各フォーマッターが `.editorconfig` を読むかどうか・どのプロパティを使うか・設定が異なる場合の優先順位は、各ツールのドキュメントで確認する（本スキルでは未確認）。

#### Q: `.editorconfig` を CI で検証するには？

**A:** 以下のツールが利用可能:

- **editorconfig-checker**
- **eclint** — EditorConfig ルールに基づくリンター
- **editorconfig-tools**
- **editorconfig-cf**
- **editorconfig-maven-plugin** — Maven プロジェクト向け
- **editorconfig-gradle-plugin** — Gradle プロジェクト向け
- **editorconfig-action**（GitHub Action、eclint を使い最上位の `.editorconfig` でスタイルを検査）

公式 FAQ は、これらのツールは現時点でいずれも完全ではないと注記している。

#### Q: Windows で `.editorconfig` ファイルを作成するには？

**A:** エクスプローラーで `.editorconfig.`（末尾にドット）を入力すると、自動的に `.editorconfig` にリネームされる。

#### Q: `indent_size = tab` とは？

**A:** `indent_size` を `tab_width` の値と同じにする特殊値。`tab_width` が未指定の場合はエディタのデフォルトタブ幅が使用される。

### 版の扱い

- 設定例は spec.editorconfig.org の仕様（取得日 2026-11-14）と editorconfig.org トップページに沿う。Windows の `.editorconfig.` の手順は editorconfig.org トップページの記述。
- Source: https://editorconfig.org/ （取得日 2026-11-14）
- Source: https://github.com/editorconfig/editorconfig/wiki/FAQ （取得日 2026-11-14）
- Source: https://spec.editorconfig.org/ （取得日 2026-11-14）

## Related

- [specification](./specification.md) — 正式仕様
- [properties](./properties.md) — 全プロパティ詳細
- [glob-patterns](./glob-patterns.md) — グロブパターン
