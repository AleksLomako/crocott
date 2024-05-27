const timeConvertor = (m) => {
    let h = Math.floor(m / (1000 * 60 * 60));
    let min = Math.floor((m % (1000 * 60 * 60)) / (1000 * 60))
    if (h < 10) {
        h = `0${h}`
    }
    if (min < 10) {
        min = `0${min}`
    }
    return `${h} : ${min}`;
};

export default timeConvertor;