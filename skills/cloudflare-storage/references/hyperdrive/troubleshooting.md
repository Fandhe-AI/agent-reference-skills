---
source: https://developers.cloudflare.com/hyperdrive/observability/troubleshooting/
---

# Troubleshoot and debug

Error codes and messages for configuration, connection, caching, and driver issues with Hyperdrive.

## Signature / Usage

Fix for uncacheable `NOW()` queries: compute in the Worker and pass as a parameter.

```sql
-- instead of: WHERE created_at > NOW()
WHERE created_at > $1
```

## Options / Props

Configuration errors (Hyperdrive tests the connection and issues an empty test query, `;` in PostgreSQL, when creating or updating a configuration):

| Error Code | Details | Recommended fixes |
| --- | --- | --- |
| `2008` | Bad hostname. | Hyperdrive could not resolve the database hostname. Confirm it exists in public DNS. |
| `2009` | The hostname does not resolve to a public IP address, or the IP address is not a public address. | Hyperdrive can only connect to public IP addresses. Private IP addresses, like `10.1.5.0` or `192.168.2.1`, are not currently supported. |
| `2010` | Cannot connect to the host:port. | Hyperdrive could not route to the hostname: ensure it has a public DNS record that resolves to a public IP address. Check that the hostname is not misspelled. |
| `2011` | Connection refused. | A network firewall or access control list (ACL) is likely rejecting requests from Hyperdrive. Ensure you have allowed connections from the public Internet. |
| `2012` | TLS (SSL) not supported by the database. | Hyperdrive requires TLS (SSL) to connect. Configure TLS on your database. |
| `2013` | Invalid database credentials. | Ensure your username is correct (and exists), and the password is correct (case-sensitive). |
| `2014` | The specified database name does not exist. | Check that the database (not table) name you provided exists on the database you are asking Hyperdrive to connect to. |
| `2015` | Generic error. | Hyperdrive failed to connect and could not determine a reason. Open a support ticket so Cloudflare can investigate. |
| `2016` | Test query failed. | Confirm that the user Hyperdrive is connecting as has permissions to issue read and write queries to the given database. |

`Failed to connect to the provided database` (TLS misconfiguration):

| Error message | Details | Recommended fixes |
| --- | --- | --- |
| Server return error and closed connection. | This message occurs when you attempt to connect to a database that has client certificate verification enabled. | Ensure you are configuring your Hyperdrive with client certificates if your database requires them. |
| TLS handshake failed: cert validation failed. | This message occurs when Hyperdrive has been configured with server CA certificates and is indicating that the certificate provided by the server has not been signed by the expected CA certificate. | Ensure you are using the correct CA certificate for Hyperdrive, or ensure you are connecting to the right database. |

Hyperdrive specific runtime errors:

| Error Message | Details | Recommended fixes |
| --- | --- | --- |
| `Internal error.` | Something is broken on our side. | Check for an ongoing incident affecting Hyperdrive, and contact Cloudflare Support. Retrying the query is appropriate, if it makes sense for your usage pattern. |
| `Failed to acquire a connection from the pool.` | Hyperdrive timed out while waiting for a connection to your database, or cannot connect at all. | If you are seeing this error intermittently, your Hyperdrive pool is being exhausted because too many connections are being held open for too long by your worker. This can be caused by a myriad of different issues, but long-running queries/transactions are a common offender. |
| `Server connection attempt failed: connection_refused` | Hyperdrive is unable to create new connections to your origin database. | A network firewall or access control list (ACL) is likely rejecting requests from Hyperdrive. Ensure you have allowed connections from the public Internet. Sometimes, this can be caused by your database host provider refusing incoming connections when you go over your connection limit. |
| `Hyperdrive does not currently support MySQL COM_STMT_PREPARE messages` | Hyperdrive does not support prepared statements for MySQL databases. | Remove prepared statements from your MySQL queries. |
| `Uncaught Error: No such module "node:<module>"` | Your Cloudflare Workers project or a library that it imports is trying to access a Node module that is not available. | Enable Node.js compatibility for your Cloudflare Workers project to maximize compatibility. |
| `Code generation from strings disallowed for this context` | The database driver you are using is attempting to use the `eval()` command, which is unsupported on Cloudflare Workers (common in `mysql2` driver). | Configure the database driver to not use `eval()` (`disableEval: true` for mysql2). |

Stale connection and I/O context errors (client created in global scope or reused across requests):

| Error Message | Details | Recommended fixes |
| --- | --- | --- |
| `Disallowed operation called within global scope. Asynchronous I/O (ex: fetch() or connect()), setting a timeout, and generating random values are not allowed within global scope.` | Your Worker is attempting to open a database connection or perform I/O during script startup, outside of a request handler. | Move the database client creation into your `fetch`, `queue`, or other handler function. |
| `Cannot perform I/O on behalf of a different request. I/O objects (such as streams, request/response bodies, and others) created in the context of one request handler cannot be accessed from a different request's handler.` | A database connection or client created during one request is being reused in a subsequent request. | Create a new database client on every request instead of caching it in a global variable. |

