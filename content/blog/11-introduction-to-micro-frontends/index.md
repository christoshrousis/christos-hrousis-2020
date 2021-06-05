---
title: Introduction to Micro Frontends
date: "2021-06-05T12:15:05.111Z"
description: "Micro Frontends solve complex problems for large teams, but can we adopt some of it for small teams?"
---

<h2 style="margin-bottom:0.5rem;">Introduction</h2>

Frontend Development has come into it's own over the past decade. As complexity grew, so do the demands of these developers. But what happens when team sizes start to grow? Codebases' become a coupled mess, with front of house stepping on the toes of back. A new trend has emerged, known as "Micro Frontends". A way to breakup codebases, from monolithic beasts, to smaller, more manageable projects.

The benefits of micro frontends are pretty clear:

- Incremental updates.
- "Simple", decoupled codebases.
- Independent deployment.

The most common of reason to set this up, is when deployment becomes too difficult. Frontend teams tend to iterate at a faster cadence than their backend counterparts. You may want to give your teams a bit more independance and empowerment to ship without having to wait on others. To read more about this broader topic, I strongly suggest [Micro Frontends by Cam Jackson](https://martinfowler.com/articles/micro-frontends.html).

<h2 style="margin-bottom:0.5rem;">Incremental adoption</h2>

Recently, I put together a micro frontend architecture plan. I had a problem, 5 to 6 individual applications on the horizon, each with common UI components. Micro frontend was immediately front of mind. But, after careful consideration, we decided against it! What is it that held us back? Well, it takes a large team to warrant, and a team we did not have. But what steps does one take, in anticipation of this need in future?

We took the smallest of steps possible first. We extracted our common UI components into their own folder. It was surprising to see how many components we could extract, when making it a goal. We went from the odd button or style, to a folder full of nested components.

So, start by extracting your common components. You are then left with two options. 

You can start by building out your common library and publishing it to a private repository. You may then import it into each of your individual projects as you would any other package.

<h3 style="margin-bottom:0.5rem;">SvelteKit's approach to this problem</h3>

On a side note, the new direction SvelteKit is taking, is to treat your project more like a [library](https://kit.svelte.dev/docs#modules-$lib). It aliases `$lib` to your `src/lib` folder, where you house your components. It even helps you build component libraries out of the box. SvelteKit is a compelling framework for building Web Applications with Svelte. But it also provides you with [package and publishing tools](https://kit.svelte.dev/docs#packaging-publishing).

<h3 style="margin-bottom:0.5rem;">Yarn Workspaces, and Lerna</h3>

Alternatively, or in conjunction, you can walk the path of micro frontends. A good first step I found, was to run a mono-repo of all your projects. Immediately you will notice project folders, each with it's own node_modules. 

```
/my-mono-repo
--/project-one
----/node_modules
--/project-two
----/node_modules
--/common
----/node_modules
```

This is where [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) shines! Workspaces hoists these folders into the root node_modules folder via symlinks. This saves you space, but also helps with installation and developer onboarding. 

```
/my-mono-repo
--/node_modules
--/project-one
--/project-two
--/common
```

Yarn workspaces allow you to hoist node_modules up to a root directory in a mono-repo. This allows you to share packages across your own defined packages. This by itself is a good first step for managing a mono-repo. From here, you can use the tool [Lerna](https://github.com/lerna/lerna) to run commands across each project. The most common need, is to run all test suites for all projects, with a single command from the root folder. You can review this approach in [Lerna and Yarn Workspaces by Julian Burr](https://www.julianburr.de/til/lerna-and-yarn-workspaces/). A great addendum I recommend, is to review [Why Lerna and Yarn Workspaces is a Perfect Match for Building Mono-Repos – A Close Look at Features and Performance by Sebastion Weber](https://doppelmutzi.github.io/monorepo-lerna-yarn-workspaces/) which gives a great deep dive into how Yarn Workspaces and Lerna came to be.


<h3 style="margin-bottom:0.5rem;">Change is coming</h3>

At the time of writing, the frontend tool space was undergoing change. Tools like snowpack are on the horizon, looking to end the idea of bundling altogether. They bank on the idea of caching based on URL, which is now possible with es modules. This has led to faster dev build times, and evolves on the idea of micro frontends. Imagine a future where components are cross shared across websites!

[You can learn more about snowpack here.](https://www.snowpack.dev/tutorials/svelte/)

[You can learn more about skypack here.](https://docs.skypack.dev/)

[You can learn more about es modules here.](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)

<h2 style="margin-bottom:0.5rem;">Conclusion</h2>

Micro frontends are amazing. But consider the operational and governance complexity it may introduce. You may find that a simple folder split may address your needs. A private NPM repository can serve a common components library. You can also incrementally adopt micro frontend architecture, as the need arises. Small steps for small teams, [you probably do not need a micro frontend](https://blog.scottlogic.com/2021/02/17/probably-dont-need-microfrontends.html).




