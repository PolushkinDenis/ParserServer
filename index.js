const express = require("express")
const sequelize = require('./db')
const router = require('./routes/index')
var bodyParser = require('body-parser')
const models = require('./models/models')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
var fetchProductListAvito = require('./avito')
var fetchProductListAvtoRu = require('./avtoRu')
var fetchProductListAvtoRuCatptha = require('./avtoRuCaptcha')
const cors = require('cors')
// var averegePriceAvito = require('./routes/averagePrice.routes')
var averegePriceAvito = require('./routes/averagePrice2.routes')

var averegePriceAvtoRu = require('./routes/averegePriceAutoRu.routes')
let fetchProductListDrom = require('./drom')
let averegePriceDrom = require('./routes/averegePriceDrom.routes')

const PORT = 5000

const app = express()
const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()

var jsonParser = bodyParser.json()
app.use(cors())

app.use('/api', jsonParser, router)
// app.use('/api/auto', jsonParser, require('./routes/avito.routes'))


const testDAta =
  [
    { year: 2022, price: 11480000, probeg: 11000 },
    { year: 2010, price: 2448220, probeg: 331000 },
    { year: 2015, price: 5203070, probeg: 138000 },
    { year: 2018, price: 7144550, probeg: 103000 },
    { year: 2018, price: 6948270, probeg: 96000 },
    { year: 2013, price: 3193070, probeg: 285000 },
    { year: 1997, price: 2510000, probeg: 234000 },
    { year: 2015, price: 4900000, probeg: 152000 },
    { year: 1995, price: 1360000, probeg: 403000 },
    { year: 2018, price: 5620000, probeg: 114000 },
    { year: 2010, price: 2680000, probeg: 494000 },
    { year: 2012, price: 3310000, probeg: 280000 },
    { year: 1997, price: 820000, probeg: 330000 },
    { year: 2011, price: 5480000, probeg: 69000 },
    { year: 2009, price: 2210000, probeg: 161000 },
    { year: 2015, price: 4890000, probeg: 183000 },
    { year: 2015, price: 4920000, probeg: 212000 },
    { year: 2002, price: 1300000, probeg: 322000 },
    { year: 2008, price: 3480000, probeg: 194000 },
    { year: 2014, price: 3590000, probeg: 206000 },
    { year: 1992, price: 1680000, probeg: 286000 }
  ]

const testData1 = [
  {
    name: 'Лада Калина, 2008',
    price: '155 000 ',
    city: 'Кетово',
    image: 'https://s.auto.drom.ru/photo/XjSVnXJw3W_r_dwpNg9ThGnK1Hdz4FTdr6E8iD1HjJgjweHEmcvba8CMlTRn0V6Gem7xFGZ07a4HowjLjzsif7JW5t4.jpg',
    href: 'https://ketovo.drom.ru/lada/kalina/48517809.html',
    iframeSrc: '',
    info: '1.4 л (89 л.с.),бензин,механика,передний,167 тыс. км',
    description: '',
    time: '17 минут назад',
    snippen: 'хорошая цена'
  },
  {
    name: 'Лада 2114 Самара, 2008',
    price: '90 000 ',
    city: 'Орехово-Зуево',
    image: 'https://s.auto.drom.ru/photo/huGHA5bbOK6lX5mgNWV8xm8mvgIVa5yHgajZrEXWnwSGSn4fU2JkRZype45HExJur82DqfsZn-UNvh5sAkgSHdFRXOk.jpg',
    href: 'https://orehovo-zuevo.drom.ru/lada/2114/48547873.html',
    iframeSrc: '',
    info: '1.6 л (81 л.с.),бензин,механика,передний,150 тыс. км',
    description: '',
    time: '18 минут назад',
    snippen: 'без оценки'
  }
]

let page
let browser 

