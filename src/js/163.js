// NetEase Cloud Music API.

const api = 'https://music.linkorg.club/'
const endpoints = {
    'search': 'search?keywords=',
    'song': 'song/url?id=',
    'lyrics': 'lyric?id=',
    'song_details': 'song/detail?ids='
}

export function search(keywords) {
    return new Promise((resolve, reject) => {
        fetch(api + endpoints.search + keywords)
        .then(res => res.json())
        .then(
            body => {
                let songs = body.result.songs
                let list = []
                songs.forEach(element => {
                    list.push({
                        'id': element.id,
                        'title': element.name,
                        'artist': element.artists[0].name,
                        'duration': element.duration / 1000
                    })
                });
                resolve(list)
            },
            () => {
                // Failed
                reject(Error("Couldn't make request"));
            }
        )
    });
}

function getLyrics(song_id) {
    return new Promise((resolve, reject) => {
        fetch(api + endpoints.lyrics + song_id)
        .then(res => res.json())
        .then(
            body => {
                let lrc = body.lrc.lyric
                // Do some lrc processing
                resolve(lrc)
            },
            () => {
                reject(undefined)
            }
        )
    })
}

function getCover(song_id) {
    return new Promise((resolve, reject) => {
        fetch(api + endpoints.song_details + song_id)
        .then(res => res.json())
        .then(
            body => {
                resolve(body.songs[0].al.picUrl)
            },
            () => {
                reject(undefined)
            }
        )
    })
    
}

function getSongUrl(song_id){
    return new Promise((resolve, reject) => {
        fetch(api + endpoints.song + song_id)
        .then(res => res.json())
        .then(
            body => {
                resolve(body.data[0].url)
            },
            () => {
                reject(undefined)
            }
        )
    })
}

export function getSong(song) {
    return new Promise((resolve, reject) => {
        Promise.all([getSongUrl(song.id), getLyrics(song.id)])
        .then((values) => {
            resolve({
                'title': song.title,
                'artist': song.artist,
                'cover': song.cover,
                'song_url': values[0],
                'lyrics': values[1]
            })
        }, () => reject(undefined))
    })
}