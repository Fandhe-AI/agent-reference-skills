# Event Keys

Unique credentials that authenticate applications when publishing events to Inngest.

## Signature / Usage

```bash
# Set via environment variable (recommended)
INNGEST_EVENT_KEY=your-event-key
```

```ts
// Or pass directly to the client constructor
import { Inngest } from "inngest";
const inngest = new Inngest({ id: "my-app", eventKey: "your-event-key" });
```

## Notes

- Create event keys in the Inngest Cloud dashboard: Manage tab → key icon → Event keys → "+ Create Event Key"
- Maintain separate event keys per environment (production, staging) and per application for granular control
- Keys support filtering by event name or source IP address for additional security
- Store keys using platform secrets rather than hardcoding in source files
- Avoid sending events from browser clients; use backend endpoints or edge functions as proxies to prevent client-side key exposure
- During local development, any dummy value works for `INNGEST_EVENT_KEY` — local validation is disabled

## Related

- [Signing Keys](./signing-keys.md)
- [Environments](./environments.md)
- [Environment Variables](./environment-variables.md)
