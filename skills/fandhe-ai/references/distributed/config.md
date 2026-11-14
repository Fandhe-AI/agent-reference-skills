---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/struct.DistributedConfig.html
---

# DistributedConfig / DistributedConfigBuilder

分散学習（DDP の初期形）の設定。`DistributedConfig::builder(world_size, rank, rendezvous_addr)` で builder を作り、`build()` でソケットを開く前に全項目を検証する。`fandhe_ai::distributed` から公開され、クレートルートへは再エクスポートされない。

## Signature / Usage

```rust
use fandhe_ai::distributed::{Communicator, DistributedConfig, DistributedError};

let addr = "127.0.0.1:29500".parse().unwrap();
let config = DistributedConfig::builder(1, 0, addr).build().unwrap();
let comm = Communicator::init(&config).unwrap();
assert_eq!((comm.rank(), comm.world_size()), (0, 1));
assert!(!comm.is_poisoned());

// 範囲外の rank は型付きエラーで拒否される。
let err = DistributedConfig::builder(2, 2, addr).build().unwrap_err();
assert!(matches!(err, DistributedError::RankOutOfRange { rank: 2, world_size: 2 }));
```

`DistributedConfig`（`Debug` / `Clone`）:

```rust
impl DistributedConfig {
    pub fn builder(
        world_size: usize,
        rank: usize,
        rendezvous_addr: SocketAddr,
    ) -> DistributedConfigBuilder;
    pub fn world_size(&self) -> usize;
    pub fn rank(&self) -> usize;
    pub fn rendezvous_addr(&self) -> SocketAddr;      // IPv4-mapped IPv6 は IPv4 へ正規化済み
    pub fn is_non_loopback_allowed(&self) -> bool;
}
```

`DistributedConfigBuilder`（`Debug` / `Clone` / `#[must_use]`）:

```rust
impl DistributedConfigBuilder {
    pub fn allow_non_loopback(self, allow: bool) -> Self;
    pub fn session_id(self, id: u64) -> Self;
    pub fn connect_timeout(self, d: Duration) -> Self;
    pub fn establish_timeout(self, d: Duration) -> Self;
    pub fn io_timeout(self, d: Duration) -> Self;
    pub fn op_timeout(self, d: Duration) -> Self;
    pub fn build(self) -> Result<DistributedConfig, DistributedError>;
}
```

## Options / Props

| メソッド | 意味 |
|----------|------|
| `allow_non_loopback(bool)` | 非 loopback の bind・接続を許可する。既定は `false`（loopback のみ）。認証も暗号化も無いため、なりすまし・盗聴のリスクを受け入れられる信頼できるネットワークでだけ使う。 |
| `session_id(u64)` | セッション識別子。誤接続の検出用で、認証ではない。 |
| `connect_timeout(Duration)` | 接続 1 回の上限。 |
| `establish_timeout(Duration)` | 集合の確立全体の期限。 |
| `io_timeout(Duration)` | 1 回の読み書きの上限（確立時と all-reduce の両方に適用）。 |
| `op_timeout(Duration)` | all-reduce 1 回の全体の絶対期限。 |

## Notes

- `build()` が拒否するもの: world_size・rank の範囲外、タイムアウトの 0 / 巨大値、unspecified・マルチキャスト・ブロードキャスト・リンクローカルのアドレス、ランク 1 以降のポート 0、opt-in 無しの非 loopback。いずれも `DistributedError` で返る
- 集合点アドレスはランク 0 が bind し、他ランクが接続する先。`SocketAddr` だけを受け、ホスト名解決（DNS）は行わない
- タイムアウトの既定値は内部の既定（接続 10 秒・確立 60 秒・io 30 秒・all-reduce 1 回 120 秒）をそのまま使い、facade は独自の既定値を持たない（`src/distributed/config.rs` のモジュール doc）
- 通信は std のみの TCP によるホスト側 ring all-reduce（`fandhe_ai::distributed` のモジュール doc）。GPU 通信ライブラリ経由ではない（モジュール doc の「std のみの TCP」）。認証も暗号化も無い
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/ （0.14.0, 取得日 2026-11-14。シグネチャは `src/distributed/config.rs` を一次ソースとして確認）

## Related

- [communicator.md](./communicator.md)
- [steps.md](./steps.md)
- [error.md](./error.md)
