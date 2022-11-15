import * as services from "../services"


export const postKyc = async (req, res) => {
    try {
        const { user_id, fullname, phonenumber, card_id, birthday, ssn_id, ein_id, card_front, card_back, country, image_face, image_ssn, image_drive, ein_image, image_passport } = req.body;
        const response = await services.postkyc(user_id, fullname, phonenumber, card_id, birthday, ssn_id, ein_id, card_front, card_back, country, image_face, image_ssn, image_drive, ein_image, image_passport)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(400).json(error)
    }
}