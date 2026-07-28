# Alert

通知バナー。`role="alert"`（WAI-ARIA live region）を全ステータス共通で固定付与する slot recipe styled 部品。値変化のない静的な警告には Callout、一時的な進捗更新には Progress の使用を検討する。

## Anatomy

```
root
  indicator
  content
    title
    description
```

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::alert::{self, AlertStatus};

let node = alert::root(AlertStatus::Warning, vec![], vec![
    alert::content(vec![], vec![
        alert::title(vec![], vec![]),
        alert::description(vec![], vec![]),
    ]),
]);
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root.status` | `AlertStatus` | `Info` | `Info` / `Success` / `Warning` / `Error` の4状態でスタイルを切り替える |

## Notes

- `root` は全ステータス共通で `role="alert"` を固定付与する（状態に関わらずスクリーンリーダーへ常に通知される）
- `indicator`/`content`/`title`/`description` は variant を持たず `attrs`/`children` をそのまま反映する
- `@chakra-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Callout](./callout.md)
- [Progress](./progress.md)
