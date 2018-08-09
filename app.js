var express = require('express')

var app = express()


// Уберем самопиар
app.disable('x-powered-by')

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, PATCH, PUT, POST, DELETE")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
	next()
})


var low = require('lowdb')
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Настраиваем БД
var db = low('db.json')
db._.mixin(require('lodash-id'))


// Настройки по-умолчанию
db.defaults({watched: []}).write()


/* === POST === */
app.post('/' , function(req, res) {
	var id = db.get('watched').insert({
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

/* === GET === */
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