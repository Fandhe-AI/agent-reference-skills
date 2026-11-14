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

- 取得日: 2026-11-14。Vim プラグインは editorconfig-vim の最新タグ v1.2.1（`3c2813f`）の README の記載（Vim 8 package・Vundle・vim-plug）に基づく。
- `:help editorconfig` と `:helptags ALL` は同 README にある（`:helptags ALL` は Vim が editorconfig.txt を認識するために必要な場合がある）。
- ネイティブサポート済み・プラグイン要のエディタ一覧は editorconfig.org トップページが一次情報。
- Source: https://github.com/editorconfig/editorconfig-vim/blob/v1.2.1/README.md （取得日 2026-11-14）
- Source: https://editorconfig.org/ （取得日 2026-11-14）

## Related

- [install](./install.md) — コアのインストール
