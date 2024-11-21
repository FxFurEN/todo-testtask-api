import { Router } from 'express'
import { taskController } from '../controllers/taskController'

const router = Router()

router.get('/', taskController.getTasks)
router.post('/', taskController.addTask)
router.put('/:id', taskController.updateTask)
router.put('/status/:id', taskController.updateTaskStatus)
router.delete('/:id', taskController.deleteTask)

export default router
