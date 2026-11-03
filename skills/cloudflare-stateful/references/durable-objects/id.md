---
source: https://developers.cloudflare.com/durable-objects/api/id/
---

# DurableObjectId

A `DurableObjectId` is a 64-digit hexadecimal identifier of a Durable Object. Not every 64-digit hex number is valid; IDs are constructed through `DurableObjectNamespace`. Creating an ID does not create the object; it is created lazily when a stub is made from the ID.

## Signature / Usage

Adapted (not in the official docs): the official snippet declares `const id` twice; the second is renamed.

```js
// Create a new unique ID
const id = env.MY_DURABLE_OBJECT.newUniqueId();
// Convert the ID to a string to be saved elsewhere, e.g. a session cookie
const session_id = id.toString();

// Recreate the ID from the string
const restoredId = env.MY_DURABLE_OBJECT.idFromString(session_id);
console.assert(id.equals(restoredId), "Restored ID equals the original");
```

```js
const uniqueId = env.MY_DURABLE_OBJECT.newUniqueId();
const fromNameId = env.MY_DURABLE_OBJECT.idFromName("foo");
console.assert(uniqueId.name === undefined, "unique ids have no name");
console.assert(
	fromNameId.name === "foo",
	"name matches parameter to idFromName",
);
```

```js
import { DurableObject } from "cloudflare:workers";

export class ChatRoom extends DurableObject {
	async getRoomName() {
		return this.ctx.id.name; // "foo" when accessed via getByName("foo")
	}
}
```

```js
const plainId = env.MY_DURABLE_OBJECT.idFromName("foo");
const euId = env.MY_DURABLE_OBJECT.jurisdiction("eu").idFromName("foo");
console.assert(plainId.jurisdiction === undefined, "no jurisdiction set");
console.assert(euId.jurisdiction === "eu", "jurisdiction matches namespace");
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `toString()` | `() => string` | — | Returns the 64-digit hex string; useful for logging or storing the ID (e.g. in a session cookie). Reconstruct with `idFromString`. |
| `equals(other)` | `(DurableObjectId) => boolean` | — | `true` if the two IDs are equal. |
| `name` | `string \| undefined` | — | Name used with `idFromName` / `getByName`. `undefined` for `newUniqueId()` IDs. Also available as `ctx.id.name` inside the object. |
| `jurisdiction` | `string \| undefined` | — | Jurisdiction the ID is restricted to (e.g. `"eu"`, `"fedramp"`). Also available as `ctx.id.jurisdiction`. |

## Notes

- Corrected from the official docs: the `toString`/`idFromString` snippet redeclared `const id`; the second declaration is now `restoredId`, and the assertion line was added to use it.
- `ctx.id.name` is `undefined` when the caller used `idFromString()` (even if the ID came from `idFromName()`), when the name is longer than 1,024 bytes, or when the object was created with `newUniqueId()`.
- `ctx.id.name` is especially useful in alarm handlers, which have no calling client. Alarms created before 2026-03-15 have no stored `name` (and a new alarm scheduled from that handler also lacks it); reschedule from a `fetch()` or RPC handler to fix.
- `jurisdiction` is preserved across jurisdiction-restricted subnamespaces, `newUniqueId({ jurisdiction: "eu" })`, and `idFromString()` (the jurisdiction is encoded in the string). It is `undefined` for objects not created in a jurisdiction-restricted namespace, or for alarms scheduled before 2026-03-15.
- Log the `DurableObjectId` from your Worker when raising a support request about a specific object.

## Related

- [DurableObjectNamespace](./namespace.md)
- [DurableObjectStub](./stub.md)
- [Data location](./data-location.md)
- [Alarms](./alarms.md)
