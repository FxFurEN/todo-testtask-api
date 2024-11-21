import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'
import { config } from './config'
import taskRoutes from './routes/taskRoutes'

const app = express()
const port = config.port
mongoose
	.connect(config.mongoURI)
	.then(() => {
		console.log('Подключение к MongoDB успешно')
	})
	.catch(err => {
		console.error('Ошибка подключения к MongoDB', err)
		process.exit(1)
	})

app.use(cors())
app.use(bodyParser.json())

app.use('/api/tasks', taskRoutes)

app.listen(port, () => {
	console.log(`Сервер работает на http://localhost:${port}`)
})
