# EditorConfig ベストプラクティス

`.editorconfig` の設定例、FAQ、よくあるパターン。

## 基本的な設定例

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

## 言語別の設定パターン

### Web 開発（JavaScript / TypeScript）

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

### Python

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

### Go

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

### Java / Kotlin

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

## よくあるパターン

### Markdown の末尾空白を保持

Markdown では行末の2つのスペースが改行を意味するため、`trim_trailing_whitespace` を無効にする。

```ini
[*.md]
trim_trailing_whitespace = false
```

### Makefile はタブ必須

Makefile のレシピ行はハードタブが必須。

```ini
[Makefile]
indent_style = tab
```

### 特定プロパティの無効化

`unset` を使ってプロパティの効果を打ち消し、エディタのデフォルトに戻す。

```ini
[*.generated.*]
indent_size = unset
indent_style = unset
```

### 複数ファイルタイプをまとめて設定

波括弧で複数の拡張子をグループ化できる。

```ini
[*.{json,yml,yaml,toml}]
indent_style = space
indent_size = 2

[*.{ts,tsx,js,jsx}]
indent_style = space
indent_size = 2
```

## FAQ

### Q: EditorConfig は既存ファイルを自動リフォーマットする？

**A: しない。** EditorConfig プラグインは新しく入力された行にのみ設定を適用する。既存コードのリフォーマットには別ツール（eclint, editorconfig-checker 等）が必要。

### Q: EditorConfig とフォーマッター（Prettier, Biome 等）は競合する？

**A: 通常は競合しない。** 多くのフォーマッターは `.editorconfig` を自動で読み取る。Prettier は `indent_style`, `indent_size`, `end_of_line` を `.editorconfig` から取得する。設定が異なる場合はフォーマッター側の設定が優先されることがある。

### Q: `.editorconfig` を CI で検証するには？

**A:** 以下のツールが利用可能:

- **editorconfig-checker** — 最も広く使われている検証ツール
- **eclint** — EditorConfig ルールに基づくリンター
- **editorconfig-maven-plugin** — Maven プロジェクト向け
- **editorconfig-gradle-plugin** — Gradle プロジェクト向け

### Q: Windows で `.editorconfig` ファイルを作成するには？

**A:** エクスプローラーで `.editorconfig.`（末尾にドット）を入力すると、自動的に `.editorconfig` にリネームされる。

### Q: `indent_size = tab` とは？

**A:** `indent_size` を `tab_width` の値と同じにする特殊値。`tab_width` が未指定の場合はエディタのデフォルトタブ幅が使用される。

## 関連

- [specification](./specification.md) — 正式仕様
- [properties](./properties.md) — 全プロパティ詳細
- [glob-patterns](./glob-patterns.md) — グロブパターン
