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
const { data } = await authClient.siwe.nonce()
// data.nonce
```

The nonce is not bound to a wallet address or Chain ID (one-step wallet flows may not know either until the wallet signs).

### Verify signature

```typescript
await authClient.siwe.verify({
    message,   // a valid ERC-4361 message
    signature, // "0x..." from the wallet
    email: "user@example.com"  // optional, required if anonymous is false
})
```

Before accepting the signature, the plugin parses the message, consumes the matching server-issued nonce, derives the address and Chain ID from the signed message, requires the signed domain to match the configured `domain`, and honors `Expiration Time` / `Not Before`. Verification fails with a 401 (`UNAUTHORIZED_SIWE_MESSAGE_MISMATCH`) if any signed field is invalid. A SIWE signature proves control of the wallet, not ownership of `email`: the email is stored unverified and bound only when not already in use; when `anonymous` is `false` and the email belongs to another account, a wallet-derived address is used instead.

### Chain-Specific Messages

Chain selection belongs in the ERC-4361 message, not in the verification request body. Build the SIWE message with the wallet address, target Chain ID, and the issued nonce, have the wallet sign that exact message, then verify it. The signed message must include a positive Chain ID or verification fails with a 401.

```typescript
const nonce = await authClient.siwe.nonce()

const { data, error } = await authClient.siwe.verify({
  // The signed message contains the wallet address, Chain ID: 137, and Nonce: nonce.data?.nonce
  message,
  signature,
})
```

## Options / Props

| Property | Type | Description |
|---|---|---|
| `domain` | string | The application's domain name (required) |
| `emailDomainName?` | string | Custom email domain for wallet-derived addresses; if omitted, `{walletAddress}@siwe.placeholder.invalid` |
| `anonymous?` | boolean | Allow sign-up without an email (default: true) |
| `getNonce?` | function | Returns a globally unique ERC-4361 nonce (8-250 alphanumeric characters) as `Promise<string>` |
| `verifyMessage?` | function | Signature recovery for the supplied address (e.g. viem's `verifyMessage`), returns `Promise<boolean>`; the plugin validates nonce, domain, address, Chain ID, and time bounds itself |
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

- Changed in 1.7: SIWE derives identity from the signed message. Remove wallet address and chain fields from `authClient.siwe.nonce()` and `authClient.siwe.getNonce()` calls. A server-side `getNonce` must return an ERC-4361 nonce of 8 to 250 alphanumeric characters. Better Auth reads the address and chain from the signed SIWE message.
- Renamed in 1.7 docs: "Chain-Specific Examples" is now "Chain-Specific Messages"; the 1.6 chain list (Ethereum mainnet, Polygon, Arbitrum, Base) is no longer in the page — any positive Chain ID in the signed message is accepted.

## Related

- [passkey.md](./passkey.md)
- [anonymous.md](./anonymous.md)
