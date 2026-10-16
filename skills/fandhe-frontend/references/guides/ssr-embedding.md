# SSR 組み込みガイド

既存のサーバー（fandhe-backend など、`fandhe-frontend-server` を使わないもの）のリクエストハンドラから、fandhe-frontend の描画で HTML を生成して返す方法。対象は `fandhe-frontend-app` 0.2.8 以降（`Document` は 0.2.7、CSP と `ViewTransitions` は 0.2.8 で追加）。

## Signature / Usage

```rust
use fandhe_frontend_app::Document;
use fandhe_frontend_core::{el, text};

let form = el("form", vec![("method", "post")], vec![text("Sign in")]);
let html = Document::new("Sign in", form)
    .lang("en")
    .stylesheet("/assets/auth.css")
    .script_module("/assets/auth.js")
    .render();
assert!(html.starts_with("<!DOCTYPE html>\n"));
assert!(html.contains("<title>Sign in</title>"));
assert!(html.contains("/assets/auth.css"));
assert!(html.contains("type=\"module\""));
```

CSP をメタタグで出し、inline の `<style>` / `<script>` 本文を一切出さない構成:

```rust
use fandhe_frontend_app::{Document, ViewTransitions};
use fandhe_frontend_core::{el, text};

let html = Document::new("Sign in", el("p", vec![], vec![text("hi")]))
    .content_security_policy("default-src 'none'; style-src 'self'; script-src 'self'")
    .view_transitions(ViewTransitions::Stylesheet("/assets/vt.css".into()))
    .stylesheet("/assets/app.css")
    .script_module("/assets/app.js")
    .render();
assert!(html.contains("http-equiv=\"Content-Security-Policy\""));
assert!(!html.contains("<style"));
assert!(html.contains("<script type=\"module\" src=\"/assets/app.js\"></script>"));
```

ハンドラの処理の流れ:

```text
GET:  リクエスト受信 -> 必要ならセッション確認 -> Node 構築
      -> Document::render() -> ヘッダを付けて 200 を返す
POST: Origin / Sec-Fetch-Site の判定 -> フォーム解析 -> 検証
      -> 成功なら 303（リダイレクト先は固定値）
      -> 失敗ならエラー文言をテキストノードとして渡して再描画
```

利用者ごとに変わるページに付けるレスポンスヘッダ（ハンドラの責務。`Document` は出力しない）:

```http
Content-Type: text/html; charset=utf-8
Cache-Control: no-store
Vary: Cookie
```

HTTP ヘッダ側で足す CSP の例（上のメタ CSP レシピとは別物）:

```http
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; form-action 'self'; base-uri 'none'; frame-ancestors 'none'
```

## Options / Props

責務分担:

| 担当 | 責務 |
|------|------|
| ハンドラ側 | ルーティング、Cookie とセッション、POST の受信とフォーム解析、入力検証、CSRF 判定、リダイレクト、レスポンスヘッダ一式（`Content-Type`・`Cache-Control`・`Vary`・CSP・`frame-ancestors`） |
| fandhe-frontend 側 | `Node` 木の構築と、`Document::render()` による DOCTYPE 付き HTML 文字列の生成だけ |

## Notes

