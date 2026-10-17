---
source: https://docs.flutter.dev/packages-and-plugins/dependency-management
---

# Package dependency management

How Flutter and Dart resolve package dependencies, and how to handle version conflicts.

## Signature / Usage

```yaml
dependencies:
  package_a: ^1.0.0
  package_b: ^1.0.0

dependency_overrides:
  foo: ^2.0.0
```

```bash
flutter pub upgrade
flutter pub outdated
flutter pub upgrade --major-versions
```

### How dependency resolution works

`pubspec.yaml` specifies dependencies; `flutter pub get` resolves them and records exact versions in `pubspec.lock`.

| Term | Meaning |
|------|---------|
| Direct dependencies | Packages explicitly listed under `dependencies` or `dev_dependencies`. |
| Transitive dependencies | Packages your direct dependencies depend on; not listed in `pubspec.yaml` but required to compile. |
| `pubspec.lock` | Exact version of every direct and transitive dependency. Commit it for application projects, but not for package projects. |

Pub allows only a single version of any package in the compilation tree (type safety, binary size, global state). The version solver finds a single concrete version for each package that satisfies all constraints.

### Version constraints

Dart packages use Semantic Versioning (`major.minor.patch`).

| Syntax | Meaning |
|--------|---------|
| `^1.2.3` | `>=1.2.3 <2.0.0` (stable versions: no major change) |
| `^0.8.0` | `>=0.8.0 <0.9.0` (pre-1.0.0: more restrictive) |
| `^0.0.3` | `>=0.0.3 <0.1.0` |
| `'>=5.4.0 <6.0.0'` | Traditional range |
| `any` | Any version (not recommended) |

```yaml
dependencies:
  url_launcher: '>=5.4.0 <6.0.0'
```

### Dependency conflicts

A conflict occurs when two packages require incompatible versions of the same transitive dependency. Example error:

```console
Because every version of package_a depends on foo ^1.0.0 and
every version of package_b depends on foo ^2.0.0,
package_a is incompatible with package_b.
So, because my_app depends on both package_a ^1.0.0
and package_b ^1.0.0, version solving failed.
```

To read it, trace from the bottom up: identify the conflicting package (`foo`), find which packages require conflicting versions, then check which direct dependencies pull them in.

Resolve by: upgrading (`flutter pub upgrade`, `flutter pub outdated`, `flutter pub upgrade --major-versions` which upgrades the constraints in `pubspec.yaml` and then runs `flutter pub get`); using dependency overrides; or helping the ecosystem (file an issue, submit a pull request, use a git or path dependency while waiting):

```yaml
dependencies:
  package_a:
    git:
      url: https://github.com/your-username/package_a.git
      ref: update-foo-dependency
```

## Notes

- The Flutter docs page states ^0.0.3 means >=0.0.3 <0.0.4, but pub_semver's caret uses nextBreaking (minor bump for 0.x), so ^0.0.3 resolves to >=0.0.3 <0.1.0.
- Use version ranges, not exact versions, in `pubspec.yaml` (`pubspec.lock` pins exact versions); this lets the solver find compatible transitive versions and lets you update safely with `flutter pub upgrade`.
- Use dependency overrides only as a temporary fix. If the packages aren't actually compatible, bypassing the solver can cause compilation errors or runtime crashes (such as `NoSuchMethodError`); test thoroughly.
- Dependency overrides only apply to the root package. Don't include `dependency_overrides` in a package you publish to pub.dev; other projects ignore them.

## Related

- [Using packages](./using-packages.md)
- [Developing packages & plugins](./developing-packages.md)
