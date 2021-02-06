module.exports = {
    getRandomInt: function (max) {
        return Math.floor(Math.random() * Math.floor(max));
    },
    getRandomCode: function () {
        let verifyCode = "";
        for (let i = 0; i < 6; i++) {
            verifyCode = verifyCode + this.getRandomInt(10).toString();
        }
        return verifyCode;
    }
};