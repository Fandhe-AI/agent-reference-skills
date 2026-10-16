# Long Term Support

Pino provides Long Term Support (LTS) according to a defined schedule, with major releases supported for a minimum of six months and security updates continuing for an additional six months after the next major release.

## LTS Policy

1. **Major releases** (the "X" in semantic versioning X.Y.Z) are supported for a minimum period of six months from their release date. Release dates can be found at the [Pino releases page](https://github.com/pinojs/pino/releases).

2. **Security updates** for major releases continue for an additional six months from the release of the next major release. After this period, security fixes will still be reviewed and released as long as they are provided by the community and do not violate other constraints (e.g., minimum supported Node.js version).

3. **Node.js compatibility**: Major releases are tested and verified against all Node.js release lines supported by the [Node.js LTS policy](https://github.com/nodejs/Release) within the LTS period of that given Pino release line. Only the latest Node.js release of a given line is supported.

A "month" is defined as 30 consecutive days.

## Security Releases and Semver

As a consequence of providing long-term support for major releases, there are occasions where breaking changes are released as a minor version release. Such changes are always noted in the [release notes](https://github.com/pinojs/pino/releases).

To avoid automatically receiving breaking security updates, use the tilde (`~`) range qualifier. For example, to get patches for the 6.1 release and avoid automatically updating beyond it, specify the dependency as `"pino": "~6.1.x"`. This will leave the application vulnerable, so use with caution.

## Version Schedule

| Version | Release Date | End Of LTS Date | Node.js              |
| :------ | :----------- | :-------------- | :------------------- |
| 9.x     | 2024-04-26   | TBD             | 18, 20, 22           |
| 8.x     | 2022-06-01   | 2024-10-26      | 14, 16, 18, 20      |
| 7.x     | 2021-10-14   | 2023-06-01      | 12, 14, 16           |
| 6.x     | 2020-03-07   | 2022-04-14      | 10, 12, 14, 16      |

### Supported Node.js versions

Pino follows the Node.js release schedule. A Pino release line is tested against, and supports, every Node.js release line that is in its _current_, _active LTS_, or _maintenance LTS_ phase when the Pino line is released, as described above.

Support for a Node.js version is **only dropped in a new Pino major release**. A published Pino major will never drop a Node.js release line that it originally shipped with, so upgrading within a major line (for example, from `9.1.0` to `9.4.0`) will never remove support for a Node.js version you already run on.

Once a Node.js release line reaches its end-of-life, Pino supports it on a best-effort basis, with the following caveats:

- End-of-life Node.js versions are not exercised in continuous integration.
- Some fixes and features cannot be backported to the Pino lines that still support them.
- Dependencies cannot be kept up to date.

To keep running on an end-of-life Node.js version, pin your dependency to the last Pino major line that supported it. The Version Schedule above maps each Pino release line to the Node.js versions it supports; for example, to stay on Node.js 14, install the latest `8.x` release with `"pino": "8.x"`.

## CI Tested Operating Systems

Pino uses GitHub Actions for CI testing:

| OS      | YAML Workflow Label    | Node.js      |
|---------|------------------------|--------------|
| Linux   | `ubuntu-latest`        | 18, 20, 22   |
| Windows | `windows-latest`       | 18, 20, 22   |
| MacOS   | `macos-latest`         | 18, 20, 22   |

## Notes

- npm `latest` is 10.x (v10.4.0), but the official v10.4.0 schedule table still lists 9.x as its newest row and has no 10.x row yet
- The `TBD` in the 9.x End Of LTS Date cell is verbatim from the upstream v10.4.0 `docs/lts.md`; no end date is published for 9.x
- Only the latest Node.js release within a given major line is officially supported
- Breaking changes may appear in minor releases due to the LTS security update policy
- Use tilde (`~`) version ranges in `package.json` if you need to avoid unexpected breaking security patches

## Related

- [options](../api/options.md)
