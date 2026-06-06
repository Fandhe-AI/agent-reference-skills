# Doc Comments

Annotate TypeScript exports with JSDoc/TSDoc-style comments for TypeDoc to pick up.

```typescript
/**
 * Represents a user in the system.
 *
 * @remarks
 * Handles authentication and profile management.
 * Implements the {@link IUser} interface.
 *
 * @example
 * ```ts
 * const user = new User("john", "john@example.com");
 * await user.authenticate();
 * console.log(user.isAuthenticated); // true
 * ```
 *
 * @see {@link AuthService} for authentication details
 * @since 1.0.0
 */
export class User implements IUser {
  /**
   * The user's display name.
   * @defaultValue `"Anonymous"`
   */
  name: string;

  /**
   * Creates a new User instance.
   *
   * @param username - The unique username
   * @param email - The user's email address
   * @throws {@link ValidationError} If the email is invalid
   */
  constructor(username: string, email: string) {}

  /**
   * Authenticates the user against the backend.
   *
   * @returns A promise resolving to `true` on success
   * @alpha
   */
  async authenticate(): Promise<boolean> {
    return true;
  }
}
```

## Notes

- Use fenced code blocks (triple backticks) inside comments; indented blocks do not prevent tag parsing.
- Backslash-escape `{`, `}`, `@`, and `/` when they must appear as literal characters.
- `@remarks` adds supplementary detail; `@summary` provides the one-line summary shown in indexes.
- Modifier tags like `@alpha`, `@beta`, `@deprecated`, and `@internal` control visibility and styling in the output.
