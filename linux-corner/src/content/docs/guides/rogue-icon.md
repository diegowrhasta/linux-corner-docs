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
available globally. In case we install it with **cargo**, it won't be. Hence we have 
to do some configurations on our side.

**cargo** installed binaries are always at `~/.cargo/bin/`. And a DE such as **GNOME** 
in order to detect executables/binaries, it will look at at two paths: 

- `/usr/bin`
- `/usr/local/bin`

_What now?_. Pretty simple, by being a bit clever we can take advantage of the 
**symlink** feature that exists in **Linux**. Which are basically files that are 
_a dummy_ in a way, that when queried will bounce the caller back to another file/
executable. And so by running:

```
sudo ln -s ~/.cargo/bin/alacritty /usr/local/bin/alacritty
```

After applying this, we should get the `Alacritty` desktop entry available and when 
opening it we should have a **_blazingly fast_** terminal emulator ready for use.

_NOTE:_ There's a utility that allows to pipe a `.desktop` file to it to see if 
it's at the very least formatted correctly: `desktop-file-validate <file-path>`.

