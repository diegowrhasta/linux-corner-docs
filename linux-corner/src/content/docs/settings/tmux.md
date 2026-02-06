---
title: Tmux Settings
description: Layout on how tmux is setup 
---

Tmux is a small open-source terminal multiplexer. It allows to manage multiple 
terminal sessions within a single window.

## Why Tmux?

Open-source, to the point, can be easily installed from the package manager directly. 
But the idea that you can attach to a previous session and restore your working 
session is pretty neat, besides, this is really fast.

Overall, it has all the capabilities necessary to enable a mouse-less experience, 
something that I thrive for, since I personally find the moment your hands move 
towards the mouse, you break flow, and easily become slower.

## Configuration rundown

```
# GENERAL CONFIGS

set -g history-limit 10000

# let tmux see all the modifier combinations from Alacritty
set -g xterm-keys on

# Tell tmux to advertise a 256-color smart terminal
set -g default-terminal "tmux-256color"

# List of plugins
set -g @plugin 'tmux-plugins/tpm'           # Plugin manager (MUST BE FIRST!)
set -g @plugin 'tmux-plugins/tmux-resurrect' # Session persistence
set -g @plugin 'tmux-plugins/tmux-continuum' # Auto save/restore

# Plugin-specific configurations (optional)
set -g @continuum-restore 'on'

# Initialize TPM (keep this line at the very bottom of your config!)
run '~/.tmux/plugins/tpm/tpm'

# BINDINGS

# ↑ scroll up one line (or enter copy-mode if not already)
bind -n C-S-Up if-shell -F "#{pane_in_mode}" \
    "send-keys -X scroll-up"       \
    "copy-mode -u"

# ↓ scroll down one line (or exit if at bottom)
bind -n C-S-Down if-shell -F "#{pane_in_mode}" \
    "send-keys -X scroll-down"     \
    "send-keys q"                  # exit copy-mode if you hit the bottom

# Expanding new tab with current directory (Ctrl + T)

bind-key C-t new-window -c "#{pane_current_path}"
```

In short:

- Tmux by default keeps in buffer 2000 lines back, in our case, if we have to analyze 
a lot of data and stuffs, we are setting it to keep in buffer 10000 lines back.
- Since we are doing this Alacritty + Tmux combo, some of the command that Alacritty 
sends all the way down might be ignored, specially since we use a lot of modifying 
keys. This allows for tmux to recognize all the signals.
- We tell all programs running inside tmux to run on `tmux-256color`, this support 
will be propagated across all tmux panes. This is more accurate for tmux's capabilities, 
`ncurses` does take it into consideration.
- We are installing some plugins to make our life easier, the "master" plugin is 
`tmp`, then there's `tmux-resurrect` and `tmux-continuum` for persisting the tmux 
session
- We are configuring `tmux-continuum` specifically so that it starts by default on 
tmux and starts doing its periodic saving
- And of course, we have to bootstrap the master plugin to install other plugins
- We are relegating scrolling with a key combination to tmux. We skip over the convention 
that everything has to be prefixes by tmux's `Ctrl + b`. With `Ctrl + Shift + <Arrow-up/Arrow-down>`, 
you will enter _copy mode_ a tmux mode that allows for us to **scroll back** or up in the 
output of tmux's session.
    - Based on if we are on the copy mode or not we will scroll up or down or trigger 
    said copy mode and then scroll up or down.
- We are capturing a `Ctrl + t` combination coming from upstream (_alacritty_) and 
we are triggering the opening of a new window with a specific parameter that allows 
for that new window to be standing on the previous window's path.

## A small tip

If you are trying out configurations (editing `~/.tmux.conf`), you can immediately 
reload tmux with the new configurations with `tmux source-file ~/.tmux.conf`.

## About tmux plugins

**NOTE:**
The default `prefix` for tmux is `Ctrl + b`. There really isn't visual feedback, 
but you can test if the prefix works by trying to do a `Ctrl + b + p` if you have 
two "windows" opened, it should navigate from one space to the other.


So, tmux has plugins that expand its functionalities from the core, there are tons 
and for many purposes, in my case I just wanted a couple to persist my session 
across restarts/shutdowns.

- `tpm`: This is basically the **master plugin**, he installs other plugins, it's the 
only plugin that has to be "manually installed", really easily though, just clone 
its repo into the default plugins folder for tmux: `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`
- `tmux-resurrect`: This is a plugin that saves the session at will, you have to press 
`prefix` + `Ctrl-s` to save the current session. And `prefix` + `Ctrl-r` to restore 
a previously saved session.
- `tmux-continuum`: This autosaves the session every 15 minutes, and then on tmux 
server start it restores the latest backup

### Getting plugins up and running

Before you can simply "add more plugins in the `~/.tmux.conf` file", you have to 
clone the `tpm` plugin manually: `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`, 
once you have under `~/.tmux/plugins/tpm` the `tpm` plugin, you can then add 
all the `set -g @plugin` entries you want and configure them as well. However, after 
you have added all of that to `.tmux.conf`, you need to reload it in your current 
session, remember [you can do it with a command](#a-small-tip). After **that is 
done**, you can then press `prefix + Shift + i`, this will then attempt to install 
all the plugins (by cloning from github repos). After that you will see a screen 
saying `TMUX environment reloaded. Done.`. With this you can double check on `~/.tmux/plugins`, 
there should be two more folders for `tmux-resurrect` and `tmux-continuum`. And if 
you run the specific combinations for either of them, they should work.

_And that's it, you should be know ready to persist that tmux space_