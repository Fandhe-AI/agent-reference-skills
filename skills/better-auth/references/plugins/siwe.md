# Sign In With Ethereum (SIWE)

A plugin that enables user authentication with Ethereum wallets based on the ERC-4361 standard. It supports custom message verification and nonce generation.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { siwe } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        siwe({
            domain: "example.com",
            emailDomainName: "example.com",
            anonymous: true
        })
    ]
})
```

Migration:

```bash
npx auth migrate
# or
npx auth generate
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { siweClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [siweClient()]
})
```

### Generate nonce

```typescript
const nonce = await authClient.siwe.nonce({
    address: walletAddress,
    chainId: 1  // optional
})
```

### Verify signature

```typescript
await authClient.siwe.verify({
    message,
    signature,
    address: walletAddress,
    chainId: 1,  // optional
    email: "user@example.com"  // optional
})
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `domain` | string | The application's domain name (required) |
| `emailDomainName?` | string | Email domain used for non-anonymous accounts |
| `anonymous?` | boolean | Allow sign-up without an email (default: true) |
| `getNonce?` | function | Custom nonce generation function |
| `verifyMessage?` | function | Custom message verification function |
| `ensLookup?` | function | ENS name/avatar lookup (optional) |

### DB schema (walletAddress table)

| Field | Type | Description |
|---|---|---|
| `id` | string | Primary key |
| `userId` | string | User ID |
| `address` | string | Ethereum wallet address |
| `chainId` | number | Chain ID |
| `isPrimary` | boolean | Primary wallet flag |
| `createdAt` | Date | Creation timestamp |

## Notes

- Supported chains: Ethereum mainnet (chainId: 1, default), Polygon (137), Arbitrum (42161), Base (8453)

## Related

- [passkey.md](./passkey.md)
- [anonymous.md](./anonymous.md)
