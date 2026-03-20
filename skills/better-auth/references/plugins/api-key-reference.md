# API Key Reference

API Key プラグインの完全なオプション、データベーススキーマ、型定義のリファレンス。

## プラグインオプション

### コア設定

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `configId` | string | `"default"` | マルチ設定セットアップ用の一意識別子 |
| `references` | `"user" \| "organization"` | `"user"` | API キーの所有タイプ |
| `apiKeyHeaders` | `string \| string[]` | `"x-api-key"` | API キーを確認するヘッダー名 |
| `storage` | `"database" \| "secondary-storage"` | `"database"` | ストレージバックエンド |
| `disableKeyHashing` | boolean | `false` | API キーハッシュの無効化（セキュリティリスク） |
| `deferUpdates` | boolean | `false` | 非重要更新をパフォーマンス向上のため遅延 |
| `enableSessionForAPIKeys` | boolean | `false` | API キーでセッション表現を可能にする |
| `fallbackToDatabase` | boolean | `false` | セカンダリストレージ使用時の DB フォールバック |

### カスタム関数

| オプション | シグネチャ |
|---|---|
| `customAPIKeyGetter` | `(ctx: GenericEndpointContext) => string \| null` |
| `customAPIKeyValidator` | `(options: { ctx; key: string }) => boolean \| Promise<boolean>` |
| `customKeyGenerator` | `(options: { length: number; prefix?: string }) => string \| Promise<string>` |
| `customStorage` | `{ get, set, delete }` メソッド |

### キー生成設定

| オプション | 型 | 説明 |
|---|---|---|
| `defaultKeyLength` | number | API キーの長さ（デフォルト: 64、プレフィックス除く） |
| `defaultPrefix` | string | API キーのプレフィックス（アンダースコア追加推奨） |
| `maximumPrefixLength` | number | 最大プレフィックス長 |
| `minimumPrefixLength` | number | 最小プレフィックス長 |
| `startingCharactersConfig` | `{ shouldStore?, charactersLength? }` | プレフィックス保存動作の設定 |

### 名前設定

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `requireName` | boolean | `false` | 作成時にキー名を必須にする |
| `minimumNameLength` | number | - | 最小名前長 |
| `maximumNameLength` | number | - | 最大名前長 |

### 高度な機能

| オプション | 型 | 説明 |
|---|---|---|
| `enableMetadata` | boolean | カスタムメタデータ保存を有効化 |
| `keyExpiration` | `{ defaultExpiresIn?, disableCustomExpiresTime?, minExpiresIn?, maxExpiresIn? }` | 有効期限設定 |
| `rateLimit` | `{ enabled?, timeWindow?, maxRequests? }` | レート制限設定 |
| `permissions` | `{ defaultPermissions? }` | デフォルトまたは動的権限の設定 |
| `schema` | `InferOptionSchema<...>` | カスタムスキーマ上書き |

## 権限システム

### 構造

```typescript
type Permissions = {
    [resourceType: string]: string[]
}
```

### デフォルト権限の設定

静的:

```typescript
apiKey({
    permissions: {
        defaultPermissions: {
            files: ["read"],
            users: ["read"],
        },
    },
})
```

動的:

```typescript
apiKey({
    permissions: {
        defaultPermissions: async (referenceId, ctx) => {
            return { files: ["read"], users: ["read"] }
        },
    },
})
```

## DB スキーマ

### apikey テーブル

| フィールド | 型 | キー | 説明 |
|---|---|---|---|
| `id` | string | PK | API キー識別子 |
| `configId` | string | - | 設定 ID（デフォルト: 'default'） |
| `name` | string | ? | API キー名 |
| `start` | string | ? | UI 表示用の先頭文字 |
| `prefix` | string | ? | プレーンテキストプレフィックス |
| `key` | string | - | ハッシュ化された API キー |
| `referenceId` | string | - | 所有者 ID（ユーザーまたは組織） |
| `refillInterval` | number | ? | リフィル間隔（ミリ秒） |
| `refillAmount` | number | ? | リフィル量 |
| `lastRefillAt` | Date | ? | 最終リフィル日時 |
| `enabled` | boolean | ? | 有効状態 |
| `rateLimitEnabled` | boolean | ? | レート制限状態 |
| `rateLimitTimeWindow` | number | ? | レート制限ウィンドウ（ミリ秒） |
| `rateLimitMax` | number | ? | ウィンドウあたりの最大リクエスト数 |
| `requestCount` | number | ? | 現在のウィンドウ内のリクエスト数 |
| `remaining` | number | ? | 残りリクエスト数 |
| `lastRequest` | Date | ? | 最終リクエスト日時 |
| `expiresAt` | Date | ? | 有効期限 |
| `createdAt` | Date | - | 作成日時 |
| `updatedAt` | Date | - | 最終更新日時 |
| `permissions` | string | ? | シリアライズされた権限 |
| `metadata` | string | ? | カスタムメタデータ（JSON） |

### インデックス

- `idx_apikey_reference_id` on `referenceId`
- `idx_apikey_config_id` on `configId`

## セカンダリストレージキーパターン

- `api-key:${hashedKey}` - プライマリルックアップ
- `api-key:by-id:${id}` - ID ベースルックアップ
- `api-key:by-ref:${referenceId}` - リファレンスのキー一覧

`expiresAt` を持つキーには自動クリーンアップ用の TTL が自動設定される。

## 遅延更新設定

非重要更新（レート制限カウンタ、タイムスタンプ、remaining カウント）を遅延し、レスポンス時間を改善する。

要件: auth オプションに `backgroundTasks.handler` が必要。

トレードオフ: DB 更新完了前に楽観的データを返す結果整合性を導入する。

## 以前のバージョンからの移行

`userId` フィールドは `referenceId` に置き換えられた。API レスポンスは `userId` の代わりに `referenceId` を返す。

SQL マイグレーション:

```sql
ALTER TABLE apikey ADD COLUMN config_id VARCHAR(255) NOT NULL DEFAULT 'default';
ALTER TABLE apikey ADD COLUMN reference_id VARCHAR(255);
UPDATE apikey SET reference_id = user_id WHERE reference_id IS NULL;
ALTER TABLE apikey ALTER COLUMN reference_id SET NOT NULL;
CREATE INDEX idx_apikey_reference_id ON apikey(reference_id);
CREATE INDEX idx_apikey_config_id ON apikey(config_id);
```

## 注意点

- API キーの平文保存はデータベース侵害時に脆弱。ハッシュ化はデフォルトで有効で強く推奨
- プレフィックスにはアンダースコアの追加を推奨（例: `hello_`）
