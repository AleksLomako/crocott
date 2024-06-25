// Parse streams
function parseStreams(content) {
    const streams = [];
    content.data.packages.forEach(packag => {
        if (packag.streams.length !== 0) {
            packag.streams.forEach(stream => {
                streams.push(stream)
            });
        }
    })
    localStorage.setItem('streams_crocOTT', JSON.stringify(streams))
    return streams;
}

// Parse vods
function parseVods(content) {
    const movies = { 'data': {} };
    const vodsList = [];
    movies.data = { "packages": [] }
    content.data.packages.forEach(packag => {
        if (packag.vods.length !== 0) {
            movies.data.packages.push(packag)
            packag.vods.forEach(vod => {
                vodsList.push(vod)
            });
        }
    })
    localStorage.setItem('movies_crocOTT', JSON.stringify(movies))
    return vodsList;
}

// Parse serials
function parseSerials(content) {
    const serials = [];
    content.data.packages.forEach(pack => {
        // create serials
        if (pack.serials.length !== 0) {
            pack.serials.forEach(serial => {
                serials.push(serial)
            });
        }
    })
    localStorage.setItem('serials_crocOTT', JSON.stringify(serials))
    return serials;
}

export { parseStreams, parseVods, parseSerials };