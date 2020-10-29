---
title: Dev Diary No. 1
intro: To keep you updated, I will regularly post Dev Diaries. Let's talk about vtta.io - the website!
author:
  name: Sebastian
  email: vttassets@gmail.com
  website: https://www.vtta.io
tags:
  - blog
---

# Dev Diary No. 1: vtta.io - the website

vttassets.com was become a unmaintainable beast of code over the last couple of months: The addition of features, the used tech stack and a whole bunch of other decisions led to something that I didn't want to touch - in all honesty. Let'stalk about the state vttassets.com currently is in and then introduce you to the new website: vtta.io. 

## But first: Why?

Besides the necessary clean up that is detailed below, the new approach is the foundation for changes that currently are in development and that will ease or enhance the way the D&D Beyond integration currently works in quite significantly. I will detail that part later and focus more on the technical issues I was facing and describe how I overcame them in this post.

## State of vttassets.com

For vttasset.com, I used technologies I knew or which I wanted to learn:

* For the **webserver**, I chose [express](https://expressjs.com/de/). It's a nodejs webserver I am using for basically everything. 
* **The database** was MongoDB, hosted on [MongoDB Atlas](https://www.mongodb.com/) as I didn't want to manage my own MongoDB installation since I don't have expertise with this product. 
* **Authentication** was provided by [Google Firebase](https://firebase.google.com/). I used several other services by Firebase in the past but only the authentication part survived my evaluation. 
* **Textual content** was created and served by [contentful](https://www.contentful.com/). I was planning to write more regularly on the website and wanted something that helped me write articles in an easy way. Contentful being a headless content management system (CMS) served this purpose perfectly.
* The actual **website** you browsed was written in [React](https://reactjs.org/), as I knew that from the past and I wanted to use it for a bigger project.
* Development on the modules was integrated by using GitHub's API: Whenever a new version is released on GitHub, it is automatically published on the website, and an announcement is pushed on Discord.

### The issues

- Having a so much larger developer audience in mind when developing the website, many things were overly complex and unnecessarily flexible on both the backend and the website for developers (which basically no-one besides me ever saw). 
- The webserver received functional updates and additions over time: User management for the extension, content privisioning for the extension, serving the website for vttassets.com, running the Discord bot - everything was one big monolith
- There was in general so few articles and other content available on the website that using contentful and a SPA wasn't really justified. Additionally, the CSS framework [Semantic UI](https://semantic-ui.com) I chose for the SPA did not support tree-shaking and the resulting bundle size was **so freaking big!**
    
    All in all, everything just added to the toolchain that was necessary to get updates visible on the webpage, but weren't really necessary in retrospect
- Authentication using Firebase was working okay in the past, but since Google implemented additional security measures on the webbrowser affecting the Chrome extension (and righteously so, making the internet a safer place is good), warnings appeared and even while Firebase was bought by Google, they don't seem to like to work with Google to comply to Google's new standards. It was finger-pointing, no solutions in sight and it indeed was a technology debt bound to end in the future.

## Redesign

Even with all those shortcomings, I dreaded touching the website. Working on the website blocks developer time which is always in high demand for the Foundry VTT modules themselves.Therefore, I left everything as-is. 

### But!

Over time, several issues arose that became more and more pressing:

1. With the warnings appearing on the Chrome extension for authentication (Firebase Auth not using secure cookies and other issues) and the prospect of those warnings turning into errors when Google strengthens the security further made the rewrite necessary. 
2. Patreon discontinuing their API is adding to concerns of the viability of the whole tech stack. 
3. When thinking about the redesign of the toolchain, it became evident that some parts needed change: The authentication needed to migrate from Firebase to my own solution, making it possible to actually integrate the backend into the parsing process further (more on that topic on a later dev diary)

### Focus on simplicity and ease-of-use

For the redesign, I was going through all the functions of the current (web)-server, checking if it's a necessary functionality, a nice-to-have functionality or something that is nice, but not really neccessary. Was the existing functionality working as intended, easy to use and clear in it's meaning? Which nice-to-have things really added and justified adding complexities to the code?

After evaluating all options, I ended up with the following tech stack:
- Express is still my server of choice. It does everything I really need, I know it rather well and it serves the small amounts of page views each month fantastically.
- MongoDB Atlas is still my database of choice. I argued with self-hosting mongodb, but the robustnes of the platform justifies the price for me here - yes, I am not using the free tier, but one of the paid tiers to ensure a baseline performance that is needed for the other changes to the parsing that are currently in the pipeline (more on that in a later dev diary!)
- I abandoned Firebase Auth and implemented an oauth login process with Google on my own. It is very slim, very responsive and has all the functionality I really need. That does mean, too, that your personal details are not shared with a 3rd party any longer, which is always a good thing (even if it was a Google service provider receiving information about your Google account - still a good change!)
- I abandoned the SPA approach. The website is rather small and still manageable with only express and it's views. There are only a few dynamic/ interactive elements which can be easily implemented without a bloaty Javascript client framework
- I abandoned the approach to create content using contentful and instead opted for a manageable markdown solution that get's parsed into HTML on the server. It's a compromise regarding dynamic content, but it works rather well. Plus the whole content is avaible on Github so you can make pull request to fix my weird english!
- Discord bot integration was one of the nice-to-have features which were stripped of functions for the first pass, but which will perhaps enhanced in the future. The basic announcement of new module versions is still in place.

## The result

It took a moment to implement the changes, but I am quite happy with the result: I do have clean codebase, a clear vision, seperation of concerns with different services being responsible for different functionalities, better feedback to users and still the easiness to add content using markdown vs. the contentful approach. 

From a user-perspective, it is now easier to connect your Patreon and Discord accounts, to get information about when the last Patreon update made it's way into my backend regarding your pledge and 100% transparency about the data stored about you. 

The cleaned up codebase should make fixing the unavoidable bugs quicker, the integration with Patreon seems to be more stable (that's easy to say if it's not yet in full production yet ;))... and it's one of the necessary cornerstones that will make the integration from D&D Beyond into Foundry VTT even more awesome. To detail those changes will be another dev diary in the future.