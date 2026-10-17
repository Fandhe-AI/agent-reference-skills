---
source: https://docs.expo.dev/versions/v58.0.0/sdk/contacts/
---

# Contacts

`expo-contacts` provides access to the device's system contacts, allowing you to get contact information as well as add, edit, or remove contacts. On iOS, contacts have a multi-layered grouping system (containers and groups) that is also accessible through this API.

## Signature / Usage

```sh
npx expo install expo-contacts
```

```tsx
import { Contact } from 'expo-contacts';

const contact = await Contact.create({ givenName: 'John', familyName: 'Doe' });
// { givenName: "John", familyName: "Doe"}

await contact.setGivenName('Andrew');
// { givenName: "Andrew", familyName: "Doe"}

await contact.addPhone({ label: 'work', number: '+12345678912' });
// { givenName: "Andrew", familyName: "Doe", phones: [{label: "work", number: "+12345678912"}]}

const phones = await contact.getPhones();
// Changes only the defined fields, leaves the rest unchanged
await contact.patch({ phones: [...phones, { label: 'home', number: '+98765432198' }] });

// Replaces all fields with the ones defined in the object
await contact.update({ givenName: 'John', familyName: 'Doe' });
```

Retrieving contacts:

```tsx
const contactDetails = await Contact.getAllDetails([ContactField.FULL_NAME, ContactField.PHONES], {
  limit: 20,
  offset: 10,
  sortOrder: ContactsSortOrder.GivenName,
});

// Contact instance can be created from fetched details
const contacts = contactDetails.map(item => new Contact(item.id));

const contactsFromGetAll = await Contact.getAll({
  limit: 20,
  offset: 10,
  sortOrder: ContactsSortOrder.GivenName,
});
```

Infinite scroll with typed partial details:

```tsx
import { Contact, ContactField, PartialContactDetails } from 'expo-contacts';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const FIELDS = [ContactField.FULL_NAME, ContactField.PHONES] as const;

export default function InfiniteContacts() {
  const [contactDetails, setContactDetails] = useState<PartialContactDetails<typeof FIELDS>[]>([]);

  useEffect(() => {
    loadMore();
  }, []);

  const loadMore = async () => {
    const newBatch = await Contact.getAllDetails(FIELDS, {
      limit: 20,
      offset: contactDetails.length,
    });
    setContactDetails(prev => [...prev, ...newBatch]);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={contactDetails}
        keyExtractor={item => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
            <Text>{item.fullName}</Text>
            <Text>{item.phones[0]?.number ?? 'No phone number'}</Text>
          </View>
        )}
      />
    </View>
  );
}
```

Config plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-contacts",
        {
          "contactsPermission": "Allow $(PRODUCT_NAME) to access your contacts."
        }
      ]
    ]
  }
}
```

## Options / Props

Config plugin property: `contactsPermission` (iOS only; default `"Allow $(PRODUCT_NAME) to access your contacts"`) sets the `NSContactsUsageDescription` message.

`Contact` class (Android, iOS unless noted). Construct with `new Contact(id)`; `id: string` is the iOS UUID string or the Android `_ID` column of `ContactsContract.Contacts`.

Static methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Contact.create(contact: CreateContactRecord)` | Android, iOS | `Promise<Contact>` | Creates a new contact. |
| `Contact.getAll(options?: ContactQueryOptions)` | Android, iOS | `Promise<Contact[]>` | All contacts, filtered/sorted/limited by options. |
| `Contact.getAllDetails(fields: T, options?: ContactQueryOptions)` | Android, iOS | `Promise<PartialContactDetails[]>` | Optimized bulk retrieval of specific fields without creating full `Contact` instances. |
| `Contact.getCount()` | Android, iOS | `Promise<number>` | Total contact count. |
| `Contact.hasAny()` | Android, iOS | `Promise<boolean>` | Whether any contact exists. |
| `Contact.presentPicker()` | Android, iOS | `Promise<Contact \| null>` | Native contact picker; `null` if cancelled. |
| `Contact.presentCreateForm(contact?: CreateContactRecord, options?: CreateFormOptions)` | Android, iOS | `Promise<boolean>` | Native "Create Contact" form pre-filled with data; `true` if a contact was created. `options` is iOS only. |
| `Contact.presentAccessPicker()` | iOS | `Promise<Contact[]>` | System dialog to request access to specific contacts (iOS 18+). |

