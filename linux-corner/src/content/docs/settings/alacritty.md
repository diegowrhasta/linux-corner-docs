---
title: Alacritty Settings
description: Layout on how I configure Alacritty on my machine
---

A simple explanation (refresher) as to the decisions when configuring alacritty on 
my own machine. Alacritty is an open-source GPU-accelerated terminal emulator.

## Why Alacritty?

My motto when it comes to workflows (this goes beyond just software dev) is that 
we should always iterate on what we do [every day](https://www.amazon.com/Pragmatic-Programmer-journey-mastery-Anniversary/dp/0135957052/131-7918119-3010347?psc=1), 
and under this presumption, I realized that thinks that come from the Linux community, 
developers and ideologies really vibe with me in the sense of **being fast**, **concise**, 
and **practical**.

Alacritty is [open source](https://github.com/alacritty/alacritty), meaning that it 
is bound to have tons of ideas applied to it, for the sake of _making it fun_. 
With this as a basis, based on its record of **well-behaved** and **reasonal** 
community building, I picked it due to its sheer speed (thanks to the fact that 
you get to compile it for your machine specifically), and overall adherence to 
common linux practices (that are somewhat of the basis of modern DevOps and overall 
software in general).

## Hacking for the vibes

One thing that I did come across here is the fact that Alacritty has not a _"background 
image"_ type of function. But by being a **bit clever** I managed to achieve what I 
wanted. You just have to make Alacritty transparent and reduce opacity 
a bit (more on that in the settings section).

## Settings rundown

```toml
[terminal]
shell = { program = "/usr/bin/tmux", args = ["new-session", "-A", "-s", "main"] }

[window]
opacity = 0.8

[keyboard]
bindings = [
  # New "tab"
  { key = "T", mods = "Control|Shift", command = { program = "/usr/bin/tmux", args = ["new-window"] } },

  # Navigate tabs
  { key = "Left", mods = "Control|Shift", command = { program = "/usr/bin/tmux", args = ["previous-window"] } },
  { key = "Right", mods = "Control|Shift", command = { program = "/usr/bin/tmux", args = ["next-window"] } },

  # Jump to tab N
  { key = "Key1", mods = "Control|Alt", command = { program = "/usr/bin/tmux", args = ["select-window", "-t", "0"] } },
  { key = "Key2", mods = "Control|Alt", command = { program = "/usr/bin/tmux", args = ["select-window", "-t", "1"] } },
  { key = "Key3", mods = "Control|Alt", command = { program = "/usr/bin/tmux", args = ["select-window", "-t", "2"] } },
  { key = "Key4", mods = "Control|Alt", command = { program = "/usr/bin/tmux", args = ["select-window", "-t", "3"] } },
  # ... add 3–9 if you want more
]
```

In short:

**Terminal**

- We are relegating all the terminal work to `tmux`. Alacritty simply displays it.
- We open the tmux session as a _new session_. However, if it finds a previous session 
it will attach to it (effectively making so that we can open up things **where we 
left off**)
- The name of the session for attaching and for creation will be `main`

**Window**

- By setting the opacity of Alacritty to `0.8` we allow for the background to show, 
and in my specific setup (after you set a nice wallpaper like the one on the repo) 
it will give the idea that the terminal has a background.

**Keyboard**

- Specific hotkeys so that I can move between different windows all managed by 
`tmux`. We create new _"tabs"_ with `Ctrl + T`.
- We can navigate from left to right between tabs with `Ctrl + Shift + <Arrow>`.
- We can jump directly to specific tabs by their order with `Ctrl + Alt + <Number>`