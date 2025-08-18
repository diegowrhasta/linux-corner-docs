---
title: Rogue icon
description: What if you thought you deleted a desktop entry but it still shows up?
---

You sometimes swear you removed a program with the package manager or by running 
an uninstall script but the icon still shows up, (and it's broken!)

## Solution

In **Manjaro-GNOME**, you can easily look up where this `.desktop` entry is at 
by looking at the paths that are established by convention:

| Location Type       | Path                                                                 |
|---------------------|----------------------------------------------------------------------|
| System-wide apps    | `/usr/share/applications/`                                           |
| User-specific apps  | `~/.local/share/applications/`                                       |
| Flatpak (per-user)  | `~/.local/share/flatpak/exports/share/applications/`                 |
| Flatpak (system)    | `/var/lib/flatpak/exports/share/applications/`                       |

You can search in any of these places, (hopefully you didn't use the flatpak version, 
that's _not good_). An easy to use command to grep for the entry is: 
`grep -ril "appname" <path>`. When the specific offender has been found, you can 
easily delete it.

## What is a desktop file?

For those uninitiated, on DE (Desktop Environments) on Linux, they tend to have 
all the `shortcuts` named as `desktop entries`. These are `.desktop` files with 
a structure such as this one:

```
[Desktop Entry]
Type=Application
TryExec=alacritty
Exec=alacritty
Icon=Alacritty
Terminal=false
Categories=System;TerminalEmulator;

Name=Alacritty
GenericName=Terminal
Comment=A fast, cross-platform, OpenGL terminal emulator
StartupNotify=true
StartupWMClass=Alacritty
Actions=New;
X-Desktop-File-Install-Version=0.28

[Desktop Action New]
Name=New Terminal
Exec=alacritty
```

These are simple text files that will tell the `DE` where an executable for a file 
is at, where its icon is at, besides other metadata that is fed into the entry that 
can then show up on your _desktop/main menu/search_.

In short, you can add these entries as any text file in the respective path and the 
`DE` should pick it up and allow for you to execute it so that it patches back 
to the respective application.

## How to keep desktop entries clean

When looking at a specific line in the alacritty `.desktop` file you might notice 
that the `Exec` is literally just `alacritty` which would imply alacritty is somehow 
available globally. 

The way to let GNOME see this executable is discused at the [alacritty section](/settings/alacrity/#the-alacritty-desktop-entry), 
however, what you need to know at least when it comes to **GNOME** is that it will 
only detect as _"global"_ executables, binaries that are at

- `/usr/bin`
- `/usr/local/bin`

Any sort of executable we want to reference directly without a _full path_ we should make 
sure is at either of these two paths (by convention `/usr/local/bin` is for software 
installed locally, so not installed by the package manager).
