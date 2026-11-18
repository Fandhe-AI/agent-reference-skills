---
source: https://docs.cloud.google.com/web-risk/docs/advisory
---

# Web Risk advisory

The page users reach from an "Advisory provided by Google" link. It explains why Google flags pages: automatic algorithms and user feedback compile lists of potentially dangerous pages of three major types (social engineering, malware, unwanted software), which are available to developers through Web Risk.

## Signature / Usage

### Developer access to the lists

The lists are available to developers through Web Risk, for example with a Lookup API check (replace `API_KEY` with your own key).

```bash
curl -X GET \
     "https://webrisk.googleapis.com/v1/uris:search?threatTypes=MALWARE&uri=http%3A%2F%2Ftestsafebrowsing.appspot.com%2Fs%2Fmalware.html&key=API_KEY"
```

## Options / Props

### Threat types in the advisory

| Type | Description | Reporting |
|---|---|---|
| Social engineering (phishing and deceptive sites) | A web user is tricked into doing something dangerous online; content can be on a site or in embedded resources (images, ads, third-party components). Phishing asks for personal or financial information under false pretenses. Deceptive content such as an ad falsely claiming device software is out of date might trick users into installing unwanted software. | Report a missed page with Report Phishing Page; report an incorrectly flagged page with Report Incorrect Phishing Warning. |
| Malware | Software that attempts to steal personal information or use your computer to do things you do not intend; pages containing malicious code that could be downloaded and installed without consent. | Report missing malware pages at Report Malicious Software. |
| Unwanted software | Software violating Google's Software Principles and Unwanted Software Policy criteria for user-friendly software; potentially harmful to the user experience and Google takes steps to protect users from it. | - |

## Notes

- The lists cannot perfectly protect users from every risky site; a safe site could be misidentified as risky, and the lists are updated regularly.
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/lookup-api
- The `API_KEY` in the query string lands in shell history and request logs; restrict the key and keep it out of shared terminals and CI logs.
- Source: https://docs.cloud.google.com/web-risk/docs/advisory (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [user-warnings.md](./user-warnings.md)
- [lists.md](./lists.md)
