# Simulating Health Services Data

`adb` commands and the Android Studio emulator's Wear Health Services sensor panel, used to generate synthetic sensor data for testing Health Services integrations without a real workout.

## Signature / Usage

```bash
# Wear OS 4+: trigger a synthetic event
adb shell am broadcast -a "whs.AUTO_PAUSE_DETECTED" com.google.android.wearable.healthservices

# Wear OS 3: enable/disable synthetic data providers
adb shell am broadcast -a "whs.USE_SYNTHETIC_PROVIDERS" com.google.android.wearable.healthservices
adb shell am broadcast -a "whs.USE_SENSOR_PROVIDERS" com.google.android.wearable.healthservices

# Wear OS 3: start/stop a preset synthetic exercise
adb shell am broadcast -a "whs.synthetic.user.START_RUNNING" com.google.android.wearable.healthservices
adb shell am broadcast -a "whs.synthetic.user.STOP_EXERCISE" com.google.android.wearable.healthservices

# Wear OS 3: custom exercise with explicit metrics
adb shell am broadcast -a "whs.synthetic.user.START_EXERCISE" \
    --ei exercise_options_heart_rate 90 \
    --ef exercise_options_average_speed 1.2 \
    --ez exercise_options_use_location true \
    com.google.android.wearable.healthservices
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Wear Health Services sensor panel | Android Studio emulator UI | — | Toggles standard/all sensor capabilities, overrides live values, and triggers events (auto pause/resume, sleep, golf shot) on Wear OS 4+ AVDs. |
| `whs.AUTO_PAUSE_DETECTED` / `whs.AUTO_RESUME_DETECTED` / `whs.FALL_OVER` / `whs.START_SLEEPING` / `whs.STOP_SLEEPING` / `whs.GOLF_SHOT` | broadcast action | — | Wear OS 4+ synthetic events sent via `adb shell am broadcast`. |
| `whs.synthetic.user.START_WALKING` / `START_RUNNING` / `START_HIKING` / `START_SWIMMING` / `START_RUNNING_TREADMILL` / `STOP_EXERCISE` | broadcast action | — | Wear OS 3 preset synthetic exercises with fixed heart rate/speed/elevation profiles. |
| `whs.synthetic.user.START_EXERCISE` | broadcast action | — | Wear OS 3 custom exercise; accepts `--ei exercise_options_heart_rate`, `--ef exercise_options_average_speed`, `--ez exercise_options_use_location`, `--ef exercise_options_max_elevation_rate`, `--ei exercise_options_duration_secs`. |

## Notes

- Requires the emulator's `com.google.android.wearable.healthservices` system package; not applicable to physical devices.
- Fall detection events (`whs.FALL_OVER`) may take up to a minute to be delivered.
- This is the Wear OS Health Services API — distinct from Health Connect, which has no equivalent synthetic-data simulator.

## Related

- [ExerciseClient](./exerciseclient.md)
- [DataType](./datatype.md)
