---
source: https://docs.cloud.google.com/eventarc/standard/docs/third-parties/create-channels
---

# Create a channel and retrieve its details

Preview (third-party events; customer-managed encryption keys). A channel is the resource through which a third-party provider interacts with a subscriber's project. After you create it, you retrieve the activation token and channel name and give them to the provider, which uses the token to connect the channel.

## Signature / Usage

### Enable the APIs

```bash
gcloud services enable eventarc.googleapis.com \
    eventarcpublishing.googleapis.com \
    pubsub.googleapis.com
```

For a channel with a customer-managed encryption key (CMEK), also enable Cloud KMS:

```bash
gcloud services enable cloudkms.googleapis.com
```

### Create a channel

```bash
gcloud eventarc channels create CHANNEL_NAME \
  --provider PROVIDER_NAME \
  --project PROJECT_ID \
  --location LOCATION \
  --crypto-key=KEY
```

`KEY` has the form:

Adapted (not in the official docs): `PROJECT_NAME` is replaced by `PROJECT_ID`, the form the gcloud help uses for the key path (`projects/PROJECT_ID/locations/KMS_LOCATION/keyRings/KEYRING/cryptoKeys/KEY`).

```text
projects/PROJECT_ID/locations/LOCATION/keyRings/RING_NAME/cryptoKeys/KEY_NAME
```

### Retrieve channel properties

```bash
gcloud eventarc channels describe CHANNEL_NAME \
  --project PROJECT_ID \
  --location LOCATION
```

Example output:

Adapted (not in the official docs): the example activation token value is replaced by the upper-case placeholder `ACTIVATION_TOKEN`, so no token-like string appears in the page.

```yaml
activationToken: ACTIVATION_TOKEN
createTime: '2021-11-15T15:20:31.582356065Z'
name: projects/your-project-123/locations/us-central1/channels/your-channel
provider: projects/your-project-123/locations/us-central1/providers/provider-name
pubsubTopic: projects/your-project-123/topics/eventarc-channel-us-central1-your-channel-q1w2
state: PENDING
uid: c6703a91-ccd3-4c32-a729-967393f23a29
updateTime: '2021-11-15T15:21:03.689597653Z'
```

If the state is `PENDING`, note the `activationToken` value and the channel `name` to convey to the provider.

### Delete a channel

```bash
gcloud eventarc channels delete CHANNEL_NAME \
  --location LOCATION
```

## Options / Props

### Placeholders

| Placeholder | Meaning |
|-------------|---------|
| `CHANNEL_NAME` | Name for the channel |
| `PROVIDER_NAME` | The provider's name (see List event providers) |
| `PROJECT_ID` | Google Cloud project ID |
| `LOCATION` | Supported Eventarc region; for this Pre-GA feature only `asia-northeast1`, `europe-west4`, `us-central1`, `us-west1` (no channel in any other location) |
| `KEY` | Fully qualified Cloud KMS key name |

### Channel state

| State | Meaning |
|-------|---------|
| `PENDING` | Created; an activation token is available. To become ACTIVE the token must be given to the provider and used within 24 hours of creation |
| `ACTIVE` | Connected with the provider; ready to receive and route events |
| `INACTIVE` | Cannot receive events nor be reactivated: the provider disconnected, or the activation token expired and the provider is not connected. Create a new channel to reconnect |

### Details to give the provider

| Item | Example |
|------|---------|
| Full channel name (includes project ID and location) | `projects/your-project-123/locations/us-central1/channels/your-channel` |
| Activation token (valid 24 hours after channel creation, then the channel becomes INACTIVE) | `ACTIVATION_TOKEN` (placeholder) |

## Notes

- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support.
- The activation token is a single-use, time-restricted secret; only the provider selected at channel creation can use it. Share it only through the provider's documented channel, and do not commit real tokens to repositories or logs.
- Adapted from the official docs: the source's example `activationToken` value is replaced by `ACTIVATION_TOKEN`, and the key path `projects/PROJECT_NAME/...` by `projects/PROJECT_ID/...` (as in the gcloud help for `--crypto-key`).
- `--crypto-key` is optional (omit it for a Google-managed encryption key). If you use CMEK, the Eventarc service agent needs `roles/cloudkms.cryptoKeyEncrypterDecrypter` on the key (the Console prompts for it). You can edit a channel afterwards to enable CMEK. The CMEK key itself belongs to `gcp-security`.
- An INACTIVE channel cannot be reactivated, so deleting a channel means creating a new one (and a new token) to reconnect. Try deletion on a disposable project first.
- Once the provider has initialized the connection, the state changes from PENDING to ACTIVE. Provider-specific instructions are on the third-party provider pages.
- The source also shows Console steps (including Autokey and labels); no Terraform or client-library forms.
- Source: https://docs.cloud.google.com/eventarc/standard/docs/third-parties/create-channels (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [third-parties-overview.md](./third-parties-overview.md)
- [create-trigger-thirdparty.md](./create-trigger-thirdparty.md)
