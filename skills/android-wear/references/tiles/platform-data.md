# Platform data binding (DynamicBuilders / PlatformHealthSources)

Since Tiles 1.2, layout elements can bind directly to streaming platform data (e.g. heart rate) or to a persisted state map, updating in place roughly every second without a full `onTileRequest` round-trip.

## Signature / Usage

```kotlin
override fun onTileRequest(requestParams: RequestBuilders.TileRequest) =
    Futures.immediateFuture(
        TileBuilders.Tile.Builder()
            .setResourcesVersion(RESOURCES_VERSION)
            .setFreshnessIntervalMillis(60 * 60 * 1000)
            .setTileTimeline(
                TimelineBuilders.Timeline.fromLayoutElement(
                    LayoutElementBuilders.Text.Builder(
                        this,
                        TypeBuilders.StringProp.Builder("--")
                            .setDynamicValue(
                                PlatformHealthSources.heartRateBpm()
                                    .format()
                                    .concat(DynamicBuilders.DynamicString.constant(" bpm"))
                            )
                            .build(),
                        TypeBuilders.StringLayoutConstraint.Builder("000").build(),
                    ).build()
                )
            )
            .build()
    )
```

State-backed animation on tap (see `actions-and-interactivity.md` for the `loadAction` side):

```kotlin
companion object {
    val KEY_WATER_INTAKE = intAppDataKey("key_water_intake")
}

val waterIntakeValue = DynamicBuilders.DynamicInt32.from(KEY_WATER_INTAKE)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `PlatformHealthSources.heartRateBpm(): DynamicFloat` | factory | Streams current heart rate. Requires `BODY_SENSORS` or `READ_HEART_RATE` permission; renderer schema 1.200+. |
| `PlatformHealthSources.heartRateAccuracy(): DynamicHeartRateAccuracy` | factory | Streams heart-rate sensor accuracy (`HEART_RATE_ACCURACY_*`). Same permission/schema requirements. |
| `PlatformHealthSources.dailySteps(): DynamicInt32` | factory | Total steps since local midnight. Requires `ACTIVITY_RECOGNITION`; renderer schema 1.200+. |
| `PlatformHealthSources.dailyFloors(): DynamicFloat` | factory | Floors climbed since local midnight. Same requirements. |
| `PlatformHealthSources.dailyCalories(): DynamicFloat` | factory | Basal + active calories since local midnight. Same requirements. |
| `PlatformHealthSources.dailyDistanceMeters(): DynamicFloat` | factory | Distance traveled since local midnight, in meters. Same requirements. |
| `DynamicBuilders.DynamicString` / `DynamicInt32` / `DynamicFloat` | types | Streamable value wrappers with `.format()`, `.concat()`, `.from(key)`, and `.animate(from, to, AnimationSpec)` transforms. |
| `intAppDataKey(name)` / `stringAppDataKey(name)` | factory | Declares a typed state key used both when writing state (`dynamicDataMapOf(key mapTo value)`) and when reading it back (`DynamicInt32.from(key)`, `currentState.stateMap[key]`). |

## Notes

- Physical-dimension-affecting dynamic values (anything but color) require a matching layout constraint, e.g. `TypeBuilders.StringLayoutConstraint.Builder("000")` reserves space for a 3-digit number; Material3 components set these automatically.
- Wear OS caps the number of simultaneous dynamic expressions per tile; excess expressions silently fall back to their static value — consolidate related values into a single `State` map rather than many individual expressions.
- Package: `androidx.wear.protolayout.expression.DynamicBuilders`, `androidx.wear.protolayout.expression.PlatformHealthSources`.

## Related

- [tile-builders](./tile-builders.md)
- [actions-and-interactivity](./actions-and-interactivity.md)
- [color-and-type](./color-and-type.md)
