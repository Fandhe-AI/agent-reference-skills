# Install

better-auth パッケージのインストールと初期シークレット生成。

## パッケージのインストール（npm）

```sh
npm install better-auth
```

## パッケージのインストール（pnpm）

```sh
pnpm add better-auth
```

## パッケージのインストール（yarn）

```sh
yarn add better-auth
```

## パッケージのインストール（bun）

```sh
bun install better-auth
```

## シークレットキーの生成（openssl）

```sh
openssl rand -base64 32
```

32文字以上の高エントロピーな文字列を生成する。`.env` の `BETTER_AUTH_SECRET` に設定する。

## シークレットキーの生成（CLI）

```sh
npx auth@latest secret
```

Better Auth CLI でシークレットキーを生成する。
