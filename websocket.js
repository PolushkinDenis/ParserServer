//    "start": "node index",
// const ws = require('ws')

// const wss = new ws.Server({
//     post: 5000,
// }, () => console.log("server start on 5000"))
var fetchProductListAvito = require('./avito')
var fetchProductListAvtoRu = require('./avtoRu')

const res = [  {
    name: 'BMW 3 серия, 2002',
    price: '160 000 ₽',
    city: 'Республика Татарстан, Казань',
    image: 'https://03.img.avito.st/image/1/1.KuUcWLa2hgwK-DwMRCRKusP7hgaiW4e2qPuE.L9uljsna5i163Xh64FlS-XXILq_NxV4ZxhTlJtmJhZE',
    href: 'https://www.avito.ru/kazan/avtomobili/bmw_3_seriya_2002_2472196876',
    info: 'Битый, 325 000 км, 1.8 MT (116 л.с.), универсал, задний, бензин',
    description: 'Собственник по Птс, владею автомобилем с 2020 года. Документы все в порядке, без штрафов и залогов. Двигатель n42b18 контрактный из Европы, установлен и вписан в Птс предыдущим владельцем. До аварии автомобиль в отличном внешнем и техническом состоянии, повреждения и комплектность на фото. Кузов не гнилой, без шпатли. Помогу найти запчасти, необходимые для восстановления. Торг минимальный, обмен не интересует.',
    time: '3 недели назад',
    snippen: ''
  },
  {
    name: 'BMW 3 серия, 1992',
    price: '175 000 ₽',
    city: 'Республика Татарстан, Нижнекамский р-н, муниципальное образование город Нижнекамск, Нижнекамск',
    image: 'https://22.img.avito.st/image/1/1.S7JlXLa251tz_F1bfzF66bz_51HbX-bh0f_l.ULBcZtF-yrJAsrPKpSNy7XgYiTdogCvwG6JukOJ-anM',
    href: 'https://www.avito.ru/nizhnekamsk/avtomobili/bmw_3_seriya_1992_2265980500',
    info: '248 000 км, 1.8 MT (140 л.с.), купе, задний, бензин',
    description: 'Продаю автомобиль Bmw e36 в редком кузове купе 1992 года. Машина переваренная, свежеокрашенная. На ходу, но требует вложений Много, как никак машине 30 лет. Из плюсов: генератор и стартер после ремонта, антифриз новый, масло в редукторе новое, полностью переварен выхлоп. Документы ровные, вин читается, дублирующая табличка на месте, номер Двс совпадает (мотор не менялся, М42Б18). В придачу отдам много запчастей, в том числе салонный и наружный пластик. Есть музыка. Есть комплект зимней резины. Снята с учёта в связи с договором купли-продажи. Вопросы только по делу и По Телефону. Пожалуйста, Не Тратьте Мое Драгоценное Время Своими Глупыми Вопросами. Хотите Идеальную Е36, Есть Много Объявлений Машин ЗА 500К-700К.',
    time: '2 недели назад',
    snippen: 'Рыночная цена'
  }]

var ws = require("ws").Server;
var wss  = new ws({
  port: 5000
}, () => console.log("server start on 5000"));

wss.on('connection',  function connection(ws) {
    ws.on('message', async function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                console.log(message)
                const avitoRes = await fetchProductListAvito.fetchProductListAvito(message.filters)
                broadcastMessageAvito(avitoRes)

                const autoRu = await fetchProductListAvtoRu.fetchProductListAvtoRu(message.filters)
                broadcastMessageAutoRu(autoRu)
                // broadcastMessage(res)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

function broadcastMessageAutoRu(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}
function broadcastMessageAvito(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

// wss.on("connection", function connection(ws) {
//     ws.send("message", function (message) {
//         message = JSON.parse(message)
//         switch (message.event) {
//             case 'message':
//                 broadcastMessage(message)
//                 break
//             case 'connection':
//                 broadcastMessage(message)
//                 break
//         }
//     })
// })


// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '21.01.2021',
//     username: 'Tigras',
//     message: 'ALL ok'
// }

// function broadcastMessage(message) {
//     wss.clients.forEach(client => {
//         client.send(JSON.stringify(message))
//     })
// }