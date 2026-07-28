# Configuration qualifiers

Suffix-based directory naming (`<type>-<qualifier1>-<qualifier2>...`) that lets the system pick alternative resources per device configuration.

## Signature / Usage

```
res/
    drawable/               (default)
    drawable-en/            (English)
    drawable-fr-rCA/        (French-Canadian)
    drawable-night/         (night mode)
    drawable-hdpi/          (high-density screens)
    drawable-en-night/      (English + night mode, in required order)
    values-v21/             (API level 21+)
```

## Options / Props

| Qualifier | Example values | Purpose |
|-----------|-----------------|---------|
| Language & region | `en`, `fr`, `en-rUS`, `b+en+US` | Localize content by language/region (BCP-47 form `b+<lang>+<region>` recommended for API 24+) |
| Screen density | `ldpi`, `mdpi`, `hdpi`, `xhdpi`, `xxhdpi`, `xxxhdpi` | Density-specific bitmaps (~120/160/240/320/480/640 dpi) |
| Night mode | `night`, `notnight` | Day/night theme and asset variants |
| Screen size | `small`, `normal`, `large`, `xlarge` | Layout variants per screen size class |
| Orientation | `port`, `land` | Portrait/landscape variants |
| UI mode | `car`, `desk`, `television`, `watch`, `vrheadset` | Device form factor |
| Platform version | `v1`, `v21`, `v34` | API-level-gated resources |
| Touchscreen | `notouch`, `finger` | Input method availability |

## Notes

- Qualifiers must appear in Android's fixed precedence order in the directory name (e.g. language before night mode before density); wrong order (`drawable-night-en-hdpi`) is invalid.
- Only one value per qualifier type per directory — create separate directories (`drawable-es/`, `drawable-fr/`) rather than combining values of the same qualifier.
- Best-match resolution algorithm: eliminate directories that contradict the device configuration, then walk the qualifier precedence order (MCC/MNC → language/region → other qualifiers) eliminating non-matching directories at each step until one remains.
- MCC/MNC (mobile country/network code) outranks language/region: e.g. a device set to Hindi with an Indian SIM (MCC 404) prefers `values-mcc404/` over `values-hi/`.
- Always provide a default (unqualified) resource set; missing defaults crash the app when run under an unmatched configuration.
- Resource aliasing avoids duplication, e.g. a `drawable-en-rCA/icon.xml` `<bitmap>` pointing at `@drawable/icon_ca`, or a string `<string name="hi">@string/hello</string>`.

## Related

- [resource directories](./resource-directories.md)
- [localization and RTL](./localization-rtl.md)