node-postgres (`pg`):

| Error Message | Details | Recommended fixes |
| --- | --- | --- |
| `Connection terminated` | The client's `.end()` method was called, or the connection was cleaned up at the end of a previous request. | Create a new `Client` inside your handler instead of reusing one from a prior request. |
| `Connection terminated unexpectedly` | The underlying connection was dropped without an explicit `.end()` call — for example, when a previous request's context was garbage collected. | Create a new `Client` inside your handler for every request. |
| `Client has encountered a connection error and is not queryable` | A socket-level error occurred on the connection (common when reusing a client across requests). | Create a new `Client` inside your handler. Do not store clients in global variables. |
| `Client was closed and is not queryable` | A query was attempted on a client whose `.end()` method was already called. | Create a new `Client` inside your handler instead of reusing one. |
| `Cannot use a pool after calling end on the pool` | `pool.connect()` was called on a `Pool` instance that has already been ended. | Do not use `new Pool()` in the global scope. Create a `new Client()` inside your handler. |
| `Client has already been connected. You cannot reuse a client.` | `client.connect()` was called on a client that was already connected in a previous invocation. | Create a new `Client` per request. |

Postgres.js (error `code` property):

| Error Message | Details | Recommended fixes |
| --- | --- | --- |
| `write CONNECTION_ENDED <host>:<port>` | A query was attempted after `sql.end()` was called, or the connection was cleaned up from a prior request. Error code: `CONNECTION_ENDED`. | Create a new `postgres()` instance inside your handler. |
| `write CONNECTION_DESTROYED <host>:<port>` | The connection was forcefully terminated — for example, during `sql.end({ timeout })` expiration, or because the connection was already terminated. Error code: `CONNECTION_DESTROYED`. | Create a new `postgres()` instance inside your handler for every request. |
| `write CONNECTION_CLOSED <host>:<port>` | The underlying socket was closed unexpectedly while queries were still pending. Error code: `CONNECTION_CLOSED`. | Create a new `postgres()` instance inside your handler. If this occurs within a single request, check for network issues or query timeouts. |

mysql2:

| Error Message | Details | Recommended fixes |
| --- | --- | --- |
| `Can't add new command when connection is in closed state` | A query was attempted on a connection that has already been closed or encountered a fatal error. | Create a new connection inside your handler instead of reusing one from global scope. |
| `Connection lost: The server closed the connection.` | The underlying socket was closed by the server or was garbage collected between requests. Error code: `PROTOCOL_CONNECTION_LOST`. | Create a new connection inside your handler for every request. |
| `Pool is closed.` | `pool.getConnection()` was called on a pool that has already been closed. | Do not use `createPool()` in the global scope. Create a new `createConnection()` inside your handler. |

mysql:

| Error Message | Details | Recommended fixes |
| --- | --- | --- |
| `Cannot enqueue Query after fatal error.` | A query was attempted on a connection that previously encountered a fatal error. Error code: `PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR`. | Create a new connection inside your handler instead of reusing one from global scope. |
| `Cannot enqueue Query after invoking quit.` | A query was attempted on a connection after `.end()` was called. Error code: `PROTOCOL_ENQUEUE_AFTER_QUIT`. | Create a new connection inside your handler for every request. |
| `Cannot enqueue Handshake after already enqueuing a Handshake.` | `.connect()` was called on a connection that was already connected in a previous request. Error code: `PROTOCOL_ENQUEUE_HANDSHAKE_TWICE`. | Create a new connection per request. |

## Notes

- Runtime errors arrive as `ErrorResponse` wire protocol messages; Hyperdrive errors without a matching PostgreSQL code use `58000`. Errors sent by your database are passed through unchanged when possible.
- Stale reads after writes: query caching may serve cached results. Check metrics by `cacheStatus` (`hit`, `miss`, `disabled`, `uncacheable`) and use a cache-disabled configuration for fresh reads (see [query-caching](./query-caching.md)).
- Uncached queries: (1) `STABLE`/`VOLATILE` functions (`NOW()`, `CURRENT_TIMESTAMP`, `CURRENT_DATE`, `RANDOM()`, `LASTVAL()`); (2) function names inside SQL comments are detected by text matching; (3) Postgres.js with `prepare: false` — use `prepare: true`.
- Performance: transactions hold a connection for their whole duration and limit multiplexing; avoid wrapping queries in transactions where possible.
- Workers I/O across requests and Node.js compatibility: see the cloudflare-workers skill.

## Related

- [Query caching](./query-caching.md)
- [Connection lifecycle](./connection-lifecycle.md)
- [Metrics and analytics](./metrics.md)
- [Limits](./limits.md)
