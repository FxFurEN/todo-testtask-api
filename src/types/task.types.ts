export interface Task {
	id: string
	title: string
	description: string
	completed: boolean
}

export interface ITask extends Document {
	title: string
	description: string
	completed: boolean
}
