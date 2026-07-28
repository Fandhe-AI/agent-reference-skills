# Intent filters and resolution

`<intent-filter>` declares which implicit `Intent`s a component can receive; the system matches an intent against a filter's action, category, and data rules.

## Signature / Usage

```xml
<activity android:name=".ShareActivity" android:exported="false">
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="text/plain" />
    </intent-filter>
    <intent-filter>
        <action android:name="android.intent.action.SEND" />
        <action android:name="android.intent.action.SEND_MULTIPLE" />
        <category android:name="android.intent.category.DEFAULT" />
        <data android:mimeType="image/*" />
        <data android:mimeType="video/*" />
    </intent-filter>
</activity>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<action>` | filter child element | — | Declares an accepted intent action. If the filter has no `<action>`, all intents fail the action test. |
| `<category>` | filter child element | — | Declares an accepted category. Every category in the intent must match one in the filter; `CATEGORY_DEFAULT` must be present to match implicit intents started with `startActivity()`. |
| `<data>` | filter child element | — | Declares accepted URI structure and/or MIME type; only the parts specified are compared against the intent. |

## Notes

- This is the Android platform component API (Kotlin / `android.app`, `android.content`) — distinct from the same-named concept in other skills.
- Resolution runs three independent tests — action, category, data — and an intent must pass all three to match a filter.
- An intent with a URI but no MIME type passes the data test if the URI matches; an intent with a MIME type but no URI passes if the type matches; components are presumed to support `content:` and `file:` URIs when a filter lists only a MIME type.
- Always set `android:exported` explicitly on components with intent filters; set it to `true` only when external apps are meant to invoke the component.
- For runtime resolution / visibility of other apps' components (as opposed to declaring your own filters), see [Package visibility](./package-visibility.md).

## Related

- [Intent](./intent.md)
- [Common intents](./common-intents.md)
- [Package visibility](./package-visibility.md)
