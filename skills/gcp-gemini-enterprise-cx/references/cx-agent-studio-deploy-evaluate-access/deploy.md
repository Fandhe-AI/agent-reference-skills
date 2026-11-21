---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy
---

# Deploy a CX Agent Studio agent application

Once an agent application has been built and tested, you can deploy agent application versions through a web widget, platform connections (contact-center and messaging platforms), or API access. Two further topics cover rolling out changes: traffic splitting (A/B testing) and migrating to a new foundation model.

## Signature / Usage

### Deployment channels

- Web widget: a configurable, ready to use web interface widget.
- Platform connections:
  - AudioCodes: connect to your AudioCodes platform.
  - Five9: connect to your Five9 voice calls.
  - Google Contact Center as a Service (CCaaS): connect to a Google Cloud Contact Center as a Service instance in voice mode.
  - Google Telephony Platform: connect to a new Google Telephony Platform phone number.
  - SecureCo: connect to your SecureCo voice calls.
  - Twilio: connect to your Twilio voice calls.
  - WhatsApp and Instagram: connect to your WhatsApp or Instagram conversations.
- API access: connect using the API (see [api-access.md](./api-access.md)).

### Rolling out changes

- Traffic splitting (A/B testing): divide live conversations across multiple agent application versions.
- Migrate to a new model: update, evaluate, and roll out a different foundation model for your agent application.

### Configure a deployment channel

1. Click the **Deploy** button at the top of the agent builder.
2. Select **Web widget**, **Platform**, or **API access**.
3. Provide configuration details specific to the channel you've chosen.

Some deployment options also let you choose the modality: **Text** or **Voice** for text or voice conversations. You can reference channel and modality types in instructions, callbacks, and Python tools.

Deployments are served from immutable versions; see [version.md](./version.md). For API access, each conversational turn is sent with the `runSession` method:

```text
POST https://ces.googleapis.com/v1/projects/PROJECT_ID/locations/REGION_ID/apps/APPLICATION_ID/sessions/SESSION_ID:runSession
```

## Notes

- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy/api-access (the `runSession` request line, shown there for API access deployments).
- The per-channel pages (web widget, AudioCodes, Five9, CCaaS, Google Telephony Platform, SecureCo, Twilio, WhatsApp and Instagram, traffic split, migrate to a new model) are separate documentation pages that are not part of this page.
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/deploy (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [api-access.md](./api-access.md)
- [version.md](./version.md)
- [evaluation.md](./evaluation.md)
