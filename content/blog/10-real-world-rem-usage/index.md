---
title: Real world REM usage in a PX world.
date: "2021-05-11T13:27:01.111Z"
description: "An approach to using REMs (Root Ems) when everything in handover is in Pixels."
---

Below is a primer to getting started with REMs in CSS. That is REMs, not EM units, a different Relative Length Unit in the world of CSS. For those who haven't used Relative Length Units, the confusion usually lies in their use. Once you learn the actual difference between a REM and EM, thier use becomes a lot clearer.

For those working solo, or those that haven't used them before, I start with the REM unit without EMs. The REM unit is "The Root Element's font-size". Or, the font-size relative to the highest most element in your document. The root element is the "html" or ":root" pseudo selector in CSS.

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

With the above method, we can use any pixel value from figma, photoshop et al. then convert them to a REM value for use in our document. This process does introduce an extra step in the development workflow though. Use of calculators to perform the calculations for you, won't remove this step.

If possible, I like to introduce SCSS/SASS, or PostCSS, to perform the conversions for me. PostCSS has some plugins that allow you to parse an entire CSS document, to convert PX values to REM. This can be handy when you want to write in pure CSS pixels, and let PostCSS do the conversions for you.

When using SCSS/SASS, I like to take the chance to have a little bit more fine grain control. I introduce a function that I wrap my values in, that converts the units to REM for me. This is handy because I don't have to think about the conversion. I may still need to call the function every time I write a unit, but I get some fine grain control in return.
 
Here is my function in its entirety. Take a moment to read and understand what the function does. You should come to the conclusion that the output CSS of this SCSS, is the same as the above CSS snippet.

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

You may have noticed that I introduced a relative unit on the root element in the above CSS snippet. In the above case, 100%, which is the browser default, is 16px. Use of a relative unit on the root element, allows the user to set a predefined font-size, or zoom level. Absolute values otherwise override those user defined settings.  You can learn more about why we should care in the post [Pixels vs. Relative Units in CSS: why it’s still a big deal - by Kathleen McMahon](https://www.24a11y.com/2019/pixels-vs-relative-units-in-css-why-its-still-a-big-deal/)

In addition to the above, you can add one small addition to help you canvas and stretch a design reference across multiple viewports. When working with a designer, I like to negotiate shrinking down the design to fit on landscape tablet devices, this gives landscape tablet users typically a more first class experience.

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

