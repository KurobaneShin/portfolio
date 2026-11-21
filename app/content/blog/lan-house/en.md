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

Today I'm a web dev. Ticketing APIs, financial reports, that kind of thing. I spend my days making sure the numbers in the system match the numbers at the source.

I've made exactly one game. In September 2024, for a take-home test while interviewing at [Revi](https://www.userevi.com/), I built a monster fight in the browser: you create monsters, pick two, and they fight on their own, one hit every half second, until someone's HP hits zero. One weekend, React. [The code is public](https://github.com/KurobaneShin/revi-test).

It was one of the best interviews I've ever had. [Marcelo Miyachi](https://www.linkedin.com/in/marcelomiyachi/), Revi's CTO, went deep into the code: animations, how the components were split, input validation. And I ended up pointing out a bug he hadn't caught: the rules said every hit had to deal at least 1 damage, but in my code, if defense was higher than attack, the hit healed. Thanks, Marcelo.

Reading it again now, I found one more: the monsters' HP lived in the browser's `sessionStorage`. Anyone could open DevTools and change it. I had built exactly the kind of game I used to try to hack at the lan house.

A game with a server and other players, I've never made. So I decided to build an MMO. From scratch, in C++, with my own server. No Unity, no Unreal.

It may never become a real game, and that's fine. The point is to learn what the web never forced me to:

- what a tick is, and why my server runs 30 of them per second;
- why your character doesn't wait for the server to move;
- how to send 200 monsters over the network in under 1 KB.

## The deal

I'll post what I find along the way, numbers and mistakes included. Short version on social media, full version here.

The first one is about that HP, and about the question I didn't know how to ask back then: [who's in charge of the game?](/blog/quem-manda-no-jogo?lng=en)
