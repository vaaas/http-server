'use strict'
const http = require('http')
const https = require('https')
const serve = require('serve')

module.exports = ({ router, port=80, host='0.0.0.0', key=null, cert=null }) => {
	const server = (key && cert) ?
		https.createServer({ key, cert }, handler(router)) :
		http.createServer(handler(router))
	server.listen(port, host)
	return server
}

const handler = router => (request, socket) => {
	router(request)
	.catch(e => ({ status: 500, mimetype: 'text/plain', data: e.message, headers: [] }))
	.then(serve(socket))
}
