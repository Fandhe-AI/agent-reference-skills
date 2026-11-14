---
source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/enum.DistributedError.html
---

# DistributedError

分散学習の設定・集合の確立・集合通信・分散ステップが返す型付きエラー。内部 enum をペイロードに持たない自己完結の型で、`#[non_exhaustive]`。`std::error::Error` を実装し、`source()` は `Io` と `Backend` で内側のエラーを返す。

## Signature / Usage

```rust
use fandhe_ai::distributed::{DistributedConfig, DistributedError};

let addr = "127.0.0.1:29500".parse().unwrap();
let err = DistributedConfig::builder(2, 2, addr).build().unwrap_err();
assert!(matches!(err, DistributedError::RankOutOfRange { rank: 2, world_size: 2 }));
```

```rust
#[derive(Debug)]
#[non_exhaustive]
pub enum DistributedError {
    InvalidConfig { reason: &'static str },
    WorldSizeOutOfRange { world_size: usize, max: usize },
    RankOutOfRange { rank: usize, world_size: usize },
    NonLoopbackNotAllowed { addr: SocketAddr },
    DuplicateRank { rank: usize },
    WorldSizeMismatch { expected: usize, got: usize },
    UnexpectedRank { expected: usize, got: usize },
    Protocol { message: String },
    Timeout { phase: &'static str },
    PeerDisconnected,
    Io(std::io::Error),
    Poisoned,
    Backend(BackendError),
    GradientLengthMismatch { expected: usize, got: usize },
    Other { message: String },
}
```

## Options / Props

| variant | 意味 |
|---------|------|
| `InvalidConfig { reason }` | 設定値が不正（固定文の理由）。 |
| `WorldSizeOutOfRange { world_size, max }` | world_size が `1..=max` の範囲外。 |
| `RankOutOfRange { rank, world_size }` | ランク番号が `0..world_size` の範囲外。 |
| `NonLoopbackNotAllowed { addr }` | 非 loopback のアドレスが opt-in 無しで指定された。 |
| `DuplicateRank { rank }` | 同じランク番号が重複した。 |
| `WorldSizeMismatch { expected, got }` | ピアの world_size が自分と違う。 |
| `UnexpectedRank { expected, got }` | リングの相手が想定したランクと違う。 |
| `Protocol { message }` | ワイヤ上のプロトコル違反（固定文と数値だけの説明。ピアのバイト列は含まない）。 |
| `Timeout { phase }` | タイムアウト（固定文の段階名）。 |
| `PeerDisconnected` | ピアが切断した。 |
| `Io(std::io::Error)` | その他の I/O エラー。 |
| `Poisoned` | communicator が poisoned（以後の集合通信は拒否される。復旧は範囲外）。 |
| `Backend(BackendError)` | 勾配の読み出しや optimizer ステップが返したバックエンドエラー。 |
| `GradientLengthMismatch { expected, got }` | 平坦化した勾配の長さがストアの総要素数と一致しない。 |
| `Other { message }` | 将来 autodiff 側に増える variant の受け皿（現行の全 variant はこれ以外へ写る）。 |

## Notes

- `Display` は固定文・数値・内側エラーの `Display` だけで、ピアから受け取ったバイト列は出さない。`Io` は `ErrorKind` のみを表示する
- `From` impl は公開されない（内部型が公開 trait impl として現れるのを避けるため）。`OnnxError` と同じ方針
- `#[non_exhaustive]` のため `match` には `_` 腕が必要
- Source: https://docs.rs/fandhe-ai/0.14.0/fandhe_ai/distributed/enum.DistributedError.html （0.14.0, 取得日 2026-11-14。シグネチャは `src/distributed/error.rs` を一次ソースとして確認）

## Related

- [config.md](./config.md)
- [communicator.md](./communicator.md)
- [steps.md](./steps.md)
