# Alert

通知バナー。`role="alert"`（WAI-ARIA live region）を全ステータス共通で固定付与する slot recipe styled 部品。値変化のない静的な警告には Callout、一時的な進捗更新には Progress の使用を検討する。

## Anatomy

```
root
  indicator
  content
    title
    description
  action
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::alert::{self, AlertProps, AlertStatus};

let props = AlertProps {
    status: AlertStatus::Warning,
    ..AlertProps::default()
};
let node = alert::root(&props, vec![], vec![
    alert::content(vec![], vec![
        alert::title(vec![], vec![]),
        alert::description(vec![], vec![]),
    ]),
]);

pub fn root<'a>(props: &AlertProps, attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn indicator<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn content<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn title<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn description<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn action<'a>(attrs: Vec<(&'a str, &'a str)>, children: Vec<Node>) -> Node
pub fn css() -> String
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `AlertProps.status` | `AlertStatus` | `Info` | `Info` / `Success` / `Warning` / `Error` / `Neutral` の5状態でスタイルを切り替える |
| `AlertProps.variant` | `AlertVariant` | `Subtle` | `Subtle`（淡色背景）/ `Surface`（淡色背景 + 枠線）/ `Solid`（塗りつぶし）/ `Outline`（輪郭のみ）/ `AccentBorder`（淡色背景 + inline-start 側の太いアクセント罫線・角丸なし） |
| `AlertProps.size` | `Size` | `Md` | `Sm` / `Md` / `Lg` |

## Notes

- `root` は全ステータス共通で `role="alert"` を固定付与する（状態に関わらずスクリーンリーダーへ常に通知される）
- `indicator`/`content`/`title`/`description`/`action` は variant を持たず `attrs`/`children` をそのまま反映する
- `action` は pre-styled 専用のレイアウト専用パート（headless に対応する anatomy なし）。root の最後の子として置くとアクション（`button` 等）が右側（RTL では左側）へ押し出される。クリック配線・送信処理は内包せず、呼び出し側が children に渡すノードへ配線する
- `AccentBorder` は `border-inline-start` を使う論理プロパティのため、`dir="rtl"` の祖先下では罫線が右側に出る
- 公開 API は `ColorPalette` を露出しない（`root` は `fd-alert--status-*` クラスのみを出力する）
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Callout](./callout.md)
- [Progress](./progress.md)
