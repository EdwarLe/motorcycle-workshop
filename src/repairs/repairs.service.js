import Repair from "./repairs.model.js";


export class RepairService {
    async findAllRepairs() {
        return await Repair.findAll()
    }

    async createRepair(data) {
        return await Repair.create(data)
    }

    async findOneRepair(id) {
        return await Repair.findOne(id)
    }

    async updateRepair(repair, data) {
        return await repair.update(data)
    }

    async deleteRepair(repair) {
        return await repair.update({status: 'cancelled'})
    }
}