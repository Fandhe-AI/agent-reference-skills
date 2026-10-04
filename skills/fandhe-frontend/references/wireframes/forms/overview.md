# Wireframes: Forms

`fandhe-frontend-wireframe-ui` の Forms カテゴリ（13 部品）。フォーム部品の配置イメージだけを示す、非インタラクティブ・SSR 専用の低忠実度プレースホルダー群。

## Signature / Usage

| 名前 | 関数 | 説明 | 個別ページ |
|------|------|------|-----------|
| Button | `button` | ラベル + 任意の先頭アイコン + サイズ / 強調 / 無効 | [button.md](./button.md) |
| Calendar | `calendar` | 月ラベル + 週ごと 7 マスの月表示グリッド（独自追加） | [calendar.md](./calendar.md) |
| Checkbox | `checkbox` | 正方形ボックス + 任意ラベル | [checkbox.md](./checkbox.md) |
| File drop | `file_drop` | 点線枠のファイルドロップ領域（独自追加） | [file-drop.md](./file-drop.md) |
| Input | `input` | 先頭アイコン + プレースホルダー風テキストのフィールド | [input.md](./input.md) |
| Question | `question` | ラベル + 補足 + `control` スロット + ヒントの質問項目 | [question.md](./question.md) |
| Radio | `radio` | 円形コントロール + 任意ラベル（単体 1 個） | [radio.md](./radio.md) |
| Ratings | `ratings` | 星 5 個のうち塗った個数を示す星評価 | [ratings.md](./ratings.md) |
| Select | `select` | 表示文言 + 任意の先頭アイコン + 固定のドロップダウン指示子 | [select.md](./select.md) |
| Slider | `slider` | トラック + 円形ハンドルの進捗表示 | [slider.md](./slider.md) |
| Stepper | `stepper` | 番号付きステップの横並び進捗表示（独自追加） | [stepper.md](./stepper.md) |
| Switch | `switch` | 楕円トラック + つまみ + 任意ラベル | [switch.md](./switch.md) |
| Textarea | `textarea` | 行プレースホルダーを並べた複数行入力欄（独自追加） | [textarea.md](./textarea.md) |

カテゴリ共通の使い方（`question` の `control` スロットに他の Forms 部品をそのまま渡す。呼び出し側は同じ `size` を両方に渡す）:

```rust
use fandhe_frontend_wireframe_ui::{icon, question, select, Active, Disabled, Size};

question(
    "担当者を選んでください",
    Some("直近の対応履歴から自動で絞り込まれます"),
    select(
        "山田太郎",
        Some(icon::user(Size::Md)),
        Size::Md,
        Active(true),
        Disabled(false),
    ),
    Some("後から変更できます"),
    Size::Md,
)
```

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/wireframes/
- Forms 部品はすべて位置引数の関数で、props 構造体は無い。戻り値は `fandhe_frontend_core::Node`
- 低忠実度のワイヤーフレーム部品であり、Primitives / Themes の同名コンポーネントとは別物。`<button>` / `<input>` / `<select>` 等の対話要素や `role` / `aria-*` / `tabindex` は出力しない（アイコンの装飾用 `aria-hidden="true"` を除く）
- `@ark-ui/react` / `@chakra-ui/react` の JS/TS API とも無関係（Rust 製）
- 先頭 / 末尾アイコンは `Option<Node>` スロットで受け、`icon::plus(size)` 等の戻り値をそのまま渡す
- 表示状態は共通型 `Active`（`data-active`）と `Disabled`（`data-disabled`）で表す。`Active` の意味は部品ごとに異なる（フォーカス風 / チェック済み / 選択済み / ON など）
- blocks.pm に対応部品を持たない独自追加は calendar / file_drop / stepper / textarea（各ページの公式 md に記載）。Calendar と Stepper の公式 md が名指しする近接部品は、Calendar が Themes / Primitives の Calendar と Date Picker、Stepper が Themes / Primitives の Steps

## Related

- [共通型 (Size / Primary / Active / Disabled ほか)](../foundations/common-types.md)
- [Layout overview](../layout/overview.md)
