# MediaBinder

Enables deferred binding of media content associated with a `MediaSource`. Use this class for media content that shouldn't be bound to a `MediaSource` until a media player is actually about to play the content, such as content that requires payment or authorization to access.

## Signature / Usage

```csharp
var binder = new MediaBinder();
binder.Token = "my-content-id";
binder.Binding += async (sender, args) =>
{
    var deferral = args.GetDeferral();
    // resolve args.Token to a stream/uri, e.g. after payment/auth check
    args.SetUri(new Uri("https://example.com/protected-video.mp4"));
    deferral.Complete();
};
MediaSource source = MediaSource.CreateFromMediaBinder(binder);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Token | String | App-specified string identifying the content to bind when `Binding` is raised. |
| Source | MediaSource | The `MediaSource` associated with this binder. |
| Binding | event | Occurs when a media player is ready for content to be bound; handle it to call `SetStream`, `SetStreamReference`, or `SetUri` on the event args. |

## Notes

- Namespace: `Windows.Media.Core`. Create via `MediaSource.CreateFromMediaBinder(MediaBinder)`.
- Typical scenario: gate access to protected/paid content until the player is actually about to play it, avoiding premature network/auth calls.

## Related

- [MediaSource](./media-source.md)
