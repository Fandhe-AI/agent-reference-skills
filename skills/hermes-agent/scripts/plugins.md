# Plugins

プラグインのインストール・管理・有効化・無効化。

## 対話式プラグイン切り替えUI

```bash
hermes plugins
```

## プラグインのインストール（Git URL または owner/repo）

```bash
hermes plugins install <git-url>
hermes plugins install <owner/repo>
hermes plugins install <identifier> --force
```

## インストール済みプラグインの更新

```bash
hermes plugins update <name>
```

## プラグインの削除

```bash
hermes plugins remove <name>
hermes plugins rm <name>
hermes plugins uninstall <name>
```

> **警告**: 削除したプラグインのデータは復元できない。

## プラグインの有効化・無効化

```bash
hermes plugins enable <name>
hermes plugins disable <name>
```

## インストール済みプラグインの一覧

```bash
hermes plugins list
hermes plugins ls
```

## ツール設定の表示・対話式設定

```bash
hermes tools
hermes tools --summary
```

## メモリプロバイダーの設定

```bash
hermes memory setup
hermes memory status
hermes memory off
```

## Honcho メモリ統合の管理

```bash
hermes honcho setup
hermes honcho status
hermes honcho enable
hermes honcho disable
hermes honcho mode hybrid
```
