# HTTP Live Streaming (HLS) tag support

Lists the HLS protocol tags supported for WinUI apps, per Windows 10 release.

## Signature / Usage

```csharp
// HLS manifests (.m3u8) are played through AdaptiveMediaSource.
var result = await AdaptiveMediaSource.CreateFromUriAsync(new Uri("https://example.com/stream.m3u8"));
if (result.Status == AdaptiveMediaSourceCreationStatus.Success)
{
    mediaPlayer.Source = MediaSource.CreateFromAdaptiveMediaSource(result.MediaSource);
}
```

## Options / Props

Columns: HLS version the tag was introduced in / required on client / support in July release of Windows 10, 1511, 1607. Rows indented in the source are attributes of the tag above them.

| Tag | HLS ver. | Client | Support |
|-----|----------|--------|---------|
| EXTM3U | 1 | REQUIRED | Supported (all) |
| EXT-X-VERSION | 2 | REQUIRED | Supported (all) |
| EXTINF | 1 | REQUIRED | Supported (all) |
| EXT-X-BYTERANGE | 4 | OPTIONAL | Supported (all) |
| EXT-X-DISCONTINUITY | 1 | OPTIONAL | Supported (all) |
| EXT-X-KEY | 1 | OPTIONAL | Supported (all) |
| EXT-X-KEY METHOD | 1 | Attribute | "NONE, AES-128" (July, 1511); "NONE, AES-128, SAMPLE-AES" (1607) |
| EXT-X-KEY URI / IV | 1 / 2 | Attribute | Supported (all) |
| EXT-X-KEY KEYFORMAT / KEYFORMATVERSIONS | 5 | Attribute | Not Supported (all) |
| EXT-X-MAP (and URI, BYTERANGE) | 5 | OPTIONAL | Not Supported (all) |
| EXT-X-PROGRAM-DATE-TIME | 1 | OPTIONAL | Not Supported (all) |
| EXT-X-TARGETDURATION | 1 | REQUIRED | Supported (all) |
| EXT-X-MEDIA-SEQUENCE | 1 | OPTIONAL | Supported (all) |
| EXT-X-DISCONTINUITY-SEQUENCE | 6 | OPTIONAL | Not Supported (all) |
| EXT-X-ENDLIST | 1 | OPTIONAL | Supported (all) |
| EXT-X-PLAYLIST-TYPE | 3 | OPTIONAL | Supported (all) |
| EXT-X-I-FRAMES-ONLY | 4 | OPTIONAL | Not Supported (all) |
| EXT-X-MEDIA | 4 | OPTIONAL | Supported (all) |
| EXT-X-MEDIA TYPE | 4 | Attribute | "AUDIO, VIDEO" (July, 1511); "AUDIO, VIDEO, SUBTITLES" (1607) |
| EXT-X-MEDIA URI / GROUP-ID / LANGUAGE | 4 | Attribute | Supported (all) |
| EXT-X-MEDIA NAME | 4 | Attribute | Not Supported (July, 1511); Supported (1607) |
| EXT-X-MEDIA ASSOC-LANGUAGE / DEFAULT / AUTOSELECT / FORCED / INSTREAM-ID / CHARACTERISTICS | 4-6 | Attribute | Not Supported (all) |
| EXT-X-STREAM-INF | 1 | REQUIRED | Supported (all) |
| EXT-X-STREAM-INF BANDWIDTH / CODECS / RESOLUTION / AUDIO / VIDEO | 1-4 | Attribute | Supported (all) |
| EXT-X-STREAM-INF PROGRAM-ID / FRAME-RATE | 1 / 7 | Attribute | NA (all) |
| EXT-X-STREAM-INF AVERAGE-BANDWIDTH / CLOSED-CAPTIONS | 7 / 6 | Attribute | Not Supported (all) |
| EXT-X-STREAM-INF SUBTITLES | 5 | Attribute | Not Supported (July, 1511); Supported (1607) |
| EXT-X-I-FRAME-STREAM-INF | 4 | OPTIONAL | Not Supported (all) |
| EXT-X-SESSION-DATA / EXT-X-SESSION-KEY | 7 | OPTIONAL | Not Supported (all) |
| EXT-X-INDEPENDENT-SEGMENTS | 6 | OPTIONAL | Not Supported (July); Supported (1511, 1607) |
| EXT-X-START | 6 | OPTIONAL | Not Supported (July); Partially Supported (1511, 1607) |
| EXT-X-START TIME-OFFSET | 6 | Attribute | Not Supported (July); Supported (1511, 1607) |
| EXT-X-START PRECISE | 6 | Attribute | Not Supported (July); Default "NO" supported (1511, 1607) |

## Notes

- Custom tags that start with "X-" can be accessed as timed metadata (see the media items, playlists, and tracks article, covered by `media-source.md` and `timed-metadata-track.md`).
- Table condensed from the source: the original also lists the HLS draft version per tag; see the official page for the full matrix.
- Source: https://learn.microsoft.com/en-us/windows/apps/develop/media-playback/hls-tag-support (ms.date 02/24/2026, windows-dev-docs commit a381231).

## Related

- [AdaptiveMediaSource](./adaptive-media-source.md)
- [DASH profile support](./dash-profile-support.md)
- [MediaSource](./media-source.md)
