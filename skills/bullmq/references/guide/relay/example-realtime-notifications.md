# BullMQ — Relay example: Real-time notifications for WebSocket servers

各 API サーバーが接続中ユーザーのトピックを subscribe し、システムのどこからでもユーザーのトピックへ publish して通知する例。

## Signature / Usage

### API server

```typescript
import { WebSocketServer, WebSocket } from 'ws';
import { Relay, RelaySubscription } from 'bullmq';

const relay = new Relay({ connection: { host: 'redis.internal', port: 6379 } });
const wss = new WebSocketServer({ server: httpServer });

interface ConnectedUser {
  sockets: Set<WebSocket>;
  subscription: Promise<RelaySubscription | undefined>;
}
const users = new Map<string, ConnectedUser>();

const userTopic = (userId: string) => `users.${userId}.notifications`;

wss.on('connection', async (socket, request) => {
  const userId = await authenticate(request); // e.g. from a session cookie
  if (socket.readyState !== WebSocket.OPEN) {
    return;
  }
  if (!userId) {
    return socket.close(4001, 'unauthorized');
  }

  let user = users.get(userId);
  if (!user) {
    // First socket of this user on this server: subscribe once for all of them.
    const sockets = new Set<WebSocket>();
    const connectedUser: ConnectedUser = {
      sockets,
      subscription: Promise.resolve(undefined),
    };
    connectedUser.subscription = relay
      .subscribe(userTopic(userId), message => {
        const payload = JSON.stringify(message.data);
        sockets.forEach(s => s.send(payload));
      })
      .catch(err => {
        if (users.get(userId) === connectedUser) {
          users.delete(userId);
        }
        sockets.forEach(s => s.close(1011, 'subscription failed'));
        console.error(err);
        return undefined;
      });
    user = connectedUser;
    users.set(userId, user);
  }
  user.sockets.add(socket);

  socket.on('close', async () => {
    try {
      const current = users.get(userId);
      if (!current || !current.sockets.delete(socket)) {
        return;
      }
      if (current.sockets.size === 0) {
        // Last socket of this user on this server.
        users.delete(userId);
        const subscription = await current.subscription;
        await subscription?.unsubscribe();
      }
    } catch (err) {
      console.error(err);
    }
  });
});
```

### Sending a notification

```typescript
import { Queue, Relay } from 'bullmq';

const relay = new Relay({ connection });
const pushQueue = new Queue('push-notifications', { connection });

export async function notify(userId: string, notification: Notification) {
  await db.notifications.insert(userId, notification); // the inbox in your UI

  const { endpoints } = await relay.publish(
    `users.${userId}.notifications`,
    notification,
  );

  if (endpoints === 0) {
    // The user has no open connection: fall back to a mobile push.
    await pushQueue.add('push', { userId, notification });
  }
}
```

## Notes

- Scenario: users keep a WebSocket open to one of several API servers behind a load balancer, and any part of the system needs to notify a user in real time without knowing which server holds the connection. Each API server subscribes once per connected user while at least one of their sockets is open.
- `endpoints` in the publish result is the number of subscriptions that received the message (here, the API servers holding a socket for that user); `0` lets you fall back to another channel such as a mobile push through a queue.
- User ids must be valid topic segments; encode them otherwise. The Relay delivers live messages only, so store notifications in your database as well. Group notifications can use a shared topic (`tenants.acme.announcements`).
- Source: https://github.com/taskforcesh/bullmq/blob/v6.7.6/docs/gitbook/guide/relay/examples/realtime-notifications.md (tag v6.7.6, fetched 2026-11-14). Official page: https://docs.bullmq.io/guide/relay/examples/realtime-notifications

## Related

- [overview.md](./overview.md)
- [retained-messages.md](./retained-messages.md)
- [topics-and-patterns.md](./topics-and-patterns.md)
