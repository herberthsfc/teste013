const
{
   WAConnection,
   MessageType,
   Presence,
   MessageOptions,
   Mimetype,
   WALocationMessage,
   WA_MESSAGE_STUB_TYPES,
   ReconnectMode,
   ProxyAgent,
   GroupSettingChange,
   waChatKey,
   mentionedJid,
   processTime,
} = require("@adiwajshing/baileys")
const qrcode = require("qrcode-terminal") 
const moment = require("moment-timezone") 
const fs = require("fs") 
const { color, bgcolor } = require('./lib/color')
const { help } = require('./lib/help')
const { menu } = require('./lib/menu')
const { menupremium } = require('./lib/menupremium')
const { serpremium } = require('./lib/serpremium')
const { gcpf } = require('./src/gcpf')
const { idiomas } = require('./lib/idiomas')
const { donasi } = require('./lib/donasi')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { cekvip } = require('./src/cekvip')
const { daftarvip } = require('./src/daftarvip')
const kagApi = require('@kagchi/kag-api')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const tiktod = require('tiktok-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const vcard = 'BEGIN:VCARD\n' 
            + 'VERSION:3.0\n' 
            + 'FN:Herberth\n' 
            + 'ORG: Duarte;\n' 
            + 'TEL;type=CELL;type=VOICE;waid=5511996237647:+55 (11) 99623-7647\n' 
            + 'END:VCARD' 
prefix = '/'
blocked = []          

/********** LOAD FILE **************/

/********** END FILE ***************/
  
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const arrayBulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
const bulan = arrayBulan[moment().format('MM') - 1]
const config = {
    XBOT: 'ᏴϴͲ ᎠႮ ᏦᎬᏦᎬ', 
    instagram: 'https://www.instagram.com/kaic_de_paula?r=nametag', 
    nomer: 'wa.me/5511973027044',
    youtube: 'https://youtube.com/channel/UC2a7N-vZ5xrDF-0nfcaUspw', 
    whatsapp: 'Comming soon', 
    tanggal: `TANGGAL: ${moment().format('DD')} ${bulan} ${moment().format('YYYY')}`,
    waktu: time
}

function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}


const { tanggal, waktu, instagram, whatsapp, youtube, nomer, ontime } = config



const { exec } = require("child_process")

const client = new WAConnection()

client.on('qr', qr => {
   qrcode.generate(qr, { small: true })
   console.log(`[ ${time} ] QR code is ready, subrek dulu yak ambipi team`)
})

client.on('credentials-updated', () => {
   const authInfo = client.base64EncodedAuthInfo()
   console.log(`credentials updated!`)

   fs.writeFileSync('./session.json', JSON.stringify(authInfo, null, '\t'))
})

fs.existsSync('./session.json') && client.loadAuthInfo('./session.json')

client.connect();

// client.on('user-presence-update', json => console.log(json.id + ' presence is => ' + json.type)) || console.log(`${time}: Bot by ig:@affis_saputro123`)

