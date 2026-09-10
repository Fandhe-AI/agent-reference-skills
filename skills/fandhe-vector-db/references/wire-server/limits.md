---
source: https://docs.rs/crate/fandhe-vector-db-wire-server/0.1.0/source/src/limits.rs
---

# limits

接続資源保護（読み取りタイムアウト・同時接続数リミッター）を担う共有モジュール。`server::accept_loop_with_limiter` から呼ばれ、未認証クライアントの大量接続・Slowloris によるスレッド／メモリ枯渇を防ぐ。契約値（読み取りタイムアウト・同時接続数上限・上限超過時の SQLSTATE）をこのモジュールに集約し、`handshake.rs` や `server.rs` に暫定値が分散しないようにする（TASK-69・WIRE-5, WIRE-6）。

## Signature / Usage

~~~rust,ignore
/// 接続全体（認証前後を問わず）に適用する読み取り・書き込みタイムアウト（WIRE-5）。
pub const READ_TIMEOUT: Duration = Duration::from_secs(30);

/// 同時接続数の上限（WIRE-6）。
pub const MAX_CONNECTIONS: usize = 64;

/// 上限超過時に拒否応答（ErrorResponse）を書き込む際の書き込みタイムアウト。
pub const REJECT_WRITE_TIMEOUT: Duration = Duration::from_secs(1);

/// commit 成功境界を跨いだ panic 発生時に緊急応答を書き込むためのソケット書き込みタイムアウト
/// （TASK-97、対象ビヘイビア RECOVER-6）。
pub const EMERGENCY_RESPONSE_WRITE_TIMEOUT: Duration = Duration::from_secs(5);

/// 拒否応答（`reject_too_many_connections`）を書き込むために同時に生成できる
/// ワーカースレッド数の上限（review 是正・WIRE-6）。
pub const MAX_REJECT_WORKERS: usize = 16;

/// 簡易クエリ応答を 1 回の write へ束ねる際の未送出バッファ上限（フラッシュ閾値。Issue #481）。
pub const MAX_RESPONSE_BUFFER_BYTES: usize = 1024 * 1024;

/// SQLSTATE `53300`（too_many_connections）。
pub const SQLSTATE_TOO_MANY_CONNECTIONS: &str =
    engine::error_format::ErrorClass::ConnectionLimitExceeded.wire_code();

pub struct RejectWorkerPermit { active: Arc<AtomicUsize> }
pub struct RejectWorkerLimiter { active: Arc<AtomicUsize>, max: usize }

impl RejectWorkerLimiter {
    pub fn new(max: usize) -> Self
    pub fn try_acquire(&self) -> Option<RejectWorkerPermit>
}

pub struct ConnectionPermit { active: Arc<AtomicUsize> }
pub struct ConnectionLimiter { active: Arc<AtomicUsize>, max: usize }

impl ConnectionLimiter {
    pub fn new(max: usize) -> Self
    pub fn try_acquire(&self) -> Option<ConnectionPermit>
    pub fn active(&self) -> usize
    pub fn max(&self) -> usize
}

pub fn apply_read_timeout(stream: &TcpStream, timeout: Duration) -> io::Result<()>

/// 同時接続数の上限超過を通知する ErrorResponse（'E', severity=FATAL, code=`53300`）を
/// 書き込み、接続を閉じる。呼び出し元はこの関数を呼ぶ時点でまだ `std::thread::spawn` へ
/// 到達していない（スレッドを生成せずに拒否する）。
pub fn reject_too_many_connections(mut stream: TcpStream, max: usize)
~~~

## Notes

- **`reject_too_many_connections` 自身はスレッドを生成しない**（doc comment 原文どおり: 呼び出し元 `server::accept_loop_with_limiter` はこの関数を呼ぶ時点でまだ `std::thread::spawn` へ到達していない）。ただし実際の呼び出し経路（`server.rs::accept_loop_inner`）では、通常接続用スレッドは生成しない一方、拒否応答の書き込み自体は `RejectWorkerLimiter`（`MAX_REJECT_WORKERS` で上限管理）が発行する専用ワーカースレッドの中から `reject_too_many_connections` を呼び出す。つまり「（通常接続の）スレッドを生成せずに拒否する」ことと「拒否応答の送出を別枠有界の専用ワーカースレッドへ委譲する」ことは両立する別レイヤーの話であり、矛盾しない。
- `ConnectionPermit` / `RejectWorkerPermit` はいずれも `Drop` で確実に枠を解放する RAII パターン。
- `ConnectionLimiter::try_acquire` は CAS ループで競合下でも `max` を超えて確保しない。加算は `checked_add` で行いカウンタのオーバーフローを未定義動作にしない。
- `RejectWorkerLimiter` は `ConnectionLimiter`（認証済み接続の枠）とは別枠。拒否応答の書き込みを使い捨てスレッドへ委譲する際、無制限に `std::thread::spawn` すると攻撃者が上限到達後の連続接続で OS 資源を無制限消費できる（DoS）ため、別枠の小さい上限で有界化する。上限に達した場合は応答を書かずに即座に接続をクローズする（fail-closed）。
- `MAX_RESPONSE_BUFFER_BYTES` は「拒否」の上限ではなく「フラッシュ閾値」。詳細は [response-buffer.md](./response-buffer.md)。

## Related

- [server.md](./server.md)
- [response-buffer.md](./response-buffer.md)
- [error-response.md](./error-response.md)
