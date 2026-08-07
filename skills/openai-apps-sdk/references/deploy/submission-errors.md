# Plugin Submission Errors

Reference for error codes returned during plugin submission. Plugins submitted to the public directory are held to a higher standard than plugins installed in a workspace: directory submissions must pass shared package checks plus additional checks for listing fields, review materials, MCP tools, skills, assets, and images. Shared package checks (e.g. app references) can also appear outside the submission portal.

Errors block submission. Warnings don't block submission but should be reviewed. Non-empty values can't contain only whitespace; supported text excludes control characters, Unicode line/paragraph separators, and unsupported invisible formatting characters. HTTPS URLs must include a host and contain no embedded credentials or unsupported characters.

## Final directory submission

A package can pass upload validation and still fail final directory submission. Final submission uses stricter listing limits and checks MCP configuration, skill scans, test cases, and policy attestations.

| Field | Final submission rule |
|---|---|
| Package name | Required; at most 64 characters. Start with an ASCII letter or digit; only ASCII letters, digits, `_`, `-` |
| Version | Required; semantic version, at most 64 characters |
| Display name | Required; one line; at most 30 characters |
| Short description | Required; one line; at most 30 characters |
| Long description | Required; at most 4,000 characters; line breaks allowed |
| Developer name | Required; one line; at most 80 characters |
| Category | Required; a supported category (see Listing and interface errors) |
| Capabilities | At most 20; each non-empty, one line, at most 120 characters |
| Starter prompts | At most 3; each non-empty, unique after Unicode/whitespace normalization, one line, at most 128 characters, no app `@mention` |
| URLs | Required for MCP-backed submissions, optional for skills-only. Website/support/privacy/terms must be HTTPS, at most 1,024 characters |
| Brand colors | Optional six-digit hex; light color ≥2:1 contrast against white, dark color ≥2:1 contrast against `#212121` |

Every submission also requires passing safety/security scans for every bundled skill (can take up to 2 hours) and a verified identity plus all required policy attestations.

MCP-backed plugins additionally require: valid listing URLs; a demo-recording URL showing main use cases/tools across supported platforms; exactly five positive and three negative test cases plus release notes; a production HTTPS MCP server URL with completed domain verification and a successful current tool scan; explicit `readOnlyHint`/`openWorldHint`/`destructiveHint` values with justification for every tool; reviewer-ready demo credentials for OAuth servers; and screenshots only when the server provides custom UI (one PNG/JPEG per starter prompt, exactly 706px wide, 400-860px tall).

### Final metadata errors

`subtitle` = short description, `description` = long description.

| Name | Requirement |
|---|---|
| `submission_display_name_required` | Display name required, non-empty, single-line |
| `submission_display_name_too_long` | ≤30 characters |
| `submission_display_name_character_unsupported` | Supported text, single line |
| `submission_subtitle_required` | Short description required, non-empty, single-line |
| `submission_subtitle_too_long` | ≤30 characters |
| `submission_subtitle_character_unsupported` | Supported text, single line |
| `submission_description_required` | Long description required, non-empty (line breaks allowed) |
| `submission_description_too_long` | ≤4,000 characters |
| `submission_description_character_unsupported` | Supported text (line breaks allowed) |
| `submission_developer_name_required` | Developer name required, non-empty, single-line |
| `submission_developer_name_too_long` | ≤80 characters |
| `submission_developer_name_character_unsupported` | Supported text, single line |
| `plugin_capability_invalid` | Non-empty, supported text, single line, ≤120 characters |
| `plugin_default_prompt_mention` | No app `@mentions` in starter prompts |
| `plugin_default_prompt_duplicate` | Starter prompts unique after normalization |

### MCP and review errors

| Name | Requirement |
|---|---|
| `annotations_required` | Every MCP tool must set `readOnlyHint`, `openWorldHint`, `destructiveHint` accurately |
| `justification_required` | Every annotation needs a justification for its read-only/open-world/destructive behavior |
| `scan_required` | Successful, current scan of the production MCP server |
| `domain_verification_required` | Token hosted at `/.well-known/openai-apps-challenge` on the MCP host or allowed parent host; **Verify Domain** must pass |
| `frame_domain_explanation_required` | Every external frame domain reported by the tool scan needs an explanation of why the UI needs it |
| `screenshots_not_allowed` | Screenshots allowed only when the current tool scan reports a UI output template |

