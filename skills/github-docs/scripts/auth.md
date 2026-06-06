# Auth

GitHub CLI の認証・設定コマンド。

## ログイン

```sh
gh auth login
```

対話形式でアカウント種別（GitHub.com / GitHub Enterprise Server）・プロトコル（HTTPS / SSH）・認証方式（ブラウザ / トークン）を選択する。

## 認証状態の確認

```sh
gh auth status
```

## アカウントの切り替え（マルチアカウント）

```sh
gh auth switch
```

## ログアウト

```sh
gh auth logout
```

## SSH キーの生成（Ed25519 推奨）

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

## SSH キーの生成（RSA、レガシーシステム向け）

```sh
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

## SSH エージェントへのキー追加（macOS）

```sh
eval "$(ssh-agent -s)"
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

## SSH エージェントへのキー追加（Linux）

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

## 公開鍵のクリップボードコピー（macOS）

```sh
pbcopy < ~/.ssh/id_ed25519.pub
```

## 公開鍵のクリップボードコピー（Linux）

```sh
xclip -selection clipboard < ~/.ssh/id_ed25519.pub
```

## GitHub への SSH 接続テスト

```sh
ssh -T git@github.com
```

成功時のメッセージ: `Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.`

## Git のデフォルトプロトコルを SSH に変更

```sh
gh config set git_protocol ssh
```

## エディタの設定

```sh
gh config set editor "code --wait"
```

## ブラウザの設定

```sh
gh config set browser "firefox"
```
