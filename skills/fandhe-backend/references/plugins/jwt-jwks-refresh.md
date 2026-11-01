# jwt-jwks-refresh

`fandhe-backend-plugin-jwt` の opt-in feature `jwks-refresh`（v0.6.0 で追加）。ゲートの外で `SharedKeySet` を最新に保つ非同期タスクを提供し、JWT の署名鍵（JWKS）を発行元がローテーションしてもサーバ再起動なしで追従できる。

- crate 名: `fandhe-backend-plugin-jwt`（feature `jwks-refresh` = `["dep:tokio"]`。有効時に加わるのは workspace 既存の `tokio`（`time`・`sync`）への optional 依存のみ）
- 親ページ: [jwt](./jwt.md)（`SharedKeySet` / `KeySet::from_json` / `UnknownKeyNotifier` / `JwtAuthenticatorBuilder`）
- 本クレートは `tokio::spawn` も `tokio::select!` も使わない（`rt`・`macros` 不要）
- 設計は `docs/design/jwt-verify-plugin.md` 8 章
- ガイド: https://fandhe-ai.github.io/fandhe-backend/guides/jwks-refresh/

## Signature / Usage

```toml
[dependencies]
fandhe-backend-plugin-jwt = { version = "0.6.1", features = ["jwks-refresh"] }
```

ガイドの配線例（説明用でコンパイル検証の対象外。`HttpJwksFetcher` は利用側が実装する取得関数）:

```rust
use std::time::Duration;

use fandhe_backend_plugin_jwt::{
    JwksRefresher, JwtAuthenticator, JwtGate, NoExtraClaims, RefreshConfig, SharedKeySet,
};

// 起動直後は空の鍵集合から始め、最初の取得で埋める
let keys = SharedKeySet::new(/* 初期の KeySet */);

// 周期は必須。min_interval の既定は 10 秒、fetch_timeout の既定は 5 秒、max_stale は opt-in
let cfg = RefreshConfig::builder(Duration::from_secs(300))
    .max_stale(Duration::from_secs(3600))
    .build()?;

let fetcher = HttpJwksFetcher::new("https://issuer.example/.well-known/jwks.json")?;
let (task, handle) = JwksRefresher::new(keys.clone(), fetcher, cfg);
tokio::spawn(task); // time ドライバ付きのランタイムで spawn する

let auth = JwtAuthenticator::<NoExtraClaims>::builder(keys, policy)
    .jwks_refresh_trigger(handle.trigger()) // 未知 kid を契機に取り直しを合図する
    .build();
let gate = JwtGate::new(auth); // Server::gate(gate) で登録する
```

主要 API:

```rust
// 取得関数（アプリが実装）
pub trait JwksFetcher: Send + Sync + 'static {
    fn fetch(&self) -> FetchFuture<'_>;
}
pub type FetchFuture<'a> =
    Pin<Box<dyn Future<Output = Result<JwksResponse, FetchError>> + Send + 'a>>;

impl JwksResponse {
    pub fn new(body: String, max_age: Option<Duration>) -> Self;
    pub fn body(&self) -> &str;
    pub fn into_body(self) -> String;
    pub fn max_age(&self) -> Option<Duration>;
}

// 設定
impl RefreshConfig {
    pub fn builder(period: Duration) -> RefreshConfigBuilder;
    pub fn new(period: Duration) -> Result<Self, RefreshConfigError>; // builder(period).build()
    pub fn period(&self) -> Duration;
    pub fn min_interval(&self) -> Duration;
    pub fn fetch_timeout(&self) -> Duration;
    pub fn max_stale(&self) -> Option<Duration>;
}
impl RefreshConfigBuilder {
    pub fn min_interval(self, v: Duration) -> Self;
    pub fn fetch_timeout(self, v: Duration) -> Self;
    pub fn max_stale(self, v: Duration) -> Self;
    pub fn build(self) -> Result<RefreshConfig, RefreshConfigError>;
}

// タスクの組み立て（インスタンスを持たない名前空間）
impl JwksRefresher {
    pub fn new(
        keys: SharedKeySet,
        fetcher: impl JwksFetcher,
        config: RefreshConfig,
    ) -> (RefreshTask, RefreshHandle);
    pub fn with_observer(
        keys: SharedKeySet,
        fetcher: impl JwksFetcher,
        config: RefreshConfig,
        observer: impl RefreshObserver + 'static,
    ) -> (RefreshTask, RefreshHandle);
}
pub struct RefreshTask(/* Future<Output = ()> + Send + 'static */);
impl RefreshHandle {
    pub fn shutdown(&self);              // 冪等
    pub fn trigger(&self) -> RefreshTrigger;
    pub fn status(&self) -> RefreshStatus;
}

// 観測
pub trait RefreshObserver: Send + Sync {
    fn on_event(&self, event: &RefreshEvent);
}
// Fn(&RefreshEvent) + Send + Sync のクロージャも RefreshObserver
impl RefreshStatus {
    pub fn last_success(&self) -> Option<std::time::Instant>;
    pub fn consecutive_failures(&self) -> u32;
    pub fn is_cleared(&self) -> bool;
    pub fn is_stopped(&self) -> bool;
}

// 認証器への登録（feature jwks-refresh）
impl<E> JwtAuthenticatorBuilder<E> {
    pub fn jwks_refresh_trigger(mut self, t: crate::refresh::RefreshTrigger) -> Self;
}
```

