# Multichannel Layout

Replicate the placement and routing of one reference channel to all other matching channels (e.g. an audio mixer with many identical channels, repeated regulation stages, per-channel LED drivers). KiCad includes a demo project named `multichannel`.

Stages: schematic setup (designate channels), rule area generation (one placement rule area per channel), layout replication (route one reference channel, then **Repeat Layout**).

## Schematic Preparation

Each channel corresponds exactly to the symbols (and connections) of one hierarchical sheet, component class, or named group. Channels must be equivalent:

- Same number of symbols
- Corresponding symbols share the reference designator prefix (full references unique) and the same footprint
- Equivalent connections between symbols (values and symbol graphics may differ)

| Source | How channels are defined |
|--------|--------------------------|
| Hierarchical sheets | Same sheet file instantiated once per channel (most common; guarantees identical circuitry); no extra symbols |
| Component classes | One component class per channel containing all of the channel's symbols |
| Groups | Named groups of footprints on the board |

## Board Procedure

Each channel is a rule area configured for placement; one is the reference (manually placed and routed), the others are targets. Rule area properties:

- **Placement** tab: select the sheet, component class, or group containing the channel's components
- **Keepouts** tab: normally leave unselected
- **Layers**: an item is copied only if its layer is enabled in both the reference and target rule areas (include inner copper layers explicitly)
- **Area name**: labels the rule area in the Repeat Layout dialog; use unique names

### Generating Placement Rule Areas

**Tools → Multi-Channel → Generate Placement Rule Areas…** has tabs Sheets, Component Classes, Groups (each with a Generate checkbox per entry; select only real channels) and options:

| Option | Description |
|--------|-------------|
| Replace existing placement rule areas | Replace the existing rule area per channel; if disabled, channels with a rule area are skipped |
| Group footprints with their placement rule areas | Groups the rule area with its footprints; disabled for group-based sources. Enter the group to edit the rule area |

For each channel the tool computes a convex hull around the footprints with a margin, rectifies it into a 90-degree polygon, sets all copper layers, and names it `auto-placement-area-<source>`. Enlarge the reference rule area to enclose all routing; target areas are resized automatically on Repeat Layout.

### Repeating the Layout

**Tools → Multi-Channel → Repeat Layout…**: select the reference rule area (preselected, inside a selected group, or picked when prompted); KiCad checks each other placement rule area for topology match; configure the dialog; click OK.

Target table columns: **Copy** (checked by default if topology matches; mismatches cannot be selected), **Rule Area**, **Status** ("OK" or an error message with a details icon). Only targets with status OK receive the layout.

| Option | Description |
|--------|-------------|
| Anchor footprint | Footprint (and its equivalents) used to position/orient each channel; none = center of the reference rule area |
| Copy footprint placement | Footprints enclosed by or intersecting the reference area, on layers enabled in both areas |
| Copy routing | Tracks and vias fully enclosed by the reference area, on layers enabled in both areas; existing target routing is removed first |
| Restrict to routing connected within the area | Sub-option of Copy routing; only routing sharing a net with a pad inside the reference area |
| Copy other items | Zones and graphics fully enclosed by the reference area (zones need all layers in both areas) |
| Group items with their target rule areas | Groups copied items with the target rule area |
| Include locked items | Copy locked reference items and update locked target items |

Repeat Layout can be run repeatedly; each run replaces target contents with the current reference. Target rule area outlines are copied from the reference.

## Topology Matching

KiCad catalogs components (identified by reference designator prefix), pins, and net connections, and searches for a one-to-one mapping (isomorphism) preserving all pin connections. Matching uses connectivity, not reference numbers (R1 need not map to R1). Hierarchical references with a channel identifier (e.g. `TRIM_1.1`, `TRIM_2.1`) are handled by detecting a common prefix. Ties between identical components are broken first by hierarchical sheet instance matching, then by physical proximity. The details icon lists unmatched components and component counts.

## Routing Duplication Details

- Copied: tracks and vias fully enclosed by the reference rule area; translated by the offset between rule area centers (or anchors) and rotated to match the anchor orientation
- Net reassignment: nets are mapped through the matched pads in the target channel; global nets not unique to a channel may keep the reference net (use Restrict to routing connected within the area)
- Layers: routing on a layer missing in the target rule area is silently omitted

## Other Item Duplication

With **Copy other items**, zones (net reassigned the same way; all layers must exist in both areas) and unconnected graphics (silkscreen text, fab drawings) fully enclosed by the reference area are copied. Footprint text is updated together with footprint placement.

## Step-by-Step Multichannel Workflow

1. Design the schematic (hierarchical sheet instantiated per channel, or component classes / groups)
2. Run **Update PCB from Schematic** (`F8`)
3. **Tools → Multi-Channel → Generate Placement Rule Areas…**
4. Move each rule area to its position (footprints need not be inside yet)
5. Place and route the reference channel inside its rule area
6. Enlarge the reference rule area to enclose all routing, via fan-outs, and local zones
7. Select the reference rule area, then **Tools → Multi-Channel → Repeat Layout…**; verify OK status, choose anchor and copy options
8. Review each channel and run DRC; iterate by editing the reference and repeating

## Troubleshooting

| Issue | Resolution |
|-------|-----------|
| Topology mismatch | Check for missing/extra components, different reference prefixes, different footprints, different net connections, nested sheets differing |
| Routing not copied | Rule area too small; layers not enabled in both areas; Restrict to routing connected within the area filtering nets; wrong net on shared nets |
| Footprint placement not copied | Footprint fully outside the reference area; layer not enabled in both areas; locked without Include locked items |
| Other items not copied | Not fully enclosed; zone layer mismatch; locked items |
| Target rule area shape wrong | Target is a copy of the reference outline; fix the reference |

## Notes

- Tips from the manual: use one sheet file instantiated multiple times, name rule areas descriptively, make the reference area generous, route the reference channel completely first, group items with rule areas, run DRC after replication
- The manual does not describe push-and-shove during duplication or a requirement that the reference be DRC-clean before duplication

## Related

- [05-editing-a-board.md](./05-editing-a-board.md)
- [06-forward-and-back-annotation.md](./06-forward-and-back-annotation.md)
- [14-design-blocks.md](./14-design-blocks.md)
