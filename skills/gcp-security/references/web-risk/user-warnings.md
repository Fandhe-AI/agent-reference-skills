---
source: https://docs.cloud.google.com/web-risk/docs/user-warnings
---

# User warnings

Guidelines that apply when you use Web Risk to warn users about risky webpages. They make clear that a page is not known with 100% certainty to be unsafe and that warnings only identify possible risk.

## Signature / Usage

### Data a warning may be based on

A warning may be shown only while a matching response like this Lookup API `uris.search` match is still valid in the cache.

```json
{
  "threat": {
    "threatTypes": [
      "MALWARE"
    ],
    "expireTime": "2019-07-17T15:01:23.045123456Z"
  }
}
```

## Options / Props

### Warning requirements

| Requirement | Detail |
|---|---|
| Qualified wording | Don't lead users to believe the page is without doubt unsafe; qualify with terms such as suspected, potentially, possible, likely, may be. |
| Learn more link | Social engineering: www.antiphishing.org. Malware: Google Search Central. Unwanted software: Unwanted Software Policy. |
| Attribution | For pages flagged by Web Risk include the line "Advisory provided by Google" linking to the Web Risk Advisory; don't add the attribution to warnings derived from non-Google data. |
| Age of data | Show a warning only if the Lookup API `uris.search` response matched a threat entry, or the Update API `hashes.search` response matched a full-length hash, and the cached response is still valid when the warning is shown. Under no other circumstances may a warning be shown. |
| User protection notice | If you tell users your service protects against unsafe web resources, tell them before they enable it that protection is not perfect (false positives and false negatives are possible). |

### Suggested warning language

| Type | Text |
|---|---|
| Social engineering | "Warning: Deceptive site ahead. Attackers on [site URL] may trick you into doing something dangerous like installing software or revealing your personal information (for example, passwords, phone numbers, or credit cards)." |
| Malware | "Warning: Visiting this web site may harm your computer. This page appears to contain malicious code that could be downloaded to your computer without your consent." |
| Unwanted software | "Warning: The site ahead may contain harmful programs. Attackers might attempt to trick you into installing programs that harm your browsing experience (for example, by changing your homepage or showing extra ads on sites you visit)." |
| Android PHA | "Warning: The site ahead may contain malware. Attackers might attempt to install dangerous apps on your device that steal or delete your information (for example, photos, passwords, messages, and credit cards)." |
| Protection notice | "Google works to provide the most accurate and up-to-date information about unsafe web resources. However, Google cannot guarantee that its information is comprehensive and error-free: some risky sites may not be identified, and some safe sites may be identified in error." |

## Notes

- You may copy the suggested language or modify it slightly. Each source warning also links to a matching information page (social engineering: Social Engineering (Phishing and Deceptive Sites) support page or www.antiphishing.org; malware: Google Search Central; unwanted software: Unwanted Software Policy).
- Source inconsistency: the Update API rule links to the `hashes.search` "HTTP POST response", although `hashes.search` is an HTTP `GET` request.
- Source: https://docs.cloud.google.com/web-risk/docs/user-warnings (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/web-risk/docs/lookup-api

## Related

- [advisory.md](./advisory.md)
- [caching.md](./caching.md)
- [lookup-api.md](./lookup-api.md)
