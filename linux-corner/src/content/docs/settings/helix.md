---
title: Helix Settings
description: Layout on how I configure helix on my machine
---

This lists out the different types of settings I have on helix when working with it 
on my personal machine.

## Preamble

You can read [about helix](https://docs.helix-editor.com/). For those who don't know, **Helix** 
is made by a group of developers that separated from **Vim** and **Neovim** and wanted a better editor with 
all the **lessons learned on those past projects**. The reason I really like these types 
of editors is because of their **minimalist nature**, and due to the **sea of shortcuts** they 
provide for **editing and visualizing text extremely fast** (vim motions). Hence I tend 
to use them as much as I can. Configuring them can take hours, days, weeks, months, 
so I understand this is **not for everyone**, nor it is realistic to use them in some 
**job settings**. But for **personal things,** and in my **day-to-day**, 
**I love tools such as these**.

## Anatomy of configuration

As any good **Linux tool**, it should adhere to **predefined conventions**, one of 
these conventions is that said tool **should be highly configurable**, and most of 
CLI tools you install will look at **specific directories** and **files** within 
them to p**ull configurations that override** what they have by default.

## Helix Configuration

When it comes to Helix, **I chose** to use the file at `~/.config/helix/config.toml`. 
(If there's no file there you can always create it yourself).

**_KISS:_** Keep it simple, stupid.

I am **minimalistic in my configs** as well, it's by experience that I know that **overly 
engineering** anything is bad (even your **own tool configuration**):

````toml
# Remaps

[keys.insert]
"C-c" = "normal_mode"

# Visual

[editor]
rulers = [80, 144]
````

The idea is pretty simple, there are different settings that **add behavior to Helix**, 
I separate each **subset of settings by a topic** in the form of **comments**.

**_As of today,_** my settings are as follows:

- [x] When in _insert mode_, by pressing `Ctrl + C` I can go back to _normal mode_.
- [x] I set rulers so that I can visualize see if my line is going for too long.