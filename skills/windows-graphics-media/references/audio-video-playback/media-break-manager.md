# Media breaks (MediaBreak / MediaBreakManager / MediaBreakSchedule)

Classes for scheduling, inserting, and controlling media breaks (typically ads) around the playback of a `MediaPlaybackItem` with `MediaPlayer`. A `MediaBreak` represents a playable break (its own `MediaPlaybackList`); `MediaBreakSchedule` (one per `MediaPlaybackItem`) holds the preroll, postroll, and midroll breaks for that item; `MediaBreakManager` (one per `MediaPlayer`) plays, skips, and raises events for whichever break is currently active.

## Signature / Usage

```csharp
// Every MediaPlaybackItem has its own MediaBreakSchedule.
MediaPlaybackItem moviePlaybackItem =
    new MediaPlaybackItem(MediaSource.CreateFromUri(new Uri("https://example.com/movie.mkv")));

// Preroll break: MediaBreakInsertionMethod.Interrupt pauses the main content while the break plays.
MediaBreak preRollBreak = new MediaBreak(MediaBreakInsertionMethod.Interrupt);
MediaPlaybackItem prerollAd =
    new MediaPlaybackItem(MediaSource.CreateFromUri(new Uri("https://example.com/preroll_ad.mp4")));
prerollAd.CanSkip = false;
preRollBreak.PlaybackList.Items.Add(prerollAd);
moviePlaybackItem.BreakSchedule.PrerollBreak = preRollBreak;

// Midroll break at a specific TimeSpan into the main content.
MediaBreak midrollBreak = new MediaBreak(MediaBreakInsertionMethod.Interrupt, TimeSpan.FromMinutes(10));
midrollBreak.PlaybackList.Items.Add(
    new MediaPlaybackItem(MediaSource.CreateFromUri(new Uri("https://example.com/midroll_ad.mp4"))));
moviePlaybackItem.BreakSchedule.InsertMidrollBreak(midrollBreak);

var mediaPlayer = new MediaPlayer { Source = moviePlaybackItem };
mediaPlayer.BreakManager.BreakStarted += (sender, args) =>
{
    MediaBreak currentBreak = sender.CurrentBreak;
    // update UI to reflect ad playback (currentBreak.PlaybackList.CurrentItemIndex, etc.)
};

// Skip the currently playing break programmatically.
mediaPlayer.BreakManager.SkipCurrentBreak();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `MediaBreak(MediaBreakInsertionMethod)` / `MediaBreak(MediaBreakInsertionMethod, TimeSpan)` | constructor | Creates a break; the `TimeSpan` overload sets `PresentationPosition`, the point within main-content playback where a midroll break will fire. |
| `MediaBreak.InsertionMethod` | `MediaBreakInsertionMethod` | `Interrupt` pauses the main content while the break plays; `Replace` keeps the main content's playback position advancing (used by live-streaming apps so they don't fall behind while an ad plays). |
| `MediaBreak.PlaybackList` | `MediaPlaybackList` | The `MediaPlaybackItem`(s) played as part of the break. |
| `MediaBreak.CanStart` | `bool` | Whether the break is still eligible to play; commonly set to `false` inside a `BreakEnded` handler. |
| `MediaBreak.CustomProperties` | key/value map | App-defined data associated with the break. |
| `MediaPlaybackItem.BreakSchedule` | `MediaBreakSchedule` | Every `MediaPlaybackItem` has its own schedule; configure it before assigning the item to `MediaPlayer.Source`. |
| `MediaBreakSchedule.PrerollBreak` / `PostrollBreak` | `MediaBreak` | Break played before / after the associated item plays. |
| `MediaBreakSchedule.MidrollBreaks` | read-only list of `MediaBreak` | Breaks currently scheduled to play at a point during the item's playback. |
| `MediaBreakSchedule.InsertMidrollBreak(MediaBreak)` / `RemoveMidrollBreak(MediaBreak)` | method | Add / remove a midroll break from the schedule. |
| `MediaBreakSchedule.ScheduleChanged` | event | Raised when the schedule changes. |
| `MediaPlayer.BreakManager` | `MediaBreakManager` | Obtain the manager for a given player. |
| `MediaBreakManager.CurrentBreak` | `MediaBreak` | The break currently playing, if any. |
| `MediaBreakManager.PlaybackSession` | `MediaPlaybackSession` | Session scoped to the break content (buffering/position/natural-size events), separate from the main content's playback session. |
| `MediaBreakManager.PlayBreak(MediaBreak)` | method | Immediately plays the specified break. |
| `MediaBreakManager.SkipCurrentBreak()` | method | Skips the currently playing break. |
| `MediaBreakManager.BreakStarted` / `BreakEnded` / `BreakSkipped` / `BreaksSeekedOver` | event | Raised when a break starts, ends (all items played or skipped), is skipped by the user or app, or is jumped over because the user seeked the main content past it. |

## Notes

- Namespace: `Windows.Media.Playback`. Introduced in Windows 10 Anniversary Update (10.0.14393.0, `Windows.Foundation.UniversalApiContract` v3) — the same release that added `MediaPlayer.CommandManager` and `MediaPlayer.GetSurface`.
- Get the manager via `MediaPlayer.BreakManager`; get an item's schedule via `MediaPlaybackItem.BreakSchedule`. There is no standalone constructor for either — both are always obtained from an existing `MediaPlayer`/`MediaPlaybackItem`.
- Set `CanSkip = false` on a break's `MediaPlaybackItem` to prevent the built-in transport controls from letting the user skip it; the app can still call `BreakManager.SkipCurrentBreak()` programmatically (e.g. from a custom "Skip Ad" button).
- `BreaksSeekedOver` fires (with the list of skipped-over breaks in `args.SeekedOverBreaks`) when the user seeks the main content's position past one or more scheduled breaks, letting the app decide whether to force-play one of them via `PlayBreak`.

## Related

- [MediaPlayer](./media-player.md)
- [MediaPlaybackItem](./media-playback-item.md)
- [MediaPlaybackList](./media-playback-list.md)
- [MediaPlaybackSession](./media-playback-session.md)
