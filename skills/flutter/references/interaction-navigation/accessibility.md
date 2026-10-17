---
source: https://docs.flutter.dev/ui/accessibility
---

# Accessibility

Overview of Flutter's accessibility support: first-class framework support in addition to the underlying operating system, regulations to be aware of, and a release checklist.

## Signature / Usage

The page contains no Flutter code. The release checklist item "Active interactions" refers to replacing a no-op `onPressed` callback with one that shows a `SnackBar`; the screen reader tests named are TalkBack (Android) and VoiceOver (iOS).

```text
Release checklist (non-exhaustive)
- Active interactions        every pushable button does something
- Screen reader testing      TalkBack (Android), VoiceOver (iOS)
- Contrast ratios            at least 4.5:1 (except disabled components)
- Context switching          nothing changes context automatically while typing
- Tappable targets           at least 48x48 pixels
- Errors                     important actions can be undone; suggest a correction in error fields
- Color vision deficiency    usable and legible in colorblind and grayscale modes
- Scale factors              legible and usable at very large text size and display scaling
```

### Accessibility regulations

| Standard / law | Description |
|----------------|-------------|
| WCAG 2 | Web Content Accessibility Guidelines (WCAG) 2: internationally recognized standard for making web content accessible, developed by the W3C. |
| EN 301 549 | European harmonized standard for accessibility requirements for ICT products and services. |
| VPAT | Voluntary Product Accessibility Template: a free template that translates accessibility requirements and standards into actionable testing criteria. |
| ADA (U.S.) | Americans with Disabilities Act prohibits discrimination in public accommodations. |
| Section 508 (U.S.) | Section 508 of the Rehabilitation Act requires federal agencies and their contractors to meet WCAG standards for all ICT. |
| EAA (EU) | European Accessibility Act requires a wide range of public and private sector services to be accessible, primarily using EN 301 549 as its technical basis. |

## Notes

- Flutter includes first-class framework support for accessibility, including UI design and styling, and assistive technologies (screen reader) support.
- Controls and text should have a contrast ratio of at least 4.5:1 against the background, with the exception of disabled components. Images should also be vetted for sufficient contrast.
- Migration (Flutter 3.47): the `header` semantics property is now a no-op on iOS and Android; to declare a section heading for accessibility on these platforms use `headingLevel` with a value greater than `0`. See the semantics-header-heading-level breaking change in the release category.

## Related

- [UI design & styling](./accessibility-design.md)
- [Accessibility technologies](./assistive-technologies.md)
- [Accessibility testing](./accessibility-testing.md)
- [Web accessibility](./web-accessibility.md)
