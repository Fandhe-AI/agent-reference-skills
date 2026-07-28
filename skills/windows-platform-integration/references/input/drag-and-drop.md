# Drag and drop (DragEnter / Drop / DataPackage / AllowDrop / CanDrag)

Transfer data within or between apps using the standard press-hold-and-pan gesture, driven by the `CanDrag`/`AllowDrop` properties and `DataPackage`.

## Signature / Usage

```xaml
<Image x:Name="Image" CanDrag="True" DragStarting="Image_DragStarting" />

<Grid AllowDrop="True" DragOver="Grid_DragOver" Drop="Grid_Drop" Background="LightBlue">
    <TextBlock>Drop here</TextBlock>
</Grid>
```

```csharp
private void Grid_DragOver(object sender, DragEventArgs e)
{
    e.AcceptedOperation = DataPackageOperation.Copy;
}

private async void Grid_Drop(object sender, DragEventArgs e)
{
    if (e.DataView.Contains(StandardDataFormats.StorageItems))
    {
        var items = await e.DataView.GetStorageItemsAsync();
        // process items[0] ...
    }
}

private void Image_DragStarting(UIElement sender, DragStartingEventArgs args)
{
    args.Data.SetText("payload");
    args.Data.RequestedOperation = DataPackageOperation.Copy | DataPackageOperation.Move;
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `UIElement.CanDrag` | `bool` | Enables dragging the element (and its children, for collections like `ListView`). |
| `UIElement.AllowDrop` | `bool` | Marks an element as a valid drop target (default `false`); the element needs a non-null background to receive drops anywhere in its bounds. |
| `UIElement.DragStarting` | event | Fires when a drag begins on a `CanDrag="True"` element; use `DragStartingEventArgs.Data` (`DataPackage`) to populate custom content and `RequestedOperation`. Supports `GetDeferral()` for async work. |
| `UIElement.DropCompleted` | event | Fires on the drag source after the operation ends; `DropCompletedEventArgs.DropResult` reports the outcome (e.g. `Move`). |
| `UIElement.DragOver` | event | Fires while an item is dragged over the target; set `DragEventArgs.AcceptedOperation` to declare supported operations (commonly `Copy`). |
| `UIElement.Drop` | event | Fires on release over a valid drop target; read data from `DragEventArgs.DataView`. |
| `DataPackage` | class (`Windows.ApplicationModel.DataTransfer`) | Carries the transferred data (text, RTF, HTML, bitmap, storage items, or custom formats) and `RequestedOperation`. |
| `DragEventArgs.DragUIOverride` | `DragUIOverride` | Customize caption/glyph/content visibility of the default drag visual. |
| `ListViewBase.CanReorderItems` | `bool` | Enables built-in drag-based item reordering (used together with `AllowDrop`). |

## Notes

- Namespace: `Microsoft.UI.Xaml.UIElement` (`CanDrag`, `AllowDrop`, `DragStarting`, `DropCompleted`, `DragOver`, `Drop`) in WinUI 3 desktop apps; `DataPackage` remains `Windows.ApplicationModel.DataTransfer` (WinRT). For fully custom drag-and-drop (not backed by `UIElement`), use `Microsoft.UI.Input.DragDrop.DragOperation` / `DragDropManager` instead.
- The system automatically builds the `DataPackage` for images and text; other content types require handling `DragStarting`/`DropCompleted` explicitly.
- Setting `AllowDrop="True"` explicitly on a `ListViewItem`/`GridViewItem` designates it as a drop-target "folder" with distinct system animations (useful for File Explorer-style UI).

## Related

- [Pointer input](./pointer-input.md)
