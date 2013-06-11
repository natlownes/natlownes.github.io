---
layout: post
categories:
  - coding
title: Jesus scolds you for git push'ing debugger statements
date: 2011-11-09
author: Nat
---
Git pre-receive hook tip: Have Jesus "Jeezo" Christ himself to scold you for
leaving "debugger" statements in your Ruby code: [https://gist.github.com/1352582](https://gist.github.com/1352582)

A while back at the day job, debugger statements getting into the repo used to
be a problem, as sad as that is. When I moved the project to git, I added this
pre-receive hook to keep that nonsense out of the repo and also give the guilty
party a little bit of a scare. It's pretty startling if you're not expecting it.

ASCII art of Snoop Dogg is included in the gist if you work with someone who might be
offended by a crucified ASCII Jeezo.

<script src="https://gist.github.com/natlownes/1352582.js">
</script>

