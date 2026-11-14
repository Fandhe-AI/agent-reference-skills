---
source: https://docs.cloud.google.com/iam/docs/roles-permissions
---

# Products owned by gcp-ai-apis

## Signature / Usage

Owner skill: `gcp-ai-apis` (status: 未収録（予定）). gcloud groups: `dialogflow`, `dlp`, `media`, `recaptcha`, `transcoder`.

| Product | REST service (Discovery) | Overview | gcloud group | IAM role prefix | Roles | Former name | Docs | Status |
|---|---|---|---|---|---|---|---|---|
| AI Commerce Search API | `retail.googleapis.com` (v2, v2alpha, v2beta) | The AI Commerce Search API is made up of Retail Search, Browse and Recommendations. These discovery AI solutions help you implement personalized search, browse and recommendations, based on machine learning models, across your websites and mobile applications. | — | `retail.` | 6 | — | https://cloud.google.com/recommendations | 未収録（予定） |
| Cloud IoT | — | — | — | `cloudiot.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudiot | 未収録（予定） |
| Cloud Optimization | — | — | — | `cloudoptimization.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudoptimization | 未収録（予定） |
| Content Warehouse | `contentwarehouse.googleapis.com` (v1) | — | — | `contentwarehouse.` | 7 | — | https://cloud.google.com/document-warehouse | 未収録（予定） |
| Dialogflow | `dialogflow.googleapis.com` (v2, v2beta1, v3, v3beta1) | Builds conversational interfaces (for example, chatbots, and voice-powered apps and devices). | `dialogflow` | `dialogflow.` | 22 | — | https://cloud.google.com/dialogflow/ | 未収録（予定） |
| Document AI | — | — | — | `documentai.`, `documentaicore.` | 5 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/clouddocumentai | 未収録（予定） |
| FleetEngine | — | — | — | `fleetengine.` | 12 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/fleetengine | 未収録（予定） |
| Google Cloud Fraud Defense | `recaptchaenterprise.googleapis.com` (v1) | Help protect your website from fraudulent activity, spam, and abuse without creating friction. | — | `recaptchaenterprise.` | 4 | reCAPTCHA Enterprise | https://cloud.google.com/recaptcha-enterprise/ | 未収録（予定） |
| Live Stream | — | — | — | `livestream.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/livestream | 未収録（予定） |
| Media Asset | — | — | — | `mediaasset.` | 1 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/mediaasset | 未収録（予定） |
| Route Optimization | — | — | — | `routeoptimization.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/routeoptimization | 未収録（予定） |
| Sensitive Data Protection | `dlp.googleapis.com` (v2) | Discover and protect your sensitive data. A fully managed service designed to help you discover, classify, and protect your valuable data assets with ease. | `dlp` | `dlp.` | 37 | — | https://cloud.google.com/sensitive-data-protection/docs/ | 未収録（予定） |
| Speaker ID | — | — | — | `speakerid.` | 4 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/speakerid | 未収録（予定） |
| Speech-to-Text | `speech.googleapis.com` (v1, v1p1beta1) | Converts audio to text by applying powerful neural network models. | — | `speech.` | 4 | — | https://cloud.google.com/speech-to-text/docs/quickstart-protocol | 未収録（予定） |
| Stream | — | — | — | `stream.` | 6 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/stream | 未収録（予定） |
| Talent Solution | — | — | — | `cloudjobdiscovery.` | 6 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudjobdiscovery | 未収録（予定） |
| Telco Automation API | — | — | — | `telcoautomation.` | 8 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/telcoautomation | 未収録（予定） |
| Timeseries Insights API | — | — | — | `timeseriesinsights.` | 5 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/timeseriesinsights | 未収録（予定） |
| Transcoder API | `transcoder.googleapis.com` (v1) | This API converts video files into formats suitable for consumer distribution. | `transcoder` | `transcoder.` | 4 | — | https://cloud.google.com/transcoder/docs/ | 未収録（予定） |
| Translation | — | — | — | `cloudtranslate.` | 5 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/cloudtranslate | 未収録（予定） |
| Translation Hub | — | — | — | `translationhub.` | 3 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/translationhub | 未収録（予定） |
| Video Stitcher API | — | — | — | `videostitcher.` | 3 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/videostitcher | 未収録（予定） |
| Vision AI | — | — | — | `visionai.` | 41 | — | https://docs.cloud.google.com/iam/docs/roles-permissions/visionai | 未収録（予定） |

```bash
gcloud help
gcloud <group> --help
```

The first command lists all groups; the second lists the commands of one group.

## Notes

- Product list: IAM roles-permissions service pages (329 services) as of 2026-11-14.
- REST service, version list, Overview and Docs come from Discovery documents (googleapis/google-api-python-client@ff2498706a01); products without a Discovery document show "—".
- gcloud groups from `gcloud meta list-commands` (593.0.0); the column is filled only where the group name equals the IAM service name. The full group assignment is in `references/gcloud-groups/assignment.md`.
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions (retrieved 2026-11-14; content licensed under CC BY 4.0, code samples under Apache 2.0, https://developers.google.com/site-policies).

## Related

- [assignment.md](../gcloud-groups/assignment.md)
- [renamed-products.md](../renames/renamed-products.md)
