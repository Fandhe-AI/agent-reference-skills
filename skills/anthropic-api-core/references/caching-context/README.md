# caching-context

| Name | Description | Path |
|------|-------------|------|
| Cache diagnostics | 連続するリクエストを比較し、プロンプトキャッシュミスの原因となった差分箇所を特定（beta、Claude API のみ） | [cache-diagnostics.md](./cache-diagnostics.md) |
| Compaction | サーバー側 compaction の概要。古いターンを要約に置換し、オンデマンド・しきい値・自前要約の使い分けを整理 | [compaction.md](./compaction.md) |
| Compaction in the background | 会話を継続しながら非同期にオンデマンド要約を取得し、届いた時点で履歴へ差し替え（beta） | [compaction-background.md](./compaction-background.md) |
| Compaction that keeps recent turns | 古いターンのみ要約し、直近ターンは原文のまま要約ブロックの後ろに残す（beta） | [compaction-keep-recent-turns.md](./compaction-keep-recent-turns.md) |
| Compaction on demand | アプリ側の判断で compaction パラメータ付きリクエストを送り、要約ブロックを受け取る（beta） | [compaction-on-demand.md](./compaction-on-demand.md) |
| Compaction and preserved thinking | compaction 後に残すターンの thinking ブロックの有効性と検証方法（beta） | [compaction-thinking-blocks.md](./compaction-thinking-blocks.md) |
| Compaction at a token threshold | context_management.edits のトークンしきい値で自動 compaction を発動（beta） | [compaction-threshold.md](./compaction-threshold.md) |
| Context editing | tool 結果・thinking ブロックを選択的にクリアするサーバー側の戦略 | [context-editing.md](./context-editing.md) |
| Context windows | コンテキストウィンドウの仕組み、モデル別サイズ、thinking / tool use の計上、超過時の挙動 | [context-windows.md](./context-windows.md) |
| Prompt caching | cache_control でプロンプト prefix をキャッシュし、コストと遅延を削減 | [prompt-caching.md](./prompt-caching.md) |
