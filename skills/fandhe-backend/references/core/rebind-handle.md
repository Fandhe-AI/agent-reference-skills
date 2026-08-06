# RebindHandle

稼働中サーバの listener を accept loop を止めずに差し替えるハンドル。`BoundServer::rebind_handle()` で取得する（issue #485）。

## Signature / Usage

```rust
impl BoundServer {
    pub fn rebind_handle(&mut self) -> RebindHandle;
}

#[derive(Clone)]
pub struct RebindHandle { /* private fields */ }

impl RebindHandle {
    pub async fn rebind(&self, addr: impl ToSocketAddrs) -> io::Result<SocketAddr>;
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| addr | `impl ToSocketAddrs` | 新しく bind する listener のアドレス |

## Notes

- `rebind_handle()` は `run_until` / `run` を呼ぶ**前**に呼び出すこと
- 初回呼び出しで内部の capacity-1 mpsc channel を遅延生成し、以降の呼び出しは sender を clone する（pay-for-what-you-use）。`rebind_handle()` を一度も呼ばない場合、この channel は生成されない
- `RebindHandle` 自体は `Clone` であり複数箇所に配布可能
- `rebind` は新しい `TcpListener` を bind し、成功したら accept loop に listener 差し替えを要求する。shutdown > rebind > accept の優先度を持つ 3-way race により、待機中の backlog コネクションをドレインしてから listener を置き換える
- bind 失敗時は旧 listener の状態に影響しない（フェイルクローズ）
- 旧世代のコネクションは grace ドレインされる。WS タスクには `crate::plugin::GenerationCancel::fire()`（issue #491）が世代キャンセルシグナルとして配線されており、close code 1001（Going Away）で正しくハンドシェイクして終端する
- WebRTC は世代非依存。`Server::webrtc` 登録時は `crate::plugin::SessionDrain` が世代に関わらず全ての `RTCPeerConnection` を即時クローズするため、rebind による listener アドレス変更とは独立して扱われる

## Related

- [BoundServer](./bound-server.md)
- [Graceful shutdown ガイド](../guides/graceful-shutdown.md)
