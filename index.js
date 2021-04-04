const { fetchJson, range } = require('./lib/function')
const { Telegraf } = require('telegraf')
const help = require('./lib/help')
const tele = require('./lib/tele')
const chalk = require('chalk')
const os = require('os')
const fs = require('fs')

const {
    apikey,
    bot_token,
    owner,
    ownerLink,
    version,
    prefix
} = JSON.parse(fs.readFileSync(`./config.json`))

if (bot_token == "") {
    return console.log("=== BOT TOKEN CANNOT BE EMPTY ===")
}

const bot = new Telegraf(bot_token)

bot.command('start', async(lol) => {
    user = await tele.getUser(lol)
    await help.start(lol, user.full_name)
    await lol.deleteMessage()
})

bot.command('help', async(lol) => {
    user = await tele.getUser(lol)
    await help.help(lol, user.full_name)
})

bot.on("callback_query", async(lol) => {
    callback_data = lol.callbackQuery.data
    user = await tele.getUser(lol)
    const isGroup = lol.chat.type.includes("group")
    const groupName = isGroup ? lol.chat.title : ""
    if (!isGroup) console.log(chalk.whiteBright("├ "), chalk.cyanBright("[   ACT   ]"), chalk.whiteBright(callback_data), chalk.greenBright("from"), chalk.whiteBright(user.full_name))
    if (isGroup) console.log(chalk.whiteBright("├ "), chalk.cyanBright("[   ACT   ]"), chalk.whiteBright(callback_data), chalk.greenBright("from"), chalk.whiteBright(user.full_name), chalk.greenBright("in"), chalk.whiteBright(groupName))
    switch (callback_data) {
        case 'help':
        default:
            await help.help(lol, user.full_name)
            break
    }
})

