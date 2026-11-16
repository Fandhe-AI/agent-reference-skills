---
source: https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library
---

# Create a Firestore database by using a server client library

Quickstart: create a Firestore (Native mode) database, add the server client library to an app, initialize a client, add documents to a collection and read them back. Collections and documents are created implicitly the first time data is added.

## Signature / Usage

### Install the client library

```bash
pip install --upgrade google-cloud-firestore
```

```bash
npm install --save @google-cloud/firestore
```

### Initialize the client

```python
from google.cloud import firestore

# The `project` parameter is optional and represents which project the client
# will act on behalf of. If not supplied, the client falls back to the default
# project inferred from the environment.
db = firestore.Client(project="my-project-id")
```

```javascript
const Firestore = require('@google-cloud/firestore');

const db = new Firestore({
  projectId: 'YOUR_PROJECT_ID',
  keyFilename: '/path/to/keyfile.json',
});
```

### Add data

```python
doc_ref = db.collection("users").document("alovelace")
doc_ref.set({"first": "Ada", "last": "Lovelace", "born": 1815})
```

```javascript
const docRef = db.collection('users').doc('alovelace');

await docRef.set({
  first: 'Ada',
  last: 'Lovelace',
  born: 1815
});
```

Documents in a collection can contain different sets of fields (the second document adds `middle`):

```python
doc_ref = db.collection("users").document("aturing")
doc_ref.set({"first": "Alan", "middle": "Mathison", "last": "Turing", "born": 1912})
```

```javascript
const aTuringRef = db.collection('users').doc('aturing');

await aTuringRef.set({
  'first': 'Alan',
  'middle': 'Mathison',
  'last': 'Turing',
  'born': 1912
});
```

### Read data

```python
users_ref = db.collection("users")
docs = users_ref.stream()

for doc in docs:
    print(f"{doc.id} => {doc.to_dict()}")
```

```javascript
const snapshot = await db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});
```

## Options / Props

| Item | Value |
|------|-------|
| Python package | `google-cloud-firestore` (async client: `firestore.AsyncClient`) |
| Node.js package | `@google-cloud/firestore` |
| Go package | `cloud.google.com/go/firestore` |
| PHP package | `google/cloud-firestore` (needs the gRPC extension) |
| Ruby gem | `google-cloud-firestore` |
| C# package | `Google.Cloud.Firestore` |
| Java artifact | `com.google.cloud:google-cloud-firestore` (via `libraries-bom`) |

## Notes

- The source notes: "You can't use both Firestore and Datastore in the same project, which might affect apps using App Engine." Source inconsistency: the current [manage-databases](https://docs.cloud.google.com/firestore/native/docs/manage-databases) page says "You can create multiple Firestore databases per project" and creates each one with `--type=firestore-native` or `--type=datastore-mode`, so the Native / Datastore mode choice is per database, not per project.
- Creating the database in the console: choose Firestore in Native mode, pick a location, click Create Database. If the location can't be selected, the project's "location for default Google Cloud resources" is already set. Creating the database also enables the Firestore API.
- Server client libraries authenticate with Application Default Credentials; the source says to set up authentication by creating a service account and setting an environment variable. Prefer ADC (see `authentication.md`) over a key file such as `keyFilename`. In the Node.js sample, `keyFilename` is optional.
- Python: the source recommends installing into a virtual environment.
- The source also shows Console steps and Java, Go, PHP, C#, Ruby and Python async samples that are omitted here.
- Firestore pages: Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility), distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). Client library setup in general is in `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/firestore/native/docs/create-database-server-client-library (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [authentication.md](./authentication.md)
- [manage-databases.md](./manage-databases.md)
- [order-limit-data.md](./order-limit-data.md)
- [emulator.md](./emulator.md)