Instance methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getDetails(fields?: T)` | Android, iOS | `Promise<PartialContactDetails<T>>` | Requested fields (all if omitted). |
| `patch(contact: ContactPatch)` | Android, iOS | `Promise<void>` | Partial update. `undefined` fields are ignored; set `null` to clear; list fields (`emails`, `phones`, ...) are entirely replaced. |
| `update(contact: CreateContactRecord)` | Android, iOS | `Promise<void>` | Overwrites the contact with the record. |
| `delete()` | Android, iOS | `Promise<void>` | Deletes the contact. |
| `editWithForm(options?: FormOptions)` | Android, iOS | `Promise<boolean>` | Native contact editor; `true` if changes were saved. `options` is iOS only. |
| `addAddress` / `addDate` / `addEmail` / `addPhone` / `addRelation` / `addUrlAddress` | Android, iOS | `Promise<string>` | Adds an item (`NewAddress`, `NewDate`, `NewEmail`, `NewPhone`, `NewRelation`, `NewUrlAddress`); resolves to the new item ID. |
| `addExtraName(extraName)` | Android | `Promise<string>` | Adds an extra name. |
| `addImAddress(imAddress)` / `addSocialProfile(socialProfile)` | iOS | `Promise<string>` | Adds an instant messaging address / social profile. |
| `updateAddress` / `updateDate` / `updateEmail` / `updatePhone` / `updateRelation` / `updateUrlAddress` | Android, iOS | `Promise<void>` | Updates an existing item (`Existing*` type; must contain a valid ID). `updateExtraName` is Android; `updateImAddress` / `updateSocialProfile` are iOS. |
| `deleteAddress` / `deleteDate` / `deleteEmail` / `deletePhone` / `deleteRelation` / `deleteUrlAddress` | Android, iOS | `Promise<void>` | Deletes an existing item. `deleteExtraName` is Android; `deleteImAddress` / `deleteSocialProfile` are iOS. |
| `getAddresses` / `getDates` / `getEmails` / `getPhones` / `getRelations` / `getUrlAddresses` | Android, iOS | `Promise<Existing*[]>` | Lists items. `getExtraNames` is Android; `getImAddresses` / `getSocialProfiles` are iOS. |
| `getCompany` / `getDepartment` / `getFamilyName` / `getFullName` / `getGivenName` / `getJobTitle` / `getMiddleName` / `getNote` / `getPhoneticCompanyName` / `getPhoneticFamilyName` / `getPhoneticGivenName` / `getPhoneticMiddleName` / `getPrefix` / `getSuffix` / `getImage` / `getThumbnail` | Android, iOS | `Promise<string \| null>` | Single-field getters. |
| `getBirthday()` / `getNonGregorianBirthday()` / `getMaidenName()` / `getNickname()` | iOS | `Promise<ContactDate \| null>` / `Promise<NonGregorianBirthday \| null>` / `Promise<string \| null>` / `Promise<string \| null>` | iOS-only getters. |
| `getIsFavourite()` / `setIsFavourite(isFavourite)` | Android | `Promise<boolean>` | Favorite flag. |
| `setCompany` / `setDepartment` / `setFamilyName` / `setGivenName` / `setJobTitle` / `setMiddleName` / `setNote` / `setPhoneticCompanyName` / `setPhoneticFamilyName` / `setPhoneticGivenName` / `setPhoneticMiddleName` / `setPrefix` / `setSuffix` | Android, iOS | `Promise<boolean>` | Single-field setters (`string \| null` clears); resolves to whether the operation succeeded. |
| `setImage(imageUri: string \| null)` | Android, iOS | `Promise<boolean>` | Local file URI or `null` to remove. A remote URI must be downloaded to a local file first. |
| `setBirthday(birthday: ContactDate \| null)` / `setNonGregorianBirthday(nonGregorianBirthday)` / `setMaidenName` / `setNickname` | iOS | `Promise<boolean>` | iOS-only setters. To set a birthday on Android use `addDate` with the label `'birthday'`. |

`ContactAccessButton` (iOS 18.0+; wraps the SwiftUI `ContactAccessButton` for limited-access authorization). Extends `ViewProps`. Static `ContactAccessButton.isAvailable(): boolean` is `true` only on iOS 18.0 and newer.

| Prop | Type | Description |
| --- | --- | --- |
| backgroundColor (optional) | `ColorValue` | Button background; should not be transparent (legibility requirements). |
| caption (optional) | `'default' \| 'email' \| 'phone'` | Caption under the matching contact name when the query yields a single result. |
| ignoredEmails (optional) | `string[]` | Search omits contacts matching the query that also match any of these emails. |
| ignoredPhoneNumbers (optional) | `string[]` | Same for phone numbers. |
| query (optional) | `string` | String matched against contacts not yet exposed to the app (usually from a search UI). |
| textColor (optional) | `ColorValue` | Title color; keep good contrast. |
| tintColor (optional) | `ColorValue` | Tint of the button and the modal shown when there is more than one match. |

iOS `Container` (account source such as local storage, iCloud, Google, Exchange; `id: string` read only): static `Container.getAll(): Promise<Container[]>`, static `Container.getDefault(): Promise<Container \| null>`; instance `getContacts(): Promise<Contact[]>`, `getGroups(): Promise<Group[]>`, `getName(): Promise<string \| null>`, `getType(): Promise<ContainerType \| null>`.

iOS `Group` (`id: string`): static `Group.create(name: string, containerId?: string): Promise<Group>` (default container if omitted), static `Group.getAll(containerId?)`; instance `addContact(contact: Contact): Promise<void>`, `removeContact(contact)`, `getContacts(options?)`, `getName()`, `setName(name)`, `delete(): Promise<void>` (usually deletes the group definition but leaves the contacts).

Event subscriptions:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `Contacts.addContactsChangeListener(listener: () => void)` | Android, iOS | `EventSubscription` | Called when contacts are added, updated or deleted; the callback receives no arguments. |
| `Contacts.removeAllContactsChangeListeners()` | Android, iOS | `void` | Removes all listeners registered with `addContactsChangeListener`. |

```jsx
const subscription = Contacts.addContactsChangeListener(() => {
  console.log('Contacts changed - refreshing contact list');
  loadContacts();
});

