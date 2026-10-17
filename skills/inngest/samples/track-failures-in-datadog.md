# Track Failures in Datadog

Handle every failed function in one place by triggering on the `inngest/function.failed` system event and forwarding it to Datadog.

```ts
import { client, v1 } from "@datadog/datadog-api-client";
import { inngest } from "./client";

const configuration = client.createConfiguration();
const apiInstance = new v1.EventsApi(configuration);

export default inngest.createFunction(
  {
    name: "Send failures to Datadog",
    id: "send-failed-function-events-to-datadog",
    triggers: { event: "inngest/function.failed" },
  },
  async ({ event, step }) => {
    // This is a normal Inngest function, so we can use steps as we normally do:
    await step.run("send-event-to-datadog", async () => {
      const error = event.data.error;

      // Create the Datadog event body using information about the failed function:
      const params: v1.EventsApiCreateEventRequest = {
        body: {
          title: "Inngest Function Failed",
          alert_type: "error",
          text: `The ${event.data.function_id} function failed with the error: ${error.message}`,
          tags: [
            // Add a tag with the Inngest function id:
            `inngest_function_id:${event.data.function_id}`,
          ],
        },
      };

      // Send to Datadog:
      const data = await apiInstance.createEvent(params);

      // Return the data to Inngest for viewing in function logs:
      return { message: "Event sent successfully", data };
    });
  }
);
```

## Notes

- `inngest/function.failed` fires whenever any function in the Inngest environment fails
- The event carries `data.error`, `data.function_id`, `data.run_id`, and the original triggering `data.event`
- Datadog can be swapped for any monitoring or alerting system (e.g. Sentry)
