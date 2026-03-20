# Arch Linux でのインストール

Source: https://lefthook.dev/installation/arch

## AUR パッケージの選択肢

Arch User Repository (AUR) には2つのパッケージが用意されています。

1. **lefthook** - ソースコードからコンパイルしてインストール
2. **lefthook-bin** - コンパイル済みバイナリをインストール

## インストールコマンド

`yay` AUR ヘルパーを使用する場合:

```bash
# ソースからコンパイルする場合
yay -S lefthook

# コンパイル済みバイナリをインストールする場合
yay -S lefthook-bin
```

## パッケージの違い

- **ソースビルド版 (lefthook)**: インストール時にコンパイルが必要ですが、最新のソースからビルドされます
- **バイナリ版 (lefthook-bin)**: コンパイル済みのバイナリを使用するため、インストールが高速です
