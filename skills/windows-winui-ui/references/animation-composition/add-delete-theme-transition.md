# AddDeleteThemeTransition

Provides the animated transition behavior for when controls add or delete children of a panel — e.g. a collection of photos in a `Grid` animates in/out of view as items are added or removed.

## Signature / Usage

```csharp
public sealed class AddDeleteThemeTransition : Transition
```

```xaml
<ItemsControl x:Name="rectangleItems">
    <ItemsControl.ItemContainerTransitions>
        <TransitionCollection>
            <AddDeleteThemeTransition/>
        </TransitionCollection>
    </ItemsControl.ItemContainerTransitions>
    <ItemsControl.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapGrid Height="400"/>
        </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
</ItemsControl>
```

```csharp
private void RemoveButton_Click(object sender, RoutedEventArgs e)
{
    if (rectangleItems.Items.Count > 0)
        rectangleItems.Items.RemoveAt(0);
}
```

## Notes

- Package: `Microsoft.UI.Xaml.Media.Animation` (WinUI 3).
- Has no unique properties beyond those inherited from `Transition`/`DependencyObject`.
- Typically combined with `RepositionThemeTransition` on the same `ItemContainerTransitions` collection so remaining items animate their add/delete and their re-flow together.

## Related

- [RepositionThemeTransition](./reposition-theme-transition.md)
- [EntranceThemeTransition](./entrance-theme-transition.md)
- [Transitions Property](./transitions-property.md)
