const processingProgramData = (tvProgram) => {
    let data = [];
    if (tvProgram) {
        if (tvProgram.length !== 0) {
            tvProgram.forEach(element => {
                let nowTime = new Date().getTime();
                if (element.stop >= nowTime && nowTime >= element.start) {
                    let newProgramDataList = {}
                    newProgramDataList.desc = element.desc;
                    newProgramDataList.title = element.title;
                    newProgramDataList.active = true;
                    newProgramDataList.timeout = Math.round((element.stop - nowTime) / 1000);
                    let dateTime = convertTvProgramDate(element.start, element.stop);
                    newProgramDataList.dateInfo = dateTime;
                    data.push(newProgramDataList);
                }
                else if (element.start >= nowTime) {
                    let newProgramDataList = {}
                    newProgramDataList.desc = element.desc;
                    newProgramDataList.title = element.title;
                    newProgramDataList.active = false;
                    newProgramDataList.timeout = '';
                    let dateTime = convertTvProgramDate(element.start, element.stop);
                    newProgramDataList.dateInfo = dateTime;
                    data.push(newProgramDataList);
                }
                else {
                    let newProgramDataList = {}
                    newProgramDataList.desc = element.desc;
                    newProgramDataList.title = element.title;
                    newProgramDataList.active = '';
                    newProgramDataList.timeout = '';
                    let dateTime = convertTvProgramDate(element.start, element.stop);
                    newProgramDataList.dateInfo = dateTime;
                    data.push(newProgramDataList);
                }
            });
        }
    }

    function convertTvProgramDate(startDate, stopDate) {
        let startDay;
        let stratMonth;
        let startHours;
        let startMinutes;
        let stopHours;
        let stopMinutes;
        if (new Date(startDate).getDate() < 10) {
            startDay = `0${(new Date(startDate).getDate())}`;
        }
        else {
            startDay = new Date(startDate).getDate();
        }
        if (new Date(startDate).getMonth() + 1 < 10) {
            stratMonth = `0${(new Date(stopDate).getMonth() + 1)}`;
        }
        else {
            stratMonth = new Date(stopDate).getMonth() + 1;
        }
        if (new Date(startDate).getHours() < 10) {
            startHours = `0${new Date(startDate).getHours()}`;
        }
        else {
            startHours = new Date(startDate).getHours();
        }
        if (new Date(startDate).getMinutes() < 10) {
            startMinutes = `0${new Date(startDate).getMinutes()}`;
        }
        else {
            startMinutes = new Date(startDate).getMinutes();
        }

        if (new Date(stopDate).getHours() < 10) {
            stopHours = `0${new Date(stopDate).getHours()}`;
        }
        else {
            stopHours = new Date(stopDate).getHours();
        }
        if (new Date(startDate).getMinutes() < 10) {
            stopMinutes = `0${new Date(stopDate).getMinutes()}`;
        }
        else {
            stopMinutes = new Date(stopDate).getMinutes();
        }

        let durationTime = duration(startDate, stopDate)
        return `${startDay}.${stratMonth} / ${startHours}:${startMinutes} - ${stopHours}:${stopMinutes} / ${durationTime}`;
    }

    function duration(startDate, stopDate) {
        let seconds = (stopDate - startDate) / 1000
        let h = Math.floor(seconds / 3600)
        let m = Math.floor(seconds % 3600 / 60);
        if (h < 10) {
            h = `0${h}`
        }
        if (m < 10) {
            m = `0${m}`
        }
        return `${h}:${m}`
    }
    return data;
}

export default processingProgramData;