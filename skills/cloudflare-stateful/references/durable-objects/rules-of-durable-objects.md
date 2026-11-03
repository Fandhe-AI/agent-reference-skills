---
source: https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/
---

# Rules of Durable Objects

Design guidelines for correct and effective Durable Objects: when to use them, sharding, storage and state, gates, RPC design, error handling, WebSockets, alarms and lifecycle, anti-patterns, and testing.

## Signature / Usage

Coordination example (Worker routes by event ID, the object serializes bookings):

Adapted (not in the official docs): the official example queries a `bookings` table that is never created; a constructor creates it. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

// ✅ Good use of Durable Objects: Seat booking requires coordination
// All booking requests for a venue must be serialized to prevent double-booking
export class SeatBooking extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
		this.ctx.storage.sql.exec(`
			CREATE TABLE IF NOT EXISTS bookings (
				seat_id TEXT PRIMARY KEY,
				user_id TEXT NOT NULL,
				booked_at INTEGER NOT NULL
			)
		`);
	}

	async bookSeat(seatId, userId) {
		// Check if seat is already booked
		const existing = this.ctx.storage.sql
			.exec("SELECT user_id FROM bookings WHERE seat_id = ?", seatId)
			.toArray();

		if (existing.length > 0) {
			return { success: false, message: "Seat already booked" };
		}

		// Book the seat - this is safe because Durable Objects are single-threaded
		this.ctx.storage.sql.exec(
			"INSERT INTO bookings (seat_id, user_id, booked_at) VALUES (?, ?, ?)",
			seatId,
			userId,
			Date.now(),
		);

		return { success: true, message: "Seat booked successfully" };
	}
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const eventId = url.searchParams.get("event") ?? "default";

		// Route to a Durable Object by event ID
		// All bookings for the same event go to the same instance
		const id = env.BOOKING.idFromName(eventId);
		const booking = env.BOOKING.get(id);

		const { seatId, userId } = await request.json();
		const result = await booking.bookSeat(seatId, userId);

		return Response.json(result, {
			status: result.success ? 200 : 409,
		});
	},
};
```

Deterministic IDs and parent/child sharding:

```js
import { DurableObject } from "cloudflare:workers";

// Parent: Coordinates matches, but doesn't store match data
export class GameServer extends DurableObject {
	async createMatch(matchName) {
		const matchId = crypto.randomUUID();

		// Store reference to the child in parent's database
		this.ctx.storage.sql.exec(
			"INSERT INTO matches (id, name, created_at) VALUES (?, ?, ?)",
			matchId,
			matchName,
			Date.now(),
		);

		// Initialize the child Durable Object
		const childId = this.env.GAME_MATCH.idFromName(matchId);
		const childStub = this.env.GAME_MATCH.get(childId);
		await childStub.init(matchId, matchName);

		return matchId;
	}

	async listMatches() {
		// Parent knows about all matches without waking up each child
		const cursor = this.ctx.storage.sql.exec(
			"SELECT id, name FROM matches ORDER BY created_at DESC",
		);
		return cursor.toArray();
	}
}
```

Location hint:

```js
const id = env.GAME_SESSION.idFromName(gameId);
const stub = env.GAME_SESSION.get(id, { locationHint: region });
```

Manual schema-version tracking in the constructor (`PRAGMA user_version` is not supported):

Adapted (not in the official docs): each migration step is wrapped in `transactionSync()` so the schema change and its version marker commit together. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

export class ChatRoom extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);

		// blockConcurrencyWhile() ensures no requests are processed until this completes
		ctx.blockConcurrencyWhile(async () => {
			await this.migrate();
		});
	}

	async migrate() {
		// Create the migrations tracking table if it does not exist
		this.ctx.storage.sql.exec(`
			CREATE TABLE IF NOT EXISTS _sql_schema_migrations (
				id INTEGER PRIMARY KEY,
				applied_at TEXT NOT NULL DEFAULT (datetime('now'))
			);
		`);

		// Determine the current schema version
		const version = this.ctx.storage.sql
			.exec(
				"SELECT COALESCE(MAX(id), 0) as version FROM _sql_schema_migrations",
			)
			.one().version;

		// Each migration and its version marker commit together, so a failure never
		// leaves a non-idempotent step (such as ALTER TABLE) applied without its marker.
		if (version < 1) {
			this.ctx.storage.transactionSync(() => {
				this.ctx.storage.sql.exec(`
					CREATE TABLE IF NOT EXISTS messages (
						id INTEGER PRIMARY KEY AUTOINCREMENT,
						user_id TEXT NOT NULL,
						content TEXT NOT NULL,
						created_at INTEGER NOT NULL
					);
					CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
					INSERT INTO _sql_schema_migrations (id) VALUES (1);
				`);
			});
		}

		if (version < 2) {
			// Future migration: add a new column
			this.ctx.storage.transactionSync(() => {
				this.ctx.storage.sql.exec(`
					ALTER TABLE messages ADD COLUMN edited_at INTEGER;
					INSERT INTO _sql_schema_migrations (id) VALUES (2);
				`);
			});
		}
	}
}
```

