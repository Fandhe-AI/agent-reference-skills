---
source: https://reactnative.dev/architecture/render-pipeline
---

# Render, Commit, and Mount

The React Native renderer goes through a sequence of work to render React logic to a host platform. This sequence of work is called the render pipeline and occurs for initial renders and updates to the UI state.

## Signature / Usage

The render pipeline has three general phases:

1. **Render:** React executes product logic which creates a React Element Tree in JavaScript. From this tree, the renderer creates a React Shadow Tree in C++.
2. **Commit:** After a React Shadow Tree is fully created, the renderer triggers a commit. This **promotes** both the React Element Tree and the newly created React Shadow Tree as the "next tree" to be mounted. This also schedules calculation of its layout information.
3. **Mount:** The React Shadow Tree, now with the results of layout calculation, is transformed into a Host View Tree.

Example used by the page for the initial render:

```jsx
function MyComponent() {
  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  );
}

// <MyComponent />
```

## Initial Render

### Phase 1. Render

- As each React Element is invoked, the renderer synchronously creates a React Shadow Node. This happens only for React Host Components, not for React Composite Components. `<View>` leads to a `ViewShadowNode` object, `<Text>` to a `TextShadowNode` object. There is never a React Shadow Node that directly represents `<MyComponent>`.
- Whenever React creates a parent-child relationship between two React Element Nodes, the renderer creates the same relationship between the corresponding React Shadow Nodes.
- The operations are synchronous and thread-safe, executed from React (JavaScript) into the renderer (C++), usually on the JavaScript thread.
- The React Element Tree is a temporal representation materialized by "fibers" in React. Each fiber that represents a host component stores a C++ pointer to the React Shadow Node, made possible by JSI.
- The React Shadow Tree is immutable. To update any React Shadow Node, the renderer creates a new React Shadow Tree; cloning operations make state updates more performant.

### Phase 2. Commit

The commit phase consists of two operations: Layout Calculation and Tree Promotion.

- **Layout Calculation:** calculates the position and size of each React Shadow Node by invoking Yoga. It requires each node's styles (originating from a React Element in JavaScript) and the layout constraints of the root of the React Shadow Tree.
- **Tree Promotion (New Tree -> Next Tree):** promotes the new React Shadow Tree as the "next tree" to be mounted. The "next tree" mounts on the next "tick" of the UI Thread.
- These operations are asynchronously executed on a background thread.
- Majority of layout calculation executes entirely within C++. Layout of some components depends on the host platform (e.g. `Text`, `TextInput`); Yoga invokes a function defined in the host platform to calculate the component's layout.

### Phase 3. Mount

The mount phase transforms the React Shadow Tree (now containing layout data) into a Host View Tree with rendered pixels on the screen. The renderer creates a corresponding Host View for each React Shadow Node: `android.view.ViewGroup` for `<View>` and `android.widget.TextView` for `<Text>` on Android; a `UIView` with text populated by a call to `NSLayoutManager` on iOS.

- **Tree Diffing:** computes the diff between the "previously rendered tree" and the "next tree" entirely in C++. The result is a list of atomic mutation operations on host views (e.g. `createView`, `updateView`, `removeView`, `deleteView`). The React Shadow Tree is flattened here to avoid creating unnecessary host views.
- **Tree Promotion (Next Tree -> Rendered Tree):** atomically promotes the "next tree" to "previously rendered tree" so the next mount phase computes a diff against the proper tree.
- **View Mounting:** applies the atomic mutation operations onto corresponding host views, in the host platform on the UI thread.
- The operations are synchronously executed on UI thread. If the commit phase executes on a background thread, the mounting phase is scheduled for the next "tick" of UI thread; if the commit phase executes on UI thread, mounting executes synchronously on the same thread.
- During the initial render, the "previously rendered tree" is empty, so the mutation list consists only of creating views, setting props, and adding views to each other.
- In current production tests, a React Shadow Tree typically consists of about 600-1000 React Shadow Nodes (before view flattening); the trees get reduced to ~200 nodes after view flattening. On iPad or desktop apps, this quantity may increase 10-fold.

## React State Updates

State updates need the React Element Tree and the React Shadow Tree to be immutable for thread safety, so React creates a new copy of each tree. Example component:

```jsx
function MyComponent() {
  return (
    <View>
      <View
        style={{backgroundColor: 'red', height: 20, width: 20}}
      />
      <View
        style={{backgroundColor: 'blue', height: 20, width: 20}}
      />
    </View>
  );
}
```

After the first nested `<View>` changes from `'red'` to `'yellow'`:

```jsx
<View>
  <View
    style={{backgroundColor: 'yellow', height: 20, width: 20}}
  />
  <View
    style={{backgroundColor: 'blue', height: 20, width: 20}}
  />
</View>
```

### Phase 1. Render

The renderer uses structural sharing: every React Element on the path up to the root is cloned. **React will only clone a React Element if it requires an update to its props, style, or children.** Unchanged elements are shared by the old and new trees. For the example, React creates the new tree using these operations:

```text
1. CloneNode(Node 3, {backgroundColor: 'yellow'}) → Node 3'
2. CloneNode(Node 2) → Node 2'
3. AppendChild(Node 2', Node 3')
4. AppendChild(Node 2', Node 4)
5. CloneNode(Node 1) → Node 1'
6. AppendChild(Node 1', Node 2')
```

### Phase 2. Commit

- **Layout Calculation:** similar to the initial render. One important difference is that layout calculation may cause shared React Shadow Nodes to be cloned, because if the parent of a shared node incurs a layout change, the shared node's layout may also change.
- **Tree Promotion (New Tree -> Next Tree):** similar to the initial render.

### Phase 3. Mount

- **Tree Promotion (Next Tree -> Rendered Tree)** as above.
- **Tree Diffing** between the previously rendered tree (T) and the next tree (T'). In the example the operation is `UpdateView(Node 3, {backgroundColor: 'yellow'})`. The diff can be calculated for any currently mounted tree with any new tree; the renderer can skip some intermediate versions of the tree.
- **View Mounting** applies the mutations; only the `backgroundColor` of View 3 is updated (to yellow).

## React Native Renderer State Updates

For most information in the Shadow Tree, React is the single owner and single source of truth. The exception: components in C++ can contain state that is not directly exposed to JavaScript (_C++ State_), controlled by C++ and the host platform. Generally this is only relevant if you develop a complicated Host Component that needs C++ State.

For example, `ScrollView` uses this mechanism to let the renderer know what the current offset is; the information is used in an API like `measure`. Differences from React State Updates:

1. They skip the "render phase" since React is not involved.
2. The updates can originate and happen on any thread, including the main thread.

When performing a C++ State update, a block of code requests an update of a `ShadowNode` (N) to set C++ State to value S. The renderer repeatedly attempts to get the latest committed version of N, clone it with the new state S, and commit N' to the tree. If React, or another C++ State update, performed another commit meanwhile, the commit fails and the renderer retries many times until a commit succeeds. The mount phase is practically identical to that of React State Updates.

## Notes

- The page is marked in the source with the caution: "This document refers to the New Architecture, that is in active roll-out."
- Phases may occur on different threads; see Threading Model.
- Diagrams of the source page are omitted.

## Related

- [Threading Model](./threading-model.md)
- [View Flattening](./view-flattening.md)
- [Fabric](./fabric-renderer.md)
- [Glossary](./glossary.md)
