# Dependency Verification

Gradle feature that mitigates supply-chain attacks (e.g. man-in-the-middle tampering during dependency resolution) by validating downloaded artifacts against known-good checksums and/or PGP signatures recorded in `gradle/verification-metadata.xml`. Configured per project, checked into version control, and enforced automatically on every build.

## Signature / Usage

```bash
# Bootstrap gradle/verification-metadata.xml with SHA-256 checksums and PGP
# signatures for every current dependency, exporting public keys as well
./gradlew --write-verification-metadata pgp,sha256 --export-keys help

# Subsequent builds verify automatically; a tampered or unlisted artifact
# fails the build with a dependency verification error
./gradlew assembleDebug
```

```xml
<!-- gradle/verification-metadata.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<verification-metadata
    xmlns="https://schema.gradle.org/dependency-verification"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="https://schema.gradle.org/dependency-verification https://schema.gradle.org/dependency-verification/dependency-verification-1.3.xsd">
    <configuration>
        <!-- verify .pom and .module files -->
        <verify-metadata>true</verify-metadata>
        <!-- verify .asc PGP signature files that come with the artifacts -->
        <verify-signatures>true</verify-signatures>
        <!-- human-readable keyring format -->
        <keyring-format>armored</keyring-format>
        <key-servers enabled="false">
            <key-server uri="https://keyserver.ubuntu.com"/>
            <key-server uri="https://keys.openpgp.org"/>
        </key-servers>
    </configuration>
    <trusted-artifacts>
        <trust file=".*-javadoc[.]jar" regex="true"/>
        <trust file=".*-sources[.]jar" regex="true"/>
    </trusted-artifacts>
    <components>
        <!-- populated by --write-verification-metadata, e.g. per-artifact
             <sha256 value="..."/> or <trusted-key id="..."><trusting group="..."/></trusted-key> -->
    </components>
</verification-metadata>
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `<verify-metadata>` | boolean | `true` | Verifies `.pom` and `.module` metadata files against recorded checksums, in addition to the artifact itself. |
| `<verify-signatures>` | boolean | `false` | Verifies the `.asc` PGP signature published alongside an artifact against a trusted public key, instead of (or in addition to) a checksum. |
| `<keyring-format>` | `armored` \| binary | binary | `armored` stores `gradle/verification-keyring.keys` as human-readable ASCII text, making diffs reviewable in code review. |
| `<key-servers enabled>` | boolean | `true` | Disable (`false`) to resolve PGP keys only from the local `gradle/verification-keyring.keys` file instead of querying remote key servers on every build. |
| `<trusted-artifacts>` | block | — | `<trust file="regex" regex="true"/>` / `<trust group="..." name="..."/>` entries that skip verification for specific artifacts (e.g. `-sources.jar` / `-javadoc.jar` fetched ad hoc by the IDE, which aren't reproducibly checksummed). |
| `--write-verification-metadata pgp,sha256` | Gradle CLI flag | — | Regenerates `<components>` with checksums and/or trusted PGP key mappings for every dependency currently resolved by the invoked task. |
| `--export-keys` | Gradle CLI flag | — | Writes the public keys used to verify signatures into `gradle/verification-keyring.keys`. |

## Notes

- Two independent mechanisms, usable together: checksums (must be regenerated on every dependency version bump) and PGP signatures (stay valid across versions signed by the same key, so they need fewer updates but depend on the library author publishing `.asc` files).
- Both `gradle/verification-metadata.xml` and `gradle/verification-keyring.keys` should be committed to version control; review diffs to these files carefully, since a bootstrapped checksum/signature is only as trustworthy as the network state it was captured from.
- Signing keys rarely change across releases; a common maintenance step is regex-stripping the per-version `<trusted-key ... version="...">` attribute down to a bare `<trusted-key .../>` so new versions of an already-trusted group don't require re-running the bootstrap command.
- This is a Gradle core feature (`docs.gradle.org/current/userguide/dependency_verification.html`), not Android-Gradle-Plugin-specific, but the Android Studio Gradle sync can additionally fetch `-sources.jar` / `-javadoc.jar` artifacts outside the normal build graph — add them to `<trusted-artifacts>` or sync will fail verification.
- For controlling *which* transitive version resolves (as opposed to authenticating the artifact bytes), see dependency-exclusion.md; for inspecting the resolved tree, see viewing-dependencies.md.

## Related

- [dependency-exclusion.md](./dependency-exclusion.md)
- [viewing-dependencies.md](./viewing-dependencies.md)
- [repositories.md](./repositories.md)
