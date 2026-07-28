# 最小埋め込みガイド

既存の静的 HTML ページの `<div>` へコンポーネントを部分的にマウントする手順。SSR 構成と同じ描画関数を共有できる点が特徴で、最小埋め込み構成とフルスタック構成（SSR＋ルーティング）はコンポーネントロジックに一切分岐を持たない同一関数を呼び出す。

## Signature / Usage

```html
<!-- 既存ページに追加するマウントポイント -->
<div id="app-list"></div>

<script type="module">
  import init, { mount_csr } from "./wasm/fandhe_frontend_wasm_client.js";
  async function main() {
    await init();
    mount_csr("app-list");
  }
  main();
</script>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `mount_csr(root_id: &str)` | function | 指定 ID の要素に `fandhe_frontend_app` のページ関数 → `fandhe_frontend_core::render()` の既定エスケープ済み出力を反映する（`fandhe-frontend-wasm-client` クレートが提供） |
| `fw new <project-name> --template embed` | CLI | 正典テンプレート（`embed.html` + `structure.toml`）を決定的に生成する |

## Notes

- 最小埋め込みは次の 3 要素で成立する: (1) マウントポイントとなる `<div id="...">` を置く、(2) `<script type="module">` から WASM を `init()` し `mount_csr("...")` を呼ぶ、(3) WASM モジュールをビルドしページと同一オリジンで配信する
- ビルドターゲットは `wasm32-unknown-unknown`（`cargo build --target wasm32-unknown-unknown -p fandhe-frontend-wasm-client`）。生成物はページと同一オリジンで配信する
- `mount_csr` が DOM へ反映する内容は `fandhe_frontend_app` のページ関数 → `fandhe_frontend_core::render()` を経由した既定エスケープ済みの HTML のみ。`format!` によるタグ文字列の直接組み立てや、ユーザー入力を直接 `innerHTML` に代入するコードは禁止
- `fandhe_frontend_core::raw_html()` は既定エスケープを迂回する明示的オプトイン API。信頼できない入力を渡してはいけない（フルスタック構成と同一の制約）
- 責務境界: フレームワークが安全性を保証するのはフレームワークが管理する `<div>`（マウントポイント）の内側だけ。埋め込みページの残りの部分（素の HTML・他の `<script>` タグ・CSP 設定等）はフレームワークの管理下になく、ページ作者の責務
- フルスタック構成へ移行する際、呼び出し元が `fandhe-frontend-wasm-client` の `mount_csr` から `fandhe-frontend-server` の SSR/SSG ハンドラに変わるだけで、コンポーネントの記述（`crates/app/src/lib.rs` 相当）を書き直す必要はない
- v1 の共通コアはパスマッチングによる基本的なルート解決までを提供する。ネストレイアウト・データローディング・高度なルーティング等は対象外

## Related

- [クイックスタート](../getting-started/quickstart.md)
- [コンポーネント記述ガイド](./component-authoring.md)
