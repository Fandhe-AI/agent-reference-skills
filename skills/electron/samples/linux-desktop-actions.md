---
source: https://www.electronjs.org/docs/latest/tutorial/linux-desktop-actions
---

# Linux Desktop Launcher Actions

Add custom entries to the Linux system launcher menu through the app's `.desktop` file.

```plaintext
Actions=PlayPause;Next;Previous

[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t

[Desktop Action Next]
Name=Next
Exec=audacious -f

[Desktop Action Previous]
Name=Previous
Exec=audacious -r
```

## Notes

- Each action needs `Name` and `Exec`; the desktop runs `Exec` when the user clicks the entry (see the freedesktop.org Desktop Entry Specification).
- The preferred way for the desktop to instruct the app is via command-line parameters, read from `process.argv`.
- The example uses `audacious` commands from the official page; replace them with your own executable.
- Source is a `.desktop` file snippet, not JavaScript; the page has no other code.
