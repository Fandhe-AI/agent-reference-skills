# Remotes

Source: https://lefthook.dev/configuration/remotes

複数のリモート設定を提供して、lefthook の設定を多くのプロジェクトで共有できる。Lefthook は自動的にリモート設定をダウンロードしてローカルの `lefthook.yml` にマージする。

## 概要

- リモートリポジトリのルートに基づく相対パスで `extends` を使用可能
- スクリプトフォルダはリモート設定で提供する場合、リポジトリのルートに配置する必要がある
- シンプルさのため、リモート設定のジョブは他のステップから独立させることを推奨

### マージ優先順位

1. ローカルメイン設定 (`lefthook.yml`)
2. リモート設定 (`remotes`)
3. ローカルオーバーライド (`lefthook-local.yml`)

---

## git_url

Source: https://lefthook.dev/configuration/git_url

- **型:** String (URL)

Git リポジトリへの URL。lefthook が実行されるマシンの権限でアクセスされる。

### SSH プロトコル

```yaml
remotes:
  - git_url: git@github.com:evilmartians/lefthook
```

### HTTPS プロトコル

```yaml
remotes:
  - git_url: https://github.com/evilmartians/lefthook
```

---

## ref

Source: https://lefthook.dev/configuration/ref

- **型:** String (ブランチ名またはタグ名)

リモート設定のオプションのブランチまたはタグ名。

```yaml
remotes:
  - git_url: git@github.com:evilmartians/lefthook
    ref: v1.0.0
```

> **注意:** 最初に `ref` オプションを設定して `lefthook install` を実行した後に削除すると、lefthook はどのブランチ/タグを ref として使用すべきか判断できない。一度追加したら常に使用すること。

---

## refetch

Source: https://lefthook.dev/configuration/refetch

- **型:** Boolean
- **デフォルト:** `false`

毎回の実行でリモート設定の再取得を強制する。

```yaml
remotes:
  - git_url: https://github.com/evilmartians/lefthook
    refetch: true
```

> **注意:** `refetch: true` は `refetch_frequency` の設定よりも優先される。

---

## refetch_frequency

Source: https://lefthook.dev/configuration/refetch_frequency

- **型:** String (`always`, `never`, または時間指定 `24h`, `30m` など)
- **デフォルト:** 未設定

Lefthook がリモート設定を再取得する頻度を指定する。

### 動作

- `always`: 毎回の Lefthook 実行時に取得
- 時間形式（例: `24h`, `30m`）: 指定時間経過後にのみ再取得
- `never` または未設定: リモート取得なし

取得に失敗した場合、エラーではなく警告が表示される。以前の成功した取得があればそのキャッシュ設定が使用され、なければリモートはスキップされる。

```yaml
# lefthook.yml

remotes:
  - git_url: https://github.com/evilmartians/lefthook
    refetch_frequency: 24h
```

---

## configs

Source: https://lefthook.dev/configuration/configs

- **型:** Array of strings
- **デフォルト:** `[lefthook.yml]`

リモートのルートからの設定パスのオプション配列。

### 単一リモートの複数設定

```yaml
# lefthook.yml

remotes:
  - git_url: git@github.com:evilmartians/lefthook
    ref: v1.0.0
    configs:
      - examples/ruby-linter.yml
      - examples/test.yml
```

### 複数リモートの複数設定

```yaml
# lefthook.yml

remotes:
  - git_url: git@github.com:org/lefthook-configs
    ref: v1.0.0
    configs:
      - examples/ruby-linter.yml
      - examples/test.yml
  - git_url: https://github.com/org2/lefthook-configs
    configs:
      - lefthooks/pre_commit.yml
      - lefthooks/post_merge.yml
  - git_url: https://github.com/org3/lefthook-configs
    ref: feature/new
    configs:
      - configs/pre-push.yml
```
