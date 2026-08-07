# AI (Beta)

Source: https://lefthook.dev/configuration/ai/

`lefthook.yml` に直接 LLM エージェントの hooks を宣言できる beta 機能。インストール時に lefthook がプロバイダー固有の設定ファイルを生成し、AI ツールのイベント発火時に `lefthook run <hook>` を実行させる。

- **型:** Object（プロバイダー名 → イベント名 → lefthook フック名 のマップ）

## サポートされるプロバイダー

| Provider | 生成されるファイル | 対象 |
| --- | --- | --- |
| `claude` | `.claude/settings.json` | Claude Code hooks |
| `codex` | `.codex/hooks.json` | Codex CLI hooks |
| `cursor` | `.cursor/hooks.json` | Cursor hooks |
| `copilot` | `.github/hooks/lefthook.json` | GitHub Copilot hooks |

各プロバイダー配下のキーは、そのプロバイダーがサポートするフックイベント名でなければならない。サポートされるイベントとその挙動は各プロバイダーの hooks ドキュメント（Claude Code hooks、Codex CLI hooks、Cursor hooks、GitHub Copilot hooks）を参照すること。

```yaml
# lefthook.yml

ai:
  claude:
    Stop: validate
    PreToolUse: security-check
  codex:
    Stop: validate
  cursor:
    stop: validate
    preToolUse: security-check
  copilot:
    postToolUse: validate

validate:
  jobs:
    - run: go test ./...

security-check:
  jobs:
    - run: ./scripts/security.sh
```

上記の例では、Claude の `Stop` イベントで `validate` フックを、`PreToolUse` イベントで `security-check` フックを実行するよう設定ファイルが生成される。

## Notes

- beta 機能であり、今後変更される可能性がある
- **Claude / Codex / Cursor:** ユーザーが手動で追加したエントリを保持する。`lefthook install` 実行時に lefthook が管理するエントリのみ最新の設定から再生成され、`lefthook uninstall` 実行時は lefthook 管理エントリのみ削除されユーザーエントリは残る
- **Copilot:** 挙動が異なる。`lefthook install` は `.github/hooks/lefthook.json` を完全に書き換え、`lefthook uninstall` はファイルごと削除する
- 生成されるコマンドは設定済みの `lefthook` パス、またはインストールを実行したバイナリの絶対パスを使用する。そのため AI ツールが `PATH` 上に `lefthook` を持たなくても動作する
- このページは lefthook の `ai:` 設定（`.claude/settings.json` 等の hooks 設定ファイルを生成する側）を扱う。Claude Code や Codex 自体の hooks API 仕様は対象外（生成先のドキュメントを参照）

## Related

- [Global Settings](./global-settings.md)
- [Hook Settings](./hook-settings.md)
