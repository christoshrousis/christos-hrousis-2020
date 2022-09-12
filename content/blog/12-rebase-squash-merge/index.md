---
title: Rebase, squash, merge.
date: "2022-09-12T09:21:01.111Z"
description: "Recently I was asked, why do we have to force push to our remote feature branch, when rebasing on main? I noticed it could be a lesson in git fundamentals."
---

<h2 style="margin-bottom:0.5rem;">Preamble</h2>

Recently while working on a project with a team of 5 engineers, one engineer asked me why it was, that when working on a local feature branch, then when we rebase on main, that they get x commits ahead of their remote feature branch, but y commits behind remote. I knew in my mind, that there was a disconnect between the branches - but the point of frustration was that we had to "force-push", potentially destroying history on the remote feature branch if others had merged on it.

<h2 style="margin-bottom:0.5rem;">Preferred way of working with Git in a team</h2>

Typically, at time of writing this, my preferred way of working in a team of greater than 2 engineers goes as follows:

- Each individual engineer works on their mostly private, individual feature branches.
- Each engineer pushes diligently to their remote branch, ensuring that their work is backed up in case of a [bus](https://en.wikipedia.org/wiki/Bus_factor), and that any Quality gate checks are offloaded as a background task in the  cloud as they continue their work.
- I don't enforce a particular commit style, I typically vote that individuals make their own decision here. I describe the benefits and drawbacks of a single large commit with a well written description, and many small commits, then advise them to try to stick to what they prefer as long as it's consistent, and commit messages are diligent, purposeful and treated seriously. Writing a commit message, is the perfect time to state what, how & why, it re-enforces purpose and learning. I also point out that it's a good practice to follow [conventional commit messages](https://www.conventionalcommits.org/en/v1.0.0/), such as [semantic](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716), or some flavour of [gitmoji](https://gitmoji.dev), [maybe something like this](https://gist.github.com/kdevo/ee396757c0edf256b1633810e5d0f9b8). Why don't I enforce a particular commit style? I believe that this can be a massive point of bike-shed, with minimal return. There is a certain level of cognitive burden and hassle when enforcing people to work in a way and diverge too much from their previous way of working. Commit style becomes muscle memory, and it can be quite expensive to expect everyone to align perfectly, and they arguably never will. It comes down to the individual engineers due diligence and commitment to their craft. Much how we don't expect junior engineers to write "perfect" code, we don't expect engineers to have extremely high standards of commit style.
- When a commit history is written, and the engineer is preparing to merge, I prefer a rebase on remote main. For me, when I think of main, I picture a timeline of the state of main. By rebasing on main, we're saying that we want our commit history to run after everything that is currently on main. Merging main into your remote has always felt like a statement that the feature branch is actually the source of truth for the repository. By encouraging rebase, you're encouraging engineers to think of main as the main source of truth as replicated and shipped to prod.
- When the engineer is ready, they squash merge in remote, with commit history titles written in the PR message. [Default behaviors in github are well explained](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges), and optional settings in [gitlab](https://docs.gitlab.com/ee/user/project/merge_requests/squash_and_merge.html) see ["%{all_commits}"](https://docs.gitlab.com/ee/user/project/merge_requests/commit_templates.html) to create a similar experience. Squashed commits create a more streamlined, clear main git history.

<h2 style="margin-bottom:0.5rem;">Gotchas</h2>

While the above method of rebase, squash & merge works quite well, there is the problem of the force push. 

When you rebase on main, your local and remote feature branch are out of sync. This leads to having to "force push" to your remote feature branch. This can make new and seasoned engineers nervous, and rightly so. If during the rebase, the engineer has "got something wrong", then the force push occurs, they will have wiped any backup record of their work. 

Before the rebase, and force push occur, it's best the engineer does a manual "face-check" of the code to make sure that the force push will not overwrite any code expectantly. Code may exist from other engineers committing and pushing to the feature branch, or even if your team uses the [suggested changes](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/incorporating-feedback-in-your-pull-request#applying-suggested-changes) feature of github.  This can become especially problematic when one engineer rebases and the other doesn't. This highlights how when working on a history, were rebasing is used, communication must align between participating engineers. Ensuring that they have a copy of those commits on their local copy of that history. This is mostly avoided if teams stick to branching, and that there is an obvious "owner" of the branch who is in charge of managing the state of that branch. At most you would only have 2 engineers working on a branch at a time, in the scenario that they are pairing. If you are forming a [mob](https://en.wikipedia.org/wiki/Mob_programming), you typically have one "driving" engineer who still acts as the owner. If you find that you're clashing a lot in this manner, you may need to encourage engineers to branch off of feature branches when they find their work is extending beyond a minor fix. After all, the team is familiar and in the habit of not working on main, so when you're working off someone else's feature branch, it should be treated as another engineer's "main", a place you wouldn't commit directly to.

<h2 style="margin-bottom:0.5rem;">Visualisations</h2>

There are some great visualisations on the git-scm website about [rebasing vs. merging](https://git-scm.com/book/en/v2/Git-Branching-Rebasing).

Github has some great material overall about [resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts).

And I put together an excalidraw, that explains [how rebase, squash merge plays out over time](https://excalidraw.com/#json=cbWrq22fdMdgkOshsffqo,foVBnoYAcehF9DfjAcywKg).

