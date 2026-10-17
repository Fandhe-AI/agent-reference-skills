---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# NoSQL API overview

`wire-server --surface nosql` が公開する 3 エンドポイント（`POST /v1/session`・`POST /v1/session/close`・`POST /v1/query`）と、`POST /v1/query` の `op` 11 値（`search`／`scan`／`aggregate`／`insert`／`update`／`delete`／`create_table`／`alter_table`／`drop_table`／`show_partitioned_dml`／`cancel_partitioned_dml`）の JSON スキーマの入口。NoSQL 表層は SQL wire（pg wire v3 互換実装）と排他選択する、HTTP/1.1 最小サブセット上の転送路（TASK-171・HTTP-1・HTTP-9）。

## Signature / Usage

```sh
wire-server --users <path> --db <path> --surface nosql [--bind <addr:port>] \
  [--tls-cert <pem> --tls-key <pem> [--tls-mode require|allow]]
```

`--users`・`--db` は必須（fail-closed。省略時は起動しない）。`--bind` の既定値は `127.0.0.1:5432`。TLS 未構成時は非ループバックアドレスへの bind を起動時に拒否する（loopback 限定）。

**転送路の共通規則**

要求の受理条件（いずれも接続ハンドラ層で判定し、違反はすべて `08P01`）:

| 項目 | 規則 | 違反時 |
|------|------|--------|
| メソッド・バージョン | `POST` のみ、`HTTP/1.1` のみ | `08P01` |
| 要求行 | 4 KiB 以下 | `08P01` |
| ヘッダ部 | 合計 8 KiB 以下・32 個以下 | `08P01` |
| `Content-Length` | 必須・一意（欠落・重複・非数字は `08P01`） | `08P01` |
| `Transfer-Encoding` | 拒否 | `08P01` |
| `Content-Type` | `application/json`（パラメータなし、または `charset=utf-8` 1 個のみ）。不一致・欠落は `08P01` | `08P01` |
| 本文長 | 1 MiB 以下 | `54000` |
| 本文エンコーディング | UTF-8 として不正な本文 | `42601` |
| 読み取りタイムアウト | 要求読み取りに 30 秒 | — |

応答は常に `Content-Type: application/json; charset=utf-8`・`Content-Length`・`Connection: close`・`Date` を付け、1 要求ごとに接続を閉じる。`401` 応答のみ `WWW-Authenticate: Bearer` を追加で付ける（RFC 9110 §11.6.1 準拠）。

## Notes

- エラー契約は SQL 表層と完全共有する。NoSQL 表層は新規 `wire_code` を追加せず、`engine::error_format::ErrorClass` を HTTP 応答（ステータス・本文）へ写像するのみ（ERR-4）。
- `AGENTS.md` がスコープ外とする汎用「Web API」フレームワークとは別物で、spec で規範化された内部転送プロトコルの実装にすぎない。
- TLS: `--tls-cert`／`--tls-key`／`--tls-mode` は SQL 表層（pg wire）と同じ意味で NoSQL 表層にも適用される（Issue #968）。HTTP には `SSLRequest` のような明示ネゴシエーションが無いため、接続受理直後の先頭バイトで TLS レコード（`0x16`）か平文 HTTP かを判定する。`--tls-mode require`（既定）では平文 HTTP 接続へ要求を解釈せず応答なしで切断し、`allow` では平文・TLS の双方を受理する。TLS 構成時は非ループバックアドレスへの bind が許可される（WIRE-9）。
- 同時接続数の上限は 64（`MAX_CONNECTIONS`）。超過接続はメインの接続枠を消費しない拒否専用ワーカースレッドへ委譲され、通常は `503`／`53300` を返してから切断する。拒否ワーカー自体にも別枠の上限（`MAX_REJECT_WORKERS`＝16）があり、枯渇時はスレッドを生成せず応答を書かずに即座に切断する（fail-closed 優先の縮退。運用上は稀）。
- 本文の数値・上限・応答コードは実装既定値であり、将来の変更で上書きされうる（規範文書ではない）。原文はコードとテストのみを情報源とし、`docs/spec`（private submodule）の本文は転記しない。spec ポインタ: TASK-184（基盤）・HTTP-1〜13・NOSQL-1〜11・ERR-4・SQL-1〜15・RLS-7・RLS-9・TABLE-12（spec 非公開のため詳細は未記載）。
- `update`／`delete` は `where`（単一行・`id` 完全一致形）・`filter`（述語形）のいずれも束縛・実行結線済み。`create_table`／`alter_table`／`drop_table`（DDL 3 op）は `--ddl-allowed-users` に列挙したユーザーのみ実行できる。
- 検証コード（原文記載）: `crates/wire-server/tests/http2_framing.rs`・`http3_content_type.rs`・`http11_limits.rs`・`http12_fail_closed.rs`・`http_limits.rs`。

## Related

- [session.md](./session.md)
- [query-common.md](./query-common.md)
- [error-response.md](./error-response.md)
- [http-module.md](./http-module.md)
