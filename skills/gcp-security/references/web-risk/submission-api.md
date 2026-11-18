---
source: https://docs.cloud.google.com/web-risk/docs/submission-api
---

# Using the Submission API

The Web Risk Submission API submits URLs you suspect are unsafe to Safe Browsing for analysis and lets you asynchronously check the results through a long-running operation. URLs confirmed to violate the Safe Browsing Policies are added to Safe Browsing. The API is in a formal feature freeze and closed to new orders ahead of full deprecation no later than December 31, 2027.

## Signature / Usage

### projects.uris.submit

Replace `project-id` in the URL with your project ID. Save the request body in `request.json`.

```json
{
  "submission": {
    "uri": "https://www.example.com/login.html"
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://webrisk.googleapis.com/v1/projects/project-id/uris:submit"
```

Adapted (not in the official docs): the source response example has a trailing comma after `"name"`, which is invalid JSON; it was removed.

```json
{
  "name": "projects/project-number/operations/operation-id"
}
```

Use the `project-number` and `operation-id` from the response to check the submission status (`metadata.state`: `RUNNING`, `SUCCEEDED`, `CLOSED`).

## Options / Props

### Key changes (feature freeze)

| Item | Status |
|---|---|
| New orders and expansions | Closed; no new contracts or expansions. |
| Features | Formal feature freeze; no new features or enhancements. |
| Renewals | Final date to renew existing contracts is December 31, 2026; maximum term one year. |
| Availability | Existing services stay operational with critical bug fixes, security updates and standard support until the end of the active contract. Full deprecation no later than December 31, 2027. |

### Taxonomy and brand targeting (Preview) - `ThreatInfo` fields

| Field | Description |
|---|---|
| `abuseSubtype` | Granular classification; set only when `abuseType` is `SOCIAL_ENGINEERING`, otherwise an error is returned. |
| `targetedBrand.brandName` | Recognizable name of the impersonated brand or company (example: `Altostrat`). |
| `targetedBrand.domain` | Legitimate domain of the impersonated brand (example: `altostrat.com`). |

### `abuseSubtype` values

| Value | Meaning |
|---|---|
| `BANK_PHISHING` | Phishing posing as a bank or trusted financial entity. |
| `CRYPTO_EXCHANGE_PHISHING` | Phishing posing as a cryptocurrency trading platform. |
| `SOCIAL_MEDIA_PLATFORM_PHISHING` | Phishing posing as a social media platform. |
| `RETAIL_PHISHING` | Phishing posing as an established retail platform. |
| `EMAIL_PROVIDER_PHISHING` | Phishing posing as an email service. |
| `ENTERTAINMENT_PHISHING` | Phishing posing as an entertainment service. |
| `GOVERNMENT_AGENCY_PHISHING` | Phishing posing as a government agency to obtain PII such as a Social Security number or taxpayer identification number. |
| `PACKAGE_TRACKING_SCAM` | Mimicking a shipping service to obtain PII or payment details. |
| `FAKE_SUPPORT_SCAM` | Deceptive websites claiming false device problems to trick users into sharing PII or contacting scammers. |
| `GOVERNMENT_FINE_SCAM` | Deceptive content claiming an outstanding civic fine must be paid. |
| `FAKE_PRIZE_SCAM` | Deceptive pages offering unrealistic rewards or prizes. |
| `OTHER_PHISHING` / `OTHER_SCAM` | Social engineering attacks not in the other categories. |

## Notes

- Deprecated: the Submission API is in a formal feature freeze and closed to new orders ahead of full deprecation no later than December 31, 2027; do not present it as current for new integrations.
- One URL per request; the URL must be valid (RFC 2396) but needn't be canonicalized. The response is a long-running operation.
- Submit only URLs with clear evidence of violating the Safe Browsing Policies (for example social engineering content mimicking a legitimate brand, system alerts or deceptive URLs, or a site hosting a known malware executable). Don't submit fake surveys, shopping sites or other scams that aren't phishing (such as cryptocurrency scams), or spam with gambling, violence or adult content that isn't phishing or malware.
- Recommended: provide `ThreatInfo` and `ThreatDiscovery` fields for better detection.
- Taxonomy is Preview: enum values and behavior may change; phishing stays under the `SOCIAL_ENGINEERING` threat type; `MALWARE` and `UNWANTED_SOFTWARE` subcategories are excluded; if nothing fits use `OTHER_PHISHING` or `OTHER_SCAM` and describe the attack in the `comments` field of `ThreatJustification`. The fields are optional but encouraged.
- The source also shows a PowerShell form; omitted. The curl example assumes you are logged in to gcloud (`gcloud init`, `gcloud auth login` or Cloud Shell); the access token is short-lived and must not be printed in shared logs.
- Source: https://docs.cloud.google.com/web-risk/docs/submission-api (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the trailing comma in `"name": "projects/project-number/operations/operation-id",` was removed to make the response valid JSON.
- Source inconsistency: the source calls `projects.uris.submit` (`POST .../v1/projects/PROJECT_ID/uris:submit`) with the URL wrapped in `submission`; the Web Risk API v1 Discovery document lists no `uris.submit` method, only `projects.submissions.create` (`POST .../v1/projects/PROJECT_ID/submissions`), whose request body is a bare `Submission` object (`{"uri": "..."}`) without the `submission` wrapper. The source's call is kept.

## Related

- [brand-phishing-protection.md](./brand-phishing-protection.md)
- [overview.md](./overview.md)
