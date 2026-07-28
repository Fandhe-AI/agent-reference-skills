# PersonPicture

Displays the avatar image for a person if one is available; otherwise displays the person's initials or a generic glyph.

## Signature / Usage

```xaml
<PersonPicture
    DisplayName="Betsy Sherman"
    ProfilePicture="Assets\BetsyShermanProfile.png"
    Initials="BS" />
```

```xaml
<PersonPicture Contact="{x:Bind CurrentContact, Mode=OneWay}" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DisplayName | string | Person's name, used to derive initials/fallback text if `Initials` isn't set. |
| ProfilePicture | ImageSource | The avatar image to display. |
| Initials | string | Manually specified initials fallback. |
| Contact | Contact | A `Windows.ApplicationModel.Contacts.Contact` object; the control auto-selects an image (`LargeDisplayPicture` > `SmallDisplayPicture` > `Thumbnail`) or falls back to name/contact data. |
| PreferSmallImage | bool | When `true`, prioritizes `SmallDisplayPicture` over `LargeDisplayPicture` from a `Contact`. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls.PersonPicture` (WinUI 3). Distinct from Android `android-platform-core` avatar/contact widgets and Apple Contacts UI.

## Related

- [Expander](./expander.md)
- [TitleBar](./title-bar.md)
