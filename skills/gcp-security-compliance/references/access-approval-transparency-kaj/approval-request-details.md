---
source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/approval-request-details
---

# Anatomy of an Access Approval request

Describes the fields of an Access Approval request and the statuses a request can have in the history.

## Signature / Usage

Sample Access Approval request:

```json
{
  "name": "projects/123456/approvalRequests/xyzabc123",
  "requestedResourceName": "projects/123456",

  "requestedReason": {
    "detail":  "Case number: bar123",
    "type":  "CUSTOMER_INITIATED_SUPPORT"
  },
  "requestedLocations": {
    "principalOfficeCountry": "US",
    "principalPhysicalLocationCountry": "US"
  },
  "requestTime": "2018-08-28T19:07:12.286Z",

  "requestedExpiration": "2018-09-02T19:07:11.877Z"
}
```

## Options / Props

### Request fields

| Field | Description |
|---|---|
| `Resource` | The resource the Google employee requests access to, at resource or project level. Approving a resource also grants access to its child resources (approving `projects/123456/buckets/bucket-123` also allows `projects/123456/buckets/bucket-123/objects/file-1`). |
| `Request time` | When Access Approval sent the request to you. |
| `Access expires` | When the requested access expires. |
| `Office location` | Access is allowed only if the accessor has a permanent desk in this location: an ISO 3166-1 alpha-2 country code, a 3-character continent identifier, or `ANY`. |
| `Physical location` | Access is allowed only if the accessor is physically in this location: an ISO 3166-1 alpha-2 country code, a 3-character continent identifier, or `ANY`. |
| `Reason` | The reason for access (see the justification reason codes in the Access Transparency logs page). |

### Request status (history)

| Status | Description |
|---|---|
| `pending` | Awaiting your action. |
| `approved` | You approved the request. |
| `dismissed` | You dismissed the request. |
| `expired` | The duration of access you approved has expired. |
| `policy-approved` | Approved by the rules of a configured policy (see the enrollment mode in the setup page). |
| `auto-approved` | Google personnel made a time-sensitive access (production outage investigation or legal request) that curtailed the usual flow. Logged with this status for transparency; shown under **History requests** in the console; also generates the usual Access Transparency logs. |

## Notes

- Response time is the time you approved or dismissed a request; it is not applicable to requests dismissed due to inactivity.
- Historical requests (approved, auto-approved, dismissed, expired) are viewable in the console or with `curl`; the history log contains all request fields plus status and response time.
- The REST resource is `ApprovalRequest` (`https://docs.cloud.google.com/assured-workloads/access-approval/docs/reference/rest/v1/folders.approvalRequests#ApprovalRequest`).
- Source inconsistency: the source's `Physical location` row repeats a sentence fragment ("an ISO 3166-1 alpha-2 country code, a location. The location is one of ..."); the values above follow the complete sentence in the same row.
- Source: https://docs.cloud.google.com/assured-workloads/access-approval/docs/approval-request-details (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [approve-requests.md](./approve-requests.md)
- [reading-logs.md](./reading-logs.md)
- [access-approval-overview.md](./access-approval-overview.md)
