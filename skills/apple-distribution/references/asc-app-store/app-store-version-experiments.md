# App Store Version Experiments

Test elements of your App Store product page with A/B experiments (`appStoreVersionExperiments`). The v2 endpoints are primary; v1 endpoints are listed as deprecated.

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v2/appStoreVersionExperiments
GET    https://api.appstoreconnect.apple.com/v2/appStoreVersionExperiments/{id}
PATCH  https://api.appstoreconnect.apple.com/v2/appStoreVersionExperiments/{id}
DELETE https://api.appstoreconnect.apple.com/v2/appStoreVersionExperiments/{id}
GET    https://api.appstoreconnect.apple.com/v2/appStoreVersionExperiments/{id}/appStoreVersionExperimentTreatments
GET    https://api.appstoreconnect.apple.com/v1/appStoreVersions/{id}/appStoreVersionExperimentsV2
```

## Options / Props

### v2 endpoints (primary)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/appStoreVersionExperiments` | Add a new experiment to an App Store version (`AppStoreVersionExperimentV2CreateRequest`) |
| GET | `/v2/appStoreVersionExperiments/{id}` | Read experiment information |
| PATCH | `/v2/appStoreVersionExperiments/{id}` | Update the name, the started state, and the proportion of traffic to send to the experiment (`AppStoreVersionExperimentV2UpdateRequest`) |
| DELETE | `/v2/appStoreVersionExperiments/{id}` | Delete an experiment before it starts |
| GET | `/v2/appStoreVersionExperiments/{id}/appStoreVersionExperimentTreatments` | List all treatments |
| GET | `/v2/appStoreVersionExperiments/{id}/relationships/appStoreVersionExperimentTreatments` | List treatment IDs |
| GET | `/v1/appStoreVersions/{id}/appStoreVersionExperimentsV2` | List all experiments for an App Store version (across all platforms) |
| GET | `/v1/appStoreVersions/{id}/relationships/appStoreVersionExperimentsV2` | List experiment IDs for an App Store version |

### `AppStoreVersionExperimentV2.Attributes` (introduced at 2.4)

| Name | Type | Description |
|------|------|-------------|
| `name` | string | Experiment name |
| `platform` | Platform | Apple platform string |
| `state` | string | `PREPARE_FOR_SUBMISSION`, `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `ACCEPTED`, `APPROVED`, `REJECTED`, `COMPLETED`, `STOPPED` |
| `trafficProportion` | integer | Proportion of traffic sent to the experiment |
| `startDate` | date-time | Start date |
| `endDate` | date-time | End date |
| `reviewRequired` | boolean | Whether review is required |

### `AppStoreVersionExperimentV2.Relationships`

`app`, `appStoreVersionExperimentTreatments`, `controlVersions`, `latestControlVersion`.

## Notes

- Deprecated (v1): `AppStoreVersionExperiment` and its request and response objects, `GET/POST/PATCH/DELETE /v1/appStoreVersionExperiments...`, `GET /v1/appStoreVersions/{id}/appStoreVersionExperiments` and the v1 treatment lists. Use the v2 endpoints and `appStoreVersionExperimentsV2`.
- Deprecated in App Store Connect API 4.5.1: App Store version, custom product page, and experiment treatment media set-based resources (screenshot sets and preview sets). Manage them with the App Asset Library and placements.
- An experiment is an A/B test comparing two product page variants for an App Store version to see which drives more downloads.
- Related collections not summarised here: App Store Version Experiment Treatments, Treatment Localizations, and App Store Version Promotions (apply a treatment to the product page or upcoming version).
- Source: https://developer.apple.com/documentation/appstoreconnectapi/app-store-version-experiments

## Related

- [Review Submissions and Items](./review-submissions.md)
- [Custom Product Pages and Localizations](./custom-product-pages.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
