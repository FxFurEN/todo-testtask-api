import mongoose, { Schema } from 'mongoose'
import type { ITask } from '../types/task.types'

const taskSchema = new Schema<ITask>({
	title: { type: String, required: true },
	description: { type: String, required: true },
	completed: { type: Boolean, default: false },
})

const TaskModel = mongoose.model<ITask>('Task', taskSchema)

export default TaskModel
