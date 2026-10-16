# App Store Version Release Requests

Manually release an approved version of your app (`appStoreVersionReleaseRequests`). Applies to a version in the Pending Developer Release state (version set to manual release after review approval).

## Signature / Usage

```
POST https://api.appstoreconnect.apple.com/v1/appStoreVersionReleaseRequests
```

## Options / Props

| Item | Description |
|------|-------------|
| Endpoint | `POST /v1/appStoreVersionReleaseRequests`: release an approved version of your app to the App Store |
| Request body | `AppStoreVersionReleaseRequestCreateRequest` (introduced at 1.5): a required `data` element (`AppStoreVersionReleaseRequestCreateRequest.Data`) |
| Response | `AppStoreVersionReleaseRequestResponse`: a single manual release request for an App Store version |

## Notes

- Only versions in the Pending Developer Release state can be released this way. For app states, see App and submission statuses in the App Store Connect Help.
- The exact fields of `AppStoreVersionReleaseRequestCreateRequest.Data` are not documented on this page; see the official App Store Connect API page for the schema.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/app-store-version-release-requests

## Related

- [App Store Version Phased Releases](./phased-releases.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