subscription.remove();
```

Permission module functions (not deprecated): `Contacts.getPermissionsAsync(): Promise<ContactsPermissionResponse>` and `Contacts.requestPermissionsAsync(): Promise<ContactsPermissionResponse>` (Android, iOS), `Contacts.getPagedContactsAsync(contactQuery?: ContactQuery): Promise<ContactResponse>`.

Key types:

| Type | Definition |
| --- | --- |
| `CreateContactRecord` | Optional fields: `addresses: NewAddress[]`, `birthday: ContactDate` (iOS), `company`, `dates: NewDate[]`, `department`, `emails: NewEmail[]`, `extraNames: NewExtraName[]` (Android), `familyName`, `givenName`, `imAddresses: NewImAddress[]` (iOS), `image` (local URI; network URLs not supported), `isFavourite` (Android), `jobTitle`, `maidenName` (iOS), `middleName`, `nickname` (iOS), `nonGregorianBirthday` (iOS), `note`, `phones: NewPhone[]`, `phoneticCompanyName`, `phoneticFamilyName`, `phoneticGivenName`, `phoneticMiddleName`, `prefix`, `relations: NewRelation[]`, `socialProfiles: NewSocialProfile[]` (iOS), `suffix`, `urlAddresses: NewUrlAddress[]` |
| `ContactPatch` | The same fields, all optional, each `string \| null` / `boolean \| null` to clear; list fields accept a mix of `Existing*` and `New*` items: existing are updated, new are added, items not present are deleted. |
| `ContactDetails` | Full details of an existing contact (all fields above plus `fullName`, `thumbnail`, with `Existing*` lists). |
| `ContactFieldKey` / `ContactField` | Field names: `addresses`, `birthday`, `company`, `dates`, `department`, `emails`, `extraNames`, `familyName`, `fullName`, `givenName`, `imAddresses`, `image`, `isFavourite`, `jobTitle`, `maidenName`, `middleName`, `nickname`, `nonGregorianBirthday`, `note`, `phones`, `phoneticCompanyName`, `phoneticFamilyName`, `phoneticGivenName`, `phoneticMiddleName`, `prefix`, `relations`, `socialProfiles`, `suffix`, `thumbnail`, `urlAddresses`. The `ContactField` enum members are upper snake case (for example `ContactField.GIVEN_NAME = "givenName"`, `ContactField.FULL_NAME`, `ContactField.PHONES`, `ContactField.URL_ADDRESSES = "urlAddresses"`). |
| `ContactQueryOptions` | `limit?`, `name?` (substring filter), `offset?`, `rawContacts?` (iOS; default `false`), `sortOrder?: ContactsSortOrder` |
| `ContactDate` | `day: number` (1-31), `month: number` (1-12), `year?: number` (omit for a birthday without a year) |
| `Address` | `label: string`, optional `city`, `country`, `id`, `isoCountryCode`, `neighborhood`, `poBox`, `postalCode`, `region`, `street` |
| `ContactsPermissionResponse` | `PermissionResponse` plus `accessPrivileges?: 'all' \| 'limited' \| 'none'` (`limited` only on iOS 18+) |
| `ContactQuery` (legacy) | `containerId?` (iOS), `fields?: FieldType[]`, `groupId?` (iOS), `id?: string \| string[]`, `name?`, `pageOffset?`, `pageSize?` (`0` or omitted = all), `rawContacts?` (iOS), `sort?: ContactSort` |
| `ContactResponse` (legacy) | `{ data: ExistingContact[], hasNextPage: boolean, hasPreviousPage: boolean }` |
| `FormOptions` (iOS) | `allowsActions?`, `allowsEditing?`, `alternateName?`, `cancelButtonTitle?`, `displayedPropertyKeys?: ContactField[]`, `groupId?`, `isNew?` (deprecated: no longer has any effect), `message?`, `preventAnimation?`, `shouldShowLinkedContacts?`, `showsCancelButton?` (default `true`) |
| `CreateFormOptions` (iOS) | `cancelButtonTitle?` (default `Cancel`), `preventAnimation?`, `showsCancelButton?` (default `true`) |
| `Image` | `base64?`, `uri?` (local URI), `height?` / `width?` (iOS) |
| `NonGregorianBirthday` (iOS) | day / month / year with a `calendar: NonGregorianCalendar` |

Other item types follow the pattern `New<X>` (for creation) and `Existing<X>` (with `id: string`; on iOS a `CNLabeledValue` identifier, on Android the `_ID` of the matching `ContactsContract.CommonDataKinds` table) for `Address`, `Date`, `Email`, `ExtraName` (Android), `ImAddress` (iOS), `Phone`, `Relation`, `SocialProfile` (iOS), `UrlAddress`.

Enums:

| Enum | Values |
| --- | --- |
| `ContactsSortOrder` | `FamilyName = "familyName"`, `GivenName = "givenName"`, `None = "none"`, `UserDefault = "userDefault"` |
| `SortTypes` (legacy) | `FirstName`, `LastName`, `None`, `UserDefault` (Android) |
| `ContactTypes` | `Company = "company"`, `Person = "person"` |
| `ContainerTypes` | `CardDAV = "cardDAV"`, `Exchange = "exchange"`, `Local = "local"`, `Unassigned = "unassigned"` |
| `NonGregorianCalendar` (iOS) | `buddhist`, `chinese`, `coptic`, `ethiopicAmeteAlem`, `ethiopicAmeteMihret`, `hebrew`, `indian`, `islamic`, `islamicCivil`, `islamicTabular`, `islamicUmmAlQura`, `iso8601`, `japanese`, `persian`, `republicOfChina` |
| `PermissionStatus` | `DENIED = "denied"`, `GRANTED = "granted"`, `UNDETERMINED = "undetermined"` |

Permissions: Android `READ_CONTACTS` and `WRITE_CONTACTS` are added automatically. iOS uses `NSContactsUsageDescription`.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Included in Expo Go.
- The old promise-based module functions are deprecated and "will throw in runtime"; import them from `expo-contacts/legacy` instead. Replacement mapping from the source: `addContactAsync` -> `Contact.create()`; `addExistingContactToGroupAsync` -> `group.addContact()`; `addExistingGroupToContainerAsync` -> `container.addGroup()`; `createGroupAsync` -> `Group.create()`; `getContactByIdAsync` -> `new Contact(id).getDetails()`; `getContactsAsync` -> `Contact.getAll()`; `getContainersAsync` -> `Container.getAll()`; `getDefaultContainerIdAsync` -> `Container.getDefault()`; `getGroupsAsync` -> `Group.getAll()`; `hasContactsAsync` -> `Contact.hasAny()`; `presentAccessPickerAsync` -> `Contact.presentAccessPicker()`; `presentContactPickerAsync` -> `Contact.presentPicker()`; `presentFormAsync` -> `contact.editWithForm()` or `Contact.presentCreateForm()`; `removeContactAsync` -> `contact.delete()`; `removeContactFromGroupAsync` -> `group.removeContact()`; `removeGroupAsync` -> `group.delete()`; `updateContactAsync` -> `contact.update()` or `contact.patch()`; `updateGroupNameAsync` -> `group.setName()`. `isAvailableAsync`, `shareContactAsync` and `writeContactToFileAsync` are deprecated with "import from `expo-contacts/legacy`" only.
- iOS `note` field requires additional entitlements (`com.apple.developer.contacts.notes`). Expo Go does not contain them: request the entitlement from Apple, set `ios.accessesContactNotes` to `true` in app config, and create a development build.
- `addContactsChangeListener` platform differences: Android uses `ContentObserver`, which may delay notifications by 5-7 seconds (the system provider batches notifications) and, because it observes both `RawContacts` and `Contacts`, some changes may emit two events; consider refreshing contacts when the app returns to the foreground. iOS uses `CNContactStoreDidChangeNotification` and emits immediately.
- Existing React Native apps (no CNG): add `android.permission.READ_CONTACTS` and `android.permission.WRITE_CONTACTS` to `android/app/src/main/AndroidManifest.xml`, and `NSContactsUsageDescription` to `ios/[app]/Info.plist`.
- The source example uses addContactChangeListener (singular); the API is addContactsChangeListener.
- getPagedContactsAsync has no deprecation notice in the SDK 58 source, though its ContactQuery/ContactResponse types are listed as legacy.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-contacts

## Related

- [Calendar](./calendar.md)
- [Sharing](./sharing.md)
