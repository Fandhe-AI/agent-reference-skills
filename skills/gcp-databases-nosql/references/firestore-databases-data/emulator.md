---
source: https://docs.cloud.google.com/firestore/native/docs/emulator
---

# Use Firestore emulator locally

The Google Cloud CLI provides a local, in-memory Firestore emulator for testing with all Firestore client libraries. Use it only for local testing; it persists nothing across runs and must not be used for production.

## Signature / Usage

### Install and run

```bash
gcloud components update
```

```bash
gcloud emulators firestore start
```

Default address is `127.0.0.1:8080`. Bind to a specific host and port with `--host-port`:

```bash
gcloud emulators firestore start --host-port=HOST:PORT
```

Stop with `Control + C`, or POST to `/shutdown`:

```bash
curl -d '' HOST:PORT/shutdown
```

Start in Enterprise edition (valid values `standard` and `enterprise`; default Standard):

```bash
gcloud emulators firestore start --edition=enterprise
```

### Connect server client libraries

C#, Go, Java, Node.js, PHP, Python and Ruby libraries connect automatically when this variable is set:

```bash
export FIRESTORE_EMULATOR_HOST="HOST:PORT"
```

Web SDK (version 9) connection:

```javascript
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

// firebaseApps previously initialized using initializeApp()
const db = getFirestore();
connectFirestoreEmulator(db, '127.0.0.1', 8080);
```

### Clear emulator data

HTTP `DELETE` against the emulator endpoint (replace `HOST`, `PORT`, `PROJECT_ID`):

```bash
curl -v -X DELETE "http://HOST:PORT/emulator/v1/projects/PROJECT_ID/databases/(default)/documents"
```

## Options / Props

| Item | Value |
|------|-------|
| Default host:port | `127.0.0.1:8080` |
| `--host-port` | `HOST:PORT` binding |
| `--edition` | `standard` (default) or `enterprise` |
| Env var | `FIRESTORE_EMULATOR_HOST` |
| Clear-data endpoint | `http://HOST:PORT/emulator/v1/projects/PROJECT_ID/databases/(default)/documents` |

### Differences from production

- Transactions: simple locking, does not mimic production concurrency modes; concurrent writes to one document can be slow, up to 30 seconds for locks to release. Production transaction limits (timeouts, sizes) are not mimicked.
- Indexes: composite indexes are not tracked; any valid query runs. Test against real Firestore to find required indexes.
- Text search: the `search(...)` stage is not supported.
- Limits: not all production limits are enforced (e.g. transactions rejected as too large in production may be allowed).

## Notes

- The emulator will require Java 21 starting with Google Cloud CLI release 528.0.0.
- Destructive: the clear-data request and shutdown delete all emulator data. The emulator is in-memory and local only, so try commands on a disposable setup.
- The emulator clears contents on shutdown, but the Firestore SDK offline cache is not cleared automatically; consider disabling local persistence (disabled by default in the Web SDK).
- The `http://` URLs target the local emulator at `127.0.0.1` and are not remote endpoints. Your code should await REST confirmation that the deletion finished or failed.
- The same emulator is available through the Firebase Local Emulator Suite: https://firebase.google.com/docs/emulator-suite
- The source also shows Android, Swift and Web version 8 connection samples that are omitted; Firebase SDK setup is out of scope of this skill. General emulator and client setup patterns are in `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/firestore/native/docs/emulator (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-database-server-client-library.md](./create-database-server-client-library.md)
- [order-limit-data.md](./order-limit-data.md)
