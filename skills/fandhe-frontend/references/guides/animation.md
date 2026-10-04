# アニメーション機能ガイド

宣言的な `data-*` 属性を書くだけで動くアニメーション機能（presence・keyframes・stagger・scroll-driven・in-view・gesture・cursor・View Transitions・layout FLIP・共有レイアウト遷移・SVG path）の使い方を、「pre-styled-ui の recipe → 出力される `data-*` / CSS → wasm-full の feature・配線」の流れで機能別に示す。

## Signature / Usage

```rust
use fandhe_frontend_pre_styled_ui::recipe::{
    stagger_index_style, MotionDuration, SlotRecipe, STAGGER_INDEX_VAR,
};

const SLOTS: &[&str] = &["list", "item"];
let recipe = SlotRecipe::new("list", SLOTS).stagger_delay("item", MotionDuration::Fast);
// SSR/アプリコード側が各要素へ書き出す:
let style_attr = stagger_index_style(2); // "--fandhe-motion-stagger-index: 2"
```

```toml
[dependencies]
fandhe-frontend-pre-styled-ui = { version = "0.204", features = ["motion"] }
```

## Options / Props

機能別の属性・API（いずれも既定 on の wasm-full feature。pre-styled-ui `motion` のみ既定 off）:

| 機能 | pre-styled-ui | wasm-full feature | opt-in 属性 / API |
|------|---------------|-------------------|-------------------|
| presence（enter / exit） | 不要（既定出力） | 不要 | `SlotRecipe::presence_transition(slot, MotionDuration)`。headless の `data-state="open"/"closed"` と連動し `[hidden]` + `@starting-style` でフェード + スケール |
| 共通 keyframes | `motion` | 不要 | `Theme::to_css_with_keyframes()`、`motion::KEYFRAMES_CSS`、`motion::FADE_IN_KEYFRAMES_NAME` 等 10 個 |
| stagger | `motion` | `stagger` | `SlotRecipe::stagger_delay`、`recipe::stagger_index_style`、`recipe::stagger_delay_declaration`。keyed list の親へ `STAGGER_AUTO_FIRST_ATTR`（`"data-fandhe-stagger-auto-first"`）で自動書き戻し |
| scroll-driven | `motion` | `scroll-driver` | `SlotRecipe::scroll_reveal` / `parallax(slot, ParallaxSpeed)` / `sticky_progress`。フォールバック用に `data-fandhe-scroll-progress`（`SCROLL_PROGRESS_ATTR`） |
| in-view | 不要 | `in-view` | `data-in-view`（`IN_VIEW_ATTR`、値なし。交差状態の書き戻し先を兼ねる）、`data-in-view-once="true"`（`IN_VIEW_ONCE_ATTR`、初回進入後に監視解除） |
| hover / press | 不要 | `gesture` | `data-fandhe-gesture-hover` / `data-fandhe-gesture-press`（opt-in を分離）、状態書き戻し先 `data-fandhe-hover` / `data-fandhe-press` |
| cursor | `motion` | `cursor` | `cursor::cursor(attrs)`、`CURSOR_ATTR`（`"data-fandhe-cursor"`）、`CURSOR_TARGET_ATTR`（値はバリアント名）、`CURSOR_TARGET_LABEL_ATTR`、`CURSOR_TARGET_MAGNETIC_ATTR`（中心へ吸着） |
| View Transitions（汎用） | 不要 | `view-transitions` | `Runtime::apply_with_view_transition()` |
| View Transitions（named preset） | `motion` | `view-transitions` + `view-transition-preset` | `Runtime::apply_with_view_transition_named(ViewTransitionPreset::Slide)`、`Theme::to_css_with_view_transition_presets()` |
| View Transitions（動的名前） | 不要 | `view-transition-name` | `view_transition_name::set_view_transition_name`。静的名は `recipe::view_transition_name_declaration` |
| layout FLIP | 不要 | `layout-animation` | keyed list の親へ `data-fandhe-flip-auto`（`FLIP_AUTO_ATTR`） |
| 共有レイアウト遷移 | 不要 | `layout-animation` | `data-fandhe-layout-id`（`LAYOUT_ID_ATTR`） |
| SVG path drawing | 不要 | `svg-path` | `data-fandhe-svg-path-draw`（`SVG_PATH_DRAW_ATTR`、値なし） |
| `animate()` 直接呼び出し | 不要 | `animate` / `animation-driver` | `data-*` 配線なし（animation-core ガイド参照） |

named view transition の 11 プリセットと `ViewTransitionPreset`:

