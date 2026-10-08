# fandhe-animation / fandhe-frontend-animation API ガイド

`fandhe-animation`（プラットフォーム非依存のアニメーション演算コア）と `fandhe-frontend-animation`（Web アダプタ）を Rust コードから直接呼び出す利用者向けガイド。`data-*` 属性で動く宣言的機能は対象外。

## Signature / Usage

```rust
use fandhe_animation::driver::Driver;
use fandhe_animation::spring::{Spring, SpringConfig};
use fandhe_animation::target::Target;
use fandhe_frontend_animation::dom_target::DomTarget;
use fandhe_frontend_animation::raf_driver::{AnimationLoop, RafDriver};
use web_sys::HtmlElement;

/// `element` の `opacity` を 0 → 1 へ spring で駆動するループを開始する。
/// 戻り値の `AnimationLoop` を呼び出し側が保持し続けること。
fn start_fade_in(element: HtmlElement) -> AnimationLoop {
    let spring = Spring::new(SpringConfig::default(), 0.0, 1.0, 0.0)
        .expect("既定値は常に有効なパラメータ");
    let mut driver = RafDriver::new().expect("ブラウザ環境");
    let mut target = DomTarget::style_property(element, "opacity", "");
    let mut elapsed = 0.0_f64;

    AnimationLoop::start(move || {
        let Some(dt) = driver.tick() else {
            return true; // 初回 tick は基準時刻の記録のみ
        };
        elapsed += dt;
        let state = spring.at(elapsed);
        target.write(state.value);
        !state.done // 収束したら停止する
    })
}
```

3 層構成（依存方向は一方向）:

```
fandhe-animation  ←  fandhe-frontend-animation  ←  wasm-full（optional 依存）
（演算のみ）          （Web アダプタ）               （配線）
```

wasm-full 経由の到達パス:

```rust
// animation-driver feature 経由（RafDriver/DomTarget/AnimationLoop）
use fandhe_frontend_wasm_full::animation_driver::{AnimationLoop, DomTarget, RafDriver};

// animate feature 経由（animate() WAAPI ラッパ、fandhe-animation の型もここから到達できる）
use fandhe_frontend_wasm_full::fandhe_frontend_animation::animate::{animate, AnimateOptions};
use fandhe_frontend_wasm_full::fandhe_frontend_animation::fandhe_animation::spring::{Spring, SpringConfig};
```

## Options / Props

`fandhe-animation`（時間単位は秒）:

| Name | Type | Description |
|------|------|-------------|
| `CubicBezier::new(x1, y1, x2, y2)` | `Option<CubicBezier>` | CSS `cubic-bezier()` 相当。`x1` / `x2` が `[0, 1]` 範囲外、または非有限値で `None`。定数 `EASE` / `EASE_IN` / `EASE_OUT` / `EASE_IN_OUT` |
| `Steps` / `StepPosition` | struct / enum | CSS `steps(count, position)` 相当。`JumpStart` / `JumpEnd` / `JumpNone` / `JumpBoth` |
| `Easing` | enum | `CubicBezier` / `Steps` / `Linear` |
| `Interpolate` | trait | 2 値と進捗 `t` から補間値を返す。`t` は clamp されず範囲外は外挿。対応型: `f64` / `f32` / `Vec2` / `Vec3` / `Vec4` / `Rgba`（成分ごと線形）、`Quat`（slerp、ほぼ同一入力は nlerp + 正規化へフォールバック）、`Mat4`（成分ごと線形） |
| `SpringConfig` | struct | `stiffness` / `damping` / `mass`。`Default` は stiffness=100.0 / damping=10.0 / mass=1.0 |
| `SpringConfig::from_duration_bounce(duration, bounce, velocity, mass)` | fn | duration（秒）と bounce（`0..=1`）から変換。発散時は `Default` へ fail-safe |
| `Spring::new(config, from, to, initial_velocity)` | `Option<Spring>` | 範囲外・非有限値で `None`（panic しない） |
| `Spring::at(t)` | `SpringState { value, velocity, done }` | 時刻 `t`（秒）の状態 |
| `Spring::settle_duration()` | `f64` | `done` になる最初の時刻（秒） |
| `Keyframe<T> { offset, value }` | struct | `offset` は `0.0..=1.0` |
| `Keyframes::new(frames, easings)` / `Keyframes::evenly(values, easings)` | `Result<Keyframes<T>, KeyframesError>` | `easings` が空なら全区間 `Easing::Linear`。それ以外は区間数（`frames.len() - 1`）と一致が必須 |
| `Keyframes::at(t)` | `T`（`T: Clone`） | `t` は `[0, 1]` に clamp。区間外は端点値を保持（WAAPI の fill と同じ） |
| `Stagger::new(each)` / `Stagger::delay(index, total)` | struct / fn | 一律の遅延パターン（Motion `stagger()` 相当） |
| `Timeline<T>` | struct | `add_at(value, duration, At) -> Result<&mut Self, TimelineError>`、`add(value, duration)`（`At::AfterPrevious(0.0)` の糖衣）、`segments()`、`progress_at(t)`、`label` / `label_time` |
| `At<'a>` | enum | `Absolute(f64)` / `AfterPrevious(f64)` / `WithPrevious(f64)` / `Label(&'a str)`。`TimelineError` は `UnknownLabel` / `DuplicateLabel` 等 |
| `Driver::tick(&mut self)` | `Option<f64>` | 直前呼び出しからの経過秒（pull 型）。返せない場合は `None` |
| `Target<T>::write(&mut self, value: T)` | fn | 計算済み値の書き込み先。毎フレーム呼ばれるため panic せずエラーも返さない前提 |
| `ManualDriver` / `RecordingTarget` | struct | テスト用参照実装。crate 外からは `test-utils` feature が必要 |

