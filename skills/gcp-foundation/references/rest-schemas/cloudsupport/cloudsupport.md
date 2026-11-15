---
source: https://cloudsupport.googleapis.com/$discovery/rest?version=v2
---

# Google Cloud Support API message schemas (cloudsupport)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudsupport/`.

### `Actor`

- An Actor represents an entity that performed an action. For example, an actor could be a user who posted a comment on a support case, a user who uploaded an attachment, or a service account that created a support case.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The name to display for the actor. If not provided, it is inferred from credentials supplied during case creation. When an email is provided, a display name must also be provided. This will be obfuscated if the user is a Google Support agent. |
| `email` | string | The email address of the actor. If not provided, it is inferred from the credentials supplied during case creation. When a name is provided, an email must also be provided. If the user is a Google Support agent, this is obfuscated. This field is deprecated. Use `username` instead. |
| `googleSupport` | boolean | Output only. Whether the actor is a Google support actor. |
| `username` | string | Output only. The username of the actor. It may look like an email or other format provided by the identity provider. If not provided, it is inferred from the credentials supplied. When a name is provided, a username must also be provided. If the user is a Google Support agent, this will not be set. |

### `Attachment`

- An Attachment contains metadata about a file that was uploaded to a case - it is NOT a file itself. That being said, the name of an Attachment object can be used to download its accompanying file through the `media.download` endpoint. While attachments can be uploaded in the console at the same time as a comment, they're associated on a "case" level, not a "comment" level.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the attachment was created. |
| `creator` | Actor | Output only. The user who uploaded the attachment. Note, the name and email will be obfuscated if the attachment was uploaded by Google support. |
| `filename` | string | The filename of the attachment (e.g. `"graph.jpg"`). |
| `mimeType` | string | Output only. The MIME type of the attachment (e.g. text/plain). |
| `name` | string | Output only. Identifier. The resource name of the attachment. |
| `sizeBytes` | string (int64) | Output only. The size of the attachment in bytes. |

### `Blobstore2Info`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `blobGeneration` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `blobId` | string | \# gdata.\* are outside protos with mising documentation |
| `downloadExternalReadToken` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `downloadReadHandle` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `readToken` | string | \# gdata.\* are outside protos with mising documentation |
| `uploadFragmentListCreationInfo` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `uploadMetadataContainer` | string (byte) | \# gdata.\* are outside protos with mising documentation |

### `Case`

