# Home Assistant

Hermes integrates with Home Assistant through the official `homeassistant` plugin (NousResearch/hermes-official-plugins, not part of Hermes core): a gateway platform subscribing to `state_changed` events over WebSocket, plus four smart-home tools in the `homeassistant` toolset.

## Signature / Usage

```bash
hermes plugins install homeassistant
hermes -p <profile> plugins install homeassistant   # plugins are per profile
```

```bash
# ~/.hermes/.env
HASS_TOKEN=your-long-lived-access-token
HASS_URL=http://192.168.1.100:8123          # default http://homeassistant.local:8123
HASS_HOME_CHANNEL=mobile_app_my_phone       # default notify target for bare `deliver: homeassistant`
```

```yaml
platforms:
  homeassistant:
    enabled: true
    extra:
      watch_domains: [climate, binary_sensor, alarm_control_panel, light]
      watch_entities: [sensor.front_door_battery]
      ignore_entities: [sensor.uptime, sensor.cpu_usage]
      cooldown_seconds: 30
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `url` | `HASS_URL`, else `http://homeassistant.local:8123` | Base URL |
| `watch_domains` | none | Only watch these entity domains |
| `watch_entities` | none | Only watch these entity IDs |
| `watch_all` | `false` | Receive all state changes (not recommended) |
| `ignore_entities` | none | Always ignored (applied before domain/entity filters) |
| `cooldown_seconds` | `30` | Minimum seconds between events per entity |

Tools (`homeassistant` toolset):

| Tool | Parameters |
|------|------------|
| `ha_list_entities` | `domain` (optional), `area` (optional) |
| `ha_get_state` | `entity_id` (required) |
| `ha_list_services` | `domain` (optional) |
| `ha_call_service` | `domain` (required), `service` (required), `entity_id` (optional), `data` (optional JSON object) |

## Notes

- Create a Long-Lived Access Token from your HA user profile; short-lived UI tokens fail with 401.
- No events are forwarded unless `watch_domains`, `watch_entities` or `watch_all` is set (a warning is logged at startup).
- Agent replies are delivered as HA persistent notifications titled "Hermes Agent"; the platform uses `minimal` display defaults.
- Cron / webhook delivery: `deliver: homeassistant:mobile_app_my_phone` or bare `deliver: homeassistant` (uses `HASS_HOME_CHANNEL`).
- HA events are always authorized (no allowlist or pairing). WebSocket heartbeat 30s; reconnect backoff 5s, 10s, 30s, 60s.
- Blocked service domains: `shell_command`, `command_line`, `python_script`, `pyscript`, `hassio`, `rest_command`. Entity IDs must match `^[a-z_][a-z0-9_]*\.[a-z0-9_]+$`.
- Releases that bundled Home Assistant: `hermes update` auto-installs the plugin per profile; the old `hermes-agent[homeassistant]` extra is removed. `ha_*` tools sit behind Tool Search when it is on.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/messaging/homeassistant (pinned to v0.22.2)

## Related

- [Messaging Gateway](./messaging.md)
- [Webhooks](./webhooks.md)
