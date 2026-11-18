---
source: https://docs.cloud.google.com/identity-platform/docs/install-admin-sdk
---

# Installing the Admin SDK

The Admin SDK manages Identity Platform from a server environment: migrating users, setting custom claims, configuring identity providers and more. This page lists the supported languages, creates a service account with the Identity Toolkit Admin role, installs the SDK and initializes it with default credentials or a key file.

## Signature / Usage

### Create a service account and key (gcloud)

Requires the Create Service Accounts role (`roles/iam.serviceAccountCreator`) and the Project IAM Admin role (`roles/resourcemanager.projectIamAdmin`).

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=roles/identitytoolkit.admin
```

```bash
gcloud iam service-accounts keys create FILE_NAME.json --iam-account=SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com
```

### Install the SDK

```bash
npm install firebase-admin --save
```

```bash
pip install --user firebase-admin
```

```bash
go get firebase.google.com/go
```

Java (`com.google.firebase:firebase-admin:6.11.0`) and C# (`FirebaseAdmin` 1.9.1) install steps are in the source.

### Initialize with default credentials

```javascript
// Initialize the default app
var admin = require('firebase-admin');
var app = admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
```

```python
default_app = firebase_admin.initialize_app()
```

```go
app, err := firebase.NewApp(context.Background(), nil)
if err != nil {
	log.Fatalf("error initializing app: %v\n", err)
}
```

### Initialize with a service account key file

```javascript
// Initialize the default app
var admin = require('firebase-admin');
var app = admin.initializeApp({
  credential: admin.credential.cert('/path/to/serviceAccountKey.json')
});
```

```python
import firebase_admin
from firebase_admin import credentials
from firebase_admin import exceptions

cred = credentials.Certificate('path/to/serviceAccountKey.json')
default_app = firebase_admin.initialize_app(cred)
```

```go
opt := option.WithCredentialsFile("path/to/serviceAccountKey.json")
app, err := firebase.NewApp(context.Background(), nil, opt)
if err != nil {
	log.Fatalf("error initializing app: %v\n", err)
}
```

### Initialize multiple apps (Node.js)

```javascript
// Initialize the default app
admin.initializeApp(defaultAppConfig);

// Initialize another app with a different config
var otherApp = admin.initializeApp(otherAppConfig, 'other');

console.log(admin.app().name);  // '[DEFAULT]'
console.log(otherApp.name);     // 'other'

// Use the shorthand notation to retrieve the default app's services
var defaultAuth = admin.auth();
```

### Set access scopes on a Compute Engine VM

Check the existing access scopes:

Adapted (not in the official docs): the bracketed `[INSTANCE-NAME]` placeholder (a zsh glob) is written as `INSTANCE_NAME`.

```bash
gcloud compute instances describe INSTANCE_NAME --format json
```

The command returns the service account and its scopes, for example:

```text
"serviceAccounts": [
 {
  "email": "example.gserviceaccount.com",
  "scopes": [
   "https://www.googleapis.com/auth/cloud-platform",
   "https://www.googleapis.com/auth/userinfo.email"
   ]
  }
]
```

To update access scopes, stop the VM, then run:

Adapted (not in the official docs): placeholders `INSTANCE_NAME` / `SERVICE_ACCOUNT_EMAIL`, and the doubled opening quote on `--scopes` (which breaks the command) removed.

```bash
gcloud compute instances set-service-account INSTANCE_NAME \
  --service-account "SERVICE_ACCOUNT_EMAIL" \
  --scopes "https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/userinfo.email"
```

## Options / Props

### Minimum framework versions

The table is verbatim from the source and lists historical minimums; current releases need newer runtimes (see Notes).

| Language | Minimum framework version |
|---|---|
| Node.js | Node.js 8.13.0+ |
| Java | Java 7+ (Java 8+ recommended) |
| Python | Python 2.7+ or 3.4+ (3.4+ recommended) |
| Go | Go 1.9+ |
| C# | .NET Framework 4.5+ or .NET Core 1.5+ |

## Notes

- Features listed per SDK language: Custom token minting, ID token verification, user management, custom claims, refresh token revocation, import users, session cookie management, email action links, SAML/OIDC provider configuration management, multi-tenancy support, plus Firebase services (Realtime Database, Cloud Messaging, Cloud Storage, Firestore, Project Management, security rules, ML model management, Remote Config, App Check, Extensions). The per-language support matrix is on the source page.
- Service account key files are long-lived credentials: do not commit or share them, and prefer default credentials (`applicationDefault()` or no argument) where available. Key creation downloads a JSON key file.
- The `roles/identitytoolkit.admin` grant above is project-level, as in the source; the `--role` flag decides what the service account can access and the role can be revoked later.
- Compute Engine VMs using Application Default Credentials need the `userinfo.email` and `cloud-platform` access scopes. The full flag list is in the `gcp-compute` skill (https://docs.cloud.google.com/sdk/gcloud/reference/compute/instances/set-service-account).
- Adapted from the official docs: `gcloud compute instances describe [INSTANCE-NAME] --format json`.
- Corrected from the official docs: `--scopes ""https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/userinfo.email"` with `[INSTANCE-NAME]` and `--service-account "your.gserviceaccount.com"`.
- Console service-account steps, Java and C# code, and the Java / C# / Python / Go multiple-app samples are omitted; see the source page.
- The minimum framework versions in the source are outdated. The install commands above install the current release: as of 2026-11-18, npm `firebase-admin` 14.5.1 declares `engines: { node: '>=22' }` (https://www.npmjs.com/package/firebase-admin) and PyPI `firebase-admin` 7.8.0 requires Python `>=3.10` (https://pypi.org/project/firebase-admin/). The Java, Go and C# requirements were not rechecked; see each SDK's release notes.
- Source: https://docs.cloud.google.com/identity-platform/docs/install-admin-sdk (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts-admin-auth-api.md](./concepts-admin-auth-api.md)
- [multi-tenancy.md](./multi-tenancy.md)
