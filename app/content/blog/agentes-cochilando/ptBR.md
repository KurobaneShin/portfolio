---
title: Meus agentes de IA passaram 207 horas cochilando
description: Em 30 dias, meus agentes ficaram parados mais de 5 minutos 600 vezes. 357 delas eram um sleep perguntando "já acabou?". E cada pergunta custava reler um livro inteiro.
date: 2026-11-25
tag: ia
image: /blog/agentes-cochilando/og-pt.jpg
---
Eu uso agente de IA pra quase tudo: rodar teste, revisar PR e até construir o meu MMO. Um dia fui medir quanto isso custa de verdade e achei um número ridículo.

Em 30 dias, os subagentes ficaram parados por mais de 5 minutos **600 vezes**. Somando, umas **207 horas**. Quase nove dias de agente olhando pro teto.

E 357 dessas pausas eram a mesma coisa: `sleep`, depois ler um arquivo pra ver se o comando terminou. De novo. E de novo.

## O estagiário que pergunta "já acabou?"

Imagina um estagiário esperando um build. A cada minuto ele vai até a sua mesa e pergunta se já terminou. Chato, mas barato.

Agora imagina que, antes de cada pergunta, ele relê do zero todos os documentos do projeto. Todos.

É assim que um modelo de linguagem funciona. Cada vez que o agente "volta", ele relê o contexto inteiro da conversa. Uma sessão típica minha carrega entre 350 e 480 mil tokens de contexto, e as mais longas passam de 800 mil.

Tem cache, e ele funciona muito bem: uns 98% de acerto. Mas o cache dura 5 minutos. O agente que cochila 6 minutos acorda sem cache e paga a releitura inteira com preço cheio.

Ou seja: toda vez que acordava, o agente pagava a conta inteira de novo.

## O que eu mudei

- Comando longo roda em segundo plano, e o agente é avisado quando termina. Ninguém fica perguntando.
- Toda espera tem prazo: o dobro do tempo esperado, ou 30 minutos se ninguém sabe. Passou disso, o agente para e me mostra as últimas linhas do log.
- Subagente não espera nada longo. Ele dispara o job, devolve onde está o log e encerra. Quem espera é a sessão principal.
- Falhou igual duas vezes? Para e me chama. Nada de tentar em loop.

## O que eu aprendi

O custo de um agente não é o tamanho da resposta. É quantas vezes ele volta, vezes o tamanho do que ele precisa reler.

Um agente que pergunta menos e espera direito sai mais barato do que um modelo barato perguntando o tempo todo.

E agora eu tenho um script que mede isso por projeto. Porque achismo sobre custo de IA eu já tive bastante.
