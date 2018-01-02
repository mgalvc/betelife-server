var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	 res.header("Access-Control-Allow-Methods", "PATCH, POST, GET, PUT, DELETE, OPTIONS"); 
	 //if ('OPTIONS' === req.method) { return res.send(200); } 
	next();
});

var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
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
		repetente: { type: Boolean, default: false },
		ja_aluno: { type: Boolean, default: false },
		problema_saude: { type: Boolean, default: false },
		problema_saude_qual: String,
		medicamento_usa: { type: Boolean, default: false },
		medicamento_qual: String,
		remedio_febre: String,
		recomendacao_familia: String,
		retorna_sozinho: { type: Boolean, default: false },
		quem_busca: String
	})

	var volunteerSchema = mongoose.Schema({
		nome: String,
		nascimento: Date,
		idade: Number,
		escolaridade: String,
		endereco: String,
		telefone: String,
		whatsapp: String,
		email: String,
		rg: String,
		cpf: String,
		igreja: String,
		pastor: String,
		ministerio: String,
		medicamento_usa: { type: Boolean, default: false },
		medicamento_qual: String,
		medicamento_motivo: String,
		acompanhamento: { type: Boolean, default: false },
		acompanhamento_motivo: String,
		experiencia: { type: Boolean, default: false },
		experiencia_onde: String,
		experiencia_desc: String,
		entendimento: String,
		principios: String,
		submete: { type: Boolean, default: false },
		submete_explica: String,
		nao_faz: String,
		expectativa: String
	})

	var Student = mongoose.model('Student', studentSchema)
	var Volunteer = mongoose.model('Volunteer', volunteerSchema)

	app.get('/students', (req, res) => {
		let query = Student.find()
		query.select('nome telefone mae idade')

		query.exec((err, stds) => {
			if (err) res.send('deu ruim')
			res.json({res: stds})
		})
	})

	app.get('/students/:id', (req, res) => {
		let query = Student.findOne({ '_id': req.params.id })
		query.exec((err, std) => {
			if (err) res.send('deu ruim')
			res.json({res: std})
		})
	})

	app.post('/students', (req, res) => {
		let student = new Student(req.body)
		student.save((err, std) => {
			if (err) res.send('deu ruim')
			res.json({msg: 'saved student into database'})
		})
	})

	app.put('/students', (req, res) => {
		let query = Student.findOneAndUpdate({ '_id': req.body._id }, req.body)
		query.exec((err, done) => {
			if (err) res.send('deu ruim')
			res.json({ msg: 'updated student ' })
		})
	})

	app.delete('/students', (req, res) => {
		console.log(req.query.id)
		query = Student.findByIdAndRemove(req.query.id)
		query.exec((err, done) => {
			if (err) res.send('deu ruim')
			res.json({ msg: 'deleted student' })
		})
	})

	app.get('/volunteers', (req, res) => {
		let query = Volunteer.find()
		query.select('nome telefone idade')

		query.exec((err, vlts) => {
			if (err) res.send('deu ruim')
			res.json({res: vlts})
		})
	})

	app.get('/volunteers/:id', (req, res) => {
		let query = Volunteer.findOne({ '_id': req.params.id })
		query.exec((err, std) => {
			if (err) res.send('deu ruim')
			res.json({res: std})
		})
	})

	app.post('/volunteers', (req, res) => {
		let volunteer = new Volunteer(req.body)
		volunteer.save((err, vlt) => {
			if (err) res.send('deu ruim')
			res.json({msg: 'saved volunteer into database'})
		})
	})

	app.put('/volunteers', (req, res) => {
		let query = Volunteer.findOneAndUpdate({ '_id': req.body._id }, req.body)
		query.exec((err, done) => {
			if (err) res.send('deu ruim')
			res.json({ msg: 'updated student ' })
		})
	})

	app.delete('/volunteers', (req, res) => {
		console.log(req.query.id)
		query = Volunteer.findByIdAndRemove(req.query.id)
		query.exec((err, done) => {
			if (err) res.send('deu ruim')
			res.json({ msg: 'deleted volunteer' })
		})
	})

	app.get('/', (req, res) => {
		console.log('get all students and volunteers')
	})

	app.listen(3000, () => {
		console.log('server listening on port 3000')
	})
})