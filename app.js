var linebot = require('linebot');
var express = require('express');
var excuse = require('huh');

var bot = linebot({
  channelId: '1545062917',
  channelSecret: '83088b5bcadb9ee57cf6c334bc380e89',
  channelAccessToken: 'EFibAncx5/27LpVFzz3/k/n1sEsoaQeVjqV2f8DDyLOydC3E0YpuPBcZFn5962mJT3pYe7dz4Tww5ouFBFA5Uia1inEXm5U0bfIJ+APu1ZiSWSNg5+ND5R68B/dnextLgSW9rkSHo916ADbuCOYqWAdB04t89/1O/w1cDnyilFU='
});

var adj = ['火爆', '正', '可愛', '帥氣', '機車', '漂亮', '有趣', '無聊', '色情'];
var num = adj.length;

var inAdj = adj[Math.floor((Math.random() * num) + 1)];
bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
  if (event.message.type === 'text') {
  	var text = event.message.text;
  	switch (text) {
  		case '品翰':
  			event.reply(`${text}是群組中最${inAdj}的人`).then(function (data) {
			    console.log(data);
			}).catch(function (error) {
	   		 	console.log(error);
			});
		break;

  	}
  }
});

const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

//因為 express 預設走 port 3000，而 heroku 上預設卻不是，要透過下列程式轉換
var server = app.listen(process.env.PORT || 8080, function() {
  var port = server.address().port;
  console.log("App now running on port", port);
});
