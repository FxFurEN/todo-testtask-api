import type { Request, Response } from 'express'
import { taskService } from '../services/taskService'

export const taskController = {
	getTasks: async (req: Request, res: Response) => {
		try {
			const tasks = await taskService.getTasks()
			res.json(tasks)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при получении задач' })
		}
	},

	addTask: async (req: Request, res: Response) => {
		try {
			const newTask = await taskService.addTask(req.body)
			res.status(201).json(newTask)
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при добавлении задачи' })
		}
	},

	updateTask: async (req: Request, res: Response) => {
		try {
			const updatedTask = await taskService.updateTask(req.params.id, req.body)
			if (updatedTask) {
				res.json(updatedTask)
			} else {
				res.status(404).json({ message: 'Задача не найдена' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при обновлении задачи' })
		}
	},

	updateTaskStatus: async (req: Request, res: Response) => {
		try {
			const { completed } = req.body
			const updatedTask = await taskService.updateTaskStatus(
				req.params.id,
				completed
			)

			if (updatedTask) {
				res.json(updatedTask)
			} else {
				res.status(404).json({ message: 'Задача не найдена' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при обновлении статуса задачи' })
		}
	},

	deleteTask: async (req: Request, res: Response) => {
		try {
			const deleted = await taskService.deleteTask(req.params.id)
			if (deleted) {
				res.status(204).send()
			} else {
				res.status(404).json({ message: 'Задача не найдена' })
			}
		} catch (error) {
			res.status(500).json({ message: 'Ошибка при удалении задачи' })
		}
	},
}
