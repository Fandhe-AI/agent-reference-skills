---
source: https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization#implementation-example
---

# Authorization Server Setup (Keycloak)

Run a local Keycloak authorization server for testing an MCP server that requires OAuth tokens, and configure the server's OAuth settings.

Start Keycloak (development only):

```bash
docker run -p 127.0.0.1:8080:8080 -e KC_BOOTSTRAP_ADMIN_USERNAME=admin -e KC_BOOTSTRAP_ADMIN_PASSWORD=admin quay.io/keycloak/keycloak start-dev
```

Check the OIDC configuration:

```http
http://localhost:8080/realms/master/.well-known/openid-configuration
```

MCP server `.env` (values belong to the client created for the MCP server in Keycloak):

```env
# Server host/port
HOST=localhost
PORT=3000

# Auth server location
AUTH_HOST=localhost
AUTH_PORT=8080
AUTH_REALM=master

# Keycloak OAuth client credentials
OAUTH_CLIENT_ID=<YOUR_SERVER_CLIENT_ID>
OAUTH_CLIENT_SECRET=<YOUR_SERVER_CLIENT_SECRET>
```

Server configuration (TypeScript, start of the tutorial's server file):

```typescript
import "dotenv/config";
import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import cors from "cors";
import {
  mcpAuthMetadataRouter,
  getOAuthProtectedResourceMetadataUrl,
} from "@modelcontextprotocol/sdk/server/auth/router.js";
import { requireBearerAuth } from "@modelcontextprotocol/sdk/server/auth/middleware/bearerAuth.js";
import { OAuthMetadata } from "@modelcontextprotocol/sdk/shared/auth.js";
import { checkResourceAllowed } from "@modelcontextprotocol/sdk/shared/auth-utils.js";
const CONFIG = {
  host: process.env.HOST || "localhost",
  port: Number(process.env.PORT) || 3000,
  auth: {
    host: process.env.AUTH_HOST || process.env.HOST || "localhost",
    port: Number(process.env.AUTH_PORT) || 8080,
    realm: process.env.AUTH_REALM || "master",
    clientId: process.env.OAUTH_CLIENT_ID || "mcp-server",
    clientSecret: process.env.OAUTH_CLIENT_SECRET || "",
  },
};

function createOAuthUrls() {
  const authBaseUrl = new URL(
    `http://${CONFIG.auth.host}:${CONFIG.auth.port}/realms/${CONFIG.auth.realm}/`,
  );
  return {
    issuer: authBaseUrl.toString(),
    introspection_endpoint: new URL(
      "protocol/openid-connect/token/introspect",
      authBaseUrl,
    ).toString(),
    authorization_endpoint: new URL(
      "protocol/openid-connect/auth",
      authBaseUrl,
    ).toString(),
    token_endpoint: new URL(
      "protocol/openid-connect/token",
      authBaseUrl,
    ).toString(),
  };
}
```

## Notes

- Abridged: the tutorial's remaining server code (token introspection, protected resource metadata, tools; also Python and C# variants) is not reproduced; see the source URL. The Keycloak scope (`mcp:tools`), audience mapper (`http://localhost:3000`) and client registration steps are done in the Keycloak dashboard.
- The tutorial marks the Keycloak and fixed-audience configuration as not for production; the audience must be based on the client's `resource` parameter in real deployments. Never embed client credentials in code.
- Tutorial code is reproduced as published; SDK protocol-version support is not stated in the source (the code imports `isInitializeRequest` and exposes `Mcp-Session-Id`, which 2026-07-28 removes).
- This skill holds the spec-side requirements; concrete OAuth provider implementations are in better-auth (MCP plugin, oauth-provider) and supabase (OAuth server).
