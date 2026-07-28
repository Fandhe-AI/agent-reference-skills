# Designing inclusive software

Inclusive design treats accessibility as a core engineering and product-quality concern from the start of the product lifecycle, not a final compliance step.

## Signature / Usage

Four principles guide Microsoft's inclusive design approach:

- **Think universal** — focus on what unifies people (motivations, relationships, abilities).
- **Make it personal** — create emotional connections; a person's unique circumstances can improve a design for everyone.
- **Keep it simple** — reduce clutter so people know what to do next.
- **Create delight** — design moments that feel like a welcomed change in tempo.

Seven practical steps to keep inclusive design actionable:

1. Establish inclusive design as a product requirement.
2. Prefer framework-provided controls to maximize built-in accessibility support.
3. Design a logical hierarchy that defines standard controls, custom controls, and keyboard focus behavior.
4. Build support for core system behaviors (keyboard navigation, high contrast, high DPI) into the product architecture.
5. Implement and validate against authoritative guidance (Microsoft accessibility developer hub, framework specs).
6. Test with users who have functional needs.
7. Ship with clear accessibility documentation.

## Options / Props

| Consideration | Guidance |
|------|-------------|
| Color contrast ratio | Target at least 5:1 for standard text and 3:1 for large text (18-point, or 14-point bold) |
| Color combinations | Never rely on color alone to convey state or meaning (roughly 7% of males have some color vision deficiency) |
| High contrast setting | Implement controls with system resources, not hard-coded colors, so content stays perceivable in high-contrast themes |
| System font settings | Honor default system fonts and text rendering (anti-aliasing/smoothing); custom fonts can break legibility or AT compatibility |
| High DPI resolutions | Ensure layout adapts at high DPI to avoid clipping, overlap, or hidden interaction targets |

## Notes

- Two broad groups rely on assistive technology (AT): people who rely on it due to disability, age-related change, or temporary condition, and people who use AT by preference for efficiency or comfort.
- A Forrester Research study commissioned by Microsoft found that 57% of U.S. computer users aged 18-64 could benefit from assistive technology, most without identifying as disabled.
- Capability is dynamic, not fixed — designing for that variability produces more broadly usable software.

## Related

- [Accessibility overview](./accessibility-overview.md)
- [Contrast themes](./high-contrast-themes.md)
- [Accessible text requirements](./accessible-text-requirements.md)
