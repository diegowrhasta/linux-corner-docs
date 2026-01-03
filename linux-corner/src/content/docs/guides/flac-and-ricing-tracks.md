---
title: CDs and high quality tracks
description: A guide on how can you rip from CDs, with amazing quality and packed with metadata
---

Went a bit into this rabbit hole of CD-ripping with linux programs, lossless quality, 
metadata matching, showing love to music you enjoy and want to experience in all of 
its high-quality _glory_. This is my story.

## CD Ripping

Getting this out of the way, _I bought the CD that I used to test this_, and if 
_I had a gun to my head telling me that I needed to say out loud which artist it was..._. 
It was an OST, for チェンソーマンレゼ篇. If you can read that, good **you already know 
what's up**.

In short, because the Linux community is GOATed, they built tools that help automate 
and make ripping tracks out of CDs pretty streamlined. You just need to know _what 
to install_ and _how to use it_.

But as always, **let's look at some concepts and theory first**

### Ripping as a concept

_CD-Ripping:_ A specific process that **extracts digital content** from a container, 
in this case **a CD** onto a **new digital form and location**. _Data is not damaged, 
and the key is at the fact that **ripping** is used to **shift formats**, and to 
**edit** or **duplicate/back-up** media_. It's copying but with extra steps, _they 
are not the same regardless_.

I remember _somehow_ that DVDs and Blu-Rays are **region-locked** and initially thought 
this was the same case for CD's however, it's **NOT**. If you buy a CD in Japan, 
that very same CD can be reproduced by **anything that has a CD Reader**. So that's 
one less extra hurdle to go over.

### Audio Quality

I'm not an audio engineer, nor claim to be an expert either, but I know based on 
bits and pieces that I read/heard that audio quality varies based on:

- **Bit depth:** 16-bit
- **Sample rate:** 44.1 kHz
- **Channels:** 2 (stereo)
- **Encoding:** PCM (uncompressed)

(This example set of metadata values is for **CD-quality audio**)

If we were to explain briefly what each field is:

- **Bit depth:** Basically affects how _loud_ the track is, 16-bit is roughly 
96 dB.
- **Sample rate:** This determines _the highest frequency_ that can be put in the 
track, 44.1 kHz is roughly 22 kHz audio, which is actually above human hearing, 
**meaning that the track should be able to reproduce an immense amount of sounds**, 
so we can hear all the details the musician/engineer put in there.
- **Channels:** Music is _basically always_ mixed in stereo, that way when we hear 
it we get all sorts of sounds coming from everywhere, and small playful imagery (if you 
close your eyes and let your imagination run wild). Said in a fancy way: 
_enables spatial imaging and soundstage_
- **Encoding:** PCM stands for _Pulse-Code Modulation_, this is raw, uncompressed 
representation of audio samples. **Native format for CDs**, any lossless format 
decodes to PCM quality before playback, a format such as `WAV` is a container that 
holds PCM

### How-to

So there are two possibilities here:

- Your CD is **Audio CD**, _which means if you try to analyze the contents there 
is no concept of "tracks" inside a file manager that is trying to visualize said 
contents_.
- Your CD is **Data CD**, so you see `files`, should be `.wav` files (this is 
easier to work with)

In order to cover _both cases_ we will install this set of tools:

````
yay -S cdparanoia flac abcde sox picard
````

#### Audio CD

You can literally run **one command** and you will get `.flac` files already tagged. 
Of course with _bit-perfect_ output and _lossless quality_.

Definitions:

- Bit-perfect: We copied _every single bit that held audio data over, we didn't 
cut corners, so we should have the track in its **purest form**
- Lossless quality: Again, the format in which we have a _track_ should not 
cut any corners and should provide on playback _all of the track's full on remastered 
glory_
- Tagging: It just means adding metadata to a track (might be just me, but I like 
my tracks looking pretty with a cover and all sorts of information adding a story, 
and more background on it)

````
abcde -o flac
````

**EXTRA NOTE:** Why `.flac`? This is a good format that's _Linux Friendly_, has 
built-in integrations with the _Linux ecosystem_, it can keep `metadata` info 
without issues (`.wav` is really bad at keeping metadata). On top of that its size 
is smaller than `.wav`. It's a good combination of:

- Quality
- Size
- Metadata
- Longevity

#### Data CD

This is a bit more _manual_ however, **this is what I did**, since my copy was 
`.wav` files.

