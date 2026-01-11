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
theme = "rose-pine-custom"

[editor]
rulers = [80, 120]

[keys.insert]
"C-c" = "normal_mode"
````

The idea is pretty simple, there are different settings that **add behavior to Helix**, 
I separate each **subset of settings by a topic** in the form of **comments**.

**_As of today,_** my settings are as follows:

- [x] Use a custom theme that removes the background (based around `rose_pine`)
- [x] When in _insert mode_, by pressing `Ctrl + C` I can go back to _normal mode_.
- [x] I set rulers so that I can see if my line is going for too long.

## Themes

As I want _an aesthetically pleasing_ working environment. I wanted to make the 
background transparent, since I want to see a background that's cool. And in order 
to do so, you have to do a bit of tinkering with the tools **we have at our disposal**.

There's a convention for themes you might want to drop in or build yourself, and 
so you have to create a file at:

````
mkdir -p ~/.config/helix/themes
````

And then you can add a `.toml` file with a name (this name will be the one 
used to reference it in the config file later).

````
helix ~/.config/helix/themes/rose-pine-custom.toml
````

Inside this file I simply inserted two lines:

````toml
inherits="rose_pine"

"ui.background" = { }
````

I am using `rose_pine`, so I want to keep all of that look, yet I am overriding 
a specific property `ui.background`, if you set it to an **empty object** then it 
will make the background disappear (and since the terminal is transparent, as 
disussed in [the alacritty section](/settings/alacritty/#settings-rundown)), with that, 
you can simply re-open a file and you will see how the background is _now transparent_

And so in the [settings](#helix-configuration), I would simply reference this 
custom theme like so: `rose-pine-custom`.