# GitHub Actions -- カスタムアクション作成

カスタムアクション作成に関するガイドの目次。

| Name | Description | Path |
|------|-------------|------|
| action-metadata.md | action.yml メタデータ構文 | [action-metadata.md](./action-metadata.md) |
| javascript-actions.md | JavaScript アクションの作成 | [javascript-actions.md](./javascript-actions.md) |
| docker-actions.md | Docker コンテナアクションの作成 | [docker-actions.md](./docker-actions.md) |

複合アクションについては [composite-actions.md](../composite-actions.md) を参照。

---

## アクションの種類

| 種類 | `runs.using` | 実行環境 | 対応ランナー |
|---|---|---|---|
| JavaScript | `node20` / `node24` | Node.js ランタイム | Linux, Windows, macOS |
| Docker コンテナ | `docker` | Docker コンテナ | Linux のみ（セルフホステッドは Docker 必須） |
| 複合 | `composite` | ランナー上で直接実行 | Linux, Windows, macOS |

---

## 配布方法

### パブリックリポジトリ

独立したリポジトリで公開し、セマンティックバージョニングのタグで管理する。

```yaml
# ユーザーがこのように参照
uses: owner/action-name@v1
uses: owner/action-name@v1.2.3
uses: owner/action-name@abc123  # コミット SHA
```

### 同一リポジトリ内

`.github/actions/` ディレクトリに配置する。

```yaml
# 同一リポジトリから参照
uses: ./.github/actions/my-action
```

### GitHub Marketplace

パブリックリポジトリのアクションは GitHub Marketplace に公開可能。
