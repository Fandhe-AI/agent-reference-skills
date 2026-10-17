---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/docs/nosql-api.md
---

# POST /v1/session / /v1/session/close / Authorization: Bearer

NoSQL 表層のセッション認証。`POST /v1/session` でトークンを発行し、`/v1/query` と `/v1/session/close` は `Authorization: Bearer <token>` で認証する。

## Signature / Usage

`POST /v1/session` — 要求本文は `user`・`password` の 2 つの必須文字列フィールドのみ（未知キーは `42601`）。

```json
{"user": "alice", "password": "pw-alice"}
```

成功時（`200`）:

```json
{"token": "<43文字の base64url 文字列>", "expires_in": 3600}
```

`POST /v1/session/close` — `Authorization: Bearer <token>` ヘッダが必須。本文は空、または `{}`（それ以外のキーを持つ本文は `42601`）。成功時（`200`）:

```json
{"closed": true}
```

## Notes

- トークンは 256bit（32 バイト）の CSPRNG 出力をパディングなし base64url（RFC 4648 §5）で符号化した固定 43 文字。
- TTL は発行時刻から 3600 秒固定（スライドしない）。
- 同時有効セッション数の上限は 256（超過は `53300`）。
- 資格情報の照合失敗・未知ユーザーはいずれも区別せず `28P01`（`401`）で拒否し、Argon2id の固定遅延・ダミー KDF による対称性を維持する（存在オラクルを与えない）。
- `close` はワンタイム失効のため、二重 `close`・未知トークン・期限切れトークンはいずれも区別せず `28000`（`401`）になる。
- `Authorization: Bearer` の扱い（`/v1/query` 共通）: ヘッダの欠落・スキーム不一致（例: `Basic`）・トークン不正・未知・期限切れ・close 済みは、すべて同一の `28000`（`401`）・固定文言へ収束する（存在オラクルを与えない設計）。
- テナント文脈はセッションに束縛された内部状態からのみ導出する。要求側が JSON キー・ヘッダ（`tenant`／`tenant-id`／`tenantid` 相当。`x-` 接頭辞・`_`/`-` の揺れを正規化してから判定）でテナントを自己申告しても無視されず、`42601` で拒否される。
- 検証コード（原文記載）: `crates/wire-server/tests/http4_session.rs`・`http5_query_bearer.rs`・`http6_auth_failure.rs`・`http8_session_close.rs`。

## Related

- [overview.md](./overview.md)
- [query-common.md](./query-common.md)
- [error-response.md](./error-response.md)
- [http-module.md](./http-module.md)
- [../wire-server/auth.md](../wire-server/auth.md)
