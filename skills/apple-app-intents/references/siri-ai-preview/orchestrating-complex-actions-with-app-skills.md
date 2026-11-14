---
source: https://developer.apple.com/documentation/appintents/orchestrating-complex-actions-with-app-skills
---

# Orchestrating complex actions with app skills

Guide Siri AI through a complex task that involves several tool intents by providing an app skill.

## Signature / Usage

An app skill is a folder named after the skill, containing one `SKILL.md`, inside a `Skills.skillsbundle` in your Xcode project:

```text
Skills.skillsbundle/
└── Skills/
    ├── name-of-skill-01/
    │   └── SKILL.md
    └── name-of-skill-02/
        └── SKILL.md
```

Metadata (frontmatter) of a skill:

```yaml
---
name: flight-add
description: This skill guides the user through adding a flight to TravelPlanningExample.
---
```

Body of a skill (free-form Markdown guidance):

```markdown
---
name: flight-add
description: Adds a flight with detailed information to the list of tracked flights.
---
When adding a flight using the create flight tool, be sure to
interview the user for the parameters if you don't already
have them. First, ask the user where they are going, and when
they leave. Then ask for the airline, then the flight number.
Finally, ask the user how long the flight is going to be and
calculate the end duration from there. When you've got all
the info, add the flight. Then, follow up with a prompt to
see if they want to name the flight, and give a suggested
name based on the info, or offer to let them change it. Lastly,
ask if the flight is for a friend or for them, and use the
set flight kind tool to update that information in
TravelPlanningExample.
```

## Options / Props

| Frontmatter field | Rule |
| --- | --- |
| `name` | Required. 1-64 lowercase characters (letters, digits, hyphens); not starting or ending with a hyphen; no `--`; must match the skill's directory name. |
| `description` | Required, single line, not empty, at most 1024 characters. Explains what the skill does and when to use it; Siri uses it to decide whether the skill applies without reading the body. |

| Limit / rule | Value |
| --- | --- |
| Body length | At most 10,000 characters |
| Skills bundles per app target | One `.skillsbundle` |
| Files in the bundle | Each directory in `Skills/` must contain a `SKILL.md`; no other files |
| Skill names | Unique across the app, its extensions and embedded frameworks (otherwise the system uses an undefined one) |

## Notes

- Add the bundle with File > New > File from Template > Skills Bundle (Resource section), keep the name `Skills`, and select the app target. Xcode adds it to the target's Copy Bundle Resources phase; if it is missing there, or the bundle has compile-time errors, the app provides no skills to Siri.
- Xcode validates the bundle at build time and compiles it into the app bundle; on a device that supports the Siri AI Developer Preview the system indexes the compiled skills of the app, its extensions and embedded frameworks.
- App skills add information only; they cannot enforce deterministic behavior, and Siri does not sequentially perform the tool intents a skill lists.
- App skills use a subset of the Agent Skills format: only the `name` and `description` frontmatter fields and a Markdown body. Siri supports no other frontmatter fields and no supporting files such as scripts or references.
- Distinct from Claude Code Agent Skills and from this repository's skills: an Apple app skill is a `SKILL.md` inside `Skills.skillsbundle` that Siri reads on a device; it is not loaded by Claude Code, Codex or OpenCode.
- Write the body informally (for example "call the get weather tool first" rather than naming `GetWeatherIntent`), do not repeat what intent and entity titles and descriptions already say.
- Verify on a device (not the Simulator) or through TestFlight internal testers; try requests that match the skill's `description`, and the app name while the app is in the background. Siri Evaluations lets you automate such checks (page not fetched here).
- iOS 27.3+ (beta) context; the article page carries no platform metadata. Apple states that during the Siri AI Developer Preview the App Intents API and Siri functionality may change.
- Source: https://developer.apple.com/documentation/appintents/orchestrating-complex-actions-with-app-skills (fetched 2026-11-14)

## Related

- [Bringing custom actions and content to Siri](./bringing-custom-actions-and-content-to-siri.md)
- [ToolIntent](./toolintent.md)
- [Siri AI Developer Preview](./siri-ai-developer-preview.md)
