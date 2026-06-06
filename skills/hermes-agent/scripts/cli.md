# CLI

hermes コマンドの起動・セッション管理・基本操作。

## インタラクティブセッションの起動

```bash
hermes
```

## 非インタラクティブな単一クエリ実行

```bash
hermes chat -q "Hello"
```

## モデルを指定して起動

```bash
hermes chat --model "anthropic/claude-sonnet-4"
```

## プロバイダーを指定して起動

```bash
hermes chat --provider nous
hermes chat --provider openrouter
```

## ツールセットを有効化して起動

```bash
hermes chat --toolsets "web,terminal,skills"
```

## スキルをプリロードして起動

```bash
hermes -s hermes-agent-dev,github-auth
```

## 直前のセッションを再開

```bash
hermes --continue
hermes -c
```

## セッション ID またはタイトルで再開

```bash
hermes --resume <session_id>
hermes --resume "refactoring auth"
```

## 隔離された git worktree で起動

```bash
hermes -w
```

## 詳細出力モードで起動

```bash
hermes chat --verbose
```

## バージョン表示

```bash
hermes --version
hermes version
```

## シェル補完スクリプトの生成

```bash
hermes completion bash
hermes completion zsh
```

## トークン・コスト分析の表示

```bash
hermes insights
hermes insights --days 7
hermes insights --source telegram
```
