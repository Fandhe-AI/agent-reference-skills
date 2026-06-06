# URL Groups

Fan-out mechanism. Publishing once to a URL Group creates an independent delivery task for each subscribed endpoint. Each task has its own retry lifecycle.

## Signature / Usage

```ts
// Create a URL Group with endpoints
await client.urlGroups.addEndpoints({
  name: "my-group",
  endpoints: [
    { url: "https://service-a.example.com/hook" },
    { url: "https://service-b.example.com/hook" },
  ],
});

// Publish to the group
await client.publishJSON({
  urlGroup: "my-group",
  body: { event: "user.created" },
});

// Get a URL Group
const group = await client.urlGroups.get("my-group");

// List all URL Groups
const groups = await client.urlGroups.list();

// Remove endpoints from a group
await client.urlGroups.removeEndpoints({
  name: "my-group",
  endpoints: [{ url: "https://service-b.example.com/hook" }],
});

// Delete entire group
await client.urlGroups.delete("my-group");
```

## Options / Props

**`urlGroups.addEndpoints()` options:**

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | URL Group identifier |
| `endpoints` | `Array<{ url: string }>` | Endpoints to add to the group |

**`urlGroups.removeEndpoints()` options:**

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | URL Group identifier |
| `endpoints` | `Array<{ url: string }>` | Endpoints to remove from the group |

**`urlGroups.get()` / `urlGroups.delete()` parameter:**

| Name | Type | Description |
| --- | --- | --- |
| `name` | `string` | URL Group name to retrieve or delete |

## Notes

- `urlGroups.addEndpoints()` is an upsert: calling it on an existing group adds the new endpoints without removing existing ones
- `batchJSON` responses for URL Group entries are arrays (one response per endpoint)
- Removing all endpoints from a group does not delete the group itself; use `delete()` for that
- URL Groups decouple producers from consumers—add/remove endpoints without changing publish code

## Related

- [publish.md](./publish.md)
- [batch.md](./batch.md)
