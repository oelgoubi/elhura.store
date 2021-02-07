const db = require("../models");
const Client = db.Client;
const Company = db.Company;
const Admin = db.Admin;

module.exports = {
    checkIfUserExistsBy: async function (nameField, valueField, role, isValid=null) {
        users = [];
        let whereClause = isValid !== null ? {
            [nameField] : valueField,
            isValid : isValid
        } : {
            [nameField] : valueField
        }
        if(role===0 || role===-1) {
            admin = await Admin.findAll({ where : whereClause});
            if (admin.length !== 0){
                users = users.concat(admin);
            }
        }
        if(role===1 || role===-1) {
            client = await Client.findAll({ where: whereClause });
            if (client.length !== 0) {
                users = users.concat(client)
            }
        }
        if(role===2 || role===-1) {
            company = await Company.findAll({ where : whereClause});
            if (company.length !== 0){
                users = users.concat(company);
            }
        }
        return users;
    },
    removeNonValidUsers: async function() {
        const clients = await Client.destroy({
            where:{
                isValid: false
            }
        })
    },
    updateField: async function(nameField, valueField, id) {
        await Client.update({
            [nameField]: valueField
        }, {
            where: {
                idUser: id
            }
        })
    }
}