---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/tls_opt.rs
---

# tls_opt

`wire-server` バイナリ（`main.rs`）が起動時に受け取る TLS opt-in CLI 引数（`--tls-cert` / `--tls-key` / `--tls-mode` / `--tls-scram-channel-binding`）の閉じた語彙パーサと、サーバー証明書・鍵の読み込み手順（Issue #967・#970・親 #941・TASK-228。WIRE-7 / WIRE-9 / WIRE-18 / HTTP-9 / HTTP-10）。`TlsServerConfig` へ untrusted な CLI 文字列・ファイルパスから到達する唯一の入口。

## Signature / Usage

~~~rust,ignore
pub const CERT_FLAG: &str = "--tls-cert";
pub const KEY_FLAG: &str = "--tls-key";
pub const MODE_FLAG: &str = "--tls-mode";
pub const MODE_TOKENS: [&str; 2] = ["require", "allow"];
pub const SCRAM_CHANNEL_BINDING_FLAG: &str = "--tls-scram-channel-binding";
pub const SCRAM_CHANNEL_BINDING_TOKENS: [&str; 2] = ["enable", "disable"];

#[non_exhaustive]
pub enum TlsMode { Require, Allow }
impl TlsMode { pub fn token(self) -> &'static str }

pub fn parse(raw: &str) -> Result<TlsMode, String>
pub fn parse_scram_channel_binding(raw: &str) -> Result<bool, String>

pub fn check_scram_channel_binding(
    config: &TlsServerConfig,
    enabled: bool,
) -> Result<(), ScramChannelBindingRejection>

pub fn load_server_config(cert: &Path, key: &Path) -> Result<TlsServerConfig, TlsConfigLoadError>
pub fn load_server_config_with_options(
    cert: &Path,
    key: &Path,
    scram_channel_binding: bool,
) -> Result<TlsServerConfig, TlsConfigLoadError>
pub fn load_server_config_arc(cert: &Path, key: &Path) -> Result<Arc<TlsServerConfig>, TlsConfigLoadError>
pub fn load_server_config_arc_with_options(
    cert: &Path,
    key: &Path,
    scram_channel_binding: bool,
) -> Result<Arc<TlsServerConfig>, TlsConfigLoadError>
~~~

## Options / Props

| Flag | Token | Description |
|------|-------|-------------|
| `--tls-cert` | PEM ファイルパス | 証明書チェーン PEM |
| `--tls-key` | PEM ファイルパス | Ed25519 PKCS#8 秘密鍵 PEM |
| `--tls-mode` | `require` | `SSLRequest` を経ない平文 StartupMessage を `08P01` で拒否（startup パラメータを解釈する前に拒否。WIRE-9） |
| `--tls-mode` | `allow` | 平文 StartupMessage も受理（非ループバック bind と組み合わせると `bind_guard` が起動時に拒否） |
| `--tls-scram-channel-binding` | `enable` | SCRAM-SHA-256-PLUS（`p=tls-server-end-point`）を機構リストへ提示 |
| `--tls-scram-channel-binding` | `disable`（既定） | 提示しない |

`ScramChannelBindingRejection`（`#[non_exhaustive]`）の variant。

| Variant | 意味 |
|---------|------|
| `NoRfc5929Hash` | 葉証明書の署名アルゴリズムに RFC 5929 が単一ハッシュを定義していない（Ed25519 等）。CA を RSA / ECDSA 系へ替える以外に解決策なし |
| `UnsupportedHashAlgorithm` | RFC 5929 はハッシュ（SHA-384）を定義しているが本実装が未実装。署名ハッシュを SHA-256 / SHA-512 系へ揃えれば解決 |
| `UnknownSignatureAlgorithm` | 署名アルゴリズムを判定できなかった（DER 不正または未知の OID）。fail-closed |

`TlsConfigLoadError` の variant: `Key(PrivateKeyLoadError)` / `Clock` / `Certificate(ServerCertificateLoadError)` / `Mismatch(TlsServerConfigError)`。

## Notes

- `--tls-mode` は TLS ハンドシェイク成立後の平文接続ポリシーではなく、`SSLRequest` を経ない平文 StartupMessage を受理するか（`allow`）拒否するか（`require`）を選ぶ（`handshake::handle_connection_with_tls_mode` が参照）。
- `parse` / `parse_scram_channel_binding` は厳密一致のみ受理（trim・大文字小文字の読み替えなし）。
- `--tls-scram-channel-binding` は `--tls-cert` / `--tls-key` 指定時のみ意味を持ち、単独指定は組合せ不正として fail-closed 拒否（`main::resolve_tls_options`）。
- `enable` かつ葉証明書の署名アルゴリズムに RFC 5929 のハッシュが無い（Ed25519 等）場合、libpq の `channel_binding=prefer` / `require` が接続失敗しうるため、`main.rs` が `check_scram_channel_binding` で起動時に拒否する（Issue #1088）。判定は `--auth-method` に依存しない（`cleartext` との組合せでも拒否）。`enabled == false` は常に `Ok(())`。RSA / ECDSA の CA が署名した葉証明書（鍵が Ed25519 でも署名 OID が RSA / ECDSA 系）では `enable` を許可する。
- `load_server_config` の手順: (1) 鍵から Ed25519 seed を読み署名鍵を導出、(2) 現在時刻取得、(3) 証明書を検証付きで読む（公開鍵一致・有効期限）、(4) `TlsServerConfig::new`。`PLUS` 提示は既定 `false`（2 引数版は後方互換ラッパーで、`_with_options` へ委譲）。
- 証明書・鍵ファイルのバイト列・長さはログ・エラーメッセージへ出さない。

## Related

- [tls.md](./tls.md)
- [auth-method-opt.md](./auth-method-opt.md)
- [bind-guard.md](./bind-guard.md)
- [main-cli.md](./main-cli.md)
- [auth.md](./auth.md)
