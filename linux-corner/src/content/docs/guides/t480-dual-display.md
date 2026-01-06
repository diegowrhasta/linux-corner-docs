---
title: ThinkPad T480 and high refresh monitors
description: A (hands-on) guide on troubleshooting dual monitor setups
---

Basically bought two 24" monitors, that go all the way to `180Hz` and `200Hz`. I 
wanted to connect them _through a dock_. And **one couldn't be recognized**. 
This is a guide on understanding why and how to fix this issue.

## The answer

TL;DR, the T480 is indeed _old by now_. So it has limitations to its hardware, 
my **ThinkPad T480** uses an Intel 8th Gen graphics (UHD 620). Its USB-C/Thunderbolt 
ports have a limited "pipe" for video data (DisplayPort 1.2 bandwidth). If I try 
to **push `180Hz` and `200Hz` signals** through _one single dock/cable_ is like 
trying to fit two firehoses into a garden pipe.

## Bandwidth Math

The T480 uses **DisplayPort 1.2** via USB-C/Thunderbolt ports

- A standard 1080p @ 60Hz monitor uses about **3.2 Gbps**
- Because of drivers/hardware, we can't really go towards the `200Hz` so:
    - A `180Hz` would want around **9.6 Gbps**
    - A `165Hz` would want around **8.8 Gbps**
    - Total `~18.4Hz`
    - The T480's single-cable output (the dock) will be capped at **17.28 Gbps**

So in short, it's a **_bandwidth issue_**.

## Workarounds

With this in mind, it's easy to draw a comparison and the base logic to try and 
get the setup to recognize the monitors:

````
The higher the refresh rate, the more bandwidth it will require. So you can start 
at the lowest, and start going up, testing to see at what frequency everything breaks.
````

So that's it, you can start doing stuff like:

- Disconnecting one monitor
- Switch refresh rate of the plugged-in monitor to the lowest, plug-in the other 
monitor, see if signal is fed
- Start going up in refresh rates until one monitor **dies**

## My use case and actual workaround

In my case, _nothing was working_. So I instead decided the **_Two-Cable Solution_**.

This is nothing out of the ordinary: _if we are trying to put all that bandwidth 
through one cable, what if we had two cables to evenly distribute said bandwidth?_. 
And also, **make usage of the `Thunderbolt` port of the **T480** which has more 
bandwidth than the normal USB/C port**

And so:

- I connected the `dock` to the `Thunderbolt` port
- Disconnected the second monitor from the Dock, plugged-in directly the `HDMI` 
cable to the **T480's** side `HDMI` port
- Both monitors started getting signal
    - The `HDMI` monitor is capped at `120Hz`, and that is because the side port 
    is limiting the refresh rate at that amount
    - The `Display Port` monitor is at its full `180Hz`, it's directly plugged into 
    the `dock` and said `dock` goes straight into the **T480's** `Thunderbolt` port.

So, _it's not that bad_, compromised `80hz` on a `200hz` monitor for the fact 
_**that I can actually use the two monitors**_

## Conclusions

Had **no idea that this was a thing**, I was about to attribute it to the usual 
_it's not the year of the Linux Desktop yet_ argument. But after some research, 
troubleshooting, and reflection, it turns out it was nothing that Linux was 
guilty for (_yaaay_).

So lesson learned, **_when dealing with old hardware, be extremely careful as to 
what peripherals you want to add onto it, it might limit them._**
