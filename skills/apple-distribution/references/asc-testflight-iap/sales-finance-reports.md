# Sales and Finance Reports

Download sales/trends and financial reports for your apps as gzip-compressed files.

## Signature / Usage

```
GET /v1/salesReports
GET /v1/financeReports
```

## Options / Props

### Download Sales and Trends Reports

`GET /v1/salesReports`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `filter[frequency]` | Yes | string | `DAILY`, `WEEKLY`, `MONTHLY`, `YEARLY` |
| `filter[reportType]` | Yes | string | `SALES`, `SUBSCRIPTION`, `SUBSCRIPTION_EVENT`, `SUBSCRIBER`, `INSTALLS`, `FIRST_ANNUAL`, `WIN_BACK_ELIGIBILITY`, `PRE_ORDER`, `NEWSSTAND`, `SUBSCRIPTION_OFFER_CODE_REDEMPTION` |
| `filter[reportSubType]` | Yes | string | `SUMMARY`, `DETAILED`, `SUMMARY_INSTALL_TYPE`, `SUMMARY_TERRITORY`, `SUMMARY_CHANNEL` |
| `filter[vendorNumber]` | Yes | string | Your vendor number from App Store Connect |
| `filter[reportDate]` | No | string | Date in `YYYY-MM-DD` format |
| `filter[version]` | No | string | Report version (type-dependent) |

### Download Finance Reports

`GET /v1/financeReports`

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `filter[regionCode]` | Yes | [string] | Territory code (e.g. `US`, `GB`) |
| `filter[reportDate]` | Yes | [string] | Fiscal month in `YYYY-MM` format |
| `filter[reportType]` | Yes | [string] | `FINANCIAL` or `FINANCE_DETAIL` |
| `filter[vendorNumber]` | Yes | [string] | Your vendor number |

## Notes

- Both endpoints return `application/a-gzip` binary (200 OK) on success.
- Require a **Team API key** — Individual API keys are not accepted.
- Finance report dates follow the [Apple Fiscal Calendar](https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/wa/jumpTo?page=fiscalcalendar), not calendar months.
- Subscription report version `1_2` is no longer available.

## Related

- [App Price Points](./app-price-points.md)
