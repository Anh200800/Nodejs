import { reject } from "bcrypt/promises";
import db from "../models/index";
let getToDoctorHome = (limitInput) => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = await db.user.findAll({
                limit: limitInput,
                where: {roleId: 'R2'},
                order: [['createdAt', 'DESC']],
                attibutes: {
                    exclude: ['password']
                },
                include: [
                    {modal: db.Allcode, as: 'positionData', attributes: ['valueEn','valuenVi']},
                    {modal: db.Allcode, as: 'genderData', attributes: ['valueEn','valuenVi']},

                ],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    getToDoctorHome: getToDoctorHome
}