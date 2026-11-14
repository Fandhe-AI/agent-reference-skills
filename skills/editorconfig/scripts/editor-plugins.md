# Editor Plugins

エディタープラグインのインストール。ネイティブサポート済みエディター（VS Code, Vim, Neovim, IntelliJ IDEA 等）はプラグイン不要。

## Signature / Usage

### Vim プラグインのインストール（Vim 8 組み込みパッケージ）

```sh
mkdir -p ~/.vim/pack/local/start
cd ~/.vim/pack/local/start
git clone https://github.com/editorconfig/editorconfig-vim.git
```

### Vim プラグインのインストール（Vundle）

`.vimrc` に以下を追加する。

```vim
Plugin 'editorconfig/editorconfig-vim'
```

その後 Vim 内で実行する。

```vim
:PluginInstall
```

### Vim プラグインのインストール（vim-plug）

`.vimrc` に以下を追加する。

```vim
Plug 'editorconfig/editorconfig-vim'
```

その後 Vim 内で実行する。

```vim
:source $MYVIMRC
:PlugInstall
```

### Vim プラグインのドキュメント参照

```vim
:help editorconfig
```

```vim
:helptags ALL
```

## Notes

- The Vim plugin steps (Vim 8 package, Vundle, vim-plug) follow the README of editorconfig-vim v1.2.1 (`3c2813f`, latest tag), fetched 2026-11-14.
- `:help editorconfig` and `:helptags ALL` are in the same README (`:helptags ALL` may be needed so that Vim knows editorconfig.txt).
- The editorconfig.org front page is the primary source for which editors support EditorConfig natively and which need a plugin.
- Source: https://github.com/editorconfig/editorconfig-vim/blob/v1.2.1/README.md (fetched 2026-11-14)
- Source: https://editorconfig.org/ (fetched 2026-11-14)

## Related

- [install](./install.md) — Installing the cores