## Archive errors

### Skills-only ZIP upload errors and warnings

A changed package name blocks an update; other findings require confirmation.

| Name | Requirement |
|---|---|
| `plugin_name_mismatch` | Package name in an update must match the existing plugin name |
| `plugin_version_unchanged` | A new release needs a different manifest `version`; reusing the published version requires confirmation |
| `mcp_configuration_excluded` | Skills-only ZIPs must not include `mcpServers` or `.mcp.json`; use **With MCP** for MCP-backed plugins |
| `app_configuration_excluded` | Skills-only ZIPs must not include `apps` or `.app.json`; use **With MCP** for app content |
| `screenshot_configuration_excluded` | Skills-only ZIPs must not include `interface.screenshots`; requires **With MCP** and custom UI |
| `claude_format_normalized` | `.claude-plugin/plugin.json` is converted to `.codex-plugin/plugin.json` with missing interface defaults and normalized text fields |
| `manifest_normalized` | Portal saves the normalized manifest as `.codex-plugin/plugin.json`; changed fields require confirmation |
| `developer_name_defaulted` | `author.name` and `interface.developerName` must match, or the verified identity is used for both after confirmation |

### ZIP structure and limit errors

| Name | Requirement |
|---|---|
| `archive_empty` | Archive must not be empty |
| `archive_too_large` | Compressed ZIP ≤100 MB |
| `archive_format_not_zip` | Valid, uncorrupted ZIP file |
| `archive_member_path_empty` | Entry path must not be empty |
| `archive_member_path_has_outer_whitespace` | Entry path must not begin/end with whitespace |
| `archive_member_path_has_backslash` | Entry path must use `/`, not backslashes |
| `archive_member_path_absolute` | Entry path must be relative to the archive root |
| `archive_member_path_has_empty_segment` | No empty path segments |
| `archive_member_path_has_parent_segment` | No `..` segments |
| `archive_member_path_too_deep` | At most 20 segments including filename |
| `archive_member_path_too_long` | Path within the supported length limit |
| `archive_member_path_normalization_collision` | Paths unique after case/Unicode normalization |
| `archive_member_type_unsupported` | Entries must be regular files or directories |
| `archive_member_too_large` | Entry ≤100 MiB |
| `archive_member_path_duplicate` | Entry path must be unique |
| `archive_member_path_type_conflict` | A file path cannot also be a directory or contain another entry |
| `archive_too_many_entries` | ≤5,000 entries |
| `archive_uncompressed_too_large` | Extracted archive ≤512 MiB |
| `archive_member_unreadable` | Every entry readable, not encrypted, supported compression |

## Plugin root errors

| Name | Requirement |
|---|---|
| `plugin_root_missing` | Selected path must exist and be a directory containing a plugin |
| `archive_plugin_files_missing` | A skills-only ZIP must contain a supported manifest and at least one valid skill at `skills/<skill>/SKILL.md` |
| `plugin_root_ambiguous` | ZIP must contain exactly one plugin root (archive root or one top-level directory) |
| `plugin_root_has_siblings` | A ZIP with a top-level plugin directory must not contain sibling files |

## Plugin manifest errors