- 出典: https://fandhe-ai.github.io/fandhe-frontend/guides/ssr-embedding/（原本は pin SHA `7256504` の `docs/guides/ssr-embedding.md`）
- 公式ガイドは `Document` を 0.2.7、CSP / `ViewTransitions` を 0.2.8 の導入と記すが、crates.io に `fandhe-frontend-app` 0.2.7 は存在しない（0.2.6 → 0.2.8）。実際に利用できるのは 0.2.8 以降
- `page_shell` はこの用途の入口ではない。`/static/hydrate.js` とインラインの `<style>` が固定されているため、代わりに `Document` を使う
- `Document` は HTTP ヘッダを持たない純関数層。既定エスケープ（REQ-1）が一次防御で、CSP は二次防御
- 検証エラーなど利用者入力由来の文字列は必ず `text` 経由で渡す。`raw_html` に入れたり、HTML を `format!` で組み立てたりしない
- フォームは素の `<form method="post">` を `el("form", ...)` で組む。構造は既存の `field` / `fieldset` 部品が担う。`Form` 部品は提供しない（バリデーションや送信処理を内包する部品は実装しない方針。`docs/policy/intentional-non-adoption.md` §3.25 に決定記録）。検証は利用者の Rust コードで行い、結果を渡す
- `action` には固定の同一オリジン相対パスのリテラル（例 `/login`）だけを渡し、リクエスト由来の値から組み立てない。core は `javascript:` や `data:` などの危険なスキームを落とすが、`//他ホスト` や `https://他オリジン` は通すため、送信先オリジンは検証されない。多層防御として CSP に `form-action 'self'` を入れる
- POST 後のリダイレクトも `next` などのクエリから組み立てず、固定の宛先にする（オープンリダイレクト防止）
- CSS の推奨経路: (1) `StyleSheet::new()` に `push_theme(&Theme::default())`、`push_recipe`、使う部品の `stylesheet()` を `push_css` で積む（`Theme::to_css` と `StyleSheet` は `fandhe-frontend-pre-styled-ui` の API）、(2) View Transitions を使うなら `VIEW_TRANSITION_CSS` も同じ CSS に積む、(3) `write_css_file` でビルド時に書き出すかハンドラの静的ルートで配信、(4) `Document::stylesheet("/assets/app.css")` で参照する
- `StyleSheet::style_element()` によるインライン `<style>` の埋め込みは、CSP でインライン style を許す構成でのみ使える。View Transitions は `ViewTransitions::Stylesheet(..)` を使うか、配信 CSS に `VIEW_TRANSITION_CSS` を含める
- `Document` は、安全な URL として通らない stylesheet / script の URL を要素ごと黙って省略する（fail-closed）。URL の打ち間違いは「スタイルの無いページ」として現れるため、出力に `<link rel="stylesheet"` が含まれることをテストで確認する
- メタの CSP では `frame-ancestors`・`report-uri`・`report-to`・`sandbox` が無効で、clickjacking 対策にならない。HTTP ヘッダでの送出を推奨。メタとヘッダの両方を送ると両方が適用され、より厳しい側が効く（片方に寄せるか内容を揃える）
- `head_node` や body に入れるノードにインラインの style / script を入れない責任は利用者にある。`Document` は渡されたノードを走査・除外しない
- pre-styled-ui の一部の部品（progress・slider・avatar・splitter など）は `style` 属性（CSS 変数など）を出すため、`style-src 'self'` だけでは表示が崩れる。使う部品を選ぶか `style-src-attr 'unsafe-inline'` を追加する。docs サイトも同じ判断（`docs/design/docs-site-csp-policy.md`）
- CSRF 対策はハンドラ側で行う: `Sec-Fetch-Site` が `same-origin` 以外なら拒否、`Origin` が自オリジンと一致しなければ拒否（ヘッダ無しは安全側 = 拒否）、Cookie の `SameSite` 属性を設定。判定方針の正は `Fandhe-AI/fandhe-backend-spec#15`。fandhe-frontend は CSRF トークンの発行も検証もしない
- qr_code の `aria_label` に `otpauth://` URI やシークレットを入れない（「認証アプリ設定用 QR コード」のような汎用ラベルにする）。`title`・`data-*` 属性・ログにも秘密を出さない。QR コード自体に秘密が含まれるため、そのページには `Cache-Control: no-store` が必須
- fandhe-backend に依存する example は、fandhe-frontend から fandhe-backend への依存を作らないため本リポジトリの `examples/` には置かない。fandhe-backend 側または fandhe-auth-backend 側に置く想定

## Related

- [最小埋め込みガイド](./embedding-guide.md)
- [デプロイガイド](./deployment.md)
