# pre-styled-ui motion feature ガイド

`fandhe-frontend-pre-styled-ui` の Cargo feature `motion`（既定 off）で使える opt-in アニメーション API と、無効時のゼロコスト保証をまとめたガイド。

## Signature / Usage

```toml
[dependencies]
fandhe-frontend-pre-styled-ui = { version = "0.192", features = ["motion"] }
```

`push_spring_easing()` は `Result<(), ThemeError>` を返すため、`?` は `Result` を返す関数内で使う。

```rust
use fandhe_frontend_pre_styled_ui::theme::Theme;

let mut theme = Theme::default();
theme.push_spring_easing()?; // easing-spring / duration-spring を追加
let css = theme.to_css();
// :root に `--fandhe-motion-easing-spring: linear(...)`・
// `--fandhe-motion-duration-spring: 1473ms` が並ぶ。
```

## Options / Props

`motion` 有効化で使える公開 API（`Theme::to_css_with_*` はいずれも `Theme::to_css()` の出力へ CSS を追記して返す opt-in メソッドで、`to_css` 本体は無変更）:

| 機能（モジュール） | 主な API | 概要 |
|-------------------|---------|------|
| 共通 `@keyframes`（`motion`） | `motion::KEYFRAMES_CSS`、`motion::FADE_IN_KEYFRAMES_NAME` 等 10 個、`Theme::to_css_with_keyframes()` | フェード・ズーム・4 方向スライド・バウンス・シェイクの 10 種 + `prefers-reduced-motion: reduce` 再定義。`StyleSheet` へは `sheet.push_css(motion::KEYFRAMES_CSS)` |
| stagger（`recipe`） | `recipe::STAGGER_INDEX_VAR`、`stagger_delay_declaration(step: MotionDuration)`（`const fn`）、`stagger_index_style(index: usize) -> String`、`SlotRecipe::stagger_delay(slot, step)` | `--fandhe-motion-stagger-index` を要素ごとに書き出し、`animation-delay: calc(var(--fandhe-motion-stagger-index, 0) * var(--fandhe-motion-duration-fast))` を登録 |
| scroll-driven reveal（`recipe`） | `SlotRecipe::scroll_reveal(slot)` | `animation-timeline: view()` 対応ブラウザでフェード + 上方向スライド。非対応は `@supports` ごと無視 |
| parallax / sticky progress（`recipe`） | `SlotRecipe::parallax(slot, ParallaxSpeed)`、`SlotRecipe::sticky_progress(slot)` | `view()` の `cover` / `contain` 区間を線形補間。非対応向けに `--fandhe-motion-scroll-progress` を読む `calc()` フォールバック |
| `view-transition-name`（`recipe`） | `recipe::view_transition_name_declaration(name)` | 固定名（`&'static str`）の静的割り当て |
| border-beam（`border_beam`） | `BORDER_BEAM_CLASS`（`"fd-border-beam"`）、`BORDER_BEAM_CSS`、`Theme::to_css_with_border_beam()` | 任意要素を `<div class="fd-border-beam">` でラップして周回光を付与。トークン `--fandhe-border-beam-width` / `-color` / `-spread` / `-duration` |
| text アニメーション（`text_reveal`） | `chars(content)`、`words(content)`、`typewriter(content: &str, duration_ms: Option<u32>)`、`scramble(content: &str, duration_ms: Option<u32>)`（いずれも `-> Node`）、`TEXT_REVEAL_CSS`、`Theme::to_css_with_text_reveal()` | split-text reveal は SSR + CSS のみ。typewriter / scramble はマークアップのみで、文字送りは wasm-full の `text-animation` が担う。トークン `--fandhe-text-reveal-step`（既定 `40ms`） |
| フォームアニメーション（`forms_motion`） | `SHAKE_CSS`、`UNDERLINE_GROW_CSS`、`FLOATING_LABEL_CLASS`（`"fd-field-floating-label"`）/ `FLOATING_LABEL_CSS`、`error_text_presence_css()`、`forms_motion_css()`、`Theme::to_css_with_forms_motion()` | `field` / `input` 自体は変更しない追加 CSS 4 種。shake は `input[data-invalid]`、underline は `InputVariant::Flushed` の `:focus-visible` |
| カスタムカーソル（`cursor`） | `cursor::cursor(attrs)`、`CURSOR_CSS`、`Theme::to_css_with_cursor()` | `data-fandhe-cursor` + `aria-hidden="true"` の要素。hover 対象は `data-fandhe-cursor-target`（バリアント名）/ `-target-label` / `-target-magnetic` を静的付与。追従は wasm-full の `cursor` feature |
| list 追加削除遷移（`list_motion`） | `PRESENCE_AUTO_ATTR`（`"data-fandhe-presence-auto"`）、`enter_css()`、`exit_css()`、`list_motion_css()`、`Theme::to_css_with_list_motion()` | `list` 自体は変更せず enter / exit の `@keyframes` CSS のみ。並べ替えは wasm-full の `layout-animation`（FLIP）が担う |
| named view transition（`view_transition`） | `VIEW_TRANSITION_PRESET_ATTR`（`"data-fandhe-view-transition"`）、`VIEW_TRANSITION_PRESETS_CSS`、`Theme::to_css_with_view_transition_presets()` | fade / slide / wipe / iris / doors / shutter / blinds / strips / pixels / mask-wipe / mask-radial の 11 種。属性の set / remove は wasm-full の `Runtime::apply_with_view_transition_named` |
| toast stack（`toast_motion`） | `STACK_ATTR`（`"data-fandhe-toast-stack"`）、`stack_group_keyed`、`TOAST_STACK_CSS`、`Theme::to_css_with_toast_motion()` | `toast::group` の `attrs` へ `STACK_ATTR` を渡すと積層表示（`:hover` / `:focus-within` で展開）。動的追加削除は `stack_group_keyed` が stagger + layout FLIP を自動配線 |
| spring 近似 easing | `Theme::push_spring_easing()` | `motion.dev spring()` 既定値（stiffness=100 / damping=10 / mass=1）の軌道を CSS `linear()` へ事前サンプリングした `motion-easing-spring` / `motion-duration-spring` トークンを追加 |

