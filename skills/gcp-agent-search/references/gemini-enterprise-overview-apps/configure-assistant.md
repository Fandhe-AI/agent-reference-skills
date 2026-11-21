---
source: https://docs.cloud.google.com/gemini/enterprise/docs/configure-assistant
---

# Configure and chat with the Gemini Enterprise assistant

Admin side: the console procedure for configuring the assistant (Configurations, Assistant tab) of a Gemini Enterprise (formerly Agentspace) app: additional LLM system instructions, web grounding, location context, Model Armor, Knowledge Catalog integration, banned phrases and chat history retention, then **Save and publish**. User side: how end users chat with the assistant: questions and sources, voice input, chatting with files in connectors, uploading files, mentions with `@`, faster responses, export to Google Docs and Sheets, diagnostic info and usage limits.

## Signature / Usage

### Additional LLM system instructions (example)

Console path: Gemini Enterprise page, click the app, **Configurations**, **Assistant** tab. In the **Additional LLM system instructions** section, select **Customize** and enter the instructions, for example:

```text
Make the summary headings bold
List the resources as an unordered list
```

### Other assistant settings (same tab)

- **Enable web grounding**: switch the toggle on, then select **Google search (not Data Residency compliant)** to use the standard Google Search index for grounding, or **Enterprise web search (Data Residency compliant)** to use the enterprise-grade and compliant web index.
- **Default web search state**: on enables web search by default for new queries, off disables it by default. Users can always change this setting manually for each search.
- **Enable location context**: on allows the app to use location data to improve the quality of responses; off disables it.
- **Enable Model Armor**: configure Model Armor and set up the Model Armor templates (see "Configure Model Armor").
- **Enable Knowledge Catalog**: turns the Knowledge Catalog integration on or off. It is automatically enabled when you attach a BigQuery, Spanner, Cloud SQL or AlloyDB for PostgreSQL data store in federated query mode, or you can turn it on or off manually at any time.
- **Banned phrases**: click **Add banned phrase**, enter the phrase and choose the match type. **Simple string match** is a substring match (if **Hello** is banned, both **Hello world** and **Helloworld** are rejected). **Word boundary string match** blocks the phrase as a whole word (**Hello world** is rejected, **Helloworld** is accepted). With multiple phrases, the query is blocked if any configured banned phrase is present in the input.
- **Chat history retention period**: 1, 30, 60, 90, 120 or 180 days (the default is 60 days). Chat sessions older than the selected period are automatically deleted.

Finish with **Save and publish**.

### Chat with the assistant (end users)

- Ask questions and view sources: type a question (or use voice), ask follow-up questions, review transparent thinking (plan explanation before a tool or data source call, an expandable tool activity section, faster time to first token), click **Sources** at the end of the response and hover over a source to highlight the supported portion. Prompt suggestions such as **Help me write** start a new conversation.
- Voice: the administrator must turn on the **speech-to-text** feature (Manage web app features). Click the mic icon, allow recording if prompted, speak, click the stop icon, review the transcribed text and submit. The recording is transcribed but not stored.
- Chat with files in connectors: a Gemini Enterprise admin must enable the required connector actions. Authorize Gemini Enterprise to access the connector data, click **Connectors**, turn on the connector you want and turn off the other connectors and Google Search, then enter a prompt; include the filename if you know it (for example "Summarize the key points in the file 'Q3-Marketing-Budget.xlsx'."). The assistant displays the executed code for XLSX and CSV files.
- Upload files: click the upload icon in the chat box, upload one or more files (or add files from connected Google Drive or Microsoft OneDrive Business accounts), then enter a prompt.
- Mentions: type `@` to mention an agent, person or uploaded file, or enter `@` and a workflow agent name to launch that workflow agent.
- Export: **Export to Docs** for a response, **Export to Sheets** for a table or CSV data; the exported file uses the same name as the chat session.
- Diagnostic info for Support: at the end of the conversation click the icon, **Show diagnostic info**, then **Copy token**.

## Options / Props

### Upload file formats and size limitations

