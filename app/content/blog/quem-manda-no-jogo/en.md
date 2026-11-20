---
title: Who's in charge of the game, your PC or the server?
description: Why editing the HP in memory sometimes did nothing. What a tick is, why my server runs 30 per second, and what each round costs.
date: 2026-11-24
tag: mmo
cover: /blog/quem-manda-no-jogo/cover-en.jpg
video: /blog/quem-manda-no-jogo/reel-en.mp4
---
Remember the [HP I used to edit at the LAN center](/blog/lan-house?lng=en)?

The question I didn't know how to ask back then: who's in charge of the game, my PC or the server?

## The server is the game master

In my MMO, the server is in charge. Your PC only asks: walk over there, hit that thing. The server collects everyone's requests and decides what happened, 30 times per second.

Each of those rounds is a **tick**. Think of a tabletop game master: they hear everyone out, roll the dice and announce the result. Except the round closes every 33 milliseconds.

Your PC gets the result and draws it. It doesn't decide anything that matters: not your HP, not the damage, not whether the monster died.

## Edit the HP all you want

So go ahead and swap 120 for 9999 in your PC's memory. The bar may even change on screen. But the next packet that arrives carries the real HP from the server, and your screen snaps back to reality.

The server never looks at your memory. It never asked.

A game that trusts the client is a game you can edit. At the LAN center I couldn't tell which was which. Now I know: it depends on where the truth lives.

## What a round costs

I expected this to be expensive. Simulating the whole world, 30 times per second, for everyone.

It isn't. In a test with 200 bots walking around an arena, one simulation tick takes **0.24 ms**. Of the 33 ms each round has, almost all of it is spare.

The real squeeze is somewhere else: the network. How much fits in a message, who gets what, in which order. That's another post.

## The loop behind it

The idea is simple. The world moves in fixed steps, no matter how many frames the screen draws:

```
accumulated += time since the last loop
while accumulated >= 33.3 ms and the step limit is not reached:
    simulate one tick
    accumulated -= 33.3 ms
if the limit was hit:
    drop what's left (the game gets slower, but it doesn't skip)
```

That limit matters. If the server stalls, it doesn't try to "catch up" by running 50 ticks at once, which would stall it again. It accepts being a bit slower. That has a name, and it'll get its own post.

## What I take back to web work

Since the world moves in fixed steps, I test combat the way I test an API: send the input, run the ticks, check the result. No waiting on clocks, no tests that pass only sometimes.

Separating "when the world changes" from "when the screen draws" is the same idea as separating server state from rendering on the front end. Except here, if you get it wrong, someone edits their HP.
