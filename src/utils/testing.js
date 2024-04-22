function createPlayer(link, player_src) {
    const newVideo = document.createElement('video');
    newVideo.id = 'videoStream';
    newVideo.className = 'video-js vjs-default-skin';
    newVideo.style.width = 640 + 'px'
    newVideo.style.height = 480 + 'px'
    newVideo.setAttribute("controls", "controls");
    newVideo.setAttribute("autoplay", "any");
    newVideo.setAttribute("muted", "muted");
    newVideo.setAttribute('data-setup', '{ "fluid": false,  "inactivityTimeout": 0}');
    document.getElementById('video').append(newVideo);
    const newSource = document.createElement('source');

    if (link.split('.').slice(-1)[0] === 'mp4') {
        console.log(link.split('.').slice(-1)[0]);
        newSource.type = "video/mp4";
    }

    else if (link.split('.').slice(-1)[0] === 'm3u8') {
        console.log(link.split('.').slice(-1)[0]);
        newSource.type = "application/x-mpegURL";
    }
    newSource.src = link;
    document.getElementById('videoStream').appendChild(newSource)
    const sp = document.createElement('script');
    sp.setAttribute('type', 'text/javascript');
    sp.src = player_src;
    document.getElementById('videoStream').appendChild(sp);
}


// MAIN 
{/* <div class="container">
    <div class="main__container-wrapper">
        <button onclick="createPlayer(
            link='https://crackle-xumo.amagi.tv/playlist.m3u8', 
            player_src = 'js/player.js'
        )">TEST</button>
        <div id="video" class="video-style">
        </div>
    </div>
</div> */}



// // TEST



// // const authorization = mainApi.createHeaders("test@crocott.com", "1111");
// const authorization = mainApi.createHeadersWithCode("407902631853")
// const nameDevice = "LG 801686460"
// const dataForLogin = {
//     "project": {
//         "name": "CrocOTT",
//     },
//     "os": {
//         "name": "webos",
//         "version": "02.08.09",
//         "ram_free": 0
//     },
//     "cpu_brand": "Lg"
// }

// function testingAPI() {



//     // mainApi.getInfo()
//     //     .then((res) => {
//     //         console.log(res);

//     //     })

//     // mainApi.getListDevices(authorization)
//     //     .then((res) => {
//     //         console.log(res);

//     //     })

//     // mainApi.addDevice(authorization, nameDevice)


//     //     .then((res) => {
//     //         console.log(res);

//     //     })


//     dataForLogin.id = "660288ddb9f70b3c79e555a6";
//     dataForLogin.project.version = "1.4.6";
//     dataForLogin.os.version = "02.08.09"
//     dataForLogin.os.ram_total = 2;
//     dataForLogin.os.arch = nameDevice;
//     console.log(dataForLogin);



//     mainApi.login(authorization, dataForLogin)
//         .then((res) => {
//             console.log(res);

//             localStorage.setItem('jwt', res.data.access_token);
//             console.log(localStorage.getItem('jwt'));
//         })
//         .then(() => {
//             // mainApi.getProfile()
//             mainApi.getFullContent()
//                 .then((res) => {
//                     console.log(res);

//                 })

//         })

// }

// testingAPI()


{/* <script>
webOS.deviceInfo(function (device) {
  console.log(device);
})
var appId = webOS.fetchAppId();
console.log(appId);
webOS.fetchAppInfo(function (info) {
  console.log(info);
});
</script> */}