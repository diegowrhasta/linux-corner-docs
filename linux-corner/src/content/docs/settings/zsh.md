---
title: Zsh settings
description: Rundown of how I configure zsh
---

Zsh is a Unix shell that can be used as an interactive login shell and as a command 
interpreter for shell scripting

## Reasoning

By default we get access to the **bash terminal**, (bash) which has its own **scripting 
language and login shell**. But it has **short-comings** when it comes to **speed** besides 
other **quality of life improvements** `zsh` comes with out the box. Mainly I like the 
**auto-completion** it has, on top of its speed, and when **scripting** with `zsh` 
we get nice additions that I sometimes leverage.

## Settings rundown

These are settings that live (on linux) under `~/.zshrc`. This file will run before 
`zsh` starts so you can **extend behavior** here.

```
# Add deno completions to search path
if [[ ":$FPATH:" != *{DENO_COMPLETIONS}* ]]; then export FPATH={DENO_FPATH}; fi

# Autostart
() {
  setopt LOCAL_OPTIONS NO_MONITOR
  fcitx5 -d &> /dev/null &
  wait
}

# Use powerline
USE_POWERLINE="true"
# Has weird character width
# Example:
#    is not a diamond
HAS_WIDECHARS="false"
# Source manjaro-zsh-configuration
if [[ -e /usr/share/zsh/manjaro-zsh-config ]]; then
  source /usr/share/zsh/manjaro-zsh-config
fi
# Use manjaro zsh prompt
if [[ -e /usr/share/zsh/manjaro-zsh-prompt ]]; then
  source /usr/share/zsh/manjaro-zsh-prompt
fi

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# Load Angular CLI autocompletion.
export DOTNET_ROOT=$HOME/.dotnet

export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools

# pnpm
export PNPM_HOME={PNPM}
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end

# Aliases

alias waifu={WAIFU}
alias lasf="ls -laF"
alias prx={PRX}
alias lesgow={LESGOW}
alias jpmu={JPMU}
alias jpmuU={JPMUU}

# Shell function aliases
raku() {
  {RAKU}
}

# bun completions
[ -s {BUN} ] && source {BUN}

# bun
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Alacritty
fpath+=${ZDOTDIR:-~}/.zsh_functions

# Cool start
fastfetch

# Go Path

export GOPATH="$HOME/go"

# Deno Path
export PATH="$GOPATH/bin:$PATH"
{DENO}

# Add RVM to PATH for scripting. Make sure this is the last PATH variable change.
export PATH="$PATH:$HOME/.rvm/bin"
[[ -s "$HOME/.rvm/scripts/rvm" ]] && source "$HOME/.rvm/scripts/rvm"

```

The rundown is as follows:

- There's some deno completions so that the terminal picks them up
- This is part of the [japanese keyboard setup](/guides/japanese-keyboard), in short we 
set up `fcitx5` to run as a demon so that we can access the respective keyboard emulator 
the moment the system boots up. (otherwise we would have to manually initialite it 
always)
- Pretty sure so that we don't see weird symbols there's this the whole chunk of code 
with `powerline`, `HAS_WIDECHARS` and other manjaro-zsh stuff. (Some of it might 
also be auto-generated).
- NVM configurations that are also auto-added when installing nvm
- A section that allows to add the dotnet space to the machine's `path`
- Another auto-generated section probably, this points to the local directory for 
`pnpm`
- Aliases for things I want such as:
    - There's a program to scale images (_don't ask why I need this_), this opens it up 
    with one command
    - An alias to list files in a directory well formatted (it will pick-up hidden 
    files as well)
    - An alias to jump into a projects folder
    - An alias to jump into a **_GO Lang_** working folder
    - An alias to run a go program that is a menu to open up games (_personal unreleased project_)
    - An alias to build, copy the executable to a specific directory and run the menu to open up games
    - This ties into the [custom scripts maintenance file](#custom-scripts), with this 
    alias I can run the update `sh` script
    - Bun auto-generated completions
    - So that [alacritty](/settings/alacritty) has access to cool `zsh` auto-completions 
    we add them to its path
    - I like to see the system health when opening a new terminal session so `fastfetch` 
    is run here
    - Setting up a go path for working with it
    - Auto-generated deno path export
    - RVM export, (I use ruby solely for an asciidoc tool nothing else)

## A variable file

Already explained in the `README.md` of the respective [repository](https://github.com/diegowrhasta/dotfiles/blob/main/README.md), 
but in short, a `.vars` file should have inside respective values to then parse 
onto the respective `.zshrc` file when passing this onto a new machine. For security reasons 
the values are obscured.

## Custom scripts

For now there's one **_utility script_** that I use which is `maintenance.sh`. This 
takes care of just **vacumming logs, clearing caches** and the like, but by sending a 
`--upgrade` flag it will actually run a full `yay -Syu` command on top of running 
a script for `pnpm` to auto-update. You can read it in its [repository](https://github.com/diegowrhasta/dotfiles/blob/main/custom-scripts/maintenance.sh), 
it's a bit long, so it won't be explained here that much in detail. (Besides, it's 
well commented).

## Wrapper scripts

A good way to bubble up aliases to `sudo`, is to instead of writing an alias under 
`~/.zshrc` you can create a wrapper script at a specific location, e.g.,

```
sudo nano /usr/local/bin/hx

#!/bin/sh
exec helix "$@"

sudo chmod +x /usr/local/bin/hx

```

This is a specific use case for `helix`, since I had installed it but it would only 
open up with `helix ...`, where as the titular `hx` is shorter. And so I simply created 
this file, and even when editing files that require `sudo`, `sudo hx file` and 
`hx file` all work just fine.
