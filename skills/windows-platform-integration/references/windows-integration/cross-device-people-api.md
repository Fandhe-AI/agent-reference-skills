# People on Windows (cross-device People API)

APIs that let a third-party app donate its own contacts into Windows so they surface in the Share Sheet suggestions row and the People Widget, without those contacts being drawn from any system-wide address book.

## Signature / Usage

```csharp
// 1. Create a UserDataAccount dedicated to the People contract.
UserDataAccountStore udas =
    await UserDataAccountManager.RequestStoreAsync(UserDataAccountStoreAccessType.AppAccountsReadWrite);
UserDataAccount uda = await udas.CreateAccountAsync("com.microsoft.peoplecontract");
uda.ExplictReadAccessPackageFamilyNames.Add("com.microsoft.windows.system");
await uda.SaveAsync();

// 2. Create a contact list under that account and store a contact.
ContactStore store = await ContactManager.RequestStoreAsync(ContactStoreAccessType.AppContactsReadWrite);
ContactList contactList = await store.CreateContactListAsync(contactListsName, uda.Id);
contactList.OtherAppReadAccess = ContactListOtherAppReadAccess.None;
await contactList.SaveAsync();

var contact = new Contact
{
    FirstName = appContact.FirstName,
    LastName = appContact.LastName,
    RemoteId = appContact.Id,
    SourceDisplayPicture = RandomAccessStreamReference.CreateFromUri(new Uri(appContact.ProfilePicPath)),
    Phones = { new ContactPhone { Number = appContact.Phone } }
};
await contactList.SaveContactAsync(contact);

// 3. Rank top contacts via a ContactAnnotationList so they appear in the
//    Share Sheet suggestions row.
ContactAnnotationStore annotationStore = await
    ContactManager.RequestAnnotationStoreAsync(ContactAnnotationStoreAccessType.AppAnnotationsReadWrite);
ContactAnnotationList annotationList = await annotationStore.CreateAnnotationListAsync(uda.Id);

var annotation = new ContactAnnotation
{
    ContactId = contact.Id,
    SupportedOperations = ContactAnnotationOperations.Share
};
annotation.ProviderProperties.Add("Rank", rank);
await annotationList.TrySaveAnnotationAsync(annotation);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UserDataAccountManager.RequestStoreAsync` | method | Requests a `UserDataAccountStore`; the account's `DisplayName` must be `"com.microsoft.peoplecontract"` to register for the People contract. |
| `UserDataAccount.ExplictReadAccessPackageFamilyNames` | property | Package family names granted restricted read access to the account's contacts; must include `"com.microsoft.windows.system"` so Windows shell experiences can read them. |
| `ContactManager.RequestStoreAsync` / `CreateContactListAsync` | method | Opens/creates a `ContactStore` and a `ContactList` scoped to the `UserDataAccount`; prompts the user for consent. |
| `ContactList.OtherAppReadAccess` | property (`ContactListOtherAppReadAccess`) | Controls whether other apps besides Windows shell experiences can read the list; `None` restricts access entirely. |
| `Contact` required fields | `FirstName`, `RemoteId`, `DisplayPicture` | Minimum fields Windows needs to render the contact in shell experiences; `LastName`, `Phones`, `Emails` are optional. |
| `ContactManager.RequestAnnotationStoreAsync` / `CreateAnnotationListAsync` | method | Opens/creates a `ContactAnnotationList` used to store per-contact rank metadata. |
| `ContactAnnotation.SupportedOperations` | property (`ContactAnnotationOperations`) | Must be set to `Share` for a contact to be eligible for the Share Sheet suggestions row. |
| `ContactAnnotation.ProviderProperties["Rank"]` | dictionary entry | App-computed rank (recommended: a blend of recency and frequency of interaction) used to order suggested contacts. |
| `ContactAnnotationList.DeleteAsync` | method | Deletes the annotation list so it can be recreated with refreshed ranks; recommended on a regular cadence (e.g. daily to monthly depending on app type). |

## Notes

- Namespaces: `Windows.ApplicationModel.UserDataAccounts` and `Windows.ApplicationModel.Contacts` (WinRT). Requires [package identity](https://learn.microsoft.com/en-us/windows/apps/desktop/modernize/package-identity-overview).
- Apps should only donate contacts the user has explicitly added or authorized — never upload an entire address book or auto-sync without consent, and let users opt out and delete their donated contacts at any time.
- Contacts the user hasn't interacted with in 30+ days should be down-ranked or removed to keep the suggestions row relevant; ranks should be recalculated regularly rather than set once.
- This is the mechanism behind the **Share Sheet suggestions row** and **People Widget** that complements the [DataTransferManager](./data-transfer-manager.md) / [DataPackage](./data-package.md) share contract — donating contacts does not by itself send or receive share content, it only makes an app's top contacts appear as quick-share targets.

## Related

- [DataTransferManager](./data-transfer-manager.md)
- [DataPackage](./data-package.md)
