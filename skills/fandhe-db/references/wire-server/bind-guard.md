---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/bind_guard.rs
---

# bind_guard

bind アドレスの通信路保護要件を起動時に検証する（TASK-70・WIRE-7）。wire-server は cleartext password 認証を前提とし、TLS は 0.1.0 時点で未実装のため、非ループバックアドレスへ bind すると平文パスワード・クエリ・結果が loopback 外へ晒される。本モジュールは `main.rs::run_server` の唯一の bind 経路（`GuardedBindAddrs`）として、通信路の保護状態（`TransportSecurity`）に応じた要件を検証し、満たさなければ fail-closed で拒否する。`server.rs`（accept ループ）とは責務を分離し、bind 前の検証のみを集約する。

## Signature / Usage

~~~rust,ignore
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub enum TransportSecurity {
    /// TLS 未構成（cleartext password 認証を平文 TCP で行う）。loopback 限定。
    Cleartext,
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

- `TransportSecurity` は `#[non_exhaustive]`。0.1.0 時点のバリアントは `Cleartext` のみ（loopback 限定）。TLS 実装後にバリアントが追加される想定。
- `GuardedBindAddrs::resolve` が唯一の bind 経路であり、要件を満たさないアドレス（非 loopback）を含む場合は `BindGuardError::NonLoopback` を返し fail-closed で拒否する。
- TASK-67 review 是正の `validate_loopback_bind` / `bind_loopback`（[server.md](./server.md) の deprecated 項目）を移設・拡張したもの。

## Related

- [server.md](./server.md)
- [auth.md](./auth.md)
