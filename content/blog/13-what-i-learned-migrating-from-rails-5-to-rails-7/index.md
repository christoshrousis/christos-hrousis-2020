---
title: What I learned, migrating from Rails 5 to Rails 7
date: "2023-09-17T01:19:09Z"
description: "What happens when you attempt to rewrite a 12 year old Rails project?"
---

<h2 style="margin-bottom:0.5rem;">Preamble</h2>

Modern web development has been evolving at breakneck speeds. The frontend web community is currently abuzz with React Server Components, NextJS & Bun. But why am I here, writing a pull request for a Rails project to migrate it from Rails 5 to 7.

One standout library that is making waves, is a little project called [htmx](https://htmx.org). A "new" idea that we can decorate our existing html, to enhance our server driven web applications. 

This iteration of [intercoolerjs](https://intercoolerjs.org/docs#philosophy), immediately reminded me of the now 3 year old [Hotwire](http://hotwired.dev). Hotwire, being an evolution of Turbolinks all the way back from 2012. All very similar, but different approaches to the same thing. 

So, given my years of experience working in web applications. Having written written a PHP Turbolinks project back in 2015. And yet to experience Hotwire. What better way to re-visit the hype of "server-first" web application development? Then by introducing Hotwire to a Rails project that was begging for a re-write.

<h2 style="margin-bottom:0.5rem;">Elovation</h2>

[Elovation](https://github.com/elovation/elovation) is an almost 12 year old Rails project written by Drew Olsen. Back when he was working at Braintree Payments. The free software allows for  match-making games such as Chess, Ping Pong and Foosball. A staple in some office cultures. Sometime in 2015, I started making small contributions to the then,  dormant project. I had been using the software at my employer to track Foosball games. Filled with star-eyed, young optimism figured I could improve the codebase. I asked if I could become a maintainer, and the project place under an organisation, and handed over to me to manage. Little did I know, that finding time to work on the project would be difficult. But mustering contributions from random internet strangers was _not_ an easy process. 

The project has gone mostly untouched since 2015, with a minor amendment to fix some Heroku deployment issues, and a quick-fix here and there. [With Heroku deciding to remove their free tier](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq), the "one click" software you once owned, now had a price tag. Not only that, but old Dockerfiles, referenced container images that no longer existed. Making it impossible to run the dockerized version of the application.

Given the amount of "legacy cruft", that I had no idea was relevant to modern days Rails development. After 2-3 failed re-write attempts. I decided to _nuke_ the entire codebase. Started a new Rails 7 project, and copy/pasted snippets of code until the project was in a working state again.

<h2 style="margin-bottom:0.5rem;">Working with Ruby</h2>

It's been quite a few years since working in Ruby, but not much has changed. It's still a pleasure to write in given it's simplicity. Nothing much has changed, but new Ruby is a lot faster than what it used to be which is nice.

My only gripe, is I still found myself running into  versioning issues on my Macbook. Why is it still difficult to run the latest Ruby, in 2023?

A fault, all my own. I had opted to go with [ASDF](https://github.com/asdf-vm/asdf-ruby) for version management. As opposed to the well tried and true RVM. It did not provide the best of experiences. Particularly with cli tools picking up my machine version of Ruby. This was a shame, given I write many languages, and ASDF has worked well for managing these workflows. The poor experience with Ruby stuck out as a sore thumb against other languages.

So, lesson learned, stick with RVM!

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Rails</h2>

RVM still being the tool of choice, a reflection on working with "stable" tooling. The landscape that is Ruby hasn't changed much. It also doesn't keep up with new tooling that is outside of the ruby ecosystem. At times it feels like there is the Ruby/Rails way, and that's pretty much it. There are pockets of skilled Ruby engineers who have carved out respectable niches. But specialisation in a non-Rails framework may leave you struggling to find work. In a marketplace inundated with React jobs, it's hard enough to land a ruby job already so best to stick with Rails.

Something I am forgetting, and others too, is that "Rails is omakase". Rails comes with a sensible set of baked in tools and practices you can opt-out of. Minitest for unit testing.  System testing with  not only Selenium, but Cuprite drivers. I was still able to rip this out, and replace it with [Rspec](https://rspec.info). The only difficulty being that it wasn't clear what "good Rails development" should be. Is rolling vanilla Rails the way to go? Or is that marketing hype, drowning out dissenting voices? I'll concede I'm not in Ruby circles, but community fragmentation still hangs in the air. This leaves it hard to know what path to go down for success.

Rails configuration gripes from years gone by are no longer a problem. It works and play nice out of the box. Both on my machine and with Docker, I didn't run into any major problems which was quite nice.

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Hotwire</h2>

Online examples make it appear easy to put in place, and for the most part it was. It's nice to write a template, treat it as an endpoint, and be able to fetch it to replace a node in the dom. 

I did feel a little pressure via documentation to adopt Progressive Enhancement early. While sensible, given the nature of the project, I opted to drop this. Lest I over complicated the re-write to the point I failed to deliver. Instead I decided to leverage Hotwire concepts to improve User Experience.

The Progressive Enhancement tilt, forces you to understand how your application works. How does it behaves in slow internet environments? What about the 1-2% of web users who have javascript disabled at no fault of their own? 

Meaningful considerations for larger projects, with sizeable user bases. But it does add some overhead to the way your write your application. It may also pigeon-hole you into writing a "crud-like" application. As opposed to exploring new UX patterns you may find in Javascript based frameworks. Such as "islands architecture".

Proponents of server-first web application development tout a reduction in complexity. Sometimes referring to client heavy applications as "complexity engineering". But what they fail to outline that web application is difficult. Server-first web applications, are not free of drawbacks.

This complexity reflects as the oddity with working in Hotwire. How much Hotwire do I have to do? I opt into Turbo frames, but don't I already have Turbolinks? When do I use Turbo streams? What is Action Cable? Is Action Cable Rails or Hotwire?

Official documentation paints Hotwire as independent of Rails. This same documentation provides no guidance outside conceptual examples. This makes it difficult to adopt Hotwire in non-Rails based projects. But also, while writing Rails, official documentation is not targeted at you. You're forced to seek out independent, fragmented documentation on the topic. This is pretty uncomfortable. I couldn't help but think how daunting and jarring this must be for new comers.

I don't mean this to be a full blown anti-Hotwire rant, but it's something to consider. It was quite nice to write "server-first". I could see how this approach leads to a reduction in state management and complexity. It requires an all in investment though, you won't be mixing this with React components.

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Stimulus JS</h2>

Rails ships with [Stimulus](https://stimulus.hotwired.dev), as part of "Hotwire". Stimulus augments existing html to enrich UX with sprinkles of Javascript. As opposed to re-writing slabs of html in Javascript.

Much like the htmx ethos, this makes sense on the surface. Keep your existing server generated templates you have already invested in. Sprinkle a small amount of Stimulus over the top to improve the user experience. And hello UX nirvana. The [small snippet on Stimulus](https://github.com/elovation/elovation/blob/main/app/javascript/controllers/game_controller.js) as part of the rewrite was trivial to write. It did result in less lines of code for some enhanced flavour to the application.

But I couldn't shake this feeling, which I also had when writing my Turbolinks project in PHP. While written and marketed in such a way that it's independent of the Rails ecosystem, it is anything but. Googling solutions to your problems will leave you disheartened. With low adoption, finding solutions to your problems is difficult. You are on your own to work it out. Even more so if you're not writing a Rails project and trying to write in another language.

There is a User Experience deficiency in Elovation. It's currently missing a good multi-select component for selecting teams. This  requires a thoughtful, ground up design. Followed up by custom Stimulus code to match. There isn't a plethora of "Stimulus" examples out there for you to leverage.  This is one of the successes of the Javascript (React) community. You can always find _multiple_ solutions to the UX problems you are facing.

Do I try write my own stimulus component? Do I try retrofit a Web Component based solution? Why is there no vanilla solutions anymore? Why can't I find a solution which works with a semantically accurate <form>? 

Googling a solution to this problem results in React centric answers. A mark against the current landscape of web development we're in. One which now screams at newcomers that React is the default answer.

It was actually nice to write Stimulus in Rails, because it all hooks up out of the box.  No setup or initialisation steps needed. It works. This is a testament to the work the team has put into Stimulus to get it where it is today.

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Rubocop Static Analysis</h2>

I adopted Rubocop for Static Analysis. Rubocop was in its infancy when I first used it, but is now much more mature and sensible. Adoption was trivial. It comes with a handy "todo" feature, which  allowed me to table all the current violations. This helped me avoid getting "distracted", while allowing style enforcement moving forward.

Would use again.

<h2 style="margin-bottom:0.5rem;">Infrastructure: CD/CI with Github Actions</h2>

It's 2023, and Github actions has well matured! Plenty of free capacity for open source projects of this size, and quite a few examples out there. I'm a fan of Circle CI, but given the simplicity of requirements I opted for Github Actions. It seemed like a good fit given the circumstances.

Github Actions supports running a Postgres service. This allowed me to run the Rspec test suite in the cloud with it's test database without having to pay a dime.

The only issue, was that there weren't many online references of using it with Rails. I had to pull together a handful of Ruby-centric examples. The "prebuilt ruby github action", did not play nice with the Postgres service. This forced me to fallback to a legacy recipe I found online and tweak it to meet my requirements.

I'm keen to use Github Actions again in future, but not for a Rails project.

<h2 style="margin-bottom:0.5rem;">Infrastructure: CD/CI code-quality with Sonarcloud</h2>

I decided to try something new and go with Sonarcloud over Codeclimate. Codeclimate was born of yester-year, a time where Rails was king. Integration between Rails and Codeclimate is quite trivial. Sonarcloud on the other-hand, is not as well supported.

Sonarcloud has some documentation that is Ruby/Rails centric. But lacks some level of depth when attempting to adopt in your CI. To upload static analysis and coverage results I had to seek out other resources. It left me with the reminder that Ruby isn't in favour these days.

If I was to roll a Rails project again, I would probably opt for Codeclimate again.

<h2 style="margin-bottom:0.5rem;">Infrastructure: Global micro VMs, with Fly.io</h2>

The experience with tooling was quite nice. I was able to generate a dockerfile in minutes, and it took me half a day to deploy something to production. Difficulty came from the fact that the project already used Docker. I had to differentiate  between production and development definitions. But no show stopping issues.

[Fly.io](https://fly.io) has a sensible, free starter tier.  It doesn't need a credit card, which was super important for this project. Unfortunately, there wasn't a "one-click" Heroku style deployment, but that's ok.

<h2 style="margin-bottom:0.5rem;">Things are lost along the way</h2>

Given that I wanted to actually get something merged, I had to make some calls. I decided to make a conscious effort to be comfortable losing a handful of things. Instead of striving for perfection and stifling progress, I opted for delivery. A conscious tradeoff between shipping something than not shipping at all.

*Dropping multi select*
When the project was first written, frontend components weren't a thing. Not only that, but cross browser support for multi selects was pretty poor. "Chosen", a multi-select library written with jQuery, filled in the void. It transformed native multi selects into robust, html form compliant components. Unfortunately, jQuery wasn't in this project anymore.

I had to make a tradeoff between importing jQuery for this one component. Ensuring it worked with Hotwire. Or shipping with native multi select. Native multi select delivers a poor UX. But I opted to write this up as an issue against the repository, instead of trying to resolve the UX and hold up the PR.

The curious thing I learned from this, is that I found it difficult to find a suitable replacement. With no html form compliant components. Most are now written in React without a Vanilla JS component in sight. I found a "stimulus" based solution after merging, which requires further investigation.

*Code Coverage*
At time of writing, the codebase is sitting under 80% coverage. Additionally, it has "3 reliability bugs" flagging the project as not passing. The spec covers an older iteration of the codebase, that I did not write. The codebase did pass manual testing phases confirming that the project works. Not only that, it works in a production like environment.

In recent times I have come to see testing as a means to "confidence" in a codebase. More-so, confidence in code that _you_ have written. I was confident the new codebase was better than the previous iteration. So I opted to avoid improving coverage as it would reduce the likelihood of delivery.

Additionally, a planned re-write of the Tru-skill implementation may make coverage moot.
While it is irking me, it seemed appropriate not to block the merge on main. This opens up the project to further contributions in future. With improving coverage low hanging fruit for anyone that wants to join in.

<h2 style="margin-bottom:0.5rem;">Contributions and the future of the project</h2>

All this doesn't change the fact that [Elovation](https://github.com/elovation/elovation) is quite small. All the old contributors moved on leaving me to my own devices. I get the odd issue posted, but it's still going to be difficult to get contributors moving forward.

I intend to re-write the application as both a client heavy application. This would provide me with a case-study into client-first versus server-first approaches. As well as an understanding of  delivery of the two approaches.

[You can see the Rails rewrite PR here.](https://github.com/elovation/elovation/pull/108)

<h2 style="margin-bottom:0.5rem;">Closing Remarks</h2>

Despite being critical, I would still consider rolling a Ruby/Rails project in future. Rails is still a good solution for startups, with fuzzy requirements. Startups that are prone to changing frequently in the early days. I'm a big fan of reflecting business requirements in a codebase. This is a lot easier to do this as a first cut in Ruby. Not only that, but it is a lost easier to _change that reflection_. This will forever be a trade-off when choosing a typed language over Ruby/Rails.

Hotwire and "server first" ethos is super compelling. I found it simpler to reason about. The re-write has left me optimistic to see what people produce with htmx moving forward. While Hotwire is a more encompassing solution to progressive enhancement than htmx. Htmx has succeeded where Hotwire has failed, as an independent technology. The author refers to htmx as an extension of HTML/HATEOAS. This dodges the fact that it is a Javascript framework/library. This allowed htmx to gain popularity for amongst the Rust and Go community. Whereas Hotwire is stuck with the image of being as a "rails thing".

It's always great to explore different ways of working. I enjoyed re-writing Elovation into Rails 7. I hope I get a chance to re-write it as a Rails 8/9/10 project in the future.
