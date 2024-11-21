import { taskController } from '../controllers/taskController'
import { taskService } from '../services/taskService'

export const taskModule = {
	controller: taskController,
	service: taskService,
}