| File type | Description |
|---|---|
| Images | Maximum image size: 30 MB. Supported file extensions: `.png`, `.jpeg`. |
| Documents | Maximum document size: PDF: 100 MB; XLSX: 50 MB (footnote 1; the XLSX limit applies to the size of the file after it's decompressed; each worksheet of a multi-sheet workbook becomes a separate table; a workbook can contain at most 15,000,000 cells in total across all worksheets, counting the range from the first to the last non-empty cell of each worksheet, so empty cells inside that range also count; larger workbooks are rejected with a generic error such as `Precondition check failed`, so split them); CSV: 7 MB (footnote 1); DOCX: 3 MB; PPTX: 100 MB; Text: 7 MB; Markdown: 2 MB; JSON: 1 MB; JavaScript: 1 MB; HTML: 3 MB (footnote 2); CSS: 1 MB; Java: 1 MB; Python: 2 MB. Supported file extensions: `.pdf`, `.xlsx`, `.csv`, `.docx`, `.pptx`, `.txt`, `.md`, `.json`, `.js`, `.html`, `.css`, `.java`, `.py`. |
| Video | Maximum document size: 200 MB. Supported file extensions: `.mp4`. |
| Audio | Maximum document size: 200 MB. Supported file extensions: `.mp3`. |

### Chat with files in connectors

| Connectors | Supported files | Required connector actions |
|---|---|---|
| Google Drive | CSV, PDF, PPTX, XLSX | Download document |
| Microsoft SharePoint | CSV, PDF, PPTX, XLSX | Download document |
| Microsoft Outlook | Email attachments | Download attachment |
| Box | CSV, PDF, PPTX, XLSX | Download file |

### Limitations by data source

| Data source | Limitation |
|---|---|
| Google Workspace | Admin restrictions: a Google Workspace administrator can restrict your access to Gemini Enterprise in Google Workspace entirely (you can't invoke Gemini Enterprise agents in Google Workspace), access to some or all Google Workspace data by Gemini Enterprise, or sharing Gemini Enterprise conversations (Gemini Enterprise Business edition only; anyone with the link sees an error). Content owner restrictions: Gemini can access only Drive files shared with you, and not a file whose owner doesn't allow you to download, copy and print it. |
| All data sources | Images from data sources aren't rendered in the chat. |
| Microsoft Outlook | Not supported: searching for most recent or oldest emails (for example `first`, `earliest`, `latest`, `most recent`), fetching email threads to generate answers, gathering information from multiple emails, words based on intent or semantics rather than literal meaning, and information from email attachments unless they are explicitly mentioned in the email's subject or body. |
| Microsoft OneDrive | Queries that request to list the items in a directory are not supported. |
| Microsoft SharePoint | Queries that request to list the items in a directory are not supported. |

### Troubleshooting voice input

| Issue | Root cause | Recommended action |
|---|---|---|
| No transcription appears | Microphone permission might be blocked in your browser. | Give the microphone permission to record. |
| Inaccurate transcriptions | Background noise or low input volume. | Speak directly into your microphone, or adjust your system's microphone input volume in your OS settings. |

## Notes

- Retention: the chat age is based on the creation date (not last use), so chats that users interacted with as recently as yesterday disappear without warning when the retention period is reached (for 60 days, a chat started 60 days ago is deleted even if used yesterday). Inform your users.
- Footnote 1: the XLSX and CSV size limits aren't row limits, but XLSX workbooks are subject to the 15,000,000-cell limit. For large spreadsheets the assistant analyzes the data by running code instead of reading the entire file, so responses can take longer.
- Footnote 2: 3 MB is the limit for HTML files added to a project. An HTML file uploaded in a chat must also fit within the 800,000-token budget; because markup counts toward it, HTML files larger than about 2.5 MB usually exceed it.
- Token budget: the combined content of all files uploaded in a chat session (including static knowledge files of a custom chat agent) and the conversation history can't exceed 800,000 tokens; exceeding it returns a `FILE_SIZE_TOO_LARGE` or `Input too long` error even if each file is within its byte limit. Start a new chat, split large PDFs (such as manuals over 100 pages) into smaller topical files, or ask your administrator to index large collections in a connected data store.
- First OneDrive Business use may need a Microsoft Entra ID Global Administrator or Application Administrator to choose **Consent on behalf of your organization** once per tenant.
- Faster responses: turn on only the connectors, custom MCP servers and Google Search you need; start a new chat when you change topics; attach only needed files (for large XLSX and CSV files keep only needed sheets, columns and rows, split workbooks, or store the data in BigQuery and connect a BigQuery data store); ask specific questions; choose the model if the administrator enabled the model selector (**Auto** by default, Flash models for low latency, Pro models for complex reasoning, coding and multi-document synthesis); prefer ingested data stores over live federated connectors for large or frequently used data.
- Transparent thinking in a language other than English might initially appear in English. The **Sources** button appears only under the most recent response containing grounding metadata; inline citation chips in older responses remain visible.
- Usage limit reached: shown when the project reached its monthly spend cap, or exceeds its pooled quota limit for a feature and the administrator hasn't enabled overages; only that feature is affected.
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/configure-assistant (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/assistant-chat (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agents-overview.md](./agents-overview.md)
- [quickstart-gemini-enterprise.md](./quickstart-gemini-enterprise.md)
- [create-app.md](./create-app.md)
