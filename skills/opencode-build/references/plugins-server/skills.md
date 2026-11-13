---
source: https://opencode.ai/docs/build/plugins/server/#skills
---

# Skills

Read the skills available at a location and register, update, or remove skills with a transform.

## Signature / Usage

```ts
const skills = await ctx.skill.list()
```

Register a transform to inspect, add, update, or remove skills. `get(id)` returns the current editor entry, or `undefined` when the skill is absent.

```ts
import { Skill } from "@opencode/plugin"

await ctx.skill.transform((editor) => {
  const skills = editor.list()
  editor.add({
    id: Skill.ID.make("review"),
    name: Skill.Name.make("Review"),
    description: "Review the current changes",
    path: Skill.Info.fields.path.make("/workspace/.opencode/skills/review/SKILL.md"),
    content: "Review the current changes for correctness and missing tests.",
  })
  const review = editor.get("review")
  editor.update("review", (skill) => {
    skill.autoinvoke = true
  })
  editor.remove("legacy")
})
```

Reload skills after external state used by a transform changes.

```ts
await ctx.skill.reload()
```

### Reference

Schema: [`Skill.Info`](https://opencode.ai/docs/api/#schema-Skill.Info)

```ts
interface SkillContext {
  list(input?: SkillListInput, requestOptions?: RequestOptions): Promise<SkillListOutput>
  transform(callback: (editor: SkillEditor) => void): Promise<Registration>
  reload(): Promise<void>
}

interface SkillEditor {
  list(): readonly SkillInfo[]
  get(id: string): SkillInfo | undefined
  add(skill: SkillInfo): void
  update(id: string, update: (skill: SkillInfo) => void): void
  remove(id: string): void
}
```

## Notes

- OpenCode skills are distinct from Claude Code Agent Skills (anthropic-claude-code-extend) and Codex skills (openai-codex).

## Related

- [References](./references.md)
- [Transforms](./transforms.md)
