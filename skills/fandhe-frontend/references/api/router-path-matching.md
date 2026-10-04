# ルーター パスマッチング

`fandhe_frontend_app::router::Router` が実装する v1 パスマッチング仕様。SSR・SSG・CSR で共有される（REQ-7 対応）。

## Signature / Usage

```rust
pub struct Router<H> { /* ... */ }

impl<H> Router<H> {
    pub fn new() -> Self;
    pub fn route(self, pattern: &str, handler: H) -> Result<Self, RouterError>;
    pub fn resolve(&self, path: &str) -> Option<RouteMatch<'_, H>>;
}

pub struct RouteMatch<'a, H> {
    pub handler: &'a H,
    pub params: Params,
}

pub struct Params(/* Vec<(String, String)> */);

impl Params {
    pub fn get(&self, name: &str) -> Option<&str>;
    pub fn iter(&self) -> impl Iterator<Item = (&str, &str)>;
}
```

```rust
// パターン → マッチ結果の実例（マッチング仕様に基づく）
fn demo() -> Result<(), RouterError> {
    let router = Router::new()
        .route("/items", "list")?
        .route("/items/:id", "detail")?;

    let m = router.resolve("/items/1?ref=home").unwrap();
    assert_eq!(m.params.get("id"), Some("1")); // クエリ文字列は照合前に切り落とされる

    assert!(router.resolve("/items/1/").is_none());
    // 末尾スラッシュは正規化されない厳格一致のため "/items/1" と不一致
    Ok(())
}
```

## マッチング仕様

| 項目 | 挙動 |
| --- | --- |
| パターン開始 | `/` から始まる必要がある。違反時は `RouterError::MissingLeadingSlash` |
| セグメント一致 | セグメント単位の完全一致 |
| パスパラメータ | `:name` は空でない1セグメントを捕捉し `Params` へ格納 |
| 優先度規則 | 登録順の先勝ち。同一パターン重複時は最初が有効 |
| クエリ文字列 | `?` 以降は照合前に切り落とす |
| 末尾スラッシュ | 正規化しない厳格一致（`/items/1/` と `/items/1` は別物） |
| 連続スラッシュ | 空セグメントとして扱われ、一致しない |
| パラメータ値 | URL デコードしない生文字列で保持 |

## エラー

| エラー | 発生条件 |
| --- | --- |
| `RouterError::MissingLeadingSlash(String)` | パターンが `/` から始まっていない |
| `RouterError::EmptySegment(String)` | パターンに連続スラッシュ・末尾スラッシュ等による空セグメントを含む |
| `RouterError::EmptyParamName(String)` | コロン直後が空（例: `"/items/:"`） |
| `RouterError::DuplicateParamName { pattern, name }` | 同一パターン内でパラメータ名が重複 |

いずれも `route()` が `Result::Err` として返し、`panic!` しない。`RouterError` は `Display` / `std::error::Error` を実装する。

## Notes

- `fandhe-frontend-app` 0.2.6 の `router` モジュールで確認。`fandhe_frontend_server::router` からも再エクスポートされる。外部クレートに依存せず、照合は登録ルート数 × セグメント数に比例する線形走査（正規表現・再帰・バックトラックなし）
- v1 スコープ外: ワイルドカード、パーセントデコード、HTTP メソッド別ディスパッチ、ネストレイアウト、優先度規則の高度化
- セキュリティ不変条件: パストラバーサル耐性、DoS 耐性、panic 非発生。エスケープ処理はルーター非経由（呼び出し元の責務）
- `fandhe-frontend-app` の `routes` モジュール（イシュー #407）は本ページの `Router<H>` を共通マッチングエンジンとして利用し、以前 `server` の `ssr.rs` と `wasm-full` の `nav.rs` に別々に存在していたルート定義を `AppRoute`/`resolve`/`title` へ一本化した。詳細は [fandhe-frontend-app API](./app-api.md) を参照

## Related

- [ハイドレーション状態フォーマット](./hydration-state-format.md)
- [fandhe-frontend-headless-ui API](./headless-ui-api.md)
- [fandhe-frontend-app API](./app-api.md)
