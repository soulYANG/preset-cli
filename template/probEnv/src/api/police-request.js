import request from "../utils/http";
// 作案方案

export function queryMethods(options) {
    return request('get', '/minor/policeJugment/meansQueryAll',options)
}

export function saveMethods(options) {
    return request('post', '/minor/policeJugment/meansSave', options)
}

export function updateMethods(options) {
    return request('post', '/minor/policeJugment/meansUpdate', options)
}

export function deleteMethods(id) {
    return request('get', `/minor/policeJugment/meansDelete/${id}`)
}


export function updateMethodsEnable(options) {
    return request('get', `/minor/policeJugment/meansUpdateEnable/${options.id}/${options.enable}`)
}

// 作案地点

export function queryAddress(options) {
    return request('get', '/minor/policeJugment/addressQueryAll',options)
}

export function updateAddressEnable(options) {
    return request('get', `/minor/policeJugment/addressUpdateEnable/${options.id}/${options.enable}`)
}

export function saveAddress(options) {
    return request('post', '/minor/policeJugment/addressSave', options)
}

export function updateAddress(options) {
    return request('post', '/minor/policeJugment/addressUpdate', options)
}

export function deleteAddress(id) {
    return request('get', `/minor/policeJugment/addressDelete/${id}`)
}

//作案时间
export function queryTime(options) {
    return request('get', '/minor/policeJugment/timeQueryAll',options)
}

export function saveTime(options) {
    return request('post', '/minor/policeJugment/timeSave', options)
}

export function updateTimeEnable(options) {
    return request('get', `/minor/policeJugment/timeUpdateEnable/${options.id}/${options.enable}`)
}

export function updateTime(options) {
    return request('post', '/minor/policeJugment/timeUpdate', options)
}

export function deleteTime(id) {
    return request('get', `/minor/policeJugment/timeDelete/${id}`)
}


// 作案描述
export function queryDescription(options) {
    return request('get', '/minor/policeJugment/detailQueryAll',options)
}

export function saveDescription(options) {
    return request('post', '/minor/policeJugment/detailSave', options)
}

export function updateDescriptionEnable(options) {
    return request('get', `/minor/policeJugment/detailUpdateEnable/${options.id}/${options.enable}`)
}

export function updateDescription(options) {
    return request('post', '/minor/policeJugment/detailUpdate', options)
}

export function deleteDescription(id) {
    return request('get', `/minor/policeJugment/detailDelete/${id}`)
}


//

export function getPoliceInfoData(payload) {
    return request('get', '/minor/policeJugment/queryList', payload)
}
export function getPoliceJugment(payload) {
    return request('get', '/minor/policeJugment/policeMonitorInfoQueryAll', payload)
}
export function getWordCloud(payload) {
    return request('get', '/minor/policeJugment/policeKeywordQueryKeyword', payload)
}
export function getMonitorInfo(payload) {
    return request('get', '/minor/policeJugment/policeMonitorQueryAll', payload)
}
export function getWordCloudInfo(payload) {
    return request('get', '/minor/policeJugment/policeKeywordQueryAllSort', payload)
}
export function getPoliceMonitorInfo(payload) {
    return request('get', '/minor/policeJugment/policeMonitorQueryAll', payload)
}
export function queryMonthly(payload) {
    return request('get', '/minor/policeJugment/policeTrendQueryByMonth', payload)
}
export function queryYearly(payload) {
    return request('get', '/minor/policeJugment/policeTrendQueryByYear', payload)
}