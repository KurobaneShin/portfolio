---
title: Meus NPCs eram ruins. Coloquei um revisor dando nota até chegar em 9
description: Refiz a arte do meu MMO com modelos locais numa GPU de 16 GB. O gerador de IA não bastou, o revisor achou bug de código, e uma regra minha segurava a nota das armaduras em 6.
date: 2026-12-07
tag: ia
image: /blog/arte-com-ia-local/og-pt.jpg
cover: /blog/arte-com-ia-local/cover-pt.jpg
video: /blog/arte-com-ia-local/reel-pt.mp4
---
O Torben é o ferreiro do acampamento no meu MMO. A primeira versão dele que foi para o site saiu de um gerador de imagem para 3D, e eu olhei e anotei: "todas as artes dos npcs ficaram muito ruins".

Textura borrada com luz assada, rosto sem olhos, mão fundida no martelo, casaco puxando junto com o braço. O revisor deu **6,0** a ele, e entre 4,6 e 6,2 aos 4 NPCs do site.

Eu não sou artista 3D. Sou dev. Então fiz o que um dev faz quando não sabe avaliar uma coisa sozinho: escrevi um critério de aceite e coloquei um loop em volta dele.

## A regra da casa

Os modelos que geram imagem e 3D rodam numa RTX 5070 Ti de 16 GB, num WSL com 40 GB de RAM dividida por uns 10 agentes. Nenhum crédito de API de geração. O revisor e os agentes são modelos de nuvem.

E antes de usar qualquer modelo, eu confiro a licença. Isso já cortou candidatos bons: FLUX dev, Kontext e klein 9B ficaram de fora por serem não comerciais.

## Imagem: Z-Image contra FLUX

Para a arte de referência, coloquei o Z-Image Turbo Q8 contra o FLUX.1-schnell Q4, os dois Apache-2.0, mesmo prompt e 4 seeds. O Z-Image ganhou 2 de 3: a perneira saiu de frente, em ferro e couro, nas 4 seeds, e o monstro ganhou casca de carvalho com musgo enquanto o FLUX fez um casco liso. Perdeu no NPC: ignorou a A-pose, inflou a proporção e escureceu a pele além do pedido.

Ele gera uma imagem em 8,4 a 8,8 s, com pico de 9,3 GiB de VRAM. As 4 seeds saem quase iguais, então quem varia o resultado é o prompt. Entrou no lugar do HunyuanDiT, de 2024, e liberou 21,6 GB de disco.

## 3D: o README pede 24 GB, o pico foi 3,4 GiB

O README oficial do TRELLIS.2 pede 24 GB de VRAM. Pelo caminho nativo do ComfyUI, em int8, ele gerou em 45 s a 1024 com pico de **3,4 GiB**. O Pixal3D levou 50 s com 3,2 GiB.

O revisor deu 5,3 ao TRELLIS.2 e 5,0 ao Pixal3D. A versão antiga tinha 4,8. O Pixal3D foi melhor na roupa e o TRELLIS.2 no rosto, mas os dois falharam do mesmo jeito: olhos ocos, malha fundida, braços abertos, UV picotado.

O OmniPart, que gera por partes, saiu com geometria inutilizável, e a peça dele que separa as partes tem licença NVIDIA não comercial. Apaguei 15 GB.

## A virada: o gerador vira referência

Tentei um híbrido, com o gerador fazendo a forma e peças separadas por cima. Nota 5,4: melhorou de frente e quebrou nas costas e nas botas.

O que funcionou foi tirar o gerador do produto final. Gola, bolsos, punhos, alças com argola, fivelas, rebites: cada peça modelada separada no Blender, com cabelo e barba em cards. Entre 33 e 37 mil triângulos por NPC. O gerador ficou só como referência.

## O revisor que dá nota

O loop é simples. Um agente monta o personagem. Outro modelo faz o papel de diretor de arte, dá nota de 0 a 10 e diz qual defeito custa mais ponto. Meta: 9. Abaixo disso, outra rodada.

A nota principal do Torben foi 6,3, 6,2, 7,2, 7,3, 8,0, 8,3, 8,7, 8,9 e, na rodada 9, 9,1. O giro de 360° ainda estava abaixo de 9, e a meta vale para as três notas. Na rodada 11, as três (imagem do site, retrato e giro de 360°) fecharam em **9,1, 9,1 e 9,0**.

A rodada 4 foi a mais útil. O revisor apontou 5 defeitos que não eram de arte, eram de código: gamma aplicado duas vezes, martelo de cabeça para baixo, normais sobrescritas, sujeira desligada e transparência cortando a barba. Nenhum ajuste de arte ia resolver aquilo.

Os outros três NPCs herdaram a receita. O Roldan fechou em 6 rodadas. A Ilda saiu de 5,8 e o Marlo de 6,8, e os dois chegaram a 9,1.

## A regra que segurava a nota

Nas armaduras dos heróis eu errei de outro jeito. O pedido era consertar sem trocar o asset: mesma malha, mesma UV, mesmo desenho. A nota subiu de 0,1 a 0,3 por rodada e não passou de 6,3, abaixo da meta de 7 dessa fase. O revisor escreveu que remendos cirúrgicos "batem num teto próximo de 6,0".

Mudei uma linha: pode refazer, com quads, bevel e PBR de verdade. A primeira rodada piorou para 5,1 de média, porque perdeu a cara dos personagens. Continuei. A média foi 6,65, 7,43, 7,98, 8,38 e chegou a 8,50 na rodada 6, com as 4 classes entre 8,4 e 8,6. A meta 9 ainda não chegou.

A nota estava presa pela restrição que eu escrevi, não pelo modelo.

## O site no ar

Com a arte nova, o [site do jogo](https://mmo.kurobane.com.br/?utm_source=blog&utm_medium=post&utm_campaign=arte-com-ia-local&utm_content=pt) foi para a v5, com os 4 NPCs e as 4 classes refeitas. Cada imagem sai em AVIF e WebP, em 3 larguras. Lighthouse: performance 97, acessibilidade 100, boas práticas 100, SEO 100. CLS de 0,001 e TBT de 0 ms.

O LCP de laboratório ainda é 2,6 s. O limite de "bom" do Core Web Vitals é 2,5 s, medido no p75 de usuários reais. É o próximo alvo.

## Antes de culpar o modelo

O gerador acerta a forma e erra as junções, e o revisor acha bug que eu não acharia. Mas a lição que mais me custou foi a das armaduras: três rodadas presas por uma linha do meu próprio pedido. Quando a nota para de subir, hoje eu releio a regra que eu escrevi antes de trocar de modelo.
