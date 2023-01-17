
export const generateColor = (labels) => {
    let colorCode = {r: 0, g: 0, b: 0, a: 1};

    let colorSet = [];

    for(let x =0; x<labels.length; x++) {
        let y = 255 / labels.length;
        let intvalue = Math.floor(y);
        colorCode.r = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        colorCode.g = Math.floor(Math.random() * (255 - 0 + 1)) + 0;
        colorCode.b = Math.floor(Math.random() * (255 - 0 + 1)) + 0;

        colorSet.push(`rgba(${colorCode.r}, ${colorCode.g}, ${colorCode.b} , 1)`);
    }
    return colorSet;

}

