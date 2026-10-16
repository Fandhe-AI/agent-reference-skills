# Macro Follow-Set Ambiguity Formal Specification

Formal specification of the follow rules for Macros By Example, originally specified in RFC 550 and expanded in subsequent RFCs.

## Signature / Usage

`(start $foo:expr $($i:ident),* end)` is a matcher: a delimited sequence with simple NTs `$foo` (`expr`) and `$i` (`ident`), plus a complex NT `$($i:ident),*` whose separator token is `,`.

```rust
macro_rules! i_am_an_mbe {
    (start $foo:expr $($i:ident),* end) => ($foo)
}
```

(The original marks this example `compile_fail`; it is illustrative of the terminology only.)

## Options / Props

### Definitions

| Term | Meaning |
|------|---------|
| macro | anything invocable as `foo!(...)` |
| MBE | macro-by-example, defined by `macro_rules` |
| matcher | left-hand side of a `macro_rules` rule, or a subportion |
| fragment | class of Rust syntax a matcher accepts |
| NT | non-terminal; meta-variables or repetition matchers with leading `$` |
| simple NT | meta-variable non-terminal |
| complex NT | repetition non-terminal using `*`, `+`, `?` |
| token | atomic element of a matcher: identifiers, operators, delimiters, and simple NTs |
| token tree | tree of tokens (leaves), complex NTs, and finite sequences of token trees |
| separator token | optional delimiter token in a complex NT between matched repetition elements |
| empty fragment | invisible syntax separating tokens (whitespace, or the empty token sequence) |
| fragment specifier | identifier in a simple NT specifying which fragment it accepts |

Only a complex NT can match the empty fragment; `vis` can too, so `$v:vis` is treated as `$($v:vis)?`.

### FOLLOW sets

FOLLOW sets for simple NTs:

| Fragment | FOLLOW |
|----------|--------|
| `pat_param` (and `pat` before the 2021 edition) | `=>`, `,`, `=`, `\|`, `if`, `in` |
| `pat` (2021 edition and later) | `=>`, `,`, `=`, `if`, `in` |
| `expr`, `expr_2021`, `stmt` | `=>`, `,`, `;` |
| `ty`, `path` | `{`, `[`, `,`, `=>`, `:`, `=`, `>`, `>>`, `;`, `\|`, `as`, `where`, block nonterminals |
| `vis` | `,`, any keyword or identifier except a non-raw `priv`; any token that can begin a type; `ident`, `ty`, `path` nonterminals |
| other (block, ident, tt, item, lifetime, literal, meta, and all terminals) | ANYTOKEN |

FOLLOW(M) for any other M is the intersection of FOLLOW(t) as t ranges over LAST(M) \ {ε}.

## Notes

- The "tokens that can begin a type" list in the original is explicitly noted as possibly incomplete.
- Condensed: the original's tree-structured FIRST/LAST worked examples and the justification prose are omitted; see the official page for the full derivation.
- The formal spec text (from RFC 550) lists `|` in FOLLOW(pat); since Rust 2021 `pat` accepts top-level or-patterns and may not be followed by `|` — see the normative follow-set restrictions in Macros By Example (macros.md).
- Source: https://doc.rust-lang.org/reference/macro-ambiguity.html (pinned: https://raw.githubusercontent.com/rust-lang/reference/82da570bafd9efed421bdbae0f8603ede8dd308b/src/macro-ambiguity.md)

### Matcher invariants

For a matcher to be valid:

1. For successive token tree sequences `M = ... tt uu ...` with `uu ...` nonempty: FOLLOW(`... tt`) ∪ {ε} ⊇ FIRST(`uu ...`).
2. For a separated complex NT `$(tt ...) SEP OP`: `SEP` ∈ FOLLOW(`tt ...`).
3. For an unseparated complex NT `$(tt ...) OP` with OP `*` or `+`: FOLLOW(`tt ...`) ⊇ FIRST(`tt ...`).

The third invariant is currently unenforced due to historical oversight and significant reliance on the behaviour; macros that do not respect it may become invalid in a future edition of Rust (tracking issue rust-lang/rust#56575).

### FIRST, LAST, FOLLOW

- FIRST(M): tokens potentially used first when matching M. LAST(M): tokens potentially used last. FOLLOW(M): tokens allowed to follow immediately after a fragment matched by M. FIRST and LAST may contain ε; FOLLOW never does. ANYTOKEN is the set of all tokens (including simple NTs).
- FIRST(empty) = { ε }; FIRST(token t ...) = { t }; for a complex NT, FIRST(M) = (FIRST(`tt ...`) \ {ε}) ∪ SEP_SET(M) ∪ ALPHA_SET(M), where ALPHA_SET(M) = FIRST(α) for OP `*` or `?`, and {} for `+`.
- LAST is defined by case analysis (empty, token, `*`, `+`, `?`, delimited sequence, sequence).

### Examples of valid and invalid matchers

- `($ty:ty < foo ,)`: illegal, FIRST(`< foo ,`) = { `<` } is not within FOLLOW(`ty`).
- `($ty:ty , foo <)`: legal.
- `($pa:pat $pb:pat $ty:ty ,)`: illegal.
- `( $($a:tt $b:tt)* ; )`: legal.
- `($ty:ty $(; not sep)* -)`: illegal.
- `($($ty:ty)-+)`: illegal, separator `-` is not in FOLLOW(`ty`).
- `($($e:expr)*)`: illegal, expr NTs are not in FOLLOW(expr NT).

## Related

- [macros.md](./macros.md)
- [lexical-structure.md](./lexical-structure.md)
- [syntax-index.md](./syntax-index.md)
