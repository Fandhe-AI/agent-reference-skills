# Strings

String validation, transforms, and format schemas in Zod.

## Signature / Usage

```typescript
z.string(): ZodString
```

## String Validations

```typescript
import { z } from "zod";

z.string().max(5);
z.string().min(5);
z.string().length(5);
z.string().regex(/^[a-z]+$/);
z.string().startsWith("aaa");
z.string().endsWith("zzz");
z.string().includes("---");
z.string().uppercase();
z.string().lowercase();
```

Length is measured in Unicode code points, not UTF-16 code units. Emoji outside the Basic Multilingual Plane count as one, and combining marks and ZWJ sequences count as several.

```typescript
z.string().length(1).parse("😀"); // one code point, two UTF-16 units
z.string().length(2).parse("é"); // "é" — an e plus a combining acute
z.string().length(3).parse("🧑‍🍼"); // person + ZWJ + baby bottle
```

All validation APIs support the `error` parameter for customizing the error message:

```typescript
z.string().startsWith("fourscore", { error: "Nice try, buddy" });
```

## String Transforms

```typescript
import { z } from "zod";

z.string().trim();         // trim whitespace
z.string().toLowerCase();  // convert to lowercase
z.string().toUpperCase();  // convert to uppercase
z.string().normalize();    // normalize unicode characters
```

## String Formats

Zod provides built-in string format validators as top-level functions:

```typescript
import { z } from "zod";

z.email();
z.uuid();
z.url();
z.httpUrl();        // http or https URLs only
z.hostname();
z.e164();           // E.164 phone number format
z.emoji();          // validates a single emoji character
z.base64();
z.base64url();
z.hex();
z.jwt();
z.nanoid();
z.cuid();
z.cuid2();
z.ulid();
z.ipv4();
z.ipv6();
z.mac();
z.cidrv4();         // ipv4 CIDR block
z.cidrv6();         // ipv6 CIDR block
z.hash("sha256");   // or "sha1", "sha384", "sha512", "md5"
z.creditCard();     // 12-19 digits + Luhn checksum
z.currencyCode();   // ISO 4217 three-letter code
z.iban();           // electronic-format IBAN + MOD 97-10 checksum
z.iso.date();
z.iso.time();
z.iso.datetime();
z.iso.duration();
```

### Emails

```typescript
import { z } from "zod";

z.email();
```

By default, Zod uses a strict email regex designed to validate common email addresses. To customize validation:

```typescript
z.email({ pattern: /your regex here/ });
```

Zod exports several useful email regexes:

```typescript
// Zod's default email regex
z.email();
z.email({ pattern: z.regexes.email }); // equivalent

// browser input[type=email] regex
z.email({ pattern: z.regexes.html5Email });

// RFC 5322 regex (emailregex.com)
z.email({ pattern: z.regexes.rfc5322Email });

// loose regex that allows Unicode (good for intl emails)
z.email({ pattern: z.regexes.unicodeEmail });
```

### UUIDs

```typescript
import { z } from "zod";

z.uuid();

// specify a particular UUID version ("v1" through "v8")
z.uuid({ version: "v4" });

// convenience aliases
z.uuidv4();
z.uuidv6();
z.uuidv7();
```

### GUIDs

The RFC 9562/4122 UUID spec requires the first two bits of byte 8 to be `10`. To validate any UUID-like identifier without this constraint:

```typescript
z.guid();
```

### URLs

```typescript
import { z } from "zod";

const schema = z.url();

schema.parse("https://example.com");        // passes
schema.parse("http://localhost");            // passes
schema.parse("mailto:noreply@zod.dev");     // passes
```

Internally this uses the `new URL()` constructor. To validate the hostname or protocol against a regex:

```typescript
// validate hostname
const schema = z.url({ hostname: /^example\.com$/ });

// validate protocol
const schema = z.url({ protocol: /^https$/ });
```

For validating web URLs specifically, use `z.httpUrl()`:

