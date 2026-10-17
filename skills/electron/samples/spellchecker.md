---
source: https://www.electronjs.org/docs/latest/tutorial/spellchecker
---

# SpellChecker

Set spellchecker languages, show suggestions in a context menu, and use a custom dictionary download URL.

```js
// Sets the spellchecker to check English US and French
myWindow.webContents.session.setSpellCheckerLanguages(['en-US', 'fr'])

// An array of all available language codes
const possibleLanguages = myWindow.webContents.session.availableSpellCheckerLanguages
```

```js
const { Menu, MenuItem } = require('electron')

myWindow.webContents.on('context-menu', (event, params) => {
  const menu = new Menu()

  // Add each spelling suggestion
  for (const suggestion of params.dictionarySuggestions) {
    menu.append(
      new MenuItem({
        label: suggestion,
        click: () => myWindow.webContents.replaceMisspelling(suggestion)
      })
    )
  }

  // Allow users to add the misspelled word to the dictionary
  if (params.misspelledWord) {
    menu.append(
      new MenuItem({
        label: 'Add to dictionary',
        click: () => myWindow.webContents.session.addWordToSpellCheckerDictionary(params.misspelledWord)
      })
    )
  }

  menu.popup()
})
```

```js
myWindow.webContents.session.setSpellCheckerDictionaryDownloadURL('https://example.com/dictionaries/')
```

## Notes

- The spellchecker is enabled by default (Electron 9+). On Windows and Linux it uses Hunspell dictionaries; on macOS it uses the native spellchecker, whose language cannot be set (it is auto-detected).
- By default the language matching the OS locale is enabled.
- Hunspell dictionary files are downloaded from a Google CDN by default; `setSpellCheckerDictionaryDownloadURL` points to your own host.
- `myWindow` is a `BrowserWindow` instance created elsewhere.
