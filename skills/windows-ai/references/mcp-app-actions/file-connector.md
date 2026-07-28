# Windows File Explorer MCP connector

A built-in MCP server that provides tools to access and modify files in common user folders (Documents, Desktop, Downloads, Music, Videos, Pictures) and public folders.

## Options / Props

| Tool | Input | Output | Notes |
|------|-------|--------|-------|
| get_file_details | path | extension, size, creationTime, lastAccessTime, lastWriteTime | Read-only, metadata only |
| create_directory | path, directoryName | result | Destructive |
| move_file | oldFullPath, newFullPath | result | Destructive (move/rename) |
| create_text_file | path, filename, content | result | Destructive |
| read_file | filePath | contents, _meta | Read-only, resource content |
| get_directories | path | result (array of {path}) | Read-only |
| unzip_folder | zipPath, extractPath | path | Destructive |
| zip_folder | folderPath, zipName | path | Destructive |
| read_text_file | filePath | result | Read-only; supports Office/PDF formats |
| edit_text_file | filePath, oldText, newText | result | Destructive |
| search_files | startingDir, searchPatterns, optional filters (specifiedFileTypes, startDate, endDate) | result (name, path, dateCreated, snippet) | On Copilot+ PCs supports semantic natural-language search |

## Notes

- File access requires explicit user permission; users and administrators may deny access.
- Illustrates MCP's dynamic tool discovery: agents query the tool list and parameters at runtime rather than hardcoding calls into a connector app.
- Namespace context: this is a Windows-provided MCP server exposed through the ODR, distinct from any app-specific file APIs.

## Related

- [MCP on Windows overview](./mcp-overview.md)
- [Securely containing MCP servers on Windows](./mcp-containment.md)