| プリセット | `ViewTransitionPreset` | 概要 |
|-----------|------------------------|------|
| `fade` | `Fade` | クロスフェード |
| `slide` | `Slide` | 左方向へのスライド |
| `wipe` | `Wipe` | クリップパスによるワイプ |
| `iris` | `Iris` | 中央からの円形展開 |
| `doors` | `Doors` | 中央から左右へ開く |
| `shutter` | `Shutter` | 中央から上下へ開く |
| `blinds` | `Blinds` | 8 段の横ブラインド |
| `strips` | `Strips` | 左右交互に伸びる帯 |
| `pixels` | `Pixels` | 4×4 格子の段階的リビール |
| `mask-wipe` | `MaskWipe` | ソフトエッジの横ワイプ |
| `mask-radial` | `MaskRadial` | ソフトエッジの円形展開 |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/animation/
- 各機能の最小例（原文より）: scroll-driven は `SlotRecipe::new("card", SLOTS).scroll_reveal("root").parallax("image", ParallaxSpeed::Slow).sticky_progress("progress")`、in-view は `<div data-in-view data-in-view-once="true">` + `[data-in-view] { opacity: 1; transition: opacity var(--fandhe-motion-duration-normal); }`、hover / press は `<button data-fandhe-gesture-hover data-fandhe-gesture-press>` + `[data-fandhe-hover]` / `[data-fandhe-press]`、layout FLIP は `<ul data-fandhe-flip-auto>`、共有レイアウトは `<span data-fandhe-layout-id="indicator"></span>`、SVG path は `<svg><path data-fandhe-svg-path-draw d="..." /></svg>`
- フォールバック: presence は `@starting-style` 非対応でも `[hidden]` の開閉は動き演出のみ省略。stagger は JS なしでも初期 HTML の `style` による静的遅延が有効（自動追従のみ失われる）。scroll-driven は属性なし・JS なしで静止したまま安全に劣化。in-view は JS なしで CSS 初期状態のまま留まるため、初期状態は「非表示」でなく控えめな表現に留める。View Transitions は `document.startViewTransition` 非対応で通常の即時更新。layout FLIP / 共有レイアウト / SVG path は feature off・属性なしで通常表示
- stagger の自動書き戻しは `Insert` / `Move` 後の DOM 順位置ベース。`Center` / `Last` 起点はアプリ側が `stagger_index_style` を直接書く責務で対象外
- scroll-driven の属性値 `"cover"` / `"contain"` は `parallax` / `sticky_progress` のネイティブ範囲に対応し、未知の値は `"entry"` へ fail-closed（`progress_range_from_attr`）
- cursor は `prefers-reduced-motion: reduce` / `pointer: coarse` のいずれかが真なら配線せず、`CURSOR_CSS` 側の `@media` でも非表示 + ネイティブカーソル復帰（二重フェイルセーフ）。JS なしでは `data-fandhe-cursor-state` が付かず `display: none` のまま
- View Transitions の pre-styled-ui 側と wasm-full 側は `data-fandhe-view-transition` の文字列一致のみの契約（Cargo 依存なし）。mask 系プリセットは unprefixed `mask`（Chrome 120+ / Safari 15.4+）のみに依存
- layout FLIP: `data-fandhe-flip-auto` を持つ祖先リスト配下の内側リストは自分では capture / play せず、最外側の FLIP リストがサブツリー全体を所有する
- 共有レイアウト遷移は別要素が同じ役割を引き継ぐ遷移（motion.dev `layoutId` 相当）で、`Runtime::rerender` / `apply_with_view_transition`（VT 非対応時のフォールバック含む）が再構築する前後で同じ id の旧要素から新要素へ FLIP 補正する。View Transitions 対応ブラウザでは UA の同名要素 morph が優先され本機構は起動しない。旧要素のクロスフェード（ghost 残存）は行わず、位置・サイズの引き継ぎのみ。旧要素が DOM に接続中の同時表示は対象外。同一要素への `data-fandhe-flip-auto` との併用は意図が異なるため混在させない
- SVG path drawing は duration 800ms・ease-in-out の固定既定値のみでカスタム不可。マウント後に動的挿入された要素への追随（MutationObserver）はスコープ外
- `toast_motion::stack_group_keyed` は `toast::group` に `STAGGER_AUTO_FIRST_ATTR` / `FLIP_AUTO_ATTR` / `toast_motion::STACK_ATTR` を付けて `keyed_list` を呼ぶ薄いラッパーで、stagger と layout FLIP を同時に自動配線する
- reduced-motion: `var(--fandhe-motion-duration-*)` 経由の transition 全般（presence・hover / press の CSS transition）は duration トークンが `0ms` に上書きされるため個別ブロック不要。SVG path drawing は `fandhe-frontend-animation::svg_path` の `detect_reduced_motion()` が自動検出。別ブロックが必要な機能は、共通 `@keyframes`（`KEYFRAMES_CSS` が再定義ブロックを持つ）、named View Transitions プリセット（`animation: revert;` を再宣言）、scroll-driven（`animation-timeline` / `animation-range` は duration トークンを参照しないため `SlotRecipe` が機能ごとに個別の `@media (prefers-reduced-motion: reduce)` を自動生成）、cursor（`CURSOR_CSS` 自身と wasm-full 側の二重）。利用者側の追加対応は不要
- 原文 §17 の検証コマンドはドキュメントサイトの開発者向け（`cargo test -p fandhe-frontend-docs-site --test site_nav`、`cargo run -p fandhe-frontend-docs-site --locked -- --out dist/`、`cargo run -p fandhe-frontend-cli --locked -- gate --project .`）で、利用者向け API ではない
- 出典: 公式 docs `guides/animation`。`docs/design/motion-reference-adoption-policy.md` §7 は pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9` の `Fandhe-AI/fandhe-frontend` リポジトリ内パス（非公開参照）。原文が `crates/pre-styled-ui/src/recipe.rs:974` 等として示す行番号は当時のもの

## Related

- [fandhe-animation / fandhe-frontend-animation API ガイド](./animation-core.md)
- [pre-styled-ui motion feature ガイド](./pre-styled-ui-motion-feature.md)
- [wasm-full feature 選択ガイド](./wasm-full-features.md)
- [View Transitions](./view-transitions.md)
