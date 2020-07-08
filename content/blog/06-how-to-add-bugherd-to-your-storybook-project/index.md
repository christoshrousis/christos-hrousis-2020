---
title: How to add BugHerd to your Storybook project
date: "2020-03-12T09:30:03.284Z"
description: Add BugHerd bug tracking to Storybook for an effective issue tracking process.
---

![Storybook + Bugherd Logo](./storybook-bugherd.svg)

I've been having some great productivity gains recently by adopting [Storybook](https://storybook.js.org/) in the workplace recently, and can't sing it's virtues enough. We started small, by breaking up existing designs into individualised components as devs, and now we're looking at how we can bring the process forward into the design phase.

Part of our process is also to use [BugHerd](https://bugherd.com/) for testing and approvals. But BugHerd insists on throwing you just a plain JavaScript inline script, which might confuse some people as it did me for a second. Luckily, it appears I was overthinking it.

Storybook allows you to add inline scripts to the head of your project, whether you're using React, Vue, or plain Javascript, inline scripts can either be pulled into the preview iframe, or the manager page of Storybook itself.

Starting with your Storybook config directory, typically found at `.storybook/` in the root of your project, we're going to create a file called `preview-head.html`. Take the BugHerd generated code, and paste it into this file with the `<script>` tags in place.

**That's it**, Storybook handles the rest! A quick peak at the documentation tells us that we can also add the script to the manager, by calling the file `manager-head.html`, but as a point of personal preference I found it works better in the preview window as placing it in the manager may interfere with BugHerd's ability to highlight the elements in the preview window.

You can read the well put together documentation [here](https://storybook.js.org/docs/configurations/add-custom-head-tags/).
