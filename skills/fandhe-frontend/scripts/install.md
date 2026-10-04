# install

`fw` CLI・WASM ビルドに必要なツールチェーン・Vercel CLI・feature フラグ（`wasm-full` / `motion`）の導入コマンド（公式クイックスタート・デプロイ/wasm-full/motion/animation ガイドで確認済み）。

## 前提バージョンの確認

```sh
cargo --version
rustup --version
```

## fw CLI の導入（crates.io 経由）

```sh
cargo install fandhe-frontend-cli
fw
```

`fw` バイナリが `cargo install` 先（既定 `~/.cargo/bin`）に導入される。引数なしで `fw` を実行するとサブコマンド一覧が表示され、導入確認になる。最新の公開版は `fandhe-frontend-cli` 0.5.2。

## 開発版 fw の導入（ソースから）

```sh
git clone git@github.com:Fandhe-AI/fandhe-frontend.git
cd fandhe-frontend
cargo install --path crates/cli
```

リポジトリを clone してソースから `fw` を導入する場合。都度実行するだけなら `cargo run -p fandhe-frontend-cli --bin fw -- <サブコマンド>` でも可。

## CSR（WASM）ビルド用ツールチェーンの追加

```sh
rustup target add wasm32-unknown-unknown
```

```sh
grep -A1 'name = "wasm-bindgen"' wasm/Cargo.lock | head -2
```

生成したプロジェクト（`fw new --template app`）の `wasm/Cargo.lock` から必要な `wasm-bindgen` バージョンを確認する。

```sh
cargo install wasm-bindgen-cli --version <確認したバージョン> --locked
```

`wasm-bindgen-cli` のバージョンは `wasm/Cargo.lock` が解決した `wasm-bindgen` のバージョンと完全一致させる必要がある（不一致は `tools/wasm/build.sh` が実行前チェックで検出し停止する）。

## wasm-full の feature 選択（default-features = false）

`fandhe-frontend-wasm-full` の feature（配線群別 + scope 別）は既定ですべて on。必要な feature だけを選ぶ場合の `Cargo.toml` 記述（`default` 配列と同じ 56 件を明示して従来挙動を維持する形）。

```toml
[dependencies.fandhe-frontend-wasm-full]
version = "0.40.4"
default-features = false
features = [
  "wasm-bindgen-exports",
  "keynav",
  "focus-visible",
  "avatar",
  "clipboard",
  "timer",
  "angle-slider",
  "splitter",
  "signature-pad",
  "number-input",
  "command",
  "sidebar",
  "chart",
  "chart-range",
  "questionnaire",
  "message-scroller",
  "data-table",
  "in-view",
  "gesture",
  "scroll-driver",
  "drag-gesture",
  "confetti",
  "svg-path",
  "hold-to-confirm",
  "add-to-basket",
  "magnetic",
  "ticker",
  "carousel-motion",
  "text-animation",
  "cursor",
  "count-up",
  "position",
  "stagger",
  "animation-driver",
  "view-transitions",
  "view-transition-name",
  "view-transition-preset",
  "animate",
  "layout-animation",
  "presence",
  "accordion",
  "calendar",
  "collapsible",
  "combobox",
  "dialog",
  "listbox",
  "menu",
  "menubar",
  "navigation-menu",
  "popover",
  "radio-group",
  "select",
  "tabs",
  "toggle-group",
  "tooltip",
  "tree-view",
]
```

`entry` 機能を使わないアプリは `wasm-bindgen-exports` を省略できる。`headless_signature_pad::wire_signature_pad_component` を `Runtime::wire_headless` 経由せず直接呼ぶ場合は、上記に加えて `headless::wire_headless_component` を同じ `root` / `component` へ明示的に呼ぶ必要がある（ガイド記載）。配布 WASM（`fandhe-frontend-dist-server`）の最小構成は `wasm-bindgen-exports, collapsible, dialog, popover, tooltip, position` の 6 feature。

## pre-styled-ui の motion feature の有効化

```toml
[dependencies]
fandhe-frontend-pre-styled-ui = { version = "0.241.0", features = ["motion"] }
```

`motion` は既定 off。有効化すると `fandhe-animation` が依存グラフに加わる。無効のままなら crate サイズ・ビルド時間・`Theme::to_css` の処理量・CSS 出力は変わらない（ゼロコスト契約）。版数は crates.io 最新版（0.241.0）に更新した表記で、公式ガイド原文の例は motion ガイドが `0.192`、animation ガイドが `0.204`。presence（enter/exit）は `motion` feature 不要で既定出力に含まれる。

## Vercel CLI の導入（デプロイ用）

```sh
npm i -g vercel
```

Vercel へのデプロイ（`scripts/deploy.md`）に使う。グローバル導入になるため、実行前に導入元を信頼できるか確認すること（公式 README の注記）。
