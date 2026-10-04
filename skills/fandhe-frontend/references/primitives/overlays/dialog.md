# Dialog

モーダルダイアログ。`role="dialog"`/`"alertdialog"` の切り替え、フォーカス管理を伴わない SSR/属性出力のみの headless 実装。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::dialog::{root, trigger, backdrop, positioner, content, title, description, close_trigger, close_trigger_with_variant, DialogRole, ContentIds, CloseTriggerVariant};
use fandhe_frontend_headless_ui::state::OpenState;

let node = root(
    OpenState::Closed,
    vec![],
    vec![
        trigger(OpenState::Closed, Some("d1"), vec![], vec![]),
        positioner(
            OpenState::Closed,
            vec![],
            vec![content(
                OpenState::Closed,
                DialogRole::Dialog,
                true,
                ContentIds { id: Some("d1"), labelledby: Some("d1-title"), describedby: None },
                vec![],
                vec![title(Some("d1-title"), vec![], vec![])],
            )],
        ),
    ],
);
```

状態機械は `Dialog::new(OpenState)` を経由し、`dispatch(&mut d, "open"/"close"/"toggle", "")` で遷移する。

## Anatomy

```
trigger
root
  backdrop
  positioner
    content
      title
      description
      close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(state, attrs, children)` | `OpenState` | — | `data-state` へ反映 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `Option<&str>` | — | `type="button"` 固定・`aria-haspopup="dialog"`・`aria-expanded`・`controls` が `Some` のとき `aria-controls` |
| `backdrop(state, attrs, children)` | `OpenState` | — | `aria-hidden="true"` 固定、closed で `hidden` |
| `positioner(state, attrs, children)` | `OpenState` | — | closed で `hidden` |
| `content(state, role_kind, modal, ids, attrs, children)` | `OpenState`, `DialogRole`, `bool`, `ContentIds` | — | `role`・`aria-modal`・`tabindex="-1"` 固定（呼び出し側 `attrs` の `tabindex` は除去）・closed で `hidden`・`ids` の各フィールドが `Some` のとき `id`/`aria-labelledby`/`aria-describedby` |
| `title(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき出力（`h2`） |
| `description(id, attrs, children)` | `Option<&str>` | — | `id` が `Some` のとき出力（`p`） |
| `close_trigger(attrs, children)` | — | — | `type="button"` 固定（アイコン専用契約。`data-variant` は出力しない） |
| `close_trigger_with_variant(variant, attrs, children)` | `CloseTriggerVariant`（`Icon` \| `Text`） | — | `close_trigger` に加えて `data-variant`（`icon` / `text`）を固定出力。呼び出し側 `attrs` の `data-variant` は除去される。見た目の切り替え（アイコン専用 vs footer 内の平文ボタン）は styled 層の責務 |
| `DialogRole` | `enum` | — | `Dialog`（`role="dialog"`）/ `Alertdialog`（`role="alertdialog"`） |
| `ContentIds<'a>` | `struct` | `default()` | `id` / `labelledby` / `describedby` の3フィールド（すべて `Option<&str>`） |

## Notes

- `@ark-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-headless-ui` クレート）
- フォーカストラップ・Escape キー閉鎖・外側クリック閉鎖・アニメーションは JS ランタイム側の責務でスコープ外。クライアント層は `content` の `attrs` に渡す `data-close-on-escape="false"` / `data-close-on-interact-outside="false"`（`"false"` リテラルのときのみ無効化。`role="alertdialog"` は外側クリック閉鎖が既定で無効）を参照する。`data-autofocus` は `content` 自身ではなくその tabbable な子孫に付ける
- `Dialog` 状態機械の利便メソッド: `root(attrs, children)` / `trigger(controls, attrs, children)` / `backdrop(attrs, children)` / `positioner(attrs, children)` / `content(role_kind, modal, ids, attrs, children)`。dispatch は `"open"` / `"close"` / `"toggle"`
- `root` を DOM 要素として持つ（zag の `Dialog.Root` は DOM を持たない）。Radix AlertDialog の `Cancel` / `Action` パーツ、`Portal`、`data-nested` / `data-has-nested` は未提供
- ネイティブ `<dialog>` 要素は `core` のタグ語彙に存在しないため未採用

## Related

- [drawer](./drawer.md)
- [floating-panel](./floating-panel.md)
