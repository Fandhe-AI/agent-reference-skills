# Sessions

| Name | Description | Path |
|------|-------------|------|
| Channels | MCP サーバーがイベント（webhook、チャットメッセージ、アラート）を実行中セッションにプッシュ。双方向化でチャットブリッジ化も可能 | [channels.md](./channels.md) |
| Channels reference | カスタムチャネル構築向け MCP サーバーコントラクト。stdio 経由の subprocess で `claude/channel` capability 宣言・通知発行 | [channels-reference.md](./channels-reference.md) |
| Checkpointing | Claude Code がユーザープロンプト前に自動的にコード状態をキャプチャ。`/rewind` で変更を取り消し・会話やコードを前の位置に戻す | [checkpointing.md](./checkpointing.md) |
| Deep links | `claude-cli://` URL でターミナルウィンドウ起動、working directory と事前埋込プロンプト指定可能 | [deep-links.md](./deep-links.md) |
| Remote Control | claude.ai/code またはモバイルアプリを机上の Claude Code セッションに接続。ローカル実行のまま遠隔操作可 | [remote-control.md](./remote-control.md) |
| Manage sessions | セッションはプロジェクトディレクトリに紐付けた保存済み会話。JSONL で局所保存。resume・branch・切り替え可能 | [sessions.md](./sessions.md) |
| Worktrees | git worktree は separate working directory。各 Claude Code セッションを独立 worktree で実行すれば編集が衝突しない | [worktrees.md](./worktrees.md) |
