function history (opt) {
  let iframe = document.createElement('iframe')
  iframe.style.position = 'absolute'
  iframe.style.visibility = 'hidden'
  document.body.appendChild(iframe)
  iframe.src = 'about:blank'

  window.historyLocker = {}
  let lockKey = 'lock-' + (+new Date())
  function doPushHistory (hash) {
    if (!hash || window.historyLocker[lockKey]) {
      window.historyLocker[lockKey] = false
      return
    }

    try {
      let doc = iframe.contentWindow.document
      doc.write(`
        <head>
          <title>${document.title}</title>
          <script>
            parent.historyLocker['${lockKey}'] = true;
            parent.location.hash = decodeURIComponent(
              encodeURIComponent('${hash}')
            );            
          </script>
        </head>
        <body></body>
      `)
      doc.close()
      window.historyLocker[lockKey] = false
    } catch (err) {
      console.error(err)
    }
  }

  return function (context, next) {
    console.log('history middleware dispatched')

    doPushHistory(context.request.hash)
    next()
  }
}

export default history
