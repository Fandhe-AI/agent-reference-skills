# websocket

WebSocket プラグイン（TASK-4.1）。コアの `UpgradeHandler` 拡張点から委譲された接続に対し、RFC 6455 ハンドシェイクの検証・101 応答の送出・`tokio-tungstenite` へのフレーミング委譲を行う。

- feature 名: `websocket`
- crate 名: `fandhe-backend-plugin-websocket`（crates/plugin-websocket）
- 配線パターン: UpgradeHandler 型（`try_handle_upgrade`）。`UpgradeHandler` trait を実装するアダプタ（`WebSocketUpgradeAdapter`）はコア側（`crates/core/src/server.rs`）に置かれる

## Signature / Usage

`Server::websocket(config)`（コア側 API）へ `WebSocketConfig` を登録する。マッチ確定時はコアが専用タスクを `tokio::spawn` し、`OwnedSemaphorePermit` をそのタスクへ move する（同時接続数上限の維持）。

```rust,ignore
pub fn matches(head: &RequestHead, config: &WebSocketConfig) -> bool;

// v0.3.0 BREAKING: 第 5 引数 cancel を追加（issue #492）
pub async fn handle_upgrade<S, C>(
    stream: S,
    head: &RequestHead,
    leftover: Vec<u8>,
    config: &WebSocketConfig,
    cancel: C,
) -> Result<(), WsError>
where
    S: AsyncRead + AsyncWrite + Unpin,
    C: Future<Output = ()>;

// v0.4.2 で追加（issue #728）。handle_upgrade の 5 引数 + peer_addr（非破壊追加）
pub async fn handle_upgrade_with_peer_addr<S, C>(
    stream: S,
    head: &RequestHead,
    leftover: Vec<u8>,
    config: &WebSocketConfig,
    cancel: C,
    peer_addr: Option<std::net::SocketAddr>,
) -> Result<(), WsError>
where
    S: AsyncRead + AsyncWrite + Unpin,
    C: Future<Output = ()>;
```

キャンセル不要な呼び出しでは `cancel` に `std::future::pending::<()>()` を渡す。`handle_upgrade` は `peer_addr: None` で `handle_upgrade_with_peer_addr` へ委譲する薄いラッパーとして残る（公開シグネチャ無変更）。コアは accept したソケットの実 peer address を Upgrade 委譲経路へ渡す。

### WsMessageHandler（v0.4.1 / v0.4.2 で拡張）

`with_handler` で登録するユーザーハンドラ trait（`name` と `on_message` が必須、他は provided メソッド）。

```rust,ignore
pub trait WsMessageHandler: Send + Sync + 'static {
    fn name(&self) -> &'static str;
    fn on_message(&self, msg: WsMessage) -> BoxFuture<'_, Result<WsOutcome, WsHandlerError>>;

    // v0.4.1: 101 応答送出成功後に 1 回（既定 no-op）
    fn on_open(&self, ctx: WsOpenContext) {}

    // v0.4.2: 既定実装は on_message へ委譲
    fn on_message_with_ctx<'a>(
        &'a self,
        ctx: &'a WsConnContext,
        msg: WsMessage,
    ) -> BoxFuture<'a, Result<WsOutcome, WsHandlerError>>;

    // v0.4.2: on_open が呼ばれた接続で、終了経路を問わずちょうど 1 回（既定 no-op）
    fn on_close(&self, ctx: &WsConnContext, reason: CloseReason) {}
}

// crate ルートと handler モジュールの双方から公開。futures_util::future::BoxFuture と同一型（v0.4.2）
pub type BoxFuture<'a, T> = Pin<Box<dyn Future<Output = T> + Send + 'a>>;
```

- `WsMessage`: `Text(String)` / `Binary(Vec<u8>)`。`WsOutcome`: `Reply(Vec<WsMessage>)` / `Close`。`WsHandlerError::new(err)` でエラーを型消去する
- 既定ハンドラは `EchoHandler`

### WsSender（v0.4.1 で追加、v0.4.2 で拡張）

