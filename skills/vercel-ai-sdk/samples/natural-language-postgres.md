---
source: https://ai-sdk.dev/cookbook/guides/natural-language-postgres
---

# Natural Language Postgres

Turn a natural-language question into a SQL query with `generateText` and `Output.object` inside a Server Action, then run it from the page.

```ts
// app/actions.ts
// ...other imports...
import { generateText, Output } from 'ai';
import { z } from 'zod';

// ...rest of the file...

export const generateQuery = async (input: string) => {
  'use server';
  try {
    const result = await generateText({
      model: 'openai/gpt-6-astra',
      instructions: `You are a SQL (postgres) ...`, // SYSTEM PROMPT AS ABOVE - OMITTED FOR BREVITY
      prompt: `Generate the query necessary to retrieve the data the user wants: ${input}`,
      output: Output.object({
        schema: z.object({
          query: z.string(),
        }),
      }),
    });
    return result.output.query;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to generate query');
  }
};
```

```typescript
// app/page.tsx
// ...other imports...
import { runGeneratedSQLQuery, generateQuery } from './actions';

// ...rest of the file...

const handleSubmit = async (suggestion?: string) => {
  clearExistingData();

  const question = suggestion ?? inputValue;
  if (inputValue.length === 0 && !suggestion) return;

  if (question.trim()) {
    setSubmitted(true);
  }

  setLoading(true);
  setLoadingStep(1);
  setActiveQuery('');

  try {
    const query = await generateQuery(question);

    if (query === undefined) {
      toast.error('An error occurred. Please try again.');
      setLoading(false);
      return;
    }

    setActiveQuery(query);
    setLoadingStep(2);

    const companies = await runGeneratedSQLQuery(query);
    const columns = companies.length > 0 ? Object.keys(companies[0]) : [];
    setResults(companies);
    setColumns(columns);

    setLoading(false);
  } catch (e) {
    toast.error('An error occurred. Please try again.');
    setLoading(false);
  }
};

// ...rest of the file...
```

## Notes

- The system prompt (omitted in the snippet) carries the table schema, the allowed industries, "Only retrieval queries are allowed", `ILIKE` with `LOWER()` rules and "every query should return quantitative data that can be plotted"; the official page lists it in full.
- `runGeneratedSQLQuery`, the components and the unicorns dataset come from the guide's starter repository; the guide later adds query explanation and chart-configuration actions the same way.
- Model-generated SQL is run against the database: restrict the connection to read-only access rather than relying on the prompt alone.
- `Output.object` with a zod schema constrains the result to a single `query` string; zod itself is documented in the zod skill.
