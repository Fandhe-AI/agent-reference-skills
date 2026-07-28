# Events and Delegates: event_token, auto_revoke, winrt::event

Shows how to register, and revoke, event-handling delegates in C++/WinRT, and how to author your own events with `winrt::event`.

## Signature / Usage

```cppwinrt
// Register with a lambda.
myButton().Click([this](IInspectable const&, RoutedEventArgs const&)
{
    myButton().Content(box_value(L"Clicked"));
});

// Register a member function, manually revoke via event_token.
struct Example : ExampleT<Example>
{
    Example(Button const& button) : m_button(button)
    {
        m_token = m_button.Click([this](IInspectable const&, RoutedEventArgs const&) { /* ... */ });
    }
    ~Example() { m_button.Click(m_token); }
private:
    Button m_button;
    winrt::event_token m_token;
};

// Auto-revoke: revoker holds a weak reference to the source and revokes on scope exit.
struct Example2 : ExampleT<Example2>
{
    Example2(Button button)
    {
        m_event_revoker = button.Click(winrt::auto_revoke,
            [this](IInspectable const&, RoutedEventArgs const&) { /* ... */ });
    }
private:
    Button::Click_revoker m_event_revoker;
};
```

Authoring your own event with `winrt::event`:

```cppwinrt
struct EventSource
{
    winrt::event<EventHandler<int>> m_event;

    void Event(EventHandler<int> const& handler) { m_event.add(handler); }
    void RaiseEvent() { m_event(nullptr, 0); }
};
```

## Options / Props

| Type / function | Description |
|------|-------------|
| `winrt::event_token` | Token returned when registering a delegate; pass it back to the same-named registration function to revoke. |
| `winrt::auto_revoke_t` / `winrt::auto_revoke` | Marker passed to a registration call to request an event revoker instead of a token. |
| `winrt::event_revoker<T>` | RAII wrapper (e.g. `Button::Click_revoker`) that revokes automatically on destruction; holds a weak reference to the event source. |
| `winrt::event<Delegate>` | Member type for authoring your own event; `.add(handler)` returns a token, `.remove(token)` revokes, `operator()` raises it. |
| `implements::get_strong()` / `get_weak()` | Retrieve a strong/weak reference to `this` for safe delegate capture (see `weak-references.md`). |

## Notes

- Typically your event handlers don't need to appear in the `.idl` file — the XAML Designer only adds them to `.h`/`.cpp`.
- To find a delegate's exact parameter types, look up the event's registration syntax (e.g. `event_token KeyDown(KeyEventHandler const&)`), then the delegate type's function-call-operator syntax.
- Synchronous event sources let you revoke and be confident no more events arrive; **asynchronous** ones may deliver an in-flight event even after revoking (especially from a destructor) — use `winrt::auto_revoke` or a strong/weak captured reference instead of relying on revoke-in-destructor timing.
- If `winrt::auto_revoke` throws `winrt::hresult_no_interface`, the event source doesn't support weak references (common in `Microsoft.UI.Composition`); fall back to manual token-based revoke.
- Registering a member function as a delegate with a raw `this` (`{ this, &Type::Handler }`) is unsafe if the recipient can be destroyed before the source; pass `get_strong()` or `get_weak()` in place of `this` instead (Windows SDK 10.0.17763.0+).
- Only one completion mechanism is valid per async object: either a single `.Completed(...)` delegate, or a single `co_await` — using both fails.

## Related

- [Weak References](./weak-references.md)
- [Concurrency and Coroutines](./async-coroutines.md)
- [Author APIs and IDL](./author-apis.md)