| Name | Requirement |
|---|---|
| `plugin_manifest_missing` | ZIP must contain `.codex-plugin/plugin.json`, `.agent-plugin/plugin.json`, or `.claude-plugin/plugin.json` at root or in the single top-level directory |
| `plugin_manifest_not_file` | Manifest must be a regular JSON file |
| `plugin_manifest_unreadable` | Manifest must be readable UTF-8 text |
| `plugin_manifest_json_malformed` | Manifest must contain valid JSON (line number reported) |
| `plugin_manifest_root_not_object` | Manifest must contain a JSON object at the top level |
| `codex_manifest_parent_not_directory` | `.codex-plugin` must be a directory |
| `codex_manifest_path_not_file` | `.codex-plugin/plugin.json` must be a regular JSON file |
| `plugin_id_wrong_type` | `id` must be a string when provided |
| `plugin_id_empty` | `id` must be non-empty when provided |
| `plugin_name_missing` | `name` is required |
| `plugin_name_wrong_type` | `name` must be a string |
| `plugin_name_empty` | `name` must be non-empty |
| `plugin_name_too_long` | `name` ≤64 characters |
| `plugin_name_format` | `name` starts with ASCII letter/digit; only ASCII letters, digits, `_`, `-` |
| `plugin_version_missing` | `version` is required |
| `plugin_version_wrong_type` | `version` must be a string |
| `plugin_version_empty` | `version` must be a non-empty semver string, e.g. `1.0.0` |
| `plugin_version_not_semver` | `version` must use semantic versioning |
| `plugin_version_too_long` | `version` ≤64 characters |
| `plugin_description_missing` | `description` is required |
| `plugin_description_wrong_type` | `description` must be a string |
| `plugin_description_empty` | `description` must be non-empty |
| `plugin_description_too_long` | `description` ≤1,024 characters |
| `plugin_description_character_unsupported` | Supported text (line breaks allowed) |
| `plugin_developer_missing` | `author.name` required; `interface.developerName` also required (reported separately) |
| `plugin_author_wrong_type` | `author` must be an object |
| `plugin_author_name_wrong_type` | `author.name` must be a string |
| `plugin_author_name_empty` | `author.name` must be non-empty |
| `plugin_author_name_too_long` | ≤120 characters |
| `plugin_author_name_character_unsupported` | Supported text |
| `plugin_author_email_wrong_type` | `author.email` must be a string when provided |
| `plugin_author_email_empty` | Non-empty when provided |
| `plugin_author_email_too_long` | ≤320 characters |
| `plugin_author_email_character_unsupported` | Supported text |
| `plugin_author_url_wrong_type` | `author.url` must be a string when provided |
| `plugin_author_url_empty` | Non-empty when provided |
| `plugin_author_url_not_https` | Must be an HTTPS URL |
| `plugin_author_url_has_credentials` | Must not contain credentials |
| `plugin_author_url_too_long` | ≤2,048 characters |
| `plugin_author_url_character_unsupported` | Supported text |

## Listing and interface errors

The plugin manifest's `interface` object defines the public listing (fields such as `displayName`, `shortDescription`), stored in `.codex-plugin/plugin.json`:

```json
{
  "interface": {
    "displayName": "Example Plugin",
    "shortDescription": "Summarize documents",
    "longDescription": "Summarize and organize documents.",
    "developerName": "Example",
    "category": "Productivity",
    "capabilities": ["Summarize documents"]
  }
}
```

The four listing URLs (website, privacy policy, terms, support) are optional for skills-only plugins and required for MCP-backed plugins. Length limit: 2,048 characters for package validation, 1,024 for final directory submission.

