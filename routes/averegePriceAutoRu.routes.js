

async function averegePriceAvtoRu(filters) {
    const cookie = require('../cookie')

    const puppeteer = require('puppeteer');
    const city = filters.city.autoRuHref
    const brand = filters.brand.hrefAutoRu
    const model = filters.model.hrefAutoRu
    const priceFrom = filters.priceFrom
    const priceTo = filters.priceTo
    const yearFrom = filters.yearFrom
    const yearTo = filters.yearTo
    const sorting = filters.sorting.autoRuSorting

    //const urlMin = `https://auto.ru/${city}/cars/${brand}/all?sort=price-asc&year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //const urlMax = `https://auto.ru/${city}/cars/${brand}/all?sort=price-desc&year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`

    let urlMin = `https://auto.ru/${city}/cars/${brand}/all?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    if (city === 'all') {
        urlMin = `https://auto.ru/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
        if (brand !== '') {
            urlMin = `https://auto.ru/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            if (model !== '') {
                urlMin = `https://auto.ru/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            }
        }
    }
    if (city !== 'all') {
        if (brand === '') {
            urlMin = `https://auto.ru/${city}/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
        }
        else {
            urlMin = `https://auto.ru/${city}/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            if (model !== '') {
                urlMin = `https://auto.ru/${city}/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            }
        }
    }

    let urlMax = `https://auto.ru/${city}/cars/${brand}/all?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    if (city === 'all') {
        urlMax = `https://auto.ru/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
        if (brand !== '') {
            urlMax = `https://auto.ru/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            if (model !== '') {
                urlMax = `https://auto.ru/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            }
        }
    }
    if (city !== 'all') {
        if (brand === '') {
            urlMax = `https://auto.ru/${city}/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
        }
        else {
            urlMax = `https://auto.ru/${city}/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            if (model !== '') {
                urlMax = `https://auto.ru/${city}/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
            }
        }
    }


    console.log(urlMin)
    console.log(urlMax)

    console.log("Start")
    const browser = await puppeteer.launch() //{ headless: false }
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();
    let a = 0
    for (a = 0; a < cookie.length; a++) {
        await page1.setCookie(cookie[a])
        await page2.setCookie(cookie[a])

    }
    const urlMinSort = urlMin + '&sort=price-asc'
    const urlMaxSort = urlMax + '&sort=price-desc'

    await page1.goto(urlMinSort, { waitUntil: 'domcontentloaded', timeout: 0 });
    console.log("Начало задержки")
    await page1.waitForTimeout(3000)
    console.log("Конец задержки")
    await page2.goto(urlMaxSort, { waitUntil: 'domcontentloaded', timeout: 0 });

    console.log("Browser Ok")


    // await page.screenshot({ path: "авторуКапча.png", fullPage: true })

    const checkCaptcha1 = await page1.$('input[class="CheckboxCaptcha-Button"]');
    const checkCaptcha2 = await page2.$('input[class="CheckboxCaptcha-Button"]');

    if (checkCaptcha1 !== null) {
        await checkCaptcha1.click()
        console.log("Проход капчи")
        const navigationPromiseCaptcha = page1.waitForSelector('div[class^="GeoSelect__title-wkExE"]');
        await navigationPromiseCaptcha
    }
    else {
        console.log("Капчи нет")
    }
    if (checkCaptcha2 !== null) {
        await checkCaptcha2.click()
        console.log("Проход капчи")
        const navigationPromiseCaptcha = page2.waitForSelector('div[class^="GeoSelect__title-wkExE"]');
        await navigationPromiseCaptcha
    }
    else {
        console.log("Капчи нет")
    }

    const navigationPromiseSelector1 = page1.waitForSelector('div[class="ListingGeoRadiusCounters__item"]');
    await navigationPromiseSelector1
    const navigationPromiseSelector2 = page2.waitForSelector('div[class="ListingGeoRadiusCounters__item"]');
    await navigationPromiseSelector2

    const setLocation1 = await page1.$('div[class="ListingGeoRadiusCounters__item"]');
    const setLocation2 = await page2.$('div[class="ListingGeoRadiusCounters__item"]');

    if (setLocation1 !== null) {
        await setLocation1.click()
        console.log("Открыто модальное окно для выбора города")
    }
    else {
        console.log("Кнопка показа обьявлений не доступна")
    }

    if (setLocation2 !== null) {
        await setLocation2.click()
        console.log("Открыто модальное окно для выбора города")
    }
    else {
        console.log("Кнопка показа обьявлений не доступна")
    }



    const searchPromiseSelector1 = page1.waitForSelector('div[class="ListingItem"]', { timeout: 0 });
    console.log('Начало ожидания первой страницы для обьявлений')
    await searchPromiseSelector1
    console.log('Конец ожидания первой страницы для обьявлений')
    const searchPromiseSelector2 = page2.waitForSelector('div[class="ListingItem"]', { timeout: 0 });
    console.log('Начало ожидания второй страницы для обьявлений')
    await searchPromiseSelector2
    console.log('Конец ожидания второй страницы для обьявлений')

    await page1.screenshot({ path: "автору1.png", fullPage: true })
    await page2.screenshot({ path: "автору2.png", fullPage: true })


    //Поиск авто
    const searchId1 = await page1.evaluate(() => {
        let arrayOfAvto = []
        let totalSearchResults = Array.from(document.querySelectorAll('div[class="ListingItem"]'));
        let arr = []

        totalSearchResults.map(item => {
            if (item !== undefined) (
                arr.push(item)
            )
        })

        // Количество обьявлений
        let countOfAutoString
        if (document.querySelector(`button[class="Button_color_blue"] .ButtonWithLoader__content`) !== null) {
            countOfAutoString = document.querySelector(`button[class="Button_color_blue"] .ButtonWithLoader__content`).innerText;
            countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")
            arrayOfAvto.push(countOfAutoString)
        }


        arr.map(avtoItem => {
            let avto = {
                year: '',
                price: '',
                probeg: ''
            }
            let productYear = avtoItem.querySelector('div[class="ListingItem__year"]').innerText;
            productYear = Number(productYear)
            avto.year = productYear

            if (avtoItem.querySelector(`div[class="ListingItemPrice__content"]`) !== null) {
                let productPrice = avtoItem.querySelector(`div[class="ListingItemPrice__content"]`).innerText;
                productPrice = productPrice.replace('₽', '');
                productPrice = productPrice.replace(/\s/g, '')
                productPrice = productPrice.replace(/[^0-9]/g, "")
                productPrice = Number(productPrice)
                avto.price = productPrice
            }

            //Пробег
            if (avtoItem.querySelector(`div[class="ListingItem__kmAgeAndSalonInfo"]`) !== null) {
                let productProbeg = avtoItem.querySelector(`div[class="ListingItem__kmAgeAndSalonInfo"] .ListingItem__kmAge`).innerText;
                let probeg = productProbeg.substring(0, productProbeg.length - 3);
                probeg = probeg.replace(/\s/g, '')
                probeg = probeg.replace(/[^0-9]/g, "")
                if (probeg === '' || probeg === 'Но') {
                    probeg = 0
                }
                probeg = Number(probeg)


                avto.probeg = probeg
            }


            arrayOfAvto.push(avto)
        })
        return arrayOfAvto
    })
    const searchId2 = await page2.evaluate(() => {
        let arrayOfAvto = []
        let totalSearchResults = Array.from(document.querySelectorAll('div[class="ListingItem"]'));
        let arr = []

        totalSearchResults.map(item => {
            if (item !== undefined) (
                arr.push(item)
            )
        })


        // Количество обьявлений
        let countOfAutoString
        if (document.querySelector(`button[class="Button_color_blue"] .ButtonWithLoader__content`) !== null) {
            countOfAutoString = document.querySelector(`button[class="Button_color_blue"] .ButtonWithLoader__content`).innerText;
            countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")
            arrayOfAvto.push(countOfAutoString)
        }

        arr.map(avtoItem => {
            let avto = {
                year: '',
                price: '',
                probeg: ''
            }
            let productYear = avtoItem.querySelector('div[class="ListingItem__year"]').innerText;
            productYear = Number(productYear)
            avto.year = productYear

            if (avtoItem.querySelector(`div[class="ListingItemPrice__content"]`) !== null) {
                let productPrice = avtoItem.querySelector(`div[class="ListingItemPrice__content"]`).innerText;
                productPrice = productPrice.replace('₽', '');
                productPrice = productPrice.replace(/\s/g, '')
                productPrice = productPrice.replace(/[^0-9]/g, "")
                productPrice = Number(productPrice)
                avto.price = productPrice
            }
            // let productPrice = avtoItem.querySelector(`div[class="ListingItemPrice__content"]`).innerText;
            // productPrice = productPrice.replace('₽', '');
            // productPrice = productPrice.replace(/\s/g, '')
            // productPrice = productPrice.replace(/[^0-9]/g,"")
            // avto.price = productPrice
            //Пробег
            if (avtoItem.querySelector(`div[class="ListingItem__kmAgeAndSalonInfo"]`) !== null) {
                let productProbeg = avtoItem.querySelector(`div[class="ListingItem__kmAgeAndSalonInfo"] .ListingItem__kmAge`).innerText;
                let probeg = productProbeg.substring(0, productProbeg.length - 3);

                probeg = probeg.replace(/\s/g, '')
                // probeg = probeg.replace(/[^0-9]/g,"") 
                if (probeg === '' || probeg === 'Но') {
                    probeg = 0
                }
                probeg = Number(probeg)
                avto.probeg = probeg
            }


            arrayOfAvto.push(avto)
        })
        return arrayOfAvto
    })
    const arrayOfAuto1 = searchId1
    console.log("Начало задержки")
    await page1.waitForTimeout(5000)
    console.log("Конец задержки")
    const arrayOfAuto2 = searchId2
    console.log(arrayOfAuto1)
    console.log(arrayOfAuto2)
    const arrayOfAuto = []

    arrayOfAuto.push(...arrayOfAuto1)
    arrayOfAuto.push(...arrayOfAuto2)

    const uniq = new Set(arrayOfAuto.map(e => JSON.stringify(e)));
    const res = Array.from(uniq).map(e => JSON.parse(e));

    console.log(res)

    await browser.close();
    return res
}

module.exports.averegePriceAvtoRu = averegePriceAvtoRu

