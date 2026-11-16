---
source: https://docs.cloud.google.com/firestore/native/docs/locations
---

# Locations

When you provision a Firestore database you must choose a location (multi-region or regional) close to your users and services. You can create multiple databases per project, each with its own location. The location cannot be changed after provisioning.

## Signature / Usage

### View the location of your databases

```bash
gcloud firestore databases list
```

Other methods: the database list in the Google Cloud console (location column), or in the Firebase console under Databases \& Storage > Firestore > Data tab.

## Options / Props

### Multi-region locations (Standard and Enterprise editions, identical)

| Multi-region name | Description | Read-Write regions | Witness region |
|---|---|---|---|
| `eur3` | Europe | `europe-west1` (Belgium), `europe-west4` (Netherlands) | `europe-north1` (Finland) |
| `nam5` | United States (Central) | `us-central1` (Iowa), `us-central2` (Oklahoma---private GCP region) | `us-east1` (South Carolina) |
| `nam7` | United States (Central and East) | `us-central1` (Iowa), `us-east4` (Northern Virginia) | `us-central2` (Oklahoma---private Google Cloud region) |

A multi-region location has read-write replicas (full data) and a witness replica (participates in replication without a full copy). It survives the loss of an entire region; data is also replicated across zones within a region.

### Regional locations

The source lists the same regions for both editions except `europe-west10` (Berlin), which appears only in the Standard edition list. For regions marked "No App Engine", the source states: "This location does not support App Engine. If you plan to use App Engine, you should choose a different location."

| Area | Regions (description) |
|---|---|
| North America | `us-west1` (Oregon), `us-west2` (Los Angeles), `us-west3` (Salt Lake City), `us-west4` (Las Vegas), `us-central1` (Iowa; No App Engine), `northamerica-northeast1` (Montréal), `northamerica-northeast2` (Toronto; No App Engine), `northamerica-south1` (Queretaro; No App Engine), `us-east1` (South Carolina), `us-east4` (Northern Virginia), `us-east5` (Columbus; No App Engine), `us-south1` (Dallas; No App Engine) |
| South America | `southamerica-west1` (Santiago; No App Engine), `southamerica-east1` (São Paulo) |
| Europe | `europe-west2` (London), `europe-west1` (Belgium; No App Engine), `europe-west4` (Netherlands; No App Engine), `europe-west8` (Milan; No App Engine), `europe-southwest1` (Madrid; No App Engine), `europe-west9` (Paris; No App Engine), `europe-west12` (Turin; No App Engine), `europe-west10` (Berlin; No App Engine; Standard list only), `europe-west3` (Frankfurt), `europe-north1` (Finland; No App Engine), `europe-north2` (Stockholm; No App Engine), `europe-central2` (Warsaw), `europe-west6` (Zürich) |
| Middle East | `me-central1` (Doha; No App Engine), `me-central2` (Dammam; No App Engine), `me-west1` (Tel Aviv; No App Engine) |
| Asia | `asia-south1` (Mumbai), `asia-south2` (Delhi; No App Engine), `asia-southeast1` (Singapore), `asia-southeast2` (Jakarta), `asia-southeast3` (Bangkok), `asia-east2` (Hong Kong), `asia-east1` (Taiwan), `asia-northeast1` (Tokyo), `asia-northeast2` (Osaka), `asia-northeast3` (Seoul) |
| Australia | `australia-southeast1` (Sydney), `australia-southeast2` (Melbourne; No App Engine) |
| Africa | `africa-south1` (Johannesburg; No App Engine) |

### Location SLA

| Covered service | Monthly uptime percentage |
|---|---|
| Firestore Multi-Region | \>= 99.999% |
| Firestore Regional | \>= 99.99% |

## Notes

- Choose regional for lower costs, lower write latency, or co-location with other Google Cloud resources. Choose multi-region to maximize availability and durability. Location determines operation cost: https://cloud.google.com/firestore/pricing and https://cloud.google.com/firestore/enterprise/pricing.
- The default Firestore database's location depends on the "location for default Google Cloud resources" (App Engine related: default Firestore database, default Cloud Storage for Firebase bucket named `*.appspot.com`, Cloud Scheduler for 1st gen scheduled functions). It is immutable, and setting one resource's location indirectly sets all of them. Non-default Firestore databases do not share this dependency.
- Starting October 30, 2024, new default Cloud Storage for Firebase buckets are named `*.firebasestorage.app`, are not associated with App Engine, and neither set nor depend on the default Firestore location. Provisioning the default Firestore database still sets the location of any future App Engine app. If a `*.appspot.com` bucket was provisioned earlier, an App Engine app already fixed the future default Firestore location; deleting the bucket does not delete the App Engine app.
- An App Engine app located in `us-central` or `europe-west` makes the default Firestore database multi-regional.
- Firebase console paths are shown by the source only for viewing locations; Firebase client-side setup is out of scope of this skill.
- Source: https://docs.cloud.google.com/firestore/native/docs/locations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [best-practices.md](./best-practices.md)
- [editions-overview.md](./editions-overview.md)
- [understand-reads-writes-scale.md](./understand-reads-writes-scale.md)
