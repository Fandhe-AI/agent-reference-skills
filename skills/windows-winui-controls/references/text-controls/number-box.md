# NumberBox

A text control used for displaying and editing numbers, supporting validation, increment stepping, and inline evaluation of basic algebraic expressions.

## Signature / Usage

```xaml
<NumberBox Header="Enter a number:"
    Value="{x:Bind Path=ViewModel.NumberBoxValue, Mode=TwoWay}"
    SmallChange="10"
    LargeChange="100"
    SpinButtonPlacementMode="Inline"
    AcceptsExpression="True" />
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Value | double | Numeric value of the control. Recommended way to programmatically set the value (propagates to `Text`). Set to `NaN` when cleared. |
| Text | string | String representation of `Value`. |
| Minimum / Maximum | double | Numerical bounds for `Value`. |
| SmallChange | double | Amount added/subtracted on scroll or up/down arrow key. |
| LargeChange | double | Amount added/subtracted on PageUp/PageDown key. |
| SpinButtonPlacementMode | NumberBoxSpinButtonPlacementMode | `Inline` (buttons beside control) or `Compact` (buttons in a flyout on focus). |
| ValidationMode | NumberBoxValidationMode | `InvalidInputOverwritten` restores the last valid value on invalid input; `Disabled` allows custom validation. |
| AcceptsExpression | bool | When `true`, evaluates basic infix expressions (`^`, `*`, `/`, `+`, `-`, with parentheses) on focus loss or Enter. |
| NumberFormatter | INumberFormatter2 | Formats `Value` (e.g. `DecimalFormatter`); also governs rounding. |
| PlaceholderText | string | Shown when `Value` is `NaN` or input is cleared. |
| Header | object | Content for the control's header/label. |

## Notes

- Package: `Microsoft.UI.Xaml.Controls` (WinUI 3). Distinct from `System.Windows.Controls` numeric-updown-style controls (WPF) and Jetpack Compose `TextField` with numeric input.
- The default `InputScope` is `Number`, intended for digits 0-9; overriding it to another type is not explicitly supported.
- Use `TextBox` for general text, `PasswordBox` for sensitive input, `AutoSuggestBox` for search, and `RichEditBox` for formatted text instead of `NumberBox`.
- Expression evaluation uses infix notation with precedence `^` > `*` `/` > `+` `-`, and parentheses can override precedence.

## Related

- [TextBox](./text-box.md)
- [AutoSuggestBox](./auto-suggest-box.md)
