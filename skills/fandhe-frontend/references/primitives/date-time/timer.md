# Timer

カウントダウン/カウントアップを表示する headless コンポーネント（`data-scope="timer"`）。時計 API を一切使わず、tick（デルタミリ秒）の明示的注入のみで動作する決定的な状態機械。`idle` / `running` / `paused` / `completed` の 4 フェーズを持つ。

## Signature / Usage

```rust
pub fn root<'a>(
    countdown: bool,
    start_ms: u64,
    target_ms: u64,
    interval_ms: u64,
    elapsed_ms: u64,
    phase: TimerPhase,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;
pub fn area<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn item<'a>(unit: TimerUnit, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn item_value<'a>(unit: TimerUnit, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn item_label<'a>(unit: TimerUnit, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn separator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn control<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node;
pub fn action_trigger<'a>(
    control_kind: TimerControl,
    attrs: Vec<(&'a str, &'a str)>,
    children: Vec<Node>,
) -> Node;

pub fn segments_from_ms(ms: u64) -> (u64, u64, u64, u64);
pub fn format_segment(value: u64) -> String;

impl Timer {
    pub fn countdown(start_ms: u64, interval_ms: u64) -> Self;
    pub fn count_up(target_ms: u64, interval_ms: u64) -> Self;
}
```

`TimerUnit`（`Days`/`Hours`/`Minutes`/`Seconds`）は `item`/`item_value`/`item_label` の `data-type` 語彙、`TimerControl`（`Start`/`Pause`/`Resume`/`Reset`）は `action_trigger` の `data-action` 語彙を型で固定する。`Timer::default()` はカウントアップ・未開始・`interval_ms` 既定 `1000`（定数 `Timer::DEFAULT_INTERVAL_MS`。`root` 関数自体には既定値はなく、呼び出し側が毎回明示的に渡す）。`phase()` / `elapsed_ms()` / `is_countdown()` / `interval_ms()` / `display_ms()` / `display_segments()` / `items()`（4 セグメント分の `item` を組み立てる利便メソッド）を持つ。dispatch アクション名は `"timer:"` 名前空間で修飾: `"timer:start"` / `"timer:pause"` / `"timer:resume"` / `"timer:reset"` / `"timer:tick"`（ミリ秒 payload）。

## Anatomy

```
root
  area
    item
      item-value
      item-label
    separator
  control
    action-trigger
```

## Options / Props

`root` 関数の引数（すべて必須、既定値なし。`interval_ms`/`elapsed_ms` の「既定」は `Timer::countdown`/`count_up`/`default()` コンストラクタ側の初期値であり `root` 自体の既定ではない）。

| Name | Type | Description |
| --- | --- | --- |
| countdown | `bool` | `true` = カウントダウン、`false` = カウントアップ |
| start_ms | `u64` | カウントダウンの開始値（ミリ秒） |
| target_ms | `u64` | カウントアップの目標値（ミリ秒）。`0` は無期限（完了条件なし） |
| interval_ms | `u64` | tick 間隔（`data-interval` へ出力される表示ヒント。`Timer::countdown`/`count_up` 経由なら呼び出し側指定、`Timer::default()` なら `1000`） |
| elapsed_ms | `u64` | 経過ミリ秒（`data-elapsed` へ反映。新規構築時は `0`） |
| phase | `TimerPhase` | 現在フェーズ（`idle`/`running`/`paused`/`completed`） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製）。ark-ui の Timer を参考にしているが、API 形状は自由関数群 + `Timer` 状態機械であり、ark-ui の React コンポーネント構成とは異なる
- Data Attributes: `root` へ `data-state`（フェーズ）/`data-start-ms`/`data-target-ms`/`data-interval`/`data-elapsed`（数値文字列）を出力し、カウントダウンのときのみ `data-countdown` を付与する（カウントアップでは省略）。`item`/`item-value`/`item-label` は `data-type`（`days`/`hours`/`minutes`/`seconds`）、`action-trigger` は `data-action`（`start`/`pause`/`resume`/`reset`）を出力する
- Accessibility: ark-ui / Zag.js の Timer と同様、専用の WAI-ARIA パターンを持たない表示系コンポーネントであり追加の `role`/`aria-*` は付与しない。`action_trigger` はネイティブ `<button type="button">` であり Tab / Space / Enter はブラウザ既定動作で成立する
- 状態機械自身は時計を持たない。実時間の計測・`setInterval` 予約はクライアント配線層の責務であり、`TimerAction::Tick` の明示的注入のみで前進する
- `"timer:pause"` は `Running` からのみ、`"timer:resume"` は `Paused` からのみ、`"timer:tick"` は `Running` 中のみ状態を変える。それ以外のフェーズで dispatch しても no-op（fail-closed）。`"timer:start"`/`"timer:reset"` は任意フェーズから無条件に遷移する（それぞれ `Running`/`Idle` へ、`elapsed_ms` はゼロへ）。カウントダウン/カウントアップとも完了境界超過分はクランプされる
- ロケール依存の表示形式（`Intl.NumberFormat` 相当）・タイムゾーン変換・`asChild`/`ids` オプションは非採用

## Related

- [Calendar](./calendar.md)