```typescript
z.httpUrl();

// equivalent to
z.url({
  protocol: /^https?$/,
  hostname: z.regexes.domain
});
```

This restricts the protocol to `http`/`https` and ensures the hostname is a valid domain name with the `z.regexes.domain` regular expression:

```typescript
/^(?=.{1,253}$)([a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,63}$/
```

To normalize URLs with the `normalize` flag:

```typescript
const schema = z.url({ normalize: true });
// "HTTP://ExAmPle.com:80/./a/../b?X=1#f oo" => "http://example.com/b?X=1#f%20oo"
```

### ISO Datetimes

Enforces ISO 8601. By default, no timezone offsets are allowed:

```typescript
import { z } from "zod";

const datetime = z.iso.datetime();

datetime.parse("2020-01-01T06:15:00Z");           // passes
datetime.parse("2020-01-01T06:15:00.123Z");       // passes
datetime.parse("2020-01-01T06:15:00.123456Z");    // passes (arbitrary precision)
datetime.parse("2020-01-01T06:15:00+02:00");      // fails (offsets not allowed)
datetime.parse("2020-01-01T06:15:00");             // fails (local not allowed)
```

Options:

```typescript
// allow timezone offsets
z.iso.datetime({ offset: true });

// allow unqualified (timezone-less) datetimes
z.iso.datetime({ local: true });
```

Unqualified datetimes with `local: true` may omit seconds; a `Z` or an offset requires them:

```typescript
const schema = z.iso.datetime({ local: true });
schema.parse("2020-01-01T06:15:01");  // passes
schema.parse("2020-01-01T06:15");     // passes (seconds optional)
schema.parse("2020-01-01T06:15:00Z"); // passes
schema.parse("2020-01-01T06:15Z");    // fails (a `Z` requires seconds)
```

To constrain the allowable time `precision`. By default, seconds are required and sub-second precision is arbitrary. RFC 3339 mandates the seconds wherever a `Z` or an offset is present, so only the unqualified form `local` adds may omit them.

```typescript
const a = z.iso.datetime();
a.parse("2020-01-01T06:15Z");        // fails (seconds required)
a.parse("2020-01-01T06:15:00Z");     // passes
a.parse("2020-01-01T06:15:00.123Z"); // passes

const b = z.iso.datetime({ precision: -1 }); // minute precision (no seconds)
b.parse("2020-01-01T06:15Z");        // passes
b.parse("2020-01-01T06:15:00Z");     // fails
b.parse("2020-01-01T06:15:00.123Z"); // fails

const c = z.iso.datetime({ precision: 0 }); // second precision only
c.parse("2020-01-01T06:15Z");        // fails
c.parse("2020-01-01T06:15:00Z");     // passes
c.parse("2020-01-01T06:15:00.123Z"); // fails

const d = z.iso.datetime({ precision: 3 }); // millisecond precision only
d.parse("2020-01-01T06:15Z");        // fails
d.parse("2020-01-01T06:15:00Z");     // fails
d.parse("2020-01-01T06:15:00.123Z"); // passes
```

To accept minute precision alongside the rest, union the two; no single `precision` covers both:

```typescript
const mixed = z.union([z.iso.datetime(), z.iso.datetime({ precision: -1 })]);
mixed.parse("2020-01-01T06:15Z");        // passes
mixed.parse("2020-01-01T06:15:00.123Z"); // passes
mixed.parse("2020-01-01T06:15");         // fails (still qualified-only)
```

### ISO Dates

Validates strings in the format `YYYY-MM-DD`:

```typescript
import { z } from "zod";

const date = z.iso.date();

date.parse("2020-01-01");  // passes
date.parse("2020-1-1");    // fails
date.parse("2020-01-32");  // fails
```

### ISO Times

Validates strings in the format `HH:MM[:SS[.s+]]`. Seconds are optional by default:

```typescript
import { z } from "zod";

const time = z.iso.time();

time.parse("03:15");            // passes
time.parse("03:15:00");         // passes
time.parse("03:15:00.9999999"); // passes (arbitrary precision)
time.parse("03:15:00Z");        // fails (no Z allowed)
time.parse("03:15:00+02:00");   // fails (no offsets allowed)
```

