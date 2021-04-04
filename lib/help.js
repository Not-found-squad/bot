const fs = require('fs')
const config = JSON.parse(fs.readFileSync(`./config.json`))

exports.start = async(lol, name) => {
    text = `Hello ${name}! Im a multifunction bot build with ❤️ by  [my master](${config.ownerLink}).`
    await lol.replyWithMarkdown(text, { disable_web_page_preview: true })
}

exports.help = async(lol, name) => {
    text = `Hello ${name}! 
    
 OWNER : Linz
 VERSION : 1.0.5
 TYPE : TELEGRAM BOT
┏━━━━━━━━━━━━┓
┃  𝗜𝗪𝗜 𝗡𝗘𝗚𝗘𝗩 𝗕𝗢𝗧  ┃
┣━━━━━━━━━━━━┛
┃
┣━ 𝗡𝗦𝗙𝗪 
┃
┣⋗ /cream
┣⋗ /bdsm
┣⋗ /ahegao
┣⋗ /blowjob
┣⋗ /boobjob
┣⋗ /trap
┣⋗ /yuri
┣⋗ /nsfwneko
┣━━━━━━━━━━━━
┣━ 𝗠𝗔𝗞𝗘𝗥 
┃
┣⋗ /trash [error]
┣⋗ /trash2 [error]
┣⋗ /pensil 
┣⋗ /cmm [teks]
┣⋗ /kanna [teks]
┣⋗ /trumptweet [teks]
┣⋗ /epep [teks]
┣⋗ /tahta [teks]
┣⋗ /graffiti [teks]
┣⋗ /futuristic [teks]
┣━━━━━━━━━━━━
┣━ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥
┃
┣⋗ /ytplay [query]
┣⋗ /ytmp4 [link]
┣⋗ /pinterest [query]
┣⋗ /zerochan [query]
┣⋗ /ytmp3 [link]
┣━━━━━━━━━━━━
┣━ 𝗦𝗘𝗔𝗥𝗖𝗛
┃
┣⋗ character
┗━━━━━⟮✦⟯━━━━━
┏━━━━━━━━━━━━━━━┓
┃  ありがとうございます.┃
┣━━━━━━━━━━━━━━━┛
┃
┣━ LOL HUMAN 
┃              &
┗━ PENYEDIA REST API`
    options = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Donate', callback_data: 'https://tapbio.link/L-M0' }
                ],
            ]
        }
    }
    try {
        await lol.editMessageText(text, options)
    } catch {
        await lol.reply(text, options)
    }
}

