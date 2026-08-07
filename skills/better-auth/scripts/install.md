# Install

Installing the better-auth package and generating an initial secret.

## Install the package (npm)

```sh
npm install better-auth
```

## Install the package (pnpm)

```sh
pnpm add better-auth
```

## Install the package (yarn)

```sh
yarn add better-auth
```

## Install the package (bun)

```sh
bun install better-auth
```

## Generate a secret key (openssl)

```sh
openssl rand -base64 32
```

Generates a high-entropy string of 32+ characters. Set it as `BETTER_AUTH_SECRET` in `.env`.

## Generate a secret key (CLI)

```sh
npx auth@latest secret
```

Generates a secret key using the Better Auth CLI.
