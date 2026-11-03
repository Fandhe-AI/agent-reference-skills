---
source: https://developers.cloudflare.com/workers/wrangler/install-and-update/
---

# Install and Auth

Install or update Wrangler, check the version, and authenticate (OAuth login, auth token, `whoami`). All flags: see [../references/commands/README.md](../references/commands/README.md).

## Install Wrangler in a project

```sh
npm i -D wrangler@latest
```

Wrangler is installed locally per project. If it is not installed, `npx wrangler` uses the latest version.

## Check the Wrangler version

```sh
npx wrangler --version
# or
npx wrangler -v
```

## Update Wrangler

```sh
npm i -D wrangler@latest
```

## Upgrade within Wrangler v4

```sh
npm i -D wrangler@4
```

Source: https://developers.cloudflare.com/workers/wrangler/migration/update-v3-to-v4/

## Log in with OAuth

```sh
npx wrangler login
```

If the browser cannot open, copy the printed URL into a browser. Uses all scopes by default.

## Log in with chosen scopes

```sh
npx wrangler login --scopes account:read user:read
```

List the available scopes with `npx wrangler login --scopes-list`.

## Log in without a local callback server

```sh
npx wrangler login --device
```

Uses the OAuth 2.0 Device Authorization Grant. Cannot be combined with `--callback-host` / `--callback-port`.

## Log in inside a container

```sh
# When starting your container
docker run -p 8976:8976 <your-image>

# Inside the container
npx wrangler login --callback-host=0.0.0.0
```

For a different in-container port: `docker run -p 8976:9000 <your-image>` then `npx wrangler login --callback-host=0.0.0.0 --callback-port=9000`.

## Store OAuth credentials in the OS keychain

```sh
npx wrangler login --use-keyring
```

Opt out with `npx wrangler login --no-use-keyring`.

> **Warning**: opting out deletes the encrypted credentials file and the keychain entry; you must log in again.

## Override keychain use for one command

```sh
CLOUDFLARE_AUTH_USE_KEYRING=true npx wrangler deploy
```

## Show the current user and credential storage

```sh
npx wrangler whoami
```

Add `--json` for JSON output (exits non-zero when not authenticated) or `--account <ID_OR_NAME>` for a specific account.

## Print the current auth token

```sh
npx wrangler auth token
```

Add `--json` to get the token type (also required to retrieve API key/email credentials).

## Log out

```sh
npx wrangler logout
```

> **Warning**: invalidates the current OAuth token and deletes stored credentials. If you authenticate with `CLOUDFLARE_API_TOKEN`, delete the token in the Cloudflare dashboard instead.

## Deploy before authentication is available (AI agents)

```sh
npx wrangler deploy --temporary
```

Requires Wrangler 4.102.0 or later. Prints a claim URL valid for 60 minutes; errors if OAuth, `CLOUDFLARE_API_TOKEN`, or a global API key is already usable.
