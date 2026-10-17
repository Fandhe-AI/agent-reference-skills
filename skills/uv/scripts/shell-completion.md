---
source: https://docs.astral.sh/uv/getting-started/installation/#shell-autocompletion
---

# Shell Completion

Commands to enable shell completion for uv and uvx. Run `echo $SHELL` to check which shell you use. After setup, restart the shell or source the configuration file.

> **Warning**: The commands below append to shell configuration files such as `~/.bashrc` (for fish, they overwrite the completion file with `>`). Check your existing configuration before running them.

## uv completion (Bash)

```sh
echo 'eval "$(uv generate-shell-completion bash)"' >> ~/.bashrc
```

## uv completion (Zsh)

```sh
echo 'eval "$(uv generate-shell-completion zsh)"' >> ~/.zshrc
```

## uv completion (fish)

```sh
echo 'uv generate-shell-completion fish | source' > ~/.config/fish/completions/uv.fish
```

## uv completion (Elvish)

```sh
echo 'eval (uv generate-shell-completion elvish | slurp)' >> ~/.elvish/rc.elv
```

## uv completion (PowerShell / pwsh)

```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
Add-Content -Path $PROFILE -Value '(& uv generate-shell-completion powershell) | Out-String | Invoke-Expression'
```

## uvx completion (Bash)

```sh
echo 'eval "$(uvx --generate-shell-completion bash)"' >> ~/.bashrc
```

## uvx completion (Zsh)

```sh
echo 'eval "$(uvx --generate-shell-completion zsh)"' >> ~/.zshrc
```

## uvx completion (fish)

```sh
echo 'uvx --generate-shell-completion fish | source' > ~/.config/fish/completions/uvx.fish
```

## uvx completion (Elvish)

```sh
echo 'eval (uvx --generate-shell-completion elvish | slurp)' >> ~/.elvish/rc.elv
```

## uvx completion (PowerShell / pwsh)

```powershell
if (!(Test-Path -Path $PROFILE)) {
  New-Item -ItemType File -Path $PROFILE -Force
}
Add-Content -Path $PROFILE -Value '(& uvx --generate-shell-completion powershell) | Out-String | Invoke-Expression'
```

## Generate a completion script

```sh
uv generate-shell-completion <SHELL>
```

`SHELL` is the target shell for the generated script (`https://docs.astral.sh/uv/reference/cli/#uv-generate-shell-completion`).