- A Case is an object that contains the details of a support case. It contains fields for the time it was created, its priority, its classification, and more. Cases can also have comments and attachments that get added over time. A case is parented by a Google Cloud organization or project. Organizations are identified by a number, so the name of a case parented by an organization would look like this: organizations/123/cases/456 Projects have two unique identifiers, an ID and a number, and they look like this: projects/abc/cases/456 projects/123/cases/456 You can use either of them when calling the API. To learn more about project identifiers, see AIP-2510 (https://google.aip.dev/cloud/2510).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `classification` | CaseClassification | The issue classification applicable to this case. |
| `contactEmail` | string | A user-supplied email address to send case update notifications for. This field must be set when the request is authenticated using a Workforce Identity Federation (BYOID) flow and must not be set otherwise. When unset, the contact email is inferred from the authenticated user's credentials. If you use a service account to create the case and its inferred email address cannot receive emails, you should add appropriate contact emails in the `subscriber_email_addresses` field. |
| `createTime` | string (google-datetime) | Output only. The time this case was created. |
| `creator` | Actor | The user who created the case. This field is ignored on input. Note: The name and email will be obfuscated if the case was created by Google Support. |
| `description` | string | A broad description of the issue. |
| `displayName` | string | The short summary of the issue reported in this case. |
| `escalated` | boolean | Whether the case is currently escalated. |
| `languageCode` | string | The language the user has requested to receive support in. This should be a BCP 47 language code (e.g., `"en"`, `"zh-CN"`, `"zh-TW"`, `"ja"`, `"ko"`). If no language or an unsupported language is specified, this field defaults to English (en). Language selection during case creation may affect your available support options. For a list of supported languages and their support working hours, see: https://cloud.google.com/support/docs/language-working-hours |
| `name` | string | Identifier. The resource name for the case. |
| `priority` | string enum | The priority of this case. |
| `state` | string enum | Output only. The current status of the support case. |
| `subscriberEmailAddresses` | array<string> | The email addresses to receive updates on this case. |
| `testCase` | boolean | Whether this case was created for internal API testing and should not be acted on by the support team. |
| `timeZone` | string | The timezone of the user who created the support case. It should be in a format IANA recognizes: https://www.iana.org/time-zones. There is no additional validation done by the API. |
| `updateTime` | string (google-datetime) | Output only. The time this case was last updated. |

### `CaseClassification`

- A Case Classification represents the topic that a case is about. It's very important to use accurate classifications, because they're used to route your cases to specialists who can help you. A classification always has an ID that is its unique identifier. A valid ID is required when creating a case.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | A display name for the classification. The display name is not static and can change. To uniquely and consistently identify classifications, use the `CaseClassification.id` field. |
| `id` | string | The unique ID for a classification. Must be specified for case creation. To retrieve valid classification IDs for case creation, use `caseClassifications.search`. Classification IDs returned by `caseClassifications.search` are guaranteed to be valid for at least 6 months. If a given classification is deactiveated, it will immediately stop being returned. After 6 months, `case.create` requests using the classification ID will fail. |

### `CloseCaseRequest`

- The request message for the CloseCase endpoint.
- Version: v2

### `Comment`

- A comment associated with a support case. Case comments are the primary way for Google Support to communicate with a user who has opened a case. When a user responds to Google Support, the user's responses also appear as comments.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `body` | string | The full comment body. Maximum of 12800 characters. |
| `createTime` | string (google-datetime) | Output only. The time when the comment was created. |
| `creator` | Actor | Output only. The user or Google Support agent who created the comment. |
| `name` | string | Output only. Identifier. The resource name of the comment. |
| `plainTextBody` | string | Output only. DEPRECATED. DO NOT USE. A duplicate of the `body` field. This field is only present for legacy reasons. |

### `CompositeMedia`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `blobRef` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `blobstore2Info` | Blobstore2Info | \# gdata.\* are outside protos with mising documentation |
| `cosmoBinaryReference` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `crc32cHash` | integer (uint32) | \# gdata.\* are outside protos with mising documentation |
| `inline` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `length` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `md5Hash` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `objectId` | ObjectId | \# gdata.\* are outside protos with mising documentation |
| `path` | string | \# gdata.\* are outside protos with mising documentation |
| `referenceType` | string enum | \# gdata.\* are outside protos with mising documentation |
| `sha1Hash` | string (byte) | \# gdata.\* are outside protos with mising documentation |

### `ContentTypeInfo`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bestGuess` | string | \# gdata.\* are outside protos with mising documentation |
| `fromBytes` | string | \# gdata.\* are outside protos with mising documentation |
| `fromFileName` | string | \# gdata.\* are outside protos with mising documentation |
| `fromFusionId` | string | \# gdata.\* are outside protos with mising documentation |
| `fromHeader` | string | \# gdata.\* are outside protos with mising documentation |
| `fromUrlPath` | string | \# gdata.\* are outside protos with mising documentation |
| `fusionIdDetectionMetadata` | string (byte) | \# gdata.\* are outside protos with mising documentation |

### `CreateAttachmentRequest`

- The request message for the CreateAttachment endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attachment` | Attachment | Required. The attachment to be created. |

### `DiffChecksumsResponse`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `checksumsLocation` | CompositeMedia | \# gdata.\* are outside protos with mising documentation |
| `chunkSizeBytes` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `objectLocation` | CompositeMedia | \# gdata.\* are outside protos with mising documentation |
| `objectSizeBytes` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `objectVersion` | string | \# gdata.\* are outside protos with mising documentation |

### `DiffDownloadResponse`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `objectLocation` | CompositeMedia | \# gdata.\* are outside protos with mising documentation |

### `DiffUploadRequest`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `checksumsInfo` | CompositeMedia | \# gdata.\* are outside protos with mising documentation |
| `objectInfo` | CompositeMedia | \# gdata.\* are outside protos with mising documentation |
| `objectVersion` | string | \# gdata.\* are outside protos with mising documentation |

### `DiffUploadResponse`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `objectVersion` | string | \# gdata.\* are outside protos with mising documentation |
| `originalObject` | CompositeMedia | \# gdata.\* are outside protos with mising documentation |

### `DiffVersionResponse`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `objectSizeBytes` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `objectVersion` | string | \# gdata.\* are outside protos with mising documentation |

### `DownloadParameters`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowGzipCompression` | boolean | \# gdata.\* are outside protos with mising documentation |
| `ignoreRange` | boolean | \# gdata.\* are outside protos with mising documentation |

### `EmailMessage`

- An email associated with a support case.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `actor` | Actor | Output only. The user or Google Support agent that created this email message. This is inferred from the headers on the email message. |
| `bodyContent` | TextContent | Output only. The full email message body. A best-effort attempt is made to remove extraneous reply threads. |
| `ccEmailAddresses` | array<string> | Output only. Email addresses CCed on the email. |
| `createTime` | string (google-datetime) | Output only. Time when this email message object was created. |
| `name` | string | Identifier. Resource name for the email message. |
| `recipientEmailAddresses` | array<string> | Output only. Email addresses the email was sent to. |
| `subject` | string | Output only. Subject of the email. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `EscalateCaseRequest`

- The request message for the EscalateCase endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `escalation` | Escalation | The escalation information to be sent with the escalation request. |

### `Escalation`

- An escalation of a support case.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `justification` | string | Required. A free text description to accompany the `reason` field above. Provides additional context on why the case is being escalated. |
| `reason` | string enum | Required. The reason why the Case is being escalated. |

### `ExpungeSupportEventSubscriptionRequest`

- Request message for ExpungeSupportEventSubscription.
- Version: v2

### `FeedItem`

- A feed item associated with a support case.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `attachment` | Attachment | Output only. An attachment attached to the case. |
| `comment` | Comment | Output only. A comment added to the case. |
| `deletedAttachment` | Attachment | Output only. A deleted attachment that used to be associated with the support case. |
| `emailMessage` | EmailMessage | Output only. An email message received in reply to the case. |
| `eventTime` | string (google-datetime) | Output only. Time corresponding to the event of this item. |

### `ListAttachmentsResponse`

- The response message for the ListAttachments endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attachments` | array<Attachment> | The list of attachments associated with a case. |
| `nextPageToken` | string | A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.attachments.list` requests. If unspecified, there are no more results to retrieve. |

### `ListCasesResponse`

- The response message for the ListCases endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cases` | array<Case> | The list of cases associated with the parent after any filters have been applied. |
| `nextPageToken` | string | A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.list` requests. If unspecified, there are no more results to retrieve. |

### `ListCommentsResponse`

- The response message for the ListComments endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `comments` | array<Comment> | List of the comments associated with the case. |
| `nextPageToken` | string | A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.comments.list` requests. If unspecified, there are no more results to retrieve. |

### `ListSupportEventSubscriptionsResponse`

- Response message for ListSupportEventSubscriptions.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `supportEventSubscriptions` | array<SupportEventSubscription> | The support event subscriptions. |

### `Media`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `algorithm` | string | \# gdata.\* are outside protos with mising documentation |
| `bigstoreObjectRef` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `blobRef` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `blobstore2Info` | Blobstore2Info | \# gdata.\* are outside protos with mising documentation |
| `compositeMedia` | array<CompositeMedia> | \# gdata.\* are outside protos with mising documentation |
| `contentType` | string | \# gdata.\* are outside protos with mising documentation |
| `contentTypeInfo` | ContentTypeInfo | \# gdata.\* are outside protos with mising documentation |
| `cosmoBinaryReference` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `crc32cHash` | integer (uint32) | \# gdata.\* are outside protos with mising documentation |
| `diffChecksumsResponse` | DiffChecksumsResponse | \# gdata.\* are outside protos with mising documentation |
| `diffDownloadResponse` | DiffDownloadResponse | \# gdata.\* are outside protos with mising documentation |
| `diffUploadRequest` | DiffUploadRequest | \# gdata.\* are outside protos with mising documentation |
| `diffUploadResponse` | DiffUploadResponse | \# gdata.\* are outside protos with mising documentation |
| `diffVersionResponse` | DiffVersionResponse | \# gdata.\* are outside protos with mising documentation |
| `downloadParameters` | DownloadParameters | \# gdata.\* are outside protos with mising documentation |
| `filename` | string | \# gdata.\* are outside protos with mising documentation |
| `hash` | string | \# gdata.\* are outside protos with mising documentation |
| `hashVerified` | boolean | \# gdata.\* are outside protos with mising documentation |
| `inline` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `isPotentialRetry` | boolean | \# gdata.\* are outside protos with mising documentation |
| `length` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `md5Hash` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `mediaId` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `objectId` | ObjectId | \# gdata.\* are outside protos with mising documentation |
| `path` | string | \# gdata.\* are outside protos with mising documentation |
| `referenceType` | string enum | \# gdata.\* are outside protos with mising documentation |
| `sha1Hash` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `sha256Hash` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `sha512Hash` | string (byte) | \# gdata.\* are outside protos with mising documentation |
| `timestamp` | string (uint64) | \# gdata.\* are outside protos with mising documentation |
| `token` | string | \# gdata.\* are outside protos with mising documentation |

### `ObjectId`

- \# gdata.\* are outside protos with mising documentation
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bucketName` | string | \# gdata.\* are outside protos with mising documentation |
| `generation` | string (int64) | \# gdata.\* are outside protos with mising documentation |
| `objectName` | string | \# gdata.\* are outside protos with mising documentation |

### `Product`

- The product a case may be associated with.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `productLine` | string enum | The product line of the Product. |

### `SearchCaseClassificationsResponse`

- The response message for SearchCaseClassifications endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `caseClassifications` | array<CaseClassification> | The classifications retrieved. |
| `nextPageToken` | string | A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `caseClassifications.list` requests. If unspecified, there are no more results to retrieve. |

### `SearchCasesResponse`

- The response message for the SearchCases endpoint.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cases` | array<Case> | The list of cases associated with the parent after any filters have been applied. |
| `nextPageToken` | string | A token to retrieve the next page of results. Set this in the `page_token` field of subsequent `cases.search` requests. If unspecified, there are no more results to retrieve. |

### `ShowFeedResponse`

- The response message for the ShowFeed endpoint.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `feedItems` | array<FeedItem> | The list of feed items associated with the given Case. |
| `nextPageToken` | string | A token to retrieve the next page of results. This should be set in the `page_token` field of subsequent `ShowFeedRequests`. If unspecified, there are no more results to retrieve. |

### `SupportEventSubscription`

- A support event subscription. You can also manage support event subscriptions using other tools: \* \[`gcloud support support-event-subscriptions`\](/sdk/gcloud/reference/support/support-event-subscriptions) (or \[`gcloud beta`\](/sdk/gcloud/reference/beta/support/support-event-subscriptions) for beta) \* \[Terraform `google_cloud_support_support_event_subscription`\](https://registry.terraform.io/providers/hashicorp/google/latest/docs/resources/cloud_support_support_event_subscription) (or google-beta provider (https://registry.terraform.io/providers/hashicorp/google-beta/latest/docs/resources/cloud_support_support_event_subscription) for beta)
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the subscription was created. |
| `deleteTime` | string (google-datetime) | Output only. The time at which the subscription was deleted. |
| `failureReason` | string enum | Output only. Reason why subscription is failing. State of subscription must be FAILING in order for this to have a value. |
| `name` | string | Identifier. The resource name of the support event subscription. |
| `pubSubTopic` | string | Required. The name of the Pub/Sub topic to publish notifications to. Format: projects/{project}/topics/{topic} |
| `purgeTime` | string (google-datetime) | Output only. The time at which the subscription will be purged. |
| `state` | string enum | Output only. The state of the subscription. |
| `updateTime` | string (google-datetime) | Output only. The time at which the subscription was last updated. |

### `TextContent`

- Stores text attached to a support object.
- Version: v2beta

| Field | Type | Description |
|---|---|---|
| `plainText` | string | Content in this field should be rendered and interpreted as-is. |

### `UndeleteSupportEventSubscriptionRequest`

- Request message for UndeleteSupportEventSubscription.
- Version: v2

### Shape of `Actor`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "displayName": "string",
  "email": "string",
  "googleSupport": "boolean",
  "username": "string"
}
```

## Notes

- Generated from the Discovery document(s) v2, v2beta of `cloudsupport` (retrieved 2026-11-14); a type shared by several versions shows the preferred version, and each type's `Version` line names the document it was taken from.
- Source: https://cloudsupport.googleapis.com/$discovery/rest?version=v2, https://cloudsupport.googleapis.com/$discovery/rest?version=v2beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
