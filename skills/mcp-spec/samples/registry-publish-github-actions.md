---
source: https://modelcontextprotocol.io/registry/github-actions
---

# Publish to the MCP Registry with GitHub Actions

Workflow that publishes an npm package and then the server to the MCP Registry on version tags, using GitHub OIDC.

`.github/workflows/publish-mcp.yml`:

```yaml
name: Publish to MCP Registry

on:
  push:
    tags: ["v*"] # Triggers on version tags like v1.0.0

jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      id-token: write # Required for OIDC authentication
      contents: read

    steps:
      - name: Checkout code
        uses: actions/checkout@fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09 # v5

      ### Publish underlying npm package:

      - name: Set up Node.js
        uses: actions/setup-node@a0853c24544627f65ddf259abe73b1d18a591444 # v5
        with:
          node-version: "lts/*"
          registry-url: "https://registry.npmjs.org"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test --if-present

      - name: Build package
        run: npm run build --if-present

      - name: Publish package to npm
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      ### Publish MCP server:

      - name: Install mcp-publisher
        run: |
          curl -L "https://github.com/modelcontextprotocol/registry/releases/latest/download/mcp-publisher_$(uname -s | tr '[:upper:]' '[:lower:]')_$(uname -m | sed 's/x86_64/amd64/;s/aarch64/arm64/').tar.gz" | tar xz mcp-publisher

      - name: Authenticate to MCP Registry
        run: ./mcp-publisher login github-oidc

      # Optional:
      # - name: Set version in server.json
      #   run: |
      #     VERSION=${GITHUB_REF#refs/tags/v}
      #     jq --arg v "$VERSION" '.version = $v' server.json > server.tmp && mv server.tmp server.json

      - name: Publish server to MCP Registry
        run: ./mcp-publisher publish
```

Trigger it:

```bash
git tag v1.0.0
git push origin v1.0.0
```

## Notes

- Source: tag `2026-07-28` raw `docs/registry/github-actions.mdx`, retrieved 2026-10-16 (the site path is unversioned). The source also has PAT (`./mcp-publisher login github --token ${{ secrets.MCP_GITHUB_TOKEN }}`) and DNS (`./mcp-publisher login dns --domain example.com --private-key ${{ secrets.MCP_PRIVATE_KEY }}`) variants; only the recommended OIDC workflow is reproduced.
- Changes from the official example: `registry-url` added to `setup-node` so that `NODE_AUTH_TOKEN` is written into `.npmrc`; third-party actions pinned to commit SHAs (`# v5` marks the tag).
- The install step downloads a release binary with `curl ... | tar xz`; review it before running. The MCP Registry is marked as preview in the source.
- The package registry secret (`NPM_TOKEN` here) is separate from MCP Registry authentication; OIDC needs `id-token: write` and no dedicated secret.
- Package verification requirements are in the registry package-types page of this skill.
