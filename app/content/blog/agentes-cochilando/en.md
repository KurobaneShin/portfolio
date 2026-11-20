---
title: My AI agents spent 207 hours napping
description: In 30 days my agents sat idle for over 5 minutes 600 times. 357 of those were a sleep asking "done yet?" And every question cost re-reading an entire book.
date: 2026-11-25
tag: ia
image: /blog/agentes-cochilando/og-en.jpg
---
I use AI agents for almost everything: running tests, reviewing PRs, even building my MMO. One day I measured what that actually costs and found a ridiculous number.

In 30 days, subagents sat idle for more than 5 minutes **600 times**. Added up, about **207 hours**. Almost nine days of agents staring at the ceiling.

And 357 of those pauses were the same thing: `sleep`, then read a file to see whether the command had finished. Again. And again.

## The intern who keeps asking "done yet?"

Picture an intern waiting on a build. Every minute they walk to your desk and ask if it's done. Annoying, but cheap.

Now picture that before every question, they re-read every document in the project from scratch. All of them.

That's how a language model works. Every time the agent "comes back", it re-reads the whole conversation context. A typical session of mine carries 350k to 480k tokens of context, and the longest go past 800k.

There's a cache, and it works very well: about a 98% hit rate. But the cache lasts 5 minutes. An agent that naps for 6 minutes wakes up without it and pays for the full re-read at full price.

So every time the agent woke up, it paid the whole bill again.

## What I changed

- Long commands run in the background, and the agent gets notified when they finish. Nobody keeps asking.
- Every wait has a deadline: twice the expected time, or 30 minutes if nobody knows. Past that, the agent stops and shows me the last log lines.
- Subagents don't own long waits. They start the job, hand back where the log is, and finish. The main session does the waiting.
- Same failure twice? Stop and call me. No retry loops.

## What I learned

An agent's cost isn't the size of its answer. It's how many times it comes back, times the size of what it has to re-read.

An agent that asks less and waits properly is cheaper than a cheap model asking all the time.

And now I have a script that measures this per project. Because I'd had enough of guessing what AI costs.
