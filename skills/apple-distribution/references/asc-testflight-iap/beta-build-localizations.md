# Beta Build Localizations

Localized "What's New" text shown to TestFlight testers for a specific build and locale.

## Signature / Usage

```
POST   /v1/betaBuildLocalizations
GET    /v1/betaBuildLocalizations
GET    /v1/betaBuildLocalizations/{id}
PATCH  /v1/betaBuildLocalizations/{id}
DELETE /v1/betaBuildLocalizations/{id}
```

## Options / Props

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaBuildLocalizations` | Create localized What's New text for a build |
| GET | `/v1/betaBuildLocalizations` | List beta build localizations for all apps |
| GET | `/v1/betaBuildLocalizations/{id}` | Get a specific beta build localization |
| PATCH | `/v1/betaBuildLocalizations/{id}` | Update the localized What's New text |
| DELETE | `/v1/betaBuildLocalizations/{id}` | Delete a specific beta build localization |
| GET | `/v1/betaBuildLocalizations/{id}/build` | Get build information for a localization |
| GET | `/v1/betaBuildLocalizations/{id}/relationships/build` | Get the build ID for a localization |

### Create Request Body Fields

| Field | Type | Description |
|-------|------|-------------|
| `whatsNew` | string | Localized text describing what is new in this build |
| `locale` | string | BCP 47 locale identifier (e.g. `en-US`, `ja`) |
| `build` | relationship | The build this localization belongs to |

## Notes

- Should be updated for every new build with a description of changes for testers.
- Also accessible via `GET /v1/builds/{id}/betaBuildLocalizations`.

## Related

- [Builds (Beta)](./builds-beta.md)
