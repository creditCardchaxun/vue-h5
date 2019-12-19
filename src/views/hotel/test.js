var ss ="2019-12-19"
var kk = "2019-12-27"

var rse = DateDiff(ss,kk)

console.log(rse)


function DateDiff(sDate1, sDate2) {  //日期格式 2019-12-18
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])    //转换为12-18-2019格式
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)    //把相差的毫秒数转换为天数
  return iDays
}