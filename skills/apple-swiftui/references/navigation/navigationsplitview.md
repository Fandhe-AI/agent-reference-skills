# NavigationSplitView

A view that presents views in two or three columns, where selections in leading columns control presentations in subsequent columns.

## Signature / Usage

```swift
// Two-column
@State private var employeeIds: Set<Employee.ID> = []

NavigationSplitView {
    List(model.employees, selection: $employeeIds) { employee in
        Text(employee.name)
    }
} detail: {
    EmployeeDetails(for: employeeIds)
}

// Three-column
@State private var departmentId: Department.ID?
@State private var employeeIds: Set<Employee.ID> = []

NavigationSplitView {
    List(model.departments, selection: $departmentId) { department in
        Text(department.name)
    }
} content: {
    if let department = model.department(id: departmentId) {
        List(department.employees, selection: $employeeIds) { employee in
            Text(employee.name)
        }
    } else {
        Text("Select a department")
    }
} detail: {
    EmployeeDetails(for: employeeIds)
}
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `columnVisibility` | `Binding<NavigationSplitViewVisibility>` | Controls which columns are visible. |
| `preferredCompactColumn` | `Binding<NavigationSplitViewColumn>` | The column shown when the view collapses to compact width. |
| `sidebar` | `() -> Sidebar` | The leading column view. |
| `content` | `() -> Content` | The middle column view (three-column only). |
| `detail` | `() -> Detail` | The trailing detail column view. |

## Notes

- Available: iOS 16+, iPadOS 16+, macOS 13+, tvOS 16+, watchOS 9+, visionOS 1+
- On narrow layouts (iPhone, Apple Watch) the split view collapses into a single `NavigationStack`.
- Customize column width with `.navigationSplitViewColumnWidth(_:)` or `navigationSplitViewColumnWidth(min:ideal:max:)`.
- Apply `.navigationSplitViewStyle(_:)` to change the collapse/expand behavior.
- The sidebar column automatically includes a sidebar toggle toolbar item; remove it with `.toolbar(removing: .sidebarToggle)`.

## Related

- [NavigationStack](./navigationstack.md)
- [NavigationLink](./navigationlink.md)
- [navigationDestination](./navigationdestination.md)
