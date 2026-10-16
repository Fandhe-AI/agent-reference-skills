# samples

| Name | Description | Path |
|------|-------------|------|
| Basic Message | 最小構成の Messages API リクエストを curl / Python / TypeScript で送信し、テキスト応答を読み出す | [basic-message.md](./basic-message.md) |
| Batch Processing | 複数リクエストを Message Batch で作成し、完了までポーリングして custom_id で結果を照合 | [batch-processing.md](./batch-processing.md) |
| Compaction on Demand | アプリ側の判断でサーバー側要約（compaction）を実行し、要約ブロックから会話を継続（beta） | [compaction-on-demand.md](./compaction-on-demand.md) |
| Adaptive Thinking | adaptive thinking を有効化し、thinking / text ブロックを読み出す | [extended-thinking.md](./extended-thinking.md) |
| Prompt Caching | 大きな再利用プロンプトに cache_control を付け、キャッシュ読み取りを利用する | [prompt-caching.md](./prompt-caching.md) |
| Streaming Messages | stream: true（または SDK の .stream()）で SSE を逐次受信し、イベント種別で分岐 | [streaming.md](./streaming.md) |
| JSON Outputs with output_config.format | output_config.format で JSON Schema 準拠の出力を強制し、text ブロックから読み出す | [structured-outputs.md](./structured-outputs.md) |
| Token Counting | messages.count_tokens で送信前に入力トークン数を見積もる | [token-counting.md](./token-counting.md) |
| Vision and PDF Input | base64 画像と URL 参照の PDF を text プロンプトと併せて送信 | [vision-pdf.md](./vision-pdf.md) |
