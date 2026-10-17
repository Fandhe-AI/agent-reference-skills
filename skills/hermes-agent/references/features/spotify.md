# Spotify

Control Spotify (playback, queue, search, playlists, saved tracks/albums, listening history) through the official `spotify` plugin from the plugin catalog. Uses Spotify's Web API with PKCE OAuth. Maintained by Nous Research in NousResearch/hermes-official-plugins; not part of Hermes core.

## Signature / Usage

```bash
hermes plugins install spotify
hermes tools enable spotify      # the toolset is opt-in
hermes spotify login
hermes spotify status
hermes spotify logout
hermes spotify login --scope "user-read-playback-state user-modify-playback-state playlist-read-private"
hermes spotify login --client-id <id> --redirect-uri http://localhost:3000/callback
```

```bash
hermes cron add --name "morning-commute" "0 7 * * 1-5" \
  "Transfer playback to my kitchen speaker and start my 'Morning Commute' playlist. Volume to 40. Shuffle on."
```

## Tools

| Tool | Actions |
|---|---|
| `spotify_playback` | `get_state`, `get_currently_playing`, `play` (`context_uri`, `uris`, `offset`, `position_ms`), `pause`, `next` / `previous`, `seek`, `set_repeat` (`track`/`context`/`off`), `set_shuffle`, `set_volume` (0-100), `recently_played` (`limit`, `before`, `after`) |
| `spotify_devices` | `list`, `transfer` (`device_id`, optional `play: true`) |
| `spotify_queue` | `get`, `add` (`uri`) |
| `spotify_search` | `query` required; optional `types` (`track`/`album`/`artist`/`playlist`/`show`/`episode`), `limit`, `offset`, `market` |
| `spotify_playlists` | `list`, `get`, `create`, `add_items`, `remove_items`, `update_details` |
| `spotify_albums` | `get`, `tracks` |
| `spotify_library` | `list`, `save`, `remove`; `kind` = `tracks` or `albums` |

Playback-mutating actions accept an optional `device_id`.

## Options / Props

| Name | Description |
|------|-------------|
| `HERMES_SPOTIFY_CLIENT_ID` | Client ID from your own Spotify developer app (in `~/.hermes/.env`) |
| `HERMES_SPOTIFY_REDIRECT_URI` | Optional; default `http://127.0.0.1:43827/spotify/callback` must be allow-listed in the app |
| Spotify app form | Redirect URI above, check **Web API**; PKCE uses no client secret |

## Notes

- Free accounts work for search, playlists, library, activity and read-only state; Premium is required for play, pause, skip, seek, volume, repeat, shuffle, queue add and transfer.
- Playback needs an active Spotify Connect device; otherwise `403 ... No active device found`. Speakers managed by Home Assistant that support Spotify Connect appear in `spotify_devices list` natively.
- `204 No Content` on `get_currently_playing` means nothing is playing (surfaced as `is_playing: false`).
- Tokens live under `providers.spotify` in `~/.hermes/auth.json`, refreshed on 401; refresh tokens expire after about 6 months. Installing is per profile (`hermes -p <profile> plugins install spotify`).
- Renamed commands: `hermes auth spotify` is now `hermes spotify login`; `hermes auth status spotify` / `hermes auth logout spotify` are `hermes spotify status` / `hermes spotify logout`. Profiles that used the previously bundled Spotify are migrated by `hermes update`.
- Over SSH (`SSH_CLIENT` / `SSH_TTY` set) Hermes skips browser auto-open; forward the callback port: `ssh -N -L 43827:127.0.0.1:43827 user@remote-host`.
- Cron jobs need Spotify enabled in `hermes tools` and an always-on target device; cron runs with `skip_memory=True`.
- Errors: `INVALID_CLIENT: Invalid redirect URI` (mismatch with app settings), `429` (rate limit), persistent `401` (refresh token revoked; run `hermes spotify login`).

## Related

- [Plugins](./plugins.md)
- [Plugin Catalog](./plugin-catalog.md)
- [Cron](../automation/cron.md)
