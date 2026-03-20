# SSH キー (SSH Keys)

SSH プロトコルを使用して GitHub に安全に接続する方法です。SSH キーを使うことで、毎回ユーザー名とパスワード（またはトークン）を入力する必要がなくなります。

## 仕組み

SSH 認証は公開鍵暗号方式に基づいています。秘密鍵をローカルマシンに保持し、対応する公開鍵を GitHub アカウントに登録することで認証を行います。

## SSH キーの生成

### Ed25519（推奨）

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### RSA（レガシーシステム向け）

```bash
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
```

### ハードウェアセキュリティキー

```bash
# Ed25519-SK（推奨）
ssh-keygen -t ed25519-sk -C "your_email@example.com"

# ECDSA-SK（Ed25519-SK がサポートされない場合）
ssh-keygen -t ecdsa-sk -C "your_email@example.com"
```

プロンプトが表示されたら、デフォルトのファイルパスを受け入れるか、カスタムパスを指定します。パスフレーズの設定も推奨されます。

## SSH エージェントへの追加

### macOS

```bash
# ssh-agent を起動
eval "$(ssh-agent -s)"

# ~/.ssh/config を編集
# 以下の内容を追加:
# Host github.com
#   AddKeysToAgent yes
#   UseKeychain yes
#   IdentityFile ~/.ssh/id_ed25519

# キーを追加
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

> パスフレーズを設定していない場合は `UseKeychain` 行を省略できます。

### Linux

```bash
# ssh-agent を起動
eval "$(ssh-agent -s)"

# キーを追加
ssh-add ~/.ssh/id_ed25519
```

### Windows

```powershell
# 管理者権限の PowerShell で ssh-agent を有効化
Get-Service -Name ssh-agent | Set-Service -StartupType Manual
Start-Service ssh-agent

# 通常のターミナルでキーを追加
ssh-add c:/Users/YOU/.ssh/id_ed25519
```

Git がパスフレーズを求め続ける場合:

```powershell
git config --global core.sshCommand "C:/Windows/System32/OpenSSH/ssh.exe"
```

## GitHub アカウントへの公開鍵の追加

1. 公開鍵の内容をクリップボードにコピー:
   ```bash
   # macOS
   pbcopy < ~/.ssh/id_ed25519.pub

   # Linux (xclip が必要)
   xclip -selection clipboard < ~/.ssh/id_ed25519.pub

   # Windows
   clip < ~/.ssh/id_ed25519.pub
   ```
2. GitHub にログインし、**Settings** > **SSH and GPG keys** に移動
3. **New SSH key** をクリック
4. タイトルを入力し、Key type で「Authentication Key」を選択
5. 公開鍵を貼り付けて **Add SSH key** をクリック

## 接続テスト

```bash
ssh -T git@github.com
```

成功すると以下のメッセージが表示されます:

```
Hi USERNAME! You've successfully authenticated, but GitHub does not provide shell access.
```

## SSH キーの管理

- **定期的な確認**: 使用していないキーや侵害された可能性のあるキーを削除する
- **自動削除**: GitHub は 1 年間使用されていない SSH キーを自動的に削除する
- **パスフレーズ保護**: セキュリティ強化のためパスフレーズの設定を推奨

## SAML SSO 環境での使用

SAML SSO を使用する組織のリソースにアクセスする場合、SSH キーを組織用に認可する必要があります。

**Settings** > **SSH and GPG keys** から対象のキーの **Configure SSO** をクリックし、対象組織を認可してください。

## 参考リンク

- [About SSH - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/about-ssh)
- [Generating a new SSH key - GitHub Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
