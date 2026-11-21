---
source: https://docs.cloud.google.com/gemini/enterprise/docs/quickstart-gemini-enterprise
---

# Gemini Enterprise quickstart and user journey

Console tutorial that creates a Gemini Enterprise (formerly Agentspace) app, connects a Cloud Storage data store with sample PDFs of a fictional bank (Cymbal Bank), previews the web app, configures the search web app and cleans up. Complete "Before you begin" of the setup guide first. The page also summarizes the "Get started" entry page for app users, knowledge workers and team members: the web app and mobile app experiences and the discover / create / share journey.

## Signature / Usage

### Create the app

In the console Gemini Enterprise page, click **Create app**, enter a name under **Your app name** (the app ID appears under it), select **global (Global)** as the location, enter the company or organization name under **External name of your company or organization** (for this tutorial, `Cymbal Bank`) and click **Create**. You are redirected to the **Overview** page of the app.

### Create the data store

Under **Complete your setup**, click **Create Data Store**; under **Cloud Storage**, click **Select**; make sure **Unstructured Data Import (Document Search & RAG)** with **Documents**, **Synchronization frequency** **One time** and **Folder** are selected. Enter this value in the **`gs://`** field (a bucket with PDF files for internal use by the fictional Cymbal Bank), click **Continue**, enter a data store name and click **Create**:

```text
cloud-samples-data/gen-app-builder/search/cymbal-bank-employee
```

### Preview, configure and view the web app

- Preview: in **Overview**, under **Your Gemini Enterprise webapp is ready**, open the web app link; click **Connectors** and make sure **Google Search** is not selected; ask `How do I book business travel?`, then `Who founded Cymbal Bank?` or `Where are the headquarters of Cymbal Bank?`.
- Configure: in **Configurations**, the **Search UI** tab sets the search app settings (under **Appearance and branding options** change the logo, then **Save and publish**), the **Autocomplete** tab sets **Enable autocomplete** to **Now**, and the **Assistant** tab sets additional LLM system instructions, Model Armor, web grounding and other settings of the default assistant.
- View: in **Integration**, make sure **Enable the Web App** is enabled, then copy the link in **The link to your web app** section; optionally share the URL with your users.

Logo used in the appearance step:

```text
https://storage.googleapis.com/cloud-samples-data/gen-app-builder/search/cymbal-bank-logo.png
```

### User journey in the web app (Get started)

- Experiences: the web app (query company data, create documents in Canvas, build skills or agents) and the mobile app (access company data, chat with agents, use voice and camera multimodal inputs, manage tasks on the go; guide `use-the-mobile-app`).
- Discover: chat with the assistant (`assistant-chat`, `assistant-organize`); tailor appearance and personalization (`configure-appearance`, `configure-personalization`); assistant actions on Google Workspace and approved third-party apps such as Jira or Microsoft, and connector files (`assistant-use-actions`); Agent Gallery, Deep Research and Co-Scientist (`agent-gallery`, `research-assistant`, `co-scientist`); browse, install and invoke domain-specific skills (`skills`).
- Create: documents and presentations in Canvas (`assistant-canvas`); custom images and visual media (`assistant-analyze`); Gemini Notebook Enterprise private notebooks grounded in uploaded documents, Google Drive files and web links, with audio overviews (`notebooklm-enterprise/docs/overview`, `access-notebooklm`); no-code single or multi-step agents in Workflow Builder using natural language prompts, data connectors and scheduled tasks (`workflow-builder`, `workflow-builder/edit-chat-agent`); custom skills defined as reusable instructions in a `SKILL.md` file with optional context files (`skills`).
- Share: share conversations, research responses and assistant outputs (`share-conversations`); share custom agents with team members, specific Google groups or the organization-wide gallery (`workflow-builder/share-chat-agent`); import and export custom skill definitions (`skills`).

## Notes

- Indexing and syncing the data store takes a few minutes, so the preview isn't available immediately. If an answer doesn't specifically reference Cymbal Bank, wait a few more minutes and try again.
- Autocomplete: expect to wait a day or two before autocomplete suggestions appear.
- Clean up: delete the project if you created it only for the tutorial. In an existing project, delete only the app and data store created for the tutorial (try deletions in a disposable project first) and leave Gemini Enterprise on; turn it off only in a project dedicated to the tutorial that you keep.
- Adapted from the official docs: the source ends its cleanup with "Follow the steps in Turn off Gemini Enterprise" for every case; the security overview page says "To disable the Gemini Enterprise (Discovery Engine) API, see Turn off Gemini Enterprise", which in an existing project also affects its other apps.
- Guide names in the user journey are relative to `https://docs.cloud.google.com/gemini/enterprise/docs/`; the assistant chat, Agent Gallery and app pages of this category are agents-overview.md, configure-assistant.md and create-app.md.
- Gemini Enterprise skills (a `SKILL.md` file that teaches the Gemini Enterprise assistant) are a feature of this product; they are not Claude Code Agent Skills.
- The quickstart source also shows an "Intro to Gemini Enterprise" notebook and a Guide me console tour; the Get started source also links an overview video and example use cases by role (finance, HR, legal, marketing, sales, support).
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/quickstart-gemini-enterprise (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/get-started (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/gemini/enterprise/docs/security-overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-app.md](./create-app.md)
- [apps-data-stores.md](./apps-data-stores.md)
- [configure-assistant.md](./configure-assistant.md)
- [agents-overview.md](./agents-overview.md)
