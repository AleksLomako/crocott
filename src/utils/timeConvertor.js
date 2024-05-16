

const timeConvertor = (m) => {
    return (`${Math.floor(m / (1000 * 60 * 60))}:${Math.floor((m % (1000 * 60 * 60)) / (1000 * 60))}`);
};

export default timeConvertor;