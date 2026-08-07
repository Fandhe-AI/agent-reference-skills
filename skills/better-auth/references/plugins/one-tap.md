# One Tap

The One Tap plugin enables single-interaction authentication using Google's One Tap API. It supports both an automatic prompt display and a custom button rendering mode.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { oneTap } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        oneTap(),
    ]
})
```

### Setup (client side)

```typescript
import { createAuthClient } from "better-auth/client"
import { oneTapClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    plugins: [
        oneTapClient({
            clientId: "YOUR_CLIENT_ID",
            autoSelect: false,
            cancelOnTapOutside: true,
            context: "signin",
            additionalOptions: {},
            promptOptions: {
                baseDelay: 1000,
                maxAttempts: 5
            }
        })
    ]
})
```

### Prompt mode (default)

```typescript
await authClient.oneTap()
```

Automatically displays the Google One Tap popup.

### Button mode (Vanilla JavaScript)

```typescript
await authClient.oneTap({
    button: {
        container: "#google-signin-button",
        config: {
            theme: "outline",
            size: "large",
            type: "standard",
            text: "signin_with"
        }
    }
})
```

### Button mode (React)

```typescript
function SignInButton() {
    const buttonRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (buttonRef.current) {
            authClient.oneTap({
                button: {
                    container: buttonRef.current,
                    config: { theme: "filled_blue", size: "large" }
                }
            })
        }
    }, [])

    return <div ref={buttonRef}></div>
}
```

### Customizing redirect behavior

```typescript
// Avoid a hard reload
await authClient.oneTap({
    fetchOptions: {
        onSuccess: () => {
            router.push("/dashboard")
        }
    }
})

// Custom callback URL
await authClient.oneTap({
    callbackURL: "/dashboard"
})
```

### Handling prompt dismissal

```typescript
await authClient.oneTap({
    onPromptNotification: (notification) => {
        console.warn("Prompt dismissed.", notification)
        // Show an alternative auth UI
    }
})
```

Automatically retries with exponential backoff. The callback is notified once `maxAttempts` is reached.

## Options / Props

### Server options

| Option | Type | Default | Description |
|---|---|---|---|
| `disableSignUp` | boolean | false | Restricts authentication to existing users only |
| `clientId` | string | - | Google OAuth client ID (optional) |

### Client configuration options

| Option | Type | Default | Description |
|---|---|---|---|
| `clientId` | string | required | Google OAuth client ID |
| `autoSelect` | boolean | false | Auto-select the account when already signed in |
| `cancelOnTapOutside` | boolean | true | Close the prompt when tapping outside |
| `uxMode` | string | "popup" | Flow mode: "popup" or "redirect" |
| `context` | string | "signin" | Usage context: "signin", "signup", "use" |
| `additionalOptions` | object | {} | Additional Google Identity Services options |
| `promptOptions.baseDelay` | number | 1000 | Retry delay (milliseconds) |
| `promptOptions.maxAttempts` | number | 5 | Maximum prompt attempts before the callback fires |
| `promptOptions.fedCM` | boolean | true | Clear FedCM state on sign-out |

### Button configuration options

| Option | Type | Default | Values |
|---|---|---|---|
| `type` | string | "standard" | "standard", "icon" |
| `theme` | string | "outline" | "outline", "filled_blue", "filled_black" |
| `size` | string | "large" | "large", "medium", "small" |
| `text` | string | "signin_with" | "signin_with", "signup_with", "continue_with", "signin" |
| `shape` | string | "rectangular" | "rectangular", "pill", "circle", "square" |
| `logo_alignment` | string | "left" | "left", "center" |
| `width` | number | undefined | up to 400 pixels |
| `locale` | string | undefined | language code (e.g. "zh_CN") |

## Notes

- Requires accurate Authorized JavaScript Origins configuration in Google Cloud Console (e.g. http://localhost:3000, https://example.com)
- When `promptOptions.fedCM` is enabled (default), `navigator.credentials.preventSilentAccess()` is called on sign-out
- When FedCM is active, `cancelOnTapOutside` may not work (the browser manages the close behavior)
