# Fetch Run Status and Output

Trigger a function, then fetch its run status and output through the Inngest REST API.

Adapted (not in the official docs): `getRuns` checks the HTTP status, and `getRunOutput` guards the empty `runs` array (run creation is asynchronous) and caps retries at `maxAttempts`.

```typescript
const processCSV = inngest.createFunction(
  { id: "process-csv-upload", triggers: { event: "imports/csv.uploaded" } },
  async ({ event, step }) => {
    // CSV processing logic omitted for the sake of the example
    return {
      status: "success",
      processedItems: results.length,
      failedItems: failures.length,
    }
  }
);

const { ids } = await inngest.send({
  name: "imports/csv.uploaded",
  data: {
    file: "http://s3.amazonaws.com/acme-uploads/user_0xp3wqz7vumcvajt/JVLO6YWS42IXEIGO.csv",
    userId: "user_0xp3wqz7vumcvajt",
  },
});

async function getRuns(eventId) {
  const response = await fetch(`https://api.inngest.com/v1/events/${eventId}/runs`, {
    headers: {
      Authorization: `Bearer ${process.env.INNGEST_SIGNING_KEY}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch runs: HTTP ${response.status}`);
  }
  const json = await response.json();
  return json.data;
}

async function getRunOutput(eventId) {
  const maxAttempts = 30;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const runs = await getRuns(eventId);
    // The run may not exist yet right after inngest.send()
    if (runs.length > 0) {
      const status = runs[0].status;
      if (status === "Completed") {
        return runs[0];
      }
      if (status === "Failed" || status === "Cancelled") {
        throw new Error(`Function run ${status}`);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error(`Run did not complete after ${maxAttempts} attempts`);
}

const run = await getRunOutput(ids[0]);
console.log(run.output);
// { status: "success", processedItems: 98, failedItems: 2 }
```

## Notes

- `inngest.send()` returns `{ ids }`, the event IDs; `GET /v1/events/{eventId}/runs` lists the runs that event triggered
- An event can trigger several runs via fan-out, so `getRuns` returns an array; the example assumes a single function
- Authenticate with the signing key as a Bearer token (`INNGEST_SIGNING_KEY`)
- The official `getRunOutput` reads `runs[0].status` without an empty-array guard, HTTP error handling, or a retry limit; the version above adds them
- Source: https://www.inngest.com/docs-markdown/examples/fetch-run-status-and-output (retrieved 2026-10-16)
