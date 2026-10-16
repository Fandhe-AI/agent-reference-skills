# Syntax Index

An index of tokens and common forms, each mapped to the language construct where it is defined.

## Signature / Usage

```rust
// Forms indexed by this appendix (see tables below)
let v = [1, 2, 3].iter().map(|n| n * 2).collect::<Vec<_>>(); // closures, turbofish
match v.first() { Some(&x) if x > 0 => {}, _ => {} }          // match guard, wildcard
```

## Options / Props

### Keywords

| Keyword | Use |
|---------|-----|
| `_` | wildcard pattern, inferred const, inferred type, placeholder lifetime, constant items, extern crate, use declarations, destructuring assignment |
| `as` | extern crate, use declarations, type cast expressions, qualified paths |
| `async` / `await` | async functions, async blocks, async closures / await expressions |
| `break` / `continue` | break expressions / continue expressions |
| `const` | const functions, const items, const generics, const blocks, raw borrow operator, raw pointer type, const assembly operands |
| `crate` / `self` / `super` / `Self` | extern crate, visibility, paths; self parameters, `self` paths; super paths; `Self` type paths, use bounds |
| `dyn` | trait objects |
| `else` / `if` / `match` | let statements, if expressions; if expressions, match guards; match expressions |
| `enum` / `struct` / `union` / `trait` / `type` | enumerations / structs / union items / trait items / type aliases |
| `extern` | extern crate, extern function qualifier, external blocks, extern function pointer types |
| `false` / `true` | boolean type, boolean expressions, configuration predicates |
| `fn` | functions, function pointer types |
| `for` | trait implementations, iterator loops, higher-ranked trait bounds |
| `impl` | inherent impls, trait impls, impl trait types, anonymous type parameters |
| `in` | visibility, iterator loops, assembly operands |
| `let` | let statements, `if let` patterns |
| `loop` / `while` | infinite loops / predicate loops |
| `macro_rules` | macros by example |
| `mod` | modules |
| `move` | closure expressions, async blocks |
| `mut` | borrow expressions, identifier patterns, reference patterns, struct patterns, reference types, raw pointer types, self parameters, static items |
| `pub` | visibility |
| `raw` | borrow expressions, raw assembly |
| `ref` | identifier patterns, struct patterns |
| `return` | return expressions |
| `safe` | external block functions, external block statics |
| `static` | static items, `'static` lifetimes |
| `unsafe` | unsafe blocks, attributes, modules, functions, external blocks / functions / statics, traits, trait implementations |
| `use` | use items, use bounds |
| `where` | where clauses |
| reserved | `abstract`, `become`, `box`, `do`, `final`, `gen`, `macro`, `override`, `priv`, `try`, `typeof`, `unsized`, `virtual`, `yield` |

### Operators and punctuation

| Symbol | Name | Use |
|--------|------|-----|
| `+` | Plus | addition, trait bounds, macro Kleene matcher |
| `-` | Minus | subtraction, negation |
| `*` | Star | multiplication, dereference, raw pointers, macro Kleene matcher, glob imports |
| `/` `%` `^` | Slash, Percent, Caret | division, remainder, bitwise and logical XOR |
| `!` | Not | bitwise and logical NOT, macro calls, inner attributes, never type, negative impls |
| `&` | And | bitwise AND, borrow, references, reference patterns |
| `\|` | Or | bitwise OR, closures, or patterns, if let, while let |
| `&&` / `\|\|` | AndAnd / OrOr | lazy AND (also borrow, references, reference patterns) / lazy OR, closures |
| `<<` `>>` | Shl, Shr | shifts, nested generics |
| `+=` `-=` `*=` `/=` `%=` `^=` `&=` `\|=` `<<=` `>>=` | compound assignment | compound assignment (`>>=` also nested generics) |
| `=` | Eq | assignment, let statements, attributes, various type definitions |
| `==` `!=` `>` `<` `>=` `<=` | comparison | comparison (`>`/`<` also generics, paths, use bounds) |
| `@` | At | subpattern binding |
| `.` | Dot | field access, tuple index, method calls, await expressions |
| `..` | DotDot | range expressions, struct expressions, rest pattern, range patterns, struct patterns |
| `...` | DotDotDot | variadic functions, range patterns |
| `..=` | DotDotEq | inclusive range expressions, range patterns |
| `,` `;` `:` | Comma, Semi, Colon | separators / terminators (`;` also array expressions and array types) |
| `::` | PathSep | path separator |
| `->` | RArrow | functions, closures, function pointer type |
| `=>` | FatArrow | match arms, macros |
| `<-` | LArrow | unused since before Rust 1.0 but still treated as a single token |
| `#` | Pound | attributes, raw string / byte string / C string literals |
| `$` | Dollar | macros |
| `?` | Question | try propagation expressions, relaxed trait bounds, macro Kleene matcher |
| `~` | Tilde | unused since before Rust 1.0, token may still be used |

### Comments

| Comment | Use |
|---------|-----|
| `//` | line comment |
| `//!` | inner line comment |
| `///` | outer line doc comment |
| `/*…*/` | block comment |
| `/*!…*/` | inner block doc comment |
| `/**…*/` | outer block doc comment |

### Other tokens

| Token | Use |
|-------|-----|
| `ident` / `r#ident` | identifiers / raw identifiers |
| `'ident` / `'r#ident` | lifetimes and loop labels / raw lifetimes and loop labels |
| `…u8`, `…i32`, `…f64`, `…usize` | number literals |
| `"…"` / `r"…"`, `r#"…"#` | string literals / raw string literals |
| `b"…"` / `br"…"`, `br#"…"#` | byte string literals / raw byte string literals |
| `'…'` / `b'…'` | character literals / byte literals |
| `c"…"` / `cr"…"`, `cr#"…"#` | C string literals / raw C string literals |

