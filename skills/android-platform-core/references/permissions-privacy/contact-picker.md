# Contact Picker

System-provided, privacy-preserving contact chooser for Android 17 (API 37) and higher. The app requests specific data fields (phone, email, address) and the user shares only selected contacts, instead of the app holding `READ_CONTACTS`.

## Signature / Usage

```kotlin
// Define the specific contact data fields you need
val requestedFields = arrayListOf(
    Email.CONTENT_ITEM_TYPE,
    Phone.CONTENT_ITEM_TYPE,
)

// Set up the intent for the Contact Picker
val pickContactIntent = Intent(ACTION_PICK_CONTACTS).apply {
    putExtra(EXTRA_USE_SYSTEM_CONTACTS_PICKER, true)
    putStringArrayListExtra(
        EXTRA_PICK_CONTACTS_REQUESTED_DATA_FIELDS,
        requestedFields
    )
}

// Launch the picker
pickContact.launch(pickContactIntent)
```

```kotlin
// Set up the intent for the Contact Picker (multi-select)
val pickContactIntent = Intent(ACTION_PICK_CONTACTS).apply {
    putExtra(EXTRA_USE_SYSTEM_CONTACTS_PICKER, true)
    // Enable multi-select
    putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
    // Set limit of selectable contacts
    putExtra(EXTRA_PICK_CONTACTS_SELECTION_LIMIT, 5)
    // Define the specific contact data fields you need
    putStringArrayListExtra(
        EXTRA_PICK_CONTACTS_REQUESTED_DATA_FIELDS,
        requestedFields
    )
    // Enable this option to only filter contacts that have all the requested data fields
    putExtra(EXTRA_PICK_CONTACTS_MATCH_ALL_DATA_FIELDS, false)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ContactsPickerSessionContract.ACTION_PICK_CONTACTS` | intent action | — | Launches the picker; returns `RESULT_OK` and a Session URI with temporary read access to the selected data. |
| `ContactsPickerSessionContract.EXTRA_PICK_CONTACTS_REQUESTED_DATA_FIELDS` | `ArrayList<String>` extra | — | MIME types from `ContactsContract.CommonDataKinds` (for example `Phone.CONTENT_ITEM_TYPE`, `Email.CONTENT_ITEM_TYPE`, `StructuredPostal.CONTENT_ITEM_TYPE`). |
| `Intent.EXTRA_ALLOW_MULTIPLE` | boolean extra | — | Enables multi-selection. |
| `EXTRA_PICK_CONTACTS_SELECTION_LIMIT` | int extra | — | Optional cap on the number of selectable items. |
| `EXTRA_PICK_CONTACTS_MATCH_ALL_DATA_FIELDS` | boolean extra | — | When enabled, only contacts that have all requested data fields are shown. |
| `EXTRA_USE_SYSTEM_CONTACTS_PICKER` | boolean extra | — | Opts an `ACTION_PICK` intent into the new picker on Android 17+ even when the app targets a lower SDK (testing). |

## Notes

- Source: https://developer.android.com/about/versions/17/features/contact-picker (fetched 2026-11-14).
- Launch with `registerForActivityResult` and `StartActivityForResult`; query the returned Session URI with `ContentResolver` on a background thread. The cursor follows the `ContactsContract.Data` schema.
- Session URIs do not support custom `selection` / `selectionArgs`; setting them raises an exception. The URI grants only temporary read access, so persist needed data immediately.
- For apps targeting API 37+, the system upgrades an existing `Intent.ACTION_PICK` to the new picker automatically; the new features (single Uri result, profile switching, multiple data fields) need `ACTION_PICK_CONTACTS`.
- Account-specific metadata is stripped from results to prevent fingerprinting. Group rows by `ContactsContract.Contacts.LOOKUP_KEY`.
- Only `ACTION_PICK_CONTACTS` and `EXTRA_PICK_CONTACTS_REQUESTED_DATA_FIELDS` are written with the `ContactsPickerSessionContract.` prefix in the official text; the other extras appear unqualified in the official snippets.

## Related

- [evaluating-permission-need](./evaluating-permission-need.md)
- [requesting-runtime-permissions](./requesting-runtime-permissions.md)
