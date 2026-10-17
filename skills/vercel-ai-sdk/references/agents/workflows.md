---
source: https://ai-sdk.dev/docs/agents/workflows
---

# Workflow Patterns

Combine the building blocks from the agents overview with these patterns to add structure and reliability to your agents: Sequential Processing, Parallel Processing, Evaluation/Feedback Loops, Orchestration, Routing.

## Signature / Usage

Sequential Processing (Chains): each step's output becomes input for the next step.

```ts
import { generateText, Output } from 'ai';
import { z } from 'zod';

async function generateMarketingCopy(input: string) {
  // First step: Generate marketing copy
  const { text: copy } = await generateText({
    model,
    prompt: `Write persuasive marketing copy for: ${input}. Focus on benefits and emotional appeal.`,
  });

  // Perform quality check on copy
  const { output: qualityMetrics } = await generateText({
    model,
    output: Output.object({
      schema: z.object({
        hasCallToAction: z.boolean(),
        emotionalAppeal: z.number().min(1).max(10),
        clarity: z.number().min(1).max(10),
      }),
    }),
    prompt: `Evaluate this marketing copy for:
    1. Presence of call to action (true/false)
    2. Emotional appeal (1-10)
    3. Clarity (1-10)

    Copy to evaluate: ${copy}`,
  });

  // If quality check fails, regenerate with more specific instructions
  if (
    !qualityMetrics.hasCallToAction ||
    qualityMetrics.emotionalAppeal < 7 ||
    qualityMetrics.clarity < 7
  ) {
    const { text: improvedCopy } = await generateText({
      model,
      prompt: `Rewrite this marketing copy with:
      ${!qualityMetrics.hasCallToAction ? '- A clear call to action' : ''}
      ${qualityMetrics.emotionalAppeal < 7 ? '- Stronger emotional appeal' : ''}
      ${qualityMetrics.clarity < 7 ? '- Improved clarity and directness' : ''}

      Original copy: ${copy}`,
    });
    return { copy: improvedCopy, qualityMetrics };
  }

  return { copy, qualityMetrics };
}
```

### Patterns

| Pattern | Description |
| --- | --- |
| Sequential Processing (Chains) | Executes steps in a predefined order. Each step's output becomes input for the next step. Use for tasks with well-defined sequences, like content generation pipelines or data transformation processes. |
| Routing | The model decides which path to take through a workflow based on context and intermediate results. The first LLM call's results determine the second call's model size and system prompt. |
| Parallel Processing | Break down tasks into independent subtasks that execute simultaneously (e.g. analyze multiple documents, code review aspects concurrently). |
| Orchestrator-Worker | A primary model (orchestrator) coordinates the execution of specialized workers. Each worker optimizes for a specific subtask. |
| Evaluator-Optimizer | Dedicated evaluation steps assess intermediate results; the workflow proceeds, retries with adjusted parameters, or takes corrective action. |

#### Routing

```ts
const { output: classification } = await generateText({
  model,
  output: Output.object({
    schema: z.object({
      reasoning: z.string(),
      type: z.enum(['general', 'refund', 'technical']),
      complexity: z.enum(['simple', 'complex']),
    }),
  }),
  prompt: `Classify this customer query: ${query} ...`,
});

// Route based on classification
const { text: response } = await generateText({
  model:
    classification.complexity === 'simple'
      ? 'openai/gpt-6-luna'
      : 'openai/gpt-6-astra',
  instructions: {
    general:
      'You are an expert customer service agent handling general inquiries.',
    refund:
      'You are a customer service agent specializing in refund requests. Follow company policy and collect necessary information.',
    technical:
      'You are a technical support specialist with deep product knowledge. Focus on clear step-by-step troubleshooting.',
  }[classification.type],
  prompt: query,
});
```

#### Parallel Processing

