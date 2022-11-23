import db from "../models";
import { permission } from './../utils/permisionKyc';

export const postkyc = (
  user_id,
  fullname,
  phonenumber,
  card_id,
  birthday,
  ssn_id,
  ein_id,
  card_front,
  card_back,
  country,
  image_face,
  image_ssn,
  image_drive,
  ein_image,
  image_passport,
  codeFront,
  codeBack,
  codeFace,
  codeSSN,
  codeLicense,
  codeEIN,
  codePassport
) =>
  new Promise(async (resolve, reject) => {
    try {
      const User = await db.User.findOne({ where: { id: user_id } });
      if (User === null) {
        resolve({
          err: User ? 0 : 1,
          mes: User ? "Ok" : "Kyc not found",
          data: User,
        });
      } else {
        const response = await db.Kyc.update(
          {
            fullname: fullname,
            phonenumber: phonenumber,
            card_id: card_id,
            birthday: birthday,
            ssn_id: ssn_id,
            ein_id: ein_id,
            card_front: card_front,
            card_back: card_back,
            country: country,
            image_face: image_face,
            image_ssn: image_ssn,
            image_drive: image_drive,
            ein_image: ein_image,
            image_passport: image_passport,
            codeFront: codeFront,
            codeBack: codeBack,
            codeFace: codeFace,
            codeSSN: codeSSN,
            codeLicense: codeLicense,
            codeEIN: codeEIN,
            codePassport: codePassport,
            status: 1,
          },
          {
            where: {
              id: User.kyc_id,
            },
          }
        );

        if (response) {
          resolve({
            success: true,
            err: 2,
            mes: "Ok",
            data: response,
          });
        } else {
          resolve({
            success: false,
            err: 0,
            mes: "Ok",
            data: response,
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });

export const checkUserKyc = (user_id) =>
  new Promise(async (resolve, reject) => {
    console.log(user_id);
    try {
      const user = await db.User.findOne({ where: { id: user_id } });
      if (user) {
        const kycInfo = await db.Kyc.findOne({ where: { id: user.kyc_id } });

        if (kycInfo && kycInfo.dataValues.status === 1) {
          console.log("object");
          resolve({
            success: true,
            err: 0,
            mes: "Awaiting verification.",
            data: {
              permission: permission.pending_review,
            },
          });
        } else if (kycInfo && kycInfo.dataValues.status === 2) {
          resolve({
            success: true,
            err: 0,
            mes: "Your account has been approved. Thank you and enjoy your trading.",
            data: {
              permission: permission.approve,
            },
          });
        } else {
          resolve({
            success: true,
            err: 0,
            mes: "Not kyc",
            data: {
              permission: permission.nonKyc,
            },
          });
        }
      } else {
        resolve({
          success: true,
          err: 0,
          mes: "User not found",
          data: {
            permission: true,
          },
        });
      }
    } catch (error) {
      reject(error);
    }
  });
