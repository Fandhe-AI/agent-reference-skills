# Control patterns and interfaces

A **control pattern** is an interface implementation that exposes a specific aspect of a control's functionality to a UI Automation client (e.g. invoking, toggling, scrolling), independent of the control's visuals or class identity. A single control can support multiple patterns.

## Signature / Usage

```csharp
protected override object GetPatternCore(PatternInterface patternInterface)
{
    if (patternInterface == PatternInterface.Toggle)
    {
        return this; // this peer implements IToggleProvider
    }
    return base.GetPatternCore(patternInterface);
}
```

## Options / Props

| Control pattern | WinUI provider interface | Description |
|------------------|---------------------------|--------------|
| Annotation | `IAnnotationProvider` | Exposes the properties of an annotation in a document. |
| Dock | `IDockProvider` | Controls that can be docked in a docking container (toolbars, tool palettes). |
| Drag | `IDragProvider` | Draggable controls or controls with draggable items. |
| DropTarget | `IDropTargetProvider` | Controls that can be the target of a drag-and-drop operation. |
| ExpandCollapse | `IExpandCollapseProvider` | Controls that visually expand to show more content and collapse to hide it. |
| Grid | `IGridProvider` | Controls with grid functionality (sizing, moving to a specified cell). `Grid` layout itself does not implement this — it's layout, not a control. |
| GridItem | `IGridItemProvider` | Controls that have cells within grids. |
| Invoke | `IInvokeProvider` | Controls that can be invoked, e.g. `Button`. |
| ItemContainer | `IItemContainerProvider` | Find an element in a container, e.g. a virtualized list. |
| MultipleView | `IMultipleViewProvider` | Controls that switch between multiple representations of the same data. |
| ObjectModel | `IObjectModelProvider` | Exposes a pointer to a document's underlying object model. |
| RangeValue | `IRangeValueProvider` | Controls with a value within a range (e.g. a year spinner from 1900 to present). |
| Scroll | `IScrollProvider` | Controls that can scroll. |
| ScrollItem | `IScrollItemProvider` | Individual items within a scrollable list, e.g. a combo box item. |
| Selection | `ISelectionProvider` | Selection container controls, e.g. `ListBox`, `ComboBox`. |
| SelectionItem | `ISelectionItemProvider` | Individual items in selection container controls. |
| Spreadsheet | `ISpreadsheetProvider` | Exposes the contents of a spreadsheet or grid-based document. |
| SpreadsheetItem | `ISpreadsheetItemProvider` | Exposes properties of a cell in a spreadsheet/grid document. |
| Styles | `IStylesProvider` | Describes a UI element with a specific style, fill color/pattern, or shape. |
| SynchronizedInput | `ISynchronizedInputProvider` | Directs mouse/keyboard input to a specific UI element for client-driven interaction. |
| Table | `ITableProvider` | Controls with a grid plus header info, e.g. a tabular calendar. |
| TableItem | `ITableItemProvider` | Items in a table. |
| Text | `ITextProvider` (see also `ITextRangeProvider`, `ITextProvider2`) | Edit controls and documents exposing textual information. |
| TextChild | `ITextChildProvider` | Accesses an element's nearest ancestor supporting the Text pattern. |
| TextEdit | (no managed class) | Access to a control that modifies text, e.g. auto-correction or IME composition. |
| TextRange | `ITextRangeProvider` (see also `ITextRangeProvider2`) | A span of continuous text in a container implementing `ITextProvider`. |
| Toggle | `IToggleProvider` | Controls whose state can be toggled, e.g. `CheckBox`, checkable menu items. |
| Transform | `ITransformProvider` | Controls that can be resized, moved, rotated (designers, forms, drawing apps). |
| Value | `IValueProvider` | Get/set a value on controls that don't support a range of values. |
| VirtualizedItem | `IVirtualizedItemProvider` | Items inside virtualized containers that need to become fully accessible elements. |
| Window | `IWindowProvider` | Information specific to windows, e.g. child windows and dialogs. |

## Notes

- Applies to WinUI 3 / Windows App SDK (`Microsoft.UI.Xaml.Automation.Provider.*`). The legacy UWP provider interfaces share the same names.
- Not all patterns are implemented by existing XAML controls; some exist only to keep parity with the general UI Automation platform definitions for fully custom peer scenarios.
- General cross-platform implementation guidance for each pattern lives in the UI Automation provider documentation (`Implementing UI Automation Control Patterns`) — consult it alongside the WinUI-specific interface for expected behavior.

## Related

- [Custom automation peers](./automation-peers.md)
- [UI Automation overview](./ui-automation-overview.md)
