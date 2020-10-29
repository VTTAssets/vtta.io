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


#### Parsing issues

- **Changes to the parser for one monster might break another** - the parser evolved over time, too. I reacted on user reports that this and that monster is not parsing correctly, then I looked specifically at that monster and made it work. Do the changes change the way the other monsters are parsed? Who knows - the tools weren't there to check that. 
- **"And how do I know if I should reimport because the parser improved a certain monster?"** - well, you don't. There is no flag that the Aboleth is now supported better because I didn't know that either (see the issue above for the *why?*).
- **Making changes to the parser takes long** - changes on the parser resulted in changes to the Chrome extension which then results in an update pushed to the Chrome Webstore. And that results in waiting times from two to four days in the past. If for some reasons the review process and their internally and not publicly available conditions for a successful review change, the release might be postponed even further.

## That's plenty of issues - how to fix (all!) of them?

First of all, it's time for admitting some character flaws here: I am somewhat of an control freak. Giving up control is hard for me but it's a step I need to take in order to provide you with the best possible outcome. While it's nice to finalize a map, putting in walls, lights, references... it eases the mind to not think to much and still be productive, my time is invested better in improving the tools, adding features, fixing bugs and supporting you guys when you are experiencing issues. So the first step will be

### Looking for help

You were awesome in the past, submitting scenes and adjustments, but even looking through these, comparing the changes to the existing map and deciding if it's an upgrade, a sidestep, a minor improvement or a downgrade takes a lot of time. Instead, I will be looking for some people that want to lend a hand - and receive great benefits while doing that! If you are interested in contributing please send me [an email](mailto:vttassets@gmail.com).

#### Community Supporters

There are some awesome people already going through the Discord and providing help for new users. I really want to up that number in order to have someone ready to answer beginner questions when I am not around. You will receive the same benefits as the **Module Leads**:

- get access to the full VTTA.io toolsuite
- get access to their relevant content on D&D Beyond 

All I am asking is to spend some time on the Discord and be available for questions. Some of you are already doing that, so let's make it official!

#### Module Leads

**Module Leads** are people that are currently running a module for their group, knowing the module or wanting to prepare the module either way. When I was mapping a scene, I just looked at the walls, the windows, the map references and placed them according to what I saw. This resulted in details not being 100% correct: An unlocked door that should be locked, a misplaced window or a secret door that isn't that secret at all. Combine that with the monster placement that is currently missing I know that the import quality regarding scenes can definitely improve. 

**Module Leads** are signing up to prepare a module in the best possible way and contribute this data in order to allow other people to import the scenes as expected: The best possible way. Module leads will discuss the finer details about how to transfer the D&D Beyond content into Foundry VTT to develop a set of guidelines which result in a consistent quality of the imports. These guidelines include aspects like

- Will monsters be imported as hidden or visible per default?
- Will thicker walls be walled in the center or do we wall the outline of the wall?
- How do we handle regional maps in regards to grid scaling?
- and others...

I do not ask to contribute your valuable time without receiving any benefit at all. All **Module Leads** will 

- get access to the full VTTA.io toolsuite
- get access to their relevant content on D&D Beyond 

On top of that, there will be either a fixed or variable compensation in terms of physical goods (think: [Beadle & Grimm's](https://beadleandgrimms.com/) releases, D&D source books, miniatures, ...), or digital goods (it's a shame that D&D Beyond does not provide gift codes! Think Dungeondraft/ Wonderdraft licenses, Foundry VTT licenses, ...). The details about that are still to be determined, but all in all I am planning to invest a high four digit dollar amount to create enough incentive for people to step up for this task - and with the complexity and amount of work needed to transfer a module, the reward will go up, too: Rick and Morty isn't the same amount of work as The Dungeon of the Mad Mage.

#### Module Lead Coordinator

To coordinate the creation of guidelines better, I am looking for one **Module Lead Coordinator** who keep the guidelines available and up-to-date, who will direct questions regarding the import of a specific module to the respective lead and be a general contact point for everyone involved. You will get the same benefits as the Module Leads themselves:

- get access to the full VTTA.io toolsuite
- get access to their relevant content on D&D Beyond 

### Redesigning the way we are currently importing things

Currently, all parsing is done within the extension. In order to be able to adjust things better, to improve the parser locally (and therefore quicker) and in order to be able to track changes on the result of each parse the parsing will now be done on a server. Or better: On a couple of servers. The whole infrastructure is currently not only located in a datacenter in Frankfurt (Germany), but distributed in Amsterdam, London and Germany - more locations will follow to ensure quick response times and quick imports. 

The extension will collect the HTML and send it over to the server where it gets parsed. The resulting data will be sent as a response and you can continue your import process as usual. That means that adjustments to the parser will not require an update to the Chrome extension any longer. That also means that I can track if a change in the parser has any unwanted side-effects like breaking a monster parse or changing it in an unwanted way. 

By moving the parsing logic, we will have several benefits making the tools way better: Speedier response times for necessary changes, reliabilty of the outcome and being able to track if a monster you imported a week ago has improved since then.

Sounds good? Let's ramp that up a bit:

#### Processing bestiaries

A long-wanted features was to import bestiaries, e.g. multiple monsters that are displayed on one page, e.g. the bestiary pages within an Adventure Module or a plain listing on D&D Beyond. Due to the rewrite and better structuring of the whole parser, this is now possible as each indiviual monster blocks will be parsed by the infrastructure/ extension combo. This feature will be one cornerstone in a better Adventure Module import process: In order to import a map and place the monsters, you will need to have those monsters available. So the very first steps in Adventure Module import will be importing all monsters in a batch-processing way. Early tests are very promising and result in so much quicker imports, it's amazing! 

#### What about items?

Items are currently imported by character import, and in a manual way. I found a shortcut that enables me to identify all items used in an Adventure Module and to import them in one go for you (yeah, it's a character import in the end, too, but a character import you don't need to manually construct and process, so it will definitely be a time-saver). 

That means: Before you are importing your Adventure Module, you will be importing 

1. all items
2. all monsters

and then continue to retrieve the scenes and textual descriptions of each one.

### The new website as the foundation that brings it all together

Rewriting the website might seem like a waste of time. It was not. Instead, the rewrite made it possible to authenticate you as a user from the Chrome extension in order to trigger a parser. It is very important to secure access to everything by the real accessibility on D&D Beyond for your specific user, because in the end, the whole toolset is an **Integration of your licensed content into Foundry VTT**. 

I am not providing you with anything that you haven't bought on D&D Beyond, because I know: This request for this monster comes from this page on D&D Beyond using the extension. You can try to access the parser from outside the extension, but it's locked down by security measures implemented everywhere on the internet.

This step made the rest possible in the end. Having the parser outside of the extension with all the added benefits. The content is still processed on each request, ie. the HTML will be sent over and will get parsed, it's not just a database lookup to send you a cached result. It's all processed in near-real-time.

## Disclaimer

I am inviting you into my thought process to let you know what is currently happening behind the scenes. That does not mean that all things described here will be available, or available everywhere. In order to stick to the mission statement to provide integrative tools from D&D Beyond into Foundry VTT might e.g. result in batch import of monsters being only a part of the Adventure Module import and not a general feature. Adventure Module import is currently in a design/ prototyping stage and is currently not written in stone. 