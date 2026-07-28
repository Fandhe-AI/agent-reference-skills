# Design your app for bidirectional text

Design philosophy and case studies for combining left-to-right (LTR) and right-to-left (RTL) writing systems in a Windows app.

## Signature / Usage

Windows ships with nine BiDi languages: two fully localized (Arabic, Hebrew) and seven Language Interface Packs (Persian, Urdu, Dari, Central Kurdish, Sindhi, Punjabi (Pakistan), Uyghur).

Four elements drive BiDi design decisions:

- **UI mirroring** — RTL content is presented in its native (mirrored) layout so the design feels local to BiDi markets.
- **Consistency** — UI elements share a consistent layout direction so the experience feels natural in RTL orientation.
- **Touch optimization** — elements remain easy to reach and natural to touch in the mirrored layout.
- **Mixed text support** — good directionality handling for mixed LTR/RTL text within the same string or UI.

## Notes

- Long text blocks (more than two or three lines, five or more words) are often better left aligned even in an otherwise RTL UI, because right-aligned wide text blocks are harder to track between lines while reading — separate text-layout direction from overall alignment for such cases.
- Neutral characters at the start/end of a mixed-direction string may need explicit Unicode direction markers (`‎` LTR, `‏` RTL) prepended/appended so they don't inherit the wrong directionality from surrounding context.
- The BiDi Parenthesis Algorithm (BPA) ensures paired parentheses display correctly regardless of language or alignment.
- For the concrete `FlowDirection` API and code needed to implement RTL layout, see [Adjust layout and fonts, and support RTL](./rtl-layout.md); this page covers design rationale and UX patterns rather than API usage.

## Related

- [Adjust layout and fonts, and support RTL](./rtl-layout.md)
- [Globalization and localization](./globalization-localization.md)
