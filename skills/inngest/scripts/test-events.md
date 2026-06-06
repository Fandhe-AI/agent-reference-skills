# Test Events

ローカル Dev Server へのテストイベント送信。

## curl でテストイベントを送信（Dev Server 経由）

```sh
curl -X POST -v "http://localhost:8288/e/123" \
  -d '{"name": "user.avatar.uploaded", "data": {"url": "https://a-bucket.s3.us-west-2.amazonaws.com/..."}}'
```

エンドポイントは `/e/<EVENT_KEY>` の形式。ローカル開発では `EVENT_KEY` にダミー値を使用できる。

## curl でアプリエンドポイントをトリガー

```sh
curl -X POST http://localhost:3000/api/create-task
```

Next.js アプリ側のルートハンドラーを直接呼び出してイベントを発火する。
