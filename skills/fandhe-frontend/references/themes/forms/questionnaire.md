# Questionnaire

shadcn/ui Questionnaire 相当の多段質問 UI のスタイル済み部品。headless `Questionnaire` 状態機械（`count` = 全質問数、`step` = 現在位置）へ薄く委譲する 11 パーツ構成。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::questionnaire::Questionnaire;
use fandhe_frontend_headless_ui::Orientation;
use fandhe_frontend_pre_styled_ui::questionnaire::{self, QuestionProps};

let state = Questionnaire::new(3, 0, Orientation::Horizontal);
let node = questionnaire::root(&state, vec![], vec![
    questionnaire::question(&state, 0, QuestionProps::default(), vec![], vec![]),
]);
```

`stylesheet() -> String` が静的 CSS 全量を返す。`QuestionProps` / `QuestionnaireAction` は headless 層から再エクスポートされる。全パーツ関数は `state: &Questionnaire` を第 1 引数に取り、headless 層の同名メソッドへ委譲する。

```rust
pub fn root<'a>(state: &Questionnaire, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn progress<'a>(state: &Questionnaire, label: &'a str, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn question<'a>(state: &Questionnaire, index: usize, props: QuestionProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn prompt<'a>(state: &Questionnaire, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn description<'a>(state: &Questionnaire, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn options<'a>(state: &Questionnaire, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn freeform<'a>(state: &Questionnaire, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn actions<'a>(state: &Questionnaire, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn back<'a>(state: &Questionnaire, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn next<'a>(state: &Questionnaire, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn skip<'a>(state: &Questionnaire, disabled: bool, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
```

## Anatomy

`root` / `progress` / `question` / `prompt` / `description` / `options` / `freeform` / `actions` / `back` / `next` / `skip`

## Options / Props

`QuestionProps`（`question` の表示状態フラグ。全フィールド既定 `false`）:

| Name | Type | Description |
|------|------|-------------|
| `answered` | `bool` | 回答済み（`data-answered`） |
| `skipped` | `bool` | スキップ済み（`data-skipped`） |
| `required` | `bool` | 必須（`data-required`） |
| `invalid` | `bool` | 不正（`data-invalid`） |

`QuestionnaireAction`: `Next` / `Prev` / `Skip` / `Goto(usize)`（指定 step へ直接移動、`0..=count` の範囲内のみ有効）。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/themes/questionnaire/
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）
- `size` / `colorPalette` のような見た目クラス軸は持たない。見た目は headless が出力する `data-state`（`active` / `completed` / `upcoming`）・`data-answered` / `data-skipped` / `data-required` / `data-invalid` / `data-disabled` / `data-complete` を CSS セレクタとして参照して切り替わる
- `question` は非 active（`completed` / `upcoming`）のとき常に `hidden` 属性を伴う。`completed` / `upcoming` の枠色・破線表現が可視化されるのは、アプリケーション側が独自 CSS で `[hidden]` を打ち消して一覧表示する場合（回答レビュー画面等）に限られる
- `progress` は中身空の `role="progressbar"` な `div`。スタイル済み Progress は入れ子にせず、`step` / `count` から計算した百分率を `--fandhe-questionnaire-percent` custom property として `style` に設定し、CSS の `linear-gradient` で塗り幅を表す。ステップ遷移後の更新はアプリケーション側の責務で、`fandhe-frontend-wasm-full` の back / next / skip 配線はこの custom property を更新しない。呼び出し側 `class` / `style` は除去される
- `options` は純スロット。スタイル済み RadioGroup / CheckboxGroup の item を入れ子にする。CSS は item をカード状（枠線 + パディング）に整形する子孫セレクタを含むが item の基本規則は含まないため、RadioGroup / CheckboxGroup 自身の CSS も読み込む必要がある
- `freeform` も純スロットで、Field の label や Textarea を入れ子にする想定
- 回答値の保持・検証（必須判定）・分岐・送信はアプリケーションロジックで本部品では実装しない。`next` / `skip` の無効化は必須判定の結果（真偽）を呼び出し側が引数 `disabled` で渡す契約

## Related

- [Questionnaire (primitives)](../../primitives/form/questionnaire.md)
- [Radio Group](./radio-group.md)
- [Checkbox Group](./checkbox-group.md)
- [Field](./field.md)
- [Textarea](./textarea.md)
