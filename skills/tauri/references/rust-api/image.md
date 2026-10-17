---
source: https://docs.rs/tauri/2.12.4/tauri/image/struct.Image.html
---

# image::Image

An RGBA Image in row-major order from top to bottom. Used for window icons, tray icons and menu icons.

## Signature / Usage

```rust
pub struct Image<'a> { /* private fields */ }
```

The `include_image!` macro converts a `.png` or `.ico` icon to an `Image` at compile time (relative paths are resolved from `CARGO_MANIFEST_DIR`).

## Methods

| Method | Signature | Description |
| --- | --- | --- |
| new_owned | `pub const fn new_owned(rgba: Vec<u8>, width: u32, height: u32) -> Self` | `impl Image<'static>`. Creates an Image from RGBA data without cloning it. |
| new | `pub const fn new(rgba: &'a [u8], width: u32, height: u32) -> Self` | Creates a new Image using RGBA data, row-major from top to bottom, with the given width and height. |
| from_bytes | `pub fn from_bytes(bytes: &[u8]) -> Result<Self>` | Features `image-ico` or `image-png` only. Creates an image from the provided bytes; only `ico` and `png` (per the activated feature). |
| from_path | `pub fn from_path<P: AsRef<Path>>(path: P) -> Result<Self>` | Features `image-ico` or `image-png` only. Creates an image from the provided path. |
| rgba | `pub fn rgba(&'a self) -> &'a [u8]` | Returns the RGBA data, row-major from top to bottom. |
| width | `pub fn width(&self) -> u32` | Returns the width of this image. |
| height | `pub fn height(&self) -> u32` | Returns the height of this image. |
| to_owned | `pub fn to_owned(self) -> Image<'static>` | Converts into a `'static` owned `Image`. This allocates. |

## Notes

- `from_bytes` / `from_path` require the Cargo feature `image-png` and/or `image-ico`.

## Related

- [Tray](./tray.md)
- [Menu](./menu.md)
- [tauri crate](./crate-overview.md)
