---
source: https://cloudprofiler.googleapis.com/$discovery/rest?version=v2
---

# Cloud Profiler API message schemas (cloudprofiler)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudprofiler/`.

### `CreateProfileRequest`

- CreateProfileRequest describes a profile resource online creation request. The deployment field must be populated. The profile_type specifies the list of profile types supported by the agent. The creation call will hang until a profile of one of these types needs to be collected.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deployment` | Deployment | Deployment details. |
| `profileType` | array<string> | One or more profile types that the agent is capable of providing. Values: `PROFILE_TYPE_UNSPECIFIED`, `CPU`, `WALL`, `HEAP`, `THREADS`, `CONTENTION`, `PEAK_HEAP`, `HEAP_ALLOC`. |

### `Deployment`

- Deployment contains the deployment identification information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `labels` | object | Labels identify the deployment within the user universe and same target. Validation regex for label names: `^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$`. Value for an individual label must be <= 512 bytes, the total size of all label names and values must be <= 1024 bytes. Label named "language" can be used to record the programming language of the profiled deployment. The standard choices for the value include "java", "go", "python", "ruby", "nodejs", "php", "dotnet". For deployments running on Google Cloud Platform, "zone" or "region" label should be present describing the deployment location. An example of a zone is "us-central1-a", an example of a region is "us-central1" or "us-central". |
| `projectId` | string | Project ID is the ID of a cloud project. Validation regex: `^a-z{4,61}[a-z0-9]$`. |
| `target` | string | Target is the service name used to group related deployments: \* Service name for App Engine Flex / Standard. \* Cluster and container name for GKE. \* User-specified string for direct Compute Engine profiling (e.g. Java). \* Job name for Dataflow. Validation regex: `^[a-z0-9]([-a-z0-9_.]{0,253}[a-z0-9])?$`. |

### `ListProfilesResponse`

- ListProfileResponse contains the list of collected profiles for deployments in projects which the user has permissions to view.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to receive the next page of results. This field maybe empty if there are no more profiles to fetch. |
| `profiles` | array<Profile> | List of profiles fetched. |
| `skippedProfiles` | integer (int32) | Number of profiles that were skipped in the current page since they were not able to be fetched successfully. This should typically be zero. A non-zero value may indicate a transient failure, in which case if the number is too high for your use case, the call may be retried. |

### `Profile`

- Profile resource.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deployment` | Deployment | Deployment this profile corresponds to. |
| `duration` | string (google-duration) | Duration of the profiling session. Input (for the offline mode) or output (for the online mode). The field represents requested profiling duration. It may slightly differ from the effective profiling duration, which is recorded in the profile data, in case the profiling can't be stopped immediately (e.g. in case stopping the profiling is handled asynchronously). |
| `labels` | object | Input only. Labels associated to this specific profile. These labels will get merged with the deployment labels for the final data set. See documentation on deployment labels for validation rules and limits. |
| `name` | string | Output only. Opaque, server-assigned, unique ID for this profile. |
| `profileBytes` | string (byte) | Input only. Profile bytes, as a gzip compressed serialized proto, the format is https://github.com/google/pprof/blob/master/proto/profile.proto. |
| `profileType` | string enum | Type of profile. For offline mode, this must be specified when creating the profile. For online mode it is assigned and returned by the server. Values: `PROFILE_TYPE_UNSPECIFIED`, `CPU`, `WALL`, `HEAP`, `THREADS`, `CONTENTION`, `PEAK_HEAP`, `HEAP_ALLOC`. |
| `startTime` | string (google-datetime) | Output only. Start time for the profile. This output is only present in response from the ListProfiles method. |

### Shape of `CreateProfileRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "deployment": "Deployment",
  "profileType": "array<string>"
}
```

## Notes

- Generated from the Discovery document(s) v2 of `cloudprofiler` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudprofiler.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
