<!-- source: https://platform.claude.com/docs/en/build-with-claude/vision-coordinates / last verified: 2026-08-07 -->

# Coordinates and bounding boxes

How Claude resizes images before processing, and how to work with the pixel coordinates it returns for bounding boxes, points, and UI elements so they line up with your original image.

## Signature / Usage

Ask for absolute pixel coordinates explicitly in the prompt, e.g. "Return the bounding box of each table as `[x1, y1, x2, y2]` (top-left, bottom-right) in pixel coordinates." Avoid asking for normalized `0`–`1000` coordinates. To get machine-readable coordinates, combine with structured outputs (an object with an `[x1, y1, x2, y2]` array per element).

Origin `(0, 0)` is the top-left corner; x increases right, y increases down. Returned coordinates are pixel positions in the image Claude actually sees — i.e. after Claude's internal resize — not necessarily your original image.

```python
import math

def resized_size(width, height, max_edge=1568, max_tokens=1568):
    """Size Claude resizes an image to before padding.
    Standard tier defaults; high-resolution tier: max_edge=2576, max_tokens=4784."""
    def fits(w, h):
        return (math.ceil(w/28)*28 <= max_edge and math.ceil(h/28)*28 <= max_edge
                and math.ceil(w/28)*math.ceil(h/28) <= max_tokens)
    if fits(width, height):
        return (width, height)
    if height > width:
        h, w = resized_size(height, width, max_edge, max_tokens)
        return (w, h)
    aspect = width / height
    lo, hi = 1, width
    while lo + 1 < hi:
        mid = (lo + hi) // 2
        if fits(mid, max(round(mid / aspect), 1)):
            lo = mid
        else:
            hi = mid
    return (lo, max(round(lo / aspect), 1))
```

## Notes

- **Resize rule:** Claude finds the largest aspect-preserving size satisfying both (1) neither edge exceeds the tier's max edge (1568px standard / 2576px high-res) and (2) token cost `⌈w/28⌉ × ⌈h/28⌉` ≤ the tier's token budget (1568 / 4784). For most photos/screenshots the token limit binds, not the edge limit — do not assume scaling to the edge length; use the reference algorithm.
- Claude then pads the resized image up to the next multiple of 28px on the bottom/right edges only; padding has no content. Always normalize/rescale by the *resized* dimensions, not the padded ones.
- **Best approach:** pre-resize your image to `resized_size()` before uploading, so returned coordinates map 1:1 onto the image you have — no conversion needed. Don't pad yourself.
- **If you can't pre-resize:** recover the resized dimensions with the same helper (matching the model's tier), then divide returned coordinates by the resized dimensions to get relative `[0,1]` coordinates, and multiply by your original image's dimensions to map back.
- For PDFs, pages are rasterized server-side at dimensions you don't control, so returned coordinates can't be reliably mapped back — rasterize pages yourself and use the pre-resize approach instead.
- Small elements lose precision when downscaled — crop the region of interest (offset by crop origin) or use a high-resolution-tier model for fine targets.
- Token counting endpoint estimates cost from dimensions without full processing; a successful count doesn't guarantee the Messages API accepts the image (separate request-size limits apply).
- For HiDPI screen coordinates (screenshot pixels ≠ logical coordinates), also divide by the display scale factor — see the computer use tool's scaling guidance (covered under Tool use・Agent Skills・MCP; anthropic-api-tools-mcp スキルを参照).

## Related

- [Vision](./vision.md)
- [PDF support](./pdf-support.md)
- [Structured outputs](./structured-outputs.md)
- [Token counting](./token-counting.md)
