# Feature lifecycle

Storybook classifies features with four lifecycle labels: Experimental, Preview, Stable, and Deprecated. The labels indicate commitment level, expected quality, likelihood of breaking changes, and timeline.

## Signature / Usage

Experimental features are opt-in via feature flags in the main config (for example, the flags offered by the 10.5 automigration):

```ts
// .storybook/main.ts
features: { experimentalDocgenServer: true },
```

## Stages

| Stage | Meaning |
|-------|---------|
| Experimental | Functional but evolving. Suitable for prototypes and early integrations, not critical paths. Each has an RFC (GitHub discussions, `rfc` category). Implementation details may change significantly before stabilization. |
| Preview | Nearly production-ready, documented, most known issues addressed. Fully functional for at least one supported framework, possibly incomplete in others. Minimal breaking changes may occur in minor releases (with automigrations where possible); feedback is collected for 1-2 minor releases before promotion to stable. |
| Stable | Fully supported and safe for production across all projects. Well-documented, tested in all core frameworks, follows semantic versioning. Breaking changes only in major releases. |
| Deprecated | Being phased out; removed in an upcoming major release. No active development or bug fixes; migrate to alternatives. Typically removed within the next major release cycle (deprecated in 8.x -> removal expected in 9.0). |
## Notes

- Source: https://storybook.js.org/docs/releases/features (Storybook v10.6.2).

## Related

- [Upgrading Storybook](./upgrading.md)
- [Migration guide for Storybook 10](./migration-guide.md)
