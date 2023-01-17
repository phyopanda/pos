const conditional = (a,b) => {
    if (a > b) {
        return 1;
    }

    if (b > a) {
        return -1;
    }

    return 0;
}

export const SortByAlphabet = (rowA, rowB, fieldName) => {
    const a = rowA[fieldName] ? rowA[fieldName].toLowerCase() : '';
    const b = rowB[fieldName] ? rowB[fieldName].toLowerCase() : '';

    return conditional(a,b);
}

export const SortByNumber = (rowA, rowB, fieldName) => {
    const a = Number(rowA[fieldName]);
    const b = Number(rowB[fieldName]);

    return conditional(a,b);
}