---
source: https://docs.flutter.dev/security
---

# Security

Overview of the Flutter team's philosophy and processes for security: how to report vulnerabilities and best practices to minimize the risk of introducing one.

## Signature / Usage

Reporting channels:

```text
Report vulnerabilities : https://g.co/vulnz
                         (description, steps to reproduce, affected versions, mitigations if known)
Flag existing GitHub issue as security-related : report to g.co/vulnz AND email security@flutter.dev
                         (include the GitHub issue ID and why it should follow the security policy)
Escalation only if no g.co/vulnz response within 5 working days : security@flutter.dev
Bug bounty listing requests : security@flutter.dev
```

## Security philosophy

Flutter's strategy rests on five pillars:

- **Identify**: track and prioritize key security risks by identifying core assets, key threats, and vulnerabilities.
- **Detect**: detect vulnerabilities using techniques and tools like vulnerability scanning, static application security testing, and fuzzing.
- **Protect**: eliminate risks by mitigating known vulnerabilities and protect critical assets against source threats.
- **Respond**: define processes to report, triage, and respond to vulnerabilities or attacks.
- **Recover**: build capabilities to contain and recover from an incident with minimal impact.

## Reporting vulnerabilities

Before reporting a vulnerability found by a static analysis tool, check the list of known false positives (/reference/security-false-positives). Intake is via g.co/vulnz; coordination and disclosure happen on GitHub (including GitHub Security Advisory). The Google Security Team responds within 5 working days. You may also reach the team through the public Discord channels, but still report to g.co/vulnz and avoid revealing vulnerability information in public if that could put users at risk. See the security policy at https://github.com/flutter/flutter/security/policy.

Security reports are not tracked explicitly in the GitHub issue database; open reports are tracked with GitHub's security advisory feature.

## Supported versions

Security updates are published for the version of Flutter currently on the `stable` branch.

## Expectations

Security reports are treated as P0 priority. Depending on the release schedule, a new beta or a stable hotfix is released for any major security report found in the most recent stable SDK, whichever is most expedient. A vulnerability in Flutter websites like docs.flutter.dev needs no release and is fixed in the website itself.

## Bug Bounty programs

Non-Google teams that use or contribute to Flutter may include Flutter in the scope of their bug bounty programs (contact `security@flutter.dev` to be listed). Google considers Flutter to be in scope for the Google Open Source Software Vulnerability Reward Program (https://bughunters.google.com/open-source-security).

## Receiving security updates

Subscribe to the flutter-announce mailing list or watch the Discord channel; security updates are also announced in the technical release blog post.

## Best practices

- **Keep current with the latest Flutter SDK releases.** Updates might fix security defects discovered in previous versions.
- **Keep your application's dependencies up to date.** Upgrade your package dependencies. Avoid pinning to specific versions and, if you do, check periodically for security updates and update the pin.
- **Keep your copy of Flutter up to date.** Private, customized versions tend to fall behind and might not include important security fixes. Routinely update your copy, and if you fork Flutter, update the fork and consider sharing your changes.

## Related

- [Supported platforms](./supported-platforms.md)
- [Build modes](./build-modes.md)
