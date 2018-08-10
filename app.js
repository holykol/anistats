const express = require('express')
const { check, validationResult } = require('express-validator/check')
const rp = require('request-promise-native')

const app = express()

const low = require('lowdb')
const bodyParser = require("body-parser")

require('dotenv').config()

// Уберем самопиар
app.disable('x-powered-by')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


// CORs
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})




// Настраиваем БД
const db = low('db.json')
db._.mixin(require('lodash-id'))


// Настройки по-умолчанию
db.defaults({watched: []}).write()

/* === AUTH === */
const middlewares = [
	// username must be an email
	check('username').isEmail(),
	// password must be at least 1 chars long
	check('password').isLength({ min: 1 })
]




app.post('/auth/register', middlewares, async function(req, res) {
	try {
		const errors = validationResult(req);
	  	if (!errors.isEmpty()) {
	   	return res.status(422).json({ errors: errors.array() });
	  	}

	  	const options = {
	  		method: 'POST',
	  		uri: `https://auth.simperium.com/1/${process.env.SIMPERIUM_APP_ID}/create/`,
	  		headers: {
	  		  	'X-Simperium-API-Key': process.env.SIMPERIUM_API_KEY,
	  		},
	  		body: req.body,
	  		json: true
	  	};

		const r = await rp(options)
		res.json(r)
	}
	catch(e) {
		res.status(400)
		res.json({error: e.message})
	}
})

app.post('/auth/login', middlewares, async function(req, res) {
	try {
			const errors = validationResult(req);
		  	if (!errors.isEmpty()) {
		   	return res.status(422).json({ errors: errors.array() });
		  	}

		  	const options = {
		  		method: 'POST',
		  		uri: `https://auth.simperium.com/1/${process.env.SIMPERIUM_APP_ID}/authorize/`,
		  		headers: {
		  		  	'X-Simperium-API-Key': process.env.SIMPERIUM_API_KEY,
		  		},
		  		body: req.body,
		  		json: true
		  	};

		  	const r = await rp(options)
			res.json(r)
		}
		catch(e) {
			res.status(400)

			res.json({error: e.message})
		}
})


// app.get('/auth/update_password', function(req, res) {
// 	res.json(db.get('watched').value())
// })





/* === POST === */
app.post('/' , function(req, res) {
	const id = db.get('watched').insert({
		title: 		req.body.title || "No title",
		url:  		req.body.url || "",
		episodes: 	Number(req.body.episodes) || 1 
	}).write().id

	res.json({
		success: true, 
		id: id
	})
})


/* === GET === */
app.get('/', function(req, res) {
	res.json(db.get('watched').value())
})

app.get('/id/:id', function(req, res) {
	res.json(db.getById(req.params.id).value())
})




/* === PUT === */
app.put('/:id', function(req, res) {
	if (req.body.episodes) {
		req.body.episodes = Number(req.body.episodes)
	}
	
	db.get('watched')
		.updateById(req.params.id, req.body)
  		.write()

  	res.json({success: true})
})

/* === DELETE === */
app.delete('/:id', function(req, res) {
	db.get('watched')
		.removeById(req.params.id)
  		.write()

  	res.json({success: true})
})



// Начинаем слушать
app.listen(8081, function() {
	console.log("Magic happens on port 8081")
})