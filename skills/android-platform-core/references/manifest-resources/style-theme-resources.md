# Style and theme resources (styles.xml / themes.xml)

XML `<style>` resources for View attribute collections and their use as app/activity-wide themes.

> This is the Android XML style/theme resource specification — distinct from Material3 `Theme` / `ColorScheme` in Jetpack Compose (see `android-compose-components` skill's `theming` category).

## Signature / Usage

```xml
<!-- res/values/styles.xml -->
<resources>
    <style name="CustomText" parent="@style/Text">
        <item name="android:textSize">20sp</item>
        <item name="android:textColor">#008</item>
    </style>

    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>
</resources>
```

```xml
<!-- apply a style to a single View -->
<EditText style="@style/CustomText" ... />
```

```xml
<!-- AndroidManifest.xml: apply a theme -->
<application android:theme="@style/AppTheme">
    <activity android:theme="@style/AppTheme.Light" />
</application>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `<style name>` | String, required | Unique resource ID for the style. |
| `<style parent>` | Style reference, optional | Parent style to inherit from, e.g. `@style/ParentStyle` or `@android:style/ParentStyle`. Dot-notation (`Text.Large.Bold`) implicitly inherits from `Text.Large` without an explicit `parent`. |
| `<item name>` | Attribute reference, required | The property being set; `android:propertyName` for framework attributes, `propertyName` for custom attributes. Text content is the value. |

## Notes

- A **style** targets a single `View`; a **theme** is a style applied to an entire app, activity, or view hierarchy (also affects non-view chrome like the status bar and window background), set via `android:theme` on `<application>`, `<activity>`, or (API 21+) on a layout root view.
- Extend Material/AppCompat themes (`Theme.Material3.*`, `Theme.AppCompat.*`) rather than raw platform themes for cross-version compatibility.
- Provide API-level and night-mode variants via qualified directories, e.g. `values-v21/styles.xml`, `values-night/styles.xml`, following the same qualifier system as other resources.
- Attribute reference notation: `?attr/name` or `?android:attr/name` resolves to the value of `name` in the currently active theme (as opposed to `@style/name`, which references a fixed style resource).
- Style attribute precedence (highest to lowest) when multiple sources set the same property: text spans on `TextView` > programmatic attributes > individual view XML attributes > view style > default styling > theme attributes > `TextAppearance` on `TextView`.

## Related

- [value resources](./value-resources.md)
- [application element](./application-element.md)
