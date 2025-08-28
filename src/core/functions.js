module.exports.getTime = function(){
    var time = new Date();
    var seconds = time.getSeconds();
    var minutes = time.getMinutes();
    var hours = time.getHours();

    return ("0" + hours).substr(-2) + ":" + ("0" + minutes).substr(-2) + ":" + ("0" + seconds).substr(-2) ;
}

module.exports.randomString = function(stringLength){
    var character = [];
    var char;
    let string = "";
    character.push("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9")

    for (let i = 0; i < stringLength; i++) {
        char = character[Math.floor(Math.random() * character.length)];
        string += char;
    }
    
    console.log(string);
    return string;
}

module.exports.getPlayerList = function(playerList) {
    var playerListArray = playerList
    let playerListString = "";
    for (let i = 0; i < playerListArray.length; i++) {
        playerListString += playerListArray[i] + ", "
    }
    playerListString = playerListString.substring(0, playerListString.length -2);
    return playerListString;
}

module.exports.getRandomNumber = function(min, max) {
    return Math.random() * (max - min) + min;
}

module.exports.removeDuplicates = function(array) {
    return array.filter((value, index) => array.indexOf(value) === index)
}