---
source: https://react.dev/learn/typescript
---

# Using TypeScript

TypeScript is a popular way to add type definitions to JavaScript codebases. Out of the box, TypeScript supports JSX and you can get full React Web support by adding `@types/react` and `@types/react-dom` to your project.

## Signature / Usage

To install the latest version of React's type definitions in an existing project:

```bash
npm install --save-dev @types/react @types/react-dom
```

Typing component props:

```tsx
function MyButton({ title }: { title: string }) {
  return (
    <button>{title}</button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton title="I'm a button" />
    </div>
  );
}
```

With an `interface` (or `type`) describing the props:

```tsx
interface MyButtonProps {
  /** The text to display inside the button */
  title: string;
  /** Whether the button can be interacted with */
  disabled: boolean;
}

function MyButton({ title, disabled }: MyButtonProps) {
  return (
    <button disabled={disabled}>{title}</button>
  );
}
```

## Options / Props

Required `tsconfig.json` compiler options:

| Name | Type | Description |
| --- | --- | --- |
| `lib` | string[] | `dom` must be included (if no `lib` option is specified, `dom` is included by default). |
| `jsx` | string | Must be set to one of the valid options. `preserve` should suffice for most applications. If you're publishing a library, consult the `jsx` documentation on what value to choose. |

## Notes

- All production-grade React frameworks offer support for using TypeScript; follow the framework specific guide for installation (Next.js, Remix, Gatsby, Expo).
- Every file containing JSX must use the `.tsx` file extension.
- The Sandpack sandboxes in the docs can handle TypeScript code, but they do not run the type-checker; use the TypeScript Playground for type-checking.
- `useState`: the initial state determines the type; provide a type argument for union types or grouped state.

```ts
// Infer the type as "boolean"
const [enabled, setEnabled] = useState(false);

// Explicitly set the type to "boolean"
const [enabled, setEnabled] = useState<boolean>(false);

type Status = "idle" | "loading" | "success" | "error";

const [status, setStatus] = useState<Status>("idle");

type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success', data: any }
  | { status: 'error', error: Error };

const [requestState, setRequestState] = useState<RequestState>({ status: 'idle' });
```

- `useReducer`: the reducer's types are inferred from the initial state; it is often better to set the type on the initial state than to pass a type argument.

```tsx
import {useReducer} from 'react';

interface State {
   count: number
};

type CounterAction =
  | { type: "reset" }
  | { type: "setCount"; value: State["count"] }

const initialState: State = { count: 0 };

function stateReducer(state: State, action: CounterAction): State {
  switch (action.type) {
    case "reset":
      return initialState;
    case "setCount":
      return { ...state, count: action.value };
    default:
      throw new Error("Unknown action");
  }
}

const [state, dispatch] = useReducer(stateReducer, initialState);
```

- `useContext`: the type of the context value is inferred from the value passed to `createContext`. When a default does not make sense and `null` is used, set `ContextShape | null` explicitly and have a consuming Hook do a runtime check that throws when the Provider is missing:

```tsx
import { createContext, useContext } from 'react';

type ComplexObject = {
  kind: string
};

// The context is created with `| null` in the type, to accurately reflect the default value.
const Context = createContext<ComplexObject | null>(null);

// The `| null` will be removed via the check in the Hook.
const useGetComplexObject = () => {
  const object = useContext(Context);
  if (!object) { throw new Error("useGetComplexObject must be used within a Provider") }
  return object;
}
```

- `useMemo` / `useCallback`: React Compiler automatically memoizes values and functions, reducing the need for manual `useMemo` / `useCallback` calls. The type of `useMemo`'s result is inferred from the return value of the function (`const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);`). In TypeScript strict mode `useCallback` requires adding types for the parameters in your callback; the `*EventHandler` types can provide the event handler type at the same time:

```tsx
const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
  setValue(event.currentTarget.value);
}, [setValue])
```

- DOM events: the event type can often be inferred from the handler; when extracting a function to pass to an event handler, set the type explicitly. If an event is not in the list, use `React.SyntheticEvent`, the base type for all events.

```tsx
function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
  setValue(event.currentTarget.value);
}
```

- Children: `React.ReactNode` is a union of all the possible types that can be passed as children in JSX; `React.ReactElement` is only JSX elements and not JavaScript primitives like strings or numbers. You cannot use TypeScript to describe that children are a certain type of JSX elements (e.g. only `<li>`).

```ts
interface ModalRendererProps {
  title: string;
  children: React.ReactNode;
}
```

- Style props: use `React.CSSProperties` to describe the object passed to the `style` prop.

```ts
interface MyComponentProps {
  style: React.CSSProperties;
}
```

- The full set of types comes from the `@types/react` package (React's folder in DefinitelyTyped).
- Further learning: the TypeScript handbook, the TypeScript release notes, the community-maintained React TypeScript Cheatsheet, and the TypeScript Community Discord.

## Related

- [useState](../hooks/useState.md)
- [useReducer](../hooks/useReducer.md)
- [useContext](../hooks/useContext.md)
- [useMemo](../hooks/useMemo.md)
- [useCallback](../hooks/useCallback.md)
