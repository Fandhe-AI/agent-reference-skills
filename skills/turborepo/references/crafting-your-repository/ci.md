# CI の構築

## 環境変数

| 変数 | 用途 |
|---|---|
| `TURBO_TOKEN` | Remote Cache へのアクセストークン |
| `TURBO_TEAM` | リポジトリのアカウント名（Vercel チームスラッグ） |

## 影響を受けるパッケージのみ実行

```bash
# シンプルな方法
turbo run build --affected

# JSON で影響パッケージを確認
turbo query affected --packages web

# バイナリチェック（変更あり: 終了コード 1）
turbo query affected --packages web --exit-code
```

## 典型的なワークフロー

```bash
# 品質チェックは全パッケージで
turbo run lint check-types test

# ビルドは特定パッケージのみ
turbo build --filter=web
```

## 注意点

- シャロークローンの制限: Git 履歴がない場合、ソース管理変更によるフィルタリングは使えない
- GitHub Actions の自動検出: PR の base/head ブランチ間の差分を自動検出
- グローバル `turbo` のバージョン固定を推奨
- `turbo run <task>` を明示的に使う（将来のサブコマンドとの名前衝突防止）
- `outputs`、`env`、`globalEnv` を正しく設定しないとキャッシュミスやビルド失敗が発生
