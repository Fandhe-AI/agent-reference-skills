# Remotes（リモート設定の共有）

Source: https://lefthook.dev/examples/remotes

`remotes` 機能を使って、他の Git リポジトリから設定ファイルを取得・共有する方法を説明します。

## 概要

`remotes` 機能により、他の Git リポジトリの設定を利用できます。Lefthook はリモートの設定ファイルを自動的にダウンロードし、既存の設定にマージします。

## 設定例

```yaml
remotes:
  - git_url: https://github.com/evilmartians/lefthook
    configs:
      - examples/remote/ping.yml
```

## 主なポイント

- **`git_url`** - 設定ファイルを取得するリモート Git リポジトリの URL
- **`configs`** - リポジトリ内の設定ファイルのパス（複数指定可能）
- リモートの設定ファイルは自動的にダウンロードされ、ローカルの設定にマージされる
- チーム間やプロジェクト間で共通の Git フック設定を共有するのに便利
