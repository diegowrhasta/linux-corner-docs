---
title: Visual Studio Code
description: Not entirely Linux related, but still, interesting topics
---

This guide discusses different problems and solutions found for Visual Studio Code 
(specifically its Open Source fork VSCodium), all of the info will come out of 
working on Linux (Manjaro-Gnome) so Linux related quirks or problems will come up 
for sure.

## Contributions

- If there are comments or observations into any of the guides that are presented 
here feel free to open a [PR](https://github.com/diegowrhasta/linux-corner-docs/compare) 
so that I can have a look at it, thanks!

## Settings

These are personal settings, 

````json
{
    "workbench.iconTheme": "material-icon-theme",
    "editor.rulers": [80, 120, 144],
    "[markdown]": {
        "editor.unicodeHighlight.ambiguousCharacters": false,
        "editor.unicodeHighlight.invisibleCharacters": false,
        "diffEditor.ignoreTrimWhitespace": false,
        "editor.wordWrap": "off",
        "editor.quickSuggestions": {
            "comments": "off",
            "strings": "off",
            "other": "off"
        }
    },
    "extensions.experimental.affinity": {
        "asvetliakov.vscode-neovim": 1
    }
}
````

**NOTE:** A specific rule I have is to **_never wrap text_**, **rulers** are there for a 
reason, and I don't want the editor wrapping text to give me a false sense of 
security that my line is not too long, Visual Studio _by default_ has m**arkdown 
with wrapping text**, I overrode that on the settings.