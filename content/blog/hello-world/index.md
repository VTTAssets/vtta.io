---
title: Hello World
intro: You might ask yourself why I am working on a new website when there is still so much to do on the import/module front? Let me take you for a ride through my thoughts in order to bring you all on board. I think it's worth it. Do you? Reach out for comments!
author:
  name: Sebastian
  email: vttassets@gmail.com
  website: https://www.vtta.io
tags:
  - blog
---

# Hello World

**Note**: If you are reading this on Github - it will make it live soon enough 😊 

It's done. The website is online and with it a milestone reached for some exciting features that will emerge in the next couple of weeks. Let's sit down and talk about the shortcomings of the current importing (as I see them) and how I am planning to tackle them. Because yeah, the tool evolved in the last 12 months from a simple character import to a one-stop shop for integrating your licensed content into your Foundry VTT sessions. Because I am an avid programmer, I am by no means a educated application designer and by building feature upon feature - sometimes caused by external triggers, e.g. the Google review desaster a couple of months ago, sometimes - the whole code base became a bit like the old vintage houses: Crooked windows, two chimneys (one defunct), a door that sometimes refuses to open... you get the drift.

## I had time to think

Our offspring is now two months old and that means: Night shifts carrying her around the flat, feeding or just spending time to get her back to sleep (and enjoying that immensely!). While I haven't had the time to actually code an aweful lot consistently, I took the time to just think about the current feature set, the current functionality and everything I wanted to improve upon. That really helped to structure my thoughts, to make little *proof of concept* apps in order to improve, replace or rework the whole stack. Let's go through it step by step.

### Shortcomings

#### Technical Issues

- **The website was overly complex and therefore not super reliable** - I learned a lot while creating it (React, integrating Contentful, MongoDB) but the complexity brought several pain points in terms of maintenance with it. It became a monolith of functionality, combining the Discord bot, Patreon membership updates, the original web content, asset management (It could have been glorious if Atropos would not have released a asset management possibility for developers a week before the VTTAssets.com relaunch last year)... basically everything was build on top of each other. 

- **User management (logging in into the extension and connecting accounts) is a royal pain in the ass** - when I started out, I used Firebase for almost everything, but started to migrate everything off Firebase with the exception of authentication with Google. With the recent security changes of Google Chrome in regards to secure cookies and Firebase doing the *"THat's not our issue, sorry mates"*-game, it became evident that I needed to take action sooner or later. Logging in into the extension and connecting the Patreon account is roughly 50% of all support enquiries. That's way to high.

#### Import Issues

- **Importing one thing at a time is really cumbersome** - the point stands: I am integrating the content from D&D Beyond into Foundry VTT and I am not just a simple copy tool. But still, there needs to be a way to import entire bestiaries in one go without needind to open each monster on it's own page. Spells should import better, too and starting from scratch as a new user if there is the Basic Rules available for everyone is kind of a bummer, too.

- **Support for the source books/ adventure modules is neither quick nor good enough** - The issue here is mostly my perfectionism. I am really having a hard time getting things out of my hands into other people's. But I have to admit to you and myself: I can't do **everything** in a **timely manner**. Either I do it, or it will be quick. I can't have both and in my opinion, you deserve both. 