Gates and write coalescing (all three writes commit atomically):

Adapted (not in the official docs): the official example relies on implicit coalescing, which does not roll back earlier statements if a later one throws; the writes are wrapped in `transactionSync()`. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

export class Account extends DurableObject {
	async transfer(fromId, toId, amount) {
		// ✅ Good: one explicit synchronous transaction; any exception rolls back all three writes
		this.ctx.storage.transactionSync(() => {
			this.ctx.storage.sql.exec(
				"UPDATE accounts SET balance = balance - ? WHERE id = ?",
				amount,
				fromId,
			);
			this.ctx.storage.sql.exec(
				"UPDATE accounts SET balance = balance + ? WHERE id = ?",
				amount,
				toId,
			);
			this.ctx.storage.sql.exec(
				"INSERT INTO transfers (from_id, to_id, amount, created_at) VALUES (?, ?, ?, ?)",
				fromId,
				toId,
				amount,
				Date.now(),
			);
		});
	}
}
```

RPC with identity from `ctx.id`:

```js
import { DurableObject } from "cloudflare:workers";

export class ChatRoom extends DurableObject {
	// The name passed to getByName() or idFromName()
	getRoomId() {
		const roomId = this.ctx.id.name;
		if (!roomId) {
			throw new Error("ChatRoom must be accessed by name.");
		}
		return roomId;
	}

	// Store application-defined data that is not part of the ID
	async init(createdBy) {
		const existing = await this.ctx.storage.get("createdBy");
		if (existing) {
			return; // Already initialized
		}

		await this.ctx.storage.put("createdBy", createdBy);
		await this.ctx.storage.put("createdAt", Date.now());
	}
}
```

Alarm that avoids exhausting retries:

Adapted (not in the official docs): the official example persists `gameActive = false` before `calculateFinalScores()`, so a retry exits early and the work is lost; completion is now recorded only after it succeeds, and an explicit `phase` / `cleanupAt` pair keeps a duplicate end-of-game alarm from running the 24-hour cleanup early. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

export class GameMatch extends DurableObject {
	async startGame(durationMs = 60000) {
		await this.ctx.storage.put("gameStarted", Date.now());
		await this.ctx.storage.put("phase", "active");

		// Schedule the game to end after the duration
		await this.ctx.storage.setAlarm(Date.now() + durationMs);
	}

	// Called when the alarm fires
	async alarm(alarmInfo) {
		const phase = await this.ctx.storage.get("phase");

		if (phase === "ended") {
			// End-of-game work already succeeded. A duplicate or retried end-of-game alarm
			// also lands here, so only clean up once the stored deadline has passed.
			const cleanupAt = await this.ctx.storage.get("cleanupAt");
			if (cleanupAt !== undefined && Date.now() >= cleanupAt) {
				await this.ctx.storage.deleteAll();
			} else {
				// Too early: keep the cleanup alarm in place
				await this.ctx.storage.setAlarm(cleanupAt ?? Date.now() + 24 * 60 * 60 * 1000);
			}
			return;
		}

		if (phase !== "active") {
			return; // Game was never started (or already cleaned up)
		}

		// Calculate final scores, notify players, etc. (should be idempotent)
		// phase stays "active" until this succeeds, so a retry (or a re-scheduled alarm) runs it again.
		try {
			await this.calculateFinalScores();
		} catch (err) {
			// If we're almost out of retries but still have work to do, schedule a new alarm
			// rather than letting our retries run out to ensure we keep getting invoked.
			if (alarmInfo && alarmInfo.retryCount >= 5) {
				await this.ctx.storage.setAlarm(Date.now() + 30 * 1000);
				return;
			}
			throw err;
		}

		// Only now record completion and the cleanup deadline, in one atomic multi-key write
		const cleanupAt = Date.now() + 24 * 60 * 60 * 1000;
		await this.ctx.storage.put({ phase: "ended", cleanupAt });

		// Schedule the next alarm only if there's more work to do
		// In this case, schedule cleanup in 24 hours
		await this.ctx.storage.setAlarm(cleanupAt);
	}

	async calculateFinalScores() {
		// Game ending logic
	}
}
```

