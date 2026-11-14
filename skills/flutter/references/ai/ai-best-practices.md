---
source: https://docs.flutter.dev/ai/best-practices
---

# Flutter AI best practices

Best practices for building AI-powered Flutter apps with the Firebase AI Logic SDK: guardrails to verify and correct AI-generated data, and how to balance LLM capabilities with traditional code (mode of interaction). Demonstrated by the Crossword Companion sample app.

## Signature / Usage

The page set covers four topics, each with its own page in this skill: prompting, structured input and output, tool calls (function calls), and mode of interaction. The mode-of-interaction guidance is summarized below.

Model the LLM like a user, not a function: treat what it returns as nondeterministic, often wrong (partially or wholly) and sometimes random, and build the same guardrails around LLM input as around user input.

## Options / Props

Which parts of the sample suit an LLM vs plain code (from the page):

| Task | LLM Suitability | Code Suitability |
| --- | --- | --- |
| Parsing the grid for size, contents and clues | Great for an LLM by using vision and language understanding | Difficult to write the code to do this |
| Validating grid contents | Possible to do with another LLM checking the work | Easier for a human to glance at and adjust |
| Handling the task list | An LLM is unlikely to do this consistently | Easy to write the code to loop through a task list, updating as it goes |
| Solving each clue | Great for an LLM using language understanding and generation | Difficult to do given real world clues that depend on word play, names, and slang |
| Resolving conflicts | An LLM is inconsistent on this kind of looping | Easy for a human to glance at and adjust |

## Notes

- Guardrails for AI-written code: the Flutter analyzer, unit tests, and `skills_lint` for agent skills. Guardrails for AI-implemented features: let users verify and correct AI-generated data (in the sample the AI misreads a 5x5 grid as 4x5) because bad data leads to bad results.
- Ask vs agent: an LLM is in "ask" mode when prompted without tools that affect the world (no tools, or tools only for looking up data); it is in "agent" mode when given tools that operate on your behalf (reading and writing files, running commands, loading web pages, calling web APIs). The difference is the tools you supply, not the model or the prompt.
- Guardrails: test against real LLMs with a wide variety of prompts and mock the tools to evaluate how the LLM uses them. The sample added human-in-the-loop guards against attempting to solve an invalid puzzle or conflicting solutions.
- Separation of concerns: the sample took task-list management out of the LLM's hands because the model updated it only once or twice in big chunks even with prompting; do it in code when you reasonably can.
- The source mentions Gemini 3 Pro Preview and Gemini 2.5 models by name; model names are as of the page and not normalized here. The page links a "Developer experience" page that is not present in the pinned docs tree.
- This is the Flutter / Firebase AI Logic view of LLM-powered features; the Gemini API itself is covered by the google-gemini-api skill.
- Source: https://docs.flutter.dev/ai/best-practices and https://docs.flutter.dev/ai/best-practices/mode-of-interaction (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Prompting](./ai-best-practices-prompting.md)
- [Structure and output](./ai-best-practices-structure-output.md)
- [Tool calls (aka function calls)](./ai-best-practices-tool-calls.md)
- [Flutter AI Toolkit](./ai-toolkit.md)
- [How Flutter AI tools work](./ai-tools.md)
