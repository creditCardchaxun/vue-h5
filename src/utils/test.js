var db = "#/hotelDetail/21"

var reg= /[^#]/g

var kl = db.match(reg).join('')

console.log(kl)