`fandhe-frontend-animation`:

| Name | Type | Description |
|------|------|-------------|
| `RafDriver::new()` | `Option<Self>` | `window.performance.now()` 差分（秒）を返す `Driver`。wasm32 かつ `window` / `performance` 取得可で `Some`、native / SSR では `None` |
| `AnimationLoop::start(step)` | `AnimationLoop` | `requestAnimationFrame` で `step: impl FnMut() -> bool + 'static` を毎フレーム呼ぶ。`false` で自動停止。`Drop` で `stop()` される |
| `DomTarget::style_property(element, name, unit)` | `Target<f64>` | 標準 CSS プロパティへ書き込み。`unit` は `"px"` / `"deg"` 等、不要なら空文字 |
| `DomTarget::custom_property(element, name)` | `Target<f64>` | CSS カスタムプロパティ（例: `--fandhe-motion-progress`）へ書き込み |
| `WaapiKeyframe { offset: f64, easing: Option<String>, properties: Vec<(String, String)> }` | struct | WAAPI へ渡す 1 keyframe。`properties` は `(CSS プロパティ名, CSS 値文字列)`（プロパティ名の妥当性検証はせず素通し） |
| `AnimateOptions { duration_ms: f64, easing: Option<String>, fill: Option<String>, iterations: Option<f64> }` | struct | `element.animate()` の第 2 引数相当。`duration_ms` はミリ秒 |
| `easing_to_css(easing)` | `String` | `Easing` を `"cubic-bezier(...)"` / `"steps(...)"` へ変換。native からも呼べる |
| `keyframes_to_waapi(keyframes, property, to_css_value)` | `Vec<WaapiKeyframe>` | `Keyframes<T>` を単一プロパティの WAAPI keyframes へ。offset 0 / 1 が欠落していれば端点値で自動補完 |
| `animate(element: &web_sys::Element, keyframes: &[WaapiKeyframe], options: &AnimateOptions)` | `Result<AnimationHandle, JsValue>` | wasm32 限定 |
| `AnimationHandle::finished(&self)` | `async Result<(), JsValue>` | wasm32 限定。WAAPI `Animation.finished` を待つ |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/animation-core/
- `fandhe-animation` は外部依存ゼロ・`#![forbid(unsafe_code)]`で、DOM・requestAnimationFrame・Web Animations API には一切触れない。`fandhe-frontend-animation` は `fandhe-frontend-wasm-full` / `-wasm-client` / `-wasm-thin` のいずれにも依存しない
- `Mat4` の補間は回転を含む場合は正確ではない（180° 回転同士の中点がゼロ行列へ潰れる等）。回転を伴う用途は `Vec3`（translate / scale）+ `Quat` を個別補間してから合成する
- `AnimationLoop` は戻り値を保持し続けること。変数を drop するとループが止まる
- `AnimateOptions.duration_ms` は**ミリ秒**で、`fandhe-animation` 全体の秒単位と異なる
- wasm-full の `animation-driver` / `animate` feature（既定 on）は型の再公開のみで、`data-*` 属性から rAF Driver / DOM Target / WAAPI を自動駆動する宣言的配線は存在しない（2026-09 時点）。`in_view` / `gesture` / `stagger_index` 等の `data-*` 配線は `fandhe-animation` / `fandhe-frontend-animation` に依存しない別系統。両 feature は `fandhe-frontend-dist-server` の最小インタラクティブ構成 `WASM_DIST_FEATURES`（7 feature）に含まれず、配布 WASM には出荷されない。`default-features = false` では `features` に `"animation-driver"` / `"animate"` を明示する
- セキュリティ: `DomTarget` は `CSSStyleDeclaration.setProperty` の 2 引数 API のみを使い、プロパティ名・単位は呼び出し側の固定値であるため、`;` 等で追加の CSS 宣言を注入する経路を持たない。`data-*` 属性値などの信頼できない DOM 文字列をプロパティ名に使わない。`WaapiKeyframe.properties` / `AnimateOptions.easing` には `easing_to_css` や呼び出し側の `to_css_value` を経由した信頼できる値を渡し、未検証の外部入力文字列をそのまま渡さない
- 出典: 公式 docs `guides/animation-core`。`fandhe-animation` 0.2.0 / `fandhe-frontend-animation` 0.17.1 のクレートソース（crates.io 公開版）と API 名・シグネチャを突合済み。設計根拠 `docs/design/animation-core-architecture.md`・`docs/design/motion-reference-adoption-policy.md` §6 は pin SHA `cf5edb9b8f1bf2a63d51dcf50a8d2806e2d8f9f9` の `Fandhe-AI/fandhe-frontend` リポジトリ内パス（非公開参照）。実ブラウザ結合例は同 SHA の `crates/frontend-animation/tests/spring_via_raf_dom_browser.rs`

## Related

- [アニメーション機能ガイド](./animation.md)
- [pre-styled-ui motion feature ガイド](./pre-styled-ui-motion-feature.md)
- [wasm-full feature 選択ガイド](./wasm-full-features.md)
