---
title: What if you bricked GNOME?
description: Happened to me once I tried to switch package manager mirrors
---

If you willy-nillingly switch _repository mirrors_ and upgrade your system and 
then go back to another set of _mirrors_. You might run into issues that brick the 
whole **GNOME Desktop Environment**.

## The symptom

It was that after I had changed my mirrors for the package manager to another mirror
since it was returning tons of **connection errors**, I realized that GNOME _had died_.

A screen with `Oops an Error Occured Please contact a system manager` was my only 
friend.

Luckily, the DE is only _one_ way to use the computer. On **Linux** you can press 
something like `Ctrl + 4` and this will default to the `terminal`. In here you can 
login with a user and a password (_be sure to remember these, I know I forgot about 
them_). It's in here that you can start trying things out by re-installing the whole 
**GNOME DE** or trying to troubleshoot what went wrong.

## Package manager mirrors

When running a command such as `yay -Syu` there are a couple of things that take 
place:

- **Sync database from mirrors** `-Sy`
    - `pacman` downloads `.db` files (package lists) from your selected mirror(s)
    - These contain **package metadata**, which includes the latest version numbers 
    available in that repository.
- **Compare local vs remote versions**
    - `pacman` will check the installed package versions against those that are in 
    the `.db` files
- **Upgrade packages that are older than repo versions** `u`
    - If local < repo, then the repo package is downloaded and installed

## Mirrors and local copies

When trying to run `yay -Syu` I noticed a message specifically with the GNOME package 
stating: `local package is newer`. This warning/error means that the machine's current 
package is actually newer than what the mirror holds. How can this happen:

- **Mirror lag:** Manjaro mirrors sync at different times
    - Say, you were at a really fast/up-to-date mirror, upgraded with that and 
    then switched to another mirror that's still catching up, hence you will get 
    this conflict
- **Partial upgrade:** There can also be an issue of a specific dependency of GNOME 
getting upgraded and that conflicting entirely, since almost always, GNOME requires 
specific matching versions to work correctly
- **Switched branches:** If you configure to be at the `unstable` branch and then 
switch back to `stable` packages will forever be branded as "newer"

## Fixing the error

If, for example, `libmutter.so` was upgraded to a newer version that breaks with an 
older GNOME version, that's when we get the error that completely bricks GNOME.

_How to fix this?_ Simply force a full upgrade/synchronization on the current mirror 
for all packages. So that everything follows the newer **source of truth** and packages 
are compatible within that snapshot.

```
sudo pacman-mirrors --fasttrack && yay -Syyu
```

This will, first, ping all possible mirrors and then pick the most up-to-date plus 
the fastest mirror relative to the machine. After that it will register those mirrors 
to be the **source of truth**. And it is after this that we run an upgrade that 
ignores cache (so it forcefully re-downloads from the mirror).

**_Why can this happen in Manjaro?_** This distro has **three branches** (unstable, 
testing, stable) and mirrors are distributed for each branch. Stable mirrors lag 
behind unstable by days/weeks. 

Mirrors, _tend_ to update **every few hours**, but there are instances in which 
a mirror serves a previous snapshot and will update in weeks. There's a website 
to check on [mirror's freshness](https://repo.manjaro.org/). And even then **_some_** 
packages can also be left outdated for longer.

## Extra: GPG signature error

Even though I wanted to run the upgrade and be done with it I got hit with another 
error (that you tend to see sometimes), `GPG Signature error`. This error can be 
thrown if:

- The package database or downloaded package was signed by a key that pacman either:
    - "doesn't know about"
    - "doesn't trust"
    - "or whose signature doesn't match the file"

**These keys are used for security purposes entirely.**

The easiest explanation for this is that the machine's **keyring package** is outdated.

And so, we have to update the keyring packages first:

```
sudo pacman -Sy archlinux-keyring manjaro-keyring
sudo pacman-key --init
sudo pacman-key --populate archlinux manjaro
sudo pacman-key --refresh-keys
```

And after that we can then attempt an upgrade again:

```
sudo rm -r /var/lib/pacman/sync
yay -Syyu
```

This is making sure to delete any form of cache, and then hitting a forceful system 
upgrade.