無効時ゼロコスト保証と契約テスト:

| 指標 | 保証内容 | 契約テスト |
|------|---------|-----------|
| crate サイズ | 既定 feature の依存グラフに `fandhe-animation` が現れない | `motion_off_excludes_fandhe_animation_from_dependency_graph` |
| ビルド時間 | 上記の帰結 | 同上 |
| `Theme::to_css` の処理量 | 走査ループへ `cfg!(feature = "motion")` 等の実行時分岐を追加しない | `to_css_body_has_no_feature_cfg_or_motion_branch` |
| CSS 出力 | 既定テーマの `to_css()` 全文がバイト一致 | `default_theme_css_matches_pre_motion_golden` |

陽性対照は `motion_on_includes_fandhe_animation_in_dependency_graph`。

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/pre-styled-ui-motion-feature/
- 有効化すると `fandhe-animation`（外部依存ゼロ・`forbid(unsafe_code)`）が依存グラフに加わる。`motion` を有効化しなければ crate サイズ・ビルド時間・`Theme::to_css` の処理量・CSS 出力サイズのいずれも変わらない
- presence（`SlotRecipe::presence_transition`）は `motion` feature 配下ではなく既定出力に無条件で含まれる。共通 `@keyframes`・stagger・カスタムカーソルは feature 配下に実装済み。scroll-driven は採用方針に従い追加時に判断される
- scroll-driven のフォールバックが進捗値を得るには、対象要素へ `data-fandhe-scroll-progress` を付与し wasm-full の `scroll-driver` feature（既定 on）を配線する。属性なしでは静止したまま安全に劣化する。属性値 `"cover"` / `"contain"` でネイティブと同じ範囲を選べる
- `view_transition_name_declaration` は静的な固定名専用。keyed list の行等で動的な名前が必要な場合は wasm-full の `view_transition_name::set_view_transition_name`（`view-transition-name` feature）を使う
- border-beam は `@property` を使わず `transform: rotate()` で光源レイヤーを回す（`<` を含むリテラルが CSS 不変条件に抵触するため）。ラッパーの `overflow: hidden` が子要素の box-shadow・フォーカスリングの `outline` も切り抜く既知の制約あり。`prefers-reduced-motion: reduce` 下では静的な `border` へフォールバック
- `forms_motion` の floating label は `field::root` 全体ではなく `input` / `label` の 2 要素だけを wrapper でラップして `field::root` の children に渡す。契約: (a) wrapper の children は `input` → `label` の順、(b) `<input>` に `placeholder=" "`（半角スペース 1 文字）を指定。shake は個別の `@media (prefers-reduced-motion: reduce)` で `animation: none` に縮退、他は duration トークン経由のため個別ブロック不要
- カーソルは `@media (prefers-reduced-motion: reduce), (pointer: coarse), (hover: none)` のフェイルセーフ CSS を持つ。本クレートは `wasm-full` に依存しない
- `list_motion` は `transform` に一切触れない（wasm-full の FLIP が毎フレーム inline `!important` で書くため）。`SlotRecipe::presence_transition` は list 行に適用しない。SSR 初回描画で行に `PRESENCE_AUTO_ATTR` が付いていると enter アニメーションが 1 回再生される（意図的な既知挙動）。`PRESENCE_AUTO_ATTR` / `VIEW_TRANSITION_PRESET_ATTR` は wasm-full 側と同一リテラルで、両クレート間の契約は文字列一致のみ（Cargo 依存なし）
- named view transition の mask 系（`blinds` / `strips` / `pixels` / `mask-wipe` / `mask-radial`）は unprefixed `mask`（Chrome 120+ / Safari 15.4+）のみに依存し、`-webkit-mask-*` は複製しない。`prefers-reduced-motion: reduce` 下では `animation: revert;`（mask 系は `mask-image: none;` も）で UA 既定のクロスフェードへ戻す
- spring easing は `duration-` 接頭辞のため reduced motion 下で自動的に `0ms` になる。共通 `@keyframes` と併用する場合は `push_spring_easing()` → `to_css_with_keyframes()` の順で呼ぶ（合成専用メソッドはない）
- 消費者別: docs-site は `features = ["motion"]` を指定済み。`fandhe-frontend-dist-server` の配布 WASM は wasm-full 側の feature 集合に従い、pre-styled-ui の `Theme::to_css` には関与しないため `motion` の on / off は配布物に影響しない。`examples/headless-pre-styled-ui` 等は crates.io 依存のため既定 off
- 公開順序: `fandhe-animation` は当該 issue 時点で crates.io 未公開。`cargo publish` は optional 依存でも registry 解決を要求するため、`fandhe-frontend-pre-styled-ui` 0.188.0 以降の公開は `fandhe-animation` の初回公開と sparse index 反映確認が先
- 検証: `cargo check -p fandhe-frontend-pre-styled-ui --no-default-features --all-targets --locked` と `--features motion` の両構成、`cargo test -p fandhe-frontend-pre-styled-ui --features motion --test motion_zero_cost --locked`、`cargo tree -p fandhe-frontend-pre-styled-ui -e normal --prefix none --locked | grep -c fandhe-animation`（既定構成で 0）
- 出典: 公式 docs `guides/pre-styled-ui-motion-feature`。機械可読な一次情報は `crates/pre-styled-ui/Cargo.toml` の `[features]` 直前コメントと `crates/pre-styled-ui/src/lib.rs` のクレート doc。`docs/design/motion-reference-adoption-policy.md` §7（ゼロコスト方針）・`docs/ci/version-bump-publish-order-gap.md` §11 は pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9` の `Fandhe-AI/fandhe-frontend` リポジトリ内パス（非公開参照）

## Related

- [アニメーション機能ガイド](./animation.md)
- [fandhe-animation / fandhe-frontend-animation API ガイド](./animation-core.md)
- [wasm-full feature 選択ガイド](./wasm-full-features.md)
- [View Transitions](./view-transitions.md)
