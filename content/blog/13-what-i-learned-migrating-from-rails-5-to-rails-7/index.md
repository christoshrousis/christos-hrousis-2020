---
title: What I learned, migrating from Rails 5 to Rails 7
date: "2023-09-17T01:19:09Z"
description: "What happens when you attempt to rewrite a 12 year old Rails project?"
---

<h2 style="margin-bottom:0.5rem;">Preamble</h2>

Modern web development has been evolving at breakneck speeds. The frontend web community is currently abuzz with React Server Components, NextJS & Bun, but here I am writing a pull request for a Rails project to convert it from Rails 5 to 7.

One standout frontend library/framework/concept that is making waves, is a little project called [htmx](https://htmx.org). A "new" idea that we can decorate our existing html, to enhance our server driven web applications. 

This project, an evolution of [intercoolerjs](https://intercoolerjs.org/docs#philosophy), was reminding me of an almost 3 year old release of a little something called [hotwire](http://hotwired.dev). Hotwire, being an evolution of Turbolinks all the way back to 2012. A very similar, but different approach to the same thing. 

So, given my years of experience working in web applications, and having written a PHP turbolinks project back in 2015, what better way to revisit the new hype of server first web application development, then by attempting to introduce Hotwire to an existing Rails project that was begging for revival.

<h2 style="margin-bottom:0.5rem;">Elovation</h2>

[Elovation](https://github.com/elovation/elovation) is an almost 12 year old Rails project written by Drew Olsen, back when he was working at Braintree Payments. The software is meant to allow for free, quick, simple Elo/Trueskill matchmaking for games of Chess, Ping Pong and Foosball, a staple in some office cultures. Sometime in 2015, I started making very small contributions to the then, mostly dormant project, and asked if I could become a maintainer. I had been using the software at my employer to track Foosball games, and my star-eyed, young optimism figured I could vastly improve the codebase. The project was converted to a organisation, of which I was made administrator, with Drew stepping back. Little did I know, that finding time to improve the project would be difficult, but mustering contributions from random strangers on the internet was _not_ an easy process. 

The project has gone mostly untouched since 2015, with a minor amendment to fix some Heroku deployment issues, and a quick-fix here and there. But given the recent move by [Heroku to remove their free tier](https://help.heroku.com/RSBRUH58/removal-of-heroku-free-product-plans-faq), the "one click" software you once owned, had a price tag. Not only that, but old and tired docker helpers with pointers to servers that no longer exist, made it impossible to run the dockerized version of the application.

So, given the amount of perceived "legacy cruft", that I had no idea whether was relevant or not, and after maybe 2-3 failed re-write attempts, I decided to _nuke_ the entire codebase, start a new Rails 7 project, and naively copy & paste snippets of code until the project was in a working state again.

<h2 style="margin-bottom:0.5rem;">Working with Ruby</h2>

It's been quite a few years since working in Ruby, but not much has changed. It's still a pleasure to write in given it's simplicity. Nothing much has changed, but new Ruby is a lot faster than what it used to be which is nice.

My only gripe, is I still found myself running into ruby versioning issues on my Macbook when trying to run the latest Ruby, and it's 2023.

As someone who has to write lots of different languages, I opted to stick with [ASDF](https://github.com/asdf-vm/asdf-ruby) which was already on my machine for version management. It did not provide the best of experiences, with global tools still picking up my machine ruby version. I'll concede this is partially my fault for not using RVM, but given that I've been able to use ASDF for managing my workflows, it's just sticks out like a sore thumb that of course the Ruby plugin isn't great out of the box and you have to stick to RVM.

So, lesson learned, stick with RVM!

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Rails</h2>

Continuing on from my RVM gripe, a reflection on working with "stable" tooling, is that the landscape hasn't changed much, and it doesn't really keep up with new tooling that is outside of the ruby ecosystem. There is the Ruby/Rails way, and that's pretty much it. There is small pockets of highly skilled and talented Ruby engineers who have carved out respectable niches, but highly specialising in a non-rails framework may leave you struggling to find work in the current marketplace which is hard enough to land a ruby job already. 

Something I am forgetting, and maybe others too, is that "Rails is omakase". I'm not sure whether this 2012 ethos still rings true, as I try to stay out of ruby community politics, but for the most part Rails comes with a nice sensible set of tools for unit testing, and now comes with automated e2e testing with selenium but also has some adapters if you don't want ot use selenium. I was still able to rip out minitest, and replace it with rspec. The only oddity I encountered in this respect, is that googling what the latest approach to what good Rails development looks like was slightly difficult. It's unclear whether Rails is so mature now that rolling vanilla Rails is really the way to go, or whether this is marketing, and the lack of other approaches are drowned out and difficult to find. I'll concede the communities I subscribe to are heavily Javascript/Typescript focused, but community fragmentation from years gone by still feels like it hangs around in the air with DHH still forging his own path for the Rails community, and a vocal community outside that it's hard to know what to follow.

A lot of Rails configuration and compatibility gripes from years gone by is no longer really a problem. Rails just seemed to work and play nicely both on my machine and with Docker, and I didn't really run into any major problems which was quite nice.

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Hotwire</h2>

Online examples make it appear easy to implement, and for the most part it was. It's nice to write a template, treat it as an endpoint, and be able to fetch it to replace a node in the dom. 

There appears to be a little pressure via documentation to adopt Progressive Enhancement, which is totally appropriate, but given the nature of the project, I opted to avoid over complicating the re-write and focus on improving the UX overall and assuming that the users will have javascript fully enabled.

This was interesting in that it locks you into having to consider how your application behaves in slow internet environments, and ones without javascript as 1-2% of web users have javascript disabled at no fault of their own. This is great for larger projects that will have a meaningful number of users without Javascript, but it does add some overhead to the way your write your application. It also locks you into writing your application as "crud-like" and exploring UX patterns you may find in Javascript based frameworks (like re-creating islands), is not only difficult to conceive but also difficult to accommodate. Not that any Javascript framework has a real good solution for this, outside maybe Remix. The crux of what I'm trying to get to here, is that despite server-first proponents touting that front-end engineering has become complexity engineering, it doesn't mean that server-first web applications aren't with their drawbacks.

There is one oddity with working in Hotwire. Official documentation is independent of Rails, but Hotwire has failed to drop this image. This also means that when you're writing Rails Hotwire, official documentation is confusingly not Rails-centric, and you have to seek out independent documentation or be very comfortable with your understanding of how server-first web applications work in general.

It was also a bit confusing as to "how much Hotwire do I have to do". You opt into turbo frames, but why bother when turbolinks as a fallback is there? When do you use turbo streams and action cable? With that and the above documentation issue, it can be daunting and I would expect newcomers to find it quite jarring.

I don't mean this to be a full blown anti-Hotwire rant, but more just something to consider. It was actually quite nice to write this way, and if you forego the 2% of non-javascript users, you can actually write something a _lot_ faster than a client heavy React project. I'm sure that with a few more example projects I could start getting a rhythm together and write some really strong Hotwire applications that support all users, but it does require an investment in learning if you plan to give it a shot.

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Stimulus JS</h2>

Rails ships with [Stimulus](https://stimulus.hotwired.dev), as part of "Hotwire". Stimulus is made to augment existing html to enrich UX with sprinkles of JS, instead of rewrite slabs of html ins javascript.

Much like the htmx ethos, this makes sense on the surface. Retain the existing server generated template you have already pulled together, and sprinkle a small amount of stimulus over the top to improve the user experience. A [small snippet on Stimulus](https://github.com/elovation/elovation/blob/main/app/javascript/controllers/game_controller.js) as part of the rewrite was trivial to write, and truly resulted in less lines of code for some enhanced flavour to the application.

But I couldn't shake this feeling, which I also had when writing my Turbolinks project in PHP. While Hotwire/Stimulus is written and marketed in such a way that it's independent of the Rails ecosystem, it is anything but. Googling solutions to your problems will leave you disheartened, with such a (comparatively) small community behind these ideas, finding online solutions to them is difficult, and you are mostly on your own to work it out. Doubly so if you're not writing a Rails project and trying to write in another language.

Trying to resolve a deficiency in the project, that it's currently missing a good multi-select User Experience for selecting teams, currently requires a ground up design, and thoughtful approach, which was then to be followed up by custom stimulus code to match. There isn't a plethora of "stimulus" examples out there that have already solved your problem - this is one of the successes of the Javascript (React) community, you can always find _multiple_ solutions to the problem you are facing and refactor to match your requirements.

Do I try write my own stimulus component? Do I try retrofit a Web Component based solution? Why is there no vanilla solutions anymore? Why can't I find a solution which works with a semantically accurate <form>? 

Googling a solution to the multi-select problem results in a number of React centric answers, a mark against the current landscape of web development we have. One which now screams at newcomers that React is the default answer. But I digress, I mean not to make a stance of what is right or wrong for the future of web development, but just a remark on how I see the current state of the web.

Overall, it was actually nice to write Stimulus in Rails, because everything just sort of automatically hooked up, no need to target anything, it just all sort of worked, which is a testament to the work the team has put into Stimulus to get it working.

<h2 style="margin-bottom:0.5rem;">Working with Ruby: Rubocop Static Analysis</h2>

I adopted Rubocop with Static Analysis, which was in it's infancy when I first used it, but is not much more mature and sensible looking. Adoption was trivial, and it even came with a nice "todo" feature that allowed me to table all the current violations in the codebase as "todos" that wouldn't block the pipeline. Would use again.

<h2 style="margin-bottom:0.5rem;">Infrastructure: CD/CI with Github Actions</h2>

It's 2023, and Github actions has well matured! Plenty of free capacity for open source projects of this size, and quite a few examples out there. I've previously had a good run with Circle CI, but given the simplicity of requirements and the perceived simplicity of Github Actions, it seemed like a good fit.

Github Actions supports running a Postgres service, which is important for a server-first web application. This allowed me to run the rspec test suite in the cloud with it's test database without having to pay a dime.

The only issue, was that not many people out there appeared to be using github actions with a rails project. So I had to pull together a handful of ruby based examples, and using the "prebuilt ruby github action" (similar to a CircleCI orb), did not play nice with the postgres container service. I had to fallback to a legacy recipe I found online and tweak it to meet my requirements.

<h2 style="margin-bottom:0.5rem;">Infrastructure: CD/CI code-quality with Sonarcloud</h2>

Codeclimate was previously used in the project, but I decided to try something new and go with Sonarcloud. Codeclimate was born of yesteryear, and was born of a time where Rails was king, so integration was quite trivial. Sonarcloud on the otherhand, is not as well supported.

Sonarcloud has some documentation that is Ruby/Rails centric, but it leaves a little to be desired. To upload static analysis and coverage results I had to seek out some non-sonarcloud documentation to see how to make sure it's setup correctly. This left a little to be desired, but it left me me with the reminder that Ruby isn't in favour, like Javascript/Typescript.

If I was to roll a Rails project again, I would probably opt for Codeclimate again.

<h2 style="margin-bottom:0.5rem;">Infrastructure: Global micro VMs, with Fly.io</h2>

Overall the experience with tooling was quite nice. I was able to generate a dockerfile in minutes, and it took me maybe half a day to deploy something to production. Most of the difficulty came from the fact that the project already used Docker, so some differentiation had to be made between production docker definitions and the development ones, but no show stoppers.

[Fly.io](https://fly.io) also has a sensible, free starter tier, that doesn't require a credit card, which was super important for this project. Unfortunately, there wasn't a "one-click" deployment equivalent to Heroku, but that's ok.

<h2 style="margin-bottom:0.5rem;">Things are lost along the way</h2>

Given that I wanted to actually get something merged, and make some progress in the project, I had to make the call to sacrifice a handful of things I normally wouldn't. I decided to make a conscious effort to be comfortable losing a handful of things instead of striving for perfection and stifling progress. I shouldn't see this as reflecting poorly on myself, or my professionalism, but as a tradeoff between shipping something that's better, or not shipping at all.

*Dropping multi select*
When the project was first written, frontend components weren't really a thing. Not only that, but cross browser support for multi selects was pretty poor. There was a library used called "chosen", which transformed the multiselect into a robust, html form compliant component compatible with Rails projects. Unfortunately, it required jQuery, and jQuery wasn't in this project anymore.

I had to make a tradeoff between importing jQuery just for this one component (and making it work with Hotwire without breaking), or shipping with native multi-select. Native multi-select delivers a poor UX, but it is much easier to write this up as an issue against the repository, instead of trying to resolve the UX and hold up the PR.

The curious thing I learned from this, is that I found it difficult to find a suitable replacement. With no html form compliant multi select components, most are now written in React without a Vanilla JS component in sight.

*Code Coverage*
At time of writing, the codebase is poorly covered. Sitting under 80%, and having "3 reliability bugs" flagging the project as not passing. UThe spec covers an older iteration of the codebase, that I did not write. The codebase also passed a number of manual testing phases confirming that the project works. Not only that, it works in a production like environment. In recent times I have come to see testing as a means to "confidence" in a codebase, and given that I have confidence that the project is working to a better standard than what was previously there, reaching for full test coverage does not seem appropriate. While it is irking me, and I'm not comfortable with it, it wouldn't seem appropriate to hold up the merge of the rewrite on main on this fact alone.

<h2 style="margin-bottom:0.5rem;">Contributions and the future of the project</h2>

All this doesn't change the fact that [Elovation](https://github.com/elovation/elovation) is quite small, with all the old contributors moving on leaving me to my own devices. I get the odd issue posted, but it's still going to be difficult to get contributors moving forward.

I intend to re-write the application as both a client heavy application, and a htmx first go project as a case-study in what the fastest way to get to production looks like.

[You can see the Rails rewrite PR here.](https://github.com/elovation/elovation/pull/108)

<h2 style="margin-bottom:0.5rem;">Closing Remarks</h2>

Despite the critical writing, I would still consider rolling a Ruby/Rails project in future. Rails is still a good solution for startups where requirements are fuzzy and prone to changing a lot in the early days. I'm a big fan of reflecting business requirements in your codebase, and it is a lot easier to do this as a first cut in Ruby, but _also to change the reflection_ quickly - this will forever be a trade-off when choosing a typed language over Ruby/Rails.

Hotwire and "server first" ethos is super compelling. I really found it simpler to reason about, and the re-write has left me optimistic to see what people produce with htmx moving forward. While Hotwire is a more encompassing solution to progressive enhancement, htmx has succeeded where Hotwire has failed in marketing itself as being independent on a technology. The author continuously refers to it as an extension of HTML/HATEOAS and dodges the fact that it is technically a Javascript framework/library. This has allowed it to gain popularity for those who have written templated web applications in Rust and Go - whereas Hotwire is stuck with the image of being as mostly a "rails thing".

It's always great to explore different ways of working, and I enjoyed re-writing Elovation into Rails 7. I hope I get a chance to re-write it as aRails 8/9/10 project in the future.
