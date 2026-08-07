# Application card - Microsoft Paint

Responsible-AI transparency card for Microsoft Paint's generative AI features — Cocreator, Image Creator, Generative fill, Sticker generator, and Object select — which combine on-device models (Copilot+ PCs) and cloud-based Azure OpenAI Service models for text/sketch-to-image generation and AI-assisted editing.

## Signature / Usage

No API surface — this is a Responsible AI transparency document for a built-in Windows application, not a developer API.

## Options / Props

| Feature | Description |
|------|-------------|
| Cocreator | Text description + freehand sketch on the canvas generates image variations (on-device on Copilot+ PCs). |
| Image Creator | Text-to-image generation without a sketch; cloud-based, requires a Microsoft account. |
| Generative fill | Select a region and describe what to insert; multiple blended options offered. |
| Sticker generator | Short text prompts produce small reusable graphics. |
| Object select | AI-assisted click-to-isolate object selection for move/edit/erase. |

## Notes

- This is an **Application Card** (not a Platform Card) — distinguishes end-user AI applications from underlying AI platform services (e.g. Phi Silica, Image AI APIs).
- Hybrid execution: Cocreator runs on-device on supported Copilot+ PCs; Image Creator and safety/content-filtering rely on cloud services (Azure OpenAI Service) and require sign-in.
- AI-generated/edited images carry Content Credentials (C2PA standard) for provenance transparency.
- AI features are user-initiated only — Paint is explicitly documented as not an autonomous/agentic AI system.
- Organizations can disable specific generative-AI features via group policy.

## Related

- [ImageGenerator](./image-generator.md)
- [Platform card - Image AI APIs](./platform-card-image-ai-apis.md)
- [Responsible AI guidelines](./responsible-ai.md)
