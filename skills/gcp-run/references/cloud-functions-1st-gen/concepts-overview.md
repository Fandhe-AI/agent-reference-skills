---
source: https://docs.cloud.google.com/functions/docs/concepts/overview
---

# Functions overview (Cloud Run functions vs 1st gen)

Routing page that sends you to the right documentation for your function version. Cloud Functions (2nd gen) is now Cloud Run functions; Cloud Functions (1st gen) is now Cloud Run functions (1st gen).

## Signature / Usage

Deploying a 1st gen function (`--no-gen2`; see deploy-1st-gen.md for the full command):

```bash
gcloud functions deploy my-http-function \
  --no-gen2 \
  --region=us-central1 \
  --runtime=nodejs22 \
  --source=. \
  --entry-point=myHttpFunction \
  --trigger-http
```

Snippet taken from https://docs.cloud.google.com/functions/1stgendocs/deploy.

## Options / Props

| Function version | Where to read |
| --- | --- |
| Cloud Run functions | https://docs.cloud.google.com/run/docs/functions-with-run; deploy: https://docs.cloud.google.com/run/docs/deploy-functions; for `gcloud functions` commands or the Cloud Functions v2 API for backward compatibility: https://docs.cloud.google.com/run/docs/functions/comparison#v2-deploy (the 1st gen copy of the page links https://docs.cloud.google.com/functions/docs/deploy instead) |
| Cloud Run functions (1st gen) | https://docs.cloud.google.com/functions/1stgendocs/deploy |
| Comparison of the two | https://docs.cloud.google.com/run/docs/functions/comparison |

## Notes

- Rename history: Cloud Run functions has the former product name Cloud Functions (2nd gen); Cloud Run functions (1st gen) is "formerly known as Cloud Functions (1st gen)" (quoted from the comparison guide, https://docs.cloud.google.com/run/docs/functions/comparison).
- This page merges two near-identical routing twins: `functions/docs/concepts/overview` and `functions/1stgendocs/concepts/overview`.
- Source: https://docs.cloud.google.com/functions/docs/concepts/overview (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/1stgendocs/concepts/overview

## Related

- [deploy-1st-gen.md](./deploy-1st-gen.md)
- [gcloud-functions-deploy.md](./gcloud-functions-deploy.md)
- [upgrade-gen1-functions.md](./upgrade-gen1-functions.md)
