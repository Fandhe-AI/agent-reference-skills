# AI (Beta)

Source: https://lefthook.dev/configuration/ai/

`lefthook.yml` に直接 LLM エージェントの hooks を宣言できる beta 機能。インストール時に lefthook がプロバイダー固有の設定ファイルを生成し、AI ツールのイベント発火時に `lefthook run <hook>` を実行させる。

- **型:** Object（プロバイダー名 → イベント名 → lefthook フック名 のマップ）

## Signature / Usage

```yaml
# lefthook.yml

ai:
  claude:
    Stop: validate

validate:
  jobs:
    - run: go test ./...
```

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
- Generated hook commands use the `lefthook` config value when set. Otherwise they use plain `lefthook`, so it must be on `PATH` for the AI tool. If lefthook is installed as a project dependency, set `lefthook` to e.g. `npx lefthook` or `pnpm exec lefthook`. No machine-specific path is written, so the generated files can be committed and shared.
- This page covers lefthook's `ai:` setting, which generates the hooks config files (e.g. `.claude/settings.json`). The hooks APIs of Claude Code, Codex, Cursor and Copilot themselves are out of scope; see each provider's documentation (Claude Code hooks are covered by the anthropic-claude-code-extend skill).

## Related

- [Global Settings](./global-settings.md)
- [Hook Settings](./hook-settings.md)
