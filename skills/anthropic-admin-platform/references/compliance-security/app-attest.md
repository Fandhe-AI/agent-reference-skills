<!-- source: https://platform.claude.com/docs/en/manage-claude/app-attest / last verified: 2026-08-07 -->

# App Attest for iOS and macOS apps

Let genuine installations of your iOS or macOS app call the Claude API directly from the device without shipping an API key or running a proxy, using Apple's App Attest service; usage bills to your workspace. Used through the Claude for Foundation Models Swift package (beta, requires OS 27 betas).

## Signature / Usage

Setup (needs Apple Developer Team ID and admin/owner/primary owner role):

1. In Xcode, add the **App Attest** capability under Signing & Capabilities.
2. In Claude Console workspace settings, open **App integrations** > **Create app integration**; enter a name, Apple Developer Team ID, and up to 32 bundle IDs.
3. Copy the client ID (`clid_...`) from the integration's Overview tab into your app's Claude configuration.

## Notes

- Requires a physical device (Simulator and hardware without a Secure Enclave cannot attest); use an API key during Simulator development.
- Available only when calling the Claude API directly — not through Amazon Bedrock, Google Cloud, or Microsoft Foundry.
- Issued tokens are workspace-scoped, expire after one hour, authorize only Messages API calls, and carry no end-user identity (App Attest identifies the app, not the person).
- Revoking an app integration (Console > App integrations > Revoke) revokes outstanding tokens and blocks new token requests; revocation is permanent, so create a new integration to restore access.

## Related

- [api-and-data-retention.md](./api-and-data-retention.md)
