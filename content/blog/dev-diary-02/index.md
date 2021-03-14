---
title: Dev Diary No. 2
intro: Infrastructure - while not being the most sexy part of IT, it is still needed. Let's talk about the currently used infrastructure, how I choose that and it's benefits.
author:
  name: Sebastian
  email: vttassets@gmail.com
  website: https://www.vtta.io
tags:
  - blog
---

# Dev Diary No. 2: Infrastructure

Infrastructure in IT terms means the real physical hardware: servers, switches, storage and everything else that turns electrical energy into warm air during the process of providing certain services. This term broadened a bit since we are using virtualization and not every server is a real piece of hardware, but could be just a piece of configuration and the promise:

> "Yes, you can use some CPU, RAM and disk I/O somewhere, but you really need not care about those fine details, leave that to me." _-every infrastructure guy/gal everywhere, and every cloud provider, too, of course_

In my regular job, I am working in IT infrastructure. During the last 20 years, I came to the realization, that nobody wants to talk about infrastructure, because it just isn't sexy enough. It's like talking about steering wheels in cars: Of course you need one, but let's talk about the sexy things like the engine and how fast it can make this thing accelerate.

Still. There is hope someone will find this interesting. Perhaps someone wanting to go into IT, and perhaps focusing on infrastructure someday ;)

## The past: vttassets.com

vttassets.com is a one virtual server, running Linux (Ubuntu 18 LTS) and providing all components for everything related to VTTA in one big chunk of software: The website, the image proxy, the workflow that allows me to release a new release of one of the modules on [Github](https://github.com/vttassets/) and it is automatically packaged and available to you when you check for updates, including the Discord notifications. Plenty of moving parts residing on one server and most of it even part of the very same webserver (running on node/express).

It seemed like a great idea to have everything under the same roof. And initially, it really was - but then the whole suite of tools outgrew the initial design and something that I do hear very often happened: "For historical reasons, we are stuck with this design." The tools received functional updates, the Discord bot grew in commands, adventure module import was added, something that wasn't planned right from the start. This single server ran all different aspects at the same time - and if one thing breaks, everything grinds to a halt (we saw that right after christmas, when the logfile of the proxy server filled the harddrive to 0 bytes free, halting the operating system and resulting in the webserver being unable to process any more requests, e.g.).

## The future: vtta.io

For the revamp, I dug through vttassets.com's source code, identified the parts that are necessary as a first step and extracted those pieces of code, splitting one large code base in several microservices: Each service is served by an dedicated webserver, making the whole service more resiliant to individual errors and being able to update individual components more easily.

> "But hey, you promised infrastructure, and all I see is software architecture!"

You are absolutely right. With the split of the code in individual components, I could easily make them run individually. Instead of creating a (virtual) server for each of the components (e.g. module release, website, API), each one is now containerized as a [Docker](https://www.docker.com) service. Docker is really great to ship individually running components into the hands from a developer into a productively running service and I am using it quite extensively nowadays.

And indeed, everything was falling nicely into places when Github announced their own container registry, [GitHub Packages](https://github.com/features/packages): I can now package a new version of each of the microservices by create the new docker image, tagging it with a new version and uploading it to the (private) container registry. And now: Let's really talk about infrastructure.

## Docker swarm vs. Kubernetes

Having everything in different microservices, it's just a small step to thing about the management of the different docker containers: How to start them, how to monitor them, how make sure they are consistently running - how to orchestrate all these things. One of those things is: "Can I make sure that the service is available all of the time, even if the datacenter has an outage (planned or unplanned)?". With containers, you do have solutions for that, and two of them are keywords you might have heard about: [Kubernetes](https://kubernetes.io/) or [Docker swarm](https://docs.docker.com/engine/swarm/).

### Kubernetes

**Kubernetes** is the clear winner in the wars for the best tool when thinking about orchestrating containers. You can self-host it, or you can pay every of the bigger cloud service providers to manage the Kubernetes platform for you and you are just using the software to reach your goals. With the current drive of development due to it's enormous success, come great costs, not necessarily in terms of real money, but in **time needed to invest** in order

- to get running and
- to keep on running

Kubernetes is complex, and designed to run hundreds, thousands of containers and to manage them. It is rather easy to misconfigure something and honestly: I was overwhelmed by the complexity. We are currently planning to deploy a Kubernetes platform at my regular job and that will allow me to get a better understanding about all the moving parts of that systems, so I might revisit vtta.io with that better knowledge, too, but right now, Docker Swarm is the better solution for me.

### Docker Swarm

**Docker** and **Docker Swarm** is in a weird place to implement new systems right now: While Docker is still used everywhere (but alternatives for this docker runtime are either available or announced, too), Docker Swarm lost the race to being the superior container orchestration software to Kubernetes. Docker was even sold to [Mirantis](https://www.mirantis.com/), a company wanting to provide continued and improved support for business customers and that vouched for continued development of Docker Swarm, too - but I guess we will need to see how it all pans out.

For the time being, Docker Swarm has greatly reduced complexity while providing some of the benefits I was looking for in running (and choosing) an orchestration layer for my containers: Running multiple instances of the same container in different datacenters.

## Implementing Docker Swarm

Creating a swarm is relatively easy: You install Docker on all servers, then you configure one master node and add other nodes to the swarm whenever you need an additional swarm member. Right now, the swarm consists of three swarm members (one of them being the master, too), and those are located in

- Frankfurt (Germany),
- London (United Kingdom)
- Amsterdam (the Netherlands)

**Update** In preparation for the launch of the next generation of parsers, I deployed three additional nodes in

- New York (USA)
- San Francisco (USA) and
- Singapore

By placing the members into different datacenters, I can ensure that the swarm itself is running all the time: When Frankfurt has an outage, the other two nodes will detect that and take over. This is possible by a change of thought: Instead of deploying a container containing a microservice (e.g. module release, website, API) onto a single server running Docker, I can now specify to deploy that container to the swarm. "Oh, and while doing that, can you please make sure that at least three instances of this service is running at all times while making sure that only one instance is placed on one swarm node only?"

So three instances, running on three nodes, with a single command. Crazy easy. And instead of placing the three instances on the same node, I can ensure geolocation redundancy of the service: Amsterdam has an announced maintenance? Let's shutdown the node, and two instances of the service keep running. Of course, the Swarm will complain about not being able to fulfill the policy employed alongside the actual container, but that's okay for the time during the maintenance: We now the situtation will resolve eventually into the desired target state.

I knew about Virtualization using VMware, so these concepts are not new to me, but the ease of install and usage of Docker Swarm was a great experience. I am not saying that I am a total pro on Docker Swarm now, if some error occurs I will still need to invest more time to analyze and understand the error that is occuring than on a regular single server or a VMware cluster, but I am feeling confident that I can manage the Swarm - and that brings ease of mind.

### vtta.io - soon in a datacenter near you?

With the three datacenters choosen during the pilot and evaluation period, it is totally possible to add new swarm nodes in the future. As you can see on [Digital Ocean's Availability Matrix](https://www.digitalocean.com/docs/platform/availability-matrix/), there are plenty of other options, e.g. East and West coast of the USA, but Singapore and Bangalore, India, too. Most of my users are located in the USA, so it might make sense to add two nodes there in order to get faster response types to them. This will require feedback once the new parser is out and in testing with all of you - this is definitely going to be interesting for me to see how that pans out.
