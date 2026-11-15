---
source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/style-guide
---

# Tutorial style guide

Guidelines for presenting content in Cloud Shell tutorial form.

## Signature / Usage

### Cloud Shell features

- **Unique layout:** Tutorials are presented in a side panel on the right hand side of Google Cloud console.
- **Navigation:** Users can move through the tutorial using the **Next** and **Previous** buttons in each step. They can also close the tutorial and resume from where they left off.
- **Code to go:** Code snippets can be copied directly into Cloud Shell.

### Writing style

- **Keep it light:** Tutorials should be informative and helpful in tone, but not overly formal.
- **You, the user:** Use second person pronouns (do use: you, your; don't use: we, I, our, and so on).
- **Explain cause and effect:** When asking users to carry out a step, explain the reasoning behind the action and the expected result.
- **Have focused goals:** Before writing the content, establish a well-defined goal you want your users to accomplish.

The source gives three original/revised examples. The second one revises "Run this command:" into an explanation first, followed by the command:

Adapted (not in the official docs): the fetched source escapes the brackets (`table\[box,title=Projects\]`); they are unescaped so the command runs.

```bash
gcloud projects list --format="table[box,title=Projects](name, projectId)"
```

Revised wording: "To display a tabulated list of all your projects and their ID numbers, titled 'Projects', run the following command:".

### Best practices

- **Keep it short:**
  - Aim for no more than 5 steps and 3 code snippets per page.
  - Paragraphs should ideally be 5 lines or fewer and deal with a singular concept.
  - If a page must be long, aim for a maximum of twice the length of the pane.
  - Code and terminal blocks: aim for 10 lines or less and 80 characters or less per line. Avoid multi-command code blocks to prevent users from having to do a bulk copy-execute.
- **Introductory page:** set expectations (how users profit), give an estimated time commitment (aim for under 15 minutes; if longer, or more than 15 densely worded pages, break it into a series), and state prerequisites up front.
- **Background page:** set the scene with a short overview of the product or a run through of salient UI features.
- **Basic examples:** the first example should be a Hello World equivalent simple enough to test without much explanation, and serve as a base to build on.
- **Tutorial content:**
  - Format with caution (bold, italics only for warnings, key learnings).
  - Use imperative tense for user actions and end sentences with a period.
  - Include supplementary links (`[link text](link URL)`) where essential for context.
  - Choose spotlighting over screenshots.
  - If possible, provide a link to the tutorial content as static content.
  - Add tips, called out by `**Tip:**`.
- **Summary:**
  - Add a trophy icon to appreciate users who finish the tutorial:

    ```text
    <walkthrough-conclusion-trophy></walkthrough-conclusion-trophy>
    ```

  - Summarize important lessons, give next steps (recommended reading, resources, another tutorial), and advise users to clean up test resources to avoid unwanted billing charges.

## Notes

- The source presents its Example blocks (introduction, background, hello world, writing in Markdown, congratulations) as single-line table cells; they are summarized here rather than reconstructed. The Congratulations example ends with `gcloud projects delete <PROJECT-ID>` to delete test projects.
- The source's `gcloud projects list` example is rendered with escaped brackets (`table\[box,title=Projects\]`) from Markdown conversion; they are unescaped here.
- Source: https://docs.cloud.google.com/shell/docs/cloud-shell-tutorials/style-guide (retrieved 2026-11-14; CC BY 4.0, code samples Apache 2.0)

## Related

- [writing-tutorials.md](./writing-tutorials.md)
- [private-tutorials.md](./private-tutorials.md)
- [directives-layout.md](./directives-layout.md)
- [directives-spotlights.md](./directives-spotlights.md)