### Macros and attributes

| Syntax | Use |
|--------|-----|
| `ident!(…)`, `ident! {…}`, `ident![…]` | macro invocations |
| `$ident` | macro metavariable |
| `$ident:kind` | macro matcher fragment specifier |
| `$(…)…` | macro repetition |
| `#[meta]` | outer attribute |
| `#![meta]` | inner attribute |

### Expressions

| Expression | Use |
|------------|-----|
| `\|…\| expr`, `\|…\| -> Type { … }` | closures |
| `ident::…`, `::crate_name::…`, `crate::…`, `self::…`, `super::…` | paths, explicit crate paths, crate-relative / module-relative / parent module paths |
| `Type::…`, `<Type as Trait>::ident` | associated items |
| `<Type>::…` | qualified paths usable for unnamed types such as `<&T>::…`, `<[T]>::…` |
| `Trait::method(…)`, `Type::method(…)`, `<Type as Trait>::method(…)` | disambiguated method calls |
| `method::<…>(…)`, `path::<…>` | generic arguments, aka turbofish |
| `()`, `(expr)`, `(expr,)`, `(expr, …)` | unit, parenthesized, single-element tuple, tuple expressions |
| `expr(expr, …)` | call expressions |
| `expr.0`, `expr.ident` | tuple indexing, field access |
| `{…}`, `Type {…}`, `Type(…)` | block, struct expressions, tuple struct constructors |
| `[…]`, `[expr; len]` | array expressions, repeat array expressions |
| `expr[..]`, `expr[a..]`, `expr[..b]`, `expr[a..b]`, `expr[a..=b]`, `expr[..=b]` | array and slice indexing expressions |
| `if expr {…} else {…}` | if expressions |
| `match expr { pattern => {…} }` | match expressions |
| `loop {…}`, `while expr {…}`, `for pattern in expr {…}` | infinite loops, predicate loops, iterator loops |
| `&expr`, `&mut expr` | borrow expressions |
| `&raw const expr`, `&raw mut expr` | raw borrow expressions |
| `*expr`, `expr?`, `-expr`, `!expr`, `expr as Type` | dereference, try propagation, negation, bitwise/logical NOT, type cast |

### Items

| Item | Use |
|------|-----|
| `mod ident;`, `mod ident {…}` | modules |
| `use path;` | use declarations |
| `fn ident(…) {…}` | functions |
| `type Type = Type;` | type aliases |
| `struct ident {…}`, `enum ident {…}`, `union ident {…}`, `trait ident {…}` | structs, enumerations, unions, traits |
| `impl Type {…}`, `impl Trait for Type {…}` | implementations |
| `const ident = expr;`, `static ident = expr;` | constant items, static items |
| `extern "C" {…}` | external blocks |
| `fn ident<…>(…) …`, `struct ident<…> {…}`, `enum ident<…> {…}`, `impl<…> Type<…> {…}` | generic definitions |

### Type expressions

| Type | Use |
|------|-----|
| `bool`, `u8`, `f64`, `str`, … | primitive types |
| `for<…>` | higher-ranked trait bounds |
| `T: TraitA + TraitB`, `T: 'a + 'b`, `T: TraitA + 'a`, `T: ?Sized` | trait bounds, lifetime bounds, trait and lifetime bounds, relaxed trait bounds |
| `[Type; len]`, `(Type, …)`, `[Type]`, `(Type)` | array, tuple, slice, parenthesized types |
| `impl Trait`, `dyn Trait` | impl trait types / anonymous type parameters, trait object types |
| `ident`, `ident::…` | type paths |
| `Type<…>`, `Trait<…>` | generic arguments |
| `Trait<ident = Type>`, `Trait<ident: …>` | associated type bindings, associated type bounds |
| `&Type`, `&mut Type`, `*mut Type`, `*const Type` | reference types, raw pointer types |
| `fn(…) -> Type` | function pointer types |
| `_`, `'_`, `!` | inferred type / inferred const, placeholder lifetime, never type |

### Patterns

| Pattern | Use |
|---------|-----|
| `"foo"`, `'a'`, `123`, `2.4`, … | literal patterns |
| `ident`, `_`, `..` | identifier, wildcard, rest patterns |
| `a..`, `..b`, `a..b`, `a..=b`, `..=b` | range patterns |
| `&pattern`, `&mut pattern` | reference patterns |
| `path {…}`, `path(…)` | struct patterns, tuple struct patterns |
| `(pattern, …)`, `(pattern)`, `[pattern, …]` | tuple, grouped, slice patterns |
| `CONST`, `Enum::Variant`, … | path patterns |

## Notes

- Condensed from the original index: the original links each row to the defining section of the Reference; those cross-links are omitted here. See the corresponding pages in this category.
- The upstream Syntax Index lists `impl Type for Trait {…}` (order reversed); corrected here to `impl Trait for Type {…}`.
- Source: https://doc.rust-lang.org/reference/syntax-index.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/82da570bafd9efed421bdbae0f8603ede8dd308b/src/syntax-index.md)

## Related

- [lexical-structure.md](./lexical-structure.md)
- [macros.md](./macros.md)
- [patterns.md](./patterns.md)
- [statements-and-expressions.md](./statements-and-expressions.md)
- [items.md](./items.md)
