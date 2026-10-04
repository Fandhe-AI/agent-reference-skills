# Questionnaire

単一選択・複数選択・自由記述・スキップ可の質問を多段で提示する shadcn/ui Questionnaire 相当の部品。Root / Progress / Question / Prompt / Description / Options / Freeform / Actions / Back / Next / Skip の 11 anatomy パーツと、`count`（全質問数）・`step`（現在位置）から質問の表示状態を導出する状態機械 `Questionnaire` を持つ。

## Signature / Usage

```rust
use fandhe_frontend_core::text;
use fandhe_frontend_headless_ui::data_attrs::Orientation;
use fandhe_frontend_headless_ui::questionnaire::{Questionnaire, QuestionProps};

let q = Questionnaire::new(2, 0, Orientation::Horizontal);

let node = q.root(vec![], vec![
    q.progress("Survey progress", vec![], vec![]),
    q.question(0, QuestionProps::default(), vec![], vec![
        q.prompt(vec![], vec![text("Favorite language?")]),
        q.options(vec![], vec![/* radio_group のパーツを入れ子にする */]),
    ]),
    q.question(1, QuestionProps::default(), vec![], vec![
        q.prompt(vec![], vec![text("Any comments?")]),
        q.freeform(vec![], vec![/* field の textarea を入れ子にする */]),
    ]),
    q.actions(vec![], vec![
        q.back(false, vec![], vec![text("Back")]),
        q.skip(false, vec![], vec![text("Skip")]),
        q.next(false, vec![], vec![text("Next")]),
    ]),
]);
```

```rust
Questionnaire::new(count: usize, step: usize, orientation: Orientation) -> Self
Questionnaire::{count, step, orientation, is_completed}(&self)
q.root(attrs, children) -> Node
q.progress(label: &str, attrs, children) -> Node
q.question(index: usize, props: QuestionProps, attrs, children) -> Node
q.prompt(attrs, children) / q.description(attrs, children) / q.options(attrs, children)
q.freeform(attrs, children) / q.actions(attrs, children)
q.back(disabled: bool, attrs, children) / q.next(disabled, ...) / q.skip(disabled, ...)
```

## Anatomy

典型的な入れ子の一例。ソースで裏付けられるのは `prompt`（`legend`）を `question` の先頭子に置くこと、`options` / `freeform` が純スロットであること、`actions` が back / next / skip を束ねることのみ。

```
root
  progress
  question (fieldset)
    prompt (legend)
    description
    options
    freeform
  actions
    back
    next
    skip
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `Questionnaire::new: count` | `usize` | `1`（`Default`） | 全質問数。`normalize` で fail-closed 正規化（`count >= 1`） |
| `Questionnaire::new: step` | `usize` | `0`（`Default`） | 現在位置 `0..=count`。`step == count` は全質問完了 |
| `Questionnaire::new: orientation` | `Orientation` | `Horizontal`（`Default`） | `data-orientation` に反映 |
| `question: index` | `usize` | 必須 | 0-origin。`step` との比較で `data-state` を導出 |
| `QuestionProps.answered` | `bool` | `false` | `data-answered` |
| `QuestionProps.skipped` | `bool` | `false` | `data-skipped`（どの質問をスキップしたかは呼び出し側が保持） |
| `QuestionProps.required` | `bool` | `false` | `data-required` |
| `QuestionProps.invalid` | `bool` | `false` | `data-invalid` + `aria-invalid="true"` |
| `progress: label` | `&str` | 必須 | 空文字でないときのみ `aria-label` |
| `back` / `next` / `skip: disabled` | `bool` | — | 必須判定の結果（真偽）。境界条件と OR して `disabled` + `data-disabled` |

## Actions

`QuestionnaireAction`（`Questionnaire::update`）と dispatch 名:

| Variant | dispatch 名 | Description |
| --- | --- | --- |
| `Next` | `"next"` | 次へ。`step == count` では no-op |
| `Prev` | `"prev"` | 前へ。`step == 0` では no-op |
| `Skip` | `"skip"` | 状態遷移は `Next` と同一 |
| `Goto(usize)` | `"goto"` (payload=step) | 指定 step へ移動。`> count` は no-op |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root | `data-orientation` | `horizontal` \| `vertical` |
| root | `data-step` | 現在の step（数値） |
| root / progress | `data-complete` | presence（root は `step == count`、progress は percent == 100） |
| question | `data-index` | 質問の index |
| question | `data-state` | `completed`（`index < step`）\| `active`（`index == step`）\| `upcoming`（`index > step`） |
| question | `data-answered` / `data-skipped` / `data-required` / `data-invalid` | presence |
| back / next / skip | `data-disabled` | presence |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/primitives/questionnaire/
- 責務境界: 回答値の保持・検証（必須判定）・分岐（次にどの質問へ進むか）・送信はアプリケーション側。部品は「現在位置に応じた質問の表示状態切替と前へ / 次へ / スキップのトリガー」まで。
- `active` 以外の `question` には `hidden` が付き、タブ操作・支援技術から除外される。`step == count` では `next` / `skip` が無条件で無効化される。`back` は `step == 0` で無効化される。
- `question` は `fieldset`。`prompt`（`legend`）を先頭子に置く契約で、ネイティブなグループ名が id 配管なしで付く。
- `progress` は `role="progressbar"` + `aria-valuemin="0"` / `aria-valuemax="100"` / `aria-valuenow` / `aria-valuetext`（`{percent}% complete`）。
- `options` は Radio Group / Checkbox Group のパーツ、`freeform` は Field の `textarea` を入れ子にする純スロット。各 `data-scope` は questionnaire scope と独立して残る。
- `back` / `next` / `skip` は `button type="button"`。キーボード操作は Tab / Shift+Tab / Enter / Space のみで、矢印キー等の独自ハンドリングはない。
- 公式 docs: back / next / skip の click → dispatch の DOM 配線は `fandhe-frontend-wasm-full` 0.18.0 以降の `Runtime::mount` / `Runtime::hydrate` が自動配線する。遷移が実際に起きたときのみアプリへ `"questionnaire:prev"` / `"questionnaire:next"` / `"questionnaire:skip"`（payload は遷移前の step）が通知される。
- shadcn/ui との差分: `QuestionnaireError` / `QuestionnaireSubmit` / `QuestionnaireChoice` / `QuestionnaireInput`、英数字キーのショートカット、`items` 配列からの一括描画、回答状態管理、バリデーション、失敗時のフォーカス移動は非採用。
- 自前 CSS の最小例: `[data-scope="questionnaire"][data-part="question"][hidden] { display: none; }`。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui`）。

## Related

- [Radio Group](./radio-group.md)
- [Checkbox Group](./checkbox-group.md)
- [Field](./field.md)
- [Steps](../collections/steps.md)
- [Progress](../display/progress.md)
- [Questionnaire（Themes 版）](../../themes/forms/questionnaire.md)
