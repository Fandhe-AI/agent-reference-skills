# Remote Caching

## 概要

タスクのキャッシュアーティファクトをマシンや CI システム間で共有する機能。入力が同一の場合、重複作業を防止する。

## 解決する問題

標準の Turborepo キャッシュはローカルに存在するため、開発者・チームメンバー・CI システムがそれぞれ別々に同じタスクを再実行してしまう。

## 実装オプション

| オプション | 説明 |
|---|---|
| Vercel Remote Cache（マネージド） | 全プランで無料。Vercel 上でアプリをホストしていなくても利用可能 |
| セルフホスト | Turborepo の API 仕様を満たす任意の HTTP サーバーで独自実装 |

## セットアップ手順

```bash
# Step 1: 認証
turbo login

# SSO の場合
npx turbo login --sso-team=team-name

# Step 2: リンク
turbo link

# Step 3: 動作確認
rm -rf ./.turbo/cache
turbo run build
```

## アーティファクト署名検証

HMAC-SHA256 署名による検証をサポート。

```json
{
  "remoteCache": {
    "signature": true
  }
}
```

環境変数 `TURBO_REMOTE_CACHE_SIGNATURE_KEY` に秘密鍵を設定する。
