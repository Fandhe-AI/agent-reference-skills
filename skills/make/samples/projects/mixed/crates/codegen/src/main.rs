//! make skill sample (mixed): codegen
//!
//! Rust owns this crate's own build graph via Cargo; this binary is the
//! one explicit hand-off point from the Rust side to the Node side. It
//! writes a small JSON file that `packages/web` reads at test time. No
//! third-party dependencies (no serde_json) -- the payload is small and
//! fixed-shape enough that a hand-written, unit-tested JSON string
//! builder is clearer than a dependency for a sample this size.
//!
//! Usage: codegen <output-path>
//! Exit code: 0 on success, 2 on bad usage or I/O failure.

use std::env;
use std::fs;
use std::path::Path;
use std::process::ExitCode;

/// Builds the JSON payload written to the output path. Kept separate from
/// `main` so it has a direct unit test with no filesystem involved.
fn build_payload(version: &str, generated_by: &str) -> String {
    format!(
        "{{\n  \"version\": {},\n  \"generatedBy\": {}\n}}\n",
        json_string(version),
        json_string(generated_by)
    )
}

/// Minimal JSON string escaping sufficient for this sample's fixed inputs
/// (crate version and a literal program name) -- not a general-purpose
/// JSON encoder.
fn json_string(value: &str) -> String {
    let mut out = String::with_capacity(value.len() + 2);
    out.push('"');
    for ch in value.chars() {
        match ch {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\n' => out.push_str("\\n"),
            _ => out.push(ch),
        }
    }
    out.push('"');
    out
}

fn main() -> ExitCode {
    let args: Vec<String> = env::args().collect();
    let Some(output_path) = args.get(1) else {
        eprintln!("usage: codegen <output-path>");
        return ExitCode::from(2);
    };

    let payload = build_payload(env!("CARGO_PKG_VERSION"), "codegen");

    let path = Path::new(output_path);
    if let Some(parent) = path.parent() {
        if !parent.as_os_str().is_empty() {
            if let Err(err) = fs::create_dir_all(parent) {
                eprintln!("codegen: failed to create {}: {err}", parent.display());
                return ExitCode::from(2);
            }
        }
    }

    if let Err(err) = fs::write(path, payload) {
        eprintln!("codegen: failed to write {output_path}: {err}");
        return ExitCode::from(2);
    }

    println!("codegen: wrote {output_path}");
    ExitCode::SUCCESS
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn build_payload_embeds_version_and_source() {
        let payload = build_payload("0.1.0", "codegen");
        assert!(payload.contains("\"version\": \"0.1.0\""));
        assert!(payload.contains("\"generatedBy\": \"codegen\""));
    }

    #[test]
    fn json_string_escapes_quotes_and_backslashes() {
        assert_eq!(json_string("a\"b\\c"), "\"a\\\"b\\\\c\"");
    }
}
