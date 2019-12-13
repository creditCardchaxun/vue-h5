(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return
     if(clientWidth>=640){
          docEl.style.fontSize ='50px'
          localStorage.setItem('lcRem',50)
     }else{
        //  docEl.style.fontSize = 50 * (clientWidth / 540) + 'px'
         docEl.style.fontSize = clientWidth / 10.8 + 'px'
         localStorage.setItem('lcRem', clientWidth / 10.8 )
     }
    
    }
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)