## Options / Props

`RefreshConfig`（周期は必須。`Default` なし。検査はすべて `build()` で行う）:

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `period` | `Duration` | 必須 | 定期取り直しの周期。0 は `ZeroPeriod`、`MAX_REFRESH_PERIOD`（24 時間）超は `PeriodTooLarge` |
| `min_interval` | `Duration` | `DEFAULT_REFRESH_MIN_INTERVAL`（10 秒） | 取り直しの最小間隔。上限 `MAX_REFRESH_MIN_INTERVAL`（1 時間） |
| `fetch_timeout` | `Duration` | `DEFAULT_FETCH_TIMEOUT`（5 秒） | 取得 1 回の時間切れ。上限 `MAX_FETCH_TIMEOUT`（60 秒） |
| `max_stale` | `Option<Duration>` | `None`（opt-in） | 鮮度期限。超過すると鍵集合を空にする（フェイルクローズ）。上限 `MAX_STALE_LIMIT`（30 日） |

`RefreshConfigError`（`#[non_exhaustive]`、固定文言）: `ZeroPeriod` / `PeriodTooLarge` / `ZeroMinInterval` / `MinIntervalTooLarge` / `ZeroFetchTimeout` / `FetchTimeoutTooLarge` / `ZeroMaxStale` / `MaxStaleTooLarge` / `MinIntervalExceedsPeriod`（`min_interval > period`）/ `FetchTimeoutExceedsMinInterval`（`fetch_timeout > min_interval`）/ `MaxStaleTooShort`（`max_stale < period + fetch_timeout`）。範囲の検査（period、min_interval、fetch_timeout、max_stale の順）の後に関係の検査を行う。

`FetchError`（`#[non_exhaustive]`、`Copy`。文字列も攻撃者入力も持たない）:

| Variant | 返す状況 |
| --- | --- |
| `Transport` | 接続・送信の失敗、時間切れ |
| `Status` | 2xx 以外の応答 |
| `TooLarge` | 本文が上限を超えた |
| `Other` | UTF-8 不正などその他 |

`JwksResponse::new(body, max_age)`: `Cache-Control: max-age=N` なら `Some(N 秒)`、`no-store`・`no-cache`・`max-age` なしなら `None`。本文の UTF-8 検査と `Cache-Control` の解析は取得関数の責務。`Debug` は本文長と `max_age` のみを出し本文を出さない。

`JwksFetcher::fetch` の実装者への契約（取得関数が攻撃表面になるため特に 1〜4 は省略不可）:

1. 取得先 URL は構築時に固定し、`kid`・リクエスト由来の値から組み立てない（SSRF。`fetch` が引数を持たないのもこのため）
2. HTTPS を使い、証明書の検証を無効にしない
3. リダイレクトは追わないか、同じオリジンに限る
4. 本文を読む量に上限を設ける（目安 64 KiB）。`KeySet::from_json` 側の上限は解析時の防御で、受信中のメモリは守らない
5. 取得関数自身にも時間切れを設ける（crate 側 `fetch_timeout` との多層防御）
6. 認証情報・本文をログに出さない
7. 返す future は任意の `await` 点で drop されうる（時間切れ・停止）。副作用を `await` をまたいで持ち越さない

実装は panic しないこと（`panic = "abort"` の構成では panic の保護が効かない）。

`RefreshEvent`（`#[non_exhaustive]`、件数と種別だけを運ぶ）:

| Variant | Description |
| --- | --- |
| `Updated { keys: usize, skipped: usize }` | 鍵集合を更新した（採用した鍵数・読み飛ばした鍵数） |
| `Failed(RefreshFailure)` | 取り直しに失敗した（現行の鍵集合は保持） |
| `Cleared` | `max_stale` の超過で鍵集合を空にした |

