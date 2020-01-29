function dice(max, min) {
    if (min == null)
    {
        min = 1;
    }
    return Math.floor(Math.random() * Math.floor(max)) + min;
}

module.exports = { result:dice };