# Installation

各言語向け Stripe SDK のインストールコマンド。

## Node.js（npm）

```sh
npm install stripe
```

TypeScript 型定義はパッケージに同梱されている（`@types/stripe` は不要）。Node.js 18+ (LTS) が必要。

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
go get -u github.com/stripe/stripe-go/v86
```

Go 1.22+ が必要。

## PHP（Composer）

```sh
composer require stripe/stripe-php
```

PHP 7.2.0+ が必要。`curl`、`json`、`mbstring` 拡張が必要（Composer が自動解決）。

## Java（Gradle）

```groovy
implementation "com.stripe:stripe-java:33.0.0"
```

`build.gradle` の `dependencies` ブロックに追加する。Java 8, 11, 17, 21, 25 (LTS) に対応。

## Java（Maven）

```xml
<dependency>
  <groupId>com.stripe</groupId>
  <artifactId>stripe-java</artifactId>
  <version>33.0.0</version>
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

## Stripe CLI（macOS / Homebrew）

```sh
brew install stripe
```

## Stripe CLI（macOS / npm）

```sh
npm i -g @stripe/cli
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

## Stripe CLI（Docker）

```sh
docker run --rm -it stripe/stripe-cli:latest
```
