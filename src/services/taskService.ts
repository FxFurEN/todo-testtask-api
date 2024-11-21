import mongoose from 'mongoose'
import TaskModel from '../models/taskModel'
import type { ITask } from '../types/task.types'

export const taskService = {
	getTasks: async (): Promise<ITask[]> => {
		const tasks = await TaskModel.find()
		return tasks.map(task => ({
			...task.toObject(),
			id: task._id.toString(),
		}))
	},

	addTask: async (task: ITask): Promise<ITask> => {
		const newTask = new TaskModel(task)
		const savedTask = await newTask.save()
		return {
			...savedTask.toObject(),
			id: savedTask._id.toString(),
		}
	},

	updateTask: async (
		id: string,
		updatedData: Partial<ITask>
	): Promise<ITask | null> => {
		const updatedTask = await TaskModel.findByIdAndUpdate(id, updatedData, {
			new: true,
		})
		if (updatedTask) {
			return {
				...updatedTask.toObject(),
				id: updatedTask._id.toString(),
			}
		}
		return null
	},

	updateTaskStatus: async (
		id: string,
		completed: boolean
	): Promise<ITask | null> => {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new Error('Invalid ID format')
		}

		const updatedTask = await TaskModel.findByIdAndUpdate(
			id,
			{ completed },
			{ new: true }
		)
		if (updatedTask) {
			return {
				...updatedTask.toObject(),
				id: updatedTask._id.toString(),
			}
		}
		return null
	},

	deleteTask: async (id: string): Promise<boolean> => {
		if (!mongoose.Types.ObjectId.isValid(id)) {
			throw new Error('Invalid ID format')
		}

		const objectId = new mongoose.Types.ObjectId(id)
		console.log('ObjectId для удаления:', objectId)

		const result = await TaskModel.findByIdAndDelete(objectId)

		if (!result) {
			throw new Error('Задача не найдена')
		}

		return result !== null
	},
}
