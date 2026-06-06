# Realtime Subscription

Listen to database changes and broadcast messages in real time using Supabase Realtime channels.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Listen to INSERT events on a table
const channel = supabase
  .channel('db-todos')
  .on(
    'postgres_changes',
    { event: 'INSERT', schema: 'public', table: 'todos' },
    (payload) => {
      console.log('New todo:', payload.new)
    }
  )
  .subscribe()

// Listen to all changes (INSERT, UPDATE, DELETE) with a filter
const channel = supabase
  .channel('user-todos')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'todos',
      filter: `user_id=eq.${userId}`,
    },
    (payload) => {
      console.log(payload.eventType, payload.new, payload.old)
    }
  )
  .subscribe((status) => {
    if (status === 'SUBSCRIBED') console.log('Connected')
  })

// Broadcast — send ephemeral messages between clients
const room = supabase.channel('room-1')

room
  .on('broadcast', { event: 'cursor-pos' }, ({ payload }) => {
    console.log('Cursor:', payload)
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await room.send({
        type: 'broadcast',
        event: 'cursor-pos',
        payload: { x: 100, y: 200 },
      })
    }
  })

// Presence — track who is online
const presenceRoom = supabase.channel('room-1')

presenceRoom
  .on('presence', { event: 'sync' }, () => {
    const state = presenceRoom.presenceState()
    console.log('Online users:', state)
  })
  .subscribe(async (status) => {
    if (status === 'SUBSCRIBED') {
      await presenceRoom.track({ user_id: userId, online_at: new Date().toISOString() })
    }
  })

// Clean up
await supabase.removeChannel(channel)
```

## Notes

- Call `.on()` before `.subscribe()`; handlers registered after subscription may not fire
- Postgres Changes requires the table to be added to the Realtime publication in the Dashboard
- `DELETE` events only include `payload.old` data when the table Replica Identity is set to `FULL`
- Always call `removeChannel()` or `removeAllChannels()` on component unmount to avoid memory leaks
