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
                if (body.lrc !== undefined) {
                    let lrc = body.lrc.lyric
                    // Remove extra info from file
                    let data = lrc.substring(lrc.indexOf('[0'))
                    resolve(data)
                } else {
                    throw new Error("There are no lyrics for this song")
                }
            }
        ).catch(error => reject(error))
    })
}

function getCover(song_id) {
    let url = api + endpoints.song_details + song_id
    return new Promise((resolve, reject) => {
        fetch(url)
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
    let url = api + endpoints.song + song_id
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(
            body => {
                if (body.data[0].url !== null) {
                    resolve(body.data[0].url)
                } else {
                    throw new Error("There is no audio file for this song")
                }
            }
        ).catch(error => reject(error))
    })
}

export function getSong(song) {
    return new Promise((resolve, reject) => {
        Promise.all([getSongUrl(song.id), getLyrics(song.id), getCover(song.id)])
        .then((values) => {
            resolve({
                'title': song.title,
                'artist': song.artist,
                'cover': values[2],
                'audio': values[0],
                'lyrics': values[1]
            })
        }, () => reject(undefined))
    })
}