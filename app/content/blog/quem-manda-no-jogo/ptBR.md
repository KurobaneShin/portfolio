---
title: Quem manda no jogo, o seu PC ou o servidor?
description: Por que editar o HP na memória às vezes não dava em nada. O que é um tick, por que o meu servidor roda 30 por segundo e quanto custa cada rodada.
date: 2026-11-24
tag: mmo
image: /blog/quem-manda-no-jogo/og-pt.jpg
cover: /blog/quem-manda-no-jogo/cover-pt.jpg
video: /blog/quem-manda-no-jogo/reel-pt.mp4
---
Lembra do [HP que eu tentava editar na lan house](/blog/lan-house?lng=ptBR)?

A pergunta que eu não sabia fazer na época era: quem manda no jogo, o meu PC ou o servidor?

## O servidor é o mestre da mesa

No meu MMO, quem manda é o servidor. Seu PC só pede: anda pra lá, bate naquele bicho. O servidor junta o pedido de todo mundo e decide o que aconteceu, 30 vezes por segundo.

Cada rodada dessas se chama **tick**. É tipo um mestre de RPG de mesa: ele ouve todo mundo, rola os dados e anuncia o resultado. Só que fecha a rodada a cada 33 milissegundos.

O seu PC recebe o resultado e desenha. Ele não decide nada que importa: nem o seu HP, nem o dano, nem se o monstro morreu.

## Pode editar o HP à vontade

Então pode trocar o 120 por 9999 na memória do seu PC. A barra vai até mudar na tela. Mas no próximo pacote que chega, o servidor manda o HP de verdade e a sua tela volta pra realidade.

O servidor nem olha pro que está na sua memória. Ele nunca perguntou.

Jogo que confia no cliente é jogo que dá pra editar. Na lan house, eu não sabia qual era qual. Agora eu sei: depende de onde mora a verdade.

## Quanto custa uma rodada

Eu achava que isso ia pesar. Simular o mundo inteiro, 30 vezes por segundo, pra todo mundo.

Não pesa. Num teste com 200 bots andando numa arena, um tick de simulação leva **0,24 ms**. Dos 33 ms que cada rodada tem, sobra quase tudo.

O aperto de verdade é outro: a rede. Quanto cabe numa mensagem, quem recebe o quê, em que ordem. Isso fica pra outro post.

## O loop por trás

A ideia é simples. O mundo anda em passos fixos, independente de quantos frames a tela desenha:

```
acumulado += tempo desde a última volta
enquanto acumulado >= 33,3 ms e ainda não passou do limite de passos:
    simula um tick
    acumulado -= 33,3 ms
se bateu o limite:
    descarta o que sobrou (o jogo fica mais lento, mas não pula)
```

Esse limite é importante. Se o servidor engasgar, ele não tenta "recuperar o atraso" rodando 50 ticks de uma vez, que travaria tudo de novo. Ele aceita ficar um pouco mais lento. Isso tem nome, e vai ter post próprio.

## O que eu levo pro trabalho web

Como o mundo anda em passo fixo, eu testo combate igual testo uma API: manda o input, roda os ticks, confere o resultado. Sem esperar relógio, sem teste que passa às vezes.

Separar "quando o mundo muda" de "quando a tela desenha" é a mesma ideia de separar o estado do servidor da renderização no front. Só que aqui, se você erra, alguém edita o HP.
