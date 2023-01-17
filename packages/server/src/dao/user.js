const Users = require("../models/users");
const { generateUserName } = require("../utility/user-utility");

const addNewUser = async (userDetails, transaction) => {
    const { first_name, last_name, password, user_email, mobile_no } =
        userDetails;
    const result = await Users.create(
        {
            user_name: generateUserName(first_name, last_name),
            user_email,
            first_name,
            last_name,
            password,
            mobile_no,
        },
        transaction
    );

    return result ? result : null;
};

const getUserDetails = async (email) => {
    const result = await Users.findOne({ user_email: email });
    return result ? result : null;
};

module.exports = {
    addNewUser,
    getUserDetails
};
