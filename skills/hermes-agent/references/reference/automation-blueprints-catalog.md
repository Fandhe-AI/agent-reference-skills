# Automation Blueprints Catalog

Automation Blueprints are ready-to-run automations: pick one, fill in a few fields, and Hermes schedules it as a cron job without cron syntax.

## Signature / Usage

```text
/blueprint morning-brief
/blueprint morning-brief time=08:00
/blueprint teamtools:standup
```

Surfaces:

- Dashboard / desktop app: Cron page, **Blueprints** tab, fill the form, click *Schedule it*.
- CLI, TUI, messengers: `/blueprint <name>`; Hermes asks one question at a time, or take values inline (`key=value`).
- Desktop app: **Send to App** on a blueprint preloads the command in the composer.

## Notes

- Blueprints never schedule silently; you always confirm. Manage created jobs with `/cron`.
- Name matching is forgiving (prefix or near-spelling resolves).
- Plugins can add blueprints; keys are prefixed with the plugin name (`teamtools:standup`) so they cannot replace built-ins. They appear only in profiles where the plugin is enabled. Disabling the plugin removes the blueprint from the catalog but already-created jobs keep running.
- A blueprint is a skill whose `SKILL.md` frontmatter has a `metadata.hermes.blueprint` block; plugin authors can register one with `ctx.register_automation_blueprint()`.
- The built-in blueprint list is rendered by a site component (`AutomationBlueprintsCatalog`) and is not present in the source markdown, so individual blueprint names are not listed here.
- Source: https://hermes-agent.nousresearch.com/docs/reference/automation-blueprints-catalog (pinned to v0.22.2)

## Related

- [Bundled Skills Catalog](./skills-catalog.md)
- [Optional Skills Catalog](./optional-skills-catalog.md)
