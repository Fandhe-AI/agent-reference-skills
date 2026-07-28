# App Actions Testing Playground

The **App Actions Testing Playground** app lets developers validate that their App Actions (`Windows.AI.Actions`) are registered correctly with the system and test their runtime behavior, without needing a separate consumer app.

## Signature / Usage

```text
1. Download and install the App Actions Testing Playground app (aka.ms/AppActionsTestingPlayground).
2. Deploy your app so its actions are registered with the system.
3. Launch the App Actions Testing Playground app.
4. On the Action catalog tab, click your action's entry (pick a version from Overloads if it supports multiple input/output sets).
5. Under Inputs, select an entity to pass in (or add a custom entity via "Add an entity").
6. Click Run Action — your app launches and a modal shows the action's response.
```

## Options / Props

| Name | Description |
|------|-------------|
| **Action catalog** tab | Lists registered actions to invoke, choose overloads, and manage test input entities |
| **Registrations** tab | Shows the raw JSON registration for all registered actions |
| `allowedAppInvokers` | Action definition JSON field; must include `"*"` (or the Testing Playground's AppUserModelID) before testing, otherwise the Playground cannot invoke the action |

## Notes

- `allowedAppInvokers` restricts which AppUserModelIDs can call `ActionCatalog.GetActionsForInputs` / `GetAllActions` against your action — set it to `"*"` during testing, then scope it down for production.
- This tool targets `Windows.AI.Actions` App Actions providers; it is unrelated to Android's App Actions / Shortcuts APIs.

## Related

- [Testing Windows Widgets](./widgets-testing.md)