| Name | Requirement |
|---|---|
| `plugin_interface_wrong_type` | `interface` must be a JSON object |
| `plugin_display_name_wrong_type` | `interface.displayName` must be a string |
| `plugin_display_name_empty` | Required, non-empty |
| `plugin_display_name_too_long` | ≤80 chars (package validation), ≤30 chars (final submission) |
| `plugin_display_name_character_unsupported` | Supported text |
| `plugin_short_description_missing` | Required, one line, ≤240 chars (validation) / ≤30 chars (final submission) |
| `plugin_short_description_wrong_type` | Must be a string |
| `plugin_short_description_empty` | Must be non-empty |
| `plugin_short_description_too_long` | ≤240 chars (validation) / ≤30 chars (final submission) |
| `plugin_short_description_character_unsupported` | Supported text |
| `plugin_long_description_wrong_type` | Must be a string |
| `plugin_long_description_empty` | Required, non-empty |
| `plugin_long_description_too_long` | ≤4,000 characters |
| `plugin_long_description_character_unsupported` | Supported text (line breaks allowed) |
| `plugin_developer_name_wrong_type` | Must be a string |
| `plugin_developer_name_empty` | Required, non-empty |
| `plugin_developer_name_too_long` | ≤120 chars (validation) / ≤80 chars (final submission) |
| `plugin_developer_name_character_unsupported` | Supported text |
| `plugin_category_wrong_type` | Must be a string |
| `plugin_category_empty` | Non-empty when provided; omit to use `Other` |
| `plugin_category_unknown` | Must be `Productivity`, `Creativity`, `Developer Tools`, `Business & Operations`, `Data & Analytics`, `Communication`, `Education & Research`, `Security`, `Finance`, `Healthcare`, `Travel`, `Entertainment`, or `Other` |
| `plugin_category_character_unsupported` | Supported text |
| `plugin_capabilities_wrong_type` | Must be a list of strings |
| `plugin_capabilities_too_many` | ≤20 entries |
| `plugin_capability_wrong_type` | Each entry must be a string |
| `plugin_capability_empty` | Each entry non-empty when provided |
| `plugin_capability_too_long` | ≤120 characters each |
| `plugin_capability_character_unsupported` | Supported text |
| `plugin_website_url_wrong_type` | Must be a string when provided |
| `plugin_website_url_empty` | Non-empty when provided |
| `plugin_website_url_format` | Must be an HTTPS URL |
| `plugin_website_url_too_long` | Meets listing URL length limits |
| `plugin_privacy_policy_url_wrong_type` | Must be a string when provided |
| `plugin_privacy_policy_url_empty` | Non-empty when provided |
| `plugin_privacy_policy_url_format` | Must be an HTTPS URL |
| `plugin_privacy_policy_url_too_long` | Meets listing URL length limits |
| `plugin_terms_of_service_url_wrong_type` | Must be a string when provided |
| `plugin_terms_of_service_url_empty` | Non-empty when provided |
| `plugin_terms_of_service_url_format` | Must be an HTTPS URL |
| `plugin_terms_of_service_url_too_long` | Meets listing URL length limits |
| `plugin_support_url_wrong_type` | Must be a string when provided |
| `plugin_support_url_empty` | Non-empty when provided |
| `plugin_support_url_format` | Must be an HTTPS URL |
| `plugin_support_url_too_long` | Meets listing URL length limits |
| `plugin_homepage_wrong_type` | Must be a string when provided |
| `plugin_homepage_empty` | Non-empty when provided |
| `plugin_homepage_format` | Must be an HTTPS URL |
| `plugin_homepage_too_long` | ≤2,048 characters |
| `plugin_brand_color_wrong_type` | Must be a string when provided |
| `plugin_brand_color_empty` | Non-empty when provided |
| `plugin_brand_color_format` | Six-digit hex color, e.g. `#1ABCFE` |
| `plugin_brand_color_dark_wrong_type` | Must be a string when provided |
| `plugin_brand_color_dark_empty` | Non-empty when provided |
| `plugin_brand_color_dark_format` | Six-digit hex color |
| `plugin_brand_color_contrast` | ≥2:1 contrast against white |
| `plugin_brand_color_dark_contrast` | ≥2:1 contrast against `#212121` |
| `plugin_default_prompt_wrong_type` | Must be a string or list of strings |
| `plugin_default_prompt_too_many` | At most three prompts |
| `plugin_default_prompt_entry_wrong_type` | Each entry must be a string |
| `plugin_default_prompt_empty` | Each entry non-empty when provided |
| `plugin_default_prompt_too_long` | ≤512 chars (validation) / ≤128 chars (final submission) |
| `plugin_default_prompt_character_unsupported` | Supported text, single line |

## Plugin content errors

| Name | Requirement |
|---|---|
| `plugin_skills_path_wrong_type` | `skills` must be a string path to the root `skills/` directory |
| `plugin_skills_path_empty` | Non-empty path when provided |
| `plugin_skills_path_unsupported` | Must resolve to the root `skills/` directory |
| `plugin_skills_directory_missing` | A declared root `skills/` directory must exist |
| `plugin_skills_path_not_directory` | Root `skills/` must be a directory when declared |
| `plugin_apps_path_wrong_type` | `apps` must be a string path to the root `.app.json` |
| `plugin_apps_path_empty` | Non-empty path when provided |
| `plugin_apps_path_unsupported` | Must resolve to the root `.app.json` |
| `plugin_apps_file_missing` | A declared root `.app.json` file must exist |
| `plugin_apps_path_not_file` | Root `.app.json` must be a regular file when declared |
| `plugin_runtime_surface_missing` | A skills-only ZIP must contain at least one valid skill at `skills/<skill>/SKILL.md`; app/MCP references don't satisfy this |

## Skill errors

