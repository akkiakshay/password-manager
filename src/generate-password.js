

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ANCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "1234567890",
    special: "~!@#$%^&*()={}?"
}

const BIG_PRIME = 18032219

const generator = (array,options) => {
    console.log(array)
    let requiredCharacters = ""
    options.forEach(opt => {
        requiredCharacters += characters[opt]
    })
    
    let newPass = ""
    array.forEach(a => {
        newPass += requiredCharacters[(parseInt(a * BIG_PRIME))  % requiredCharacters.length]
    })
    console.log(newPass)
    return newPass
}

module.exports = {
    generator
}