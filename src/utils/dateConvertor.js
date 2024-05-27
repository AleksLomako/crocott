const dateConvertor = (d) => {
    let day;
    let month;
    let year;
    if (new Date(d).getDate() < 10) {
        day = `0${(new Date(d).getDate())}`;
    }
    else {
        day = new Date(d).getDate();
    }
    if (new Date(d).getMonth() + 1 < 10) {
        month = `0${(new Date(d).getMonth() + 1)}`;
    }
    else {
        month = new Date(d).getMonth() + 1;
    }
    year = new Date(d).getFullYear()

    return `${day}.${month}.${year}`;
}

export default dateConvertor;