import db from '../models'


export const postkyc = (user_id, fullname, phonenumber, card_id, birthday, ssn_id, ein_id, card_front, card_back, country, image_face, image_ssn, image_drive, ein_image, image_passport) => new Promise(async (resolve, reject) => {
    try {

        console.log(user_id, fullname, phonenumber, card_id, birthday, ssn_id, ein_id, card_front, card_back, country, image_face, image_ssn, image_drive, ein_image, image_passport)
        const User = await db.User.findOne({ where: { id: user_id } });
        if (User === null) {
            resolve({
                err: User ? 0 : 1,
                mes: User ? 'Ok' : 'Kyc not found',
                data: User
            })
        } else {
            const response = await db.Kyc.update({
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
                status: "0"
            }, {
                where: {
                    id: User.kyc_id,
                }
            });

            resolve({
                err: response ? 0 : 1,
                mes: response ? 'Ok' : 'Kyc not found',
                kycData: response
            })
        }


    } catch (error) {
        reject(error)
    }
})