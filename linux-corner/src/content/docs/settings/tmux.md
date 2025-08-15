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
- We are relegating scrolling with a key combination to tmux. We skip over the convention 
that everything has to be prefixes by tmux's `Ctrl + b`. With `Ctrl + Shift + <Arrow-up/Arrow-down>`, 
you will enter _copy mode_ a tmux mode that allows for us to **scroll back** or up in the 
output of tmux's session.
    - Based on if we are on the copy mode or not we will scroll up or down or trigger 
    said copy mode and then scroll up or down.
- We are capturing a `Ctrl + t` combination coming from upstream (_alacritty_) and 
we are triggering the opening of a new window with a specific parameter that allows 
for that new window to be standing on the previous window's path.