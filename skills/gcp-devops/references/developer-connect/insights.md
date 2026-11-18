---
source: https://docs.cloud.google.com/developer-connect/docs/insights
---

# Developer Connect insights overview

Developer Connect insights are log entries from deployment events, sent from Developer Connect to Cloud Logging for Gemini Cloud Assist. They map application runtimes, deployed artifacts and build provenance to speed up root-cause discovery during outages.

## Signature / Usage

Check an insights configuration:

```bash
gcloud developer-connect insights-configs describe DCI_CONFIG_NAME \
       --location=REGION
```

## Options / Props

### Requirements

| Requirement | Detail |
|-------------|--------|
| App Hub application | Optional; needed only to scope the configuration to an application. All App Hub setup models are supported; a folder configured for application management is recommended |
| Google Cloud project | Optional; scope the configuration to a project instead of an application (need not be the project holding the configuration resource) |
| Developer Connect | Enable the Developer Connect API |
| Build provenance | The container image must have build provenance that insights can find |
| Gemini Cloud Assist | Optional; adds deployment events to investigation context |

### Support

| Item | Value |
|------|-------|
| Runtimes | Google Kubernetes Engine and Cloud Run only |
| Availability | Generally available in all regions except `australia-southeast1`, `europe-west6`, `europe-west8`, `europe-west9`, and `southamerica-east1` |

## Notes

- Example questions answered: what changed for `my-app` in `us-east1` since a date; which artifacts were deployed and when; when they were built, from which source and commits; which deployments may have caused an issue.
- Snippet taken from https://docs.cloud.google.com/developer-connect/docs/set-up-insights (the source page has no code block).
- Source: https://docs.cloud.google.com/developer-connect/docs/insights (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [set-up-insights.md](./set-up-insights.md)
- [use-insights.md](./use-insights.md)