サーバー起点 push 用の送信ハンドル。`Clone` 可。`on_open` の `WsOpenContext::sender()` / `on_message_with_ctx` の `WsConnContext::sender()` から取得する。

```rust,ignore
impl WsSender {
    pub async fn send(&self, msg: WsMessage) -> Result<(), WsSendError>;          // 満杯なら空くまで待つ
    pub fn try_send(&self, msg: WsMessage) -> Result<(), WsTrySendError>;         // 待たない（v0.4.2）
    pub async fn close(&self, code: u16, reason: &str) -> Result<(), WsCloseError>; // v0.4.2
    pub async fn closed(&self);                                                    // v0.4.2
    pub fn is_closed(&self) -> bool;                                               // v0.4.2
}
```

| 型 | variant / メソッド | 説明 |
| --- | --- | --- |
| `WsSendError` | —（unit struct） | 送信キューが閉じている（セッション終了・close 確定・封鎖済み） |
| `WsTrySendError` | `Full(WsMessage)` / `Closed(WsMessage)` / `into_inner()` / `is_full()` / `is_closed()` | 送れなかった `WsMessage` を保持。満杯と終了を区別して即座に返す |
| `WsCloseError`（`#[non_exhaustive]`） | `InvalidCode` / `ReasonTooLong` / `Closed` | close code・reason 検証失敗、または既に close 済み・セッション終了済み |

- `close(code, reason)` の code は `1000..=1003` / `1007..=1009` / `1011..=1014` / `3000..=4999` のみ許可（`1010` はクライアント専用のため拒否）。reason は 123 バイト以下
- `close` 呼び出し前に `send` が `Ok` を返した push は Close フレームより先に送出される（単一の bounded mpsc による FIFO）
- `closed()` は切断まで待つ。`on_message` / `on_message_with_ctx` の中でインライン `await` すると自己デッドロックするため、`on_open` 等から `tokio::spawn` した別タスクでのみ使う。clone した `WsSender` でも同じ時点で切断を観測する

### WsOpenContext / WsConnContext（v0.4.1 / v0.4.2 で追加）

`on_open` に渡される `WsOpenContext`（所有値）と、`on_message_with_ctx` / `on_close` に渡される `&WsConnContext`。どちらも同名の 9 アクセサを持つ。

| メソッド | 戻り値 | 説明 |
| --- | --- | --- |
| `conn_id()` | `WsConnId` | プロセス内で一意な接続 ID（単調増加で推測可能。認可トークンとして使わない。公開コンストラクタなし） |
| `sender()` | `&WsSender` | 送信ハンドル |
| `param(name)` | `Option<&str>` | `with_path_pattern` が抽出したパスパラメータ（非デコード） |
| `params()` | `impl Iterator<Item = (&str, &str)>` | パスパラメータ全件 |
| `peer_addr()` | `Option<SocketAddr>` | 接続元の実 peer address（`handle_upgrade` 経由・非ソケット経路では `None`。`WsConnContext::peer_addr` は v0.4.2 追加） |
| `host()` / `origin()` / `user_agent()` | `Option<&str>` | 対応するリクエストヘッダ値（v0.4.2） |
| `query()` | `Option<&str>` | query 文字列（v0.4.2） |

- ヘッダ値は `MAX_CONTEXT_HEADER_VALUE_BYTES`（1024）、query は `MAX_CONTEXT_QUERY_BYTES`（2048）を上限とし、超過した値は切り詰めずに `None`（部分一致による許可リスト迂回を避けるフェイルクローズ）
- 保持するのは固定 5 項目（`peer_addr` / `host` / `origin` / `user_agent` / `query`）のみ。任意ヘッダの汎用アクセサはない。2 つのコンテキストは同一の内部値を `Arc` 共有する
- `Debug` 出力にはパスパラメータ・リクエスト由来の値・peer address を含めない

### CloseReason / FailureKind（v0.4.2 で追加）

`on_close` に渡される終了理由（いずれも `#[non_exhaustive]`・`Copy`。クライアント入力の payload は保持しない。`match` にはワイルドカード腕が必要）。

