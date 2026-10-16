# Standard Library

| Name | Description | Path |
|------|-------------|------|
| Array | An ordered, random-access collection that stores elements of a single type. | [array.md](./array.md) |
| Bool | A value type whose instances are either `true` or `false`. | [bool.md](./bool.md) |
| Character | A single extended grapheme cluster that approximates a user-perceived character. | [character.md](./character.md) |
| ContiguousArray | An array type that always stores its elements in a contiguous region of memory. | [contiguous-array.md](./contiguous-array.md) |
| Dictionary | A collection of key-value pairs where each key is unique. Provides O(1) average-case access. | [dictionary.md](./dictionary.md) |
| DiscontiguousSlice | A collection wrapper that provides access to the elements of a collection, indexed by a set of indices. | [discontiguousslice.md](./discontiguousslice.md) |
| Double | A double-precision, 64-bit floating-point value type. | [double.md](./double.md) |
| Float | A single-precision, 32-bit floating-point value type. | [float.md](./float.md) |
| InlineArray | A fixed-size array that stores its elements inline, without a separate memory allocation. | [inlinearray.md](./inlinearray.md) |
| Int | A signed integer value type. On 32-bit platforms the size is 32 bits; on 64-bit platforms it is 64 bits. | [int.md](./int.md) |
| KeyPath | A strongly typed reference to a property or chain of properties of a root type. | [keypath.md](./keypath.md) |
| MutableRawSpan | `MutableRawSpan` represents a contiguous region of memory which contains initialized bytes, and allows mutation of those bytes. | [mutablerawspan.md](./mutablerawspan.md) |
| MutableSpan | `MutableSpan<Element>` represents a contiguous region of memory which contains initialized instances of `Element`, and allows mutation of those elements. | [mutablespan.md](./mutablespan.md) |
| Optional | A type that represents either a wrapped value or the absence of a value. | [optional.md](./optional.md) |
| OutputSpan | `OutputSpan` is a reference to a contiguous region of memory that starts with some number of initialized `Element` instances followed by uninitialized memory. It provides operations to access the items it stores, as well as to add new elements and to remove existing ones. | [outputspan.md](./outputspan.md) |
| Range | A half-open interval `[lowerBound, upperBound)` — includes the lower bound but excludes the upper bound. | [range.md](./range.md) |
| RangeSet | A set of values of any comparable type, represented by ranges. Commonly used to represent multiple subranges of a collection by storing ranges of the collection's index type. | [rangeset.md](./rangeset.md) |
| RawSpan | `RawSpan` represents a contiguous region of memory which contains initialized bytes. | [rawspan.md](./rawspan.md) |
| Result | A value that represents either a success or a failure, each with an associated value. | [result.md](./result.md) |
| Set | An unordered collection of unique elements. | [set.md](./set.md) |
| Span | `Span<Element>` represents a contiguous region of memory which contains initialized instances of `Element`. | [span.md](./span.md) |
| String | A Unicode string value that is a collection of characters. Strings are Unicode-correct, locale-insensitive, and bridge to Objective-C's `NSString`. | [string.md](./string.md) |
| Substring | A slice of a string that shares storage with the original string for efficient, zero-copy slicing. | [substring.md](./substring.md) |
| Unicode | A namespace for Unicode utilities, scalar values, encoding codecs, and classification types. | [unicode.md](./unicode.md) |
| UTF8Span | A borrowed view into contiguous memory that contains validly-encoded UTF-8 code units. | [utf8span.md](./utf8span.md) |
