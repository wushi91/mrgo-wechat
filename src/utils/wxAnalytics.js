


const scan_open_store = (storeId)=>{
  /*数据统计上报*/
  console.log('--数据统计上报','scan_open_store','storeId',storeId)
  wx.reportAnalytics('scan_open_store', {
    storeid: storeId,
  });
}





export default {
  scan_open_store,

}

