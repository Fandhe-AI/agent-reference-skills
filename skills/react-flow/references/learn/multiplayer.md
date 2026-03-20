# Multiplayer

Real-time collaborative flows allow multiple users to share a live canvas where changes are immediately visible to all participants — without manual saving.

## 詳細説明

### Characteristics of Multiplayer

- No manual saving: all users share a world where actions persist immediately
- Other users' changes are visible in real time
- Transient states are synced (e.g., dragging animations, cursor positions)
- User presence indicators such as cursors and viewports

### The Core Challenge

The hardest aspect of multiplayer is **conflict resolution**: a sync engine must merge changes from the server (or other clients) into the — often optimistic — client state.

### State Synchronization Categories

**Ephemeral data** (non-persistent, safe to lose on disconnect):
- Cursor positions
- Viewport positions
- Connection transient states

**Durable data** (persistent, must remain consistent across all clients):
- Node IDs, types, data
- Edge connections and handles
- Node/edge positions and dimensions

### Sync Matrix

#### Node Fields

| Field | Sync | Type |
|-------|------|------|
| `id`, `type`, `data` | Yes | Durable |
| `position`, `width`, `height` | Yes | Durable |
| `dragging`, `resizing` | No | Ephemeral only |
| `selected`, `measured` | No | Never sync |

#### Edge Fields

| Field | Sync | Type |
|-------|------|------|
| `id`, `type`, `data`, `source`, `target`, `handles` | Yes | Durable |
| `selected` | No | Never sync |

### Technology Options

| Library | Type | Conflict Resolution | Offline |
|---------|------|--------------------|---------|
| **Yjs** | CRDT / Local-First | Automatic | Full |
| **Automerge** | CRDT | Automatic | Full |
| **Loro** | CRDT (Rust/WASM) | Automatic | Full |
| **Supabase** | Server-Authoritative | Manual | No |
| **Convex** | Server-Authoritative | Via optimistic updates | No |
| **Liveblocks** | Server-Authoritative (proprietary) | Managed | Partial |
| **Jazz** | Hybrid (local-first DB) | Automatic | Full |
| **Velt** | CRDT + managed backend | Managed | — |

Yjs has a React Flow Pro example (Collaborative Flow). Velt provides a dedicated React Flow integration library.

## 注意点

- Never sync `selected` on nodes or edges — selection is local UI state
- Never sync `measured` on nodes — this is computed client-side by React Flow
- Treat `dragging` and `resizing` as ephemeral-only if you sync them; they must not affect durable state
- For cursor smoothing, consider the `perfect-cursors` library: https://github.com/steveruizok/perfect-cursors
- CRDT-based solutions (Yjs, Automerge, Loro) handle conflict resolution automatically; server-authoritative solutions require manual merge logic

## 関連

- [state-management.md](./state-management.md)
- [whiteboard.md](./whiteboard.md)
- [hooks-providers.md](./hooks-providers.md)
