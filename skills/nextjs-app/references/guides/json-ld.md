# JSON-LD

Structured data (JSON-LD) helps search engines and AI understand page content beyond raw text; render it as a `<script type="application/ld+json">` inside `layout.js`/`page.js`.

## Signature / Usage

```tsx filename="app/products/[id]/page.tsx"
export default async function Page({ params }) {
  const { id } = await params
  const product = await getProduct(id)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image,
    description: product.description,
  }

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
    </section>
  )
}
```

## Notes

- `JSON.stringify` does not sanitize against XSS — escape `<` to `<` (or use a library like `serialize-javascript`) before injecting.
- Type JSON-LD payloads with the community package `schema-dts` (`WithContext<Product>`, etc.).
- Validate output with Google's Rich Results Test or the generic Schema Markup Validator.
- Use a native `<script>` tag, not `next/script` — JSON-LD is structured data, not executable code that needs `next/script`'s loading optimizations.

## Related

- [MDX](./mdx.md)
