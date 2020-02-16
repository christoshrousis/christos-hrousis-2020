---
title: How to communicate with an iframe using React hooks.
date: "2020-02-16T23:40:03.284Z"
---

Sometimes you need to isolate some Javascript and CSS within your webpage. A great way to achieve this is through the use of iframes. Now, there is a few rare cases where you might need to achieve this within a React app, such as when you need to render HTML to a page. After a bit of googling, I realised that there was no real up to date explanation of how to achieve this using hooks. So let's bring things up to date a little put together a simple example of communication between React component and a rendered iframe.

First, let's start with a garden variety component, that has an iframe inside it.

```javascript
const Render = () => {
  return (
    <div>
      <iframe
        srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
          </head>
          <body>
            <h1>Content inside an iframe, who knew...</h1>
          </body>
        </html>
      `}
      />
    </div>
  )
}
```

Great! Step one, send a message from inside the iframe, up to the parent window, which will actually where our React app lives:

```javascript
...
 return (
    <div>
      <iframe srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            window.top.postMessage(
              JSON.stringify({
                error: false,
                message: "Hello World"
              }),
              '*'
            );
          </head>
          <body>
            <h1>Content inside an iframe, who knew...</h1>
          </body>
        </html>
      `} />
    </div>
  )
...
```

Ok, that's it? [Yup!](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage) Alrighty then, sweet! So all that's really left to do now is actually listen out for the message. We do this with a window listener. It's probably best to attach and detach this event, so we'll use `useEffect` with an empty array return. Our code ends up looking a little like this:

```javascript
const Render = () => {
  useEffect(() => {
    const handler = event => {
      const data = JSON.parse(event.data)
      console.log("Hello World?", data)
    }

    window.addEventListener("message", handler)

    // clean up
    return () => window.removeEventListener("message", handler)
  }, []) // empty array => run only once

  return (
    <div>
      <iframe
        srcDoc={`
        <!DOCTYPE html>
        <html>
          <head>
            window.top.postMessage(
              JSON.stringify({
                error: false,
                message: "Hello World"
              }),
              '*'
            );
          </head>
          <body>
            <h1>Content inside an iframe, who knew...</h1>
          </body>
        </html>
      `}
      />
    </div>
  )
}
```

And that's all there is to it! Modern browsers, and React Hooks make it dead easy to communicate between the windows, and if you want to get really tricky, maybe you can render another React app inside the iframe....
