# Guidelines for app settings

Best practices for creating, organizing, and displaying app settings — the user-customizable portions of a Windows app, accessed through a dedicated settings page.

## Signature / Usage

Use `SettingsCard` and `SettingsExpander` from the Windows Community Toolkit for a consistent, accessible settings layout (header, description, icon, action control):

```xaml
<!-- Individual setting -->
<SettingsCard Header="Notifications" Description="Get notified about updates">
  <ToggleSwitch />
</SettingsCard>

<!-- Setting with sub-options revealed on demand -->
<SettingsExpander Header="Advanced">
  <SettingsExpander.Items>
    <SettingsCard Header="Sync frequency">
      <ComboBox />
    </SettingsCard>
  </SettingsExpander.Items>
</SettingsExpander>
```

For a `NavigationView` layout, set `IsSettingsVisible="true"` to add a built-in **Settings** entry pinned to the bottom of the nav pane automatically.

## Options / Props

| Control | Use case |
|------|-------------|
| Toggle switch | Binary (on/off) setting |
| Radio buttons | Choosing one of up to 5 mutually exclusive related options |
| Combo box | Choosing from a set of options in a compact dropdown (e.g. app theme: Light / Dark / Use system setting) |
| Text input box | Free-text entry (use the input-box variant matching the data type, e.g. email, password) |
| Hyperlink | Navigate within the app or to an external website |
| Button | Initiate an immediate action |
| `SettingsCard.IsClickEnabled` | Makes the entire card clickable — useful for navigation-style entries |
| `SettingsCard.IsEnabled` | Disable a setting not relevant in the current context (keep it visible; pair with `Description` explaining why) |

## Notes

- Belongs in settings: configuration options that don't need frequent readjustment, preference-based options (music, color themes), and infrequently-accessed app info (privacy policy, version, copyright). Commands in the typical app workflow (e.g. brush size in an art app) do **not** belong in settings.
- Layout: open full-screen, use a scrollable single column with a constrained max width (~1000-1100px), group related settings under **BodyStrong** section headers.
- Keep the total number of settings to about four or five; apply changes immediately — never require a separate confirmation button.
- Use descriptive one-word section labels (e.g. "Accounts", not "Account settings").
- Place an **About** section (app name, icon, version, links, legal info) at the bottom using a `SettingsExpander`.
- `SettingsCard`, `SettingsExpander`, `NavigationView`, `ToggleSwitch`, `ComboBox` referenced here are Windows Community Toolkit / `Microsoft.UI.Xaml.Controls` (WinUI 3) types, distinct from `System.Windows.Controls` (WPF), the JS `@ark-ui/react` / `@chakra-ui/react` APIs, and Jetpack Compose.

## Related

- [Writing style](./writing-style.md)
- [Usability overview](./usability-overview.md)
