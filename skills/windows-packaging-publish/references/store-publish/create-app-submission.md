# Create App Submission

Creating a submission is the core step of publishing an app: it bundles all required configuration sections that are submitted together for certification.

## Signature / Usage

After reserving an app name, on the app's application overview page, in the **Product release** section, click **Start submission** to create a draft submission. Complete each checklist section, then click **Submit for certification** on the Application overview page.

Alternatively, submissions can be created programmatically via the Microsoft Store Submission API.

## Options / Props

| Section | Required | Notes |
|---|---|---|
| Pricing and availability | Markets, Audience, Discoverability, Schedule, Base price required | Free trial, Sale pricing, Organizational licensing optional |
| Properties | Category required | Privacy policy URL required if collecting personal data; Contact details required for company accounts |
| Age ratings | All questions required | Drives the IARC rating generation |
| Packages | At least one app package required | Section stays "Incomplete" until all mandatory package config is set, even if individual packages show "Validated" |
| Store listings | Description, at least one screenshot, Store logos (for some OS versions) required | Needed for at least one supported language |
| Submission options | Restricted capabilities required if declared | Publishing hold options, notes for certification, notification audience optional |

## Notes

- Sections can be completed in any order.
- A developer account in Partner Center is required to submit apps.
- Any user added to a developer account can submit or modify MSI/EXE apps — role/permission restrictions do not currently apply to MSI/EXE app management.

## Related

- [Reserve App Name](./reserve-app-name.md)
- [Pricing and Availability](./pricing-and-availability.md)
- [App Properties](./app-properties.md)
- [Age Ratings](./age-ratings.md)
- [Upload App Packages](./upload-app-packages.md)
- [Store Listings](./store-listings.md)
- [Submission API MSIX](./submission-api-msix.md)
