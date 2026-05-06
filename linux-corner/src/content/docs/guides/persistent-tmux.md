---
title: Persistent tmux section
description: Tmux can persist all of its tabs (session)
---

If you want to turn off the computer, or restart, and want to keep the exact 
state that your tmux tabs were at, you can install some plugins to take snapshots

## How to install plugins in tmux

First you need a plugin manager (that makes things easier)

- `git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm`
- Go into `~/.tmux.config` and add:

````
# List of plugins
set -g @plugin 'tmux-plugins/tpm'           # Plugin manager (MUST BE FIRST!)
set -g @plugin 'tmux-plugins/tmux-resurrect' # Session persistence
set -g @plugin 'tmux-plugins/tmux-continuum' # Auto save/restore

# Plugin-specific configurations (optional)
set -g @continuum-restore 'on'

# Initialize TPM (keep this line at the very bottom of your config!)
run '~/.tmux/plugins/tpm/tpm'
````

**IMPORTANT:** The _default prefix_ in tmux is `Ctrl-b`.

In order to start applying the plugins and everything else, you can run this:

- `Prefix + r` => Reload tmux config
- `Prefix + Shift + I` => Install plugins
    - You should see `TMUX environment reloaded. Done`
- You can double check if everything was installed with: `ls ~/.tmux/plugins/`

## tmux-resurrect

A small plugin that allows us to take snapshots of the current session, and to 
restore a previous saved session:

- Save session: `Prefix + Ctrl-s`
- Restore session: `Prefix + Ctrl-r`

## tmux-continuum

This automates `tmux-resurrect` with periodic saving and automatic restore. Auto-
saves every 15 minutes and auto-restores on tmux server start