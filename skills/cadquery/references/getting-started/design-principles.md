# Design Principles

Four guiding principles that shape how CadQuery is designed and how users are expected to interact with it.

## Principle 1: Intuitive Construction

Code should read "roughly as a human would describe an object verbally." A block with countersunk corner holes and a central pocket is expressed as a chain of operations that mirrors that verbal description, not as a list of raw coordinates.

## Principle 2: Capture Design Intent

CadQuery favors **relative positioning** over global coordinates so that implied assumptions (e.g., "holes are evenly spaced", "pocket is centered") are preserved in the model. When dimensions change, relative relationships survive automatically — just as they would in a professional CAD history tree.

## Principle 3: Plugins as First-Class Citizens

Specialized builders and extended libraries should be "easy to install and familiar to use." The API is designed so that plugins integrate seamlessly rather than feeling bolted on.

## Principle 4: CAD Models as Source Code

CadQuery treats `.py` model files as first-class source code, not opaque binary blobs. Benefits:

- Feature reuse across objects via normal imports
- Version control with meaningful diffs
- Automated testing and generation pipelines
- Easy sharing and review via standard code hosting

## Notes

- These principles inform every API decision; when an operation feels unintuitive, the principles serve as the design tiebreaker.
- The "source code" philosophy is why CadQuery has no proprietary file format — a STEP export is the artifact, not the source.

## Related

- [Introduction](./introduction.md)
- [Concepts](./concepts.md)
