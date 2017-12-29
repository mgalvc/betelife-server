var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/betelife', { useMongoClient: true })

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
	var studentSchema = mongoose.Schema({
		nome: String,
		nascimento: Date,
		idade: Number,
		tamanho_camisa: String,
		pai: String,
		mae: String,
		telefone: String,
		endereco: String,
		mora_com: String,
		responsavel: String,
		responsavel_rg: String,
		pai_profissao: String,
		mae_profissao: String,
		pai_religiao: String,
		mae_religiao: String,
		escola: String,
		serie: String,
		repetente: Boolean,
		ja_aluno: Boolean,
		problema_saude: Boolean,
		problema_saude_qual: { type: String, default: 'Não possui' },
		medicamento_usa: Boolean,
		medicamento_qual: { type: String, default: 'Não utiliza' },
		remedio_febre: String,
		recomendacao_familia: String,
		retorna_sozinho: Boolean,
		quem_busca: { type: String, default: 'Retorna sozinho' }

	})

	var Student = mongoose.model('Student', studentSchema)

	app.get('/students', (req, res) => {
		res.json({msg: 'get all students'})
	})

	app.get('/students/:id', (req, res) => {
		res.json({msg: 'get student ' + req.params.id})
	})

	app.post('/students', (req, res) => {
		console.log(req.body)
		let student = new Student(req.body)
		student.save((err, std) => {
			if (err) res.send('deu ruim')
			res.json({msg: 'saved student into database'})
		})
	})

	app.put('/students', (req, res) => {
		res.json({msg: 'update student'})
	})

	app.delete('/students', (req, res) => {
		res.json({msg: 'delete student from database'})
	})

	app.get('/volunteers', (req, res) => {
		res.json({msg: 'get all volunteers'})
	})

	app.get('/volunteers/:id', (req, res) => {
		res.json({msg: 'get volunteer ' + req.params.id})
	})

	app.post('/volunteers', (req, res) => {
		res.json({msg: 'save volunteer into database'})
	})

	app.put('/volunteers', (req, res) => {
		res.json({msg: 'update volunteer'})
	})

	app.delete('/volunteers', (req, res) => {
		res.json({msg: 'delete volunteer from database'})
	})

	app.get('/', (req, res) => {
		console.log('get all students and volunteers')
	})

	app.listen(3000, () => {
		console.log('server listening on port 3000')
	})
})