Precision options:

```typescript
z.iso.time({ precision: -1 }); // HH:MM (minute precision)
z.iso.time({ precision: 0 });  // HH:MM:SS (second precision)
z.iso.time({ precision: 3 });  // HH:MM:SS.sss (millisecond precision)
```

### Phone Numbers (E.164)

```typescript
import { z } from "zod";

const phone = z.e164();

phone.parse("+15555555555"); // passes
phone.parse("555-555-5555"); // fails
```

The schema validates strings with a leading `+`, a non-zero country code, and 7 to 15 digits total.

### Hostnames

```typescript
import { z } from "zod";

z.hostname();
```

### IP Addresses

```typescript
import { z } from "zod";

const ipv4 = z.ipv4();
ipv4.parse("192.168.0.0"); // passes

const ipv6 = z.ipv6();
ipv6.parse("2001:db8:85a3::8a2e:370:7334"); // passes
```

### IP Blocks (CIDR)

```typescript
import { z } from "zod";

const cidrv4 = z.cidrv4();
cidrv4.parse("192.168.0.0/24"); // passes

const cidrv6 = z.cidrv6();
cidrv6.parse("2001:db8::/32");  // passes
```

### MAC Addresses

Validate standard 48-bit MAC addresses (IEEE 802):

```typescript
import { z } from "zod";

const mac = z.mac();
mac.parse("00:1A:2B:3C:4D:5E");  // passes
mac.parse("00-1a-2b-3c-4d-5e");  // fails (colon-delimited by default)
mac.parse("00:1A:2b:3C:4d:5E");  // fails (no mixed case)

// custom delimiter
const dashMac = z.mac({ delimiter: "-" });
dashMac.parse("00-1A-2B-3C-4D-5E"); // passes
```

### Credit card numbers

Validate a card number: 12 to 19 digits with a valid Luhn checksum. The issuer is not identified, so cards from any scheme are accepted.

```typescript
const card = z.creditCard();
card.parse("4111111111111111");     // passes
card.parse("4111 1111 1111 1111");  // passes (single spaces)
card.parse("4111-1111-1111-1111");  // passes (single hyphens)
card.parse("4111  1111 1111 1111"); // fails (no repeated separators)
card.parse(" 4111111111111111");    // fails (no surrounding whitespace)
card.parse("4111.1111.1111.1111");  // fails (spaces and hyphens only)
card.parse("4111111111111112");     // fails (failed checksum)
```

### Currency codes

The `z.currencyCode()` method validates three-letter ISO 4217 currency codes.

```typescript
const currency = z.currencyCode();

currency.parse("USD"); // passes
currency.parse("usd"); // fails
currency.parse("ANG"); // fails (withdrawn from ISO 4217)
```

### IBANs

Validate an International Bank Account Number (IBAN): 2-letter country code, 2 check digits, and 11 to 30 alphanumeric characters with a valid ISO 7064 MOD 97-10 checksum. The country registry is not consulted, so any country code is accepted and no country's own account length is enforced. Electronic format only.

```typescript
const iban = z.iban();
iban.parse("DE89370400440532013000");      // passes
iban.parse("NO9386011117947");             // passes
iban.parse("DE89 3704 0044 0532 0130 00"); // fails (no spaces)
iban.parse("de89370400440532013000");      // fails (uppercase only)
iban.parse("DE89370400440532013001");      // fails (failed checksum)
iban.parse("DE00000000000000000066");      // fails (check digits are always 02-98)
```

### JWTs

```typescript
import { z } from "zod";

z.jwt();
z.jwt({ alg: "HS256" });
```

### Hashes

```typescript
import { z } from "zod";

z.hash("md5");
z.hash("sha1");
z.hash("sha256");
z.hash("sha384");
z.hash("sha512");

// specify encoding (default is "hex")
z.hash("sha256", { enc: "hex" });       // hexadecimal (default)
z.hash("sha256", { enc: "base64" });    // base64 encoding
z.hash("sha256", { enc: "base64url" }); // base64url encoding (no padding)
```

