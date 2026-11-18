---
source: https://docs.cloud.google.com/eventarc/advanced/docs/receive-events/use-cel
---

# Use CEL in Eventarc Advanced

Common Expression Language (CEL) is an open source, non-Turing-complete expression language. Every Eventarc Advanced enrollment has a CEL condition expression that evaluates and filters messages; CEL is also used to control publishing access (a condition on an event context attribute) and to write transformation expressions for event data. Event context attributes are available through the predefined `message` object.

## Signature / Usage

### Enrollment match expression

A condition is one or more statements joined by `&&`, `||` or `!`. For example, if `message.type` is `google.cloud.dataflow.job.v1beta3.statusChanged`, the expression `message.type == "google.cloud.dataflow.job.v1beta3.statusChanged"` evaluates to `True`. The same expression with a time condition: `message.time.getFullYear() < 2020 && message.type == "google.cloud.dataflow.job.v1beta3.statusChanged"` requires both statements to be `True`.

```bash
gcloud eventarc enrollments create my-enrollment \
    --cel-match="message.type == 'google.cloud.dataflow.job.v1beta3.statusChanged'" \
    --destination-pipeline=my-pipeline \
    --message-bus=my-message-bus \
    --message-bus-project=another-google-cloud-project \
    --location=us-central1 \
    --async
```

Use `has(message.bucket)` to test whether the extension attribute `bucket` is set.

## Options / Props

### Available attributes (`message.*`)

| Attribute | Attribute type | Description |
|---|---|---|
| `message.datacontenttype` | `String` | The content type of the `data` value |
| `message.dataschema` | `URI` | Identifies the schema that the `data` adheres to |
| `message.id` | `String` | Identifies the event; producers must ensure that `source` + `id` is unique for each distinct event |
| `message.source` | `URI-reference` | Identifies the context in which an event happened |
| `message.specversion` | `String` | The version of the CloudEvents specification which the event uses |
| `message.subject` | `String` | Describes the subject of the event in the context of the event producer (identified by `source`) |
| `message.time` | `Timestamp` | Timestamp of when the occurrence happened; might be set to some other time (such as the current time) by the CloudEvents producer; however, all producers for the same `source` must be consistent |
| `message.type` | `String` | Describes the type of event related to the originating occurrence |

### Logical operators

| Expression | Description |
|---|---|
| `x == "my_string"` | `True` if `x` equals the string literal. |
| `x == R"my_string\n"` | `True` if `x` equals the raw string literal (escape sequences not interpreted; useful for regular expressions or program text). |
| `x == y` | `True` if `x` is equal to `y`. |
| `x != y` | `True` if `x` is not equal to `y`. |
| `x && y` | `True` if both `x` and `y` are `True`. |
| `x \|\| y` | `True` if `x`, `y`, or both are `True`. |
| `!x` | `True` if the boolean `x` is `False`, `False` if `x` is `True`. |
| `m['k']` | Value at key `k` in the string-to-string map `m`; if `k` is absent, an error that causes the rule under evaluation to not match. |

### String manipulation operators

| Expression | Description |
|---|---|
| `double(x)` | Converts the string result of `x` to `double`; only for values that can be floating-point numbers. |
| `int(x)` | Converts the string result of `x` to `int`; only for values that can be integers. |
| `x + y` | Concatenated string `xy`. |
| `x.contains(y)` | `True` if string `x` contains substring `y`. |
| `x.endsWith(y)` | `True` if `x` ends with `y`. |
| `x.join()` | Concatenates a string list, optional separator; `['hello', 'world'].join(' ')` returns `'hello world'`. |
| `x.lowerAscii()` | All ASCII characters lowercase. |
| `x.matches(y)` | `True` if `x` matches the RE2 pattern `y` (compiled with the RE2::Latin1 option, Unicode features disabled). |
| `x.replace(y,z)` | Replaces occurrences of `y` by `z`, optional limit; `'hello hello'.replace('he', 'we', 1)` returns `'wello hello'`. |
| `x.split(y)` | List split by separator `y`, optional limit; `'hello hello hello'.split(' ', 2)` returns `['hello', 'hello hello']`. |
| `x.startsWith(y)` | `True` if `x` begins with `y`. |
| `x.upperAscii()` | All ASCII characters uppercase. |

### Regular expression functions (RE2 syntax; `R` prefix marks a raw string)

| Expression | Description |
|---|---|
| `re.capture(target,regex)` | Captures the first unnamed or named group of `regex` in `target`, returns a string; `re.capture("hello", R"hell(o)")` returns `"o"`. |
| `re.captureN(target,regex)` | Returns a map of group name / index to captured string; `re.captureN("The user testuser belongs to testdomain", R"The (user\|domain) (?P<Username>.*) belongs to (?P<Domain>.*)")` returns `{"1": "user", "Username": "testuser", "Domain": "testdomain"}`. |
| `re.extract(target,regex,rewrite)` | Extracts matched groups formatted by `rewrite`; `re.extract("alex@example.com", "(^.*@)(.*)", "\\2")` returns `"example.com"`. |
| `x.matches(regex)` | `True` if `x` matches the RE2 pattern. |

## Notes

- Not allowed: `message.data` and `message.data_base64` are reserved variables; enrollments and publishing-access control can't evaluate event payload content. CEL on payload content is supported only when transforming event data.
- Custom CloudEvents extension attributes are usable but always typed `String` in CEL; cast with a CEL expression (for example `int(x)`).
- If an attribute is not set, any logical operation using it evaluates to `False` regardless of the literal value; "not set" differs from "set to empty".
- Don't put passwords, secrets or PII in CEL transformation expressions: they are service configuration data and don't have the data-security level of event payloads.
- Eventarc Advanced also supports extension functions such as `merge` and `flatten` for transforming event data (see the transform events page).
- Corrected from the official docs: `(?P.*)` -> `(?P<Username>.*)` and `(?P<Domain>.*)` in the `re.captureN` example; the source rendering lost the group names (`(?P.*)` is not valid RE2) and its stated result requires them.
- The source page has no fenced code block. Snippet taken from https://docs.cloud.google.com/eventarc/advanced/docs/receive-events/create-enrollment (the `--cel-match` example).
- Source: https://docs.cloud.google.com/eventarc/advanced/docs/receive-events/use-cel (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-enrollment.md](./create-enrollment.md)
- [create-bus.md](./create-bus.md)
