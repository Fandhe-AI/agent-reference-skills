# wasm-full feature 選択ガイド

`fandhe-frontend-wasm-full` の 2 軸 Cargo feature（配線群別・scope 別、いずれも既定 on）と、`fandhe-frontend-dist-server` が配布する最小構成 6 feature を利用者向けに集約したガイド。`default-features = false` で必要な feature だけを選ぶ際の一次参照。

## Signature / Usage

```toml
[dependencies.fandhe-frontend-wasm-full]
version = "0.40.4"
default-features = false
features = [
  "wasm-bindgen-exports",
  "collapsible",
  "dialog",
  "popover",
  "tooltip",
  "position",
]
```

縮小構成の検証（`-p` 単体指定が必須。`--workspace` 併用は解決対象が広がり検証にならない）:

```bash
cargo check -p fandhe-frontend-wasm-full \
  --no-default-features \
  --features wasm-bindgen-exports,collapsible,dialog,popover,tooltip,position \
  --target wasm32-unknown-unknown --locked
```

## Options / Props

配線群別 feature（`Runtime::mount` / `hydrate` が呼ぶ `wire_*` 1 件 = feature 1 件。0.19.0 で追加）:

| 配線 | feature |
|------|---------|
| `events::wire_events` / `keynav::wire_readonly_click_guard` / `Runtime::wire_headless` | ゲートしない（常時有効） |
| `keynav::wire_keynav` | `keynav` |
| `focus_visible::wire_focus_visible` | `focus-visible` |
| `Runtime::wire_avatar` / `wire_clipboard` / `wire_timer` | `avatar` / `clipboard` / `timer` |
| `Runtime::wire_angle_slider` / `wire_splitter` / `wire_signature_pad` / `wire_number_input` | `angle-slider` / `splitter` / `signature-pad` / `number-input` |
| `Runtime::wire_command` / `wire_sidebar` | `command` / `sidebar` |
| `Runtime::wire_chart` / `wire_chart_range` | `chart` / `chart-range` |
| `Runtime::wire_questionnaire` / `wire_message_scroller` / `wire_data_table` | `questionnaire` / `message-scroller` / `data-table` |
| `Runtime::wire_in_view` / `wire_gesture` | `in-view` / `gesture` |
| `Runtime::wire_scroll_driver` / `wire_drag_gesture` / `wire_confetti` / `wire_svg_path` | `scroll-driver` / `drag-gesture` / `confetti` / `svg-path` |
| `Runtime::wire_hold_to_confirm` / `wire_add_to_basket` / `wire_magnetic` | `hold-to-confirm` / `add-to-basket` / `magnetic` |
| `Runtime::wire_carousel_motion` / `wire_count_up` / `wire_text_animation` / `wire_ticker` / `wire_cursor` | `carousel-motion` / `count-up` / `text-animation` / `ticker` / `cursor` |

配線群別・別枠 feature のうち `fandhe-frontend-animation` を optional 依存として有効化するもの（Cargo.toml の `dep:fandhe-frontend-animation`）: `scroll-driver` / `drag-gesture` / `confetti` / `svg-path` / `hold-to-confirm` / `magnetic` / `ticker` / `carousel-motion` / `text-animation` / `cursor` / `count-up` / `animation-driver` / `animate` / `layout-animation` / `presence`。`add-to-basket` は `data-state` 状態機械 + タイマーのみで animation 依存なし。

配線表に載らない別枠 feature:

| feature | ゲート対象 |
|---------|-----------|
| `position` | `headless::wire_headless_component` 内の自動 positioning 呼び出しのみ（`position` モジュール・`PositionController` 等はゲート対象外） |
| `stagger` | keyed list 構造反映（`Insert` / `Move`）直後の `stagger_index::sync_stagger_index` 呼び出しのみ |
| `animation-driver` | `animation_driver` モジュール（`fandhe-frontend-animation` の型の薄い再公開）。`mount` / `hydrate` からの新規呼び出しなし |
| `animate` | `pub use fandhe_frontend_animation;` の再エクスポート（`animate::{animate, AnimateOptions, WaapiKeyframe}` に到達可能にする） |
| `view-transitions` | `Runtime::apply_with_view_transition`（`view_transition::with_view_transition` と `nav.rs` の router 経由 VT はゲート対象外） |
| `view-transition-name` | `view_transition_name::set_view_transition_name` 公開関数そのもの |
| `view-transition-preset` | `Runtime::apply_with_view_transition_named`（`ViewTransitionPreset`） |
| `layout-animation` | keyed list 構造変化前後の layout FLIP（`layout_flip::capture_before` / `play_after`、`data-fandhe-flip-auto` で opt-in）と共有レイアウト遷移（`shared_layout`、`data-fandhe-layout-id`）の両方 |
| `presence` | keyed list 削除行の退場ゴースト配線（`list_presence::capture_before` / `play_exit_after`、`data-fandhe-presence-auto` で opt-in） |

