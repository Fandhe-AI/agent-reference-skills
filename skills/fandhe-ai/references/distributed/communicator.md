---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/struct.Communicator.html
---

# Rendezvous / Communicator

集合の確立 `Rendezvous` と、確立済みのホスト側 ring 集合通信ハンドル `Communicator`。内部の `Rendezvous` / `RingCommunicator` を facade の不透明な型で包んでおり、内部型は公開シグネチャに出ない。

## Signature / Usage

world_size 1 は無通信（`Communicator::init`）:

```rust
use fandhe_ai::distributed::{Communicator, DistributedConfig};

let addr = "127.0.0.1:29500".parse().unwrap();
let config = DistributedConfig::builder(1, 0, addr).build().unwrap();
let comm = Communicator::init(&config).unwrap();
assert_eq!((comm.rank(), comm.world_size()), (0, 1));
assert!(!comm.is_poisoned());
```

world_size 2 以上では、ランク 0 が先に `Rendezvous::bind` して実アドレスを取り、他ランクへ渡してから `establish` する（外部通信を伴うため実行しない例）:

```rust
use fandhe_ai::distributed::{Communicator, DistributedConfig, Rendezvous};

// ランク 0（ポート 0 で bind し、実アドレスを他ランクへ伝える）。
let addr = "127.0.0.1:0".parse().unwrap();
let config = DistributedConfig::builder(2, 0, addr).session_id(7).build().unwrap();
let rdv = Rendezvous::bind(&config).unwrap();
let _actual = rdv.local_addr().unwrap(); // 他ランクへ渡す
let mut comm: Communicator = rdv.establish().unwrap();
assert_eq!(comm.world_size(), 2);
let _ = &mut comm; // `step_sgd(&tape, &mut store, &grads, &cfg, &mut comm)` に渡す
```

```rust
impl Rendezvous {   // Debug
    pub fn bind(config: &DistributedConfig) -> Result<Rendezvous, DistributedError>;
    pub fn local_addr(&self) -> Option<SocketAddr>;
    pub fn establish(self) -> Result<Communicator, DistributedError>;
}

impl Communicator { // Debug
    pub fn init(config: &DistributedConfig) -> Result<Communicator, DistributedError>;
    pub fn rank(&self) -> usize;
    pub fn world_size(&self) -> usize;
    pub fn is_poisoned(&self) -> bool;
}
```

## Options / Props

| メソッド | 意味 |
|----------|------|
| `Rendezvous::bind` | 設定を検証し、ランク 0（world_size 2 以上）は集合点とリング用の待受を開く。それ以外はここではソケットを開かない。 |
| `Rendezvous::local_addr` | 集合点の実際の待受アドレス。ランク 0 かつ world_size 2 以上のときだけ `Some`。ポート 0 で bind した実アドレスを、ピア待ちの前に取得できる（TOCTOU 回避の 2 段構成）。 |
| `Rendezvous::establish` | 全ランクの集合を確立して `Communicator` を返す。全体を `establish_timeout` で包む。 |
| `Communicator::init` | `bind` と `establish` を続けて行う便宜関数。world_size 1 は無通信。 |
| `Communicator::rank` / `world_size` | 自ランクと全ランク数。 |
| `Communicator::is_poisoned` | all-reduce の失敗で poisoned になっているか。 |

## Notes

- `Communicator::init` は、world_size 2 以上でランク 0 の集合点ポートが 0 の構成を `InvalidConfig` で拒否する（ピアが実ポートを知る手段が無く必ずタイムアウトするため）。ポート 0 を使うなら `Rendezvous` で `bind` → `local_addr` を先に取得する
- all-reduce が失敗すると `Communicator` は poisoned になり、以後の集合通信は拒否される（`DistributedError::Poisoned`。復旧は範囲外）
- 汎用の `all_reduce` 等は公開されない。公開される集合通信の入口は `step_sgd` / `step_adam` / `step_adamw` だけ
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/struct.Rendezvous.html （0.14.0, 取得日 2026-11-14。シグネチャは `src/distributed/communicator.rs` を一次ソースとして確認）

## Related

- [config.md](./config.md)
- [steps.md](./steps.md)
- [error.md](./error.md)