| Name | Requirement |
|---|---|
| `skill_manifest_missing` | Skill must contain a `SKILL.md` file |
| `skill_bundle_too_large` | Each compressed skill bundle within the reported MiB limit |
| `skill_directory_hidden` | Skill directory names must not begin with `.` |
| `skill_manifest_nested` | Each skill directory must be an immediate child of `skills/` |
| `skill_manifest_not_regular_file` | `SKILL.md` must be a regular file |
| `skill_manifest_unreadable` | `SKILL.md` must be readable |
| `skill_manifest_invalid_utf8` | `SKILL.md` must contain valid UTF-8 |
| `skill_frontmatter_missing` | `SKILL.md` must start with YAML front matter between `---` lines |
| `skill_frontmatter_unclosed` | Front matter must end with `---` |
| `skill_frontmatter_yaml_malformed` | Front matter must contain valid YAML |
| `skill_frontmatter_wrong_type` | Front matter must contain a YAML mapping |
| `skill_name_missing` | `name` required, non-empty |
| `skill_name_wrong_type` | `name` must be a string |
| `skill_name_empty` | `name` must be non-empty |
| `skill_name_character_unsupported` | Supported text |
| `skill_description_missing` | `description` required, non-empty |
| `skill_description_wrong_type` | Must be a string |
| `skill_description_empty` | Must be non-empty |
| `skill_description_too_long` | ≤1,024 characters |
| `skill_description_character_unsupported` | Supported text |
| `skill_body_empty` | Skill instructions must not be empty |
| `skill_identity_too_long` | Combined `plugin-name:skill-name` ≤64 characters |
| `skill_identity_duplicate` | Each skill `name` must be unique within the plugin |

## Skill agent metadata errors

