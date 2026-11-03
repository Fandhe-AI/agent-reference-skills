---
source: https://developers.cloudflare.com/agents/agent-class/state/
---

# State (initialState / setState)

State is one JSON-serializable value per Agent, stored in SQLite, surviving restarts and hibernation, and synced to every connected client.

## Signature / Usage

```ts
import { Agent, type Connection } from "agents";

type GameState = {
	players: string[];
	status: "waiting" | "playing";
};

export class GameAgent extends Agent<Env, GameState> {
	initialState: GameState = { players: [], status: "waiting" };

	// Runs before a change is stored. Throw to reject it.
	validateStateChange(next: GameState, source: Connection | "server") {
		if (source !== "server" && next.status !== this.state.status) {
			throw new Error("Only the server can change the game status");
		}
	}

	// Runs after a change is stored and broadcast.
	onStateChanged(state: GameState, source: Connection | "server") {
		if (source !== "server" && state.players.length >= 2) {
			this.setState({ ...state, status: "playing" });
		}
	}

	addPlayer(name: string) {
		this.setState({ ...this.state, players: [...this.state.players, name] });
	}
}
```

Client sync:

```tsx
import { useAgent } from "agents/react";

export function Lobby() {
	const agent = useAgent<{ players: string[]; status: string }>({
		agent: "GameAgent",
		name: "game-1",
	});
	return <p>{agent.state?.players.length ?? 0} players</p>;
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialState` | `State` | — | Default value for a new Agent |
| `this.state` | `State` | — | The current value |
| `this.setState(state)` | method | — | Stores the value and broadcasts it to clients |
| `validateStateChange(next, source)` | method | — | Synchronous check before a change is stored. Throw to reject it |
| `onStateChanged(state, source)` | method | — | Runs after a change. `source` is `"server"` or the client's `Connection` |

Workflow step methods (durable, not repeated on Workflow retry):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `step.updateAgentState(state)` | method | — | Replaces the state |
| `step.mergeAgentState(partial)` | method | — | Merges fields into the state |
| `step.resetAgentState()` | method | — | Resets the state to `initialState` |

## Notes

- `initialState` applies the first time an Agent reads its state; afterwards `this.state` returns the stored value.
- In `onStateChanged()`, ignore changes whose `source` is `"server"` when you call `setState()` from inside it, or you will loop. (The source example guards on `source !== "server"`.)
- Client `setState()` goes through `validateStateChange()` before being stored.
- Data that need not reach clients belongs in SQLite (`this.sql`). For read-only clients use readonly connections ([websockets.md](./websockets.md)).
- State is stored in the `cf_agents_state` table; the State capability is documented in state.md (https://developers.cloudflare.com/agents/runtime/capabilities/state/) (runtime category).

## Related

- [WebSockets](./websockets.md)
- [Run Workflows](./run-workflows.md)
- [Client SDK](./client-sdk.md)
