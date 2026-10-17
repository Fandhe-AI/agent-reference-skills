---
source: https://docs.docker.com/engine/cli/completion/
---

# Completion

Generate a shell completion script with `docker completion` for word completion of commands, flags, and Docker objects (such as container and volume names) on `<Tab>`. Supported shells: Bash, Zsh, fish.

## Signature / Usage

```console
$ mkdir -p ~/.local/share/bash-completion/completions
$ docker completion bash > ~/.local/share/bash-completion/completions/docker
```

```console
$ mkdir -p ~/.docker/completions
$ docker completion zsh > ~/.docker/completions/_docker
```

```console
$ mkdir -p ~/.config/fish/completions
$ docker completion fish > ~/.config/fish/completions/docker.fish
```

## Notes

- Bash: install the `bash-completion` package first (`sudo apt install bash-completion`; Homebrew `brew install bash-completion@2` for Bash 4+, `brew install bash-completion` for older; `sudo pacman -S bash-completion`), then source it from `.bashrc` (Linux: `. /etc/bash_completion` if present) or `.bash_profile` (macOS Homebrew: `"$(brew --prefix)/etc/profile.d/bash_completion.sh"`).
- Zsh: store the script in `~/.oh-my-zsh/completions/_docker` if you use Oh My Zsh. Otherwise store it in a directory of your choice and add it to `FPATH` in `.zshrc`:

```console
$ cat <<"EOT" >> ~/.zshrc
FPATH="$HOME/.docker/completions:$FPATH"
autoload -Uz compinit
compinit
EOT
```

- fish: supports completion natively; copy or symlink the script into its `completions/` directory.

## Related

- [Docker CLI (docker)](../cli-image-system/docker.md)
