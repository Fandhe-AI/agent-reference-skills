---
source: https://modelcontextprotocol.io/registry/quickstart
---

# mcp-publisher

Install, authentication, and publish commands for the `mcp-publisher` CLI, which publishes servers to the MCP Registry.

## Install mcp-publisher (macOS / Linux)

> **Warning**: This downloads a release binary and extracts it into the current directory. Review the download URL before running. Homebrew (below) is the simpler option.

```bash
curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher
```

Adapted (not in the official docs): the official one-liner ends with `&& sudo mv mcp-publisher /usr/local/bin/`. Split into extract and move, and move into a user-owned directory instead of using sudo. Assumes `${HOME}/.local/bin` is in PATH.

```bash
mkdir -p "${HOME}/.local/bin" && mv mcp-publisher "${HOME}/.local/bin/"
```

## Install mcp-publisher (Windows)

> **Warning**: This downloads a release binary, extracts it, and deletes the archive. Review the download URL before running.

```powershell
$arch = if ([System.Runtime.InteropServices.RuntimeInformation]::ProcessArchitecture -eq "Arm64") { "arm64" } else { "amd64" }; Invoke-WebRequest -Uri "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_windows_$arch.tar.gz" -OutFile "mcp-publisher.tar.gz"; tar xf mcp-publisher.tar.gz mcp-publisher.exe; rm mcp-publisher.tar.gz
# Move mcp-publisher.exe to a directory in your PATH
```

## Install mcp-publisher (Homebrew)

```bash
brew install mcp-publisher
```

## Verify the installation

```bash
mcp-publisher --help
```

The example output in the source lists `init` (create a server.json template), `login` (authenticate), `logout` (clear saved authentication), and `publish` (publish server.json).

## Create a server.json template

```bash
mcp-publisher init
```

Run this in the server project directory. After generation, make the `name` in `server.json` match `mcpName` in `package.json`.

## GitHub authentication

```bash
mcp-publisher login github
```

GitHub authentication requires the `name` in `server.json` to be in the form `io.github.username/*` (or `io.github.orgname/*`). Enter the code at `https://github.com/login/device` (device code flow).

## DNS authentication (Ed25519)

> **Warning**: This generates a private key (`key.pem`) and passes the private key value as a command argument. Do not commit the key, and watch for leaks into shell history and logs.

```bash
MY_DOMAIN="example.com"

# Generate public/private key pair using Ed25519
openssl genpkey -algorithm Ed25519 -out key.pem

# Generate TXT record
PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "${MY_DOMAIN}. IN TXT \"v=MCPv1; k=ed25519; p=${PUBLIC_KEY}\""
```

Add the TXT record at your DNS provider, then log in once it has propagated (this may take a few minutes).

```bash
MY_DOMAIN="example.com"

PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
mcp-publisher login dns --domain "${MY_DOMAIN}" --private-key "${PRIVATE_KEY}"
```

## HTTP authentication (Ed25519)

> **Warning**: This generates a private key (`key.pem`) and passes the private key value as a command argument. Do not commit the key.

```bash
# Generate public/private key pair using Ed25519
openssl genpkey -algorithm Ed25519 -out key.pem

# Generate mcp-registry-auth file
PUBLIC_KEY="$(openssl pkey -in key.pem -pubout -outform DER | tail -c 32 | base64)"
echo "v=MCPv1; k=ed25519; p=${PUBLIC_KEY}" > mcp-registry-auth
```

Host the generated `mcp-registry-auth` at `/.well-known/mcp-registry-auth` on your domain, then log in.

```bash
MY_DOMAIN="example.com"
PRIVATE_KEY="$(openssl pkey -in key.pem -noout -text | grep -A3 "priv:" | tail -n +2 | tr -d ' :\n')"
mcp-publisher login http --domain "${MY_DOMAIN}" --private-key "${PRIVATE_KEY}"
```

## Publish to the MCP Registry

> **Warning**: Publishing registers metadata in the MCP Registry (production, preview stage) and may not be easy to undo. Check the contents and version of `server.json` before running.

```bash
mcp-publisher publish
```

Run this while authenticated, in the server project directory that contains `server.json`.

## Verify the published result

```bash
curl "https://registry.modelcontextprotocol.io/v0.1/servers?search=io.github.my-username/weather"
```

`io.github.my-username/weather` is the example from the source. Replace it with your own server name.

## Notes

- Source: `registry/quickstart.mdx` / `registry/authentication.mdx` (tag `2026-07-28` raw); the unversioned site path `registry/` was fetched 2026-10-16.
- The source one-liner is `curl -L ... | tar xz mcp-publisher && sudo mv mcp-publisher /usr/local/bin/`. To avoid routine `sudo`, this skill splits it into extract and move, and moves into the user-owned `${HOME}/.local/bin/` instead.
- The MCP Registry is in preview; breaking changes or data resets may occur before GA (per the source).
- DNS / HTTP authentication via Google KMS / Azure Key Vault (using `gcloud` / `az`) is long and not included. See `registry/authentication.mdx` in the source.
- Publishing the package to npm (`npm adduser` / `npm publish --access public`) follows npm's procedure and is listed in the source as a prerequisite for `mcp-publisher`.
