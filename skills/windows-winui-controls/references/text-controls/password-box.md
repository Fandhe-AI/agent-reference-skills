# PasswordBox

A text input control that conceals the characters typed into it, for entering passwords or other private data.

## Signature / Usage

```xaml
<PasswordBox x:Name="passwordBox" Width="200" Header="Password"
             PlaceholderText="Enter your password"
             MaxLength="16"
             PasswordChanged="passwordBox_PasswordChanged"/>
```

```csharp
private void passwordBox_PasswordChanged(object sender, RoutedEventArgs e)
{
    if (passwordBox.Password == "Password")
    {
        statusText.Text = "'Password' is not allowed as a password.";
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Password | string | The current password contents of the control. |
| PasswordChar | string | Masking character used to obscure the password (default is a bullet). |
| PlaceholderText | string | Text displayed inside the control until a value has been entered. |
| MaxLength | int | Maximum number of characters allowed; there's no built-in minimum-length property. |
| PasswordRevealMode | PasswordRevealMode | `Peek` (default, hold reveal button), `Hidden`, or `Visible` — controls whether/how the password can be revealed. |
| Header | object | Content for the control's header/label. |
| IsPasswordRevealButtonEnabled | bool | Deprecated; ignored. Use `PasswordRevealMode` instead. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls.PasswordBox` (WPF).
- Key event: `PasswordChanged`, fired when the `Password` value changes.
- Only `Password` and `NumericPin` input scope values are supported; other `InputScope` values are ignored.
- The password reveal button appears only when the control first receives focus and a character is entered; it does not reappear after losing/regaining focus unless the password is cleared.
- Consider two `PasswordBox` controls (new + confirm) for account creation, but only a single one for logins.

## Related

- [TextBox](./text-box.md)
- [AutoSuggestBox](./auto-suggest-box.md)
