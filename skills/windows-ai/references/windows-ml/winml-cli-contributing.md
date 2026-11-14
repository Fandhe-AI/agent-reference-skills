# Contributing to Windows ML CLI (winml-cli)

Quick reference for setting up a development checkout of `microsoft/winml-cli`, running tests and lint, and contributing to the Learn documentation.

## Signature / Usage

```powershell
# Clone and set up
git clone https://github.com/microsoft/winml-cli.git
cd winml-cli
uv sync
uv run pre-commit install

# Download runtime check rules (required for `winml analyze`)
gh release download <tag> --repo microsoft/winml-cli --pattern 'rules-v*.zip' --dir .
Expand-Archive -Path .\rules-v*.zip -DestinationPath src\winml\modelkit\analyze\rules\runtime_check_rules -Force

# Run tests
uv run pytest tests/ -m "not e2e and not npu and not gpu"

# Lint and format
uv run ruff check src/ tests/ --fix
uv run ruff format src/ tests/
```

## Notes

- The full contributing guide (development setup, coding conventions, testing, PR checklist, CLA) is `CONTRIBUTING.md` in the repository root.
- The Windows ML CLI documentation in Microsoft Learn lives in the Windows AI documentation repository, separately from the CLI implementation. Use the edit link on the Learn article or coordinate with the Windows AI docs team for repository access.
- When changing CLI behavior, update the corresponding command reference, concepts, and examples in the documentation as part of the same release workflow. Don't use the CLI repository's old MkDocs publishing commands to publish Learn content.
- Source: https://learn.microsoft.com/en-us/windows/ai/new-windows-ml/command-line/contributing (retrieved 2026-11-14)

## Related

- [Install Windows ML CLI (winml-cli)](./winml-cli-installation.md)
- [Use Windows ML CLI (winml-cli) with AI Agents](./winml-cli-agent-skill.md)
- [Windows ML CLI (winml-cli) Overview](./winml-cli.md)
