# Skills

スキルのブラウズ・インストール・管理。

## スキルレジストリのブラウズ

```bash
hermes skills browse
hermes skills browse --source official
hermes skills browse --source skills-sh
```

## スキルの検索

```bash
hermes skills search <query>
hermes skills search kubernetes --source skills-sh
```

## スキルのインストール

```bash
hermes skills install <identifier>
hermes skills install openai/skills/k8s
```

## インストール前にスキル内容を確認（インストールしない）

```bash
hermes skills inspect <name>
```

## インストール済みスキルの一覧

```bash
hermes skills list
```

## ハブスキルの更新確認

```bash
hermes skills check
```

## 変更されたスキルの再インストール

```bash
hermes skills update
```

## ハブスキルの再スキャン

```bash
hermes skills audit
```

## スキルのアンインストール

```bash
hermes skills uninstall <name>
```

## スキルの公開

```bash
hermes skills publish
```

## 設定のエクスポート・インポート

```bash
hermes skills snapshot
```

## スキルのプラットフォーム別有効化設定

```bash
hermes skills config
```

## カスタムソース（tap）の管理

```bash
hermes skills tap
```
