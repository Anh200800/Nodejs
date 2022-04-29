import db from "../models/index";
require('dotenv').config();

// booking schedule clinic
// let postBookAppointment = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       if (
//         !data.email ||
//         !data.doctorId ||
//         !data.timeType ||
//           !data.date
//           ||
//         !data.fullName ||
//         !data.selectedGender ||
//         !data.address
//       ) {
//         resolve({
//           errCode: 1,
//           errMessage: "Missing parameter",
//         });
//       } else {
//         let token = uuid4();

//         //send email
//         await emailService.sendSimpleEmail({
//           receiverEmail: data.email,
//           // patientName: 'User',
//           patientName: data.fullName,
//           time: data.timeString,
//           doctorName: data.doctorName,
//           language: data.language,
//           redirectLink: buildUrlEmail(data.doctorId, token),
//         });

//         //upsert patient
//         let user = await db.User.findOrCreate({
//           where: { email: data.email },
//           defaults: {
//             email: data.email,
//             roleId: "R3",
//             gender: data.selectedGender,
//             address: data.address,
//             firstName: data.fullName,
//           },
//         });

//         console.log("check user: ", user[0]);
//         // create a booking record
//         if (user && user[0]) {
//           await db.Booking.findOrCreate({
//             where: { patientId: user[0].id },
//             defaults: {
//               statusId: "S1",
//               doctorId: data.doctorId,
//               patientId: user[0].id,
//               date: data.date,
//               timeType: data.timeType,
//               token: token,
//             },
//           });
//         }

//         resolve({
//           data: user,
//           errCode: 0,
//           errMessage: "save infor patient succeed",
//         });
//       }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


// booking schedule clinic
let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.timeType ||
        !data.date 
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        

        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            // gender: data.selectedGender,
            // address: data.address,
            // firstName: data.fullName,
          },
        });

        console.log("check user: ", user[0]);
        // create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            //   token: token,
            },
          });
        }

        resolve({
          data: user,
          errCode: 0,
          errMessage: "save infor patient succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
};