| `CloseReason` variant | 説明 |
| --- | --- |
| `ClientClose` | クライアントが Close フレームを送出した（正常終了） |
| `Eof` | Close ハンドシェイクなしの切断（読み取り EOF、`ResetWithoutClosingHandshake` を含む） |
| `IdleTimeout` | `idle_timeout` 内にクライアントからのフレームがなかった |
| `Cancelled` | コアの世代キャンセル（最終 graceful shutdown・rebind 世代 drain） |
| `HandlerClose` | ハンドラが `WsOutcome::Close` を返した |
| `MessageTooLarge` | 受信メッセージ/フレームが `max_message_size` / `max_frame_size` を超過した |
| `Failed(FailureKind)` | 上記以外の失敗。`FailureKind` は `Io` / `Protocol` / `Handler` |
| `SenderClose` | `WsSender::close` によるサーバー起点の Close |
| `PongTimeout` | `with_ping_interval` の Pong 期限切れ、または 1 回の送出が `pong_timeout` を超えてブロックした |

### WsHandshakeCheck / WsHandshakeContext（v0.4.2 で追加）

`with_handshake_check` で登録する受理判定フック。RFC 6455 検証を通過した upgrade 要求について、101 応答の送出前に一度だけ同期で評価される。

```rust,ignore
pub trait WsHandshakeCheck: Send + Sync + 'static {
    fn check(&self, ctx: &WsHandshakeContext<'_>) -> Result<(), Response>;
}
// Fn(&WsHandshakeContext<'_>) -> Result<(), Response> のクロージャにも blanket impl あり

// 例: Origin を検査し、許可されていなければ 403 で拒否する
let config = WebSocketConfig::default().with_handshake_check(
    |ctx: &WsHandshakeContext<'_>| match ctx.header("origin") {
        Some("https://example.com") => Ok(()),
        _ => Err(Response::empty(403)),
    },
);
```

| `WsHandshakeContext`（`#[non_exhaustive]`）メソッド | 説明 |
| --- | --- |
| `head()` | アップグレード要求の `&RequestHead` |
| `header(name)` | 大小無視のヘッダ値。**同名ヘッダが複数ある場合は `None`**（フェイルクローズ。全出現値が必要なら `head()` 経由） |
| `param(name)` / `params()` | `{name}` パスパラメータ（非デコード。パターン未登録では常に `None` / 空） |
| `peer_addr()` | 接続元の実 peer address（`None` の場合 IP ベース認可は拒否側に倒す） |

### PathPattern（v0.4.1 で追加）

`with_path_pattern` が内部で `PathPattern::parse` する `{name}` 付きパターン（`pattern` モジュール）。

- `PathPattern::parse(pattern: &str) -> Result<Self, PathPatternError>` / `match_path(&self, path) -> Option<PathParams<'_>>`
- `PathParams`: `get(name)` / `iter()` / `len()` / `is_empty()`
- 上限定数: `MAX_PATTERN_SEGMENTS`（32）/ `MAX_SEGMENT_BYTES`（256）
- `PathPatternError`: `MissingLeadingSlash` / `EmptyParamName` / `InvalidParamName(String)` / `MixedSegment(String)` / `DuplicateParamName(String)` / `EmptySegment` / `TooManySegments` / `SegmentTooLong`

## Options / Props

