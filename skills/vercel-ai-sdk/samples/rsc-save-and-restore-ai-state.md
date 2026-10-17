---
source: https://ai-sdk.dev/docs/ai-sdk-rsc/saving-and-restoring-states
---

# RSC: Saving and Restoring AI and UI State (experimental)

Persist AI state with `onSetAIState`, restore it with `initialAIState`, and rebuild UI state with `onGetUIState`.

```tsx
// app/ai.ts
export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  onSetAIState: async ({ state, done }) => {
    'use server';

    if (done) {
      saveChatToDB(state);
    }
  },
});
```

```tsx
// app/layout.tsx
import { ReactNode } from 'react';
import { AI } from './ai';

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const chat = await loadChatFromDB();

  return (
    <html lang="en">
      <body>
        <AI initialAIState={chat}>{children}</AI>
      </body>
    </html>
  );
}
```

```tsx
// app/ai.ts (restore UI state)
export const AI = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    continueConversation,
  },
  onGetUIState: async () => {
    'use server';

    const historyFromDB: ServerMessage[] = await loadChatFromDB();
    const historyFromApp: ServerMessage[] = getAIState();

    // If the history from the database is different from the
    // history in the app, they're not in sync so return the UIState
    // based on the history from the database

    if (historyFromDB.length !== historyFromApp.length) {
      return historyFromDB.map(({ role, content }) => ({
        id: generateId(),
        role,
        display:
          role === 'function' ? (
            <Component {...JSON.parse(content)} />
          ) : (
            content
          ),
      }));
    }
  },
});
```

## Notes

- Official warning: AI SDK RSC is experimental; AI SDK UI is recommended for production (see the migration guide, `references/rsc/migrating-to-ui.md`).
- UI state cannot be saved directly because its contents are not serializable; use the AI state as a proxy and rebuild the UI state in `onGetUIState`.
- `saveChatToDB`, `loadChatFromDB`, `ServerMessage`, `ClientMessage`, `continueConversation` and `Component` are application-defined placeholders, not SDK exports. The non-RSC equivalent is `chatbot-message-persistence.md`.
