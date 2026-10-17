---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/tls/mod.rs
---

# tls

TLS 1.3 サーバー側の自作実装（親 Issue #941・TASK-228・WIRE-9・HTTP-10）の入口。PostgreSQL wire（`SSLRequest`）・NoSQL 表層（HTTPS）いずれも外部 TLS クレートへ依存せず自作する方針で、構成要素をサブモジュールとして積み上げている。本ページは `tls/mod.rs` と 23 子モジュールをモジュール粒度で 1 ページに統合する（項目単位の列挙はしない）。

## Signature / Usage

~~~rust,ignore
pub mod aes;
pub mod aes_gcm;
pub mod alert;
pub mod certificate_verify;
pub mod channel_binding;
pub mod client_hello;
pub(crate) mod der;
pub mod ed25519;
pub(crate) mod field25519;
pub mod finished;
pub mod handshake;
pub mod hkdf;
pub mod key_schedule;
pub mod pem;
pub mod pkcs8;
pub mod record;
pub mod record_protection;
pub mod server_handshake;
pub mod sha512;
pub mod stream;
pub mod transcript;
pub mod x25519;
pub mod x509;
~~~

## Options / Props

| Module | 役割（`tls/mod.rs` の記述） |
|--------|----------------------------|
| `aes` | AES-128 ブロック暗号（暗号化方向のみ・定数時間。Issue #957） |
| `aes_gcm` | AES-128-GCM（NIST SP 800-38D。定数時間 GHASH・AEAD 暗号化／復号・タグ検証。Issue #958） |
| `field25519` (`pub(crate)`) | GF(2^255-19) 上の定数時間フィールド算術。X25519 と Ed25519 で共有 |
| `x25519` | X25519 鍵交換（RFC 7748・定数時間。Issue #955）。TLS 1.3 の鍵交換グループ |
| `record` | レコード層（RFC 8446 §5.1。#952）。ヘッダ検証・parse / serialize・受信バッファの組み立て。鍵・暗号・状態を持たない |
| `handshake` | ハンドシェイクメッセージ層（RFC 8446 §4。#953）。最小集合 6 種の parse / serialize とレコード境界をまたぐ再組み立て |
| `client_hello` | `ClientHello` 拡張の意味解釈・受理判定・HelloRetryRequest 構築（#954）。TLS 1.3・`TLS_AES_128_GCM_SHA256`・X25519・Ed25519 のみを受理する fail-closed な純粋関数層 |
| `hkdf` | HMAC-SHA-256・HKDF-Extract / Expand・`HKDF-Expand-Label` / `Derive-Secret`（Issue #956）。ハッシュ本体は `engine::crypto::sha256` を再利用 |
| `key_schedule` | 鍵スケジュール本体（RFC 8446 §7.1。#956）。Early → Handshake → Master を型状態で提供 |
| `record_protection` | レコード保護層（RFC 8446 §5.2〜§5.5。#959）。per-record nonce・シーケンス番号・`TLSInnerPlaintext`・AAD・`Sealer` / `Opener` |
| `pem` | PEM（RFC 7468）デコードと鍵・証明書ファイルの上限付き読み込み（#962）。秘密鍵ブロックはちょうど 1 個、証明書チェーンは複数ブロック |
| `pkcs8` | PKCS#8 v1・Ed25519（RFC 8410 §7）の最小 DER パース（#962）。RSA・ECDSA・v2 等は起動時に明示拒否 |
| `der` (`pub(crate)`) | X.509 向けの任意深さ DER TLV リーダー（#963） |
| `x509` | X.509 の最小パース・validity 検査・葉 SPKI（Ed25519）と秘密鍵側公開鍵の照合・`Certificate` メッセージ組み立て（#963）。証明書署名の検証・extensions の意味解釈は対象外 |
| `sha512` | SHA-512（FIPS 180-4）。Ed25519 の秘密鍵展開・署名計算が使用（#960）。トランスクリプトハッシュ・HKDF は SHA-256 のまま |
| `ed25519` | Ed25519 署名生成・検証（RFC 8032 §5.1。#961） |
| `certificate_verify` | `CertificateVerify` の署名対象構成（RFC 8446 §4.4.3）と生成・検証（#961） |
| `transcript` | transcript hash（RFC 8446 §4.4.1。#964）。累積 SHA-256・HelloRetryRequest 時の `message_hash` 置換 |
| `finished` | Finished（RFC 8446 §4.4.4。#964）。`verify_data` 計算・定数時間検証 |
| `alert` | alert メッセージ（RFC 8446 §6）の parse / serialize と受信 alert の分類（#965） |
| `server_handshake` | サーバー側ハンドシェイク状態機械（ClientHello 受信から client Finished 検証まで。#965）。alert の実送出・ハンドシェイク中の読み取りタイムアウトを提供 |
| `stream` | `SSLRequest` への `'S'` 応答後の pg wire バイトストリーム `TlsStream`（#966）。`WireStream` を実装 |
| `channel_binding` | RFC 5929 §4 の `tls-server-end-point` 値の算出（#970）。SCRAM-SHA-256-PLUS が使用 |

## Notes

- 対象は TLS 1.3 / `TLS_AES_128_GCM_SHA256` / X25519 / Ed25519 のみ（`client_hello` が他を受理しない）。サーバー証明書・鍵は Ed25519 PKCS#8 秘密鍵（[tls-opt.md](./tls-opt.md) の `load_server_config`）。
- TLS 未構成時（`tls` が `None`）の `handshake.rs` の `SSLRequest` 応答（`'N'` を返す既存挙動）はビット単位で不変。TLS 構成時（`Some`）は `'S'` を返し、`server_handshake` を経て `TlsStream` へ昇格する（[handshake.md](./handshake.md) の `handle_connection_with_options` 参照）。TLS の実接続組み込みは #966（pg wire）・#968（NoSQL 表層の HTTPS 終端。`http::tls_transport`）で実装済み。CLI からの証明書・鍵読み込み（#967）も実装済み。
- 3 クライアント接続テスト（#969）は本モジュールの対象外。
- 設計 ADR（`tls-wire-connection` / `tls-server-handshake` ほか `tls-*`）は本ページの出典として未参照（crate ソースのモジュール doc に限る）。内部モジュールの項目単位 API は本ページに列挙しない（モジュール粒度）。

## Related

- [tls-opt.md](./tls-opt.md)
- [wire-stream.md](./wire-stream.md)
- [auth.md](./auth.md)
- [handshake.md](./handshake.md)
- [bind-guard.md](./bind-guard.md)
