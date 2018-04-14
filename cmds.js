var highschool = ['品品', '慶生', '暉暉', '子雞', '大嫂'];
var others = ['抽', '幹嘛', '哈哈', '指令'];
var pix = {};
for (let index = 1; index < 44; index++) {
    // pix.push(index.toString());
    if( (index !== 22 || index !== 23 || index !== 24 || index !== 25 || index !== 41)) {
        pix[index.toString()] = index.toString();
    }
}

var all = highschool.concat(others).join(' ');
module.exports = {
    highschool,
    others,
    all,
    pix
}