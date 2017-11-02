const express = require('express')
const next = require('next')
const subdomain = require('wildcard-subdomains');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = dev ? 3000 : 80;

app.prepare().then(() => {
  const server = express();
  
  server.use(subdomain({namespace: 'u', whitelist: ['www'] }));  

  server.get('/u/:userID', (req, res) => {
    const actualPage = '/user'
    const queryParams = { userID: req.params.userID } 
    app.render(req, res, actualPage, queryParams)
  })
  
  server.get('/p/:pageID/:userID', (req, res) => {
    const actualPage = '/page'
    const queryParams = {                           
                          pageID: req.params.pageID, 
                          userID: req.params.userID
                        } 
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:' + port)
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})


