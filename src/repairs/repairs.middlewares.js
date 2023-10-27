import { RepairService } from "./repairs.service.js"


const repairService = new RepairService()

export const validateExistRepairs = async(req, res, next) => {
    const {id} = req.params

    const repair = await repairService.findOneRepair(id)

    if(!repair) {
        return res.status(401).json({
            status: 'error',
            message: 'Register not found'
        })
    }

    req.repair = repair
    next()
}