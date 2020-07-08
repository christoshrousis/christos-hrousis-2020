---
title: Write dumb tests, a visual testing primer for any web developer.
date: "2020-06-04T09:15:03.284Z"
description: An alternative method to running snapshot and screenshot testing, while you're a beginner.
---

[![Cypress Logo](./cypress-bw.png)](https://docs.cypress.io/guides/overview/why-cypress.html#In-a-nutshell)

Recently during a discussion with a colleague, I found myself saying something I've said a few times before - _"Unfortunately my company doesn't have a culture of testing so I don't get to test much."_ - An all too common story I've heard many a developer say in one way or another. There's always an excuse; tests are too hard; my boss doesn't think it's worth it; they take up way to much time; I don't understand how to start Test Driven Development; some people say write integration tests, some say write unit tests, what do I do?

Typically the barrier to entry is the perceived cult of testing that acronyms like TDD drum up, and the "doing things the right way" trap. No matter what the topic in development is, listening to "experts" bicker can paralyze you into inaction. Test Driven Development is great, but you'll never start developing the TDD habit if you don't know how to write a test or two; only then can you make a judgement call and formulate an opinion on if you should subscribe to the idea. The answer to writing those tests, and kickstarting your testing habit? **write dumb tests**. 

For a visual developer like myself, unit testing with jest has been a bit of a miss - not to mention it can be irrelevant when you're trying to match a website to design. Unit testing for web development can be even harder when you haven't started cultivating a personal library of utils you've developed, or your sites don't justify more than a sprinkling of a little jQuery. That's where Cypress and basic visual testing come into the picture.

The great thing about Cypress is that install is as dead simple as `npm i cypress` and you're ready to go. The only pre-requisite is an understanding of basic javascript and an interest in learning. One more thing, it doesn't matter what you're running, from Rails, React or a Static site you can get started, and your superpower to starting your testing career is keeping it dumb till you ramp up your skills.

Your first test? Why not make sure that the test runner can visit some pages you've set up? Dead simple. After you've run an npm install, type `cypress open` to kick open the test runner. The first run will generate some example tests for you at `/cypress/integration/examples`. You can keep these as a reference, but google and cypress docs can also get you going to. Create a new file here `/cypress/integrations/get-started.spec.js`, and get your test on.

This is a gatsby site, so when I start it, it runs at `http://localhost:8000/`, and I have a page at `/projects`. So I just want the test to try to load those routes. You might express that like so:

```javascript
describe('Some basic tests.', () => {
    it('Has has some pages.', () => {
        cy.visit('http://localhost:8000/')
        cy.visit('http://localhost:8000/projects')
    })
})
```

That's it, nothing too complex. `cy.visit` is just as it reads, the test runner attempts to visit those routes, and either succeeds or doesn't. That's all you need to get started, and you don't need to get anything else right. You can take it a step further, and even try to navigate the site by clicking on the navigation, and seeing if it loads the page.


```javascript
describe('Some basic tests.', () => {
    it('Has has some pages.', () => {
        cy.visit('http://localhost:8000/')
        cy.visit('http://localhost:8000/projects')
    })

    it('Can navigate to the homepage from the projects page.', () => {
        // Go to the homepage
        cy.visit('http://localhost:8000/projects')
        // Click the first link in the footer
        cy.get('footer a:first').click()
        // Check the location
        cy.location().should((location) => {
            // The URL should be equivalent to the homepage.
            expect(location.href).to.eq('http://localhost:8000/')
        })
    })
})
```

So where to from here though? Don't try to over improve the tests too quickly, try to work on the habit instead. For example, you might be tempted to abstract out the localhost, so that you don't have to keep writing it, or maybe so you can employ some CI - but this is an easy distraction and is akin to busy work as it's not furthering your work at this time. You have some passing tests, and it's time to move on to your next bit of work so that your boss doesn't catch on to the fact that you're writing tests. 

So, you either get issued a new bug from your boss, or you move onto building out a new type of button. Instead of piss farting around trying to work out "how do I do some TDD" and trying to work out "how do I write a test" - Start building out the feature, or fixing that bug, but make sure that you announce to yourself in your head what you're doing and be prepared to recall it later or write it down in plain English as you go.

So you start styling the border colour of the button, it's a new button with a blue border, not a green one, and you place it on a page at `/new-page`. You keep refreshing the page, scrolling down the page to where it's at, and tweaking it till you get it right and you're happy with it. Once you're done, you commit your code locally... But you're not done, write a follow-up test of the actions you where performing. So on `/new-page`, I kept expecting to see the button on the page, and I expected the button to have a class of `green-type`, giving a green border.

```javascript
describe('Some basic tests.', () => {
    it('It should have a green button', () => {
        // Go to the new page where the button is
        cy.visit('http://localhost:8000/new-page')
        
        // Check to see the button exists on the page.
        cy.get('.green-type').should('exist')
        
        // It should give it some color of green
        cy.get('.green-type').('have.css', 'color', 'rgb(0,255,0)')
    })
})
```

The point where it clicked for me, is when I realised you're trying to "automate away" the things you're already doing. You'll also notice that the function names and tests can be very conversational. (thanks to Cypress adopting Moacha's "Behaviour Driven Development" syntax). That's why, as you work, you record what you're working on, and you'll notice you can translate it effectively into a working test. Over time, as you write more and more tests, you'll start to get a rhythm going, and you'll notice three things happen. First, you will pick up one or two things while testing that you didn't pick up from poking around yourself. Second, you will notice that you're relying less and less on your browser window, and more and more on the cypress test runner browser. finally, you may even start thinking in the format of the tests ahead of time and BOOM, you now know how to start TDD, because it starts coming a bit more naturally. Now the puzzle pieces have fallen into place, and you've overcome that initial barrier to testing that you had before and you realise there was no excuse for you to have not been testing this entire time.

The "Visual" part of this, is that you're testing for exact css features. This can get a bit tedious as you go along - so you'll want to start ramping up your visual testing skills. You can simplify your Visual Testing by using "Snapshot/Screenshot" testing. I won't be covering that just yet, but if you want to dive in and get started on it yourself, [have a read of the Cypress documentation on it.](https://docs.cypress.io/guides/tooling/visual-testing.html#Functional-vs-visual-testing)

So get out there, write some _dumb tests_, and you'll stand out of the crowd during your next job interview.

**Final Bonus Tip:** When you start getting to a handful of tests, things start to get a little slow. To speed things up, start splitting your tests up into multiple files, and use `it.only('My test', () => {})` to run just the test you're working on.
