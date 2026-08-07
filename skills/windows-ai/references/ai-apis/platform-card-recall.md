# Application card - Recall

Responsible-AI transparency card for Recall, a Windows feature that periodically saves encrypted, locally-analyzed snapshots of screen activity so users can search and revisit past content using natural-language or semantic queries, with Click to Do available on top of any snapshot.

## Signature / Usage

No API surface — this is a Responsible AI transparency document for a Windows platform feature, not a developer API.

## Options / Props

| Capability | Description |
|------|-------------|
| Timeline | Explorable timeline of periodic screen snapshots, segmented by activity blocks. |
| Semantic search | Natural-language search across snapshot text/images (e.g. "thin crust pizza"). |
| Jump back into | Reopens the webpage/app/document that was active when a snapshot was taken. |
| Click to Do integration | Opens a found snapshot with Click to Do active for text/image actions. |
| Filtering & deletion | Filter apps/websites/sensitive info from snapshots; delete individual or bulk snapshots; pause/resume. |

## Notes

- This is an **Application Card** (not a Platform Card) — consumes on-device OCR for search; opt-in feature, off by default.
- Requires a Copilot+ PC meeting the Secured-core standard: 40 TOPS NPU, 16 GB RAM, 256 GB storage (50 GB free to enable; auto-pauses below 25 GB free).
- Requires Device Encryption/BitLocker and Windows Hello Enhanced Sign-in Security with biometric enrollment.
- Snapshots are encrypted locally and never shared with Microsoft, third parties, or other users on the same device (except user-submitted feedback screenshots).
- Sensitive-information filtering (passwords, credit cards, etc.) is enabled by default; supported browsers (Edge, Firefox, Opera, Chrome) support website and private-browsing filtering.
- Optimized for English, Chinese (simplified), French, German, Japanese, and Spanish.

## Related

- [Application card - Click to Do](./platform-card-click-to-do.md)
- [Platform card - Text Recognition (OCR)](./platform-card-ocr.md)
- [Responsible AI guidelines](./responsible-ai.md)
