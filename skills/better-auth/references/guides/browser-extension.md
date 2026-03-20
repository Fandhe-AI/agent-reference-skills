# Browser Extension Guide

ブラウザ拡張機能での Better Auth の使用方法。Plasmo フレームワークを使用して Better Auth と統合するブラウザ拡張機能の作成ガイド。

## 概要

This guide helps developers create browser extensions using Plasmo framework integrated with Better Auth for authentication. The guide assumes you have "a backend setup of Better Auth and are ready to create a browser extension to connect to it."

## 手順

### 1. Setup & Installation

Initialize a new Plasmo project with specific configuration:

```bash
pnpm create plasmo --with-tailwindcss --with-src
```

Install the Better Auth package:

```bash
pnpm install better-auth
```

Start the development server:

```bash
pnpm dev
```

### 2. TypeScript Configuration

Configure `tsconfig.json` with strict mode enabled. The example changes the import alias from `~` to `@`:

```json
{
    "compilerOptions": {
        "paths": {
            "@/*": ["./src/*"]
        },
        "strict": true,
        "baseUrl": "."
    }
}
```

### 3. Client Authentication Setup

Create `src/auth/auth-client.ts`:

```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [],
});
```

Replace the baseURL with your actual Better Auth backend address.

### 4. Manifest Configuration

Update `package.json` to include host permissions:

```json
{
    "manifest": {
        "host_permissions": [
            "https://URL_TO_YOUR_BACKEND"
        ]
    }
}
```

### 5. Implementation Example

The guide provides a popup component example:

```typescript
import { authClient } from "./auth/auth-client"

function IndexPopup() {
    const {data, isPending, error} = authClient.useSession();
    if(isPending){
        return <>Loading...</>
    }
    if(error){
        return <>Error: {error.message}</>
    }
    if(data){
        return <>Signed in as {data.user.name}</>
    }
}
```

### 6. Production Build

Generate a production build:

```bash
pnpm build
```

Load the extension in Chrome by navigating to `chrome://extensions`, enabling developer mode, and selecting the `build/chrome-mv3-prod` directory.

### 7. Server-Side Configuration

Find your extension ID at `chrome://extensions` and add it to the server's `trustedOrigins`:

```typescript
export const auth = betterAuth({
    trustedOrigins: ["chrome-extension://YOUR_EXTENSION_ID"],
})
```

For multiple extensions, use wildcard patterns (less secure):

```typescript
trustedOrigins: [
    "chrome-extension://YOUR_EXTENSION_ID",
    "chrome-extension://*"
]
```

## 注意点

- Wildcards reduce security by trusting all extensions and are not recommended for production — use explicit listing instead
- A completed example is available in the Better Auth GitHub repository
- Review the Plasmo documentation for framework-specific details
- Open issues on the Better Auth GitHub for support
