---
title: Real world REM usage in a PX world.
date: "2021-05-11T13:27:01.111Z"
description: "An approach to using REMs (Root Ems) when everything in handover is in Pixels."
---

Hereforth is a primer to getting started with REM units in CSS. That is REMs, not to be confused with EM units, a different Relative Length Unit in the world of CSS. Typically, when working with those who haven't used them bore, the confusion usually lies in the over complication of thier application, or a simple misunderstanding of what the actual difference is between a REM and EM, and when to use each. 

When working solo, or demonstrating thier usage to those that haven't used them before, I like to simplify thier application by using just the REM unit to start. To understand why, the REM unit is defined, as "The Root Element's font-size". Or alternatively, the font-size relative to the highest most element in your document. The root element is typically denoted via "html" or ":root" pseudo selector in CSS.

Take the following css snippet:

```css
:root {
  font-size: 16px;
}
h1 {
  font-size: 2rem;
}
p {
  font-size: 1rem;
}
```

`1rem` is the equivalent to `16px * 1 = 16px`, and `2rem` is equivalent to `16px * 2 = 32px`

With the above method, we can use any pixel value from figma, photoshop et al. then convert them to a REM value for use in our document. This process does introduce an additional step in the development workflow though. you can use online services / calculators to perform the calculations for you, but you will still have introduced one additonal step to your workflow.

If possible, I like to introduce SCSS/SASS, or PostCSS, to perform the conversions for me. PostCSS has some plugins that allow you to parse an entire CSS document, and convert every single PX that it runs across to REM. This can be handy when you want to write in pure CSS pixels, and let PostCSS do the conversions for you.

When using SCSS/SASS, I like to take the cahnce to have a little bit more fine grain control, I introduce a function that I wrap my values in, that converts the units to REM for me. This is handy because I don't have to think about the conversion, I still need to introduce the idea that I need to call the function everytime I write a unit, but I get some addotional fine grain control which I really find useful.

Here is my function in it's entirety. Take a moment to read exactly what the function does, and you should come to the conclusion that the output CSS of this SCSS, is similar to that of the above CSS snippet.

```scss
:root {
  font-size: 100%;
}

$browser-context: 16;
@function rem($pixels, $context: $browser-context) {
  @if unitless($pixels) {
    $pixels: $pixels * 1px;
  }

  @if unitless($context) {
    $context: $context * 1px;
  }

  @return $pixels / $context * 1rem;
}

h1 {
  font-size: rem(32);
}
p {
  font-size: rem(16);
}
```

You may have noticed that I introduced a relative unit on the root element in the above CSS snippet. In the above case, 100%, which is the browser default, is equivalent to 16px. This allows the user to set a predefined font-size, or zoom level, without our CSS overriding that setting. You can learn more about why we should care about this in the post [Pixels vs. Relative Units in CSS: why it’s still a big deal - by Kathleen McMahon](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/)

In addition to the above, you can add one small addition to help you canvas and stretch our a design reference across multiple viewports. When working with a designer, I like to negotiate shrinking down the design to fit on landscape tablet devices, this gives landscape tablet users typically a more first class experience.

You can achieve the scaling, by using standard media queries to target different viewport widths like so:

```css
:root {
  font-size: 75%;
}

@media (min-width: 1200px) {
  :root {
    font-size: 100%;
  }
}
```

Combining the use of the function, and using a relative root unit that responds to media queries, I find that I can quickly develop a fluidly responsive website, that provides a high quality experience to the most used viewports on the web.

For more information and further reading on this topic, I highly recommend the following:

**References**
<br/>
[https://every-layout.dev/rudiments/units/](https://every-layout.dev/rudiments/units/)<br/>
[https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773](https://medium.com/@vamptvo/pixels-vs-ems-users-do-change-font-size-5cfb20831773)
<br/>
[https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/)

**Further Reading**
<br/>
[https://css-tricks.com/snippets/css/fluid-typography/](https://css-tricks.com/snippets/css/fluid-typography/)
<br/>
[https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/](https://css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport/)

**Resources**
<br/>
[https://type-scale.com/](https://type-scale.com/)
<br/>
[https://seek-oss.github.io/capsize/](https://seek-oss.github.io/capsize/)
<br/>
[https://github.com/cuth/postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)