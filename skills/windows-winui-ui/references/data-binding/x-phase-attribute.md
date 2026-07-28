# x:Phase attribute

Declarative, incremental rendering of `{x:Bind}` data templates in `ListView`/`GridView`, prioritizing the most important elements to keep panning smooth.

## Signature / Usage

```xaml
<object x:Phase="PhaseValue" .../>
```

```xaml
<DataTemplate x:Key="PhasedFileTemplate" x:DataType="model:FileItem">
  <Grid Width="200" Height="80">
    <Image Grid.RowSpan="4" Source="{x:Bind ImageData}" MaxWidth="70" MaxHeight="70" x:Phase="3"/>
    <TextBlock Text="{x:Bind DisplayName}" Grid.Column="1" FontSize="12"/>
    <TextBlock Text="{x:Bind prettyDate}" Grid.Column="1" Grid.Row="1" FontSize="12" x:Phase="1"/>
    <TextBlock Text="{x:Bind prettyFileSize}" Grid.Column="1" Grid.Row="2" FontSize="12" x:Phase="2"/>
  </Grid>
</DataTemplate>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| PhaseValue | number | Phase in which the element is data-bound and revealed. Default (unspecified) is `0`. Phase numbers do not need to be contiguous. |

## Notes

- Only affects `{x:Bind}` bindings, not `{Binding}`.
- Only applies to `ListViewBase`-derived controls (`ListView`, `GridView`); has no effect on `ContentTemplate`, `Hub` sections, or other item controls — there, all elements bind at once.
- Elements with a phase other than 0 are hidden via `Opacity` (not `Visibility`) until their phase is processed, to avoid showing stale recycled content while scrolling.
- Each element may declare only one phase; that phase applies to all bindings on it.
- Corresponds to `ContainerContentChangingEventArgs.Phase`; the `ContainerContentChanging` event fires for each phase before `x:Phase` bindings are processed. Achieves the same effect as manually handling `ContainerContentChanging`.

## Related

- [{x:Bind} markup extension](./x-bind-markup-extension.md)
- [Functions in x:Bind](./function-bindings.md)
