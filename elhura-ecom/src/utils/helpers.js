export const compareStrings = (string1, string2) => {
    if ( string1 < string2 ){
        return -1;
    }
    if ( string1 > string2 ){
        return 1;
    }
    return 0;
}