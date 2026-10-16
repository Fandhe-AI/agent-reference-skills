# thinking

| Name | Description | Path |
|------|-------------|------|
| Effort | output_config.effort で応答時のトークン消費（テキスト・tool 呼び出し・thinking）を制御 | [effort.md](./effort.md) |
| Extended thinking | 固定 budget_tokens を使う手動（レガシー）thinking モード | [extended-thinking.md](./extended-thinking.md) |
| Build an orchestration mode (mid-conversation effort example) | 高 effort・mid-conversation system message・ツール説明内の同意文を組み合わせた worked example | [mid-conversation-effort-example.md](./mid-conversation-effort-example.md) |
| Preserved thinking | 新しいモデルの preserved thinking（署名検証）と thinking-binding-controls の挙動 | [preserved-thinking.md](./preserved-thinking.md) |
| Steering thinking | effort レベル・system prompt・メッセージ単位で thinking の頻度と深さを調整し、コストを把握 | [thinking-steering-and-cost.md](./thinking-steering-and-cost.md) |
| Thinking in tool and multi-turn workflows | tool use の 2 ターン往復で thinking ブロックを正しく保持する worked example | [thinking-tool-workflows.md](./thinking-tool-workflows.md) |
| Troubleshooting thinking | thinking の設定 400 エラー・空の thinking ブロック・max_tokens 停止・キャッシュミスの対処 | [thinking-troubleshooting.md](./thinking-troubleshooting.md) |
| Thinking | thinking（推論）機能の概要。adaptive thinking と legacy extended-thinking の位置づけ | [thinking.md](./thinking.md) |
