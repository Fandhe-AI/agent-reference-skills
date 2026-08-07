# endpoints

beta 版 messages / models エンドポイント（`/v1/messages?beta=true` 等）は非 beta 版と同一スキーマのため個別ページは作成していない。Skills / Admin / Compliance / Managed Agents 系エンドポイントは anthropic-api-tools-mcp / anthropic-admin-platform / anthropic-managed-agents スキルが担当。

| Name | Description | Path |
|------|-------------|------|
| Cancel a Message Batch | Batch のキャンセル。進行状態を canceling に遷移 | [batches-cancel.md](./batches-cancel.md) |
| Create a Message Batch | Message Batch 送信。複数リクエストの非同期処理・24 時間以内に完了 | [batches-create.md](./batches-create.md) |
| Delete a Message Batch | Batch 削除。処理完了後のみ可能。キャンセルが必要な場合は先にキャンセル | [batches-delete.md](./batches-delete.md) |
| List Message Batches | 全 Batch 一覧。最近作成順。pagination サポート | [batches-list.md](./batches-list.md) |
| Retrieve Message Batch Results | Batch 結果ストリーム。JSONL 形式・custom_id マッチング必須 | [batches-results.md](./batches-results.md) |
| Retrieve a Message Batch | Batch 状態取得。完了判定・結果 URL 確認用 | [batches-retrieve.md](./batches-retrieve.md) |
| Create a Text Completion | [レガシー] Text Completion。Messages API が後継 | [completions-create.md](./completions-create.md) |
| Delete File | ファイル削除 | [files-delete.md](./files-delete.md) |
| Download File | ファイル内容ダウンロード。raw バイナリ・元の MIME type | [files-download.md](./files-download.md) |
| List Files | Files API アップロード済みファイル一覧。scope_id フィルタサポート | [files-list.md](./files-list.md) |
| Get File Metadata | ファイルメタデータ取得 | [files-retrieve_metadata.md](./files-retrieve_metadata.md) |
| Upload File | ファイルアップロード。Messages API リクエストでの参照・実行用入力 | [files-upload.md](./files-upload.md) |
| Count Tokens in a Message | トークンカウント。レート制限・コスト管理・プロンプト長フィッティング用 | [messages-count_tokens.md](./messages-count_tokens.md) |
| Create a Message | メッセージ作成。テキスト・画像コンテンツ・マルチターン会話 | [messages-create.md](./messages-create.md) |
| List Models | 利用可能モデル一覧。capabilities（機能対応状況）と最大トークン数を含む | [models-list.md](./models-list.md) |
| Get a Model | 特定モデル情報取得。alias 解決・capabilities 確認用 | [models-retrieve.md](./models-retrieve.md) |
