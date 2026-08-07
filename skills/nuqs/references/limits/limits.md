# Limits

Browser-imposed limits to be aware of when using nuqs or URL params in general: URL update throttling and max URL lengths.

## URL update throttling

Browsers rate-limit the History API — updates to the URL are queued and throttled to a default of 50ms, which satisfies most browsers even with high-frequency query updates (text input, slider).

Safari's rate limits are much stricter and require a throttle of 120ms (320ms for older versions of Safari).

nuqs handles this out of the box, but custom throttles can be set via the `limitUrlUpdates` option (see [Options](../options/options.md)).

## Max URL lengths

Most modern browsers enforce a max URL length, which varies:

| Browser | Practical limit |
|---------|------------------|
| Chrome | ~2 MB (issues may appear around 2,000 characters) |
| Firefox | ~65,000 characters |
| Safari | ~80,000 characters (more restrictive) |
| IE/Edge | IE historically capped at 2,083 characters; Edge has relaxed this |

Transport mechanisms like social media, messaging apps, and emails may impose significantly lower limits on URL length. Long URLs may be truncated, wrapped, or rendered unusable when shared on these platforms.

## Notes

- Not all application state should be stored in URLs. Exceeding ~2,000 characters may indicate a need to reconsider the state management approach.

## Related

- [Options](../options/options.md)
