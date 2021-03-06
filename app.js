var linebot = require('linebot');
var express = require('express');
var excuse = require('huh');
var statements = require('./statements');
var cmds = require('./cmds');
var translation = require('./translation');
var fetch = require('node-fetch');


var bot = linebot({
  channelId: '1545062917',
  channelSecret: '83088b5bcadb9ee57cf6c334bc380e89',
  channelAccessToken: 'EFibAncx5/27LpVFzz3/k/n1sEsoaQeVjqV2f8DDyLOydC3E0YpuPBcZFn5962mJT3pYe7dz4Tww5ouFBFA5Uia1inEXm5U0bfIJ+APu1ZiSWSNg5+ND5R68B/dnextLgSW9rkSHo916ADbuCOYqWAdB04t89/1O/w1cDnyilFU='
});



bot.on('message', function(event) {
  console.log(event); //把收到訊息的 event 印出來看看
  if (event.message.type === 'text') {
	var text = event.message.text;
	var otherCmds = cmds.others;
  	switch (text) {
		case otherCmds[0]:
			// var num = statements.girls.length - 1;
			// var rNum = Math.floor((Math.random() * num) + 1);
			// var ingirls = statements.girls[rNum];
			// event.reply({
			// 	type: 'image',
			// 	originalContentUrl: ingirls,
			// 	previewImageUrl: ingirls
			// }).then(function (data) {
			// 	console.log(data);
			// }).catch(function (error) {
			// 	console.log(error);
			// });;
			var num = statements.girls.length - 1;
			var rNum = Math.floor((Math.random() * num) + 1);
			var ingirls = statements.girls[rNum];
			console.log('girls:', ingirls);

			event.reply({
				type: 'image',
				originalContentUrl: ingirls,
				previewImageUrl: ingirls
			}).then(function (data) {
				console.log(data);
			}).catch(function (error) {
				console.log(error);
			});;
			break;
		case otherCmds[1]:
			event.reply({
				type: 'sticker',
				packageId: '1',
				stickerId: Math.floor((Math.random() * 21) + 1)
			});
			break;
		case otherCmds[2]:
			event.reply({
				type: 'sticker',
				packageId: '2',
				stickerId: Math.floor((Math.random() * 39) + 140)
			});
			break;
		case otherCmds[3]:
			event.reply(cmds.all);
			break;
		case cmds.pix[text]:
			console.log(text);
			let URL = `https://video-dev.iiot.io/${text}.jpg`;
			event.reply({
				type: 'image',
				originalContentUrl: URL,
				previewImageUrl: URL
			})
			break;
		case '滾':
			let roomId = event.source.roomId;
			let endpoint = `https://api.line.me/v2/bot/room/${roomId}/leave`;
			let headers = {
				"Authorization": `Bearer EFibAncx5/27LpVFzz3/k/n1sEsoaQeVjqV2f8DDyLOydC3E0YpuPBcZFn5962mJT3pYe7dz4Tww5ouFBFA5Uia1inEXm5U0bfIJ+APu1ZiSWSNg5+ND5R68B/dnextLgSW9rkSHo916ADbuCOYqWAdB04t89/1O/w1cDnyilFU=`,
				"Content-Length": 0
			};
			fetch(endpoint, { method: "POST", headers: headers })
			.then(r => {
				console.log(r);
			})
			.catch(e => {
				console.log(e);
			});
			break;
		default:
			if (cmds.highschool.indexOf(text) != -1) {
				var num = statements.adj.length - 1;
				var rNum = Math.floor((Math.random() * num) + 1);
				var inAdj = statements.adj[rNum];
				event.reply(`${text}是群組中${inAdj}的人`).then(function (data) {
					console.log(data);
				}).catch(function (error) {
						console.log(error);
				});
			} else {
				translation.getTranslation(text, 'en').then((r) => {
					event.reply(JSON.parse(r).data.translations[0].translatedText).then(function (data) {
						console.log(data);
					}).catch(function (error) {
						console.log(error);
					});
				});
			}
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
