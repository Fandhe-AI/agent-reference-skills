# Editor Plugins

エディタープラグインのインストール。ネイティブサポート済みエディター（VS Code, Vim, Neovim, IntelliJ IDEA 等）はプラグイン不要。

## Vim プラグインのインストール（Vim 8 組み込みパッケージ）

```sh
mkdir -p ~/.vim/pack/local/start
cd ~/.vim/pack/local/start
git clone https://github.com/editorconfig/editorconfig-vim.git
```

## Vim プラグインのインストール（Vundle）

`.vimrc` に以下を追加する。

```vim
Plugin 'editorconfig/editorconfig-vim'
```

その後 Vim 内で実行する。

```vim
:PluginInstall
```

## Vim プラグインのインストール（vim-plug）

`.vimrc` に以下を追加する。

```vim
Plug 'editorconfig/editorconfig-vim'
```

その後 Vim 内で実行する。

```vim
:source $MYVIMRC
:PlugInstall
```

## Vim プラグインのドキュメント参照

```vim
:help editorconfig
```

```vim
:helptags ALL
```