app.ws('/', (ws, req) => {
  ws.on('message', async function (message) {
    message = JSON.parse(message)
    console.log("Пред switch")
    switch (message.event) {
      case 'capcha':
        if (page !== undefined) {
          console.log("Страница есть")
          try {
            const capcha = message.message
            console.log(capcha)
            const autoRuCapthca = await fetchProductListAvtoRuCatptha.fetchProductListAvtoRuCatptha(page, browser, capcha)
            const result = {
              event: 'message',
              data: autoRuCapthca
            }
            ws.send(JSON.stringify(result))
          }
          catch (e) {
            console.log("Ошибка автору каптча", e)
          }
        }
        break;
         
      case 'message':
        console.log(message)
        console.log("MEssage")
        if (message.filters.drom) {
          try {
            const dromRes = await fetchProductListDrom.fetchProductListDrom(message.filters)
            console.log(dromRes)
            const result = {
              event: 'message',
              data: dromRes
            }
            ws.send(JSON.stringify(result))
          }
          catch (e) {
            console.log("Ошибка", e)
          }
        }
        if (message.filters.avito) {
          try {
            const avitoRes = await fetchProductListAvito.fetchProductListAvito(message.filters)
            const result = {
              event: 'message',
              data: avitoRes
            }
            ws.send(JSON.stringify(result))
          }
          catch (e) {
            console.log("Ошибка", e)
          }
        }
        if (message.filters.autoRu) { 
            console.log(page)
            try {
              const autoRu = await fetchProductListAvtoRu.fetchProductListAvtoRu(message.filters)
              console.log(autoRu)
              page = autoRu.page
              browser = autoRu.browser 
              if (page !== undefined) {
                const result = {
                  event: 'message',
                  data: 'capcha',
                  capchaSrc: autoRu.capchaSrc
                }
                ws.send(JSON.stringify(result))
              }
              else {
                const result = {
                  event: 'message',
                  data: autoRu
                }
                ws.send(JSON.stringify(result))
              }


            }
            catch (e) {
              console.log("Ошибка", e)
            }
        }
        console.log('Если ош')

        break;
      case 'avarage':
        console.log('avarage')
        if (message.filters.drom) {

          try {
            const averPriceDrom = await averegePriceDrom.averegePriceDrom(message.filters)
            const result = {
              event: 'avarage',
              type: 'drom',
              data: averPriceDrom
            }
            ws.send(JSON.stringify(result))
          }
          catch (e) {
            console.log("Ошибка", e)
          }
        }
        if (message.filters.avito) {

          try {
            const averPriceAvito = await averegePriceAvito.averegePriceAvito(message.filters)
            const result = {
              event: 'avarage',
              type: 'avito',
              data: averPriceAvito
            }
            ws.send(JSON.stringify(result))
          }
          catch (e) {
            console.log("Ошибка", e)
          }
        }
        if (message.filters.autoRu) {
          try {
            const averPriceAvtoRu = await averegePriceAvtoRu.averegePriceAvtoRu(message.filters)
            const result = {
              event: 'avarage',
              type: 'autoRu',
              data: averPriceAvtoRu
            }
            ws.send(JSON.stringify(result))
          }
          catch (e) {
            console.log("Ошибка", e)
          }
        }
        console.log("Средняя цена")
        break;

      case 'connection':
        console.log("ПоДКЛЮЧЕНИЕ УСТАНОВЛЕНО")
        broadcastMessage(message)
        break;
    }
  })
})
app.use(errorHandler)

async function start() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Erro', e.message)
    process.exit(1)
  }
}

start()

function broadcastMessage(message, id) {
  aWss.clients.forEach(client => {
    client.send(JSON.stringify(message))
  })
}

function broadcastMessageAutoRu(message, id) {
  aWss.clients.forEach(client => {
    const result = {
      event: 'message',
      data: message
    }
    client.send(JSON.stringify(result))
  })
}
function broadcastMessageAvito(message, id) {
  aWss.clients.forEach(client => {
    const result = {
      event: 'message',
      data: message
    }
    client.send(JSON.stringify(result))
  })
}
function broadcastMessageDrom(message, id) {

  // const result = {
  //   event: 'message',
  //   data: message
  // }
  // console.log('Drom')
  // aWss.clients[1].send(JSON.stringify(result))

  // aWss.clients.forEach(client => {
  //   console.log(aWss.clients)
  //   const result = {
  //     event: 'message',
  //     data: message
  //   }
  //   console.log('Drom')
  //   client.send(JSON.stringify(result))
  // })
}
function broadcastMessageAvaragePriceAvito(message, id) {
  aWss.clients.forEach(client => {
    const result = {
      event: 'avarage',
      type: 'avito',
      data: message
    }
    client.send(JSON.stringify(result))
  })
}
function broadcastMessageAvaragePriceAvtoRu(message, id) {
  aWss.clients.forEach(client => {
    const result = {
      event: 'avarage',
      type: 'autoRu',
      data: message
    }
    client.send(JSON.stringify(result))
  })
}
function broadcastMessageAvaragePriceDrom(message, id) {
  aWss.clients.forEach(client => {
    const result = {
      event: 'avarage',
      type: 'drom',
      data: message
    }
    client.send(JSON.stringify(result))
  })
}
// app.listen(PORT, () => {
//     // fetchProductList(url);
//     // console.log( fetchProductListAvtoRu.fetchProductListAvtoRu())
//     console.log(`App has been started on port ${PORT}...`)
// })