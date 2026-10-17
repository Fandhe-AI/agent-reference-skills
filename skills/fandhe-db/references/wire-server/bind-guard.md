---
source: https://docs.rs/crate/fandhe-db-wire-server/0.2.0/source/src/bind_guard.rs
---

# bind_guard

bind アドレスの通信路保護要件を起動時に検証する（TASK-70・WIRE-7）。wire-server は cleartext password 認証を前提とし、非ループバックアドレスへ bind するには TLS が必須（TASK-72・WIRE-9。CLI opt-in は `tls_opt`・Issue #967）。TLS 未構成のまま非ループバックへ bind すると平文パスワード・クエリ・結果が loopback 外へ晒される。本モジュールは `main.rs::run_server` の唯一の bind 経路（`GuardedBindAddrs`）として、通信路の保護状態（`TransportSecurity`）に応じた要件を検証し、満たさなければ fail-closed で拒否する。`server.rs`（accept ループ）とは責務を分離し、bind 前の検証のみを集約する。

## Signature / Usage

~~~rust,ignore
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum TransportSecurity {
    /// TLS 未構成（cleartext password 認証を平文 TCP で行う）。loopback 限定。
    Cleartext,
    /// TLS 構成済み・`--tls-mode require`（Issue #967）。`SSLRequest` を経ない
    /// 平文 StartupMessage を `08P01` で拒否するため、非ループバックでも
    /// 平文パスワードが外部へ晒されない（WIRE-9 を満たす）。
    TlsRequired,
    /// TLS 構成済み・`--tls-mode allow`（Issue #967）。TLS 済みクライアントに
    /// 加え平文クライアントも受理するため、`Cleartext` と同じくループバック限定とする。
    TlsOptional,
}

#[derive(Debug)]
pub enum BindGuardError {
    /// `bind_addr` 文字列の名前解決（`ToSocketAddrs`）自体が失敗した。
    Resolve { bind_addr: String, source: std::io::Error },
    /// 名前解決は成功したが、解決結果が空だった。
    NoAddress { bind_addr: String },
    /// 解決結果に、`security` の要件を満たさないアドレスが 1 件以上含まれていた。
    NonLoopback { bind_addr: String, addr: SocketAddr },
}

#[derive(Debug)]
pub struct GuardedBindAddrs {
    addrs: Vec<SocketAddr>,
}

impl GuardedBindAddrs {
    pub fn resolve(bind_addr: &str, security: TransportSecurity)
        -> Result<Self, BindGuardError>

    pub fn bind(&self) -> std::io::Result<TcpListener>

    pub fn addrs(&self) -> &[SocketAddr]
}
~~~

## Notes

- `TransportSecurity` は `#[non_exhaustive]`。0.2.0 のバリアントは `Cleartext` / `TlsRequired` / `TlsOptional`（0.1.0 は `Cleartext` のみ）。`Cleartext` と `TlsOptional` は全解決アドレスが `IpAddr::is_loopback()` であることを要求し（IPv4-mapped IPv6 loopback `::ffff:127.0.0.1` は拒否される。fail-closed として意図的に維持）、`TlsRequired` は非ループバックへの bind を許可する。
- `GuardedBindAddrs::resolve` が唯一の bind 経路であり、要件を満たさないアドレス（非 loopback）を含む場合は `BindGuardError::NonLoopback` を返し fail-closed で拒否する。`BindGuardError::NonLoopback` に `security` 別のメッセージ分岐は持たせない（フィールド追加は下流の構造分解パターンを壊す破壊的変更になるため）。`--tls-mode allow` 選択時の案内（`--tls-mode require` への切り替え）は `main.rs` が `TlsOptional` 拒否時にのみ追加で出す hint 行が担う。
- Migration (0.1.0 → 0.2.0): `TransportSecurity` に `TlsRequired` / `TlsOptional` が追加された（`#[non_exhaustive]` のためクレート外の `match` にはワイルドカードアームが必須）。`BindGuardError::NonLoopback` の `Display` は TLS（`--tls-cert`/`--tls-key --tls-mode require`）または信頼できる TLS ターミネータの利用を案内する文言になった。
- TASK-67 review 是正の `validate_loopback_bind` / `bind_loopback`（[server.md](./server.md) の deprecated 項目）を移設・拡張したもの。

## Related

- [server.md](./server.md)
- [auth.md](./auth.md)