### Custom String Formats

Define your own string formats using `z.stringFormat()`:

```typescript
import { z } from "zod";

const coolId = z.stringFormat("cool-id", (val) => {
  return val.length === 100 && val.startsWith("cool-");
});

// a regex is also accepted
z.stringFormat("cool-id", /^cool-[a-z0-9]{95}$/);
```

Custom formats produce `"invalid_format"` issues, which are more descriptive than the `"custom"` errors produced by refinements.

## Template Literals

Define template literal schemas (introduced in Zod 4):

```typescript
import { z } from "zod";

const schema = z.templateLiteral(["hello, ", z.string(), "!"]);
// `hello, ${string}!`

z.templateLiteral(["hi there"]);
// `hi there`

z.templateLiteral(["email: ", z.string()]);
// `email: ${string}`

z.templateLiteral(["high", z.literal(5)]);
// `high5`

z.templateLiteral([z.nullable(z.literal("grassy"))]);
// `grassy` | `null`

z.templateLiteral([z.number(), z.enum(["px", "em", "rem"])]);
// `${number}px` | `${number}em` | `${number}rem`
```

Any schema with an inferred type assignable to `string | number | bigint | boolean | null | undefined` can be passed as an element.

## Notes
- All string validations support a custom `error` parameter for error messages
- String format validators (e.g. `z.email()`) are top-level functions, not methods on `z.string()`
- `z.iso.datetime()` uses regex-based validation -- not as strict as a full date/time library
- `z.url()` internally uses the `new URL()` constructor; behavior may differ across runtimes
- `z.mac()` is colon-delimited and case-sensitive by default
- `z.hash()` expects hexadecimal encoding by default
- `z.e164()` validates E.164 phone numbers (leading `+`, non-zero country code, 7-15 digits total)
- Template literals are new in Zod 4
- Email regex: the pattern shown by the docs is the pre-4.6 form. Since 4.6 `z.email()` dropped its two lookaheads and expresses the no-empty-segment rule structurally; accepted/rejected inputs are unchanged. `z.regexes.email` now has no capture groups, `issue.pattern` on a failed `z.email()` and the `pattern` emitted by `z.toJSONSchema()` changed (no lookahead), and in a template literal the no-consecutive-dots rule no longer applies to the rest of the string
- Zod 4.5: `z.iso.datetime()` (and with `offset: true`) requires seconds; `"2020-01-01T06:15Z"` is rejected (accepted in 4.4). `local: true` still admits `"2020-01-01T06:15"`
- Zod 4.5: `.min()` / `.max()` / `.length()` count Unicode code points instead of UTF-16 code units. `.max()` only loosens; `.min()` and `.length()` tighten for astral input
- Zod 4.5 stricter formats: `z.ipv6()` checks the address alphabet directly instead of handing the string to `new URL()`; `z.ulid()` restricts the first character to `0`-`7`; `z.httpUrl()` enforces RFC 1035 host length limits
- Zod 4.5 adds `z.creditCard()`; `z.iban()` is new in 4.6; `z.currencyCode()` is new in 4.6.4 (per the v4.6.4 release notes)
- Zod 4.6: `z.emoji()` rejects component-only strings such as `"123"`, `"#"`, `"*"`, or a lone ZWJ / variation selector / skin tone modifier
- Zod 4.6: the runtime patterns of `z.base64()` / `z.base64url()` are character sets, with length and padding checked in code. In a template literal only the alphabet is checked, not the length. `z.toJSONSchema()` output is unchanged
- Zod 4.6.4: a bare `z.url()` validates with `URL.canParse()`; with `hostname` / `protocol` / `normalize` it uses `URL.parse()`

## Related
- [Primitives](../api/primitives.md)
- [Numbers](../api/numbers.md)
- [Transforms and Refinements](../api/transforms-and-refinements.md)
