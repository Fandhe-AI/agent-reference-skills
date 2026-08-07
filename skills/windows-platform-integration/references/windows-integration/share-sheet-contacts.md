# Appear in Share Sheet suggestions row

Short how-to that points an app's Share Sheet integration at the People on Windows contract, so the app's contacts appear in the suggestions row shown at the top of the Share Sheet.

## Signature / Usage

```csharp
// High-level steps, implemented via the People on Windows API
// (full walkthrough in cross-device-people-api.md):

// 1. Create a UserDataAccount dedicated to the People contract.
UserDataAccountStore udas =
    await UserDataAccountManager.RequestStoreAsync(UserDataAccountStoreAccessType.AppAccountsReadWrite);
UserDataAccount uda = await udas.CreateAccountAsync("com.microsoft.peoplecontract");
await uda.SaveAsync();

// 2. Store the app's contacts in the Windows ContactStore.
ContactStore store = await ContactManager.RequestStoreAsync(ContactStoreAccessType.AppContactsReadWrite);
ContactList contactList = await store.CreateContactListAsync(contactListsName, uda.Id);
await contactList.SaveContactAsync(contact);

// 3. Contacts surface as suggestions in the Share Sheet suggestions row.
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Suggestions row | UI element | Appears at the top of the Share Sheet, showing contacts the user is most likely to want to share with; sourced from the People on Windows feature, which aggregates contacts across apps. |
| Package identity | requirement | Required to make an app's contacts eligible for the suggestions row. |

## Notes

- Namespaces: `Windows.ApplicationModel.UserDataAccounts` and `Windows.ApplicationModel.Contacts` (WinRT), same as [cross-device-people-api](./cross-device-people-api.md). Part of the Windows Share Sheet contract, distinct from Apple's share sheet and Android's Sharesheet APIs.
- This page is a pointer/how-to entry into the full People on Windows implementation, documented in [People on Windows (cross-device People API)](./cross-device-people-api.md) — `UserDataAccount` creation, `ContactStore`/`ContactList` setup, required/optional contact fields, and `ExplictReadAccessPackageFamilyNames` access control.
- Donating contacts to People on Windows only makes them eligible as suggested share targets; it does not by itself send or receive share content (that's [share-sheet-send](./share-sheet-send.md) / [share-sheet-receive](./share-sheet-receive.md)).

## Related

- [People on Windows (cross-device People API)](./cross-device-people-api.md)
- [Share content from your app (Send)](./share-sheet-send.md)
- [DataTransferManager](./data-transfer-manager.md)
