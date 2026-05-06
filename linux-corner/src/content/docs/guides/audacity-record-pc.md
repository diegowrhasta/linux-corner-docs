---
title: How to record PC audio with Audacity on Linux
description: How to get PC audio recording in Manjaro
---

Unlike the windows experience, if you install Audacity, in Manjaro, you don't get 
PC audio recording out-the-box

## How to wire things correctly

You need to identify what sound server you are running on your distro. A command 
to run in order to find out is `pactl info | grep "Server Name"`

Depending on whether it outputs _PipeWire_ or _PulseAudio_, then you'd take 
different approaches.

**I got PulseAudio** so we'd follow the steps catered to that sound server. But 
that didn't work. You should be able to go to Audacity and then on the `Audio Host` 
you would select `PulseAudio` and then set the recording device to something akin 
to: `Monitor of Built-in Audio Analog Stereo`.

## PulseAudio Fix

Since we couldn't go the easy way, we have to go for a different method: `pavucontrol`

- Install: `yay -S pavucontrol`

Now this will become really hacky.

- Open up Audacity
- On the audio settings:
    - Host: `ALSA`
    - Recording device: `pipewire` or `pulse`
- Press Record
- Open up `pavucontrol` on the terminal
- If we go to the `Recording` tab we will see Audacity recording
- We can then change the source of this to the exact source of sound that we want 
to record (we should be able to select and test out the different sources until 
we find the right channel that belongs to the PC audio)
- `PulseAudio` creates several audio paths, so Audacity might attach itself to 
another source that doesn't output any audio. So we are re-wiring this listening.

