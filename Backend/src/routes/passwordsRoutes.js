import { Router } from "express"
import { createUserPassword, updateUserPassword, deleteUserPassword, getUserPasswords, getPasswordDetails } from "../controllers/passwords"

const router = Router()

router.post('/', getUserPasswords)
router.post('/create', createUserPassword)
router.post('/:id', getPasswordDetails)
router.put('/:id', updateUserPassword)
router.delete('/:id', deleteUserPassword)


export default router