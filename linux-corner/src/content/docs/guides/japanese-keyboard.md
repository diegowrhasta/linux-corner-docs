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

Since (as of today), **Wayland** is the new standard for the latest versions of 
**GNOME**, we have to work with `fcitx5`, this is the new standard that integrates 
seamlessly.

### KDE Plasma

_(Stayed until late for this one)_. I was trying out this config in a **virtual machine**
to see if it is actually **idempotent**, but there's this really specific bug on KDE 
Plasma.

Nothing will work unless you **remove the default (US) keyboard**. **_Save_**, re-add 
US-Keyboard and **then** add **_Mozc_**. After this it started working on KDE Plasma 
as well. (Just fyi, KDE Plasma also uses Wayland by default).

[Source](https://www.reddit.com/r/GarudaLinux/comments/q23yya/keyboard_layout_reset_on_reboot/)

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