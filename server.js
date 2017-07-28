const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !=='production'
const app = next({dev})
const handle = app.getRequestHandler()

app.prepare().then(() => {
	const server = express()

	server.get('/p/:id',(req,res) => {
		console.log('/p/:id');
		const actualPage = '/post'
		const queryParams ={
			id: req.params.id
		}
		app.render(req,res,actualPage,queryParams)
	})

	server.get('*',(req,res) => {
		console.log('*');
		return handle(req,res)
	})

	server.listen(3000,(err) => {
		if (err) {
			throw err
		} else {
			console.log('> Ready on http://localhost:3000');
		}
	}).catch((err) => {
		console.log(err.stack);
		process.exit(1)
	})
})