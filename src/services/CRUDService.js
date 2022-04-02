import { reject } from 'bcrypt/promises';
import bcrypt from 'bcryptjs'
import e from 'express';
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
let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true
            });
            resolve(users)
        }catch(e){
            reject(e)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async(resolve, reject) =>{
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })
            if(user){
                resolve((user))
            } else {
                resolve([])
            }

        }catch(e) {
            reject(e);
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: {id: data.id}
            })
            if(user){
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save();
                let allUsers = await db.User.findAll();
            resolve(allUsers);
            } else {
                resolve();
            }
            await db.User.update({

            })

        }catch(e) {
            console.log(e);
        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser : getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData
}