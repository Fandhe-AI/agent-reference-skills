# Weather Data Sources ([WEATHER.*])

`[WEATHER.*]` expressions expose current conditions and hourly/daily forecasts to WFF text, template, and condition elements. Added in WFF v2.

## Signature / Usage

```xml
<PartText x="100" y="100" width="200" height="50">
    <Text>
        <Font family="SYNC_TO_DEVICE" size="16">
            <Template><![CDATA[%s°]]>
                <Parameter expression="[WEATHER.TEMPERATURE]" />
            </Template>
        </Font>
    </Text>
</PartText>

<!-- Availability check before rendering forecast data -->
<Condition><![CDATA[[WEATHER.HOURS.1.IS_AVAILABLE]]]></Condition>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `[WEATHER.IS_AVAILABLE]` | data source (boolean) | — | Whether weather data is currently available. |
| `[WEATHER.IS_ERROR]` | data source (boolean) | — | Whether an error occurred loading weather data; can be `true` at the same time as `IS_AVAILABLE` when data is stale and a refresh attempt failed. |
| `[WEATHER.LAST_UPDATED]` | data source (Unix epoch ms) | — | Timestamp of the most recent weather data; format with `icuText()`. |
| `[WEATHER.CONDITION]` | data source (int enum) | — | Current weather condition code (e.g. `4` = `HEAVY_RAIN`). |
| `[WEATHER.CONDITION_NAME]` | data source (string) | — | Human-readable name of the current weather condition. |
| `[WEATHER.TEMPERATURE]` | data source (numeric) | — | Current temperature; unit follows device locale (Celsius/Fahrenheit handled automatically). |
| `[WEATHER.UV_INDEX]` | data source (numeric) | — | Current UV index. |
| `[WEATHER.HOURS.<N>.IS_AVAILABLE]` | data source (boolean) | — | Whether hourly forecast data is available for hour `N` (1-8). |
| `[WEATHER.HOURS.<N>.CONDITION]` | data source (int enum) | — | Weather condition `N` hours from now (`N` = 1-8). |
| `[WEATHER.HOURS.<N>.TEMPERATURE]` | data source (numeric) | — | Temperature forecast `N` hours from now. |
| `[WEATHER.DAYS.<N>.IS_AVAILABLE]` | data source (boolean) | — | Whether daily forecast data is available for day `N` (1-5). |
| `[WEATHER.DAYS.<N>.CONDITION]` | data source (int enum) | — | Weather condition `N` days from now (`N` = 1-5). |
| `[WEATHER.DAYS.<N>.TEMPERATURE]` | data source (numeric) | — | Temperature forecast `N` days from now. |
| `[WEATHER.DAYS.<N>.CHANCE_OF_PRECIPITATION]` | data source (numeric) | — | Probability of precipitation `N` days from now. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Requires the paired handheld (or network) to supply location; on-device GPS is not used to conserve battery. Always gate rendering on the relevant `IS_AVAILABLE` source, and design the layout to handle every `CONDITION` enum value.
- Full condition-code enumeration and additional hourly/daily metrics are listed in the WFF data-sources schema reference (`/reference/wear-os/wff/common/attributes/source-type`).
- For emulator testing, mock location via `adb shell cmd location providers set-test-provider-location gps --location <lat>,<lng>` (after enabling a test provider), or pair the emulator with a phone.

## Related

- [expressions](./expressions.md)
- [complications](./complications.md)
- [versions](./versions.md)
