---
title: Japanese Keyboard on Linux
description: A guide on how to setup a Japanese keyboard on Gnome (Wayland)
---

Since I used to consider myself an _otaku_, and also reside in the originating country of this language 
I need a Japanese keyboard, even though you might **buy** a japanese keyboard, believe 
me, it's better (at least in Linux) to make do with a bit of **software emulation**.

## Preamble

Credit where credit is due, this [video](https://www.youtube.com/watch?v=lJoXhS4EUJs) helped me a lot, luckily it was on 
**Arch**, other things such as **Manjaro-GNOME** specific centric things I figured them 
out on my own.

## Instructions

In order to get everything going. On an `arch` fresh install you'd have to do the 
following:

- `yay -S adobe-source-han-sans-jp-fonts`
- `yay -S adobe-source-han-serif-jp-fonts`
- `yay -S fcitx5-im fcitx5-configtool fcitx5-mozc`
- Edit `/etc/locale.gen`, uncomment `#ja_JP.UTF-8 UTF-8`
- Save the file
- Regenerate the locales with `sudo locale-gen`
- Configure something so that `fcitx5` auto-starts, in our case this is part of the 
[.zshrc file](/settings/zsh).
- We need to add environment variables so that `fcitx5` starts _and actually works_ 
a good way to set environment variables is in a `~/.zshenv` file, in here we should 
set up as follows:
```
export GTK_IM_MODULE='fcitx'
export QT_IM_MODULE='fcitx'
export SDL_IM_MODULE='fcitx'
export XMODIFIERS='@im=fcitx'
```
- We need to add the `Mozc` keyboard as part of the layouts that our _DE_ has registered. 
After doing so, we should be seeing a keyboard in the **icon tray** by pressing the 
_Hotkey_ to switch between layouts we should be switching to Japanese (e.g. `Ctrl + Space`). 
    -- You will have to start `fcitx5-configtool` so that you can add the `Mozc` keyboard, also 
    be sure to uncheck the `Show only current language` checkbox.
- GNOME might require for a specific addon to be installed so that it integrates with 
`fcitx` correctly, [download it and install it](https://extensions.gnome.org/extension/261/kimpanel/). 
This basically will make it so that the window that pops up with the 変換 is aligned 
with the theme, (_I love dark themes, so the window will also be dark and stylized_).

Since (as of today), **Wayland** is the new standard for the latest versions of 
**GNOME**, we have to work with `fcitx5`, this is the new standard that integrates 
seamlessly.

_mini note:_ You can even customize the theme of `fcitx` perhaps I will dabble in 
that in the future? _(time will tell)_

### KDE Plasma

_(Stayed until late for this one)_. I was trying out this config in a **virtual machine**
to see if it is actually **idempotent**, but there's this really specific bug on KDE 
Plasma.

Nothing will work unless you **remove the default (US) keyboard**. **_Save_**, re-add 
US-Keyboard and **then** add **_Mozc_**. After this it started working on KDE Plasma 
as well. (Just fyi, KDE Plasma also uses Wayland by default).

[Source](https://www.reddit.com/r/GarudaLinux/comments/q23yya/keyboard_layout_reset_on_reboot/)

_Extra Note:_ For whatever reason `fcitx5-configtool` will open up Plasma's own 
**Settings** window, so you can just add Mozc there.

## About Wayland, what is it?

Before going into details, let's define something:

**Display Protocol:** This is a _middleman_ between **applications** and the **screen/keyboard
/mouse**. Apps don't talk directly to the screen, they talk to this intermediate layer.

There are currently (in Linux distros) two protocols:

**X11:** This is a _display protocol_ that used to be a standard since the mid-80s, 
it had a strategy of intercepting all signals in its **X server** which then talked 
to the hardware.

**Wayland:** This is another iteration of a _display protocol_ but that started 
pretty recently (2008), it was intended as a replacement for `X11`. Its strategy is 
different since it enables apps to talk more directly to the **_compositor_**, which 
is the program that draws things on the screen (GNOME Shell, KDE's KWin).

Because X11 was the standard for so long, many apps **don't support the newer approach**, 
but Wayland is being **pushed heavily by all the Linux community**. There's even 
solutions that sort of translate things _X11 apps to Wayland_, a sort of **compatibility 
layer**.

This can affect sometimes the solutions, errors and other things we configure on 
our **linux distro** so we should be aware of this concepts to **debug and lookup 
info more accurately.**

## GNOME Shenanigans

In order to keep my environment consistent, since I use a custom keyboard (Keychron 
K2 HE btw), layout is differently, and I am switching between windows and Linux. 
Muscle memory plays a big role when it comes to speed and consistency with the things 
I write (since I'm a coder). And so, one specific thing to fcxit and its input source 
switching is that it's mapped by default to `Ctrl + Space`, however, on Windows that 
key is `Super (Win) + Space`. Since in Linux you can do whatever you want, I'd rather 
adapt that into Windows shortcuts than the other way around and train my brain again.

And so, you can customize the hotkey for that pretty easily by going into the **Settings** 
section of fcxit. However, _GNOME_ has something already mapped to `Super + Space`. 
So you need to:

. Go into the settings in Gnome, Keyboard > Hotkeys
. Search for `Switch to next input source`.
. Unassign the keymap here
. Go into fcxit, change the input change to `Super + Space`

And with this, the input source change should be transferrable across OS.