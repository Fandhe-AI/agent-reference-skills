---
source: https://react.dev/reference/eslint-plugin-react-hooks/lints/immutability
---

# immutability

Validates against mutating props, state, and other values that are immutable.

## Signature / Usage

```js
// ❌ Array push mutation
function Component() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    items.push(4); // Mutating!
    setItems(items); // Same reference, no re-render
  };
}

// ✅ Create new array
function Component() {
  const [items, setItems] = useState([1, 2, 3]);

  const addItem = () => {
    setItems([...items, 4]); // New array
  };
}

// ✅ Create new object
function Component() {
  const [user, setUser] = useState({name: 'Alice'});

  const updateName = () => {
    setUser({...user, name: 'Bob'}); // New object
  };
}
```

## Notes

- A component's props and state are immutable snapshots. Never mutate them directly. Instead, pass new props down, and use the setter function from `useState`.
- Other invalid patterns: object property assignment (`user.name = 'Bob'; setUser(user);`) and `setItems(items.sort())` (sort mutates).
- Mutating arrays with methods like `push()` won't trigger re-renders; create a new array instead (`setTodos([...todos, {id, text}])` or `setTodos(todos => [...todos, {id: Date.now(), text}])`).
- Mutating nested properties doesn't trigger re-renders either; spread at each level that needs updating:

```js
// ✅ Better: Create new objects at each level
const toggleTheme = () => {
  setUser({
    ...user,
    settings: {
      ...user.settings,
      theme: 'dark'
    }
  });
};
```

## Related

- [useState](../hooks/useState.md)
- [Components and Hooks must be pure](../rules-of-react/components-and-hooks-must-be-pure.md)
