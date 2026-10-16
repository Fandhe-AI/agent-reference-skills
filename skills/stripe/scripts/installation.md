# Installation

各言語向け Stripe SDK のインストールコマンド。

## Node.js（npm）

```sh
npm install stripe
```

TypeScript 型定義はパッケージに同梱されている（`@types/stripe` は不要）。Node.js 20+（LTS 版）が必要。

## Node.js（yarn）

```sh
yarn add stripe
```

## Python

```sh
pip install --upgrade stripe
```

Python 3.9+ が必要。

## Python（非同期サポートあり）

```sh
pip install stripe[async]
```

## Ruby（gem）

```sh
gem install stripe
```

## Ruby（Bundler）

```sh
# Gemfile に追加
bundle add stripe
```

## Go

```sh
go get -u github.com/stripe/stripe-go/v87
```

Go 1.24+ が必要。

## PHP（Composer）

```sh
composer require stripe/stripe-php
```

PHP 7.4+ が必要。`curl`、`json`、`mbstring` 拡張が必要（Composer が自動解決）。

## Java（Gradle）

```groovy
implementation "com.stripe:stripe-java:34.0.0"
```

`build.gradle` の `dependencies` ブロックに追加する。Java 8, 11, 17, 21, 25 (LTS) に対応。

## Java（Maven）

```xml
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>34.0.0</version>
</dependency>
```

`pom.xml` の `<dependencies>` に追加する。

## .NET（dotnet CLI）

```sh
dotnet add package Stripe.net
```

## .NET（NuGet CLI）

```sh
nuget install Stripe.net
```

## .NET（Package Manager Console）

```sh
Install-Package Stripe.net
```

## Stripe CLI（npm / macOS・Linux・Windows 共通）

```sh
npm install -g @stripe/cli
```

Node.js 18 以上が必要（stripe-cli v1.53.1 の README 記載）。`PATH` に追加せず一度だけ実行する場合は次の形式を使う。

```sh
npx @stripe/cli login
```

## Stripe CLI の自動アップデート無効化

```sh
export STRIPE_NO_AUTO_UPDATE=1
```

インストールスクリプトで導入した CLI は自動アップデートが既定で有効（同一メジャーバージョン内）。環境変数 `STRIPE_NO_AUTO_UPDATE=1` のほか、`~/.config/stripe/config.toml` に `auto_update = false` を追加しても無効化できる。

## Stripe CLI（macOS / Homebrew）

```sh
brew install stripe
```

## Stripe CLI（Windows / winget）

```sh
winget install Stripe.StripeCLI
```

## Stripe CLI（Windows / Scoop）

```sh
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

## Stripe CLI（Linux / apt）

```sh
curl -s https://packages.stripe.dev/api/security/keypair/stripe-cli-gpg/public | gpg --dearmor | sudo tee /usr/share/keyrings/stripe.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/stripe.gpg] https://packages.stripe.dev/stripe-cli-debian-local stable main" | sudo tee -a /etc/apt/sources.list.d/stripe.list
sudo apt update
sudo apt install stripe
```

## Stripe CLI（Linux / yum）

```sh
echo -e "[Stripe]\nname=stripe\nbaseurl=https://packages.stripe.dev/stripe-cli-rpm-local/\nenabled=1\ngpgcheck=0" >> /etc/yum.repos.d/stripe.repo
sudo yum install stripe
```

> **セキュリティ注記**: `gpgcheck=0` は Stripe 公式手順のままだが、GPG 署名検証が無効になる。これにより、パッケージの改ざんを検知できないリスクがある。より厳格な環境では、Stripe の GPG 公開鍵をインポートしたうえで `gpgcheck=1` に変更することを推奨する。
> (Note: `gpgcheck=0` disables GPG signature verification per Stripe's official instructions. For stricter security, import Stripe's GPG key and set `gpgcheck=1`.)

## Stripe CLI（Docker）

```sh
docker run --rm -it stripe/stripe-cli:latest
```
