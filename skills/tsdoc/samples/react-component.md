# React Component Comment

Document a React component with per-property TSDoc on the Props interface.

```tsx
import type { ComponentProps } from "react";

interface Props extends ComponentProps<"button"> {
  /** Visual style variant */
  variant?: "primary" | "secondary";
  /** Shows a loading spinner and disables the button */
  loading?: boolean;
}

/**
 * Accessible button with variant and loading state support.
 *
 * @remarks
 * Forwards all native `<button>` attributes via rest props.
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleSubmit}>
 *   Submit
 * </Button>
 *
 * <Button loading>Processing…</Button>
 * ```
 *
 * @category UI
 */
const Button = ({ variant = "primary", loading, children, ...rest }: Props) => {
  return (
    <button disabled={loading} {...rest}>
      {children}
    </button>
  );
};

export default Button;
```

## Notes

- Write the component-level TSDoc directly above the `const Component = ...` definition, not above the Props interface
- Document each Props property with its own `/** ... */` inline comment; do not use `@param` for props
- Place `@remarks` after the summary line, separated by a blank line, for extended descriptions
- Use `@category UI` (or another unified category name) to group components in generated docs