```ts
const [securityReview, performanceReview, maintainabilityReview] =
  await Promise.all([
    generateText({
      model,
      instructions:
        'You are an expert in code security. Focus on identifying security vulnerabilities, injection risks, and authentication issues.',
      output: Output.object({
        schema: z.object({
          vulnerabilities: z.array(z.string()),
          riskLevel: z.enum(['low', 'medium', 'high']),
          suggestions: z.array(z.string()),
        }),
      }),
      prompt: `Review this code: ${code}`,
    }),
    // ...performance and maintainability reviewers follow the same shape
  ]);

const reviews = [
  { ...securityReview.output, type: 'security' },
  { ...performanceReview.output, type: 'performance' },
  { ...maintainabilityReview.output, type: 'maintainability' },
];

// Aggregate results using another model instance
const { text: summary } = await generateText({
  model,
  instructions: 'You are a technical lead summarizing multiple code reviews.',
  prompt: `Synthesize these code review results into a concise summary with key actions:
  ${JSON.stringify(reviews, null, 2)}`,
});
```

#### Orchestrator-Worker

```ts
// Orchestrator: Plan the implementation
const { output: implementationPlan } = await generateText({
  model,
  output: Output.object({
    schema: z.object({
      files: z.array(
        z.object({
          purpose: z.string(),
          filePath: z.string(),
          changeType: z.enum(['create', 'modify', 'delete']),
        }),
      ),
      estimatedComplexity: z.enum(['low', 'medium', 'high']),
    }),
  }),
  instructions:
    'You are a senior software architect planning feature implementations.',
  prompt: `Analyze this feature request and create an implementation plan: ${featureRequest}`,
});

// Workers: Execute the planned changes
const fileChanges = await Promise.all(
  implementationPlan.files.map(async file => {
    // Each worker is specialized for the type of change
    const { output: change } = await generateText({
      model,
      output: Output.object({
        schema: z.object({ explanation: z.string(), code: z.string() }),
      }),
      instructions: workerSystemPrompt, // chosen from file.changeType
      prompt: `Implement the changes for ${file.filePath} to support: ${file.purpose}`,
    });
    return { file, implementation: change };
  }),
);
```

#### Evaluator-Optimizer

```ts
// Evaluation-optimization loop
while (iterations < MAX_ITERATIONS) {
  // Evaluate current translation
  const { output: evaluation } = await generateText({
    model,
    output: Output.object({
      schema: z.object({
        qualityScore: z.number().min(1).max(10),
        preservesTone: z.boolean(),
        preservesNuance: z.boolean(),
        culturallyAccurate: z.boolean(),
        specificIssues: z.array(z.string()),
        improvementSuggestions: z.array(z.string()),
      }),
    }),
    instructions: 'You are an expert in evaluating literary translations.',
    prompt: `Evaluate this translation: ...`,
  });

  // Check if quality meets threshold
  if (
    evaluation.qualityScore >= 8 &&
    evaluation.preservesTone &&
    evaluation.preservesNuance &&
    evaluation.culturallyAccurate
  ) {
    break;
  }

  // Generate improved translation based on feedback
  const { text: improvedTranslation } = await generateText({
    model,
    instructions: 'You are an expert literary translator.',
    prompt: `Improve this translation based on the following feedback: ...`,
  });

  currentTranslation = improvedTranslation;
  iterations++;
}
```

## Notes

- Choose by: Flexibility vs Control, Error Tolerance, Cost Considerations (more complex systems typically mean more LLM calls), Maintenance. Start with the simplest approach that meets your needs; add complexity only when required by breaking tasks into clear steps, adding tools for specific capabilities, implementing feedback loops for quality control, or introducing multiple agents.
- These patterns are adapted from Anthropic's guide "Building effective agents" (https://www.anthropic.com/research/building-effective-agents).
- Snippets here are condensed from the official examples (the official code uses a model/provider placeholder; `model` is used here). Prompts marked `...` are shortened.
- Uses core functions (`generateText` with `Output.object`), not `ToolLoopAgent`.

## Related

- [Agents overview](./overview.md)
- [Building Agents](./building-agents.md)
- [Loop Control](./loop-control.md)
