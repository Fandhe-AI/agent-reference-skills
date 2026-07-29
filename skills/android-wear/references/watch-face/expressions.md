# Expressions and Data Sources

WFF's expression language drives `<Transform>` values, `<Condition>` branches, and `<Template>` string formatting, reacting to data sources wrapped in square brackets (e.g. `[HOUR_0_23]`).

## Signature / Usage

```xml
<!-- Transform/Template: must evaluate to a value -->
(5.0/90.0)*clamp([ACCELEROMETER_ANGLE_X],0,90)

<!-- Condition: must evaluate to a boolean, wrapped in CDATA -->
<Condition><![CDATA[[DAY_OF_WEEK] == 6 || [DAY_OF_WEEK] == 7]]></Condition>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `[HOUR_0_23]` | data source | — | Current hour, 0-23. |
| `[DAY_OF_WEEK]` | data source | — | Day of week, 1-7. |
| `[SECOND]` / `[SECONDS_IN_DAY]` | data source | — | Current second / seconds since midnight. |
| `[AMPM_STATE]` | data source | — | `1` for PM, `0` for AM. |
| `[ACCELEROMETER_ANGLE_X]` | data source | — | Accelerometer x-axis angle (for `<Gyro>`-style transforms). |
| `[CONFIGURATION.<id>]` | data source | — | Value of a user configuration (see [user-configurations](./user-configurations.md)). |
| `[COMPLICATION.*]` | data source | — | Data from a complication slot (see [complications](./complications.md)). |
| `clamp(value, min, max)` | function | — | Constrains a value within bounds. |

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Expressions re-evaluate whenever any referenced data source updates; prefer data sources that change as infrequently as possible (e.g. `[AMPM_STATE]` over `[SECONDS_IN_DAY] > 43200`) to minimize re-evaluation cost.
- `<Condition>` expressions must be wrapped in `<![CDATA[ ... ]]>` to avoid XML entity-escaping issues with `<`/`>`/`&`.
- Weather-related data sources (current and forecast conditions) were added in WFF v2 (see [versions](./versions.md) and [weather](./weather.md) for the full `[WEATHER.*]` vocabulary).

## Related

- [transform](./transform.md)
- [user-configurations](./user-configurations.md)
- [complications](./complications.md)
- [weather](./weather.md)
