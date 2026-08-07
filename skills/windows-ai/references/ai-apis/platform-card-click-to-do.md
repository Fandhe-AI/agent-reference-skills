# Application card - Click to Do

Responsible-AI transparency card for Click to Do, a Windows feature that offers contextual actions (summarize, rewrite, translate, extract tables, communication shortcuts, "Ask Copilot") on text and images currently visible on the user's screen, processed locally via Phi Silica and OCR on the NPU.

## Signature / Usage

No API surface — this is a Responsible AI transparency document, not a developer API. Developers can launch Click to Do from their app via the `ms-clicktodo://` URI scheme.

## Options / Props

| Feature | Description |
|------|-------------|
| Text actions | Copy, open-in-editor, or web search for any selection; 10+ word selections unlock AI summarize/bulleted-list/tone-rewrite via Phi Silica. |
| Image actions | Copy, save, share, open-with, visual search with Bing, background blur/erase/removal. |
| Table extraction | Table Structure Recognizer (TSR) reconstructs on-screen tables as structured data; copy as HTML or hand off to Excel. |
| Communication shortcuts | Detected email addresses offer "send email" / "start Teams message" / "schedule Teams meeting." |
| Ask Copilot | Sends selected content to Microsoft Copilot (or Microsoft 365 Copilot on Pro/Enterprise/Education). |

## Notes

- This is an **Application Card** (not a Platform Card) — Microsoft's naming distinguishes cards for end-user AI applications from cards for underlying AI platform services (e.g. Phi Silica, OCR).
- Requires a Copilot+ PC or eligible Cloud PC (40 TOPS NPU, 16 GB RAM, 8 logical processors, 256 GB storage).
- Advanced AI text actions require English, Spanish, or French content and a Microsoft account or Microsoft Entra account.
- All analysis runs locally; data is sent externally only for user-initiated actions like "Ask Copilot," "Search the web," or "Visual search with Bing."
- Models used: Phi Silica (language), OCR, and the Florence Vision Encoder (image understanding).

## Related

- [LanguageModel](./language-model.md)
- [TextRecognizer](./text-recognizer.md)
- [Application card - Recall](./platform-card-recall.md)
- [Responsible AI guidelines](./responsible-ai.md)
