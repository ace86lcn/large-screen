import request from '../utils/request'

export const BIGSCREEN = (params = {}) => request.get('/worker/SmallMenu/bigScreen', { params: params })