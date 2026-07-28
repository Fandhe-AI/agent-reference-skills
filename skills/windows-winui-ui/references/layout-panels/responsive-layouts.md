# Responsive Layouts

Techniques for adapting a WinUI 3 app's UI to different window sizes: fluid layout properties/panels plus `VisualState`/`AdaptiveTrigger` breakpoints for larger structural changes.

## Signature / Usage

```xaml
<Page ...>
    <Grid>
        <VisualStateManager.VisualStateGroups>
            <VisualStateGroup>
                <VisualState>
                    <VisualState.StateTriggers>
                        <!-- Triggered when window width is >= 640 effective pixels. -->
                        <AdaptiveTrigger MinWindowWidth="640" />
                    </VisualState.StateTriggers>
                    <VisualState.Setters>
                        <Setter Target="mySplitView.DisplayMode" Value="Inline"/>
                        <Setter Target="mySplitView.IsPaneOpen" Value="True"/>
                    </VisualState.Setters>
                </VisualState>
            </VisualStateGroup>
        </VisualStateManager.VisualStateGroups>

        <SplitView x:Name="mySplitView" DisplayMode="CompactInline"
                   IsPaneOpen="False" CompactPaneLength="20">
            <SplitView.Pane><!-- Pane content --></SplitView.Pane>
        </SplitView>
    </Grid>
</Page>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| AdaptiveTrigger.MinWindowWidth / MinWindowHeight | `double` | Window-size threshold ("breakpoint") at which the containing `VisualState` activates |
| VisualState.StateTriggers | collection | State triggers (e.g. `AdaptiveTrigger`, custom `StateTrigger`) that activate a state automatically |
| VisualState.Setters | collection of `Setter` | Property values applied when the state is active; reverted automatically when no longer met |
| VisualStateManager.GoToState | method | Applies a named `VisualState` imperatively from code (used with `Storyboard`-based states or manual triggers) |

## Notes

- Recommended breakpoints (by effective pixels of app window width, not physical screen size): Small up to 640px (e.g. TVs viewed from a distance), Medium 641–1007px (tablets), Large 1008px+ (PCs, laptops, Surface Hub).
- XAML measures in *effective pixels*, which normalize for viewing distance and screen density — design and set breakpoints in effective pixels, not physical pixels.
- Prefer `VisualState.StateTriggers` + `Setter` (simplified syntax) over `Storyboard`-based `VisualState` + manual `GoToState` calls for breakpoint-driven UI.
- When using `StateTriggers`, attach `VisualStateManager.VisualStateGroups` to the first child of the page root (not the `Page` itself) for triggers to activate automatically.
- Attached properties set inside a `VisualState.Setter`/`ObjectAnimationUsingKeyFrames` use parenthesized syntax, e.g. `Target="myTextBox.(RelativePanel.AlignHorizontalCenterWithPanel)"`.
- Combine with fluid layout panels (`Grid` star sizing, `StackPanel`, `RelativePanel`) — breakpoints handle structural changes (e.g. `SplitView.DisplayMode`), while fluid panels handle continuous resizing.

## Related

- [SplitView](./splitview.md)
- [RelativePanel](./relativepanel.md)
- [Layout Fundamentals](./layout-fundamentals.md)
- [Choosing a Layout Panel](./choosing-a-layout-panel.md)
