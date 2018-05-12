function history(opt) {
  let iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.visibility = 'hidden'
  document.body.appendChild(iframe)
  iframe.src = 'about:blank'

  window.history_locker = {};
  let lock_key = 'lock-' + (+new Date())
  function doPushHistory(hash) {
    if(!hash || history_locker[lock_key]) {
      history_locker[lock_key] = false
      return
    }

    try {
      let doc = iframe.contentWindow.document
      doc.write(`
        <head>
          <title>${document.title}</title>
          <script>
            parent.history_locker['${lock_key}'] = true;
            parent.location.hash = decodeURIComponent(
              encodeURIComponent('${hash}')
            );            
          </script>
        </head>
        <body></body>
      `)
      doc.close()
      history_locker[lock_key] = false
    } catch(err) {
      console.error(err)
    }
  }

  return function(context, next) {
    console.log('history middleware dispatched')
    
    doPushHistory(context.request.hash)
    next()
  }
}

export default history