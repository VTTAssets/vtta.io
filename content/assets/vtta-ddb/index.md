---
draft: true
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

- **Individual imports: Monsters, spells and items** - Consistent UI elements within monster, spell and item blocks allows you to quickly import each entities individually. Additionally, since all those entities are now subject to versioning by the server-side parser, any **outdated entities present in your Foundry VTT server will be detected and updated automatically** for you. You simply browse D&D Beyond while being connected to Foundry VTT and the tools will ensure you are getting updates along the way.
- **Batch imports: Monsters, spells and items** of those entities are possible, now, too. You will find an unobstrusive button on all listings of those entities. \*\*Want to import all monsters of size huge and CR5 and up? Just use the amazing filters by D&D Beyond and import the resulting list with vtta-ddb.
- **Automated token generation** - an installed and enabled vtta-tokens will detect imported monsters and will auto-generate a token image for you. The necessary images are downloaded to your Foundry VTT server, too.
- **Source book import made easy** - With server-side parsing and manually crafted processing instruction specific to each sourcebook, the parser will know which pages to traverse in order to achieve a great, complete import of great quality: With the automated batch import, all entities required to run your adventure will be imported **and back-referenced to D&D Beyond**: All monsters, items, tables and scenes detected in the adventure will be available in your world.
  - Tables with reasonable names? **Check!**
  - Linked Foundry VTT entities within the Journal Entries? **Check, and with links back to the original D&D Beyond page, too!**
  -

### Footnotes
