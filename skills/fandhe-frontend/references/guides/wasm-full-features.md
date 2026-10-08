# wasm-full feature 選択ガイド

`fandhe-frontend-wasm-full` の 2 軸 Cargo feature（配線群別・scope 別、いずれも既定 on）と、`fandhe-frontend-dist-server` が配布する最小構成 7 feature を利用者向けに集約したガイド。`default-features = false` で必要な feature だけを選ぶ際の一次参照。

## Signature / Usage

```toml
[dependencies.fandhe-frontend-wasm-full]
version = "0.46.0"
default-features = false
features = [
  "wasm-bindgen-exports",
  "collapsible",
  "dialog",
  "popover",
  "tooltip",
  "position",
  "action-keydown",
]
```

外部からの action 起動（`Runtime::dispatch_action`、0.41.0、wasm32 専用。タイマーのコールバックから呼ぶ原文の使用例）:

```rust
pub fn dispatch_action(&self, name: &str, payload: &str) -> DispatchOutcome

let tick = Closure::<dyn FnMut()>::new(|| {
    RUNTIME.with(|r| {
        if let Some(rt) = r.borrow().as_ref() {
            // Reentrant なら何もしない。必要なら次のタイマーで再試行する。
            let _ = rt.dispatch_action("tick", "");
        }
    });
});
```

縮小構成の検証（`-p` 単体指定が必須。`--workspace` 併用は解決対象が広がり検証にならない）:

