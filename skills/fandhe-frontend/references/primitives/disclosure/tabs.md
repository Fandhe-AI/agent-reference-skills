# Tabs

WAI-ARIA APG の Tabs パターンに準拠したマークアップを組み立てる headless コンポーネント。他コンポーネントと異なり、`root`/`list`/`trigger`/`content`/`indicator` の全体を1つの自由関数 `tabs()`（または `tabs_with_root_attrs()`）で組み立てる。

## Signature / Usage

```rust
use fandhe_frontend_headless_ui::{tabs, TabItem, TabsProps};
use fandhe_frontend_headless_ui::data_attrs::Orientation;
use fandhe_frontend_headless_ui::tabs::ActivationMode;

let node = tabs(
    &TabsProps {
        id: "t",
        selected: "a",
        orientation: Orientation::Horizontal,
        activation_mode: ActivationMode::Automatic,
        loop_focus: true,
        indicator: false,
    },
    vec![
        TabItem { value: "a", trigger: vec![], content: vec![], disabled: false },
        TabItem { value: "b", trigger: vec![], content: vec![], disabled: false },
    ],
);

// root へ追加属性（例: styled 層の size/color-palette クラス）を注入する場合
// tabs::tabs_with_root_attrs(&props, vec![("class", "fd-tabs--size-md")], items);
```

## Anatomy

```
root
  list
    trigger
    indicator（indicator: true のとき opt-in）
  content
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `TabsProps.id` | `&str` | trigger/content の決定的 id 生成のベース（`"{id}-trigger-{value}"`） |
| `TabsProps.selected` | `&str` | SSR 時点の選択中タブ value。一致しない場合は全タブ非選択 |
| `TabsProps.orientation` | `Orientation` | `data-orientation`（共通）・`aria-orientation`（list） |
| `TabsProps.activation_mode` | `ActivationMode`（既定 `Automatic`） | `list` の `data-activation-mode`。`Automatic`/`Manual` |
| `TabsProps.loop_focus` | `bool` | `list` の `data-loop-focus`（roving tabindex の端から端への循環） |
| `TabsProps.indicator` | `bool`（既定 `false`） | 選択タブ位置を示す装飾 `indicator` パーツを opt-in で追加 |
| `TabItem.value` | `&str` | タブ識別子。同一呼び出し内で一意が呼び出し側の契約（重複時は出現順サフィックスで id を一意化） |
| `TabItem.trigger` / `content` | `Vec<Node>` | trigger ボタン／content パネルの子ノード |
| `TabItem.disabled` | `bool` | `disabled`/`data-disabled`/`aria-disabled` を trigger に付与、roving tabindex から除外 |

## Data Attributes

| Part | Attribute | Values |
|------|-----------|--------|
| root / list / trigger / content | `data-orientation` | `horizontal` \| `vertical` |
| trigger / content | `data-state` | `active` \| `inactive` |
| list | `data-activation-mode` | `automatic` \| `manual` |
| list | `data-loop-focus` | `true` \| `false` |
| indicator | `data-state` | `active` \| `inactive` |

## Accessibility

- `list` に `role="tablist"` + `aria-orientation`
- `trigger` に `role="tab"` + `aria-selected` + `aria-controls`（対応する `content` id）、roving tabindex（active な非 disabled trigger、無ければ最初の非 disabled trigger に `tabindex="0"`、他は `-1"`）
- `content` に `role="tabpanel"` + `aria-labelledby`（対応する `trigger` id）
- `indicator` は装飾要素のため `aria-hidden="true"`
- 選択 value が disabled item を指す場合は「未選択」として扱う（全 trigger/content が inactive）

## Notes

- クリック/キーボード操作の実挙動・状態機械連携（`SingleSelect` 等）は本モジュールのスコープ外（wasm 層の後続責務）。`tabs()` は静的な選択状態から決定的にマークアップを組み立てるのみ
- `indicator: true` 時、SSR は `style="--left: 0px; --top: 0px; --width: 0px; --height: 0px"` の初期値のみを出力し、動的な位置・サイズ計測は CSR 層の後続責務
- `@ark-ui/react` の JS/TS API とは別物（Rust 製）

## Related

- [Accordion](./accordion.md)
