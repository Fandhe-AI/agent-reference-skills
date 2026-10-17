# Roll Out a Workflow Rewrite

Canary a rewritten multi-step workflow on a small share of runs, score both paths the same way, and ramp up safely.

## Signature / Usage

```typescript
import { experiment } from "inngest";
import { inngest } from "./client";

export default inngest.createFunction(
  { id: "generate-invoice", triggers: { event: "billing/invoice.requested" } },
  async ({ event, step, group, runId }) => {
    const { result: invoice, experimentRef } = await group.experiment(
      "invoice-engine",
      {
        variants: {
          current: async () => {
            const invoice = await step.run("generate-current", () =>
              generateInvoiceV1(event.data)
            );
            await step.run("send-current", () => sendInvoice(invoice));
            return invoice;
          },
          rewrite: async () => {
            const draft = await step.run("draft-rewrite", () =>
              draftInvoiceV2(event.data)
            );
            const invoice = await step.run("price-rewrite", () =>
              applyPricingV2(draft)
            );
            await step.run("send-rewrite", () => sendInvoice(invoice));
            return invoice;
          },
        },
        select: experiment.weighted({ current: 99, rewrite: 1 }),
      }
    );

    // Save what a later outcome needs to find this run and variant.
    await step.run("save-invoice", () =>
      db.invoices.insert({ id: invoice.id, runId, experimentRef })
    );

    await inngest.score.experiment({
      name: "invoice-valid",
      value: validateInvoice(invoice),
      experiment: experimentRef,
    });

    return invoice;
  }
);
```

Score the real outcome later from the payment webhook function:

```typescript
await inngest.score.experiment({
  name: "invoice-paid",
  value: true,
  experiment: saved.experimentRef,
  runId: saved.runId,
});
```

## Notes

- Each variant callback runs a complete multi-step path; only the selected path runs. Weights are relative: `99:1` sends about one new run in a hundred through the rewrite.
- Put every side effect (such as sending the invoice) inside a step so a replay does not repeat it.
- Passing the original `runId` places the later score under the experiment; without it the score attaches to the `score-invoice-paid` run.
- A 1% canary proves the new path runs; collecting enough outcomes to show which path is better may take longer. Compare variants on `invoice-valid` and `invoice-paid` and check errors and latency in traces.
- Ramp by deploying new weights in stages: `{ current: 90, rewrite: 10 }`, then `50:50`, then `0:100`. Runs that already selected a variant keep it on retries and replays; new runs use the new weights. Roll back by setting the rewrite's weight to `0`, or read the split from a flag with `experiment.custom()` to roll back without a deploy.
- When the old path is no longer needed, pin the winner with `experiment.fixed("rewrite")` or remove the experiment and keep only the rewrite's steps.
- Python (release after 0.5.19): no weighted selector; `experiment.bucket(ctx.run_id, weights={"current": 99, "rewrite": 1})` approximates the split. Store `res.experiment_ref.model_dump()` and restore it with `ExperimentRef.model_validate(...)` from `inngest.experimental.experiment`.
- Source: https://www.inngest.com/docs-markdown/agent-evals/guides/workflow-rewrite (fetched 2026-10).

## Related

- [Agent Evals Experiments](./agent-evals-experiments.md)
- [Group Experiment](./group-experiment.md)
- [Read Results and Roll Out](./evals-interpreting-results.md)
- [Manage Eval Costs](./evals-cost-management.md)
