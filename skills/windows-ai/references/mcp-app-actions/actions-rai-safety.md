# Responsible AI and safety for App Actions on Windows

Responsible AI and content-age-rating guidance for App Action providers.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| contentAgeRating | string | Action definition JSON property; a member of `UserAgeConsentGroup`: `"Child"`, `"Minor"`, `"Adult"`. No value = accessible to all ages. |

## Notes

- Action authors are responsible for content moderation and abuse monitoring of entities returned to users when building AI-backed actions, per Microsoft Responsible AI principles.

## Related

- [Action definition JSON schema](./actions-json.md)
- [App Actions on Windows Overview](./app-actions-overview.md)
- [Security and consent model](./security-consent-model.md)
