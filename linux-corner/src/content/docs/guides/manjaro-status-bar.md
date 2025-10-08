---
title: Customize Manjaro's status bar
description: A small guide on how to customize the status bar that ships with Manjaro
---

## Theory

So, the first thing we need to remember well is that **Manjaro by default** uses 
something called `powerlevel10k`. This is a **Zsh theme**. It's supposed to be fast, 
highly customizable prompt theme.

And by running something like: `p10k configure`, we can get a comprehensive configuration 
wizard that gives tons of options when it comes to configuring the prompt as we 
see fit. This does a lot of magic in the backend of course, but I used it to add a 
_time_ section to the status bar, and it did it for me easily. You can of course go 
crazy with it but for me it was more than enough.

## Dotfiles

So, by running `p10k configure` under the hood a file is created at `~/.p10k.zsh`, 
and in here you can go and edit lines if you want to further fine tune the status 
bar's look and feel. I did a slight correction to the _wizard setup_ and that is that 
I didn't want two lines for the status bar so I literally edited this section:

```zsh
  typeset -g POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(
    # =========================[ Line #1 ]=========================
    # os_icon               # os identifier
    dir                     # current directory
    vcs                     # git status
    # =========================[ Line #2 ]=========================
    prompt_char             # prompt symbol
  )
```
On the comment that says `[ LINE #2 ]`, there used to be a `\n`, I simply deleted 
that and the status bar was one line and _I was happy_.

_Comment:_ It's pretty useful to have these auto-generated files but with tons of 
comments to help you navigate them more easily.

## Conclusion

And, now, of course, this `dotfile` should be versioned controlled and added to 
a repo so that this configuration is easily repeatable in whatever other machine we 
want, and so that we don't lose it. Yeah, automation, pretty cool.

## Sources

- [Manjaro's Forums](https://forum.manjaro.org/t/howto-p10k-powerline-and-zsh-101/61160)