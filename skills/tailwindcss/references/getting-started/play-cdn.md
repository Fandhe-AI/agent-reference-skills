---
source: https://tailwindcss.com/docs/installation/play-cdn
---

# Play CDN

Use the Play CDN to try Tailwind right in the browser without any build step. The Play CDN is designed for development purposes only, and is not intended for production.

## Signature / Usage

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
  </body>
</html>
```

## Steps

1. Add the Play CDN script tag to the `<head>` of your HTML file, and start using Tailwind's utility classes to style your content (see above).

2. Try adding some custom CSS. Use `type="text/tailwindcss"` to add custom CSS that supports all of Tailwind's CSS features.

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style type="text/tailwindcss">
      @theme {
        --color-clifford: #da373d;
      }
    </style>
  </head>
  <body>
    <h1 class="text-3xl font-bold underline text-clifford">
      Hello world!
    </h1>
  </body>
</html>
```

## Notes

- Development use only; not intended for production.
- Transcribed from `tailwindlabs/tailwindcss.com@7f92c22` `src/app/(docs)/docs/installation/(tabs)/play-cdn/page.tsx` (fetched 2026-10-16).

## Related

- [Tailwind CLI](./tailwind-cli.md)
- [Using Vite](./using-vite.md)
