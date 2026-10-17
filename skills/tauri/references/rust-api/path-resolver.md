---
source: https://docs.rs/tauri/2.12.4/tauri/path/struct.PathResolver.html
---

# PathResolver / BaseDirectory

The path resolver is a helper class for general and application-specific path APIs. Obtained with `Manager::path()` on every platform.

## Signature / Usage

```rust
pub struct PathResolver<R: Runtime>(/* private fields */);
```

```rust
use tauri::{path::BaseDirectory, Manager};
tauri::Builder::default()
  .setup(|app| {
    let path = app.path().resolve("path/to/something", BaseDirectory::Config)?;
    assert_eq!(path.to_str().unwrap(), "/home/${whoami}/.config/path/to/something");
    Ok(())
  });
```

```rust
use tauri::Manager;
tauri::Builder::default()
  .setup(|app| {
    let path = app.path().parse("$HOME/.bashrc")?;
    assert_eq!(path.to_str().unwrap(), "/home/${whoami}/.bashrc");
    Ok(())
  });
```

## Methods

All return `Result<PathBuf>` unless noted.

| Method | Linux | macOS | Windows |
| --- | --- | --- | --- |
| audio_dir | `xdg-user-dirs` `XDG_MUSIC_DIR` | `$HOME/Music` | `{FOLDERID_Music}` |
| cache_dir | `$XDG_CACHE_HOME` or `$HOME/.cache` | `$HOME/Library/Caches` | `{FOLDERID_LocalAppData}` |
| config_dir | `$XDG_CONFIG_HOME` or `$HOME/.config` | `$HOME/Library/Application Support` | `{FOLDERID_RoamingAppData}` |
| data_dir | `$XDG_DATA_HOME` or `$HOME/.local/share` | `$HOME/Library/Application Support` | `{FOLDERID_RoamingAppData}` |
| local_data_dir | `$XDG_DATA_HOME` or `$HOME/.local/share` | `$HOME/Library/Application Support` | `{FOLDERID_LocalAppData}` |
| desktop_dir | `XDG_DESKTOP_DIR` | `$HOME/Desktop` | `{FOLDERID_Desktop}` |
| document_dir | `XDG_DOCUMENTS_DIR` | `$HOME/Documents` | `{FOLDERID_Documents}` |
| download_dir | `XDG_DOWNLOAD_DIR` | `$HOME/Downloads` | `{FOLDERID_Downloads}` |
| executable_dir | `$XDG_BIN_HOME/../bin` or `$XDG_DATA_HOME/../bin` or `$HOME/.local/bin` | Not supported | Not supported |
| font_dir | `$XDG_DATA_HOME/fonts` or `$HOME/.local/share/fonts` | `$HOME/Library/Fonts` | Not supported |
| home_dir | `$HOME` | `$HOME` | `{FOLDERID_Profile}` |
| picture_dir | `XDG_PICTURES_DIR` | `$HOME/Pictures` | `{FOLDERID_Pictures}` |
| public_dir | `XDG_PUBLICSHARE_DIR` | `$HOME/Public` | `{FOLDERID_Public}` |
| runtime_dir | `$XDG_RUNTIME_DIR` | Not supported | Not supported |
| template_dir | `XDG_TEMPLATES_DIR` | Not supported | `{FOLDERID_Templates}` |
| video_dir | `XDG_VIDEOS_DIR` | `$HOME/Movies` | `{FOLDERID_Videos}` |
| temp_dir | `std::env::temp_dir` | `std::env::temp_dir` | `std::env::temp_dir` |

App-specific:

| Method | Signature | Description |
| --- | --- | --- |
| file_name | `pub fn file_name(&self, path: &str) -> Option<String>` | Final component of the path; `None` if it terminates in `..`. On Android also supports content URIs (e.g. from the dialog plugin). |
| resource_dir | `pub fn resource_dir(&self) -> Result<PathBuf>` | Resource directory of this app (see Notes). |
| app_config_dir | `pub fn app_config_dir(&self) -> Result<PathBuf>` | `config_dir/${bundle_identifier}`, unless overridden with `app > appDirectoriesOverride`. |
| app_data_dir | `pub fn app_data_dir(&self) -> Result<PathBuf>` | `data_dir/${bundle_identifier}`, unless overridden. |
| app_local_data_dir | `pub fn app_local_data_dir(&self) -> Result<PathBuf>` | `local_data_dir/${bundle_identifier}`, unless overridden. On Windows and Linux also the default data directory of the webviews. |
| app_cache_dir | `pub fn app_cache_dir(&self) -> Result<PathBuf>` | `cache_dir/${bundle_identifier}`, unless overridden (a single root override resolves to `<root>/caches`). |
| app_log_dir | `pub fn app_log_dir(&self) -> Result<PathBuf>` | Linux and Windows: `local_data_dir/${bundle_identifier}/logs`; macOS: `home_dir/Library/Logs/${bundle_identifier}`; overridable (a single root override resolves to `<root>/logs`). |
| resolve | `pub fn resolve<P: AsRef<Path>>(&self, path: P, base_directory: BaseDirectory) -> Result<PathBuf>` | Resolves the path with the base directory. |
| parse | `pub fn parse<P: AsRef<Path>>(&self, path: P) -> Result<PathBuf>` | Parses the path, resolving a `BaseDirectory` variable if the path starts with one. |

`BaseDirectory` (`#[non_exhaustive]`, `#[repr(u16)]`):

```rust
#[non_exhaustive]#[repr(u16)]pub enum BaseDirectory {
    Audio = 1,
    Cache = 2,
    Config = 3,
    Data = 4,
    LocalData = 5,
    Document = 6,
    Download = 7,
    Picture = 8,
    Public = 9,
    Video = 10,
    Resource = 11,
    Temp = 12,
    AppConfig = 13,
    AppData = 14,
    AppLocalData = 15,
    AppCache = 16,
    AppLog = 17,
    Desktop = 18,
    Executable = 19,
    Font = 20,
    Home = 21,
    Runtime = 22,
    Template = 23,
}
```

Each variant resolves to the `PathResolver` method of the same name (`Audio` to `audio_dir`, `AppConfig` to `app_config_dir`, `Temp` to `std::env::temp_dir`, etc.). `Desktop`, `Executable`, `Font`, `Runtime` and `Template` are non-Android only. `BaseDirectory::variable(self) -> &'static str` gets the variable representing the directory in string paths; `BaseDirectory::from_variable(variable: &str) -> Option<Self>` is the inverse.

## Notes

- docs.rs renders the non-Android definition of `PathResolver` ("Available on non-Android only"); Android has its own implementation with the same methods, as the `file_name` and `resource_dir` notes show.
- `resource_dir`: the exact path is not a contract and may change. Windows: directory containing the main executable. Linux in an AppImage: `${APPDIR}/usr/lib/${exe_name}`; otherwise `/usr/lib/${exe_name}`; when running from `src-tauri/target/(debug|release)/`: `${exe_dir}/../lib/${exe_name}`. macOS: `${exe_dir}/../Resources` (inside .app). iOS: `${exe_dir}/assets`. Android: resources are APK assets, so a special URI prefix `asset://localhost/` is returned, usable with the file system plugin, e.g. `app.fs().read_to_string(app.path().resource_dir().unwrap().join("resource"));`.
- `home_dir` on iOS cannot be written to directly; use one of the app paths.
- If you only deal with plain file system paths (not Android content URIs), prefer `Path::file_name` over `file_name`.

## Related

- [Manager](./manager.md)
- [App](./app.md)
- [Image](./image.md)
