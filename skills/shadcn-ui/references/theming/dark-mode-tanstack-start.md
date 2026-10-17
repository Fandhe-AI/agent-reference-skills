---
source: https://ui.shadcn.com/docs/dark-mode/tanstack-start
---

# Dark Mode: TanStack Start

Adding dark mode to your TanStack Start app. Uses `ScriptOnce` from `@tanstack/react-router` to inject a script that runs before React hydrates, preventing a flash of unstyled content (FOUC).

## Signature / Usage

Theme provider (`components/theme-provider.tsx`):

```tsx
import { createContext, useContext, useEffect, useState } from "react"
import { ScriptOnce } from "@tanstack/react-router"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

function getThemeScript(storageKey: string, defaultTheme: Theme) {
  const key = JSON.stringify(storageKey)
  const fallback = JSON.stringify(defaultTheme)

  return `(function(){try{var t=localStorage.getItem(${key});if(t!=='light'&&t!=='dark'&&t!=='system'){t=${fallback}}var d=matchMedia('(prefers-color-scheme: dark)').matches;var r=t==='system'?(d?'dark':'light'):t;var e=document.documentElement;e.classList.add(r);e.style.colorScheme=r}catch(e){}})();`
}

const ThemeProviderContext = createContext<ThemeProviderState>({
  theme: "system",
  setTheme: () => {},
})

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.classList.remove("light", "dark")

  const resolved =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme

  root.classList.add(resolved)
  root.style.colorScheme = resolved
}

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(storageKey)
    setThemeState(
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : defaultTheme
    )
    setMounted(true)
  }, [defaultTheme, storageKey])

  useEffect(() => {
    if (!mounted) return
    applyTheme(theme)
  }, [theme, mounted])

  useEffect(() => {
    if (!mounted || theme !== "system") return

    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => applyTheme("system")
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [theme, mounted])

  const setTheme = (next: Theme) => {
    localStorage.setItem(storageKey, next)
    setThemeState(next)
  }

  return (
    <ThemeProviderContext value={{ theme, setTheme }}>
      <ScriptOnce>{getThemeScript(storageKey, defaultTheme)}</ScriptOnce>
      {children}
    </ThemeProviderContext>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
```

Root layout (`src/routes/__root.tsx`); add `suppressHydrationWarning` to the `html` tag:

```tsx
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router"

import { ThemeProvider } from "@/components/theme-provider"

export const Route = createRootRoute({
  head: () => ({
    // ...
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <Outlet />
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}
```

Mode toggle (`components/mode-toggle.tsx`) has the same shape as the Vite guide, importing `useTheme` from `@/components/theme-provider` and calling `setTheme("light" | "dark" | "system")` from `DropdownMenuItem` `onClick` handlers:

```tsx
import { useTheme } from "@/components/theme-provider"

const { setTheme } = useTheme()
```

## Options / Props

`ThemeProvider` props:

| Name | Type | Description |
| --- | --- | --- |
| `children` | `React.ReactNode` | App content. |
| `defaultTheme` | `"dark" \| "light" \| "system"` | Initial theme when nothing valid is stored. Defaults to `"system"`. |
| `storageKey` | `string` | localStorage key. Defaults to `"theme"`. |

## Notes

- Framework APIs themselves are in skills nextjs-app / react-router / tanstack-start / tanstack-router.

## Related

- [Dark Mode](./dark-mode.md)
- [Vite](./dark-mode-vite.md)
- [Theming](./theming.md)
