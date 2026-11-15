---
source: https://cloudidentity.googleapis.com/$discovery/rest?version=v1
---

# Cloud Identity API message schemas (cloudidentity)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudidentity/`.

### `AddIdpCredentialOperationMetadata`

- LRO response metadata for InboundSamlSsoProfilesService.AddIdpCredential.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string | State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled Multi-party approval for sensitive actions (https://support.google.com/a/answer/13790448). |

### `AddIdpCredentialRequest`

- The request for creating an IdpCredential with its associated payload. An InboundSamlSsoProfile can own up to 2 credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pemData` | string | PEM encoded x509 certificate containing the public key for verifying IdP signatures. |

### `AllowlistedDomain`

- This resource object defines a domain that has been designated as allowlisted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | Required. Immutable. Name of the domain that is in the allowlist. e.g. "google.com" |
| `name` | string | Output only. Identifier. Resource name of the domain in the allowlist e.g. "allowlistedDomains/0184mhaj1smlusv" |

### `AndroidAttributes`

- Resource representing the Android specific attributes of a Device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `ctsProfileMatch` | boolean | Whether the device passes Android CTS compliance. |
| `enabledUnknownSources` | boolean | Whether applications from unknown sources can be installed on device. |
| `hasPotentiallyHarmfulApps` | boolean | Whether any potentially harmful apps were detected on the device. |
| `ownerProfileAccount` | boolean | Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles. |
| `ownershipPrivilege` | string enum | Ownership privileges on device. |
| `supportsWorkProfile` | boolean | Whether the device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy. |
| `verifiedBoot` | boolean | Whether Android verified boot status is GREEN. |
| `verifyAppsEnabled` | boolean | Whether Google Play Protect Verify Apps is enabled. |

### `AntivirusInfo`

- Resource representing the anti-virus information of a Device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. The display name of the anti-virus software. |
| `productGuid` | string | Output only. The GUID of the anti-virus product. |
| `productState` | string enum | Output only. The state of the anti-virus. |

### `ApproveDeviceUserRequest`

- Request message for approving the device to access user data.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |

### `ApproveDeviceUserResponse`

- Response message for approving the device to access user data.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | DeviceUser | Resultant DeviceUser object for the action. |

### `BlockDeviceUserRequest`

- Request message for blocking account on device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |

### `BlockDeviceUserResponse`

- Response message for blocking the device from accessing user data.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | DeviceUser | Resultant DeviceUser object for the action. |

### `BrowserAttributes`

- Contains information about browser profiles reported by the clients on the device (e.g. Endpoint Verification extension (https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1)).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `chromeBrowserInfo` | BrowserInfo | Represents the current state of the Chrome browser attributes (https://cloud.google.com/access-context-manager/docs/browser-attributes) sent by the clients on the device, such as Endpoint Verification extension (https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1). |
| `chromeProfileId` | string | Chrome profile ID that is exposed by the Chrome API. It is unique for each device. |
| `lastProfileSyncTime` | string (google-datetime) | Timestamp in milliseconds since the Unix epoch when the profile/gcm id was last synced. |

### `BrowserInfo`

- Browser-specific fields reported by clients on the device, such as Endpoint Verification extension (https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `browserManagementState` | string enum | Output only. Browser's management state. |
| `browserVersion` | string | Version of the request initiating browser. E.g. `91.0.4442.4`. |
| `isBuiltInDnsClientEnabled` | boolean | Current state of built-in DNS client (https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled). |
| `isBulkDataEntryAnalysisEnabled` | boolean | Current state of bulk data analysis (https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isChromeCleanupEnabled` | boolean | Deprecated: This field is not used for Chrome version 118 and later. Current state of Chrome Cleanup (https://chromeenterprise.google/policies/#ChromeCleanupEnabled). |
| `isChromeRemoteDesktopAppBlocked` | boolean | Current state of Chrome Remote Desktop app (https://chromeenterprise.google/policies/#URLBlocklist). |
| `isFileDownloadAnalysisEnabled` | boolean | Current state of file download analysis (https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isFileUploadAnalysisEnabled` | boolean | Current state of file upload analysis (https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isRealtimeUrlCheckEnabled` | boolean | Current state of real-time URL check (https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty. |
| `isSecurityEventAnalysisEnabled` | boolean | Current state of security event analysis (https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isSiteIsolationEnabled` | boolean | Current state of site isolation (https://chromeenterprise.google/policies/?policy=IsolateOrigins). |
| `isThirdPartyBlockingEnabled` | boolean | Current state of third-party blocking (https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled). |
| `passwordProtectionWarningTrigger` | string enum | Current state of password protection trigger (https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger). |
| `policies` | array<ChromePolicy> | Output only. Chrome policies information for the browser as can be seen in chrome://policy. Full possibilities of policies can be consulted in Chrome Enterprise Policy List (https://chromeenterprise.google/policies/). |
| `safeBrowsingProtectionLevel` | string enum | Current state of Safe Browsing protection level (https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel). |

### `CancelUserInvitationRequest`

- Request to cancel sent invitation for target email in UserInvitation.
- Version: v1

### `CancelWipeDeviceRequest`

- Request message for cancelling an unfinished device wipe.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |

### `CancelWipeDeviceResponse`

- Response message for cancelling an unfinished device wipe.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `device` | Device | Resultant Device object for the action. Note that asset tags will not be returned in the device object. |

### `CancelWipeDeviceUserRequest`

- Request message for cancelling an unfinished user account wipe.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |

### `CancelWipeDeviceUserResponse`

- Response message for cancelling an unfinished user account wipe.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | DeviceUser | Resultant DeviceUser object for the action. |

### `CertificateAttributes`

- Stores information about a certificate.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `certificateTemplate` | CertificateTemplate | The X.509 extension for CertificateTemplate. |
| `fingerprint` | string | The encoded certificate fingerprint. |
| `issuer` | string | The name of the issuer of this certificate. |
| `serialNumber` | string | Serial number of the certificate, Example: "123456789". |
| `subject` | string | The subject name of this certificate. |
| `thumbprint` | string | The certificate thumbprint. |
| `validationState` | string enum | Validation state of this certificate. |
| `validityExpirationTime` | string (google-datetime) | Certificate not valid at or after this timestamp. |
| `validityStartTime` | string (google-datetime) | Certificate not valid before this timestamp. |

### `CertificateTemplate`

- CertificateTemplate (v3 Extension in X.509).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `id` | string | The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047". |
| `majorVersion` | integer (int32) | The Major version of the template. Example: 100. |
| `minorVersion` | integer (int32) | The minor version of the template. Example: 12. |

### `CheckTransitiveMembershipResponse`

- The response message for MembershipsService.CheckTransitiveMembership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hasMembership` | boolean | Response does not include the possible roles of a member since the behavior of this rpc is not all-or-nothing unlike the other rpcs. So, it may not be possible to list all the roles definitively, due to possible lack of authorization in some of the paths. |

### `ChromePolicy`

- Represents a Chrome policy and its current state.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `conflicts` | array<PolicyConflict> | Output only. A list of other policy values for the same policy name that were not applied due to lower precedence. This field is empty if there were no conflicts. |
| `name` | string | Output only. The unique name of the Chrome policy. These names correspond to the policy names listed in Chrome Enterprise Policy List (https://chromeenterprise.google/policies/) |
| `scope` | string enum | Output only. The scope at which the \*applied\* policy value is set (USER or MACHINE). |
| `source` | string enum | Output only. The source from which the \*applied\* policy value originated. |
| `value` | string | Output only. The currently applied value of the policy. The format depends on the policy type (e.g., boolean, string, JSON array/object). |

### `ClientState`

- Represents the state associated with an API client calling the Devices API. Resource representing ClientState and supports updates from API users
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `assetTags` | array<string> | The caller can specify asset tags for this resource |
| `complianceState` | string enum | The compliance state of the resource as specified by the API client. |
| `createTime` | string (google-datetime) | Output only. The time the client state data was created. |
| `customId` | string | This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field. |
| `etag` | string | The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest |
| `healthScore` | string enum | The Health score of the resource |
| `keyValuePairs` | object | The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map. |
| `lastUpdateTime` | string (google-datetime) | Output only. The time the client state data was last updated. |
| `managed` | string enum | The management state of the resource as specified by the API client. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device_id}/deviceUsers/{device_user_id}/clientState/{partner_id}`, where partner_id corresponds to the partner storing the data. |
| `ownerType` | string enum | Output only. The owner of the ClientState |
| `scoreReason` | string | A descriptive cause of the health score. |

### `CreateDeviceRequest`

- Request message for creating a Company Owned device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |
| `device` | Device | Required. The device to be created. The name field within this device is ignored in the create method. A new name is created by the method, and returned within the response. Only the fields `device_type`, `serial_number` and `asset_tag` (if present) are used to create the device. All other fields are ignored. The `device_type` and `serial_number` fields are required. |

### `CreateGroupMetadata`

- Metadata for CreateGroup LRO.
- Version: v1

### `CreateInboundOidcSsoProfileOperationMetadata`

- LRO response metadata for InboundOidcSsoProfilesService.CreateInboundOidcSsoProfile.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string | State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled Multi-party approval for sensitive actions (https://support.google.com/a/answer/13790448). |

### `CreateInboundSamlSsoProfileOperationMetadata`

- LRO response metadata for InboundSamlSsoProfilesService.CreateInboundSamlSsoProfile.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string | State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled Multi-party approval for sensitive actions (https://support.google.com/a/answer/13790448). |

### `CreateInboundSsoAssignmentOperationMetadata`

- LRO response metadata for InboundSsoAssignmentsService.CreateInboundSsoAssignment.
- Version: v1

### `CreateMembershipMetadata`

- Metadata for CreateMembership LRO.
- Version: v1

### `CustomAttributeValue`

- Additional custom attribute values may be one of these types
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Represents a boolean value. |
| `numberValue` | number (double) | Represents a double value. |
| `stringValue` | string | Represents a string value. |

### `DeleteGroupMetadata`

- Metadata for DeleteGroup LRO.
- Version: v1

### `DeleteIdpCredentialOperationMetadata`

- LRO response metadata for InboundSamlSsoProfilesService.DeleteIdpCredential.
- Version: v1

### `DeleteInboundOidcSsoProfileOperationMetadata`

- LRO response metadata for InboundOidcSsoProfilesService.DeleteInboundOidcSsoProfile.
- Version: v1

### `DeleteInboundSamlSsoProfileOperationMetadata`

- LRO response metadata for InboundSamlSsoProfilesService.DeleteInboundSamlSsoProfile.
- Version: v1

### `DeleteInboundSsoAssignmentOperationMetadata`

- LRO response metadata for InboundSsoAssignmentsService.DeleteInboundSsoAssignment.
- Version: v1

### `DeleteMembershipMetadata`

- Metadata for DeleteMembership LRO.
- Version: v1

### `Device`

- A Device within the Cloud Identity Devices API. Represents a Device known to Google Cloud, independent of the device ownership, type, and whether it is assigned or in use by a user. Important: Device API scopes require that you use domain-wide delegation to access the API. For more information, see Set up the Devices API (https://cloud.google.com/identity/docs/how-to/setup-devices).
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `androidSpecificAttributes` | AndroidAttributes | Output only. Attributes specific to Android devices. |
| `antivirusInfo` | array<AntivirusInfo> | Output only. Anti-virus information for the device. |
| `assetTag` | string | Asset tag of the device. |
| `basebandVersion` | string | Output only. Baseband version of the device. |
| `bootloaderVersion` | string | Output only. Device bootloader version. Example: 0.6.7. |
| `brand` | string | Output only. Device brand. Example: Samsung. |
| `browserProfiles` | array<BrowserAttributes> | Browser profiles on the device. This is a copy of the BrowserAttributes message defined in EndpointVerificationSpecificAttributes. We are replicating it here since EndpointVerification isn't the only client reporting browser profiles. |
| `buildNumber` | string | Output only. Build number of the device. |
| `clientTypes` | array<string> | List of the clients the device is reporting to. |
| `compromisedState` | string enum | Output only. Represents whether the Device is compromised. |
| `createTime` | string (google-datetime) | Output only. When the Company-Owned device was imported. This field is empty for BYOD devices. |
| `deviceId` | string | Unique identifier for the device. |
| `deviceType` | string enum | Output only. Type of device. |
| `enabledDeveloperOptions` | boolean | Output only. Whether developer options is enabled on device. |
| `enabledUsbDebugging` | boolean | Output only. Whether USB debugging is enabled on device. |
| `encryptionState` | string enum | Output only. Device encryption state. |
| `endpointVerificationSpecificAttributes` | EndpointVerificationSpecificAttributes | Output only. Attributes specific to Endpoint Verification (https://cloud.google.com/endpoint-verification/docs/overview) devices. |
| `hostname` | string | Host name of the device. |
| `imei` | string | Output only. IMEI number of device if GSM device; empty otherwise. |
| `kernelVersion` | string | Output only. Kernel version of the device. |
| `lastSyncTime` | string (google-datetime) | Most recent time when device synced with this service. |
| `managementState` | string enum | Output only. Management state of the device |
| `manufacturer` | string | Output only. Device manufacturer. Example: Motorola. |
| `meid` | string | Output only. MEID number of device if CDMA device; empty otherwise. |
| `model` | string | Output only. Model name of device. Example: Pixel 3. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device_id}`, where device_id is the unique id assigned to the Device. |
| `networkOperator` | string | Output only. Mobile or network operator of device, if available. |
| `osFirewallStatus` | string enum | Output only. OS firewall status of the device. |
| `osVersion` | string | Output only. OS version of the device. Example: Android 8.1.0. |
| `otherAccounts` | array<string> | Output only. Domain name for Google accounts on device. Type for other accounts on device. On Android, will only be populated if \|ownership_privilege\| is \|PROFILE_OWNER\| or \|DEVICE_OWNER\|. Does not include the account signed in to the device policy app if that account's domain has only one account. Examples: "com.example", "xyz.com". |
| `ownerType` | string enum | Output only. Whether the device is owned by the company or an individual |
| `releaseVersion` | string | Output only. OS release version. Example: 6.0. |
| `securityPatchTime` | string (google-datetime) | Output only. OS security patch update time on device. |
| `serialNumber` | string | Serial Number of device. Example: HT82V1A01076. |
| `unifiedDeviceId` | string | Output only. Unified device id of the device. |
| `wifiMacAddresses` | array<string> | WiFi MAC addresses of device. |
| `windowsSpecificDeviceAttributes` | WindowsSpecificDeviceAttributes | Output only. Attributes specific to Windows devices. |

### `DeviceUser`

- Represents a user's use of a Device in the Cloud Identity Devices API. A DeviceUser is a resource representing a user's use of a Device
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `compromisedState` | string enum | Compromised State of the DeviceUser object |
| `createTime` | string (google-datetime) | When the user first signed in to the device |
| `firstSyncTime` | string (google-datetime) | Output only. Most recent time when user registered with this service. |
| `languageCode` | string | Output only. Default locale used on device, in IETF BCP-47 format. |
| `lastSyncTime` | string (google-datetime) | Output only. Last time when user synced with policies. |
| `managementState` | string enum | Output only. Management state of the user on the device. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the DeviceUser in format: `devices/{device_id}/deviceUsers/{device_user_id}`, where `device_user_id` uniquely identifies a user's use of a device. |
| `passwordState` | string enum | Password state of the DeviceUser object |
| `userAgent` | string | Output only. User agent on the device for this specific user |
| `userEmail` | string | Email address of the user registered on the device. |

### `DsaPublicKeyInfo`

- Information of a DSA public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keySize` | integer (int32) | Key size in bits (size of parameter P). |

### `DynamicGroupMetadata`

- Dynamic group metadata like queries and status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `queries` | array<DynamicGroupQuery> | Memberships will be the union of all queries. Only one entry with USER resource is currently supported. Customers can create up to 500 dynamic groups. |
| `status` | DynamicGroupStatus | Output only. Status of the dynamic group. |

### `DynamicGroupQuery`

- Defines a query on a resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `query` | string | Query that determines the memberships of the dynamic group. Examples: All users with at least one `organizations.department` of engineering. `user.organizations.exists(org, org.department=='engineering')` All users with at least one location that has `area` of `foo` and `building_id` of `bar`. `user.locations.exists(loc, loc.area=='foo' && loc.building_id=='bar')` All users with any variation of the name John Doe (case-insensitive queries add `equalsIgnoreCase()` to the value being queried). `user.name.value.equalsIgnoreCase('jOhn DoE')` |
| `resourceType` | string enum | Resource type for the Dynamic Group Query |

### `DynamicGroupStatus`

- The current status of a dynamic group along with timestamp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `status` | string enum | Status of the dynamic group. |
| `statusTime` | string (google-datetime) | The latest time at which the dynamic group is guaranteed to be in the given status. If status is `UP_TO_DATE`, the latest time at which the dynamic group was confirmed to be up-to-date. If status is `UPDATING_MEMBERSHIPS`, the time at which dynamic group was created. |

### `EndpointVerificationSpecificAttributes`

- Resource representing the Endpoint Verification-specific attributes (https://cloud.google.com/endpoint-verification/docs/device-information) of a device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalSignals` | object | Additional signals (https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: \* Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. \* Configurable attributes (https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist. |
| `browserAttributes` | array<BrowserAttributes> | Details of browser profiles reported by Endpoint Verification. |
| `certificateAttributes` | array<CertificateAttributes> | Details of certificates. |

### `EntityKey`

- A unique identifier for an entity in the Cloud Identity Groups API. An entity can represent either a group with an optional `namespace` or a user without a `namespace`. The combination of `id` and `namespace` must be unique; however, the same `id` can be used with different `namespace`s.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The ID of the entity. For Google-managed entities, the `id` should be the email address of an existing group or user. Email addresses need to adhere to name guidelines for users and groups (https://support.google.com/a/answer/9193374). For external-identity-mapped entities, the `id` must be a string conforming to the Identity Source's requirements. Must be unique within a `namespace`. |
| `namespace` | string | The namespace in which the entity exists. If not specified, the `EntityKey` represents a Google-managed entity such as a Google user or a Google Group. If specified, the `EntityKey` represents an external-identity-mapped group. The namespace must correspond to an identity source created in Admin Console and must be in the form of `identitysources/{identity_source}`. |

### `ExpiryDetail`

- The `MembershipRole` expiry details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The time at which the `MembershipRole` will expire. |

### `ExternalId`

- Represents an external identifier that links a Group in the Cloud Identity Groups API with a corresponding entity in an external directory or identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Required. The unique identifier assigned by the external identity provider. The API does not enforce unique IDs across entities, but clients \*\*must\*\* ensure IDs are unique within their namespace. |
| `namespace` | string | Required. The namespace in which the entity exists. The only supported namespace is `system/external`. |

### `GetMembershipGraphMetadata`

- Metadata of GetMembershipGraphResponse LRO. This is currently empty to permit future extensibility.
- Version: v1

### `GetMembershipGraphResponse`

- The response message for MembershipsService.GetMembershipGraph.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adjacencyList` | array<MembershipAdjacencyList> | The membership graph's path information represented as an adjacency list. |
| `groups` | array<Group> | The resources representing each group in the adjacency list. Each group in this list can be correlated to a 'group' of the MembershipAdjacencyList using the 'name' of the Group resource. |

### `GoogleAppsCloudidentityDevicesV1AndroidAttributes`

- Resource representing the Android specific attributes of a Device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ctsProfileMatch` | boolean | Whether the device passes Android CTS compliance. |
| `enabledUnknownSources` | boolean | Whether applications from unknown sources can be installed on device. |
| `hasPotentiallyHarmfulApps` | boolean | Whether any potentially harmful apps were detected on the device. |
| `ownerProfileAccount` | boolean | Whether this account is on an owner/primary profile. For phones, only true for owner profiles. Android 4+ devices can have secondary or restricted user profiles. |
| `ownershipPrivilege` | string enum | Ownership privileges on device. |
| `supportsWorkProfile` | boolean | Whether device supports Android work profiles. If false, this service will not block access to corp data even if an administrator turns on the "Enforce Work Profile" policy. |
| `verifiedBoot` | boolean | Whether Android verified boot status is GREEN. |
| `verifyAppsEnabled` | boolean | Whether Google Play Protect Verify Apps is enabled. |

### `GoogleAppsCloudidentityDevicesV1ApproveDeviceUserMetadata`

- Metadata for ApproveDeviceUser LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1ApproveDeviceUserRequest`

- Request message for approving the device to access user data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. |

### `GoogleAppsCloudidentityDevicesV1ApproveDeviceUserResponse`

- Response message for approving the device to access user data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | GoogleAppsCloudidentityDevicesV1DeviceUser | Resultant DeviceUser object for the action. |

### `GoogleAppsCloudidentityDevicesV1BlockDeviceUserMetadata`

- Metadata for BlockDeviceUser LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1BlockDeviceUserRequest`

- Request message for blocking account on device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. |

### `GoogleAppsCloudidentityDevicesV1BlockDeviceUserResponse`

- Response message for blocking the device from accessing user data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | GoogleAppsCloudidentityDevicesV1DeviceUser | Resultant DeviceUser object for the action. |

### `GoogleAppsCloudidentityDevicesV1BrowserAttributes`

- Contains information about browser profiles reported by the Endpoint Verification extension (https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `chromeBrowserInfo` | GoogleAppsCloudidentityDevicesV1BrowserInfo | Represents the current state of the Chrome browser attributes (https://cloud.google.com/access-context-manager/docs/browser-attributes) sent by the Endpoint Verification extension (https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1). |
| `chromeProfileId` | string | Chrome profile ID that is exposed by the Chrome API. It is unique for each device. |
| `lastProfileSyncTime` | string (google-datetime) | Timestamp in milliseconds since the Unix epoch when the profile/gcm id was last synced. |

### `GoogleAppsCloudidentityDevicesV1BrowserInfo`

- Browser-specific fields reported by the Endpoint Verification extension (https://chromewebstore.google.com/detail/endpoint-verification/callobklhcbilhphinckomhgkigmfocg?pli=1).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `browserManagementState` | string enum | Output only. Browser's management state. |
| `browserVersion` | string | Version of the request initiating browser. E.g. `91.0.4442.4`. |
| `isBuiltInDnsClientEnabled` | boolean | Current state of built-in DNS client (https://chromeenterprise.google/policies/#BuiltInDnsClientEnabled). |
| `isBulkDataEntryAnalysisEnabled` | boolean | Current state of bulk data analysis (https://chromeenterprise.google/policies/#OnBulkDataEntryEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isChromeCleanupEnabled` | boolean | Deprecated: This field is not used for Chrome version 118 and later. Current state of Chrome Cleanup (https://chromeenterprise.google/policies/#ChromeCleanupEnabled). |
| `isChromeRemoteDesktopAppBlocked` | boolean | Current state of Chrome Remote Desktop app (https://chromeenterprise.google/policies/#URLBlocklist). |
| `isFileDownloadAnalysisEnabled` | boolean | Current state of file download analysis (https://chromeenterprise.google/policies/#OnFileDownloadedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isFileUploadAnalysisEnabled` | boolean | Current state of file upload analysis (https://chromeenterprise.google/policies/#OnFileAttachedEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isRealtimeUrlCheckEnabled` | boolean | Current state of real-time URL check (https://chromeenterprise.google/policies/#EnterpriseRealTimeUrlCheckMode). Set to true if provider list from Chrome is non-empty. |
| `isSecurityEventAnalysisEnabled` | boolean | Current state of security event analysis (https://chromeenterprise.google/policies/#OnSecurityEventEnterpriseConnector). Set to true if provider list from Chrome is non-empty. |
| `isSiteIsolationEnabled` | boolean | Current state of site isolation (https://chromeenterprise.google/policies/?policy=IsolateOrigins). |
| `isThirdPartyBlockingEnabled` | boolean | Current state of third-party blocking (https://chromeenterprise.google/policies/#ThirdPartyBlockingEnabled). |
| `passwordProtectionWarningTrigger` | string enum | Current state of password protection trigger (https://chromeenterprise.google/policies/#PasswordProtectionWarningTrigger). |
| `safeBrowsingProtectionLevel` | string enum | Current state of Safe Browsing protection level (https://chromeenterprise.google/policies/#SafeBrowsingProtectionLevel). |

### `GoogleAppsCloudidentityDevicesV1CancelWipeDeviceMetadata`

- Metadata for CancelWipeDevice LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1CancelWipeDeviceRequest`

- Request message for cancelling an unfinished device wipe.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. |

### `GoogleAppsCloudidentityDevicesV1CancelWipeDeviceResponse`

- Response message for cancelling an unfinished device wipe.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `device` | GoogleAppsCloudidentityDevicesV1Device | Resultant Device object for the action. Note that asset tags will not be returned in the device object. |

### `GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserMetadata`

- Metadata for CancelWipeDeviceUser LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserRequest`

- Request message for cancelling an unfinished user account wipe.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. |

### `GoogleAppsCloudidentityDevicesV1CancelWipeDeviceUserResponse`

- Response message for cancelling an unfinished user account wipe.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | GoogleAppsCloudidentityDevicesV1DeviceUser | Resultant DeviceUser object for the action. |

### `GoogleAppsCloudidentityDevicesV1CertificateAttributes`

- Stores information about a certificate.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certificateTemplate` | GoogleAppsCloudidentityDevicesV1CertificateTemplate | The X.509 extension for CertificateTemplate. |
| `fingerprint` | string | The encoded certificate fingerprint. |
| `issuer` | string | The name of the issuer of this certificate. |
| `serialNumber` | string | Serial number of the certificate, Example: "123456789". |
| `subject` | string | The subject name of this certificate. |
| `thumbprint` | string | The certificate thumbprint. |
| `validationState` | string enum | Output only. Validation state of this certificate. |
| `validityExpirationTime` | string (google-datetime) | Certificate not valid at or after this timestamp. |
| `validityStartTime` | string (google-datetime) | Certificate not valid before this timestamp. |

### `GoogleAppsCloudidentityDevicesV1CertificateTemplate`

- CertificateTemplate (v3 Extension in X.509).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | The template id of the template. Example: "1.3.6.1.4.1.311.21.8.15608621.11768144.5720724.16068415.6889630.81.2472537.7784047". |
| `majorVersion` | integer (int32) | The Major version of the template. Example: 100. |
| `minorVersion` | integer (int32) | The minor version of the template. Example: 12. |

### `GoogleAppsCloudidentityDevicesV1ClientState`

- Represents the state associated with an API client calling the Devices API. Resource representing ClientState and supports updates from API users
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assetTags` | array<string> | The caller can specify asset tags for this resource |
| `complianceState` | string enum | The compliance state of the resource as specified by the API client. |
| `createTime` | string (google-datetime) | Output only. The time the client state data was created. |
| `customId` | string | This field may be used to store a unique identifier for the API resource within which these CustomAttributes are a field. |
| `etag` | string | The token that needs to be passed back for concurrency control in updates. Token needs to be passed back in UpdateRequest |
| `healthScore` | string enum | The Health score of the resource. The Health score is the callers specification of the condition of the device from a usability point of view. For example, a third-party device management provider may specify a health score based on its compliance with organizational policies. |
| `keyValuePairs` | object | The map of key-value attributes stored by callers specific to a device. The total serialized length of this map may not exceed 10KB. No limit is placed on the number of attributes in a map. |
| `lastUpdateTime` | string (google-datetime) | Output only. The time the client state data was last updated. |
| `managed` | string enum | The management state of the resource as specified by the API client. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the ClientState in format: `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`, where partner corresponds to the partner storing the data. For partners belonging to the "BeyondCorp Alliance", this is the partner ID specified to you by Google. For all other callers, this is a string of the form: `{customer}-suffix`, where `customer` is your customer ID. The \*suffix\* is any string the caller specifies. This string will be displayed verbatim in the administration console. This suffix is used in setting up Custom Access Levels in Context-Aware Access. Your organization's customer ID can be obtained from the URL: `GET https://www.googleapis.com/admin/directory/v1/customers/my_customer` The `id` field in the response contains the customer ID starting with the letter 'C'. The customer ID to be used in this API is the string after the letter 'C' (not including 'C') |
| `ownerType` | string enum | Output only. The owner of the ClientState |
| `scoreReason` | string | A descriptive cause of the health score. |

### `GoogleAppsCloudidentityDevicesV1CreateDeviceMetadata`

- Metadata for CreateDevice LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1CustomAttributeValue`

- Additional custom attribute values may be one of these types
- Version: v1

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Represents a boolean value. |
| `numberValue` | number (double) | Represents a double value. |
| `stringValue` | string | Represents a string value. |

### `GoogleAppsCloudidentityDevicesV1DeleteDeviceMetadata`

- Metadata for DeleteDevice LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1DeleteDeviceUserMetadata`

- Metadata for DeleteDeviceUser LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1Device`

- A Device within the Cloud Identity Devices API. Represents a Device known to Google Cloud, independent of the device ownership, type, and whether it is assigned or in use by a user.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `androidSpecificAttributes` | GoogleAppsCloudidentityDevicesV1AndroidAttributes | Output only. Attributes specific to Android devices. |
| `assetTag` | string | Asset tag of the device. |
| `basebandVersion` | string | Output only. Baseband version of the device. |
| `bootloaderVersion` | string | Output only. Device bootloader version. Example: 0.6.7. |
| `brand` | string | Output only. Device brand. Example: Samsung. |
| `buildNumber` | string | Output only. Build number of the device. |
| `compromisedState` | string enum | Output only. Represents whether the Device is compromised. |
| `createTime` | string (google-datetime) | Output only. When the Company-Owned device was imported. This field is empty for BYOD devices. |
| `deviceId` | string | Unique identifier for the device. |
| `deviceType` | string enum | Output only. Type of device. |
| `enabledDeveloperOptions` | boolean | Output only. Whether developer options is enabled on device. |
| `enabledUsbDebugging` | boolean | Output only. Whether USB debugging is enabled on device. |
| `encryptionState` | string enum | Output only. Device encryption state. |
| `endpointVerificationSpecificAttributes` | GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes | Output only. Attributes specific to Endpoint Verification (https://cloud.google.com/endpoint-verification/docs/overview) devices. |
| `hostname` | string | Host name of the device. |
| `imei` | string | Output only. IMEI number of device if GSM device; empty otherwise. |
| `kernelVersion` | string | Output only. Kernel version of the device. |
| `lastSyncTime` | string (google-datetime) | Most recent time when device synced with this service. |
| `managementState` | string enum | Output only. Management state of the device |
| `manufacturer` | string | Output only. Device manufacturer. Example: Motorola. |
| `meid` | string | Output only. MEID number of device if CDMA device; empty otherwise. |
| `model` | string | Output only. Model name of device. Example: Pixel 3. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the Device in format: `devices/{device}`, where device is the unique id assigned to the Device. Important: Device API scopes require that you use domain-wide delegation to access the API. For more information, see Set up the Devices API (https://cloud.google.com/identity/docs/how-to/setup-devices). |
| `networkOperator` | string | Output only. Mobile or network operator of device, if available. |
| `osVersion` | string | Output only. OS version of the device. Example: Android 8.1.0. |
| `otherAccounts` | array<string> | Output only. Domain name for Google accounts on device. Type for other accounts on device. On Android, will only be populated if \|ownership_privilege\| is \|PROFILE_OWNER\| or \|DEVICE_OWNER\|. Does not include the account signed in to the device policy app if that account's domain has only one account. Examples: "com.example", "xyz.com". |
| `ownerType` | string enum | Output only. Whether the device is owned by the company or an individual |
| `releaseVersion` | string | Output only. OS release version. Example: 6.0. |
| `securityPatchTime` | string (google-datetime) | Output only. OS security patch update time on device. |
| `serialNumber` | string | Serial Number of device. Example: HT82V1A01076. |
| `unifiedDeviceId` | string | Output only. Unified device id of the device. |
| `wifiMacAddresses` | array<string> | WiFi MAC addresses of device. |

### `GoogleAppsCloudidentityDevicesV1DeviceUser`

- Represents a user's use of a Device in the Cloud Identity Devices API. A DeviceUser is a resource representing a user's use of a Device
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compromisedState` | string enum | Compromised State of the DeviceUser object |
| `createTime` | string (google-datetime) | When the user first signed in to the device |
| `firstSyncTime` | string (google-datetime) | Output only. Most recent time when user registered with this service. |
| `languageCode` | string | Output only. Default locale used on device, in IETF BCP-47 format. |
| `lastSyncTime` | string (google-datetime) | Output only. Last time when user synced with policies. |
| `managementState` | string enum | Output only. Management state of the user on the device. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the DeviceUser in format: `devices/{device}/deviceUsers/{device_user}`, where `device_user` uniquely identifies a user's use of a device. |
| `passwordState` | string enum | Password state of the DeviceUser object |
| `userAgent` | string | Output only. User agent on the device for this specific user |
| `userEmail` | string | Email address of the user registered on the device. |

### `GoogleAppsCloudidentityDevicesV1EndpointVerificationSpecificAttributes`

- Resource representing the Endpoint Verification-specific attributes (https://cloud.google.com/endpoint-verification/docs/device-information) of a device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalSignals` | object | Additional signals (https://cloud.google.com/endpoint-verification/docs/device-information) reported by Endpoint Verification. It includes the following attributes: \* Non-configurable attributes: hotfixes, av_installed, av_enabled, windows_domain_name, is_os_native_firewall_enabled, and is_secure_boot_enabled. \* Configurable attributes (https://cloud.google.com/endpoint-verification/docs/collect-config-attributes): file, folder, and binary attributes; registry entries; and properties in a plist. |
| `browserAttributes` | array<GoogleAppsCloudidentityDevicesV1BrowserAttributes> | Details of browser profiles reported by Endpoint Verification. |
| `certificateAttributes` | array<GoogleAppsCloudidentityDevicesV1CertificateAttributes> | Details of certificates. |

### `GoogleAppsCloudidentityDevicesV1ListClientStatesResponse`

- Response message that is returned in ListClientStates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientStates` | array<GoogleAppsCloudidentityDevicesV1ClientState> | Client states meeting the list restrictions. |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `GoogleAppsCloudidentityDevicesV1ListDeviceUsersResponse`

- Response message that is returned from the ListDeviceUsers method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceUsers` | array<GoogleAppsCloudidentityDevicesV1DeviceUser> | Devices meeting the list restrictions. |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `GoogleAppsCloudidentityDevicesV1ListDevicesResponse`

- Response message that is returned from the ListDevices method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `devices` | array<GoogleAppsCloudidentityDevicesV1Device> | Devices meeting the list restrictions. |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `GoogleAppsCloudidentityDevicesV1ListEndpointAppsMetadata`

- Metadata for ListEndpointApps LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1LookupSelfDeviceUsersResponse`

- Response containing resource names of the DeviceUsers associated with the caller's credentials.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | The customer resource name that may be passed back to other Devices API methods such as List, Get, etc. |
| `names` | array<string> | Resource names (https://cloud.google.com/apis/design/resource_names) of the DeviceUsers in the format: `devices/{device}/deviceUsers/{user_resource}`, where device is the unique ID assigned to a Device and user_resource is the unique user ID |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `GoogleAppsCloudidentityDevicesV1SignoutDeviceUserMetadata`

- Metadata for SignoutDeviceUser LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1UpdateClientStateMetadata`

- Metadata for UpdateClientState LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1UpdateDeviceMetadata`

- Metadata for UpdateDevice LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1WipeDeviceMetadata`

- Metadata for WipeDevice LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1WipeDeviceRequest`

- Request message for wiping all data on the device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. |
| `removeResetLock` | boolean | Optional. Specifies if a user is able to factory reset a device after a Device Wipe. On iOS, this is called "Activation Lock", while on Android, this is known as "Factory Reset Protection". If true, this protection will be removed from the device, so that a user can successfully factory reset. If false, the setting is untouched on the device. |

### `GoogleAppsCloudidentityDevicesV1WipeDeviceResponse`

- Response message for wiping all data on the device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `device` | GoogleAppsCloudidentityDevicesV1Device | Resultant Device object for the action. Note that asset tags will not be returned in the device object. |

### `GoogleAppsCloudidentityDevicesV1WipeDeviceUserMetadata`

- Metadata for WipeDeviceUser LRO.
- Version: v1

### `GoogleAppsCloudidentityDevicesV1WipeDeviceUserRequest`

- Request message for starting an account wipe on device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer}`, where customer is the customer to whom the device belongs. |

### `GoogleAppsCloudidentityDevicesV1WipeDeviceUserResponse`

- Response message for wiping the user's account from the device.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | GoogleAppsCloudidentityDevicesV1DeviceUser | Resultant DeviceUser object for the action. |

### `Group`

- A group within the Cloud Identity Groups API. A `Group` is a collection of entities, where each entity is either a user, another group, or a service account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalGroupKeys` | array<EntityKey> | Output only. Additional group keys associated with the Group. |
| `createTime` | string (google-datetime) | Output only. The time when the `Group` was created. |
| `description` | string | An extended description to help users determine the purpose of a `Group`. Must not be longer than 4,096 characters. |
| `displayName` | string | The display name of the `Group`. |
| `dynamicGroupMetadata` | DynamicGroupMetadata | Optional. Dynamic group metadata like queries and status. |
| `externalIds` | array<ExternalId> | Optional. External identifiers associated with the `Group`. Allows external identity providers and directory sync tools link their native unique identifiers with this group. The only supported namespace is `system/external`. |
| `groupKey` | EntityKey | Required. The `EntityKey` of the `Group`. |
| `labels` | object | Required. One or more label entries that apply to the Group. Labels contain a key with an empty value. Google Groups are the default type of group and have a label with a key of `cloudidentity.googleapis.com/groups.discussion_forum` and an empty value. Existing Google Groups can have an additional label with a key of `cloudidentity.googleapis.com/groups.security` and an empty value added to them. \*\*This is an immutable change and the security label cannot be removed once added.\*\* Dynamic groups have a label with a key of `cloudidentity.googleapis.com/groups.dynamic`. Identity-mapped groups for Cloud Search have a label with a key of `system/groups/external` and an empty value. Google Groups can be locked (https://support.google.com/a?p=locked-groups). To lock a group, add a label with a key of `cloudidentity.googleapis.com/groups.locked` and an empty value. Doing so locks the group. To unlock the group, remove this label. |
| `name` | string | Output only. The resource name (https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group}`. |
| `parent` | string | Required. Immutable. The resource name of the entity under which this `Group` resides in the Cloud Identity resource hierarchy. Must be of the form `identitysources/{identity_source}` for external identity-mapped groups (https://support.google.com/a/answer/9039510) or `customers/{customer_id}` for Google Groups. The `customer_id` must begin with "C" (for example, 'C046psxkn'). \[Find your customer ID.\] (https://support.google.com/cloudidentity/answer/10070793) |
| `updateTime` | string (google-datetime) | Output only. The time when the `Group` was last updated. |

### `Group` (v1beta1)

- A group within the Cloud Identity Groups API. A `Group` is a collection of entities, where each entity is either a user, another group, or a service account.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `additionalGroupKeys` | array<EntityKey> | Output only. Additional group keys associated with the Group. |
| `createTime` | string (google-datetime) | Output only. The time when the `Group` was created. |
| `description` | string | An extended description to help users determine the purpose of a `Group`. Must not be longer than 4,096 characters. |
| `displayName` | string | The display name of the `Group`. |
| `dynamicGroupMetadata` | DynamicGroupMetadata | Optional. Dynamic group metadata like queries and status. |
| `externalIds` | array<ExternalId> | Optional. External identifiers associated with the `Group`. Enables external identity providers and directory sync tools to link their native unique identifiers with this group. Currently, the only allowable namespace is `"system/external"`. |
| `groupKey` | EntityKey | Required. The `EntityKey` of the `Group`. |
| `labels` | object | Required. One or more label entries that apply to the Group. Labels contain a key with an empty value. Google Groups are the default type of group and have a label with a key of `cloudidentity.googleapis.com/groups.discussion_forum` and an empty value. Existing Google Groups can have an additional label with a key of `cloudidentity.googleapis.com/groups.security` and an empty value added to them. \*\*This is an immutable change and the security label cannot be removed once added.\*\* Dynamic groups have a label with a key of `cloudidentity.googleapis.com/groups.dynamic`. Identity-mapped groups for Cloud Search have a label with a key of `system/groups/external` and an empty value. Google Groups can be locked (https://support.google.com/a?p=locked-groups). To lock a group, add a label with a key of `cloudidentity.googleapis.com/groups.locked` and an empty value. Doing so locks the group. To unlock the group, remove this label. |
| `name` | string | Output only. The resource name (https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group_id}`. |
| `parent` | string | Required. Immutable. The resource name of the entity under which this `Group` resides in the Cloud Identity resource hierarchy. Must be of the form `identitysources/{identity_source}` for external identity-mapped groups (https://support.google.com/a/answer/9039510) or `customers/{customer_id}` for Google Groups. The `customer_id` must begin with "C" (for example, 'C046psxkn'). \[Find your customer ID.\] (https://support.google.com/cloudidentity/answer/10070793) |
| `posixGroups` | array<PosixGroup> | Optional. The POSIX groups associated with the `Group`. |
| `updateTime` | string (google-datetime) | Output only. The time when the `Group` was last updated. |

### `GroupRelation`

- Message representing a transitive group of a user or a group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Display name for this group. |
| `group` | string | Resource name for this group. |
| `groupKey` | EntityKey | Entity key has an id and a namespace. In case of discussion forums, the id will be an email address without a namespace. |
| `labels` | object | Labels for Group resource. |
| `relationType` | string enum | The relation between the member and the transitive group. |
| `roles` | array<TransitiveMembershipRole> | Membership roles of the member for the group. |

### `IdpCredential`

- Credential for verifying signatures produced by the Identity Provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dsaKeyInfo` | DsaPublicKeyInfo | Output only. Information of a DSA public key. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the credential. |
| `rsaKeyInfo` | RsaPublicKeyInfo | Output only. Information of a RSA public key. |
| `updateTime` | string (google-datetime) | Output only. Time when the `IdpCredential` was last updated. |

### `InboundOidcSsoProfile`

- An OIDC (https://openid.net/developers/how-connect-works/) federation between a Google enterprise customer and an OIDC identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Immutable. The customer. For example: `customers/C0123abc`. |
| `displayName` | string | Human-readable name of the OIDC SSO profile. |
| `idpConfig` | OidcIdpConfig | OIDC identity provider configuration. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the OIDC SSO profile. |
| `rpConfig` | OidcRpConfig | OIDC relying party (RP) configuration for this OIDC SSO profile. These are the RP details provided by Google that should be configured on the corresponding identity provider. |

### `InboundSamlSsoProfile`

- A SAML 2.0 (https://www.oasis-open.org/standards#samlv2.0) federation between a Google enterprise customer and a SAML identity provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Immutable. The customer. For example: `customers/C0123abc`. |
| `displayName` | string | Human-readable name of the SAML SSO profile. |
| `idpConfig` | SamlIdpConfig | SAML identity provider configuration. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the SAML SSO profile. |
| `spConfig` | SamlSpConfig | SAML service provider configuration for this SAML SSO profile. These are the service provider details provided by Google that should be configured on the corresponding identity provider. |

### `InboundSsoAssignment`

- Targets with "set" SSO assignments and their respective assignments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Immutable. The customer. For example: `customers/C0123abc`. |
| `name` | string | Output only. Resource name (https://cloud.google.com/apis/design/resource_names) of the Inbound SSO Assignment. |
| `oidcSsoInfo` | OidcSsoInfo | OpenID Connect SSO details. Must be set if and only if `sso_mode` is set to `OIDC_SSO`. |
| `rank` | integer (int32) | Must be zero (which is the default value so it can be omitted) for assignments with `target_org_unit` set and must be greater-than-or-equal-to one for assignments with `target_group` set. |
| `samlSsoInfo` | SamlSsoInfo | SAML SSO details. Must be set if and only if `sso_mode` is set to `SAML_SSO`. |
| `signInBehavior` | SignInBehavior | Assertions about users assigned to an IdP will always be accepted from that IdP. This controls whether/when Google should redirect a user to the IdP. Unset (defaults) is the recommended configuration. |
| `ssoMode` | string enum | Inbound SSO behavior. |
| `targetGroup` | string | Immutable. Must be of the form `groups/{group}`. |
| `targetOrgUnit` | string | Immutable. Must be of the form `orgUnits/{org_unit}`. |

### `IsInvitableUserResponse`

- Response for IsInvitableUser RPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isInvitableUser` | boolean | Returns true if the email address is invitable. |

### `ListAllowlistedDomainsResponse`

- Response message for AllowlistedDomainsService.ListAllowlistedDomains.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowlistedDomains` | array<AllowlistedDomain> | Contains the list of domains in the allowlist. There is no defined ordering of domains within a result. |
| `nextPageToken` | string | Contains the next page token if the result is not exhaustive. If there are no more results, this token is empty. |

### `ListClientStatesResponse`

- Response message that is returned in LRO result of ListClientStates Operation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `clientStates` | array<ClientState> | Client states meeting the list restrictions. |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `ListDeviceUsersResponse`

- Response message that is returned from the ListDeviceUsers method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `deviceUsers` | array<DeviceUser> | Devices meeting the list restrictions. |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `ListDevicesResponse`

- Response message that is returned from the ListDevices method.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `devices` | array<Device> | Devices meeting the list restrictions. |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `ListGroupsResponse`

- Response message for ListGroups operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groups` | array<Group> | Groups returned in response to list request. The results are not sorted. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results available for listing. |

### `ListIdpCredentialsResponse`

- Response of the InboundSamlSsoProfilesService.ListIdpCredentials method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `idpCredentials` | array<IdpCredential> | The IdpCredentials from the specified InboundSamlSsoProfile. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListInboundOidcSsoProfilesResponse`

- Response of the InboundOidcSsoProfilesService.ListInboundOidcSsoProfiles method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inboundOidcSsoProfiles` | array<InboundOidcSsoProfile> | List of InboundOidcSsoProfiles. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListInboundSamlSsoProfilesResponse`

- Response of the InboundSamlSsoProfilesService.ListInboundSamlSsoProfiles method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inboundSamlSsoProfiles` | array<InboundSamlSsoProfile> | List of InboundSamlSsoProfiles. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListInboundSsoAssignmentsResponse`

- Response of the InboundSsoAssignmentsService.ListInboundSsoAssignments method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inboundSsoAssignments` | array<InboundSsoAssignment> | The assignments. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListMembershipsResponse`

- The response message for MembershipsService.ListMemberships.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberships` | array<Membership> | The `Membership`s under the specified `parent`. |
| `nextPageToken` | string | A continuation token to retrieve the next page of results, or empty if there are no more results available. |

### `ListOrgMembershipsResponse`

- The response message for OrgMembershipsService.ListOrgMemberships.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. |
| `orgMemberships` | array<OrgMembership> | The non-vacuous membership in an orgUnit. |

### `ListPoliciesResponse`

- The response message for PoliciesService.ListPolicies.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The pagination token to retrieve the next page of results. If this field is empty, there are no subsequent pages. |
| `policies` | array<Policy> | The results |

### `ListUserInvitationsResponse`

- Response message for UserInvitation listing request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token for the next page. If not empty, indicates that there may be more `UserInvitation` resources that match the listing request; this value can be used in a subsequent ListUserInvitationsRequest to get continued results with the current list call. |
| `userInvitations` | array<UserInvitation> | The list of UserInvitation resources. |

### `LookupGroupNameResponse`

- The response message for GroupsService.LookupGroupName.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name (https://cloud.google.com/apis/design/resource_names) of the looked-up `Group`. |

### `LookupMembershipNameResponse`

- The response message for MembershipsService.LookupMembershipName.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The resource name (https://cloud.google.com/apis/design/resource_names) of the looked-up `Membership`. Must be of the form `groups/{group}/memberships/{membership}`. |

### `LookupSelfDeviceUsersResponse`

- Response containing resource names of the DeviceUsers associated with the caller's credentials.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | The customer Id that may be passed back to other Devices API methods such as List, Get, etc. |
| `names` | array<string> | Resource names (https://cloud.google.com/apis/design/resource_names) of the DeviceUsers in the format: `devices/{device_id}/deviceUsers/{user_resource_id}`, where device_id is the unique ID assigned to a Device and user_resource_id is the unique user ID |
| `nextPageToken` | string | Token to retrieve the next page of results. Empty if there are no more results. |

### `MemberRelation`

- Message representing a transitive membership of a group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `member` | string | Resource name for this member. |
| `preferredMemberKey` | array<EntityKey> | Entity key has an id and a namespace. In case of discussion forums, the id will be an email address without a namespace. |
| `relationType` | string enum | The relation between the group and the transitive member. |
| `roles` | array<TransitiveMembershipRole> | The membership role details (i.e name of role and expiry time). |

### `MemberRestriction`

- The definition of MemberRestriction
- Version: v1

| Field | Type | Description |
|---|---|---|
| `evaluation` | RestrictionEvaluation | The evaluated state of this restriction on a group. |
| `query` | string | Member Restriction as defined by CEL expression. Supported restrictions are: `member.customer_id` and `member.type`. Valid values for `member.type` are `1`, `2` and `3`. They correspond to USER, SERVICE_ACCOUNT, and GROUP respectively. The value for `member.customer_id` only supports `groupCustomerId()` currently which means the customer id of the group will be used for restriction. Supported operators are `&&`, `\|\|` and `==`, corresponding to AND, OR, and EQUAL. Examples: Allow only service accounts of given customer to be members. `member.type == 2 && member.customer_id == groupCustomerId()` Allow only users or groups to be members. `member.type == 1 \|\| member.type == 3` |

### `Membership`

- A membership within the Cloud Identity Groups API. A `Membership` defines a relationship between a `Group` and an entity belonging to that `Group`, referred to as a "member".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the `Membership` was created. |
| `deliverySetting` | string enum | Output only. Delivery setting associated with the membership. |
| `name` | string | Output only. The resource name (https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group}/memberships/{membership}`. |
| `preferredMemberKey` | EntityKey | Required. Immutable. The `EntityKey` of the member. |
| `roles` | array<MembershipRole> | The `MembershipRole`s that apply to the `Membership`. If unspecified, defaults to a single `MembershipRole` with `name` `MEMBER`. Must not contain duplicate `MembershipRole`s with the same `name`. |
| `type` | string enum | Output only. The type of the membership. |
| `updateTime` | string (google-datetime) | Output only. The time when the `Membership` was last updated. |

### `Membership` (v1beta1)

- A membership within the Cloud Identity Groups API. A `Membership` defines a relationship between a `Group` and an entity belonging to that `Group`, referred to as a "member".
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the `Membership` was created. |
| `deliverySetting` | string enum | Output only. Delivery setting associated with the membership. |
| `memberKey` | EntityKey | Immutable. The `EntityKey` of the member. Either `member_key` or `preferred_member_key` must be set when calling MembershipsService.CreateMembership but not both; both shall be set when returned. |
| `name` | string | Output only. The resource name (https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group_id}/memberships/{membership_id}`. |
| `preferredMemberKey` | EntityKey | Required. Immutable. The `EntityKey` of the member. Either `member_key` or `preferred_member_key` must be set when calling MembershipsService.CreateMembership but not both; both shall be set when returned. |
| `roles` | array<MembershipRole> | The `MembershipRole`s that apply to the `Membership`. If unspecified, defaults to a single `MembershipRole` with `name` `MEMBER`. Must not contain duplicate `MembershipRole`s with the same `name`. |
| `type` | string enum | Output only. The type of the membership. |
| `updateTime` | string (google-datetime) | Output only. The time when the `Membership` was last updated. |

### `MembershipAdjacencyList`

- Membership graph's path information as an adjacency list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `edges` | array<Membership> | Each edge contains information about the member that belongs to this group. Note: Fields returned here will help identify the specific Membership resource (e.g `name`, `preferred_member_key` and `role`), but may not be a comprehensive list of all fields. |
| `group` | string | Resource name of the group that the members belong to. |

### `MembershipRelation`

- Message containing membership relation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | An extended description to help users determine the purpose of a `Group`. |
| `displayName` | string | The display name of the `Group`. |
| `group` | string | The resource name (https://cloud.google.com/apis/design/resource_names) of the `Group`. Shall be of the form `groups/{group_id}`. |
| `groupKey` | EntityKey | The `EntityKey` of the `Group`. |
| `labels` | object | One or more label entries that apply to the Group. Currently supported labels contain a key with an empty value. |
| `membership` | string | The resource name (https://cloud.google.com/apis/design/resource_names) of the `Membership`. Shall be of the form `groups/{group_id}/memberships/{membership_id}`. |
| `roles` | array<MembershipRole> | The `MembershipRole`s that apply to the `Membership`. |

### `MembershipRole`

- A membership role within the Cloud Identity Groups API. A `MembershipRole` defines the privileges granted to a `Membership`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expiryDetail` | ExpiryDetail | The expiry details of the `MembershipRole`. Expiry details are only supported for `MEMBER` `MembershipRoles`. May be set if `name` is `MEMBER`. Must not be set if `name` is any other value. |
| `name` | string | The name of the `MembershipRole`. Must be one of `OWNER`, `MANAGER`, `MEMBER`. |
| `restrictionEvaluations` | RestrictionEvaluations | Evaluations of restrictions applied to parent group on this membership. |

### `MembershipRoleRestrictionEvaluation`

- The evaluated state of this restriction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. The current state of the restriction |

### `ModifyMembershipRolesRequest`

- The request message for MembershipsService.ModifyMembershipRoles.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addRoles` | array<MembershipRole> | The `MembershipRole`s to be added. Adding or removing roles in the same request as updating roles is not supported. Must not be set if `update_roles_params` is set. |
| `removeRoles` | array<string> | The `name`s of the `MembershipRole`s to be removed. Adding or removing roles in the same request as updating roles is not supported. It is not possible to remove the `MEMBER` `MembershipRole`. If you wish to delete a `Membership`, call MembershipsService.DeleteMembership instead. Must not contain `MEMBER`. Must not be set if `update_roles_params` is set. |
| `updateRolesParams` | array<UpdateMembershipRolesParams> | The `MembershipRole`s to be updated. Updating roles in the same request as adding or removing roles is not supported. Must not be set if either `add_roles` or `remove_roles` is set. |

### `ModifyMembershipRolesResponse`

- The response message for MembershipsService.ModifyMembershipRoles.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `membership` | Membership | The `Membership` resource after modifying its `MembershipRole`s. |

### `MoveOrgMembershipRequest`

- The request message for OrgMembershipsService.MoveOrgMembership.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Required. Immutable. Customer on whose membership change is made. All authorization will happen on the role assignments of this customer. Format: customers/{$customerId} where `$customerId` is the `id` from the Admin SDK `Customer` resource (https://developers.google.com/admin-sdk/directory/reference/rest/v1/customers). You may also use `customers/my_customer` to specify your own organization. |
| `destinationOrgUnit` | string | Required. Immutable. OrgUnit where the membership will be moved to. Format: orgUnits/{$orgUnitId} where `$orgUnitId` is the `orgUnitId` from the Admin SDK `OrgUnit` resource (https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits). |

### `OidcIdpConfig`

- OIDC IDP (identity provider) configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changePasswordUri` | string | The \*\*Change Password URL\*\* of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`. |
| `issuerUri` | string | Required. The Issuer identifier for the IdP. Must be a URL. The discovery URL will be derived from this as described in Section 4 of the OIDC specification (https://openid.net/specs/openid-connect-discovery-1_0.html). |

### `OidcRpConfig`

- OIDC RP (relying party) configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientId` | string | OAuth2 client ID for OIDC. |
| `clientSecret` | string | Input only. OAuth2 client secret for OIDC. |
| `redirectUris` | array<string> | Output only. The URL(s) that this client may use in authentication requests. |

### `OidcSsoInfo`

- Details that are applicable when `sso_mode` is set to `OIDC_SSO`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inboundOidcSsoProfile` | string | Required. Name of the `InboundOidcSsoProfile` to use. Must be of the form `inboundOidcSsoProfiles/{inbound_oidc_sso_profile}`. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OrgMembership`

- A membership in an OrgUnit. An `OrgMembership` defines a relationship between an `OrgUnit` and an entity belonging to that `OrgUnit`, referred to as a "member".
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `member` | string | Immutable. Org member id as full resource name. Format for shared drive resource: //drive.googleapis.com/drives/{$memberId} where `$memberId` is the `id` from Drive API (V3) `Drive` resource (https://developers.google.com/drive/api/v3/reference/drives#resource). |
| `memberUri` | string | Uri with which you can read the member. This follows https://aip.dev/122 Format for shared drive resource: https://drive.googleapis.com/drive/v3/drives/{$memberId} where `$memberId` is the `id` from Drive API (V3) `Drive` resource (https://developers.google.com/drive/api/v3/reference/drives#resource). |
| `name` | string | Required. Immutable. The resource name (https://cloud.google.com/apis/design/resource_names) of the OrgMembership. Format: orgUnits/{$orgUnitId}/memberships/{$membership} The `$orgUnitId` is the `orgUnitId` from the Admin SDK `OrgUnit` resource (https://developers.google.com/admin-sdk/directory/reference/rest/v1/orgunits). The `$membership` shall be of the form `{$entityType};{$memberId}`, where `$entityType` is the enum value of \[OrgMembership.EntityType\], and `memberId` is the `id` from Drive API (V3) `Drive` resource (https://developers.google.com/drive/api/v3/reference/drives#resource) for OrgMembership.EntityType.SHARED_DRIVE. |
| `type` | string enum | Immutable. Entity type for the org member. |

### `Policy`

- A Policy resource binds an instance of a single Setting with the scope of a PolicyQuery. The Setting instance will be applied to all entities that satisfy the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Immutable. Customer that the Policy belongs to. The value is in the format 'customers/{customerId}'. The `customerId` must begin with "C" To find your customer ID in Admin Console see https://support.google.com/a/answer/10070793. |
| `name` | string | Output only. Identifier. The resource name (https://cloud.google.com/apis/design/resource_names) of the Policy. Format: policies/{policy}. |
| `policyQuery` | PolicyQuery | Required. The PolicyQuery the Setting applies to. |
| `setting` | Setting | Required. The Setting configured by this Policy. |
| `type` | string enum | Output only. The type of the policy. |

### `PolicyConflict`

- Represents a policy value from a source that was not applied because a higher-priority source took precedence.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `scope` | string enum | Output only. The scope at which this lower-priority policy is set (USER or MACHINE). |
| `source` | string enum | Output only. The source from which this lower-priority policy value originated. |
| `value` | string | Output only. The policy value from this lower-priority source. |

### `PolicyQuery`

- PolicyQuery
- Version: v1

| Field | Type | Description |
|---|---|---|
| `group` | string | Immutable. The group that the query applies to. This field is only set if there is a single value for group that satisfies all clauses of the query. If no group applies, this will be the empty string. |
| `orgUnit` | string | Required. Immutable. Non-empty default. The OrgUnit the query applies to. This field is only set if there is a single value for org_unit that satisfies all clauses of the query. |
| `query` | string | Immutable. The CEL query that defines which entities the Policy applies to (ex. a User entity). For details about CEL see https://opensource.google.com/projects/cel. The OrgUnits the Policy applies to are represented by a clause like so: entity.org_units.exists(org_unit, org_unit.org_unit_id == orgUnitId('{orgUnitId}')) The Group the Policy applies to are represented by a clause like so: entity.groups.exists(group, group.group_id == groupId('{groupId}')) The Licenses the Policy applies to are represented by a clause like so: entity.licenses.exists(license, license in \['/product/{productId}/sku/{skuId}'\]) \*\*Note:\*\* The licenses clause is not supported in mutate endpoints. The above clauses can be present in any combination, and used in conjunction with the &&, \|\| and ! operators. The org_unit and group fields below are helper fields that contain the corresponding value(s) as the query to make the query easier to use. |
| `sortOrder` | number (double) | Output only. The decimal sort order of this PolicyQuery. The value is relative to all other policies with the same setting type for the customer. (There are no duplicates within this set). |

### `PosixGroup`

- POSIX Group definition to represent a group in a POSIX compliant system. Caution: POSIX groups are deprecated. As of September 26, 2024, you can no longer create new POSIX groups. For more information, see https://cloud.google.com/identity/docs/deprecations/posix-groups
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `gid` | string (uint64) | GID of the POSIX group. |
| `name` | string | Name of the POSIX group. |
| `systemId` | string | System identifier for which group name and gid apply to. If not specified it will default to empty value. |

### `RestrictionEvaluation`

- The evaluated state of this restriction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Output only. The current state of the restriction |

### `RestrictionEvaluations`

- Evaluations of restrictions applied to parent group on this membership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberRestrictionEvaluation` | MembershipRoleRestrictionEvaluation | Evaluation of the member restriction applied to this membership. Empty if the user lacks permission to view the restriction evaluation. |

### `RsaPublicKeyInfo`

- Information of a RSA public key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keySize` | integer (int32) | Key size in bits (size of the modulus). |

### `SamlIdpConfig`

- SAML IDP (identity provider) configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changePasswordUri` | string | The \*\*Change Password URL\*\* of the identity provider. Users will be sent to this URL when changing their passwords at `myaccount.google.com`. This takes precedence over the change password URL configured at customer-level. Must use `HTTPS`. |
| `entityId` | string | Required. The SAML \*\*Entity ID\*\* of the identity provider. |
| `logoutRedirectUri` | string | The \*\*Logout Redirect URL\*\* (sign-out page URL) of the identity provider. When a user clicks the sign-out link on a Google page, they will be redirected to this URL. This is a pure redirect with no attached SAML `LogoutRequest` i.e. SAML single logout is not supported. Must use `HTTPS`. |
| `singleSignOnServiceUri` | string | Required. The `SingleSignOnService` endpoint location (sign-in page URL) of the identity provider. This is the URL where the `AuthnRequest` will be sent. Must use `HTTPS`. Assumed to accept the `HTTP-Redirect` binding. |

### `SamlSpConfig`

- SAML SP (service provider) configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `assertionConsumerServiceUri` | string | Output only. The SAML \*\*Assertion Consumer Service (ACS) URL\*\* to be used for the IDP-initiated login. Assumed to accept response messages via the `HTTP-POST` binding. |
| `entityId` | string | Output only. The SAML \*\*Entity ID\*\* for this service provider. |

### `SamlSsoInfo`

- Details that are applicable when `sso_mode` == `SAML_SSO`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `inboundSamlSsoProfile` | string | Required. Name of the `InboundSamlSsoProfile` to use. Must be of the form `inboundSamlSsoProfiles/{inbound_saml_sso_profile}`. |

### `SearchDirectGroupsResponse`

- The response message for MembershipsService.SearchDirectGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberships` | array<MembershipRelation> | List of direct groups satisfying the query. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results available for listing. |

### `SearchGroupsResponse`

- The response message for GroupsService.SearchGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `groups` | array<Group> | The `Group` resources that match the search query. |
| `nextPageToken` | string | A continuation token to retrieve the next page of results, or empty if there are no more results available. |

### `SearchTransitiveGroupsResponse`

- The response message for MembershipsService.SearchTransitiveGroups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberships` | array<GroupRelation> | List of transitive groups satisfying the query. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results available for listing. |

### `SearchTransitiveMembershipsResponse`

- The response message for MembershipsService.SearchTransitiveMemberships.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberships` | array<MemberRelation> | List of transitive members satisfying the query. |
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results. |

### `SecuritySettings`

- The definition of security settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `memberRestriction` | MemberRestriction | The Member Restriction value |
| `name` | string | Output only. The resource name of the security settings. Shall be of the form `groups/{group_id}/securitySettings`. |

### `SendUserInvitationRequest`

- A request to send email for inviting target user corresponding to the UserInvitation.
- Version: v1

### `Setting`

- Setting
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string | Required. Immutable. The type of the Setting. |
| `value` | object | Required. The value of the Setting. |

### `SignInBehavior`

- Controls sign-in behavior.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `redirectCondition` | string enum | When to redirect sign-ins to the IdP. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TransitiveMembershipRole`

- Message representing the role of a TransitiveMembership.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `role` | string | TransitiveMembershipRole in string format. Currently supported TransitiveMembershipRoles: `"MEMBER"`, `"OWNER"`, and `"MANAGER"`. |

### `UpdateGroupMetadata`

- Metadata for UpdateGroup LRO.
- Version: v1

### `UpdateInboundOidcSsoProfileOperationMetadata`

- LRO response metadata for InboundOidcSsoProfilesService.UpdateInboundOidcSsoProfile.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string | State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled Multi-party approval for sensitive actions (https://support.google.com/a/answer/13790448). |

### `UpdateInboundSamlSsoProfileOperationMetadata`

- LRO response metadata for InboundSamlSsoProfilesService.UpdateInboundSamlSsoProfile.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string | State of this Operation Will be "awaiting-multi-party-approval" when the operation is deferred due to the target customer having enabled Multi-party approval for sensitive actions (https://support.google.com/a/answer/13790448). |

### `UpdateInboundSsoAssignmentOperationMetadata`

- LRO response metadata for InboundSsoAssignmentsService.UpdateInboundSsoAssignment.
- Version: v1

### `UpdateMembershipMetadata`

- Metadata for UpdateMembership LRO.
- Version: v1

### `UpdateMembershipRolesParams`

- The details of an update to a `MembershipRole`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldMask` | string (google-fieldmask) | The fully-qualified names of fields to update. May only contain the field `expiry_detail.expire_time`. |
| `membershipRole` | MembershipRole | The `MembershipRole`s to be updated. Only `MEMBER` `MembershipRole` can currently be updated. |

### `UserInvitation`

- The `UserInvitation` resource represents an email that can be sent to an unmanaged user account inviting them to join the customer's Google Workspace or Cloud Identity account. An unmanaged account shares an email address domain with the Google Workspace or Cloud Identity account but is not managed by it yet. If the user accepts the `UserInvitation`, the user account will become managed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mailsSentCount` | string (int64) | Number of invitation emails sent to the user. |
| `name` | string | Shall be of the form `customers/{customer}/userinvitations/{user_email_address}`. |
| `state` | string enum | State of the `UserInvitation`. |
| `updateTime` | string (google-datetime) | Time when the `UserInvitation` was last updated. |

### `WindowsSpecificDeviceAttributes`

- Represents the Windows specific attributes of a Device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `hotfixes` | array<string> | Output only. The hotfixes installed on the device. |
| `secureBootMode` | string enum | Output only. Secure boot mode of the device. |
| `windowsMachineDomain` | string | Output only. The domain of the machine that the user is logged into. This is different from the windows_user_domain as the user could be logged into a domain different from the machine domain. |
| `windowsUserDomain` | string | Output only. The domain of the user account that is logged into the machine. |

### `WipeDeviceRequest`

- Request message for wiping all data on the device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |
| `removeResetLock` | boolean | Optional. Specifies if a user is able to factory reset a device after a Device Wipe. On iOS, this is called "Activation Lock", while on Android, this is known as "Factory Reset Protection". If true, this protection will be removed from the device, so that a user can successfully factory reset. If false, the setting is untouched on the device. |

### `WipeDeviceResponse`

- Response message for wiping all data on the device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `device` | Device | Resultant Device object for the action. Note that asset tags will not be returned in the device object. |

### `WipeDeviceUserRequest`

- Request message for starting an account wipe on device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `customer` | string | Optional. Resource name (https://cloud.google.com/apis/design/resource_names) of the customer. If you're using this API for your own organization, use `customers/my_customer` If you're using this API to manage another organization, use `customers/{customer_id}`, where customer_id is the customer to whom the device belongs. |

### `WipeDeviceUserResponse`

- Response message for wiping the user's account from the device.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `deviceUser` | DeviceUser | Resultant DeviceUser object for the action. |

### Shape of `AddIdpCredentialOperationMetadata`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "state": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `cloudidentity` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the ClientState name format is written `devices/{device}/deviceUsers/{device_user}/clientState/{partner}`; the collection is `clientStates` (as in the `clientStates.get` and `clientStates.list` paths), so use `.../clientStates/{partner}`.
- Source: https://cloudidentity.googleapis.com/$discovery/rest?version=v1, https://cloudidentity.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