client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝙊𝙡𝙖 @${num.split('@')[0]}\n𝙎𝙚𝙟𝙖 𝙗𝙚𝙢 𝙫𝙞𝙣𝙙𝙤(𝙖) 𝙖𝙤 𝙜𝙧𝙪𝙥𝙤 *${mdata.subject}* \n\n• Proibido links de grupos\n• Proibido pornografia\n• Proibido ser inativo(a)\n• Divirta-se e faça novas amizades`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `𝙏𝙘𝙝𝙖𝙪 𝘾𝙤𝙧𝙣𝙤(𝙖) @${num.split('@')[0]} 🐂👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('message-new', async (mek) => {
		try {
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)

			mess = {
				wait: '*「 ❗ Carregando, aguarde... 」*',
				success: '️*「 ✔️ 」 Sucesso!*',
				error: {
					stick: 'Eu falhei :( desculpa',
					Iv: 'Desculpe, o link está inválido☹️'
				},
				only: {
					group: '*「 ❗ 」 Comando disponível apenas em grupos!*',
					ownerG: '*「 💎 」 Comando disponível apenas para o grupo proprietário!*',
					ownerB: '*「 💎 」 Comando disponível apenas para o Herberth!*',
					premium: 'Maaf Ini Fitur Khusus User Premium ❌ ',
					admin: '*「 💎 」 Comando disponível apenas para Membros Premium ou Adms do grupo!*',
					Badmin: '*「 ❗ 」 O Bot precisa de adm para cumprir as funções!*'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["5511996237647@s.whatsapp.net"]
			const premium = ["5511996237647@s.whatsapp.net","5585999612065@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isPremium = premium.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}

			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			switch(command) {
				case 'helrygf': 
				case 'menjfdh':
					client.sendMessage(from, help(prefix), text)
					break
					case 'menupremium':
		      if (!isPremium) return reply('Disponível apenas para Membros Premium!' ,text, { quoted: mek })
		      client.sendMessage(from, menupremium(prefix, sender), text, {quoted: mek})
				  break
					case 'menu':
					if (!isGroup) return reply(mess.only.group)
					client.sendMessage(from, menu(prefix, sender), text, {quoted: mek})
				  break
				  case 'serpremium':
				  if (isGroup) return  reply( 'Este comando não pode ser usado em grupos!')
		      client.sendMessage(from, serpremium(prefix, sender), text, {quoted: mek})
				  break
				  case 'idiomas':
					if (!isGroup) return reply(mess.only.group)
					client.sendMessage(from, idiomas(prefix, sender), text, {quoted: mek})
				  break
				case 'donhj':
				case 'djjh':
					client.sendMessage(from, donasi(), text)
				break
				case 'infhfrg':
					me = client.user
					uptime = process.uptime()
					teks = `nome do bot : ${me.name}\n*numero do bot* : @${me.jid.split('@')[0]}\n*sigla dos comandos* : ${prefix}\nnumeros bloqueados : ${blocked.length}\no bot esta ativo desde : ${kyun(uptime)}\n`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
				case 'listabloq': 
					teks = 'Bloqueados :\n'
					for (let block of blocked) {
						teks += `➢ @${block.split('@')[0]}\n`
					}
					teks += `total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break
					case 'delete':
				case 'del':
						if (!isGroup)return reply(mess.only.group)
						if (!isGroupAdmins)return reply(mess.only.admin)
						client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
						break
                case 'hidetag':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('quem e vc?')
					var value = body.slice(9)
					var group = await client.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: mek
					}
					client.sendMessage(from, options, text)
					break
case 'lofi':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9hZBPRo16fIhsIus3t1je2oAU23pQqBpfw&usqp=CAU`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '️amoo lofi'})
					break
					case 'mia':
					if (!isGroupAdmins) return reply(mess.only.admin)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/Sy9K8m6.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*VIDEOS MIA KHALIFA:*\n(o adm liberou taok)\n\nxvideos.com/pornstar-channels/mia-khalifa '})
					break
					case 'gcpf':                                 client.sendMessage(from, gcpf(prefix), text, { quoted: mek })
                    break
					case 'herberth':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/Pa8iwI4.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*Gangster frio e calculista*'})
					break
					case 'baianor':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/oaJFGaX.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*DDD 70,71,72,73,74,75,76,77😴*'})
					break
					case 'porno':
					if (!isGroupAdmins) return reply(mess.only.admin)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/5U2V0yW.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*o adm liberou porno no gp*😳 \naproveite com moderação! hihi\n\n1- www.xvideos.com\n2- www.xhamster.com\n3- www.xnxx.com\n4- www.pornhub.com\n5- www.redtube.com\n6- www.youporn.com\n7- www.snapdo.com\n8- www.livejasmin.com\n9- www.youjizz.com\n10- www.tube8.com\n11- www.dmm.co.jp\n12- www.hardsextube.com\n13- www.e-hentai.org\n14- www.beeg.com'})
					break
					case 'indio':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/5wVbBeh.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '*DDD 90,91,92,93,94,95,96,97,98,99*'})
					break
					case 'gado':
          if (args.length < 1) return reply('*Um gado foi detectado! Cuidado, ele não pode ver uma mulher!* 🐂')
          break
          case 'donate':
          if (args.length < 1) return reply('*Ajude a fortalecer o bot, doando qualquer valor para o meu picpay!*\n\nhttps://picpay.me/herberth.duarte')
          break
          case 'botcorno':
          if (args.length < 1) return reply('Um homem sem chifres, é um animal indefeso!')
          break
          case 'siri':
					hobby = body.slice(1)
					const hob =['Oi rsrs','Sim, Eu acho','Não sei dizer','Sefodê mlkkkkk','Por quê?','Sei lá','Eu não quero falar sobre isso','Foda-se','Voce é uma gostosa','kkkkkk','Não fala comigo','Pesquisa no google','Lixo','Meu pau','Eu acho que voce tentou ser engraçado(a)','Eu quero comer uma bolacha','Fdp','Corno','A verdade é que voce é corno','Vai se foder','Cala a boca vadia','Linda só verdades','Voce só me faz pergunta bosta','Estou triste, manda audio pelada','Não entendi o que você quis dizer']
					const by = hob[Math.floor(Math.random() * hob.length)]
					client.sendMessage(from, 'Pergunta : *'+hobby+'*\n\nResposta : '+ by, text, { quoted: mek })
					break
					case 'moddroid':
				  if (!isGroup) return reply(mess.only.group)
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/moddroid?q=${body.slice(10)}&apikey=BotWeA`)
			hepi = data.result[0] 
			teks = `*• Título*: ${data.result[0].title}\n\n*• Criador*: ${hepi.publisher}\n\n*• Mod:* ${hepi.mod_info}\n\n*• Peso*: ${hepi.size}\n\n*• Última versão*: ${hepi.latest_version}\n\n*• Gênero*: ${hepi.genre}\n\n*Link:* ${hepi.link}\n\n*Download*: ${hepi.download}`
			buffer = await getBuffer(hepi.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
			case 'happymod':
			if (!isGroup) return reply(mess.only.group)
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=BotWeA`)
			hupo = data.result[0] 
			teks = `*Nama*: ${data.result[0].title}\n*version*: ${hupo.version}\n*size:* ${hupo.size}\n*root*: ${hupo.root}\n*purchase*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
			case 'gay':
		  if (!isGroup) return reply(mess.only.group)
					cantik = body.slice(1)
					const can =['9','15','27','45','50','60','70','62','74','83','97','100','29','94','75','82','41','39']
					const tik = can[Math.floor(Math.random() * can.length)]
					client.sendMessage(from, '「Calculando... 」 *'+cantik+'*\n\nPorcentagem gay🏳️‍🌈 : '+ tik+'%', text, { quoted: mek })
					break
					case 'cekvip':
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply('Disponível apenas para Membros Premium!' ,text, { quoted: mek })
					me = client.user
					uptime = process.uptime()
					client.sendMessage(from,  `*──────────────────*\n*Nama bot:* *${me.name}*\n*─────────────────*\n『 *𝐕𝐈𝐏 𝐔𝐒𝐄𝐑*』\n*──────────────────*\n*•Nomor:* *${sender.split("@s.whatsapp.net")[0]}*\n*•Status:* *ACTIVE*\n*──────────────────*\n*Status Bot:* *${kyun(uptime)}*\n*──────────────────*` , text, { quoted: mek, })
					break
					case 'daftarvip':
					if (!isGroup) return reply(mess.only.group)
					client.sendMessage(from, daftarvip(prefix) , text, { quoted: mek })
					break
					case 'addvip':
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply('Disponível apenas para Membros Premium!' ,text, { quoted: mek })
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '╭────「 *PREMIUM👑* 」──*\n│+ *Number* : \n│+ *Expired*: *30 Days*\n│+ *Status*: *ACTIVE*\n│ Thx for Upgrade to Premium🥰\n*╰──────「 *EREN* 」────'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.sendMessage(from, mentioned)
					} else {
						mentions(`╭────「 *PREMIUM👑* 」──*\n│+ *Number* : @${mentioned[0].split('@')[0]}\n│+ *Expired*: *30 Days*\n│+ *Status*: *ACTIVE*\n│ Thx for Upgrade to Premium🥰\n*╰──────「 *EREN* 」────`, mentioned, true)
					client.sendMessage(from, mentioned)
				    }
					break
					case 'dellvip':
					if (!isGroup) return reply(mess.only.group)
					if (!isPremium) return reply('Disponível apenas para Membros Premium!' ,text, { quoted: mek })
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag target yang ingin di tendang!')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = '╭────「 *PREMIUM👑* 」──*\n│+ *Number* : \n│+ *Status*: *DEACTIVE*\n│ See u for next order🙂\n*╰──────「 *EREN* 」────'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.sendMessage(from, mentioned)
					} else {
						mentions(`╭────「 *PREMIUM👑* 」──*\n│+ *Number* : @${mentioned[0].split('@')[0]}\n│+ *Status*: *DEACTIVE*\n│ See u for next order🙂\n*╰──────「 *EREN* 」────`, mentioned, true)
					client.sendMessage(from, mentioned)
				    }
					break
					case 'addpremium':
					if (!isGroup) return reply(mess.only.group)
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					premium = args[0]
					reply(`Perintah Diterima menambah User Premium : ${premium}`)
					break
			case 'nulis': 
				case 'tulis':
					if (args.length < 1) return reply('Hmmmm?')
                                        if (!isUser) return reply(mess.only.daftarB)
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://tobz-api.herokuapp.com/api/nulis?text=${teks}&apikey=BotWeA`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
                case 'bug':
                case 'reportar':
                case 'reportarbug':
                     const pesan = body.slice(5)
                      if (pesan.length > 300) return client.sendMessage(from, '*「 ❗ 」 Texto muito longo!*', msgType.text, {quoted: mek})
                        var nomor = mek.participant
                       const teks1 = `*[BUG REPORTADO]*\nNumero : @${nomor.split("@s.whatsapp.net")[0]}\nMOTIVO : ${pesan}`
                      var options = {
                         text: teks1,
                         contextInfo: {mentionedJid: [nomor]},
                     }
                    client.sendMessage('5511996237647@s.whatsapp.net', options, text, {quoted: mek})
                    reply('*「 ❗ 」 Bug reportado com sucesso!*')
                    break
					case 'membros2':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Membros do grupo! 〙✪══\n╠➥'+teks+'╚═〘 HDBot.exe 〙', text, {detectLinks: false, quoted: mek})
					break
                   case 'membros3':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ ${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, '╔══✪〘 Membros do grupo! 〙✪══\n╠➥'+teks+'╚═〘 HDBot.exe 〙', text, {quoted: mek})
					break
                  case 'membros':
				client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += `  Total : ${groupMembers.length}\n`
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					if (text.includes('random')){
						conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil',MessageType.text, { quoted: m } );
						}
						   if (text.includes("random"))
						   {
							var items = ["ullzang girl", "cewe cantik", "cewe hijab", "remaja cantik", "cewek jepang"];
							var cewe = items[Math.floor(Math.random() * items.length)];
							var url = "https://api.fdci.se/rep.php?gambar=" + cewe;
							
							axios.get(url)
							  .then((result) => {
								var b = JSON.parse(JSON.stringify(result.data));
								var cewek =  b[Math.floor(Math.random() * b.length)];
								imageToBase64(cewek) // Path to the image
								.then(
									(response) => {
							conn.sendMessage(id, 'Jaja eu mando sabosta espera', MessageType.text, { quoted: m } )
							var buf = Buffer.from(response, 'base64'); // Ta-da	
							conn.sendMessage(id, buf ,MessageType.image, { caption: `nih gan`, quoted: m } )
							   
									}
								)
								.catch(
									(error) => {
										console.log(error); // Logs an error if there was one
									}
								)
							
							});
							}
							if (text.includes('Bot')){
								conn.sendMessage(id, 'Silakan ulangi command dengan huruf kecil\n_contoh : .bot apa kabar_',MessageType.text, { quoted: m } );
								}
								if (text.includes("bot")){
								const teks = text.replace(/.bot /, "")
								axios.get(`https://st4rz.herokuapp.com/api/simsimi?kata=${teks}`).then((res) => {
									let hasil = `${res.data.result}\n\n*Simsimi chat*`;
									conn.sendMessage(id, hasil ,MessageType.text, {quoted: m});
								})
								}
						
					mentions('╔══✪〘 Membros do grupo! 〙✪══\n╠➥'+teks+'╚═〘 HDBot.exe 〙', members_id, true)
					break
                case 'pokemon':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=pokemon`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
                case 'dog':
                case 'auau':
                case 'cachorro':
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=anjing`, {method: 'get'})
					reply(mess.wait)
					var n = JSON.parse(JSON.stringify(anu));
					var nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek })
					break
				case 'mp4':
				case 'ytvideo':
				case 'ytbuscar':
				case 'ytbaixa':
					if (args.length < 1) return reply('*「 ❗ 」 Digite o link do vídeo!*')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Titulo do video* : ${anu.title}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					break
                case 'text3d':
                if (!isRegistered) return reply(ind.noregis())
                if (isLimit(sender)) return reply(ind.limitend(pusname))
              	    if (args.length < 1) return reply('teksnya mana kak?')
                    teks = `${body.slice(8)}`
                    if (teks.length > 10) return client.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	await limitAdd(sender)
					break
                case 'shorturl':
                    anu = await fetchJson(`https://tobz-api.herokuapp.com/api/shorturl?url=${body.slice(10)}`)
			        hasil = `${anu.result}`
			        reply(hasil)
			        break
			    case 'fototiktok':
                    gatauda = body.slice(12)
                    anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/tiktokpp?user=${body.slice(8)}`)
			        buff = await getBuffer(anu.result)
                    reply(anu.result)
			        break
			    case 'map':
			case 'mapa': 
                anu = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`, {method: 'get'})
                buffer = await getBuffer(anu.gambar)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: `${body.slice(5)}`})
				break
				case 'ocr': 
				case 'txtdafoto':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Escolha a foto para pegar os txt dela ${prefix} >-<')
					}
					break
				case 'stiker': 
				case 'sticker':
				case 'fig':
				case 'figurinha':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`Yah gagal ;(, tente dnovo ^_^`)
							})
							.on('end', function () {
								console.log('Finish')
								buff = fs.readFileSync(ran)
								client.sendMessage(from, buff, sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else {
						reply(`「 💟 」 Para criar uma figurinha, envie uma foto, gif ou video de até 5 segundos, com a legenda ${prefix}fig`)
					}
					break
				case 'gtts':	
				case 'tts':
				case 'audio':
					if (args.length < 1) return client.sendMessage(from, '*「 ❗ 」 Informe o idioma! exemplo: pt,it,ja,es*', text, {quoted: mek})
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return client.sendMessage(from, '*「 ❗ 」 Informe o texto deseja que eu diga!*', text, {quoted: mek})
					dtt = body.slice(9)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					dtt.length > 300
					? reply('*「 ❗ 」 Texto muito longo, eu sou baianor!*')
					: gtts.save(ranm, dtt, function() {
						exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
							fs.unlinkSync(ranm)
							buff = fs.readFileSync(rano)
							if (err) return reply('*「 ❗ 」 ERRO! Tente novamente mais tarde!*')
							client.sendMessage(from, buff, audio, {quoted: mek, ptt:true})
							fs.unlinkSync(rano)
						})
					})
					break
				case 'prefixo':
				case 'sigla':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`*「 ✔️ 」 Alterado com sucesso!* : ${prefix}`)
					break 	
				case 'hilih': 
					if (args.length < 1) return reply('qual txt deseja lindx?')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
				case 'tiktokstalk':
				case 'tiktokperfil':
					try {
						if (args.length < 1) return client.sendMessage(from, '*「 ❗ 」 Informe o nome da pessoa!', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*nome* : ${user.uniqueId}\n*Nick* : ${user.nickname}\n*seguidores* : ${stats.followerCount}\n*seguindo* : ${stats.followingCount}\n*posts da conta* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						reply('*「 ❗ 」 Não foi encontrado!*')
					}
					break
				case 'clearall':
				case 'limpar':
					if (!isOwner) return reply('*「 💎 」 Disponível apenas para o Herberth!*')
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('*「 ✔️ 」 Limpo com sucesso!*')
					break
			       case 'bloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `*「 ❗ 」 Bloqueado!* ${body.slice(7)}@c.us`, text)
					break
                    case 'desbloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `*「 ❗ 」 Desbloqueado!* ${body.slice(9)}@c.us`, text)
				break
				case 'sair':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                     setTimeout( () => {
					client.groupLeave (from) 
					}, 2000)
                     setTimeout( () => {
					client.updatePresence(from, Presence.composing) 
					client.sendMessage(from, 'Tchau rebanho de cornos 🐂👋', text) // ur cods
					}, 0)
                     break
				case 'ts': 
					if (!isOwner) return reply('*「 💎 」 Disponível apenas para o Herberth!*') 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `*「 ❗ 」𝙃𝘿𝘽𝙊𝙏.𝙚𝙭𝙚,  diz:*\n\n${body.slice(4)}`})
						}
						reply('*「 ✔️ 」 Sucesso!*')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 ❗ 」𝙃𝘿𝘽𝙊𝙏.𝙚𝙭𝙚,  diz:*\n\n${body.slice(4)}`)
						}
						reply('*「 ✔️ 」 Sucesso!*')
					}
					break
					case 'play':   
	        if (!isGroupAdmins) return reply(mess.only.admin)
                reply(mess.wait)
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `*「 Caso não seja a Música que procura, tente definir o título sem acentos. e por favor não floode! 」*\n\n*「 ✔ Música encontrada! 」*\n*「 Título 」* ${anu.result.title}\n*「 Peso 」* ${anu.result.size}\n\n*「 Carregando, aguarde... 」*\n\n*𝙃𝘿𝘽𝙊𝙏, o mais brabo, tá?*`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                break
					case 'jshsp':
					if (!isGroup) return reply(mess.only.group)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${body.slice(11)}`, {method: 'get'})
					reply(ind.wait())
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*Aqui está a sua imagem!*`})
					await limitAdd(sender)
					break 
					case 'pinterest':
                                        tels = body.slice(11)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
                                        if (!isRegister) return reply(mess.only.daftarB)
                                        if (isLimit(sender)) return reply(ind.limitend(pusname))
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*PINTEREST*\n\*Hasil Pencarian* : *${tels}*`})
                                        await limitAdd(sender)
					break
					case 'blowjob':
					if (!isPremium) return reply('Disponível apenas para Membros Premium!' ,text, { quoted: mek })
					ranp = getRandom('.gif')
					rano = getRandom('.webp')
					anu = await fetchJson('https://tobz-api.herokuapp.com/api/nsfwblowjob?apikey=BotWeA', {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=15 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(ind.stikga())
						buffer = fs.readFileSync(rano)
						client.sendMessage(from, buffer, sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					await limitAdd(sender)
					break
					case 'wa.me':
				  case 'wame':
				  if (!isGroup) return reply(mess.only.group)
          client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *WHATSAPP* 」\n\n_Solicitado por_ : *@${sender.split("@s.whatsapp.net")[0]}\n\nSeu link Whatsapp : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Or ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
			   	case 'perfilgp': 
                        if (!isGroup) return reply(mess.only.group)
                       if (!isGroupAdmins) return reply(mess.only.admin)
                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                       media = await client.downloadAndSaveMediaMessage(mek)
                         await client.updateProfilePicture (from, media)
                        reply('*「 ✔️ 」 Perfil alterado com sucesso!*')
                break						
				case 'add':
				case 'adicionar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('*「 ❗ 」 Não tenho bola de cristal para descobrir quem voce quer adicionar!*')
					if (args[0].startsWith('08')) return reply('*「 ❗ 」 Informe o código do país!*')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('*「 ❗ 」 ERRO! Talvez o contato seja privado!*')
					}
					break
					case 'gp':
					case 'group':
					case 'grupo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args[0] === 'abrir') {
					    reply(`*「 ✔️ Grupo aberto para todos os membros! 」*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'fechar') {
						reply(`*「 🔒 Grupo fechado para membros comuns! 」*`)
						client.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break
                    
            case 'admin':
            case 'owner':
            case 'creator':
            case 'criador':
            case 'dono':
                  client.sendMessage(from, {displayname: "Herberth", vcard: vcard}, MessageType.contact, { quoted: mek})
       client.sendMessage(from, '*「 💎 」 Este é o contato do meu criador, por favor, salve!*',MessageType.text, { quoted: mek} )
           break    
           case 'setname':
           case 'nomegp':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateSubject(from, `${body.slice(9)}`)
                client.sendMessage(from, '*「 ✔️ 」 Nome do grupo alterado com sucesso!*', text, {quoted: mek})
                break
                case 'setdesc':
                case 'desc':
                if (!isGroup) return reply(mess.only.group)
			    if (!isGroupAdmins) return reply(mess.only.admin)
				if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                client.groupUpdateDescription(from, `${body.slice(9)}`)
                client.sendMessage(from, '*「 ✔️ 」 Descrição do grupo alterada com sucesso!*', text, {quoted: mek})
                break
           case 'demote':
           case 'rebaixar':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*「 ❗ 」 Marque o adm que voce deseja rebaixar para membro comum!*')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*「 ✔️ 」 Sucesso!* :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`*「 ✔️ 」 MEMBRO(A) COMUM!* @${mentioned[0].split('@')[0]} foi rebaixado(a) para membro(a) comum!`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
				case 'promote':
				case 'promover':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*「 ❗ 」 Marque o membro que voce deseja promover para Admnistrador(a)!*')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*「 ✔️ 」 Sucesso!* :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`*「 ✔️ 」 ADM!* @${mentioned[0].split('@')[0]} foi promovido(a) a admnistrador(a)!`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break	
			     	case 'kick':
			case 'ban':
			case 'remover':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*「 ❗ 」 Marque o membro que voce deseja remover!*')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = ''
						for (let _ of mentioned) {
							teks += `*「 ✔️ 」 SE FODEU! Removido(a) com sucesso!* :\n`
							teks += `@_.split('@')[0]`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`*「 ✔️ 」 SE FODEU! @${mentioned[0].split('@')[0]} Removido(a) com sucesso!*`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
					case 'linkgrup':
				case 'linkgp':
				    client.updatePresence(from, Presence.composing) 
				    if (!isGroup) return reply(mess.only.group)
                                     if (!isUser) return reply(mess.only.daftarB)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = await client.groupInviteCode (from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\nLink do grupo *${groupName}*`
					client.sendMessage(from, yeh, text, {quoted: mek, detectLinks: false})
					break
				   case 'listadmins':
				   case 'adms':
					 client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					teks = `*「 👮🏻‍♂️ 」 Admnistradores do grupo *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'toimg':
				case 'converter':
					if (!isQuotedSticker) return reply('*「 ❗ 」 Marque uma figurinha!*')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('*「 ❗ 」 ERRO! Tente novamente outra hora!')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '*「 ✔️ 」*'})
						fs.unlinkSync(ran)
					})
					break
				case 'nsfw':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('0 ou 1?')
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('ativado !!')
						nsfw.push(from)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ sucesso ❭')
					} else if (Number(args[0]) === 0) {
						nsfw.splice(from, 1)
						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
						reply('❬ sucesso❭')
					} else {
						reply(' *use o 0 para desativar e o 1 para ativar* \nexemplo: nsfw 1')
					}
					break
				case 'welcome':
				case 'bv':
				case 'bemvindo':
				case 'boasvindas':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('1 ou 0')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('*「 ✔️ 」 Sucesso!*')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('*「 ✔️ 」 Sucesso!*')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('*「 ✔️ 」 Sucesso!* ')
					} else {
						reply('*「 ❗ 」 Use 1 para ativar ou 0 para desativar!* \n *exemplo: ${prefix}bemvindo 1*')
					}
				case 'clone':
				case 'clonar':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply('*「 💎 」 Disponível apenas para o Herberth!*') 
					if (args.length < 1) return reply('*「 💎 」 Perfil clonado com sucesso!*')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('*「 💎 」*')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`*「 💎 」 Perfil clonado com sucesso!* @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('*「 ❗ 」 ERRO! Tente novamente mais tarde!*')
					}
					break
				case 'wait':
				case 'pesquisar':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply(' *encontrei isso* ')
					}
					break
				default:
			if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]','red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}
					}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
