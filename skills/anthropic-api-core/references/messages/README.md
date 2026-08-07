# messages

Tool use・Agent Skills (SKILL.md)・MCP connector の詳細は anthropic-api-tools-mcp スキルを参照。

| Name | Description | Path |
|------|-------------|------|
| Batch processing | Message Batches API による大量リクエスト非同期処理。50% コスト削減・1 時間以内の完了 | [batch-processing.md](./batch-processing.md) |
| Citations | ソースドキュメントから Claude の回答を根拠付ける。正確なテキスト箇所の引用機能 | [citations.md](./citations.md) |
| Embeddings | テキスト埋め込み（セマンティック類似度測定）。Voyage AI が推奨プロバイダー | [embeddings.md](./embeddings.md) |
| Fallback credit | 拒否時の再試行で prompt-cache 書き込みコストを二重課金しない仕組み | [fallback-credit.md](./fallback-credit.md) |
| Fast mode (research preview) | 対応 Opus モデルから最大 2.5 倍高速な出力。同一モデル・プレミアム価格設定 | [fast-mode.md](./fast-mode.md) |
| Files API | ファイルアップロード・file_id で Messages リクエストから参照・ダウンロード | [files.md](./files.md) |
| Stop reasons and fallback | Messages API レスポンスの stop_reason 解釈・継続・再試行・フォールバック判定 | [handling-stop-reasons.md](./handling-stop-reasons.md) |
| Mid-conversation system messages and tool changes | 会話途中のシステム指示・ツール変更。prompt-cache プレフィクスを無効化しない | [mid-conversation-system-messages.md](./mid-conversation-system-messages.md) |
| Multilingual support | 多言語でのクロスリンガル性能。言語を明示的に指定する最適手法 | [multilingual-support.md](./multilingual-support.md) |
| Features overview | Claude の高度な機能と対応状況。五領域での機能分類と可用性分類 | [overview.md](./overview.md) |
| PDF support | PDF 処理・テキスト抽出・チャート分析。document コンテンツブロック形式 | [pdf-support.md](./pdf-support.md) |
| Refusals and fallback | Claude Fable 5 / Opus 5 の安全分類器による拒否・別モデルへのフォールバック | [refusals-and-fallback.md](./refusals-and-fallback.md) |
| Search results | RAG アプリケーション用の属性付き検索結果。引用メカニズムと同一 | [search-results.md](./search-results.md) |
| Streaming messages | SSE による Messages API レスポンスのインクリメンタルストリーミング | [streaming.md](./streaming.md) |
| Structured outputs | JSON スキーマ制約出力・Strict tool use による入力スキーマ保証 | [structured-outputs.md](./structured-outputs.md) |
| Task budgets | エージェントループ全体のトークン予算。自己調整終了・graceful 動作 | [task-budgets.md](./task-budgets.md) |
| Token counting | メッセージ送信前のトークンカウント。レート制限・コスト管理・モデルルーティング用 | [token-counting.md](./token-counting.md) |
| Coordinates and bounding boxes | 画像リサイズ・ピクセル座標。抽出座標と元画像の対応 | [vision-coordinates.md](./vision-coordinates.md) |
| Vision | 画像分析。base64 / URL / Files API file_id 形式でのソース指定 | [vision.md](./vision.md) |
| Using the Messages API | Messages API の実用パターン。基本リクエスト・マルチターン・prefill・vision | [working-with-messages.md](./working-with-messages.md) |
