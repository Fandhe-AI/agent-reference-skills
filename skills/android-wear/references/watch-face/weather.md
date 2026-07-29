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

<!-- Availability check before rendering forecast data (index starts at 0) -->
<Condition><![CDATA[[WEATHER.HOURS.0.IS_AVAILABLE]]]></Condition>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `[WEATHER.IS_AVAILABLE]` | data source (boolean) | — | Whether weather data is currently available. |
| `[WEATHER.IS_ERROR]` | data source (boolean) | — | Whether an error occurred loading weather data; can be `true` at the same time as `IS_AVAILABLE` when data is stale and a refresh attempt failed. |
| `[WEATHER.LAST_UPDATED]` | data source (Unix epoch ms) | — | Timestamp of the most recent weather data; format with `icuText()`. |
| `[WEATHER.CONDITION]` | data source (Integer enum) | — | Current weather condition code, `0`-`15` (e.g. `4` = `HEAVY_RAIN`). |
| `[WEATHER.CONDITION_NAME]` | data source (string) | — | Human-readable name of the current weather condition. |
| `[WEATHER.IS_DAY]` | data source (boolean) | — | Whether the current condition applies during daylight. |
| `[WEATHER.TEMPERATURE]` | data source (Integer) | — | Current temperature; unit follows the user's preferred unit. |
| `[WEATHER.TEMPERATURE_UNIT]` | data source (Integer enum) | — | Temperature unit of the returned values (`1` = `CELSIUS`, `2` = `FAHRENHEIT`). |
| `[WEATHER.DAY_TEMPERATURE_LOW]` | data source (Integer) | — | Lowest temperature forecast for today. |
| `[WEATHER.DAY_TEMPERATURE_HIGH]` | data source (Integer) | — | Highest temperature forecast for today. |
| `[WEATHER.CHANCE_OF_PRECIPITATION]` | data source (Integer, 0-100) | — | Current chance of precipitation. |
| `[WEATHER.UV_INDEX]` | data source (Integer) | — | Current UV index. |
| `[WEATHER.HOURS.{index}.IS_AVAILABLE]` | data source (boolean) | — | Whether hourly forecast data is available `index` hours from now. Check before reading other `HOURS.{index}` fields. |
| `[WEATHER.HOURS.{index}.CONDITION]` | data source (Integer enum) | — | Weather condition `index` hours from now; same enum as `WEATHER.CONDITION`. |
| `[WEATHER.HOURS.{index}.CONDITION_NAME]` | data source (string) | — | Human-readable weather condition `index` hours from now. |
| `[WEATHER.HOURS.{index}.IS_DAY]` | data source (boolean) | — | Whether it is daylight `index` hours from now. |
| `[WEATHER.HOURS.{index}.TEMPERATURE]` | data source (Integer) | — | Temperature forecast `index` hours from now. |
| `[WEATHER.HOURS.{index}.UV_INDEX]` | data source (Integer) | — | UV index forecast `index` hours from now. |
| `[WEATHER.DAYS.{index}.IS_AVAILABLE]` | data source (boolean) | — | Whether daily forecast data is available `index` days from now. Check before reading other `DAYS.{index}` fields. |
| `[WEATHER.DAYS.{index}.CONDITION_DAY]` | data source (Integer enum) | — | Day-time weather condition `index` days from now; same enum as `WEATHER.CONDITION`. |
| `[WEATHER.DAYS.{index}.CONDITION_DAY_NAME]` | data source (string) | — | Human-readable day-time weather condition `index` days from now. |
| `[WEATHER.DAYS.{index}.CONDITION_NIGHT]` | data source (Integer enum) | — | Night-time weather condition `index` days from now; same enum as `WEATHER.CONDITION`. |
| `[WEATHER.DAYS.{index}.CONDITION_NIGHT_NAME]` | data source (string) | — | Human-readable night-time weather condition `index` days from now. |
| `[WEATHER.DAYS.{index}.TEMPERATURE_LOW]` | data source (Integer) | — | Lowest temperature forecast `index` days from now. |
| `[WEATHER.DAYS.{index}.TEMPERATURE_HIGH]` | data source (Integer) | — | Highest temperature forecast `index` days from now. |
| `[WEATHER.DAYS.{index}.CHANCE_OF_PRECIPITATION]` | data source (Integer, 0-100) | — | Day-time chance of precipitation `index` days from now. |
| `[WEATHER.DAYS.{index}.CHANCE_OF_PRECIPITATION_NIGHT]` | data source (Integer, 0-100) | — | Night-time chance of precipitation `index` days from now. |
| `[WEATHER.DAYS.{index}.UV_INDEX]` | data source (Integer) | — | UV index forecast `index` days from now. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Requires the paired handheld (or network) to supply location; on-device GPS is not used to conserve battery. Always gate rendering on the relevant `IS_AVAILABLE` source, and design the layout to handle every `CONDITION` enum value (`0`-`15`).
- `index` for `HOURS.{index}` and `DAYS.{index}` starts at `0` (e.g. `WEATHER.DAYS.1.TEMPERATURE_LOW` is tomorrow's low). Hourly forecast data can be available up to 8 hours ahead and daily forecast data up to 5 days ahead, but the watch face should always check `IS_AVAILABLE` since the actual range can vary by device and time.
- Full condition-code enumeration and additional hourly/daily metrics are listed in the WFF data-sources schema reference (`/training/wearables/wff/common/attributes/source-type`).
- For emulator testing, mock location via `adb shell cmd location providers set-test-provider-location gps --location <lat>,<lng>` (after enabling a test provider), or pair the emulator with a phone.

## Related

- [expressions](./expressions.md)
- [complications](./complications.md)
- [versions](./versions.md)
