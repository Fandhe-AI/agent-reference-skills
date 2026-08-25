# Drawer

画面端に配置されるパネル（styled）。`dialog` と同じ状態機械パターンを再利用し、`size` variant（Sm/Md/Lg）と `placement`（Start/End/Top/Bottom）の 2 軸を持つ。スライドインアニメーションは実装されておらず、開閉は `dialog` と同じ `opacity` 切り替えのみ。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::drawer::{
    root, trigger, backdrop, positioner, content, title, description, close_trigger, stylesheet,
    DrawerPlacement, ContentIds,
};
use fandhe_frontend_pre_styled_ui::drawer::OpenState;
use fandhe_frontend_pre_styled_ui::Size;

let css = stylesheet();
let state = OpenState::Open; // 全 part で共有する単一の state（trigger の aria-expanded とも整合させる）
let ids = ContentIds { id: Some("drw-1"), labelledby: Some("drw-1-title"), describedby: Some("drw-1-desc") };
let node = root(Size::Md, state, DrawerPlacement::End, vec![], vec![
    trigger(state, Some("drw-1"), vec![], vec![]),
    positioner(state, vec![], vec![
        content(state, DrawerPlacement::End, true, ids, vec![], vec![
            title(Some("drw-1-title"), vec![], vec![]),
            description(Some("drw-1-desc"), vec![], vec![]),
            close_trigger(vec![], vec![]),
        ]),
    ]),
]);
```

`Drawer` 状態機械（headless）はあえて再エクスポートしない（`dialog` と同じ理由）。

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
| `root(size, state, placement, attrs, children)` | `Size`, `OpenState`, `DrawerPlacement` | `size: Size::Md`, `placement: DrawerPlacement::End`（ドキュメント既定値） | 本モジュール（`pre-styled-ui::drawer`）で再定義される唯一のパーツ。`size` に応じたクラスを付与し、実体は headless `root` へ委譲 |
| `trigger(state, controls, attrs, children)` | `OpenState`, `controls: Option<&str>` | `controls: None` | headless `drawer::trigger` の選択的 `pub use` 再エクスポート（本モジュールでの再定義ではない）。dialog の `trigger` と同契約（`type="button"`/`aria-haspopup="dialog"`/`aria-expanded`、`controls` が `Some` のとき `aria-controls`） |
| `backdrop(state, attrs, children)` / `positioner(state, attrs, children)` | `OpenState` | — | headless `drawer` の同名関数の選択的 `pub use` 再エクスポート。`positioner` は `data-placement` で flex 方向を切り替え |
| `content(state, placement, modal, ids, attrs, children)` | `OpenState`, `DrawerPlacement`, `modal: bool`, `ids: ContentIds` | — | headless `drawer::content` の選択的 `pub use` 再エクスポート。`placement`/`modal`/`ids` は headless 側がもともと取る引数（styled 側の追加ではない）。`role="dialog"` 固定（`DialogRole` は取らない）。`ContentIds` から `id`/`aria-labelledby`/`aria-describedby` を出力 |
| `title(id, attrs, children)` / `description(id, attrs, children)` | `id: Option<&str>` | `id: None` | headless `drawer` の同名関数の選択的 `pub use` 再エクスポート。`id` が `Some` のとき `content` の `labelledby`/`describedby` と対にする |
| `close_trigger(attrs, children)` | — | — | headless `drawer::close_trigger` の選択的 `pub use` 再エクスポート。`type="button"` 固定 |
| `stylesheet()` | — | — | 既定 CSS 全量。`data-placement`（start/end/top/bottom）で `positioner` の flex 方向・`content` の占有寸法軸を切り替え |

`ContentIds<'a>`（`drawer::ContentIds`）は dialog と同型: `{ id, labelledby, describedby }: Option<&'a str>`（`content` の引数削減用構造体）。

## Notes

- `@chakra-ui/react` の JS/TS API とは別物（Rust 製、`fandhe-frontend-pre-styled-ui` クレート）
- `size` variant は root スコープの `--fandhe-drawer-size` custom property で寸法を切り替え
- placement 別のスライドインアニメーションは表現できず、開閉は dialog と同じ非方向的な `opacity` 切り替えのみ
- `content` は `box-sizing: border-box` かつ `overflow-y: auto`
- 本モジュール（`pre-styled-ui::drawer`）で再定義される styled 固有パーツは `root`（`size` クラス付与のため）のみ。`trigger`/`backdrop`/`positioner`/`content`/`title`/`description`/`close_trigger` は選択的 `pub use fandhe_frontend_headless_ui::drawer::{...}` による headless の同名関数のそのままの再エクスポートで、`state`/`ids`/`modal`/`id` はいずれも headless 側の元々のシグネチャが持つ引数（dialog と同じパターン。`content` は `DialogRole` の代わりに `placement: DrawerPlacement` を取る点も headless 側の仕様）

## Related

- [primitives/overlays/drawer](../../primitives/overlays/drawer.md)
- [dialog](./dialog.md)
