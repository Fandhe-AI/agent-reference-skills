# CKUserIdentity

The identity of a user. Provides identifiable data about an iCloud user, including their name, user record ID, and an email address or phone number.

## Signature / Usage

```swift
class CKUserIdentity

// Lookup criteria (CKUserIdentity.LookupInfo)
let byEmail  = CKUserIdentity.LookupInfo(emailAddress: String)
let byPhone  = CKUserIdentity.LookupInfo(phoneNumber: String)
let byRecord = CKUserIdentity.LookupInfo(userRecordID: CKRecord.ID)
```

You don't create `CKUserIdentity` instances. CloudKit provides them, for example as a share's owner and participants:

```swift
// share: CKShare
let ownerIdentity: CKUserIdentity = share.owner.userIdentity
for participant in share.participants {
    let identity = participant.userIdentity
    // identity.hasiCloudAccount, identity.nameComponents, identity.userRecordID
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `userRecordID` | `CKRecord.ID?` | The user record ID for the corresponding user record |
| `nameComponents` | `PersonNameComponents?` | The user's name; use with `PersonNameComponentsFormatter` to build a locale-aware display string |
| `hasiCloudAccount` | `Bool` | Whether the user has an iCloud account |
| `lookupInfo` | `CKUserIdentity.LookupInfo?` | The lookup info for retrieving the user identity |
| `contactIdentifiers` | `[String]` | Deprecated. Identifiers that match contacts in the local Contacts database |

### CKUserIdentity.LookupInfo

The criteria to use when searching for discoverable iCloud users, or when creating a share's participants (see `CKFetchShareParticipantsOperation`). Instances are created from an email address, phone number, or user record ID.

| Initializer | Description |
|-------------|-------------|
| `init(emailAddress: String)` | Creates a lookup info for the specified email address |
| `init(phoneNumber: String)` | Creates a lookup info for the specified phone number |
| `init(userRecordID: CKRecord.ID)` | Creates a lookup info for the specified user record ID |

## Notes

- Platforms: iOS 10.0+, iPadOS 10.0+, Mac Catalyst 13.1+, macOS 10.12+, tvOS 10.0+, visionOS 1.0+, watchOS 3.0+
- A user must consent to be discoverable before CloudKit can provide this data to the app. The overview points to `requestApplicationPermission(_:completionHandler:)` for this.
- A share's owner has a user identity, as does each participant. When creating participants, CloudKit tries to find iCloud accounts to populate their identities; if none is found, `hasiCloudAccount` is `false`.
- Deprecated: `contactIdentifiers` (iOS 18.0 / macOS 15.0 / tvOS 18.0 / Mac Catalyst 18.0 / watchOS 11.0 / visionOS 2.0).
- Deprecated: `CKDiscoverAllUserIdentitiesOperation` (uses the device's contacts to find discoverable iCloud users) and `CKDiscoverUserIdentitiesOperation` (uses provided criteria) are deprecated from iOS 17.0 / macOS 14.0. The overview still describes them as ways to discover identities.
- Deprecated: `CKContainer.requestApplicationPermission(_:completionHandler:)` is deprecated from iOS 17.0; the docs state "No longer supported. Please see Sharing CloudKit Data with Other iCloud Users."

## Related

- [CKShare](./ckshare.md)
- [CKContainer](./ckcontainer.md)
- [CKRecord](./ckrecord.md)