bot.on("message", async(lol) => {
    try {
        const body = lol.message.text || lol.message.caption || ""

        comm = body.trim().split(" ").shift().toLowerCase()
        cmd = false
        if (prefix != "" && body.startsWith(prefix)) {
            cmd = true
            comm = body.slice(1).trim().split(" ").shift().toLowerCase()
        }
        const command = comm
        const args = await tele.getArgs(lol)
        const user = await tele.getUser(lol)

        const reply = async(text) => {
            for (var x of range(0, text.length, 4096)) {
                await lol.replyWithMarkdown(text.substr(x, 4096))
            }
        }

        const isCmd = cmd
        const isGroup = lol.chat.type.includes("group")
        const groupName = isGroup ? lol.chat.title : ""

        const quotedMessage = lol.message.reply_to_message || {}
        const isQuotedImage = quotedMessage.photo ? true : false
        const isQuotedVideo = quotedMessage.video ? true : false
        const isQuotedSticker = quotedMessage.sticker ? true : false
        const isQuotedDocument = quotedMessage.document ? true : false
        const isQuotedAnimation = quotedMessage.animation ? true : false

        if (!isGroup && !isCmd) console.log(chalk.whiteBright("├ "), chalk.cyanBright("[ PRIVATE ]"), chalk.whiteBright(body), chalk.greenBright("from"), chalk.whiteBright(user.full_name))
        if (isGroup && !isCmd) console.log(chalk.whiteBright("├ "), chalk.cyanBright("[  GROUP  ]"), chalk.whiteBright(body), chalk.greenBright("from"), chalk.whiteBright(user.full_name), chalk.greenBright("in"), chalk.whiteBright(groupName))
        if (!isGroup && isCmd) console.log(chalk.whiteBright("├ "), chalk.cyanBright("[ COMMAND ]"), chalk.whiteBright(body), chalk.greenBright("from"), chalk.whiteBright(user.full_name))
        if (isGroup && isCmd) console.log(chalk.whiteBright("├ "), chalk.cyanBright("[ COMMAND ]"), chalk.whiteBright(body), chalk.greenBright("from"), chalk.whiteBright(user.full_name), chalk.greenBright("in"), chalk.whiteBright(groupName))

        async function getFileID() {
            file_id = ""
            if (isQuotedImage) {
                photo = lol.message.reply_to_message.photo
                file_id = photo[photo.length - 1].file_id
            } else if (isQuotedDocument) {
                file_id = lol.message.reply_to_message.document.file_id
            } else if (isQuotedVideo) {
                file_id = lol.message.reply_to_message.video.file_id
            } else if (isQuotedAnimation) {
                file_id = lol.message.reply_to_message.animation.file_id
            }
            return file_id
        }

        switch (command) {
            case 'help':
                user = await tele.getUser(lol)
                await help.help(lol, user.full_name)
                break

                // Downloader //
            case 'ytplay':
                if (args.length == 0) return reply(`Example: ${prefix + command} Nightcore`)
                query = args.join(" ")
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/yt/play?search=${query}&apikey=GFL`)
                await lol.replyWithPhoto(anu.result.thumbnail, { caption: anu.result.title })
                await lol.replyWithAudio({ url: anu.result.url_audio })
                await lol.replyWithVideo({ url: anu.result.url_video })
                break
            case 'ytmp3':
                if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
                ini_link = args[0]
                result = await fetchJson(`http://zekais-api.herokuapp.com/ytmp3?url=${ini_link}`)
                caption = `\`❖ Title    :\` *${result.title}*\n`
                await lol.replyWithPhoto({ url: result.thumb }, { caption: caption, parse_mode: "Markdown" })
                await lol.replyWithAudio({ url: result.url }, { title: result.title, thumb: result.thumb })
                break
            case 'ytmp4':
                if (args.length == 0) return reply(`Example: ${prefix + command} https://www.youtube.com/watch?v=qZIQAk-BUEc`)
                ini_link = args[0]
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/yt?url=${ini_link}&apikey=GFL`)
                caption = `\`❖ Title    :\` *${anu.result[0].title}*\n`
                caption += `\`❖ Uploader :\` *${anu.result[0].date}*\n`
                caption += `\`❖ Description :\` *${anu.result[0].description}*\n`
                await lol.replyWithPhoto({ url: anu.result[0].thumbnail.url }, { caption: caption, parse_mode: "Markdown" })
                await lol.replyWithVideo({ url: anu.result[0].video[0].url }, { thumb: result.thumbnail })
                break
            case 'pinterest':
                if (args.length == 0) return reply(`Example: ${prefix + command} girl frontline`)
                query = args.join(" ")
                anu = await fetchJson(`http://zekais-api.herokuapp.com/pinterest?query=${query}`)
                data = anu.result
                n = JSON.parse(JSON.stringify(data));
			    nimek =  n[Math.floor(Math.random() * n.length)];
                await lol.replyWithPhoto({ url: nimek })
                break
             case 'bdsm':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/bdsm?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'blowjob':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/blowjob?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'boobjob':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/boobjob?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'cream':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/creampie?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'ahegao':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/ahegao?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
           case 'femdom':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/femdom?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'pussy':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/pussy?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'nsfwneko':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/nsfwneko?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'hentai':
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/nsfw/hentai?apikey=GFL`)
                await lol.replyWithPhoto({ url: anu.result })
                break
            case 'zerochan':
                if (args.length == 0) return reply(`Example: ${prefix + command} girl frontline`)
                query = args.join(" ")
                anu = await fetchJson(`http://zekais-api.herokuapp.com/zerochan?query=${query}`)
                data = anu.result
                n = JSON.parse(JSON.stringify(data));
			    nimek =  n[Math.floor(Math.random() * n.length)];
                await lol.replyWithPhoto({ url: nimek })
                break
                // AniManga //
            case 'character':
                if (args.length == 0) return reply(`Example: ${prefix + command} Miku Nakano`)
                query = args.join(" ")
                result = await fetchJson(`http://api.lolhuman.xyz/api/character?apikey=${apikey}&query=${query}`)
                result = result.result
                text = `Id : ${result.id}\n`
                text += `Name : ${result.name.full}\n`
                text += `Native : ${result.name.native}\n`
                text += `Favorites : ${result.favourites}\n`
                text += `Media : \n`
                ini_media = result.media.nodes
                for (var x of ini_media) {
                    text += `- ${x.title.romaji} (${x.title.native})\n`
                }
                text += `\nDescription : \n${result.description.replace(/__/g, "_")}`
                await lol.replyWithPhoto({ url: result.image.large }, { caption: text })
                break
            case 'manga':
                if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                query = args.join(" ")
                result = await fetchJson(`http://api.lolhuman.xyz/api/manga?apikey=${apikey}&query=${query}`)
                result = result.result
                text = `Id : ${result.id}\n`
                text += `Id MAL : ${result.idMal}\n`
                text += `Title : ${result.title.romaji}\n`
                text += `English : ${result.title.english}\n`
                text += `Native : ${result.title.native}\n`
                text += `Format : ${result.format}\n`
                text += `Chapters : ${result.chapters}\n`
                text += `Volume : ${result.volumes}\n`
                text += `Status : ${result.status}\n`
                text += `Source : ${result.source}\n`
                text += `Start Date : ${result.startDate.day} - ${result.startDate.month} - ${result.startDate.year}\n`
                text += `End Date : ${result.endDate.day} - ${result.endDate.month} - ${result.endDate.year}\n`
                text += `Genre : ${result.genres.join(", ")}\n`
                text += `Synonyms : ${result.synonyms.join(", ")}\n`
                text += `Score : ${result.averageScore}%\n`
                text += `Characters : \n`
                ini_character = result.characters.nodes
                for (var x of ini_character) {
                    text += `- ${x.name.full} (${x.name.native})\n`
                }
                text += `\nDescription : ${result.description}`
                await lol.replyWithPhoto({ url: result.coverImage.large }, { caption: text })
                break
            case 'anime':
                if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                query = args.join(" ")
                result = await fetchJson(`http://api.lolhuman.xyz/api/anime?apikey=${apikey}&query=${query}`)
                result = result.result
                text = `Id : ${result.id}\n`
                text += `Id MAL : ${result.idMal}\n`
                text += `Title : ${result.title.romaji}\n`
                text += `English : ${result.title.english}\n`
                text += `Native : ${result.title.native}\n`
                text += `Format : ${result.format}\n`
                text += `Episodes : ${result.episodes}\n`
                text += `Duration : ${result.duration} mins.\n`
                text += `Status : ${result.status}\n`
                text += `Season : ${result.season}\n`
                text += `Season Year : ${result.seasonYear}\n`
                text += `Source : ${result.source}\n`
                text += `Start Date : ${result.startDate.day} - ${result.startDate.month} - ${result.startDate.year}\n`
                text += `End Date : ${result.endDate.day} - ${result.endDate.month} - ${result.endDate.year}\n`
                text += `Genre : ${result.genres.join(", ")}\n`
                text += `Synonyms : ${result.synonyms.join(", ")}\n`
                text += `Score : ${result.averageScore}%\n`
                text += `Characters : \n`
                ini_character = result.characters.nodes
                for (var x of ini_character) {
                    text += `- ${x.name.full} (${x.name.native})\n`
                }
                text += `\nDescription : ${result.description}`
                await lol.replyWithPhoto({ url: result.coverImage.large }, { caption: text })
                break
            case 'wait':
                if (isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument) {
                    file_id = await getFileID()
                    url_file = await tele.getLink(file_id)
                    result = await fetchJson(`https://leyscoders-api.herokuapp.com/api/img/trash?url=${url_file}&apikey=freeKeY`)
                    result = result.result
                    text = `Anilist id : ${result.anilist_id}\n`
                    text += `MAL id : ${result.mal_id}\n`
                    text += `Title Romaji : ${result.title_romaji}\n`
                    text += `Title Native : ${result.title_native}\n`
                    text += `Title English : ${result.title_english}\n`
                    text += `At : ${result.at}\n`
                    text += `Episode : ${result.episode}\n`
                    text += `Similarity : ${result.similarity}`
                    await lol.replyWithVideo({ url: result.video }, { caption: text })
                } else {
                    reply(`Tag gambar yang sudah dikirim`)
                }
                break
            case 'trash':
                if (isQuotedImage || isQuotedAnimation || isQuotedVideo || isQuotedDocument) {
                    file_id = await getFileID()
                    url_file = await tele.getLink(file_id)
                    await lol.replyWithPhoto({ url: `https://leyscoders-api.herokuapp.com/api/img/trash?url=${url_file}&apikey=freeKeY` })
                } else {
                    reply(`Tag gambar yang sudah dikirim`)
                }
                break
             case 'epep':
                if (args.length == 0) return reply(`Example: ${prefix + command} Ling`)
                names = args[0]
                await lol.replyWithPhoto({ url: `https://api.zeks.xyz/api/epep?text=${names}&apikey=apivinz` })
                break
             case 'tahta':
                if (args.length == 0) return reply(`Example: ${prefix + command} Ling`)
                teps = args[0]
                await lol.replyWithPhoto({ url: `https://api.zeks.xyz/api/hartatahta?text=${teps}&apikey=apivinz` })
                break
             case 'futuristic':
                if (args.length == 0) return reply(`Example: ${prefix + command} Ling`)
                tesd = args[0]
                await lol.replyWithPhoto({ url: `https://fzn-gaz.herokuapp.com/api/futuristic?text=${tesd}` })
                break
            case 'graffiti':
                if (args.length == 0) return reply(`Example: ${prefix + command} Ling`)
                tek = args[0]
                anu = await fetchJson(`https://iwi-negev.herokuapp.com/api/textmaker/lmo?text=${tek}&theme=grapiti&apikey=GFL`)      
                await lol.replyWithPhoto({ url: anu.result.url })
                break
            case 'kusonime':
                if (args.length == 0) return reply(`Example: ${prefix + command} https://kusonime.com/nanatsu-no-taizai-bd-batch-subtitle-indonesia/`)
                ini_url = args[0]
                result = await fetchJson(`http://api.lolhuman.xyz/api/kusonime?apikey=${apikey}&url=${ini_url}`)
                result = result.result
                text = `Title : ${result.title}\n`
                text += `Japanese : ${result.japanese}\n`
                text += `Genre : ${result.genre}\n`
                text += `Seasons : ${result.seasons}\n`
                text += `Producers : ${result.producers}\n`
                text += `Type : ${result.type}\n`
                text += `Status : ${result.status}\n`
                text += `Total Episode : ${result.total_episode}\n`
                text += `Score : ${result.score}\n`
                text += `Duration : ${result.duration}\n`
                text += `Released On : ${result.released_on}\n`
                text += `Desc : ${result.desc}\n`
                link_dl = result.link_dl
                for (var x in link_dl) {
                    text += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        text += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                await lol.replyWithPhoto({ url: result.thumbnail }, { caption: text })
                break
            case 'kusonimesearch':
                if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                query = args.join(" ")
                result = await fetchJson(`http://api.lolhuman.xyz/api/kusonimesearch?apikey=${apikey}&query=${query}`)
                result = result.result
                text = `Title : ${result.title}\n`
                text += `Japanese : ${result.japanese}\n`
                text += `Genre : ${result.genre}\n`
                text += `Seasons : ${result.seasons}\n`
                text += `Producers : ${result.producers}\n`
                text += `Type : ${result.type}\n`
                text += `Status : ${result.status}\n`
                text += `Total Episode : ${result.total_episode}\n`
                text += `Score : ${result.score}\n`
                text += `Duration : ${result.duration}\n`
                text += `Released On : ${result.released_on}\n`
                text += `Desc : ${result.desc}\n`
                link_dl = result.link_dl
                for (var x in link_dl) {
                    text += `\n${x}\n`
                    for (var y in link_dl[x]) {
                        text += `${y} - ${link_dl[x][y]}\n`
                    }
                }
                await lol.replyWithPhoto({ url: result.thumbnail }, { caption: text })
                break
            case 'otakudesu':
                if (args.length == 0) return reply(`Example: ${prefix + command} https://otakudesu.tv/lengkap/pslcns-sub-indo/`)
                ini_url = args[0]
                result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesu?apikey=${apikey}&url=${ini_url}`)
                result = result.result
                text = `Title : ${result.title}\n`
                text += `Japanese : ${result.japanese}\n`
                text += `Judul : ${result.judul}\n`
                text += `Type : ${result.type}\n`
                text += `Episode : ${result.episodes}\n`
                text += `Aired : ${result.aired}\n`
                text += `Producers : ${result.producers}\n`
                text += `Genre : ${result.genres}\n`
                text += `Duration : ${result.duration}\n`
                text += `Studios : ${result.status}\n`
                text += `Rating : ${result.rating}\n`
                text += `Credit : ${result.credit}\n`
                get_link = result.link_dl
                for (var x in get_link) {
                    text += `\n\n*${get_link[x].title}*\n`
                    for (var y in get_link[x].link_dl) {
                        ini_info = get_link[x].link_dl[y]
                        text += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        text += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        text += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            text += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                await reply(text)
                break
            case 'otakudesusearch':
                if (args.length == 0) return reply(`Example: ${prefix + command} Gotoubun No Hanayome`)
                query = args.join(" ")
                result = await fetchJson(`http://api.lolhuman.xyz/api/otakudesusearch?apikey=${apikey}&query=${query}`)
                result = result.result
                text = `Title : ${result.title}\n`
                text += `Japanese : ${result.japanese}\n`
                text += `Judul : ${result.judul}\n`
                text += `Type : ${result.type}\n`
                text += `Episode : ${result.episodes}\n`
                text += `Aired : ${result.aired}\n`
                text += `Producers : ${result.producers}\n`
                text += `Genre : ${result.genres}\n`
                text += `Duration : ${result.duration}\n`
                text += `Studios : ${result.status}\n`
                text += `Rating : ${result.rating}\n`
                text += `Credit : ${result.credit}\n`
                get_link = result.link_dl
                for (var x in get_link) {
                    text += `\n\n*${get_link[x].title}*\n`
                    for (var y in get_link[x].link_dl) {
                        ini_info = get_link[x].link_dl[y]
                        text += `\n\`\`\`Reso : \`\`\`${ini_info.reso}\n`
                        text += `\`\`\`Size : \`\`\`${ini_info.size}\n`
                        text += `\`\`\`Link : \`\`\`\n`
                        down_link = ini_info.link_dl
                        for (var z in down_link) {
                            text += `${z} - ${down_link[z]}\n`
                        }
                    }
                }
                await reply(text)
                break
           
            default:
                if (!isGroup && !isCmd) {
                    await lol.replyWithChatAction("typing")
                    simi = await fetchJson(`http://api.lolhuman.xyz/api/simi?apikey=${apikey}&text=${body}`)
                    await reply(simi.result)
                }
        }
    } catch (e) {
        console.log(chalk.cyanBright("[  ERROR  ]"), chalk.redBright(e))
    }
})


bot.launch()
bot.telegram.getMe().then((getme) => {
    itsPrefix = (prefix != "") ? prefix : "No Prefix"
    console.log(chalk.greenBright(' ===================================================='))
    console.log(chalk.greenBright(" │ + Owner    : " + owner || ""))
    console.log(chalk.greenBright(" │ + Bot Name : " + getme.first_name || ""))
    console.log(chalk.greenBright(" │ + Version  : " + version || ""))
    console.log(chalk.greenBright(" │ + Host     : " + os.hostname() || ""))
    console.log(chalk.greenBright(" │ + Platfrom : " + os.platform() || ""))
    console.log(chalk.greenBright(" │ + Core     : " + os.cpus()[0].model || ""))
    console.log(chalk.greenBright(" │ + Speed    : " + os.cpus()[0].speed || "" + " MHz"))
    console.log(chalk.greenBright(" │ + Core     : " + os.cpus().length || ""))
    console.log(chalk.greenBright(` │ + RAM      : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB`))
    console.log(chalk.greenBright(" │ + Prefix   : " + itsPrefix))
    console.log(chalk.greenBright(' ===================================================='))
    console.log(chalk.whiteBright('╭─── [ LOG ]'))
})
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))