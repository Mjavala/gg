import bignumber from 'bignumber.js';

export function weiToEth (value, log) {
    const bg = new bignumber(value);
    return bg.dividedBy('1000000000000000000').toNumber();
}

export function ethToWei (value) {
    const bg = new bignumber(value);
    return bg.times('1000000000000000000').toFixed(0);
}

export function addBuffer (value) {
    const weiValue = ethToWei(value);
    return new bignumber(weiValue).plus(1).toFixed(0);
}

export function removeBuffer (value) {
    const weiValue = ethToWei(value);
    return new bignumber(weiValue).minus(100000).toFixed(0);
}

export function removeApproveBuffer (value) {
    const weiValue = ethToWei(value);
    return new bignumber(weiValue).minus(1000).toFixed(0);
}

export const formatWithThousandsSeparators = (val) => {
    return Number(val).toFixed(3);
}

export function formatSeconds (time) {
    var seconds = parseInt(time, 10);
    var days = Math.floor(seconds / (3600*24));
    seconds  -= days*3600*24;
    var hrs   = Math.floor(seconds / 3600);
    seconds  -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds  -= mnts*60;
    return (String(days).length === 1 ? `0${days}` : days) + "d " + (String(hrs).length === 1 ? `0${hrs}` : hrs) + "h " + (String(mnts).length === 1 ? `0${(mnts === 0 ? '0' : mnts < 1 ? '1' : mnts)}` : mnts) + 'm';
}

export function cleanupBigNUmbers(n) {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "k";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "m";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "b";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "t";
}