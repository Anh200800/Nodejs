import bcrypt from 'bcryptjs'
import db from '../models/index';
const salt =  bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise( async(resolve, reject) =>{
        try{
            let hashPassWordFormBcrypt = await hashUserPassWord(data.password);
            await db.User.create({
                email: data.email,
                password: hashPassWordFormBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender:data.gender==='1' ? true :false,
                roleId: data.roleId,            
            })
            resolve('ok')

        }catch(e){
            reject(e)
        }
    })
   
}
let hashUserPassWord = (password) => {
    return new Promise(async(resolve, reject) => {
       try{
        let hashPassWord = await bcrypt.hashSync(password, salt);
        resolve(hashPassWord)

       }catch(e) {
           reject(e);
       }
    })
}
module.exports = {
    createNewUser: createNewUser
}