exports.islami = async(lol) => {
    prefix = config.prefix
    text = `Islami Menu :

❏ ${prefix}listsurah
❏ ${prefix}alquran no_surah
❏ ${prefix}alquran no_surah/no_ayat
❏ ${prefix}alquran no_surah/no_ayat1-no_ayat2
❏ ${prefix}alquranaudio no_surah
❏ ${prefix}alquranaudio no_surah/no_ayat
❏ ${prefix}asmaulhusna
❏ ${prefix}kisahnabi
❏ ${prefix}jadwalsholat daerah
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}

exports.owner = async(lol) => {
    prefix = config.prefix
    text = `https://t.me/Katana_mo`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}

exports.movie = async(lol) => {
    prefix = config.prefix
    text = `Movie & Story Menu :

❏ ${prefix}drakorongoing
❏ ${prefix}lk21 query
❏ ${prefix}wattpad url_wattpad
❏ ${prefix}wattpadsearch query
❏ ${prefix}cerpen
❏ ${prefix}ceritahoror
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}


exports.anime = async(lol) => {
    prefix = config.prefix
    text = `Anime Menu :

❏ ${prefix}wait
❏ ${prefix}manga query
❏ ${prefix}anime query
❏ ${prefix}character query
❏ ${prefix}kusonime url_kusonime
❏ ${prefix}kusonimesearch query
❏ ${prefix}otakudesu url_otakudesu
❏ ${prefix}otakudesusearch query
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}

exports.randtext = async(lol) => {
    prefix = config.prefix
    text = `Random Text Menu :

❏ ${prefix}quotes
❏ ${prefix}quotesdilan
❏ ${prefix}quotesanime
❏ ${prefix}quotesimage
❏ ${prefix}faktaunik
❏ ${prefix}katabijak
❏ ${prefix}pantun
❏ ${prefix}bucin
❏ ${prefix}randomnama
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}

exports.randimage = async(lol) => {
    prefix = config.prefix
    text = `Radom Image Menu :

❏ ${prefix}art
❏ ${prefix}bts
❏ ${prefix}exo
❏ ${prefix}elf
❏ ${prefix}loli
❏ ${prefix}neko
❏ ${prefix}waifu
❏ ${prefix}shota
❏ ${prefix}husbu
❏ ${prefix}sagiri
❏ ${prefix}shinobu
❏ ${prefix}megumin
❏ ${prefix}wallnime
❏ ${prefix}chiisaihentai
❏ ${prefix}trap
❏ ${prefix}blowjob
❏ ${prefix}yaoi
❏ ${prefix}ecchi
❏ ${prefix}hentai
❏ ${prefix}ahegao
❏ ${prefix}hololewd
❏ ${prefix}sideoppai
❏ ${prefix}animefeets
❏ ${prefix}animebooty
❏ ${prefix}animethighss
❏ ${prefix}hentaiparadise
❏ ${prefix}animearmpits
❏ ${prefix}hentaifemdom
❏ ${prefix}lewdanimegirls
❏ ${prefix}biganimetiddies
❏ ${prefix}animebellybutton
❏ ${prefix}hentai4everyone
❏ ${prefix}bj
❏ ${prefix}ero
❏ ${prefix}cum
❏ ${prefix}feet
❏ ${prefix}yuri
❏ ${prefix}trap
❏ ${prefix}lewd
❏ ${prefix}feed
❏ ${prefix}eron
❏ ${prefix}solo
❏ ${prefix}gasm
❏ ${prefix}poke
❏ ${prefix}anal
❏ ${prefix}holo
❏ ${prefix}tits
❏ ${prefix}kuni
❏ ${prefix}kiss
❏ ${prefix}erok
❏ ${prefix}smug
❏ ${prefix}baka
❏ ${prefix}solog
❏ ${prefix}feetg
❏ ${prefix}lewdk
❏ ${prefix}waifu
❏ ${prefix}pussy
❏ ${prefix}femdom
❏ ${prefix}cuddle
❏ ${prefix}hentai
❏ ${prefix}eroyuri
❏ ${prefix}cum_jpg
❏ ${prefix}blowjob
❏ ${prefix}erofeet
❏ ${prefix}holoero
❏ ${prefix}classic
❏ ${prefix}erokemo
❏ ${prefix}fox_girl
❏ ${prefix}futanari
❏ ${prefix}lewdkemo
❏ ${prefix}wallpaper
❏ ${prefix}pussy_jpg
❏ ${prefix}kemonomimi
❏ ${prefix}nsfw_avatar
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}

exports.textpro = async(lol) => {
    prefix = config.prefix
    text = `Text Pro Me Menu :

❏ ${prefix}blackpink text
❏ ${prefix}neon text
❏ ${prefix}greenneon text
❏ ${prefix}advanceglow text
❏ ${prefix}futureneon text
❏ ${prefix}sandwriting text
❏ ${prefix}sandsummer text
❏ ${prefix}sandengraved text
❏ ${prefix}metaldark text
❏ ${prefix}neonlight text
❏ ${prefix}holographic text
❏ ${prefix}text1917 text
❏ ${prefix}minion text
❏ ${prefix}deluxesilver text
❏ ${prefix}newyearcard text
❏ ${prefix}bloodfrosted text
❏ ${prefix}halloween text
❏ ${prefix}jokerlogo text
❏ ${prefix}fireworksparkle text
❏ ${prefix}natureleaves text
❏ ${prefix}bokeh text
❏ ${prefix}toxic text
❏ ${prefix}strawberry text
❏ ${prefix}box3d text
❏ ${prefix}roadwarning text
❏ ${prefix}breakwall text
❏ ${prefix}icecold text
❏ ${prefix}luxury text
❏ ${prefix}cloud text
❏ ${prefix}summersand text
❏ ${prefix}horrorblood text
❏ ${prefix}thunder text
❏ ${prefix}pornhub text1 text2
❏ ${prefix}glitch text1 text2
❏ ${prefix}avenger text1 text2
❏ ${prefix}space text1 text2
❏ ${prefix}ninjalogo text1 text2
❏ ${prefix}marvelstudio text1 text2
❏ ${prefix}lionlogo text1 text2
❏ ${prefix}wolflogo text1 text2
❏ ${prefix}steel3d text1 text2
❏ ${prefix}wallgravity text1 text2
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}


exports.phoxy = async(lol) => {
    prefix = config.prefix
    text = `Photo Oxy Menu :

❏ ${prefix}shadow text
❏ ${prefix}cup text
❏ ${prefix}cup1 text
❏ ${prefix}romance text
❏ ${prefix}smoke text
❏ ${prefix}burnpaper text
❏ ${prefix}lovemessage text
❏ ${prefix}undergrass text
❏ ${prefix}love text
❏ ${prefix}coffe text
❏ ${prefix}woodheart text
❏ ${prefix}woodenboard text
❏ ${prefix}summer3d text
❏ ${prefix}wolfmetal text
❏ ${prefix}nature3d text
❏ ${prefix}underwater text
❏ ${prefix}golderrose text
❏ ${prefix}summernature text
❏ ${prefix}letterleaves text
❏ ${prefix}glowingneon text
❏ ${prefix}fallleaves text
❏ ${prefix}flamming text
❏ ${prefix}harrypotter text
❏ ${prefix}carvedwood text
❏ ${prefix}tiktok text1 text2
❏ ${prefix}arcade8bit text1 text2
❏ ${prefix}battlefield4 text1 text2
❏ ${prefix}pubg text1 text2
`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}


exports.ephoto = async(lol) => {
    prefix = config.prefix
    text = `Ephoto 360 Menu :

❏ ${prefix}wetglass text
❏ ${prefix}multicolor3d text
❏ ${prefix}watercolor text
❏ ${prefix}luxurygold text
❏ ${prefix}galaxywallpaper text
❏ ${prefix}lighttext text
❏ ${prefix}beautifulflower text
❏ ${prefix}puppycute text
❏ ${prefix}royaltext text
❏ ${prefix}heartshaped text
❏ ${prefix}birthdaycake text
❏ ${prefix}galaxystyle text
❏ ${prefix}hologram3d text
❏ ${prefix}greenneon text
❏ ${prefix}glossychrome text
❏ ${prefix}greenbush text
❏ ${prefix}metallogo text
❏ ${prefix}noeltext text
❏ ${prefix}glittergold text
❏ ${prefix}textcake text
❏ ${prefix}starsnight text
❏ ${prefix}wooden3d text
❏ ${prefix}textbyname text
❏ ${prefix}writegalacy text
❏ ${prefix}galaxybat text
❏ ${prefix}snow3d text
❏ ${prefix}birthdayday text
❏ ${prefix}goldplaybutton text
❏ ${prefix}silverplaybutton text
❏ ${prefix}freefire text

`
    await lol.editMessageText(text, {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Back', callback_data: 'help' }
                ]
            ]
        }
    })
}

exports.messageError = async(lol) => {
    await lol.reply(`Error! Please report to the [${config.owner}](${config.ownerLink}) about this`, { parse_mode: "Markdown", disable_web_page_preview: true })
}