`WebSocketConfig`（`with_*` メソッドで構築、`Default` あり。型は `WebSocketConfig` の各 `pub` フィールドに対応）。

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `with_path(path)` | `String` | `/ws` | アップグレードを受け付ける request-target。以前の `with_path_pattern` は破棄され完全一致に戻る |
| `with_path_pattern(pattern)`（v0.4.1） | `Result<Self, PathPatternError>` | —（未登録時は `path` 完全一致） | `{name}` パスパラメータ付きパターンを登録する（例 `/devtools/page/{id}`）。`{` `}` を含まない文字列は `with_path` と同じ完全一致。パターンが `path` より優先して照合される。後から `with_path` を呼ぶと破棄 |
| `with_max_message_size(usize)` | `usize` | `1024 * 1024`（1 MiB） | 受信メッセージ（フレーム結合後）の最大バイト数 |
| `with_max_frame_size(usize)` | `usize` | `256 * 1024`（256 KiB） | 受信する単一フレームの最大バイト数 |
| `with_idle_timeout(Duration)` / `without_idle_timeout()` | `Option<Duration>` | `Some(60 秒)`（fail-safe で有効） | フレーム受信アイドルタイムアウト。クライアントからのフレーム受信（Text / Binary / Ping / Pong）でのみ延長され、サーバー起点の push・Ping・`Reply` 送出では延長されない |
| `with_handler(H: WsMessageHandler)` | `Arc<dyn WsMessageHandler>` | `EchoHandler`（`default_handler()`、後方互換） | Text/Binary メッセージ受信ごとに呼ばれるユーザー定義ハンドラ。`handler_name()` で診断名を取得 |
| `with_close_grace(Duration)` | `Duration` | `10 秒`（`DEFAULT_CLOSE_GRACE`、v0.3.0 で追加、issue #500） | Close ハンドシェイクの猶予期間。サーバー側 Close フレーム送出からクライアント応答/EOF 待ちまでの上限 |
| `with_outbound_capacity(usize)`（v0.4.2） | `Result<Self, OutboundCapacityError>` | `8` | 接続ごとの送信キュー（`WsSender`）容量。`0` は `OutboundCapacityError::Zero`、`MAX_OUTBOUND_CAPACITY`（4096）超は `OutboundCapacityError::TooLarge`（`#[non_exhaustive]`）。`outbound_capacity()` で取得 |
| `with_ping_interval(interval, pong_timeout)` / `without_ping_interval()`（v0.4.2） | `Result<Self, PingIntervalError>` | 無効 | `interval` ごとにサーバーから Ping を送出し、送出時点から `pong_timeout` 以内に一致する Pong が届かない接続を `CloseReason::PongTimeout` で切断する。`Duration::ZERO` は `PingIntervalError::ZeroInterval` / `ZeroPongTimeout`（`#[non_exhaustive]`）。`ping_interval()` / `pong_timeout()` で取得 |
| `with_handshake_check(C: WsHandshakeCheck)` / `without_handshake_check()`（v0.4.2） | `Option<Arc<dyn WsHandshakeCheck>>` | 未登録（無条件で 101 応答） | ハンドシェイクの受理判定フック。複数回呼ぶと最後の登録のみ有効。`has_handshake_check()` で登録有無を確認 |

## Notes