scope feature（`headless::MAPPING_TABLE` の該当行と `keynav::wire_keynav` の `match scope` arm をゲート。0.20.0 で追加。feature 名は `scope` 文字列と一致）:

| feature | MAPPING_TABLE 行数 | keynav の match arm |
|---------|-------------------|---------------------|
| `accordion` | 1 | `"accordion"` |
| `calendar` | 3 | `"calendar"` |
| `collapsible` | 1 | なし |
| `combobox` | 3 | `"combobox"` |
| `dialog` | 2 | なし |
| `listbox` | 0（keynav 専用） | `"listbox"` |
| `menu` | 4 | `"menu"` |
| `menubar` | 3 | `"menubar"` |
| `navigation-menu` | 1 | `"navigation-menu-trigger"`・`"navigation-menu-link"` |
| `popover` | 2 | なし |
| `radio-group` | 1 | `"radio"`・`change` リスナー |
| `select` | 3 | `"select"` |
| `tabs` | 1 | `"tabs"`・bubble click |
| `toggle-group` | 1 | `"toggle-group"` |
| `tooltip` | 1 | なし |
| `tree-view` | 2 | `"tree-view"`・tree 復元 |

dist-server 最小構成（`WASM_DIST_FEATURES`、6 feature）: `wasm-bindgen-exports, collapsible, dialog, popover, tooltip, position`。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/wasm-full-features/
- 2 軸は独立。クリック操作のみで良い部品は当該 scope feature のみ、キーボード操作も使う部品は `keynav` + 当該 scope feature の両方を有効にする。既定はすべて on
- 常時有効な配線: `events::wire_events`（`data-action` 委譲）、`keynav::wire_readonly_click_guard`（readonly RadioGroup の click capture 保護。`radio-group` を off にしても失われない）、`Runtime::wire_headless`（`MAPPING_TABLE` 全行のクリック dispatch）
- `overlay` / `tooltip` / `position` / `focus_trap` / `headless_file_upload` / `headless_select` モジュール（`Runtime` を経由せずアプリが直接呼ぶ公開 API）はいずれの feature でもゲートされない。`tooltip` / `select` / `menu` 等の feature 名は同名モジュールと同じ文字列だが、ゲートするのは `MAPPING_TABLE` 行と keynav の match arm のみ
- Cargo.toml の `[features]` には `default` に含まれない `perf-assert`（空 feature）も存在する。原文ガイドには記載がない
- `sidebar`（MAPPING_TABLE 2 行）・`signature-pad`（同 1 行）は配線群別 feature であり、同名 feature で MAPPING_TABLE 行も追加ゲートする
- 0.19.0 以降へ上げて `default-features = false` を使っている場合、配線・MAPPING_TABLE 行・keynav 分岐が既定では失われる。従来挙動の維持には `default` 配列と同じ 56 件（`entry` 機能を使わないアプリは `wasm-bindgen-exports` を省略可）を `features` に明示する。56 件は `wasm-bindgen-exports` + 配線群別・別枠の `keynav` から `presence` まで + scope feature 16 件
- `wire_signature_pad_component` を `Runtime::wire_headless` 経由せず直接呼ぶ構成は `signature-pad` feature の有効化だけでは救済されない。`headless::wire_headless_component` を同じ `root` / `component` へ明示的に呼ぶ
- `ViewTransitionPreset` は 0.34.0 で `Iris` / `Doors` / `Shutter` / `Blinds` / `Strips` / `Pixels` / `MaskWipe` / `MaskRadial` の 8 バリアントを追加（minor バンプ）。exhaustive な `match` を書いている利用者は feature の on/off に関わらずコンパイルが壊れる（`_ =>` か新バリアント対応が必要）
- `layout-animation`: 入れ子の FLIP リストでは最外側のリストがサブツリー全体を所有し、内側リストは自分では capture / play しない
- `presence`: 削除行は即座に除去されず、元座標へ `position: absolute` で list 末尾へ再挿入され `inert`・`aria-hidden="true"`・`data-state="exiting"` が付く（ゴースト方式）。ゴーストの `data-key` / `data-bind-*` / `data-action` は剥がされる。除去は `animationend` に依存せず、computed `animation-duration` / `animation-delay` + 50ms のタイマーで行うため、`motion` feature 未読み込み・`prefers-reduced-motion: reduce`・`animation-duration: 0s` ではいずれも即時除去
- `scroll-driver`（0.29.0〜）: `data-fandhe-scroll-progress` の値 `""` / `"entry"` は entry 進捗、`"cover"` / `"contain"` は `SlotRecipe::parallax` / `sticky_progress` のネイティブ範囲に対応するフォールバック進捗、未知の値は `"entry"` へ fail-closed
- `cursor` は `prefers-reduced-motion: reduce` / `pointer: coarse` のいずれかが真なら配線自体を行わない。`text-animation` は typewriter / scramble のみで、split-text reveal（`chars` / `words`）は pre-styled-ui の `text_reveal`（`motion` feature、SSR + CSS のみ）の責務
- dist-server 最小構成の判断: REQ-11 ワークロード（カウンター・フォーム入力・動的リスト更新）は常時配線のみで成立。クリックで完結する collapsible / dialog / popover / tooltip（keynav に cfg 分岐なし）に、popover / tooltip の位置決め用 `position` を加える。`keynav` / `focus-visible` は REQ-11 実測でサイズへの影響が大きく除外。keynav の match arm を持つ他の scope feature は「キーボード操作を欠いた部品」を出荷しないため除外。実測 `bundle-size: total_gzip_bytes=120618/200000 files=2 result=PASS`
- 最小構成外の部品（accordion / menu / select 等）を使う選択肢は 2 つ: (1) `fandhe-frontend-wasm-full` を直接依存に追加し必要な feature を選ぶ（`examples/interactive-view-transitions` 参照）、(2) `fandhe-frontend-dist-server` を fork / vendor し `crates/dist-server/src/wasm_dist_features.rs` の `WASM_DIST_FEATURES` を変更する（`crates/wasm-full/tests/bundle_size.rs` の実測を併せて確認）
- 新規 feature 追加時の定型チェックリスト（Cargo.toml `[features]` と `default` 配列、lib.rs クレート doc、CLAUDE.md の件数、CI の `wasm-full-feature-matrix-wiring` / `-scope` ジョブへの 1 行追加〔新規ジョブは作らない〕、本ガイドの表、`cargo test -p fandhe-frontend-wasm-full --test bundle_size`、`WASM_DIST_FEATURES` へ追加しない）は開発者向けの内容で、原文 §11 に記載。`fandhe-frontend-animation` 由来 feature は `dep:fandhe-frontend-animation` で有効化し、`wasm-full` にアニメーション演算ロジックを書かない
- 原文の版数表（§7）は feature 追加履歴で、0.19.0（配線群別 14 件）、0.20.0（scope 16 件）、0.20.1（`position`）、0.20.5（`message-scroller`）、0.20.8（`data-table`）、0.21.0（`stagger` / `in-view`）、…、0.40.4（`count-up` 統合時点）まで並行ブランチの版数衝突バンプを含めて記録されている。個別 feature の導入版は上記のほか本文の各説明を参照
- 出典: 公式 docs `guides/wasm-full-features`。機械可読な一次情報は `crates/wasm-full/src/lib.rs` クレート doc と `crates/wasm-full/Cargo.toml` の `[features]`（pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9` の `Fandhe-AI/fandhe-frontend` リポジトリ内パス。公開 crate には含まれない）。設計記録 `docs/design/wasm-full-feature-gating-evaluation.md`・`docs/design/wasm-full-architecture.md` も同 SHA の GitHub パス（非公開参照のため本スキルには未収録）

## Related

- [コンポーネント記述ガイド](./component-authoring.md)
- [アニメーション機能ガイド](./animation.md)
- [fandhe-animation / fandhe-frontend-animation API ガイド](./animation-core.md)
- [pre-styled-ui motion feature ガイド](./pre-styled-ui-motion-feature.md)
- [View Transitions](./view-transitions.md)
