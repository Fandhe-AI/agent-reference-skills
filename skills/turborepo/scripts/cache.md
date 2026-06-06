# Cache

キャッシュ制御・Remote Caching のセットアップと管理コマンド。

## Remote Cache 認証・接続

```sh
# Vercel に認証（デフォルト）
turbo login

# SSO チームで認証
turbo login --sso-team=slug-for-team

# 手動でトークンを入力
turbo login --manual

# カスタム API エンドポイントで認証
turbo login --api=https://acme.com/api

# ログアウト
turbo logout
```

## リモートキャッシュへのリンク

```sh
# リポジトリを Remote Cache にリンク
turbo link

# チームスコープを指定してリンク
turbo link --scope=my-team

# 確認プロンプトをスキップ
turbo link --yes

# カスタム Remote Cache プロバイダーにリンク
turbo link --api=https://acme.com/api

# リンクを解除
turbo unlink
```

## Remote Cache の動作確認

```sh
rm -rf ./.turbo/cache
turbo run build
```

再実行時に `FULL TURBO` が表示されれば Remote Cache が機能している。

## キャッシュ制御フラグ（turbo run と組み合わせて使用）

```sh
# キャッシュを無視して強制再実行
turbo run build --force

# ローカルキャッシュ読み書き・リモートキャッシュ読み込みのみ
turbo run build --cache=local:rw,remote:r

# キャッシュディレクトリを変更
turbo run build --cache-dir="./my-cache"

# タスク計画のみ確認（実行なし）
turbo run build --dry

# 実行メタデータ（ハッシュ・入出力）を JSON で出力
turbo run build --summarize
```

`--cache` の書式: `local:<r|w|rw>,remote:<r|w|rw>`（例: `local:r,remote:rw`）

## パフォーマンスデバッグ

```sh
# タスク計画の確認（JSON 形式）
turbo run build --dry=json

# パフォーマンストレースの生成
turbo run build --profile=my-profile.json
```
