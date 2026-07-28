# Client-side state machine with dispatch and hydration

`AppState` に対して `dispatch` でアクションを適用し、`render_for_hydration` でハイドレーション属性付きの `Node` を組み立てる。

```rust
use fandhe_frontend_core::render;
use fandhe_frontend_interactive::{dispatch, render_for_hydration, AppState};

fn run_native_demo() {
    let mut state = AppState::new();
    println!("initial state: {state:?}");

    for (name, payload) in [
        ("increment", ""),
        ("increment", ""),
        ("set_draft", "wasm glue crate"),
        ("add_item", ""),
    ] {
        let applied = dispatch(&mut state, name, payload);
        println!("dispatch({name:?}, {payload:?}) -> applied={applied}, state={state:?}");
    }

    // 未知アクション名の dispatch は no-op（false、状態不変）を返す。
    let unknown_applied = dispatch(&mut state, "no-such-action", "");
    println!("dispatch(\"no-such-action\", \"\") -> applied={unknown_applied}");

    println!("{}", render(&state.view()));
}

fn write_hydration_node(state: &AppState) -> String {
    render(&render_for_hydration(state))
}
```

## Notes

- `dispatch(&mut state, name, payload)` は `bool` を返す。未知のアクション名（`decode_action` の復号失敗）は安全側フォールバックとして `false`（no-op、状態不変）になる。
- `render_for_hydration(&state)` はハイドレーション属性付き `Node` を返し、`fandhe_frontend_core::render()` で HTML 文字列化する。
- `hydrate("interactive-root")` 系統（`AppState` の状態機械）と `start_router("app-root")` 系統（`layout` が組む `<div id="app-root">`）は別系統・別 DOM。同一ページに同居させる場合は異なる `root_id` を使う。
