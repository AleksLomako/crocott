let deviceData = `function createDeviceData() {
    let deviceDataCrocott = {
        "project": {
            "name": "CrocOTT",
            "version": "1.4.6"
        },
        "os": {
            "name": "webos",
            "ram_free": 0
        },
        "cpu_brand": "Lg"
    }

    if (webOS.platform.tv === true) {
        webOS.deviceInfo(function (device) {
            console.log(device);
            deviceDataCrocott.os.version = device.version;
            deviceDataCrocott.os.arch = device.modelName;
            deviceDataCrocott.os.ram_total = Math.round(Number((device.ddrSize).replace("G", '')))
            localStorage.setItem("deviceData_Crocott", JSON.stringify(deviceDataCrocott))
        })
    } else {
        console.log('This device is not TV.');
        deviceDataCrocott.os.version = "02.08.09";
        deviceDataCrocott.os.arch = "LG TESTING";
        deviceDataCrocott.os.ram_total = Math.round(Number(("2.5G").replace("G", '')))
        localStorage.setItem("deviceData_Crocott", JSON.stringify(deviceDataCrocott))
    }
}
createDeviceData()`
eval(deviceData)