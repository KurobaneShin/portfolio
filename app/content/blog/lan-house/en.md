---
title: I once tried to edit an MMO's HP straight in memory
description: Born in '99, started going to LAN centers at 4. Now I'm a web dev building an MMO from scratch to understand what I didn't back then.
date: 2026-11-23
tag: mmo
image: /blog/lan-house/og-en.jpg
cover: /blog/lan-house/cover-en.jpg
video: /blog/lan-house/hack-en.mp4
---
I was born in '99 and started going to lan houses, Brazil's LAN centers, at 4. MU, Ragnarok, Priston Tale. I played Priston on private servers, with a guild, and there was always one guy who knew where the HP lived in the game's memory. I wanted to be that guy.

So I learned. Attach to the game process, search for a value, take a hit, search again only among the addresses that changed, until one is left. Swap the 120 for 9999 and stare at the health bar waiting for a miracle.

Half the time nothing happened, and I had no idea why.

## Fast forward

Today I'm a web dev. Ticketing APIs, financial reports, that kind of thing. I spend my days making sure the numbers in the system match the numbers at the source. I've never made a game.

So I decided to build an MMO. From scratch, in C++, with my own server. No Unity, no Unreal.

It may never become a real game, and that's fine. The point is to learn what the web never forced me to:

- what a tick is, and why my server runs 30 of them per second;
- why your character doesn't wait for the server to move;
- how to send 200 monsters over the network in under 1 KB.

## The deal

I'll post what I find along the way, numbers and mistakes included. Short version on social media, full version here.

The first one is about that HP, and about the question I didn't know how to ask back then: [who's in charge of the game?](/blog/quem-manda-no-jogo?lng=en)
