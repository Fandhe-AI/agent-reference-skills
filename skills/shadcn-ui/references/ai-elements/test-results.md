---
source: https://ui.shadcn.com/docs/ai-elements/base/test-results
---

# Test Results

A test run by the agent. The summary line counts what passed and failed. Open it to see each suite, its tests, and the error for each failure. Built with `Trace` with a `TraceCollapsible` for the run and for each suite.

## Signature / Usage

```bash
npx shadcn@latest add trace code-block
```

Manual install: `npx shadcn@latest add collapsible code-block`, then copy `components/ui/trace.tsx`.

```tsx
<Trace>
  <TraceCollapsible>
    <TraceCollapsibleTrigger>
      <TraceLine status="error">
        <TraceIcon>
          <FlaskConicalIcon />
        </TraceIcon>
        <TraceTitle>Ran 2 tests, 1 failed</TraceTitle>
      </TraceLine>
    </TraceCollapsibleTrigger>
    <TraceCollapsibleContent>
      <Trace>
        <TraceLine>
          <TraceIcon>
            <CheckIcon />
          </TraceIcon>
          <TraceTitle>creates a user</TraceTitle>
        </TraceLine>
        <TraceCollapsible>
          <TraceCollapsibleTrigger>
            <TraceLine status="error">
              <TraceIcon>
                <XIcon />
              </TraceIcon>
              <TraceTitle>updates a user profile</TraceTitle>
            </TraceLine>
          </TraceCollapsibleTrigger>
          <TraceCollapsibleContent>
            <CodeBlock size="sm">
              <CodeBlockContent wrap className="max-h-64">
                Expected status 200, received 500
              </CodeBlockContent>
            </CodeBlock>
          </TraceCollapsibleContent>
        </TraceCollapsible>
      </Trace>
    </TraceCollapsibleContent>
  </TraceCollapsible>
</Trace>
```

## Notes

- Suites: group tests by file. Each suite is a collapsible line with a `Trace` of its tests. Open the suites that have a failure.
- AI SDK: run the tests as a tool and render its output. The tool states map the same way as in Tool.

```tsx
const tests = part.output.suites.flatMap((suite) => suite.tests)
const failed = tests.filter((test) => test.status === "failed").length

<TraceCollapsible defaultOpen={failed > 0}>
  <TraceCollapsibleTrigger>
    <TraceLine status={failed > 0 ? "error" : undefined}>
      <TraceTitle>
        Ran {tests.length} tests{failed > 0 && `, ${failed} failed`}
      </TraceTitle>
    </TraceLine>
  </TraceCollapsibleTrigger>
  <TraceCollapsibleContent>...</TraceCollapsibleContent>
</TraceCollapsible>
```

- Migration from AI SDK Elements `test-results.tsx`: keep `summary`. `TestResultsHeader` -> `TraceCollapsibleTrigger` + `TraceLine` (`status="error"` when a test failed); `TestSuite` -> `TraceCollapsible` open when it has a failure; `Test` -> `TraceLine`; `TestError` -> `CodeBlock size="sm"`. Keep `TestResultsDuration`, `TestResultsProgress`, `TestSuiteStats`, `TestName`, `TestDuration` and `TestStatus`.
- Base UI variant is canonical. Radix variant: `https://ui.shadcn.com/docs/ai-elements/radix/test-results`; React Aria variant: `https://ui.shadcn.com/docs/ai-elements/aria/test-results`.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend). It only renders results; the test runner itself (skills vitest / playwright) is separate. It is not an agent runtime (skills openai-agents / anthropic-agent-sdk).

## Related

- [Terminal](./terminal.md)
- [Tool](./tool.md)
- [Trace](../components-chat/trace.md)
