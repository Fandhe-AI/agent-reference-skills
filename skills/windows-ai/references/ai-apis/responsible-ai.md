# Responsible AI guidelines

Recommended responsible-development practices for building generative AI features on Windows with the Windows AI APIs, following Microsoft's Responsible AI Standard and the NIST AI Risk Management Framework pillars: govern, map, measure, manage.

## Signature / Usage

No API surface — this is a set of process recommendations to apply alongside `ContentFilterOptions` and other Windows AI API safety controls.

## Options / Props

| Pillar | Key practices |
|------|-------------|
| Govern | Build the Microsoft Responsible AI Standard's six principles into your dev lifecycle; document capabilities/limitations; provide user notice, consent, and data-handling disclosures. |
| Map | Red-team the system (formal third-party red teaming for high-risk generative systems, internal red teaming at minimum for lower-risk systems); evaluate models via model cards, manual testing, and automated testing before shipping. |
| Measure | Apply content safety filters, meta-prompts, and blocklists; understand model provenance; use a single standardized moderation pipeline; apply UI mitigations (allow editing outputs, highlight inaccuracies, disclose AI's role, cite sources, limit input/output length); collect user feedback. |
| Manage | Monitor for abuse; roll out features in phases; maintain an incident response plan; provide a kill switch to disable the feature; support user blocking; collect telemetry (within privacy policy) to detect regressions. |

## Notes

- On-device Windows AI API models include local content safety classification and a default blocklist via `ContentFilterOptions`; this is a baseline, not a substitute for the practices above.
- Apply Content Credentials (C2PA standard) to AI-generated/modified images to support provenance transparency.
- See Microsoft's public **AI Application and Platform Cards** (e.g. for Paint, Click to Do, Windows Studio Effects) as examples for documenting your own feature's capabilities and limitations.
- LoRA-fine-tuned Phi Silica models carry additional risks (data quality, regurgitation, reduced generalization, reduced transparency) — see the fine-tuning guidance for mitigations.

## Related

- [Content moderation](./content-moderation.md)
- [Phi Silica LoRA fine-tuning](./phi-silica-lora.md)