Adapted (not in the official docs): the official progress example uses `forEach(async ...)`, which does not await items and does not run them in order; a `for...of` loop is used. See Notes.

```js
// Good: Write progress as you go
async processData(data) {
  for (const [index, item] of data.entries()) {
    await this.processItem(item);
    // Save progress frequently
    await this.ctx.storage.put("lastProcessedIndex", index);
  }
}
```

Vitest configuration and class lifecycle changes (`exports`):

```ts
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [
		cloudflareTest({
			wrangler: { configPath: "./wrangler.jsonc" },
		}),
	],
});
```

```jsonc
{
  "exports": {
    // Rename a class — also add a live entry for the new name
    "OldChatRoom": { "type": "durable-object", "state": "renamed", "renamed_to": "ChatRoom" },
    "ChatRoom": { "type": "durable-object", "storage": "sqlite" },
    // Delete a class (removes all data!)
    "DeprecatedRoom": { "type": "durable-object", "state": "deleted" }
  }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Simple pass-through throughput | req/s per object | — | About 1,000 req/s (minimal parsing). |
| Moderate processing throughput | req/s per object | — | About 500-750 req/s (JSON parsing, validation). |
| Complex operations throughput | req/s per object | — | About 200-500 req/s (transformation, storage writes). |
| In-memory state | — | — | Fastest; lost on eviction or crash. Use for caches and active connections. |
| SQLite storage | — | — | Fast; durable across restarts. Primary data storage. |
| External (R2, D1) | — | — | Variable speed; durable and cross-object accessible. Large files, shared data. |

## Notes

- Use Durable Objects for coordination, strong consistency, per-entity storage, persistent connections and per-entity scheduled work; use plain Workers for stateless handling, maximum global distribution and high fan-out. A common pattern is a Worker as stateless entry point (auth, validation, response formatting) routing to objects.
- Model objects around an "atom" of coordination (chat room, game session, document, user, tenant). Do not use a single global object (e.g. `idFromName("global")`) for all traffic, global rate limiting or counters; it becomes a bottleneck. For global config read on every request, consider Workers KV (see cloudflare-storage).
- Sharding arithmetic: `Required DOs = (Total requests/second) / (Requests per DO capacity)`. Example from the page: 50,000 players x 10 updates/s = 500,000 req/s, needing 500-1,000 session objects.
- Use `getByName()` / `idFromName()` for deterministic routing; creating a stub does not instantiate the object, it is activated when a method is called. Use `newUniqueId()` only when you will store the mapping externally. Use child objects for hierarchical entities so listing only wakes the parent.
- Location hints are suggestions, not guarantees; see the data-location page.
- Corrected from the official docs: the alarm example saved `gameActive = false` before `calculateFinalScores()`, so a retry or re-scheduled alarm returned early and lost the scoring/notification work. Completion is now saved only after the work succeeds, as `phase: "ended"` plus a `cleanupAt` deadline; `alarm()` deletes data only when `phase === "ended"` and `Date.now() >= cleanupAt`, otherwise it re-arms the alarm for `cleanupAt`, so a duplicate or retried end-of-game alarm never cleans up early. Because alarms are at-least-once, the end-of-game work should itself be idempotent.
- Corrected from the official docs: the transfer example claimed coalesced writes are atomic, but a later statement throwing does not undo earlier ones. The three statements run inside `ctx.storage.transactionSync()`, which rolls back on exception (callback must be synchronous).
- Adapted from the official docs: the migration steps run in `transactionSync()` so a non-idempotent step (`ALTER TABLE ... ADD COLUMN`) and its marker row cannot be split by a failure.
- Corrected from the official docs: the seat-booking example never created its `bookings` table; the "write progress as you go" example used `forEach(async ...)` (not awaited/ordered). The page's seat-booking TypeScript and several other TypeScript variants have broken indentation in the source; the JavaScript variants are reproduced.
- Not reproduced here (identity from unverified input): the official WebSocket chat example takes `userId`/`username` from query parameters and trusts them. Derive identities from verified authentication in the Worker instead; see the WebSockets page for the attachments pattern.
- SQLite is recommended; `PRAGMA user_version` is not supported, so track schema versions with a table. Libraries named in the source: `durable-utils` (`SQLSchemaMigrations`) and `@cloudflare/actors` storage utilities.
- Input gates block new events during synchronous execution and storage operations; output gates hold outgoing messages until pending writes complete; writes without an intervening `await` are coalesced atomically. Awaiting KV `get`/`put` between writes breaks coalescing (a failing later write leaves the earlier one committed).
- Input gates only protect during storage operations; `fetch()` or R2 I/O lets other requests interleave. Use optimistic locking (read a version before the external call, verify it before writing). With the legacy KV backend use `transaction()` for read-modify-write.
- `blockConcurrencyWhile()` unconditionally blocks all concurrency: at ~5 ms per call an object is limited to ~200 req/s. Reserve it for constructor initialization and migrations, never across I/O (`fetch()`, KV, R2). For atomic read-modify-write during requests prefer `transaction()`.
- Prefer RPC methods for compatibility dates 2024-04-03 or later. Always `await` RPC calls: unawaited calls swallow errors and lose return values.
- Wrap risky operations in `try...catch`; uncaught exceptions can terminate the instance and lose in-memory state (SQLite stays intact). Errors may carry `.retryable` / `.overloaded`.
- Hibernatable WebSockets: handlers `webSocketMessage`, `webSocketClose`, `webSocketError`. On compatibility dates before 2026-04-07 you must call `ws.close()` in `webSocketClose` to avoid `1006`.
- Alarms do not repeat automatically; schedule only when there is work. Alarms may rarely fire more than once, so make handlers idempotent (check state before acting).
- Call `deleteAll()` to clear storage; before compatibility date 2026-02-24, also call `deleteAlarm()` first.
- No shutdown hooks exist (they cannot be guaranteed); write state incrementally.
- Testing uses `@cloudflare/vitest-plugin` with `runInDurableObject` and `runDurableObjectAlarm` from `cloudflare:test` (see cloudflare-wrangler for Vitest integration). Class rename/delete is done via the `exports` field; see the migrations page.
- Related products: Workflows best practices in rules-of-workflows.md (https://developers.cloudflare.com/workflows/build/rules-of-workflows/). The Agents SDK is covered by cloudflare-agents.

## Related

- [SQLite-backed storage API](./sqlite-storage-api.md)
- [DurableObjectState](./state.md)
- [Alarms](./alarms.md)
- [WebSockets](./websockets.md)
- [Error handling](./error-handling.md)
- [Migrations](./migrations.md)
- [Data location](./data-location.md)
- [Limits](./limits.md)