A bundled skill can define its own `interface` in `skills/<skill>/agents/openai.yaml` (separate from the plugin manifest's `interface`), using snake_case fields:

```yaml
interface:
  display_name: "Summarize documents"
  short_description: "Summarize a document"
  icon_small: "./assets/icon.png"
  default_prompt: "Summarize the selected document."
```

| Name | Requirement |
|---|---|
| `skill_agent_not_regular_file` | `agents/openai.yaml` must be a regular file |
| `skill_agent_unreadable` | Must be readable |
| `skill_agent_invalid_utf8` | Must contain valid UTF-8 |
| `skill_agent_yaml_malformed` | Must contain valid YAML |
| `skill_agent_top_level_wrong_type` | Must contain a YAML mapping at the top level |
| `skill_agent_interface_missing` | `interface` required when the file is included |
| `skill_agent_interface_wrong_type` | `interface` must be a YAML mapping |
| `skill_agent_display_name_missing` | `interface.display_name` required, non-empty |
| `skill_agent_display_name_wrong_type` | Must be a string |
| `skill_agent_display_name_empty` | Must not be empty |
| `skill_agent_short_description_missing` | `interface.short_description` required, non-empty |
| `skill_agent_short_description_wrong_type` | Must be a string |
| `skill_agent_short_description_empty` | Must not be empty |
| `skill_agent_icon_small_wrong_type` | Non-empty relative file path when provided |
| `skill_agent_icon_small_empty` | Non-empty relative file path when provided, e.g. `assets/icon.png` |
| `skill_agent_icon_large_wrong_type` | Non-empty relative file path when provided |
| `skill_agent_icon_large_empty` | Non-empty relative file path when provided, e.g. `assets/icon.png` |
| `skill_agent_brand_color_wrong_type` | Must be a string when provided |
| `skill_agent_brand_color_empty` | Non-empty six-digit hex when provided, e.g. `#1ABCFE` |
| `skill_agent_brand_color_format` | Six-digit hex color |
| `skill_agent_default_prompt_wrong_type` | Must be a string when provided |
| `skill_agent_default_prompt_empty` | Non-empty when provided |
| `skill_agent_policy_wrong_type` | `policy` must be a YAML mapping when provided |
| `skill_agent_allow_implicit_invocation_wrong_type` | `policy` may contain only `products` (`CHAT`, `CODEX`, or both) and `allow_implicit_invocation` (`true`/`false`) |
| `skill_agent_dependencies_wrong_type` | `dependencies` must be a YAML mapping; only `tools` supported |
| `skill_agent_dependency_unsupported` | Only `dependencies.tools` is supported |

## Asset path errors

| Name | Requirement |
|---|---|
| `declared_asset_path_wrong_type` | The named asset field must be a file path string |
| `declared_asset_path_empty` | Must not be empty |
| `declared_asset_path_has_outer_whitespace` | Must not begin/end with whitespace |
| `declared_asset_path_has_control_character` | Must not contain U+0000–U+001F or U+007F |
| `branding_asset_path_missing_root_prefix` | Must start with `./` |
| `declared_asset_path_unsafe` | Must be a relative path inside the plugin; no absolute path, drive prefix, or `..` traversal |
| `declared_asset_path_outside_package` | Must reference a file inside the plugin |
| `declared_asset_file_missing` | Referenced file does not exist |
| `declared_asset_not_regular_file` | Must reference a file, not a directory or special file |

## Image errors

Directory branding images must use a supported file type and meet size/dimension limits (starter-prompt screenshots use the separate portal limits above).

| Name | Requirement |
|---|---|
| `plugin_logo_path_missing` | `interface.logo` required, must reference a square image |
| `plugin_composer_icon_path_missing` | `interface.composerIcon` required, must reference a square image |
| `image_file_unreadable` | Image file must be readable |
| `image_file_too_large` | ≤5 MiB |
| `image_file_format_unsupported` | Filename ends in `.png`, `.jpg`, `.jpeg`, `.webp`, or `.svg` |
| `raster_image_decode_failed` | Must be a PNG, JPEG, or WebP that can be decoded safely |
| `raster_image_extension_content_mismatch` | Filename extension must match the detected format |
| `raster_image_not_square` | Image must be square |
| `raster_image_dimensions_too_small` | ≥48×48 pixels |
| `raster_image_dimensions_too_large` | ≤4,096×4,096 pixels |
| `svg_xml_malformed` | Must contain valid UTF-8 XML |
| `svg_root_element_invalid` | Root element must be `<svg>` |
| `svg_dimensions_missing` | Must define numeric `viewBox` or numeric `width`/`height` |
| `svg_dimensions_not_numeric` | Dimensions must be numeric, no units/percentages |
| `svg_dimensions_not_positive` | Width/height must be positive finite numbers |
| `svg_dimensions_not_square` | Dimensions must be square |
| `svg_dimensions_too_small` | ≥48×48 pixels |

## App reference errors

Shared package checks validate `.app.json` when a plugin references apps. The submission portal doesn't publish references to existing ChatGPT apps: a **Skills only** upload removes `.app.json`, and an MCP-backed submission must use **With MCP** and submit the MCP server directly. For local/workspace packages, the top-level `apps` object maps each app alias to an app entry.

| Name | Requirement |
|---|---|
| `app_manifest_unreadable` | `.app.json` must be readable UTF-8 text |
| `app_manifest_json_malformed` | Malformed JSON near the reported line |
| `app_manifest_wrong_type` | Must contain a JSON object at the top level |
| `app_entries_missing` | `apps` is required |
| `app_entries_wrong_type` | `apps` must be an object |
| `app_entry_wrong_type` | Each app entry must be an object |
| `app_id_missing` | Each entry's `id` is required |
| `app_id_wrong_type` | `id` must be a string |
| `app_id_format` | `id` must begin with `asdk_app_`, `connector_`, or `templated_apps_`, followed by a letter/digit then only letters, digits, `_`, `-` |
| `app_entry_optional_wrong_type` | `optional` must be `true`/`false` when provided |
| `app_entry_required_wrong_type` | `required` must be `true`/`false` when provided |
| `app_not_eligible` | For local/workspace packages, referenced apps must be a released public Codex app, available connector, or released app template; directory submissions must use **With MCP** and submit the MCP server directly |

## Package warnings

These identify package content that validation ignores or normalizes; they don't block submission but should be reviewed.

| Name | Requirement |
|---|---|
| `duplicate_app_reference` | Each app ID in `.app.json` referenced once; duplicates treated as one app |
| `undeclared_app_manifest_ignored` | Root `.app.json` imported only when the manifest's `apps` field is set to `./.app.json` |
| `undeclared_mcp_manifest_ignored` | Root `.mcp.json` imported only when the manifest's `mcpServers` field is set to `./.mcp.json` |
| `skill_file_ignored` | Files directly under `skills/` aren't imported as skills; each skill must be in a directory containing `SKILL.md` |
| `skill_symlink_ignored` | Symlinks directly under `skills/` aren't imported as skills; each skill must be a real directory containing `SKILL.md` |
| `skill_frontmatter_adjusted` | Skill `name`/`description` normalized during import (trimmed/collapsed whitespace) |
| `skill_metadata_ignored` | Skill interface settings must use the `interface` mapping in `agents/openai.yaml`; `metadata` in `SKILL.md` doesn't configure the interface |

## Notes

- After resolving all validation errors, return to `submission.md` to complete the submission.

## Related

- [Submission](./submission.md)
- [Review Requirements](./review-requirements.md)
