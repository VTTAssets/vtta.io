---
draft: false
title: VTTA D&D Beyond Integration
intro: Are you an avid user of both D&D Beyond and Foundry VTT? Do you want to seamlessly integrate both tools into your regular DMing workflows? "VTTA.io - D&D Beyond Integration" helps you to achieve that goal.
author:
  name: Sebastian
  email: vttassets@gmail.com
  website: https://www.vtta.io
tags:
  - asset
---

# Virtual Tabletop Assets - D&D Beyond Integration

Almost two years ago, I started working on getting characters from D&D Beyond into Foundry VTT. Since then, bits and pieces got attached to the original module, and it's shortcomings became more and more apparant. A fresh start is warranted.

D&D Beyond as a digital ressource is more valuable than ever: Encounter builder, searching, sorting and filtering of all the entities using a well-designed web interface plus the availability of the latest and greatest sourcebooks (not to mention the additions of errata straight into the content - invaluable).

## The old and the new

I am often referring to the **first and second iteration** of tools.

- **The first iteration** is the old website (vttassets.com), the Foundry VTT module vtta-dndbeyond and the first Chrome extension
- **The second iteration** is the one I am releasing right now: It's based on vtta.io (this website), the Foundry VTT modules [https://vtta.io/assets/vtta-core](vtta-core), [https://vtta.io/assets/vtta-tokens](vtta-tokens) and of course: [https://vtta.io/assets/vtta-ddb](vtta-ddb).

In short: Whenever you see or read something that refers to "vttassets.com", "vtta-dndbeyond", then close the tab and search for new information ;)

## Modularity goes a long way

The first iteration of tools was a monolith in many regards: The backend server was one big chunk of code, the module itself was just a bit better because it was already rewritten once during it's lifetime, but it still combined many functions into one big bundle.

That being one of the lessons learned, the code was modularized and is therefore more maintainable. You - as a user - should just now that

- **vtta-core is the base for all vtta.io modules** - without that module, all other modules will even refuse to start at all. It provides both shared functions, styling and UI elements and a **centralized configuration panel** that brings all mdules closer together, effectively simplifying the configuration
- **vtta-tokens is not just another module** - it is tightly integrated. In addition to it's great manual capabilities, vtta-tokens is **actively used** by vtta-ddb to automatically create tokens based on the imported monster artwork without needing a single click from you. **Note:** The results vary in terms of usefulness since all attempts to reliably detect a monster's head failed succesfully. It will try to catch the upper area of an image and depending on the monster's posture you could either great a great facial shot or the tip of a dynamically swung tail. Most of the time, the results seem to be useable, though.
- **Server architecture has been modularized, too** - not only in terms of functionality (there is a service dedicated for image loading, one for parsing etc.), but those are ran as small containers across in different datacenters. This enables me to scale geographically if latencies are demanding that, or scale in terms of quanity if the user requests are taking too long to being processed.

## Server-side parsing

The first iteration of tools parsed the monsters straight in the Chrome extension. On the plus side, there were no additional servers needed and the network was used very sparingly. On the other hand, making changes to the parser due to misbehaving monsters always took quite some time since it requires another version of the extension and with that another Google Webstore code review - which could take a couple of days.

Instead of parsing the data directly in the extension, the HTML is submitted to a server-side parser and the result is fed back to you. This allows easier and quicker updates and an increase in parsing quality due to the usage of server-side libraries and storage capabilities.

## Features

- **Individual imports: Monsters, spells and items** - Consistently designed and unobstrusive UI elements are inserted in all monster-, spell- and item (stat) blocks - everyone on dndbeyond.com: Detail pages, (filtered) listings, encounter builder: Import what you need where you find it.
- **Versioned entities** When the parser improves it will be run against all known monsters, spells and items locally on my development environment. Chances are that one fix for a monster affects others, still undetected discrepancies on other monsters. All affected monsters will be examined closely, and only good changes will result in an parser update, effectively increasing the version number for each affected monster by one.

  Having a version assigned to them, the tools will now detect **outdated entities present in your Foundry VTT server and update them automatically** for you. Just use the tools, Foundry VTT and D&D Beyond and VTTA got you covered to keep you updated for you.

- **Batch imports: Monsters, spells and items** can now be imported in batch. Simply browse to a listing page, filter to your likeing and start the batch import. If the listing consists of multiple pages, they will all traverse until every entity is imported in your game.
- **Automated token generation** - an installed and enabled [https://www.vtta.io/assets/vtta-tokens](vtta-tokens) will detect imported monsters and will auto-generate a token image for you. **Note:** All efforts to implement a fancy AI-driven solution to extract the most relevant section of the monster artwork were in vain. Therefore, the results might require manual adjustments, but it's a good start.
- **Source book import made easy** - With server-side parsing and manually crafted processing instruction specific to each sourcebook, the parser will know which pages to traverse in order to achieve a great, concise import of great quality: With the automated batch import, all entities required to run your adventure will be detected, parsed and imported into in your world.
  - Structured Journal Entries based on the source/adventure book content? **Check!**
  - Rolltables now having recognizable names? **Check!**
  - Correct scene labels with 100% consistency between Journal Entry text and actually displayed Labels? **Check!**
  - Cross- and back-referenced links within the Journal Entries? **Of course!** it is called **Integration** for a reason

There are so many details included in the tools that I could go on and on. I used the features I really liked about the first iteration, e.g. being able to quickly show my players an image displayed in a Journal Entry, and added other great additions to the mix like having a link to a RollTable within the Journal Entry and now including the possibility to directly roll from the Journal Entry without opening the RollTable itself. Those small quality of life improvements make the whole tool-suite appear really polished and like a **grown-up version** of the first iteration of tools.

# Introduction

The module requires the Google Chrome extension in order to received the data from D&D Beyond. Please download and add it from the [Google Webstore](https://chrome.google.com/webstore/detail/vttaio-dd-beyond-integrat/jkcgfhmpepgnjkjhgkfbengiopmbbhjj). After adding it to your Chrome Browser, it allows you connect to your Foundry VTT server by

Follow the in-game tutorial to learn how to connect the extension to Foundry and to import your first monster. I will update the documentation to be more thorough in the next couple of days. Thank you for your patience!
