---
source: https://docs.cloud.google.com/iap/docs/managed-oauth-client
---

# Enable IAP using a Google-managed OAuth client

Enable Identity-Aware Proxy on a Google Cloud resource using the Google-managed OAuth client from the console. Only users within the organization that contains the resource can access a resource protected this way; to let outside users in, enable custom OAuth credentials for the resource.

## Signature / Usage

### Command-line equivalent for a backend service

```bash
gcloud compute backend-services update BACKEND_SERVICE_NAME --global --iap=enabled
```

### Enable IAP for a new resource (console)

New Google Cloud resources don't have IAP enabled. On the IAP page open the **Applications** tab, select the resource, set the toggle in the **IAP** column to on, and click **Turn on** in the **Turn on IAP** option.

### Set up custom OAuth credentials for a resource (console)

To allow users outside the organization: in the resource's settings on the **Applications** tab select **Enable custom OAuth credentials to allow users outside of this organization to access this application**, enter a client ID and secret in the **OAuth configuration** dialog (or click **Auto generate credentials**, optional), and click **Save**. Saving does not change the IAP enabled state.

### Change back to a Google-managed OAuth client (console)

In the resource's settings deselect **Enable custom OAuth credentials to allow users outside of this organization to access this application** and click **Save**.

## Options / Props

| Choice | Effect |
|--------|--------|
| Google-managed OAuth client | Only users within the organization of the resource can access it |
| Custom OAuth credentials | Users outside the organization can access the resource |

## Notes

- Auto-generated credentials can be downloaded to a CSV file or deleted. After you save changes, custom client credentials cannot be retrieved, so save them (the file contains a client secret: store it securely and do not commit or share it). If you delete the credentials, the auto-generated OAuth client is also deleted; IAP stops working correctly if its OAuth client is removed.
- The source describes the console flow only; the full custom OAuth setup (branding page, redirect URI, gcloud and API) is on the custom OAuth page.
- Snippet taken from https://docs.cloud.google.com/iap/docs/enabling-compute-howto (the managed OAuth page is console-only and has no code). The full flag list of `gcloud compute backend-services update` (https://docs.cloud.google.com/sdk/gcloud/reference/compute/backend-services/update) is in the `gcp-compute` skill.
- Source: https://docs.cloud.google.com/iap/docs/managed-oauth-client (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [custom-oauth-configuration.md](./custom-oauth-configuration.md)
- [concepts-overview.md](./concepts-overview.md)
- [enabling-compute-howto.md](./enabling-compute-howto.md)
