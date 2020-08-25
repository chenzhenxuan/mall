import {request} from './request'
//请求多个数据（banner,类目）
export function getHomeMultidata(){
	return request({
		url:'/home/multidata'
	})
}

export function getHomeGoods(type, page){
return request({
		url:'/home/data',
		params: {
			type,
			page
		}
	})
}