- これは Rust 製 fandhe-backend の API であり、JS/TS の `hono` や Go の `go-echo` の同名機能（WebSocket ハンドラ）とは別物
- `crates/plugin-websocket` 自体は `fandhe-backend-core` に依存しない非循環パターン。`UpgradeHandler` 実装アダプタはコア側に置く
- `max_message_size`/`max_frame_size` 超過はメモリ枯渇 DoS 対策として切断される。v0.4.2 で修正: 従来は Close フレームを送らず drop していたが、現在は close code 1009（Message Too Big）・固定 reason `"message too big"` を送出してから閉じる（`CloseReason::MessageTooLarge`）。frame サイズ超過時は Close 送出後に生ストリームの半閉鎖（FIN）+ `close_grace` で有界な読み捨てを行い、RST による 1009 消失を避ける。戻り値は従来どおり `Err(WsError::Protocol(tungstenite::Error::Capacity(_)))` で、ハンドラへは到達しない。`idle_timeout` は無通信接続を正常な Close ハンドシェイクで切断する（リソース枯渇 DoS 対策）
- `WsError` は `InvalidHandshake(&'static str)` / `UnsupportedVersion` / `Io` / `Protocol` / `Handler`。受理判定フックが拒否した場合も戻り値は `Ok(())`（専用 variant は追加されていない）
- ユーザーハンドラはメッセージごとに直列 `await` される。`on_message` / `on_message_with_ctx` 実行中も `WsSender` の outbound は消化される。v0.4.2 で修正: 実行中に `WsSender::send` を送信キュー容量を超える回数呼ぶとデッドロックする不具合を解消（cancel を最優先 → ハンドラ完了 | outbound 到着の内側 race ループ）
- v0.3.0: `handle_upgrade` に世代キャンセル用の `cancel: Future<Output = ()>` を追加（issue #492）。`cancel` が発火すると close code 1001（Going Away）の Close フレームを送出し、クライアント応答は `close_grace`（既定 10 秒）で有界に待つ。`with_close_grace` は `Duration::ZERO` や既定より大幅に大きい値もクランプせず受け付けるため、正常終了と資源保護のバランスは呼び出し側の責任になる
- `on_open` は 101 応答送出が成功した接続でのみ呼ばれる。ハンドシェイク検証失敗（400/426）・101 送出前のキャンセル・受理判定フックによる拒否では `on_open` / `on_close` ともに呼ばれない（フェイルクローズの対称性）
- 受理判定フックの契約: 同期・非ブロッキング・panic しない。拒否時は返した `Response` を `Connection: close` 付きで送出し upgrade しない。ステータスが 3xx/4xx/5xx（304 を除く）以外の場合は `400 Bad Request`（body なし）へ正規化される。コアの `RequestGate` はパスパラメータを持たないため、それを代替する plugin-websocket 内蔵の拒否経路
- 送信キューの順序保証（v0.4.2）: ハンドラが `WsOutcome::Close` を返した場合、Close 処理の開始時点でキューを封鎖し、キュー済みの push を Close フレームより先に送出する（従来は送らずに Close していた）。ハンドラが `Err` を返した場合も封鎖して `close_grace` を上限にキュー済み push を送出してから終了する（封鎖前に確定した `WsSender::close` があればその Close を送り、`on_close` の理由は `SenderClose`）。`WsOutcome::Reply` 時の排出は送信キュー容量回までに制限される。flush と Close は全体で `close_grace` を上限とし、超過・世代キャンセル・送出失敗で打ち切られた場合は残りの push と Close フレームを送らず終了する。cancel・idle timeout・クライアント Close・EOF・受信/送信エラーの経路ではキュー済み push を送出しない
- `WsSender::close` 呼び出し後は、クライアントが受信を止めていても要求の観測から `close_grace` 以内に Close ハンドシェイクを終えるか接続を打ち切る。close 確定後の `send` は `Err` を返す
- `idle_timeout` と `with_ping_interval` の併用: `interval + pong_timeout` を `idle_timeout` より小さくすると、生存クライアントは Ping への Pong で `idle_timeout` が延長され続ける（例: 既定 60 秒に対し `with_ping_interval(30s, 10s)`）。`interval` を `idle_timeout` 以上にすると最初の Ping 前に `idle_timeout` が発火し、受信専用クライアントでも切断される。サーバー起点 push を受けるだけの受信専用クライアント（CDP 互換サーバー相手の Playwright / Puppeteer 等）は `idle_timeout` だけでは死活監視できない
- Pong 期限の判定は受信待ちで読めるフレームがなくなった時点で行う。期限後も届いているフレームは先に処理し、その中の一致する Pong も有効。各 Ping は 8 バイト big-endian の単調増加シーケンス番号を payload に持ち、一致しない Pong は無視される
- `peer_addr` はリバースプロキシ・ロードバランサ配下ではプロキシ自身のアドレスになる（クライアント申告の `X-Forwarded-For` とは異なり偽装できない値）
- 複数パターン（`/devtools/browser/{id}` と `/devtools/page/{id}` 等）はコア側 `Server::websocket` に複数の `WebSocketConfig` を登録して扱う。登録順に最初に一致した設定が使われる
- `tokio` feature に `sync`（bounded mpsc 用）を追加（`io-util` / `time` / `sync`）。`WsSender` は clone を保持している間 outbound チャネルの送信側が閉じない

## Related

- [webrtc](./webrtc.md)
- [webrtc-proxy](./webrtc-proxy.md)
- [graphql](./graphql.md)
