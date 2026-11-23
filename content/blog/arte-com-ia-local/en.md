---
title: My NPCs looked bad. I added a reviewer that grades them until they hit 9
description: I rebuilt my MMO's art with local models on a 16 GB GPU. The AI generator wasn't enough, the reviewer found code bugs, and one of my own rules kept the armor stuck at 6.
date: 2026-12-07
tag: ia
image: /blog/arte-com-ia-local/og-en.jpg
cover: /blog/arte-com-ia-local/cover-en.jpg
video: /blog/arte-com-ia-local/reel-en.mp4
---
Torben is the camp blacksmith in my MMO. The first version of him that went onto the site came out of an image-to-3D generator, and I looked at it and wrote down: "all the NPC art came out really bad".

Blurry texture with baked light, no eyes, a hand fused to the hammer, a coat stretching along with the arm. The reviewer gave him a **6.0**, and the 4 NPCs on the site between 4.6 and 6.2.

I'm not a 3D artist. I'm a developer. So I did what developers do when they can't judge something on their own: I wrote an acceptance criterion and put a loop around it.

## House rule

The image and 3D models run on an RTX 5070 Ti with 16 GB, in WSL with 40 GB of RAM shared by about 10 agents. No generation API credits. The reviewer and the agents are cloud models.

And before using any model, I check the license. That already cut good candidates: FLUX dev, Kontext and klein 9B stayed out because they are non-commercial.

## Image: Z-Image vs FLUX

For reference art, I put Z-Image Turbo Q8 against FLUX.1-schnell Q4, both Apache-2.0, same prompt and 4 seeds. Z-Image won 2 of 3: the leg armor came out front-facing, in iron and leather, on all 4 seeds, and the monster got oak bark with moss while FLUX made a smooth shell. It lost on the NPC: it ignored the A-pose, went heroic on the proportions and made the skin darker than asked.

It generates an image in 8.4 to 8.8 s, with a 9.3 GiB VRAM peak. The 4 seeds come out almost identical, so the prompt is what changes the result. It replaced HunyuanDiT, from 2024, and freed 21.6 GB of disk.

## 3D: the README asks for 24 GB, the peak was 3.4 GiB

TRELLIS.2's official README asks for 24 GB of VRAM. Through the native ComfyUI path, in int8, it generated at 1024 in 45 s with a **3.4 GiB** peak. Pixal3D took 50 s with 3.2 GiB.

The reviewer gave TRELLIS.2 a 5.3 and Pixal3D a 5.0. The old version had a 4.8. Pixal3D did better clothes and TRELLIS.2 a better face, but both failed the same way: hollow eyes, fused mesh, open arms, shredded UVs.

OmniPart, which generates by parts, produced unusable geometry, and its part-splitting piece is under an NVIDIA non-commercial license. I deleted 15 GB.

## The turn: the generator becomes reference

I tried a hybrid, with the generator making the shape and separate parts on top. Graded 5.4: better from the front, broken at the back and boots.

What worked was taking the generator out of the final product. Collar, pockets, cuffs, ring straps, buckles, rivets: every piece modeled separately in Blender, with hair and beard as cards. 33 to 37 thousand triangles per NPC. The generator stayed as reference only.

## The reviewer that grades

The loop is simple. One agent assembles the character. Another model plays art director, grades it from 0 to 10 and names the defect that costs the most points. Goal: 9. Below that, another round.

Torben's main grade went 6.3, 6.2, 7.2, 7.3, 8.0, 8.3, 8.7, 8.9 and, in round 9, 9.1. The 360° turntable was still under 9, and the goal applies to all three grades. In round 11, all three (site image, portrait and turntable) closed at **9.1, 9.1 and 9.0**.

Round 4 was the most useful. The reviewer flagged 5 defects that weren't art at all. They were code: gamma applied twice, the hammer upside down, overwritten normals, grime turned off and transparency clipping the beard. No art tweak would have fixed that.

The other three NPCs inherited the recipe. Roldan closed in 6 rounds. Ilda started at 5.8 and Marlo at 6.8, and both reached 9.1.

## The rule that held the grade down

On the heroes' armor I got it wrong in a different way. The request was to fix it without replacing the asset: same mesh, same UVs, same design. The grade rose 0.1 to 0.3 per round and never passed 6.3, under the goal of 7 for that stage. The reviewer wrote that surgical patches "hit a ceiling near 6.0".

I changed one line: you may rebuild, with quads, bevel and real PBR. The first round got worse, a 5.1 average, because it lost the characters' identity. I kept going. The average went 6.65, 7.43, 7.98, 8.38 and reached 8.50 in round 6, with all 4 classes between 8.4 and 8.6. The goal of 9 hasn't come yet.

The grade was capped by the constraint I wrote, not by the model.

## The site goes live

With the new art, the [game's site](https://mmo.kurobane.com.br/en?utm_source=blog&utm_medium=post&utm_campaign=arte-com-ia-local&utm_content=en) moved to v5, with the 4 NPCs and the 4 classes rebuilt. Every image ships as AVIF and WebP, in 3 widths. Lighthouse: performance 97, accessibility 100, best practices 100, SEO 100. CLS of 0.001 and TBT of 0 ms.

Lab LCP is still 2.6 s. The Core Web Vitals "good" line is 2.5 s, measured at the p75 of real users. That's the next target.

## Before blaming the model

The generator gets the shape right and the joints wrong, and the reviewer finds bugs I wouldn't. But the lesson that cost me most was the armor: three rounds stuck on one line of my own request. When the grade stops rising, I now reread the rule I wrote before switching models.
