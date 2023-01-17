
const { get } = window.nativeApi.device;

const localhost = {
    ip: "127.0.0.1",
    mac: '00:00:00:00:00:00',
    family: 'IPv4'
}


const NETWORK_LOCALHOST = ['lo'];
const NETWORK_WIFI = ['wlp2s0', 'Wf-Fi'];

export const checkNetworkConnection = () => {
    let networkDevices = {
        wifi: null,
        localhost: null,
        ethernet: null
    };
    const getNetworkInterfaces = get((device) => {
        const networkDevices = device.networkDevices();
        console.log(networkDevices);
        
        return device.networkInterfaces();
    });

    NETWORK_WIFI.map((value) => {
        if(getNetworkInterfaces[value]) {
            networkDevices.wifi = getNetworkInterfaces[value][0];
        }
    });

    NETWORK_LOCALHOST.map((value) => {
        if(getNetworkInterfaces[value]) {
            networkDevices.localhost = getNetworkInterfaces[value][0];
        }
    });

    return networkDevices;
}