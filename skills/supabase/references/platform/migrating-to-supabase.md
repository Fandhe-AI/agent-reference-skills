# Supabase への移行ガイド

## 概要

Supabase は PostgreSQL ベースであるため、PostgreSQL 互換のツールを使用して様々なデータベースやサービスから移行可能。

## Amazon RDS からの移行

### PostgreSQL RDS

```bash
# RDS からダンプ
pg_dump \
  -h <rds-endpoint>.rds.amazonaws.com \
  -U <username> \
  -d <database> \
  -F c \
  --no-owner \
  --no-acl \
  -f rds_backup.dump

# Supabase にリストア
pg_restore \
  -h db.<project-ref>.supabase.co \
  -U postgres \
  -d postgres \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  rds_backup.dump
```

### 注意事項

- RDS 固有の拡張機能は Supabase でサポートされていない場合がある
- セキュリティグループで pg_dump 元の IP を許可する必要がある
- 大規模データベースの場合は直接接続（ポート 5432）を使用する

## Firebase Auth からの移行

### ユーザーエクスポート

Firebase Admin SDK を使用してユーザーデータをエクスポートする。

```javascript
const admin = require('firebase-admin');
admin.initializeApp();

async function exportUsers() {
  const listUsersResult = await admin.auth().listUsers(1000);
  const users = listUsersResult.users.map(user => ({
    email: user.email,
    phone: user.phoneNumber,
    created_at: user.metadata.creationTime,
    email_verified: user.emailVerified,
    // パスワードハッシュはFirebase固有の形式
  }));
  return users;
}
```

### Supabase Auth へのインポート

```javascript
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function importUsers(users) {
  for (const user of users) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: user.email,
      phone: user.phone,
      email_confirm: user.email_verified,
      // パスワードは再設定が必要
    });
  }
}
```

### 注意事項

- Firebase のパスワードハッシュ（scrypt）は直接移行できない
- ユーザーにパスワードリセットを案内する必要がある
- ソーシャルログイン（Google, GitHub 等）は Supabase Auth で再設定が必要

## Firebase Storage からの移行

### gsutil でダウンロード

```bash
# Firebase Storage からダウンロード
gsutil -m cp -r gs://<firebase-bucket>/* ./firebase-storage-backup/
```

### Supabase Storage にアップロード

```javascript
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function uploadFiles(dir, bucket) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileBuffer = fs.readFileSync(filePath);
    await supabase.storage.from(bucket).upload(file, fileBuffer);
  }
}
```

## Firestore からの移行

### JSON エクスポート

```bash
# Firebase CLI でエクスポート
firebase firestore:export ./firestore-export
```

### PostgreSQL へのインポート

Firestore のドキュメント構造を PostgreSQL のテーブルに変換する。

```sql
-- テーブル作成
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  content TEXT,
  author_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- JSON データのインポート（psqlの \copy または INSERT 文）
```

### 注意事項

- Firestore のネストされたドキュメントはリレーショナルモデルに変換する
- サブコレクションは別テーブルとして作成する
- Firestore の Timestamp 型は PostgreSQL の TIMESTAMPTZ に変換する

## Heroku Postgres からの移行

```bash
# Heroku からダンプ
heroku pg:backups:capture --app <app-name>
heroku pg:backups:download --app <app-name>

# または直接 pg_dump
pg_dump \
  -h <heroku-host> \
  -U <username> \
  -d <database> \
  -F c \
  --no-owner \
  --no-acl \
  -f heroku_backup.dump

# Supabase にリストア
pg_restore \
  -h db.<project-ref>.supabase.co \
  -U postgres \
  -d postgres \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  heroku_backup.dump
```

## MySQL からの移行

### pgloader を使用

```bash
# pgloader のインストール
# macOS: brew install pgloader
# Ubuntu: apt-get install pgloader

# 移行コマンド
pgloader \
  mysql://<user>:<password>@<host>/<database> \
  postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres
```

### pgloader 設定ファイル

```
LOAD DATABASE
  FROM mysql://<user>:<password>@<host>/<database>
  INTO postgresql://postgres:<password>@db.<project-ref>.supabase.co:5432/postgres

WITH include no drop,
     create tables,
     create indexes,
     reset sequences

SET work_mem to '16MB',
    maintenance_work_mem to '512 MB';
```

### 注意事項

- MySQL 固有のデータ型は自動変換される（ENUM → TEXT 等）
- AUTO_INCREMENT は SERIAL / BIGSERIAL に変換される
- MySQL の関数やストアドプロシージャは手動で移植が必要

## Neon / Render / Vercel Postgres からの移行

いずれも PostgreSQL ベースのため、標準的な pg_dump/pg_restore で移行可能。

```bash
# 移行元からダンプ
pg_dump \
  "<source-connection-string>" \
  -F c \
  --no-owner \
  --no-acl \
  -f backup.dump

# Supabase にリストア
pg_restore \
  -h db.<project-ref>.supabase.co \
  -U postgres \
  -d postgres \
  --clean \
  --if-exists \
  --no-owner \
  --no-acl \
  backup.dump
```

## 共通のベストプラクティス

- 移行前にバックアップを取得する
- ステージング環境で移行手順をテストする
- ダウンタイムを最小限にするため、段階的な移行を計画する
- 移行後に RLS ポリシーを設定する
- インデックスが正しく移行されたか確認する
- アプリケーションの接続文字列を更新する

## 関連

- [マイグレーション戦略](../deployment/database-migrations.md) — マイグレーション運用
- [データインポート](../database/import-data.md) — CSV・SQL インポート
- [サードパーティ Auth](../auth/third-party-auth.md) — 外部 Auth からの移行
