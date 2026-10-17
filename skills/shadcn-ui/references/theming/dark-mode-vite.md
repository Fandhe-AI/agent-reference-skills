---
source: https://ui.shadcn.com/docs/dark-mode/vite
---

# Dark Mode: Vite

Adding dark mode to your Vite app with a hand-written theme provider that toggles the `light` / `dark` class on `<html>`.

## Signature / Usage

```tsx
// components/theme-provider.tsx
import { createContext, useContext, useEffect, useState } from "react"

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

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
```

Wrap the app:

```tsx
// App.tsx
import { ModeToggle } from "@/components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* your app */}
      <ModeToggle />
    </ThemeProvider>
  )
}

export default App
```

Mode toggle (`components/mode-toggle.tsx`) uses `useTheme` from `@/components/theme-provider`:

```tsx
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## Options / Props

`ThemeProvider` props:

| Name | Type | Description |
| --- | --- | --- |
| `children` | `React.ReactNode` | App content. |
| `defaultTheme` | `"dark" \| "light" \| "system"` | Initial theme when nothing is stored. Defaults to `"system"`. |
| `storageKey` | `string` | localStorage key. Defaults to `"vite-ui-theme"`. |

## Notes

- The `DropdownMenuTrigger asChild` usage in the toggle is the source's Radix-style example as written; with the default Base UI components use the `render` prop instead (e.g. `<DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>`), or install the Radix variant.
- The source example reads `matchMedia("(prefers-color-scheme: dark)").matches` once when `system` is selected; it does not subscribe to the `MediaQueryList` `change` event, so an OS color-scheme change is not reflected until the theme is set again. Adapted (not in the official docs): add `mql.addEventListener("change", handler)` inside the effect and remove it in the cleanup when `theme === "system"`.
- Adapted (not in the official docs): the official App.tsx renders an undefined `{children}`; replaced with the app content (`<ModeToggle />`).
- Framework APIs themselves are in skills nextjs-app / react-router / tanstack-start / tanstack-router.

## Related

- [Dark Mode](./dark-mode.md)
- [Theming](./theming.md)
