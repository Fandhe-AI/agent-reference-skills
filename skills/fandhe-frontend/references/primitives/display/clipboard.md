# Clipboard

値コピー・コピー済み表示の headless コンポーネント。Root / Label / Control / Input / Trigger / Indicator / ValueText の 7 anatomy パーツと、コピー済みかどうかの 2 値状態機械 `Clipboard` を提供する。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::clipboard::{
    root, label, control, input, trigger, indicator, value_text, Clipboard,
    TRIGGER_ARIA_LABEL_IDLE, TRIGGER_ARIA_LABEL_COPIED,
};

// 自由関数
let node = root("https://example.com", false, vec![], vec![
    label(false, Some("clip-input"), vec![], vec![]),
    control(false, vec![], vec![
        input("https://example.com", false, vec![("id", "clip-input")]),
        trigger(false, vec![], vec![]),
    ]),
]);

// 状態機械経由
let clipboard = Clipboard::new(false);
let node = clipboard.root("https://example.com", vec![], vec![
    clipboard.label(Some("clip-input"), vec![], vec![]),
    clipboard.trigger(vec![], vec![]),
]);
```

## Anatomy

```
root
  label
  control
    input
    trigger
      indicator
  value-text
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root: value` | `&str` | 必須 | コピー対象値。`data-value` としてそのまま出力される |
| `root/label/control/input/trigger/indicator: copied` | `bool` | `false` | コピー済みかどうか。`data-copied` 存在属性（`indicator` は可視性）に反映 |
| `label: input_id` | `Option<&str>` | — | `Some(id)` のとき `for` で `input` の `id` へ明示的に紐付ける。呼び出し側 `attrs` が `for` を指定していれば出力しない |
| `indicator: is_copied_variant` | `bool` | — | `true` で「コピー済み」表示用変種、`false` で「未コピー」表示用変種を組み立てる |

## Data Attributes

| Part | Attribute | Values |
| --- | --- | --- |
| root / label / control / input / trigger | `data-copied` | 存在属性（`copied=true` のときのみ） |
| input | `data-readonly` | 存在属性（常時付与。`readonly` 属性も併せて出力） |
| indicator | `data-state` | `visible` \| `hidden` |
| indicator | `data-variant` | `copied` \| `idle` |
| root | `data-value` | コピー対象値のテキスト |

## Notes

- `value`（コピー対象値）は状態機械のフィールドに含めない。各パーツ関数へ都度渡す描画パラメータ。
- `input` はコピー元テキストの表示専用（`type="text" readonly`）でフォーム送信を目的としない（`name` 属性を持たない）。
- `trigger` は既定の `aria-label` を出力する（`TRIGGER_ARIA_LABEL_IDLE` = `"Copy to clipboard"`、`copied=true` のとき `TRIGGER_ARIA_LABEL_COPIED` = `"Copied to clipboard"`）。呼び出し側 `attrs` に `aria-label` があれば既定値は出力しない。`aria-label` 反転のクライアント配線はクライアント層の責務。
- `input` フォーカス時の全選択・Ctrl+C / Cmd+C 検知による `"clipboard:copy"` 発火、`translations.triggerLabel` 相当の i18n 差し替え API は未提供（独自 `aria-label` を `attrs` に渡して代替）。
- `value_text` は装飾用パーツ（`span`、`children` は呼び出し側が組み立てる）。
- dispatch アクション名は `"clipboard:copy"`/`"clipboard:reset"`（他コンポーネントの裸の `"copy"`/`"reset"` との衝突を避けるため名前空間修飾されている）。
- タイムアウト経過後の自動リセットは headless 層の責務外（クライアント配線層の責務）。
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。`asChild`/`ids` オプションは提供しない。

## Related

- [Avatar](./avatar.md)
