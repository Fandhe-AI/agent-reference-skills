# CLI

ZMK CLI (`zmk`) コマンドリファレンス。設定リポジトリ・キーボード・モジュールの管理。

## 設定リポジトリの初期化

```sh
zmk init
```

GitHub 認証とリポジトリ作成をインタラクティブに実行する。事前に `gh auth login` が必要。

## 既存リポジトリのパス設定

```sh
zmk config user.home "/path/to/zmk-config"
```

## キーボードの追加

```sh
zmk keyboard add
```

## キーボードの削除

```sh
zmk keyboard remove
```

## 対応ハードウェア一覧の表示

```sh
zmk keyboard list
```

## 新規カスタムキーボードのボイラープレート生成

```sh
zmk keyboard new
```

## モジュールの追加

```sh
zmk module add <url>
```

## 利用可能モジュール一覧の表示

```sh
zmk module list
```

## キーマップ・設定ファイルをエディタで開く

```sh
zmk code
```

特定キーボードのファイルのみ開く場合:

```sh
zmk code <keyboard>
```

## GitHub Actions ページを開いてファームウェアをダウンロード

```sh
zmk download
```

エイリアス: `zmk dl`

## 設定のコミットとプッシュ

```sh
zmk cd
git add .
git commit -m "Update keymap"
git push
```
