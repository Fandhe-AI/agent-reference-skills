# Extension Points（拡張点の全体像）

コアが公開する拡張点は 3 種（`Middleware` / `RequestGate` / `UpgradeHandler`）に集約される。プラグイン（`crates/plugin-*`）はこれらの trait を実装する側であり、コアからプラグインへの依存は発生しない（`server → routes → http::*` の一方向依存）。

## Signature / Usage

1 接続あたりの処理フロー（`crates/core/src/server.rs` の `handle_connection` 概要）:

```text
loop {
  read_request（ヘッド + body 読了、タイムアウト付き）
    Ok(None)          → 正常クローズ
    Err(e)            → e に応じた 4xx/5xx（またはエラー応答なし）を返しクローズ
    Ok(Some(req)) →
      1. Middleware::on_request（登録順）
      2. RequestGate::check（登録順、最初の Reject を優先。フェイルクローズ）
      3. UpgradeHandler::matches（登録順。マッチしたら委譲）
      4. plugin::try_intercept（パスインターセプト型プラグイン。Some(response) なら Handler::handle をスキップ）
      5. Handler::handle（未登録時は 404）
      5.5. plugin::finalize_response（レスポンス後処理型プラグイン）
      6. レスポンス書き込み → Middleware::on_response
      7. should_keep_alive(head) が false なら接続を閉じる
}
```

## Notes

- `RequestGate` を `UpgradeHandler` より先に評価するのは、将来の hub TenantGate が WebSocket アップグレードも既定拒否でゲートできるようにするため
- 3 拡張点は dyn 互換性のため同期 API として定義される。`Handler::handle` のみ非対称に async 化されている（イシュー #315）
- コア自身の接続ループ本体（`handle_connection`）は `#[cfg(feature = "...")]` を一切持たない。プラグインの介入余地は `plugin::try_intercept` / `plugin::try_handle_upgrade` / `plugin::finalize_response`（いずれも `crates/core` 非公開の `plugin` モジュール）の 3 種の固定シグネチャのヘルパーに閉じる
- `plugin::try_intercept`: リクエスト/レスポンス完結型プラグイン（WebRTC シグナリングプロキシ、GraphQL、OpenAPI 配信、静的ファイル配信等）へのパスインターセプト
- `plugin::try_handle_upgrade`: 長時間接続（WebSocket 等）への委譲。`UpgradeHandler` 経由で検知後に完全委譲する
- `plugin::finalize_response`: レスポンス後処理型プラグイン（CORS・圧縮等）への委譲。`Middleware::on_response` がレスポンスへの参照を持たない観測専用契約のため使えない場合の受け皿
- 個々のプラグイン固有 API（WebSocket / GraphQL / OpenAPI / CORS / 圧縮 / 静的配信等）は各 `crates/plugin-*` 側の責務であり、本 core スコープの対象外

## Related

- [Middleware](./middleware.md)
- [RequestGate](./request-gate.md)
- [UpgradeHandler](./upgrade-handler.md)
- [Server](./server.md)
