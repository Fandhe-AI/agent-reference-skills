# Fetch Run Status and Output

Trigger a function, then fetch its run status and output through the Inngest REST API.

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
  const json = await response.json();
  return json.data;
}

async function getRunOutput(eventId) {
  let runs = await getRuns(eventId);
  while (runs[0].status !== "Completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    runs = await getRuns(eventId);
    if (runs[0].status === "Failed" || runs[0].status === "Cancelled") {
      throw new Error(`Function run ${runs[0].status}`);
    }
  }
  return runs[0];
}

const run = await getRunOutput(ids[0]);
console.log(run.output);
// { status: "success", processedItems: 98, failedItems: 2 }
```

## Notes

- `inngest.send()` returns `{ ids }`, the event IDs; `GET /v1/events/{eventId}/runs` lists the runs that event triggered
- An event can trigger several runs via fan-out, so `getRuns` returns an array; the example assumes a single function
- Authenticate with the signing key as a Bearer token (`INNGEST_SIGNING_KEY`)
