---
source: https://docs.flutter.dev/release/compatibility-policy
---

# Flutter compatibility policy

How Flutter approaches the question of breaking changes: a public test registry, RFCs and migration guides, and a deprecation policy that is independent of the compatibility policy.

## Signature / Usage

The policy is process-based, with no API. The one actionable step is registering tests in the `flutter/tests` repository (links below are the page's own).

```text
Test registry:        https://github.com/flutter/tests
Adding more tests:    https://github.com/flutter/tests#adding-more-tests
RFCs:                 flutter/rfc repository
Migration guides:     /release/breaking-changes
```

## Notes

- Test registry: unit tests from your own apps or libraries are run on every change. The commitment is that no change breaks these tests without working with the test authors to (a) determine whether the change is sufficiently valuable and (b) provide fixes so the tests continue to pass.
- Announcements: substantive breaking changes are proposed and reviewed publicly as Requests for Comments (RFCs) in the `flutter/rfc` repository. A breaking change is defined as a change that caused one or more submitted tests to require changes. It is announced on the flutter-announce mailing list and in the release notes.
- Deprecation: APIs are sometimes deprecated rather than broken outright. This is independent of the compatibility policy, which is based exclusively on whether submitted tests fail. Deprecated APIs are not removed on a schedule; removing one follows the same procedures as a breaking change.
- Dart and other libraries: the Dart language has a separate breaking-change policy with announcements on Dart announce. Flutter has no commitment regarding breaking changes for other dependencies (for example Skia or Harfbuzz); such changes are not necessarily accompanied by a migration guide.
- The page links to the guides listed in the breaking changes index.

## Related

- [Breaking changes and migration guides](./breaking-changes.md)
- [Flutter release notes](./release-notes.md)
