# RepeatBehavior

Describes how a `Timeline` repeats its simple duration.

## Signature / Usage

```csharp
public struct RepeatBehavior
```

```xaml
<DoubleAnimation ... RepeatBehavior="Forever" />
<DoubleAnimation ... RepeatBehavior="2x" />
<DoubleAnimation ... RepeatBehavior="0:0:4" />
```

```csharp
var repeatBehavior = new RepeatBehavior();
repeatBehavior.Type = RepeatBehaviorType.Forever;
myAnimation.RepeatBehavior = repeatBehavior;
// or
myAnimation.RepeatBehavior = new RepeatBehavior(2); // count
myAnimation.RepeatBehavior = new RepeatBehavior(new TimeSpan(0, 0, 4)); // duration
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| Count | double | Number of times the simple duration repeats (default `1.0`). |
| Duration | `TimeSpan` | Time span for which the timeline should repeat (used instead of `Count`). |
| Type | `RepeatBehaviorType` (`Count`, `Duration`, `Forever`) | Which mode this instance represents. |

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3), applies to `Timeline.RepeatBehavior` (inherited by `Storyboard`, `DoubleAnimation`, etc.).
- Only one of `Count` or `Duration` is meaningful at a time, based on `Type`; when `Type` is `Forever`, neither applies and the animation repeats indefinitely.
- XAML syntax: `"Forever"`, `"2x"` (iteration count), or `"[days.]hours:minutes:seconds[.fractionalSeconds]"` (duration).
- Cannot be declared as a shareable object in a `ResourceDictionary`.

## Related

- [Storyboard](./storyboard.md)
- [DoubleAnimation](./double-animation.md)
