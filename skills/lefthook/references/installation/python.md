# Python でのインストール

Source: https://lefthook.dev/installation/python

## インストール方法

### pip（標準）

```
python -m pip install --user lefthook
```

現在のユーザー向けにパッケージをローカルインストールします。

### uv

```
uv add --dev lefthook
```

開発依存として統合する方法です。

### pipx

```
pipx install lefthook
```

コマンドラインツールとして分離された環境にインストールする方法です。
