const defineMacAndIP = (data) => {
    const result = {
        address: '',
        mac: ''
    }
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            data[key].map((item) => {
                if (item.family === 'IPv4' && item.mac !== '00:00:00:00:00:00') {
                    result.address = item.address;
                    result.mac = item.mac;
                }
            })
        }
    }
    return result;
}
export { defineMacAndIP }