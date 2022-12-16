async function averegePriceDrom(filters) {
    console.log(filters)

    const city = filters.city.dromHref
    const city2 = filters.city2?.dromHref
    const brand = filters.brand.dromHref
    const model = filters.model.dromHref
    const priceFrom = filters.priceFrom
    const priceTo = filters.priceTo
    const yearFrom = filters.yearFrom
    const yearTo = filters.yearTo
    const sorting = filters.sorting.dromHref

    const puppeteer = require('puppeteer');
    console.log("Start")


    let urlMin = `${city}lada/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price`
    if (brand !== '') {
        urlMin = `${city}${brand}/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price`
        if (model !== '') {
            urlMin = `${city}${brand}/${model}/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price`
        }
    }
    let urlMax = `${city}lada/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order_d=desc`

    if (brand !== '') {
        urlMax = `${city}${brand}/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price&order_d=desc`
        if (model !== '') {
            urlMax = `${city}${brand}/${model}/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price&order_d=desc`
        }
    }



    console.log(urlMin)
    console.log(urlMax)

    const browser = await puppeteer.launch() //{ headless: false }
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();

    await page1.goto(urlMin, { waitUntil: 'networkidle0', timeout: 0 });
    console.log("Начало задержки")
        await page1.waitForTimeout(3000)
        console.log("Конец задержки")
    await page2.goto(urlMax, { waitUntil: 'networkidle0', timeout: 0 });

    console.log('Первый поиск')
    const searchId1 = await page1.evaluate(() => {
        let arrayOfAvto = []

        let firstSearchResults = Array.from(document.querySelectorAll('div[class="css-1nvf6xk eaczv700"]'));

        let totalSearchResults = Array.from(firstSearchResults[0].querySelectorAll('a[data-ftid="bulls-list_bull"]'));

        let arr = []
        totalSearchResults.map(item => {
            if (item !== undefined) (
                arr.push(item)
            )
        })

        arr.map(avtoItem => {
            let avto = {
                year: '',
                price: '',
                probeg: ''
            }
            let productName = avtoItem.querySelector('span[data-ftid="bull_title"]').innerText;

            let year = productName.substr(productName.length - 4)
            if (year !== undefined) {
                year = year.replace(/\s/g, '')
            }
            year = Number(year)
            avto.year = year

            let productPrice = avtoItem.querySelector(`span[data-ftid="bull_price"]`).innerText;
            productPrice = productPrice.replace('₽', '');
            productPrice = productPrice.replace(/\s/g, '')
            productPrice = productPrice.replace(/[^0-9]/g, "")
            productPrice = Number(productPrice)
            avto.price = productPrice

            // Информация
            let productInfo = ''
            // let productInfoArr = avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`);
            let productInfoArr = Array.from(avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`));
            let probeg = 0
            // avto.info = productInfoArr
            if (Array.isArray(productInfoArr)) {

                probeg = productInfoArr[productInfoArr.length - 1].innerText
                probeg = probeg.replace(/[^0-9]/g, "")
                probeg = Number(probeg)

                avto.probeg = probeg * 1000
            }

            arrayOfAvto.push(avto)

        })
        return arrayOfAvto
    })
    console.log('Второй поиск')
    const searchId2 = await page2.evaluate(() => {
        let arrayOfAvto = []

        let firstSearchResults = Array.from(document.querySelectorAll('div[class="css-1nvf6xk eaczv700"]'));

        let totalSearchResults = Array.from(firstSearchResults[0].querySelectorAll('a[data-ftid="bulls-list_bull"]'));

        let arr = []
        totalSearchResults.map(item => {
            if (item !== undefined) (
                arr.push(item)
            )
        })

        arr.map(avtoItem => {
            let avto = {
                year: '',
                price: '',
                probeg: ''
            }
            let productName = avtoItem.querySelector('span[data-ftid="bull_title"]').innerText;

            let year = productName.substr(productName.length - 4)
            if (year !== undefined) {
                year = year.replace(/\s/g, '')
            }
            year = Number(year)
            avto.year = year

            let productPrice = avtoItem.querySelector(`span[data-ftid="bull_price"]`).innerText;
            productPrice = productPrice.replace('₽', '');
            productPrice = productPrice.replace(/\s/g, '')
            productPrice = productPrice.replace(/[^0-9]/g, "")
            productPrice = Number(productPrice)
            avto.price = productPrice

            // Информация
            let productInfo = ''
            // let productInfoArr = avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`);
            let productInfoArr = Array.from(avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`));
            let probeg = 0
            // avto.info = productInfoArr
            if (Array.isArray(productInfoArr)) {

                probeg = productInfoArr[productInfoArr.length - 1].innerText
                probeg = probeg.replace(/[^0-9]/g, "")
                probeg = Number(probeg)

                avto.probeg = probeg * 1000
            }

            arrayOfAvto.push(avto)
        })
        return arrayOfAvto
    })

    const arrayOfAuto1 = searchId1
    const arrayOfAuto2 = searchId2

    console.log("REs1")
    console.log(arrayOfAuto1)
    console.log("REs2")
    console.log(arrayOfAuto2)

    await browser.close();

    const arrayOfAuto = []
    arrayOfAuto.push(...arrayOfAuto1)
    arrayOfAuto.push(...arrayOfAuto2)

    const uniq = new Set(arrayOfAuto.map(e => JSON.stringify(e)));
    const res1 = Array.from(uniq).map(e => JSON.parse(e));

    let res = []
    res.push(res1)
    ////////////////////////////////// Поиск по второму городу /////////////////////////////////////////////////////////

    if (filters.comparison === true) {
        
        let urlMin2 = `${city2}lada/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price`
        if (brand !== '') {
            urlMin2 = `${city2}${brand}/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price`
            if (model !== '') {
                urlMin2 = `${city2}${brand}/${model}/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price`
            }
        }
        let urlMax2 = `${city2}lada/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order_d=desc`
        if (brand !== '') {
            urlMax2 = `${city2}${brand}/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price&order_d=desc`
            if (model !== '') {
                urlMax2 = `${city2}${brand}/${model}/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&order=price&order_d=desc`
            }
        }


        console.log(urlMin2)
        console.log(urlMax2)

        const browser2 = await puppeteer.launch() //{ headless: false }
        const page3 = await browser2.newPage();
        const page4 = await browser2.newPage();

        await page3.goto(urlMin2, { waitUntil: 'networkidle0', timeout: 0 });
        await page4.goto(urlMax2, { waitUntil: 'networkidle0', timeout: 0 });
        console.log('Третий поиск')

        const searchId3 = await page3.evaluate(() => {
            let arrayOfAvto = []

            let firstSearchResults = Array.from(document.querySelectorAll('div[class="css-1nvf6xk eaczv700"]'));

            let totalSearchResults = Array.from(firstSearchResults[0].querySelectorAll('a[data-ftid="bulls-list_bull"]'));

            let arr = []
            totalSearchResults.map(item => {
                if (item !== undefined) (
                    arr.push(item)
                )
            })

            arr.map(avtoItem => {
                let avto = {
                    year: '',
                    price: '',
                    probeg: ''
                }
                let productName = avtoItem.querySelector('span[data-ftid="bull_title"]').innerText;

                let year = productName.substr(productName.length - 4)
                if (year !== undefined) {
                    year = year.replace(/\s/g, '')
                }
                year = Number(year)
                avto.year = year

                let productPrice = avtoItem.querySelector(`span[data-ftid="bull_price"]`).innerText;
                productPrice = productPrice.replace('₽', '');
                productPrice = productPrice.replace(/\s/g, '')
                productPrice = productPrice.replace(/[^0-9]/g, "")
                productPrice = Number(productPrice)
                avto.price = productPrice

                // Информация
                let productInfo = ''
                // let productInfoArr = avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`);
                let productInfoArr = Array.from(avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`));
                let probeg = 0
                // avto.info = productInfoArr
                if (Array.isArray(productInfoArr)) {

                    probeg = productInfoArr[productInfoArr.length - 1].innerText
                    probeg = probeg.replace(/[^0-9]/g, "")
                    probeg = Number(probeg)

                    avto.probeg = probeg * 1000
                }

                arrayOfAvto.push(avto)

            })
            return arrayOfAvto
        })
        console.log('Четвертый поиск')

        const searchId4 = await page4.evaluate(() => {
            let arrayOfAvto = []

            let firstSearchResults = Array.from(document.querySelectorAll('div[class="css-1nvf6xk eaczv700"]'));

            let totalSearchResults = Array.from(firstSearchResults[0].querySelectorAll('a[data-ftid="bulls-list_bull"]'));

            let arr = []
            totalSearchResults.map(item => {
                if (item !== undefined) (
                    arr.push(item)
                )
            })

            arr.map(avtoItem => {
                let avto = {
                    year: '',
                    price: '',
                    probeg: ''
                }
                let productName = avtoItem.querySelector('span[data-ftid="bull_title"]').innerText;

                let year = productName.substr(productName.length - 4)
                if (year !== undefined) {
                    year = year.replace(/\s/g, '')
                }
                year = Number(year)
                avto.year = year

                let productPrice = avtoItem.querySelector(`span[data-ftid="bull_price"]`).innerText;
                productPrice = productPrice.replace('₽', '');
                productPrice = productPrice.replace(/\s/g, '')
                productPrice = productPrice.replace(/[^0-9]/g, "")
                productPrice = Number(productPrice)
                avto.price = productPrice

                // Информация
                let productInfo = ''
                // let productInfoArr = avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`);
                let productInfoArr = Array.from(avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`));
                let probeg = 0
                // avto.info = productInfoArr
                if (Array.isArray(productInfoArr)) {

                    probeg = productInfoArr[productInfoArr.length - 1].innerText
                    probeg = probeg.replace(/[^0-9]/g, "")
                    probeg = Number(probeg)

                    avto.probeg = probeg * 1000
                }

                arrayOfAvto.push(avto)
            })
            return arrayOfAvto
        })
        const arrayOfAuto3 = searchId3
        console.log("Начало задержки")
        await page1.waitForTimeout(5000)
        console.log("Конец задержки")
        const arrayOfAuto4 = searchId4

        console.log("REs3")
        console.log(arrayOfAuto3)
        console.log("REs4")
        console.log(arrayOfAuto4)

        await browser2.close();

        const arrayOfAuto1 = []
        arrayOfAuto1.push(...arrayOfAuto3)
        arrayOfAuto1.push(...arrayOfAuto4)

        const uniq2 = new Set(arrayOfAuto1.map(e => JSON.stringify(e)));
        const res2 = Array.from(uniq2).map(e => JSON.parse(e));

        res.push(res2)
    }

    console.log("Итог")
    console.log(res)

    return res

}

module.exports.averegePriceDrom = averegePriceDrom
