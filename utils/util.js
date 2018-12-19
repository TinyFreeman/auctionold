const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

 function getData (url) {
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'POST';
  var header = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };
   

  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header,
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

/*
*验证身份证号码
*@param string id 身份证号码
*return  bool
*/
function regIdNo(id){

  var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  return regIdNo.test(id)
}

/*
*验证身份证号码
*@param string realname 真实姓名
*return  bool
*/
function regName(realname) {
  
  var regName = /^[\u4e00-\u9fa5]{2,4}$/;

  return regName.test(realname)
}


/*
*验证身份证号码
*@param int tel 手机号码
*return  bool
*/
function regTel(tel) {

  var regTel = /^[1][3,4,5,7,8][0-9]{9}$/;

  return regTel.test(tel)
}



/*
*倒计时
*@param int endDate2 结束时间戳
*return  int
*/
function countTime(endDate2) {
  
  var date = new Date();
  var now = date.getTime();
  var endDate = new Date(endDate2)//设置截止时间
  var end = endDate.getTime();
  var leftTime = parseInt(end) -parseInt(now); //时间差 
  return leftTime

  

}

/*
*倒计时
*@param int leftTime 剩余时间戳
*return  mixed
*/
function countMicTime(leftTime) {                           
  var d, h, m, s, ms;
  d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
  h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
  m = Math.floor(leftTime / 1000 / 60 % 60);
  s = Math.floor(leftTime / 1000 % 60);
  ms = Math.floor(leftTime % 1000);
  ms = ms < 100 ? "0" + ms : ms
  s = s < 10 ? "0" + s : s
  m = m < 10 ? "0" + m : m
  h = h < 10 ? "0" + h : h

  return d + "天" + h + "时" + m + "分" + s + "秒" + ms



}



module.exports = {
  formatTime: formatTime,
  getData: getData,
  regIdNo: regIdNo,
  regName: regName,
  regTel: regTel,
  countMicTime: countMicTime,
  countTime: countTime,
}
