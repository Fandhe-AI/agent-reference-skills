---
source: https://ui.shadcn.com/docs/components/base/typography
---

# Typography

Styles for headings, paragraphs, lists, etc. shadcn/ui ships no typography styles by default; the page is an example of styling text with utility classes.

## Signature / Usage

```tsx
export function TypographyH1() {
  return (
    <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
      Taxing Laughter: The Joke Tax Chronicles
    </h1>
  )
}

export function TypographyH2() {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      The People of the Kingdom
    </h2>
  )
}
```

Paragraph and blockquote classes from the demo:

```tsx
<p className="leading-7 [&:not(:first-child)]:mt-6">...</p>
<blockquote className="mt-6 border-l-2 pl-6 italic">...</blockquote>
<ul className="my-6 ml-6 list-disc [&>li]:mt-2">...</ul>
```

## Notes

- Sections on the page: h1, h2, h3, h4, p, blockquote, table, list, Inline code, Lead, Large, Small, Muted.
- There is no `npx shadcn add` component for this page and no props; copy the class combinations.
- Radix variant: https://ui.shadcn.com/docs/components/radix/typography ; React Aria variant: https://ui.shadcn.com/docs/components/aria/typography
- This is the shadcn/ui copy-in pattern (classes live in your own code), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [table](./table.md)
- [kbd](./kbd.md)
