# Memory Optimization

Wear OS enforces strict memory limits on WFF watch faces: 10 MB in ambient mode, 100 MB in interactive mode. Only bitmaps, fonts, and XML-derived layers count toward the limit.

## Signature / Usage

```xml
<!-- Prefer a fixed-frame Arc over 60 sequential images for a progress bar -->
<PartDraw angle="0" width="400" height="400" name="ProgressBar" pivotX="0.5" pivotY="0.5" x="25" y="25">
    <Arc centerX="200" centerY="200" width="400" height="400" startAngle="0" endAngle="360">
        <Transform target="endAngle" value="0 + (clamp([SECOND], 0, 60) - 0) * 6" />
        <Stroke cap="ROUND" color="#654456" thickness="10" />
    </Arc>
</PartDraw>
```

## Notes

- This is the Wear OS Watch Face Format / watch face API — distinct from the same-named concept in other skills.
- Memory cost per image is computed after decompression using the color format: RGBA8888 = `4 × width × height`, RGB565 = `2 × width × height`, ALPHA_8 = `width × height`; for multi-frame animations, the union of all frame bounding boxes is used.
- Crop and resize images to their displayed size — a 3 KB blank full-screen source image can decompress to 750+ KB on a 450x450 display.
- Bitmap font `Character`/`Word` images must share consistent heights to avoid bloating the computed size.
- Deduplicate: reference one image resource multiple times instead of storing duplicates.
- Use `<Arc>` with `<Transform>` for progress indicators instead of many discrete frame images (see [shapes](./shapes.md), [transform](./transform.md)).
- Ordering elements so hands/complications come last in the XML can exclude entire layers from ambient-mode memory calculations.
- Validate memory footprint with the Watch Face Format Optimizer / Memory Footprint Evaluator before submission (see [build-and-debug](./build-and-debug.md)).

## Related

- [shapes](./shapes.md)
- [transform](./transform.md)
- [build-and-debug](./build-and-debug.md)
