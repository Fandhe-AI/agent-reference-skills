---
source: https://docs.docker.com/build/bake/stdlib/
---

# Bake standard library functions

Built-in functions available in Bake HCL files (provided by go-cty), usable as `${fn(...)}` or directly in expressions.

## Signature / Usage

```hcl
target "webapp-dev" {
  dockerfile = "Dockerfile.webapp"
  tags = ["docker.io/username/webapp:latest"]
  args = {
    result = "${add(123, 1)}" # => 124
  }
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `absolute` | If the given number is negative then returns its positive equivalent, or otherwise returns the given number unchanged. |
| `add` | Returns the sum of the two given numbers. |
| `and` | Applies the logical AND operation to the given boolean values. |
| `base64decode` | Decodes a string containing a base64 sequence. |
| `base64encode` | Encodes a string to a base64 sequence. |
| `basename` | Returns the last element of a path. |
| `bcrypt` | Computes a hash of the given string using the Blowfish cipher. |
| `byteslen` | Returns the total number of bytes in the given buffer. |
| `bytesslice` | Extracts a subslice from the given buffer. |
| `can` | Tries to evaluate the expression given in its first argument. |
| `ceil` | Returns the smallest whole number that is greater than or equal to the given value. |
| `chomp` | Removes one or more newline characters from the end of the given string. |
| `chunklist` | Splits a single list into multiple lists where each has at most the given number of elements. |
| `cidrhost` | Calculates a full host IP address within a given IP network address prefix. |
| `cidrnetmask` | Converts an IPv4 address prefix given in CIDR notation into a subnet mask address. |
| `cidrsubnet` | Calculates a subnet address within a given IP network address prefix. |
| `cidrsubnets` | Calculates many consecutive subnet addresses at once, rather than just a single subnet extension. |
| `coalesce` | Returns the first of the given arguments that isn't null, or raises an error if there are no non-null arguments. |
| `coalescelist` | Returns the first of the given sequences that has a length greater than zero. |
| `compact` | Removes all empty string elements from the given list of strings. |
| `concat` | Concatenates together all of the given lists or tuples into a single sequence, preserving the input order. |
| `contains` | Returns true if the given value is a value in the given list, tuple, or set, or false otherwise. |
| `convert` | Converts a value to a specified type constraint, using HCL's customdecode extension for type expression support. |
| `csvdecode` | Parses the given string as Comma Separated Values (as defined by RFC 4180) and returns a map of objects representing the table of data, using the first row as a header row to define the object attributes. |
| `dirname` | Returns the directory of a path. |
| `distinct` | Removes any duplicate values from the given list, preserving the order of remaining elements. |
| `divide` | Divides the first given number by the second. |
| `element` | Returns the element with the given index from the given list or tuple, applying the modulo operation to the given index if it's greater than the number of elements. |
| `equal` | Returns true if the two given values are equal, or false otherwise. |
| `flatten` | Transforms a list, set, or tuple value into a tuple by replacing any given elements that are themselves sequences with a flattened tuple of all of the nested elements concatenated together. |
| `floor` | Returns the greatest whole number that is less than or equal to the given value. |
| `format` | Constructs a string by applying formatting verbs to a series of arguments, using a similar syntax to the C function "printf". |
| `formatdate` | Deprecated: use formattimestamp instead. Formats a timestamp given in RFC 3339 syntax into another timestamp in some other machine-oriented time syntax, as described in the format string. |
| `formatlist` | Constructs a list of strings by applying formatting verbs to a series of arguments, using a similar syntax to the C function "printf". |
| `formattimestamp` | Formats a timestamp string in RFC 3339 syntax or a unix timestamp integer into another timestamp in some other machine-oriented time syntax, as described in the format string. The special format string "X" returns the unix timestamp in seconds. |
| `greaterthan` | Returns true if and only if the first number is greater than the second. |
| `greaterthanorequalto` | Returns true if and only if the first number is greater than or equal to the second. |
| `hasindex` | Returns true if if the given collection can be indexed with the given key without producing an error, or false otherwise. |
| `homedir` | Returns the current user's home directory. |
| `indent` | Adds a given number of spaces after each newline character in the given string. |
| `index` | Returns the element with the given key from the given collection, or raises an error if there is no such element. |
| `indexof` | Finds the element index for a given value in a list. |
| `int` | Discards any fractional portion of the given number. |
| `join` | Concatenates together the elements of all given lists with a delimiter, producing a single string. |
| `jsondecode` | Parses the given string as JSON and returns a value corresponding to what the JSON document describes. |
| `jsonencode` | Returns a string containing a JSON representation of the given value. |
| `keys` | Returns a list of the keys of the given map in lexicographical order. |
| `length` | Returns the number of elements in the given collection. |
| `lessthan` | Returns true if and only if the first number is less than the second. |
| `lessthanorequalto` | Returns true if and only if the first number is less than or equal to the second. |
| `log` | Returns the logarithm of the given number in the given base. |
| `lookup` | Returns the value of the element with the given key from the given map, or returns the default value if there is no such element. |
| `lower` | Returns the given string with all Unicode letters translated to their lowercase equivalents. |
| `max` | Returns the numerically greatest of all of the given numbers. |
| `md5` | Computes the MD5 hash of a given string and encodes it with hexadecimal digits. |
| `merge` | Merges all of the elements from the given maps into a single map, or the attributes from given objects into a single object. |
| `min` | Returns the numerically smallest of all of the given numbers. |
| `modulo` | Divides the first given number by the second and then returns the remainder. |
| `multiply` | Returns the product of the two given numbers. |
| `negate` | Multiplies the given number by -1. |
| `not` | Applies the logical NOT operation to the given boolean value. |
| `notequal` | Returns false if the two given values are equal, or true otherwise. |
| `or` | Applies the logical OR operation to the given boolean values. |
| `parseint` | Parses the given string as a number of the given base, or raises an error if the string contains invalid characters. |
| `pow` | Returns the given number raised to the given power (exponentiation). |
| `range` | Returns a list of numbers spread evenly over a particular range. |
| `regex` | Applies the given regular expression pattern to the given string and returns information about a single match, or raises an error if there is no match. |
| `regex_replace` | Applies the given regular expression pattern to the given string and replaces all matches with the given replacement string. |
| `regexall` | Applies the given regular expression pattern to the given string and returns a list of information about all non-overlapping matches, or an empty list if there are no matches. |
| `replace` | Replaces all instances of the given substring in the given string with the given replacement string. |
| `reverse` | Returns the given string with all of its Unicode characters in reverse order. |
| `reverselist` | Returns the given list with its elements in reverse order. |
| `rsadecrypt` | Decrypts an RSA-encrypted ciphertext. |
| `sanitize` | Replaces all non-alphanumeric characters with a underscore, leaving only characters that are valid for a Bake target name. |
| `semvercmp` | Returns true if version satisfies a constraint. |
| `sethaselement` | Returns true if the given set contains the given element, or false otherwise. |
| `setintersection` | Returns the intersection of all given sets. |
| `setproduct` | Calculates the cartesian product of two or more sets. |
| `setsubtract` | Returns the relative complement of the two given sets. |
| `setsymmetricdifference` | Returns the symmetric difference of the two given sets. |
| `setunion` | Returns the union of all given sets. |
| `sha1` | Computes the SHA1 hash of a given string and encodes it with hexadecimal digits. |
| `sha256` | Computes the SHA256 hash of a given string and encodes it with hexadecimal digits. |
| `sha512` | Computes the SHA512 hash of a given string and encodes it with hexadecimal digits. |
| `signum` | Returns 0 if the given number is zero, 1 if the given number is positive, or -1 if the given number is negative. |
| `slice` | Extracts a subslice of the given list or tuple value. |
| `sort` | Applies a lexicographic sort to the elements of the given list. |
| `split` | Produces a list of one or more strings by splitting the given string at all instances of a given separator substring. |
| `strlen` | Returns the number of Unicode characters (technically: grapheme clusters) in the given string. |
| `substr` | Extracts a substring from the given string. |
| `subtract` | Returns the difference between the two given numbers. |
| `timeadd` | Adds the duration represented by the given duration string to the given RFC 3339 timestamp string, returning another RFC 3339 timestamp. |
| `timestamp` | Returns a string representation of the current date and time. |
| `title` | Replaces one letter after each non-letter and non-digit character with its uppercase equivalent. |
| `trim` | Removes consecutive sequences of characters in "cutset" from the start and end of the given string. |
| `trimprefix` | Removes the given prefix from the start of the given string, if present. |
| `trimspace` | Removes any consecutive space characters (as defined by Unicode) from the start and end of the given string. |
| `trimsuffix` | Removes the given suffix from the start of the given string, if present. |
| `try` | Variadic function that tries to evaluate all of is arguments in sequence until one succeeds, in which case it returns that result, or returns an error if none of them succeed. |
| `unixtimestampparse` | Given a unix timestamp integer, will parse and return an object representation of that date and time. A unix timestamp is the number of seconds elapsed since January 1, 1970 UTC. |
| `upper` | Returns the given string with all Unicode letters translated to their uppercase equivalents. |
| `urlencode` | Applies URL encoding to a given string. |
| `uuidv4` | Generates and returns a Type-4 UUID in the standard hexadecimal string format. |
| `uuidv5` | Generates and returns a Type-5 UUID in the standard hexadecimal string format. |
| `values` | Returns the values of elements of a given map, or the values of attributes of a given object, in lexicographic order by key or attribute name. |
| `zipmap` | Constructs a map from a list of keys and a corresponding list of values, which must both be of the same length. |

## Notes

- The official function table describes the comparison functions relative to the second argument; they compare the first argument against the second (e.g. `lessthan(10, 3)` is `false`).
- `formatdate` is deprecated: use `formattimestamp` instead; `formatdate` only accepts RFC3339 timestamp strings.
- `formattimestamp` formats either an RFC3339 timestamp string or a unix timestamp integer; format `X` returns the unix timestamp in seconds.
- `semvercmp` checks a semantic version against constraints (see Masterminds/semver "Checking Version Constraints").
- `unixtimestampparse` returns an object with attributes `year`, `year_day`, `day`, `month`, `month_name`, `weekday`, `weekday_name`, `hour`, `minute`, `second`, `rfc3339`, `iso_year`, `iso_week`.
- Examples from the page (expression => result): `absolute(-42)` => 42; `and(true, false)` => false; `base64decode("SGVsbG8=")` => "Hello"; `basename("/usr/local/bin/docker")` => "docker"; `chunklist([1,2,3,4,5], 2)` => [[1,2],[3,4],[5]]; `cidrhost("10.0.0.0/16", 5)` => "10.0.0.5"; `cidrsubnet("10.0.0.0/16", 4, 2)` => "10.0.32.0/20"; `coalesce(null, "", "docker")` => "docker"; `concat([1,2],[3,4])` => [1,2,3,4]; `format("Hello, %s!", "World")` => "Hello, World!"; `join(",", ["a","b","c"])` => "a,b,c"; `lookup({a="apple", b="banana"}, "c", "none")` => "none"; `merge({a=1, b=2}, {b=3, c=4})` => {a=1, b=3, c=4}; `parseint("ff", 16)` => 255; `regex_replace("[0-9]+", "abc123xyz", "NUM")` => "abcNUMxyz"; `sanitize("My App! v1.0")` => "My_App__v1_0"; `split(",", "a,b,c")` => ["a","b","c"]; `timeadd("2025-09-24T12:00:00Z", "1h30m")` => "2025-09-24T13:30:00Z"; `try(parseint("zz", 16), parseint("ff", 16))` => 255; `trimprefix("docker-build", "docker-")` => "build"; `zipmap(["name","stars"], ["Docker", 5])` => {name="Docker", stars=5}.
- Time-dependent or random results: `timestamp()` returns the current RFC3339 time at evaluation; `uuidv4()` returns a random UUID on each evaluation.

```hcl
variable "SOURCE_DATE_EPOCH" {
  type    = number
  default = formattimestamp("X", "2015-10-21T00:00:00Z") # => 1445385600
}

variable "ALPINE_VERSION" {
  default = "3.23"
}

target "default" {
  dockerfile = "Dockerfile"
  labels = {
    "org.opencontainers.image.created" = formattimestamp("YYYY-MM-DD'T'hh:mm:ssZ", SOURCE_DATE_EPOCH) # => "2015-10-21T00:00:00Z"
  }
  platforms = semvercmp(ALPINE_VERSION, ">= 3.20") ? [
    "linux/amd64",
    "linux/arm64",
    "linux/riscv64"
  ] : [
    "linux/amd64",
    "linux/arm64"
  ]
}
```

## Related

- [Functions](./bake-funcs.md)
- [Expression evaluation in Bake](./bake-expressions.md)
