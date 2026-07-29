# Move and draw commands syntax

A compact mini-language for `Path.Data` / `PathIcon.Data` that describes a `PathGeometry` as a single string: one move command, one or more draw commands, and an optional close command. Uppercase letters use absolute coordinates; lowercase use coordinates relative to the previous point.

## Signature / Usage

```xaml
<Path x:Name="Arrow" Fill="White" Height="11" Width="9.67"
      Data="M4.12,0 L9.67,5.47 L4.12,10.94 L0,10.88 L5.56,5.47 L0,0.06" />
```

## Options / Props

| Command | Syntax | Description |
| --- | --- | --- |
| Fill rule (optional) | `F0` \| `F1` | `F0` = `EvenOdd` (default, usually omitted); `F1` = `Nonzero`. |
| Move | `M x,y` / `m x,y` | Starts a new figure at *startPoint* (absolute/relative). Must appear exactly once, first. |
| Line | `L x,y` / `l x,y` | Straight line to the end point. |
| Horizontal line | `H x` / `h x` | Horizontal line to the given x-coordinate. |
| Vertical line | `V y` / `v y` | Vertical line to the given y-coordinate. |
| Cubic Bézier | `C c1 c2 end` / `c c1 c2 end` | Curve using two control points. |
| Quadratic Bézier | `Q c end` / `q c end` | Curve using one control point. |
| Smooth cubic Bézier | `S c2 end` / `s c2 end` | Cubic curve whose first control point mirrors the previous segment's. |
| Smooth quadratic Bézier | `T c end` / `t c end` | Quadratic curve whose control point mirrors the previous segment's. |
| Elliptical arc | `A size rotation isLargeArc sweepDir end` / `a ...` | Arc between current point and *end*. |
| Close | `Z` / `z` | Closes the figure with a line back to its start point; sets `PathFigure.IsClosed`. |

## Notes

- Each draw command maps to one `PathSegment`-derived object inside a single `PathFigure` in the resulting `PathGeometry`; repeating the same command letter can be omitted (`L 100,200 300,400` == `L 100,200 L 300,400`).
- Whitespace between tokens is optional if commas separate all numbers (e.g. `F1M0,58L2,56L6,60z` is valid), but conventional style keeps whitespace between commands for readability.
- Don't use a comma as the decimal point — numbers are parsed with `en-us`-style formatting regardless of locale. `Infinity`, `-Infinity`, `NaN`, and scientific notation (`+1.e17`) are accepted as values.
- Many third-party vector-export tools (originally written for WPF/Silverlight) emit this same syntax; most such XAML pastes into WinUI/UWP directly, except brushes unsupported here (e.g. `RadialGradientBrush`).

## Related

- [XAML syntax guide](./xaml-syntax-guide.md)
