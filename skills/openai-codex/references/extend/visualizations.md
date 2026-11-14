# Visualizations

Visualizations turn questions and data into charts, maps, diagrams, calculators, simulations, and interactive explanations inside a ChatGPT chat. The preview is rolling out; availability depends on plan, platform, account, and workspace.

## Signature / Usage

```text
@Visualize how supply and demand determine a market price. Let me shift each curve, mark the equilibrium, and explain how price and quantity change.
```

Type `@`, start entering `Visualize`, and select **Visualize** under **Plugins** (description: "Create visualizations and interactive tools"); the composer adds a **Visualize** tag. You can also type `@Visualize`. In a ChatGPT Space page, type `/visualize` followed by your request.

## Options / Props

### Availability

| Surface | Current availability |
|---------|----------------------|
| ChatGPT on the web | Available to supported accounts in Chat and ChatGPT Work |
| ChatGPT desktop app | Rolling out in preview |
| ChatGPT mobile apps | Rolling out to eligible accounts; composer controls can differ by app version |
| Codex CLI and IDE extension | Visualization rendering isn't supported |

### Choosing a format

- Diagram for labeled relationships or a process; chart or plot for named numeric data; map for geographic information.
- Interactive visualization when inputs, time, motion, or spatial relationships should change.
- A Site when you need a durable hosted application with a shareable URL, permissions, or persistent data.

## Notes

- The **Visualize** suggestion is the reliable sign the preview is enabled for your account.
- Name the outcome, source material, question, and useful interactions; say which information to use (chat content, pasted data, attached file, connected source). Pick a higher reasoning setting for complex requests.
- Follow-ups can add/remove controls, correct data, aggregate/bin/sample for speed, add a text summary and data table, make controls keyboard accessible, and avoid color-only encoding. A follow-up may create a replacement visualization rather than editing in place.
- Sharing uses the chat's **Share** action; a visualization is generally a snapshot, not a live dashboard. Review the entire shared chat first. Export controls vary by result.
- If the result is blank or missing: wait, reload once, retry; then ask for a smaller or simpler version, aggregate data, remove a failing control or library, or ask for a chart, diagram, table, or Site.
- Source: https://learn.chatgpt.com/docs/visualizations (retrieved 2026-11-14).

## Related

- [Image generation](./image-generation.md)
- [Plugins](./plugins.md)