```bash
cargo check -p fandhe-frontend-wasm-full \
  --no-default-features \
  --features wasm-bindgen-exports,collapsible,dialog,popover,tooltip,position,action-keydown \
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
| `Runtime::wire_keydown`（0.43.0 で追加。追加依存なし） | `action-keydown` |

`action-keydown`（汎用 keydown action 配線）: `data-action-keydown`（action 名）と `data-keys`（対象キー）を持つ要素（フォーカス要素自身またはその祖先）のキー押下を `Component` の action として dispatch する。`Runtime::mount` / `hydrate` で最後に登録される配線で、部品固有の keydown ハンドラが `preventDefault` したキーはそちらが優先される。`preventDefault` は opt-in の `data-keydown-prevent-default` がある場合のみ。IME 変換中のキーは action にならない。
- `data-keydown-ignore-repeat`（0.44.0、値は空文字または `true`）: 自動リピート（`KeyboardEvent.repeat`）の keydown を dispatch しない。最初の keydown は通る。`data-keydown-prevent-default` 併用時、リピート中も `preventDefault()` は適用される。属性なしの挙動は従来どおり
- payload（0.45.0）: 要素に `data-payload` があればクリック時と同じ値が payload になり、キー情報は含まれない。なければ正規化キートークン（例: `Control+Enter`）が payload になる
- 部品配線との排他（0.46.0）: document / window に登録される部品の keydown とは排他で、部品がそのキーを消費する場合は汎用 action を `preventDefault` も含めて見送り、部品側のみが動作する。対象は overlay（`OverlayCloseController`、最上位 overlay が `close_on_escape` のときの Escape）、sidebar（トリガー / レール有効時の Cmd/Ctrl+B、モバイルドロワーまたは開いたメニューボタン tooltip がある場合の Escape）、command（アクティブな dialog があるときの Ctrl/Cmd+K、Shift / Alt なし）。部品が消費しない場合（overlay が閉じている・最上位が opt-out・トリガー無効・dialog なし・`OverlayCloseController` 未使用）は汎用 action が動く。0.46.0 より前は両方が発火していた

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

dist-server 最小構成（`WASM_DIST_FEATURES`、7 feature）: `wasm-bindgen-exports, collapsible, dialog, popover, tooltip, position, action-keydown`。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/wasm-full-features/
- 2 軸は独立。クリック操作のみで良い部品は当該 scope feature のみ、キーボード操作も使う部品は `keynav` + 当該 scope feature の両方を有効にする。既定はすべて on
- 常時有効な配線: `events::wire_events`（`data-action` 委譲）、`keynav::wire_readonly_click_guard`（readonly RadioGroup の click capture 保護。`radio-group` を off にしても失われない）、`Runtime::wire_headless`（`MAPPING_TABLE` 全行のクリック dispatch）
- `overlay` / `tooltip` / `position` / `focus_trap` / `headless_file_upload` / `headless_select` モジュール（`Runtime` を経由せずアプリが直接呼ぶ公開 API）はいずれの feature でもゲートされない。`tooltip` / `select` / `menu` 等の feature 名は同名モジュールと同じ文字列だが、ゲートするのは `MAPPING_TABLE` 行と keynav の match arm のみ
- Cargo.toml の `[features]` には `default` に含まれない `perf-assert`（空 feature）も存在する。原文ガイドには記載がない
- `sidebar`（MAPPING_TABLE 2 行）・`signature-pad`（同 1 行）は配線群別 feature であり、同名 feature で MAPPING_TABLE 行も追加ゲートする
- 0.19.0 以降へ上げて `default-features = false` を使っている場合、配線・MAPPING_TABLE 行・keynav 分岐が既定では失われる。従来挙動の維持には `default` 配列と同じ 57 件（`entry` 機能を使わないアプリは `wasm-bindgen-exports` を省略可）を `features` に明示する。57 件は `wasm-bindgen-exports` + 配線群別・別枠の `keynav` から `presence` まで（`action-keydown` を含む。原文の内訳は配線群別 32・scope 16・別枠 9）+ scope feature 16 件
- `wire_signature_pad_component` を `Runtime::wire_headless` 経由せず直接呼ぶ構成は `signature-pad` feature の有効化だけでは救済されない。`headless::wire_headless_component` を同じ `root` / `component` へ明示的に呼ぶ
- `ViewTransitionPreset` は 0.34.0 で `Iris` / `Doors` / `Shutter` / `Blinds` / `Strips` / `Pixels` / `MaskWipe` / `MaskRadial` の 8 バリアントを追加（minor バンプ）。exhaustive な `match` を書いている利用者は feature の on/off に関わらずコンパイルが壊れる（`_ =>` か新バリアント対応が必要）
- `layout-animation`: 入れ子の FLIP リストでは最外側のリストがサブツリー全体を所有し、内側リストは自分では capture / play しない
- `presence`: 削除行は即座に除去されず、元座標へ `position: absolute` で list 末尾へ再挿入され `inert`・`aria-hidden="true"`・`data-state="exiting"` が付く（ゴースト方式）。ゴーストの `data-key` / `data-bind-*` / `data-action` は剥がされる。除去は `animationend` に依存せず、computed `animation-duration` / `animation-delay` + 50ms のタイマーで行うため、`motion` feature 未読み込み・`prefers-reduced-motion: reduce`・`animation-duration: 0s` ではいずれも即時除去
- `scroll-driver`（0.29.0〜）: `data-fandhe-scroll-progress` の値 `""` / `"entry"` は entry 進捗、`"cover"` / `"contain"` は `SlotRecipe::parallax` / `sticky_progress` のネイティブ範囲に対応するフォールバック進捗、未知の値は `"entry"` へ fail-closed
- `cursor` は `prefers-reduced-motion: reduce` / `pointer: coarse` のいずれかが真なら配線自体を行わない。`text-animation` は typewriter / scramble のみで、split-text reveal（`chars` / `words`）は pre-styled-ui の `text_reveal`（`motion` feature、SSR + CSS のみ）の責務
- dist-server 最小構成の判断: REQ-11 ワークロード（カウンター・フォーム入力・動的リスト更新）は常時配線のみで成立。クリックで完結する collapsible / dialog / popover / tooltip（keynav に cfg 分岐なし）に、popover / tooltip の位置決め用 `position` を加える。`keynav` / `focus-visible` は REQ-11 実測でサイズへの影響が大きく除外。keynav の match arm を持つ他の scope feature は「キーボード操作を欠いた部品」を出荷しないため除外。`action-keydown` は追加依存がなく gzip 増分が小さく予算に余裕があるため最小構成に含める（#3765）。実測（ローカル、wasm-opt 適用）`bundle-size: total_gzip_bytes=124556/200000 files=2 result=PASS`（余裕 75,444 バイト。CI は wasm-opt なしで数値が異なり、より小さくなる想定）
- 最小構成外の部品（accordion / menu / select 等）を使う選択肢は 2 つ: (1) `fandhe-frontend-wasm-full` を直接依存に追加し必要な feature を選ぶ（`examples/interactive-view-transitions` 参照）、(2) `fandhe-frontend-dist-server` を fork / vendor し `crates/dist-server/src/wasm_dist_features.rs` の `WASM_DIST_FEATURES` を変更する（`crates/wasm-full/tests/bundle_size.rs` の実測を併せて確認）
- 新規 feature 追加時の定型チェックリスト（Cargo.toml `[features]` と `default` 配列、lib.rs クレート doc、CLAUDE.md の件数、CI の `wasm-full-feature-matrix-wiring` / `-scope` ジョブへの 1 行追加〔新規ジョブは作らない〕、本ガイドの表、`cargo test -p fandhe-frontend-wasm-full --test bundle_size`、`WASM_DIST_FEATURES` へ追加しない）は開発者向けの内容で、原文 §11 に記載。`fandhe-frontend-animation` 由来 feature は `dep:fandhe-frontend-animation` で有効化し、`wasm-full` にアニメーション演算ロジックを書かない
- 原文の版数表（§7）は feature 追加履歴で、0.19.0（配線群別 14 件）、0.20.0（scope 16 件）、0.20.1（`position`）、0.20.5（`message-scroller`）、0.20.8（`data-table`）、0.21.0（`stagger` / `in-view`）、…、0.40.4（`count-up` 統合時点）まで並行ブランチの版数衝突バンプを含めて記録されている。続く 0.41.0（`Runtime::dispatch_action` 追加、feature gating なし）、0.42.0（汎用 keydown 配線の属性解釈・キー絞り込みの純粋ロジック。未配線）、0.43.0（`action-keydown` feature 追加、`mount` / `hydrate` へ組み込み）、0.44.0（`data-keydown-ignore-repeat`）、0.45.0（keydown action の payload で `data-payload` を優先）、0.46.0（overlay / sidebar / command が消費するキーでは汎用 keydown が見送る排他仕様）が現行。個別 feature の導入版は上記のほか本文の各説明を参照
- `Runtime::dispatch_action`（0.41.0）: 外部から action を起動する公開 API。`name` は action 名、`payload` は `data-payload` と同様に信頼できない入力として `Component::decode_action` に渡される。受理されると `Component::update` が呼ばれ `data-action` 経路と同じ差分更新が行われる。戻り値 `DispatchOutcome`（`fandhe_frontend_wasm_full::DispatchOutcome`）は `Dispatched` / `UnknownAction`（未知 action または不正 payload、no-op）/ `Reentrant`（借用が取れず no-op）の 3 variant。`Runtime::component()` の借用中・`update` 実行中・配線コールバック内部・`rerender` 中に呼ぶと `Reentrant` を返し、action は保留もキューイングもされず捨てられる（反映したい場合は `setTimeout` 等でコールバックの外へ逃がす）。Cargo feature によるゲートはなく、wasm32 専用。`postMessage` 等の外部由来入力は送信元 origin の検証が呼び出し側の責務
- keyed list 更新の注意（原文 §12）: keyed list の field が dirty になる更新では親要素の属性が `view()` の属性列へ同期され、`view()` にない属性（JS で後付けした `aria-live`・class・`data-*`・`data-fandhe-flip-auto` 等）は削除される。必要な属性は `view()` 側で渡す。項目数 4,096 件・キー文字列合計 262,144 バイトが上限で、超過すると `keyed_list()` が `TooManyItems` / `KeyBytesExceeded` の `Err` を返す（`Component::view` は `Result` を返せないため扱いはアプリの責務。`expect` / `unwrap` は wasm の panic とインスタンス停止につながる）。上限前のページング・長いログの末尾 N 件化・リストの field 分割を推奨し、上限定数は HashDoS 対策のため引き上げ・迂回しない
- 出典: 公式 docs `guides/wasm-full-features`。機械可読な一次情報は `crates/wasm-full/src/lib.rs` クレート doc と `crates/wasm-full/Cargo.toml` の `[features]`（pin SHA `4c8c7d1` の `Fandhe-AI/fandhe-frontend` リポジトリ内パス。公開 crate には含まれない）。設計記録 `docs/design/wasm-full-feature-gating-evaluation.md`・`docs/design/wasm-full-architecture.md` も同 SHA の GitHub パス（非公開参照のため本スキルには未収録）

## Related

- [コンポーネント記述ガイド](./component-authoring.md)
- [アニメーション機能ガイド](./animation.md)
- [fandhe-animation / fandhe-frontend-animation API ガイド](./animation-core.md)
- [pre-styled-ui motion feature ガイド](./pre-styled-ui-motion-feature.md)
- [View Transitions](./view-transitions.md)
