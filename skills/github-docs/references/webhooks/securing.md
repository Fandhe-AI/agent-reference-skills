# Webhook セキュリティ

## 概要

GitHub は HMAC-SHA256 を使用して Webhook 配信のセキュリティを確保する。Webhook に Secret を設定すると、各配信に `X-Hub-Signature-256` ヘッダーが付与され、ペイロードの整合性と送信元の真正性を検証できる。

## 署名の仕組み

1. Webhook 作成時に Secret（高エントロピーなランダム文字列）を設定する
2. GitHub がイベントを配信する際、Secret とペイロードから HMAC-SHA256 ハッシュを計算する
3. ハッシュ値が `X-Hub-Signature-256` ヘッダーに `sha256=<hex-digest>` の形式で付与される
4. サーバー側で同じ計算を行い、署名を検証する

## 重要な実装ルール

- **タイミング攻撃の防止**: `==` 演算子を使わず、必ず定数時間比較関数を使用する
- **エンコーディング**: ペイロードを常に UTF-8 として処理する
- **Secret の管理**: 環境変数に保存し、ソースコードにハードコードしない
- **検証順序**: ペイロードの処理前に必ず署名を検証する

## コード例

### Node.js

```javascript
const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = 'sha256=' +
    crypto.createHmac('sha256', secret)
      .update(payload, 'utf-8')
      .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Express ミドルウェアでの使用例
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'];
  const payload = JSON.stringify(req.body);

  if (!verifySignature(payload, signature, process.env.WEBHOOK_SECRET)) {
    return res.status(401).send('Invalid signature');
  }

  // ペイロードを処理
  res.status(200).send('OK');
});
```

### Ruby

```ruby
require 'openssl'
require 'rack/utils'

def verify_signature(payload_body, signature, secret)
  expected = 'sha256=' + OpenSSL::HMAC.hexdigest(
    OpenSSL::Digest.new('sha256'),
    secret,
    payload_body
  )

  Rack::Utils.secure_compare(expected, signature)
end
```

### Python

```python
import hmac
import hashlib

def verify_signature(payload_body: bytes, signature: str, secret: str) -> bool:
    expected = 'sha256=' + hmac.new(
        secret.encode('utf-8'),
        payload_body,
        hashlib.sha256
    ).hexdigest()

    return hmac.compare_digest(expected, signature)
```

### TypeScript (@octokit/webhooks)

```typescript
import { Webhooks } from '@octokit/webhooks';

const webhooks = new Webhooks({
  secret: process.env.WEBHOOK_SECRET,
});

// 組み込みの検証機能を使用
const isValid = await webhooks.verify(payload, signature);
```

## テスト用検証値

実装の正しさを確認するためのテストケース:

| 項目 | 値 |
|------|-----|
| **Secret** | `It's a Secret to Everybody` |
| **Payload** | `Hello, World!` |
| **期待される署名** | `sha256=757107ea0eb2509fc211221cce984b8a37570b6d7586c22c46f4379c8b043e17` |

## トラブルシューティング

| 問題 | 確認事項 |
|------|---------|
| ヘッダーが存在しない | Webhook に Secret が設定されているか確認 |
| 署名が一致しない | `X-Hub-Signature-256`（SHA-256）を使用しているか確認（`X-Hub-Signature` は非推奨） |
| 署名が一致しない | HMAC-SHA256 アルゴリズムを使用しているか確認 |
| 署名が一致しない | プロキシ/ロードバランサーがペイロードやヘッダーを変更していないか確認 |
| 署名が一致しない | ペイロードのエンコーディングが UTF-8 であるか確認 |

## 公式ドキュメント

- [Validating webhook deliveries](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries)
