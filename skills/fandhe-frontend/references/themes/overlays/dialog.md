# Dialog

画面全体を覆うモーダルダイアログ（styled）。`role="dialog"`/`role="alertdialog"` の切り替え、`size` variant（Sm/Md/Lg）を持つ。フォーカストラップ・Escape キー閉鎖・外側クリック閉鎖は headless 層と同じくスコープ外。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::dialog::{
    root, trigger, backdrop, positioner, content, title, description, close_trigger, stylesheet,
};
use fandhe_frontend_pre_styled_ui::dialog::OpenState;
use fandhe_frontend_pre_styled_ui::Size;

let css = stylesheet();
let node = root(Size::Md, OpenState::Open, vec![], vec![
    backdrop(OpenState::Open, vec![], vec![]),
    positioner(OpenState::Open, vec![], vec![
        content(OpenState::Open, vec![], vec![
            title(vec![], vec![]),
            description(vec![], vec![]),
            close_trigger(vec![], vec![]),
        ]),
    ]),
]);
```

`Dialog` 状態機械（headless）はあえて再エクスポートしない。`size` variant クラスを付与しない未スタイル描画を誘発するため、状態管理・hydration が必要な場合は `fandhe_frontend_headless_ui::dialog::Dialog` を直接 import する。

## Anatomy

```
root
  ├─ trigger
  └─ positioner（backdrop は root の兄弟）
      └─ content
          ├─ title
          ├─ description
          └─ close-trigger
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `root(size, state, attrs, children)` | `Size`, `OpenState` | `Size::Md` | `size` に応じたクラスを付与する唯一のパーツ。実体は headless `root` へ委譲 |
| `trigger`/`backdrop`/`positioner`/`content`/`title`/`description`/`close_trigger` | — | — | headless `dialog` の同名関数をそのまま再エクスポート（選択的 re-export） |
| `stylesheet()` | — | — | 既定 CSS 全量を返す。`size` variant は root スコープの CSS custom property（`--fandhe-dialog-content-padding` 等）で `content`/`title` へ伝播 |

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- headless 自由関数 `root` と headless `Dialog` 型は再エクスポートしない（`size` クラス非付与の事故防止）
- `backdrop`/`positioner` は `z-index: 1000`/`1001` で最前面固定。closed 時の `positioner[hidden]` は `display: none` を明示上書き
- `color-palette` 軸は持たない

## Related

- [primitives/overlays/dialog](../../primitives/overlays/dialog.md)
- [drawer](./drawer.md)