`RefreshFailure`（`#[non_exhaustive]`、本文・`kid`・URL を持たない）: `Fetch(FetchError)` / `Timeout`（`fetch_timeout` 内に完了せず）/ `Parse(JwksError)`（`KeySet::from_json` の検査に落ちた）/ `Panicked`（取得関数が panic）。

## Notes

- v0.6.0 で追加。feature `jwks-refresh` が必要で既定は無効（有効にしないとコードも依存も増えない）
- **HTTP クライアントも TLS も持たない。** JWKS を実際に取得する `JwksFetcher` はアプリが書いて渡す（どの HTTP クライアントを使うかは利用側の選択、クライアントの版選定と脆弱性監査も利用側の責務）。ガイドに `reqwest` を使った実装例がある（コンパイル検証の対象外）。`RequestGate::check` は同期・I/O なしの契約のため、取得は必ずゲートの外のタスクで行う
- タスクの動作: 一定周期で JWKS を取得し `SharedKeySet::set` で差し替える。知らない `kid` のトークンが来たときは最小間隔の下限を守って取り直す。取得に失敗したら現行の鍵を保持する。`max_stale`（opt-in）を超えて更新できない場合は鍵集合を空にし全トークンを拒否する。次の周期は `period.min(max_age).max(min_interval)`（`max_age` なしは `period`）。失敗時の再試行は `min_interval` 後。起動直後は「タスク開始」を最後の成功とみなして鮮度期限を数える
- 待機の優先順位は 停止 > 鮮度超過 > 取得時刻 > 取得の合図。取得中に鮮度超過が来た場合は取得を捨てずに鍵集合を空にして待ち続ける
- **タスクは spawn しないと動かない。** `RefreshTask` は `Future<Output = ()>`。spawn しない・途中で drop すると、定期取得に加え `max_stale` によるフェイルクローズも働かない（鍵集合は現行のまま残る）。time ドライバ付き（`enable_time`）のランタイムで spawn する。`JwksRefresher::new` / `with_observer` 自体はタイマーも基準時刻も作らずランタイム外でも呼べる
- `RefreshHandle` は `Clone` できず、drop すると `shutdown()` と同じく停止する。サーバの寿命の間は保持する。`shutdown` は取得中でも取得の future を即座に drop して終わる
- `RefreshTrigger`（`handle.trigger()` で得る、`Clone` 可）は `tokio::sync::Notify` の許可 1 つに畳まれ、ブロックも I/O もしない。最小間隔より短い間に届いた合図は「直前の取得開始 + 最小間隔」の 1 回の取得にまとまる。保持してもタスクは生きない・止まらない。停止後の合図は何もしない。`kid` は読まない（取得先は構築時に固定）
- 合図の登録は `unknown_key_notifier` ではなく `jwks_refresh_trigger` を使う。`RefreshTrigger` は `UnknownKeyNotifier` も実装するが、`unknown_key_notifier` で登録すると `NotifyThrottle`（既定 10 秒・秒精度）の後ろに並び取り直しの遅延が延びる。`jwks_refresh_trigger`（枠は 1 つ、再度呼ぶと後勝ち）は間引きを通らず未知 `kid` のたびに合図し、判定確定後に同期・非ブロックで送られる
- 未知 `kid` のトークンはその場で 401 のままで、取り直しの完了は待たない
- 発行元が `{"keys":[]}` を返した場合は成功として反映され、全トークンが拒否される。反映されるのは `KeySet::from_json` の検査を通った集合だけで、落ちた応答は失敗（`Parse`）として扱われ現行の鍵が残る
- 観測口 `RefreshObserver` は同期・非ブロック・I/O なし・panic なしの契約（`UnknownKeyNotifier` と同じ）。panic してもタスクは止まらない（`panic = "abort"` では保護が効かない）。`RefreshStatus` は `#[non_exhaustive]`、`handle.status()` で取得。`consecutive_failures` は成功で 0 に戻り、`is_cleared` は次の成功で `false` に戻る
- 取得関数自身が panic した場合は `RefreshFailure::Panicked` として扱われる（契約としては panic しないこと）
- Adapted: 原本の依存例は `version = "..."` だが、本スキルの対象版 0.6.1 を明記した
- 出典: https://fandhe-ai.github.io/fandhe-backend/guides/jwks-refresh/ ・ https://docs.rs/crate/fandhe-backend-plugin-jwt/0.6.1/source/src/refresh.rs ・ https://docs.rs/crate/fandhe-backend-plugin-jwt/0.6.1/source/src/refresh/task.rs

## Related

- [jwt](./jwt.md)
- [jwt-dpop](./jwt-dpop.md)
- [jwks-refresh guide](../guides/jwks-refresh.md)
