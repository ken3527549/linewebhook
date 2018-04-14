var highschool = ['品品', '慶生', '暉暉', '子雞', '大嫂'];
var others = ['抽', '幹嘛', '哈哈', '指令'];
var pixURL = {
    '1':'https://i.imgur.com/1IZLpS2.jpg',
    '2':'https://i.imgur.com/411zVIL.jpg',
    '3':'https://i.imgur.com/Par86ZM.jpg',
    '4':'https://i.imgur.com/MmJTfYk.jpg'
};
var pix = {};
for (let index = 1; index < 44; index++) {
    // pix.push(index.toString());
    pix[index.toString()] = index.toString();
}

var all = highschool.concat(others).join(' ');
module.exports = {
    highschool,
    others,
    all,
    pix,
    pixURL
}