Since my CD had already audio _extracted_, **ripping** was not necessary, all you 
have to do is _copy_ the files over to another device (in my case my PC). However, 
be sure to double check if the copied over files are copied correctly, you can use this 
tool to check the metadata of copied over files: `soxi *.wav`. We should be seeing 
the [audio quality](#audio-quality) metadata spat out by the command for all files.

And now the sequence of steps should be as follows:

- Convert to flac with `flac *.wav`
- Verify the integrity of files with `flac -t *.wav`

_A note on tagging:_ With `abcde` because we are ripping and we can detect other metadata 
that only lives in _that specific format_ we can tag automatically and have everything 
done for us in a **heart-beat**, however since we are doing things a bit more manual 
here we have to do some extra steps such as using a program called `Picard`.

- Open the program by launching it through the terminal with `picard`
- This is a full-on GUI, you can play around with it, but in short you should do 
this with the GUI:
    - Select all the `.flac` tracks we just converted
    - Load them into Picard
    - Select all tracks
    - Press the **Scan** button, this is magically, it works even if the _filenames 
    are useless, (which was my case)_.
    - There are sometimes differences in releases (varied by countries), so you can 
    also dive into that part if neccesary, since there will be differences and you 
    want to tag the tracks with the **correct release**, luckily I have the only 
    (at the time of writing) release in the world. So it was _easier_.
    - Configure naming rules with `Options > File Naming`
    - Check the "Rename files when saving" option
    - Select Preset 2 for the naming convention
    - In the main screen press on **Save**
    - After a couple of seconds you should be able to see all the files in green 
    and with names and everything already tagged (album cover, artist info, country, 
    title, and many other things)

## Playing lossless formats

Linux has many good players:

- mpv (this is the one I use)
- DeadBeef
- Strawberry
- Rhytmbox

That's on the _software side_ however, there's a bit of _hardware_ involved also, 
so pairing any of these players with _**a decent** DAC or audio interface_, will 
sound identical to a **high-end CD player**.

## DAC / amp

**DAC** = This stands for Digital-to-Analog Converter. Takes digital audio (USB, 
optical, CD data, etc), and converts it all to **analog waveform**

Music files (FLAC, WAV, etc) are **digital data** (numbers). Speakers and headphones 
need an **analog electric signal**

Now, this is really important, **EVERY DEVICE HAS A BUILT-IN DAC**, (phone, laptop, 
CD player, Bluetooth headphones). But the difference is **quality**

**Amplifier** = The analog signal coming out of a DAC **is very weak**. The amplifier 
_amplifies_ the signal so it can properly drive _Headphones (headphones amp), Speakers 
(speaker amp)_. Without enough amplification: _Sound is quiet, bass is weak, dynamics 
are flat_.

Nowadays, many devices combine both devices in one, it's _convenient and common_.

However there are **external DAC/amps**, and _you can totally buy one if you want 
to go that extra mile:_

- Built-in audio (laptops, cheap phones) often:
    - Have electrical noise
    - Use low-quality DAC chips
    - Have weak amps

An external DAC/amp can give:

- Cleaner sound
- Better stereo separation
- Enough power for good headphones

_Just better electronics_

### A small memo

I have this vivid memory of _back-in-the-day_ where a friend from my English institute 
bringing in these headphones that apparently were _amazing_, and yeah, when hearing 
through them I heard all sorts of sounds, that _spatial imagery_ was ever-present 
with them. I don't know if it's just an **illusion of the past**, but in recent 
years I never heard something like it again. _Is production of hardware growing 
cheaper and with less quality for the masses_?, _Is this just a mandela effect?_, 
_Has audio engineering and re-mastering grown weaker in the industry?_.

I only have questions as to this clear contradiction/dissonance with a memory I 
had and the reality of things in the present. I will probably buy this external 
`DAC/amp` to just test it out and see if I ever get to _feel_ what _I once felt_. 
But yeah, just something I wanted to leave somewhere.

## Audio formats

For lossless formats we have the big three: `.wav`, `.flac`, `.alac`. They all have 
the **same quality** so don't go listening to myths. However a brief description of 
them can fall into:

- **WAV**: Raw, uncompressed PCM audio, it's "audio numbers in a box". However, _very 
large files, poor/inconsistent metadata support, no built-in error checking_. 
**Not ideal for music libraries**.
- **FLAC** (Free Lossless Audio Codec): Lossless compression of PCM audio, it's 
like `ZIP` but specialized for audio. It has a lot of PROS going for it, but we 
can focus on two: _30-60% smaller than `.wav`, great metadata support_.
- **ALAC**: Apple's version of `FLAC`, wouldn't touch it... 