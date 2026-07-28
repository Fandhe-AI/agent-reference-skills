# Data Safety Section and Privacy Policy (Overview)

Google Play requires every app to disclose the data it collects and shares in the Play Console's Data safety section, and to link a privacy policy, independent of the in-app runtime permission flow.

## Notes

- This is a Google Play Console publishing requirement, not an Android API or manifest element — there is no corresponding runtime code in the app itself.
- The Data safety section covers what data types are collected/shared (location, personal info, financial info, etc.), whether collection is optional, and the app's security practices (encryption in transit, deletion request support).
- A privacy policy URL is mandatory for any app that requests sensitive permissions or handles personal/sensitive user data, and must accurately describe how the declared permissions are used.
- Requesting a runtime or special permission (camera, location, all-files access, etc.) generally requires the corresponding disclosure in the Data safety section to remain consistent with Play policy review.
- For the in-app, developer-facing explanation of *why* a permission is requested (as opposed to the store-listing disclosure), see [explaining-permission-access](./explaining-permission-access.md).

## Related

- [explaining-permission-access](./explaining-permission-access.md)
- [evaluating-permission-need](./evaluating-permission-need.md)
- [advertising-and-app-set-id](./advertising-and-app-set-id.md)
