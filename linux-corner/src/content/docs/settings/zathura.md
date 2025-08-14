---
title: Zathura config
description: Notes on how I configure Zathura for reading
---

Zathura is another open-source tool that embraces the **vim principles** and integrates 
seammlessly as if it were a document visualizer with the terminal.

## Settings rundown

```
# Default: light mode
set recolor false

# Dark mode colors
set recolor-lightcolor "#1e1e1e"
set recolor-darkcolor "#c0c0c0"

map t feedkeys ":set recolor <Return>"
```

This is pretty simple, we set a `recolor` palette of sorts, so that the background 
and the text have a specific set of colors. And it's then that with remaps we make 
it seem as though we are switching between themes by running a whole command to apply 
the recolor or not (toggle).

## Hotkeys cheatsheet

- `t` = Toggle between dark and white mode
- `z + i` = Zoom in
- `z + o` = Zoom out
- `z + 0` = Zoom to original size

## About zathura

Zathura as a **tool** is simply installed with `yay -S zathura`, but it needs a **backend**, 
so that it can actually visualize files. If you want to visualize pdfs you would have 
to install something like: `yay -S zathura-pdf-mupdf`.