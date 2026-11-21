---
title: Eu já tentei editar o HP de um MMO direto na memória
description: Nasci em 99 e ia pra lan house desde os 4 anos. Hoje sou dev web e estou fazendo um MMO do zero pra entender o que eu não entendia naquela época.
date: 2026-11-23
tag: mmo
image: /blog/lan-house/og-pt.jpg
cover: /blog/lan-house/cover-pt.jpg
video: /blog/lan-house/hack-pt.mp4
---
Nasci em 99 e ia pra lan house desde os 4 anos. MU, Ragnarok, Priston Tale. O Priston eu jogava em servidor privado, com guild, e sempre tinha um cara que sabia achar o HP na memória do jogo. Eu queria ser esse cara.

Fui aprender. Abrir o processo do jogo, procurar um valor, levar um hit, procurar de novo só entre os endereços que mudaram, até sobrar um. Trocar o 120 por 9999 e olhar pra barra de vida esperando milagre.

Metade das vezes não dava em nada, e eu não fazia ideia do porquê.

## Corta pra hoje

Hoje sou dev web. Faço API de ingresso, relatório financeiro, essas coisas. Passo o dia garantindo que número no sistema bate com número na fonte.

Jogo, fiz um só. Em setembro de 2024, num teste técnico pra uma vaga na [Revi](https://www.userevi.com/), fiz uma luta de monstros no navegador: você cria os monstros, escolhe dois e eles brigam sozinhos, um golpe a cada meio segundo, até alguém zerar o HP. Saiu num fim de semana, em React. [O código tá aberto](https://github.com/KurobaneShin/revi-test).

Foi uma das melhores entrevistas que já fiz. O [Marcelo Miyachi](https://www.linkedin.com/in/marcelomiyachi/), CTO da Revi, entrou no código de verdade: animação, separação dos componentes, validação dos inputs. E eu ainda entreguei um bug que ele não tinha pego: a regra pedia que todo golpe tirasse pelo menos 1 de HP, e no meu código, se a defesa fosse maior que o ataque, o golpe curava. Valeu, Marcelo.

Relendo hoje, achei mais uma: o HP dos monstros ficava no `sessionStorage` do navegador. Qualquer um abria o DevTools e trocava o valor. Eu tinha feito exatamente o jogo que eu tentava hackear na lan house.

Jogo com servidor e outros jogadores, nunca fiz. Então resolvi fazer um MMO. Do zero, em C++, com servidor próprio. Sem Unity, sem Unreal.

Pode ser que nunca vire jogo de verdade, e tudo bem. A ideia é aprender o que a web nunca me obrigou a aprender:

- o que é um tick, e por que o meu servidor roda 30 deles por segundo;
- por que seu personagem não espera o servidor pra andar;
- como mandar 200 monstros pela rede em menos de 1 KB.

## O combinado

Vou postando aqui o que eu for descobrindo, com os números e com os erros. Post curto nas redes, versão completa aqui.

O primeiro é sobre aquele HP da lan house, e sobre a pergunta que eu não sabia fazer na época: [quem manda no jogo?](/blog/quem-manda-no-jogo?lng=ptBR)
