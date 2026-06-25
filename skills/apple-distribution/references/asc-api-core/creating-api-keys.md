# Creating API Keys for App Store Connect API

Create API keys to sign JSON Web Tokens (JWTs) and authorize API requests to App Store Connect.

## Overview

Two key types exist:

| Type | Access Scope | Limitations |
|------|-------------|-------------|
| **Team Key** | All apps, configurable roles | Requires Admin account |
| **Individual Key** | Apps tied to associated user | No Provisioning, Sales/Finance, or notaryTool access |

## Signature / Usage

**Generate a Team Key**

1. Log in to App Store Connect → Users and Access → Integrations tab
2. Select App Store Connect API → Team Keys
3. Click Generate API Key or the Add (+) button
4. Enter a name and select a role under Access
5. Click Generate

**Generate an Individual Key**

1. Log in → user profile → Individual API Key section
2. Click Generate API Key

**Download the Private Key**

- The download link appears only once — Apple does not retain a copy
- Store the `.p8` file securely; do not commit to repositories or embed in client-side code

## Notes

- Revoke keys immediately if lost or compromised
- Individual keys cannot be used for Provisioning endpoints, Sales and Finance, or `notaryTool`
- The key ID (e.g., `2X9R4HXF34`) is used in JWT headers

## Related

- [Generating Tokens for API Requests](./generating-tokens.md)
- [Revoking API Keys](./revoking-api-keys.md)
