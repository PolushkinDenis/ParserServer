async function averegePriceAvito(filters) {
    const puppeteer = require('puppeteer');
    console.log(filters)


    const city = filters.city.avitoHref
    const city2 = filters.city2?.avitoHref
    const brand = filters.brand.hrefAvito
    const model = filters.model.hrefAvito
    const priceFrom = filters.priceFrom
    const priceTo = filters.priceTo
    const yearFrom = filters.yearFrom
    const yearTo = filters.yearTo
    const sorting = filters.sorting.avitoSorting

    const urlForMinPrice = `https://www.avito.ru/${city}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&s=1&pmin=${priceFrom}&pmax=${priceTo}`;

    console.log(urlForMinPrice)

    // const browser = await puppeteer.launch({ headless: false })
    const browser = await puppeteer.launch()

    console.log("launch")
    const page1 = await browser.newPage();

    console.log("newPage")

    // await page1.goto(urlForMinPrice, { waitUntil: 'networkidle2', timeout: 0 });
    // await page2.goto(urlForMaxPrice, { waitUntil: 'networkidle2', timeout: 0 });

    await page1.goto(urlForMinPrice, { waitUntil: 'domcontentloaded', timeout: 0 });

    console.log("Открытие браузера")
    ////////////////////////////////////////////////////////////////////////////////////////// Указание года
    if (yearFrom.length > 0) {
        // Вставка года от
        console.log("Вставка года от")
        const navigationPromiseYear1 = page1.waitForSelector('div[data-marker^="item"]');
        await navigationPromiseYear1
        await page1.type('input[data-marker="params[188]/from/input"]', yearFrom);
    }
    if (yearTo.length > 0) {
        // Вставка года до
        console.log("Вставка года до")
        await page1.type('input[data-marker="params[188]/to/input"]', yearTo);
    }

    // await page1.click('button[data-marker="search-filters/submit-button"]');

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log('Wait start')
    // new Promise(r => setTimeout(r, 3000));
    // console.log('Wait end')

    // const selectorKpp1 = await page1.$('button[class="input-input-Zpzc1"]');
    // if (selectorKpp1 !== null) {
    //     await selectorKpp1.click()
    //     console.log("Нажат слектор для кпп 1")
    // }

    if (yearTo.length > 0 || yearFrom.length > 0) {
        let check1 = true
        const navigationPromisesearchButtonSeacrch1 = await page1.waitForSelector('button[data-marker="search-filters/submit-button"]');
        try {
            await navigationPromisesearchButtonSeacrch1
            console.log(" найдена кнопка поиск")
            let searchButtonSeacrch1 = await page1.$('button[data-marker="search-filters/submit-button"]')
            await searchButtonSeacrch1.click()
            console.log(" Нажата кнопка поиск")

        }
        catch (e) {
            console.log("НЕ найдена кнопка поиск")
        }

        // while (check1) {
        //     // let searchButtonSeacrch1 = await page1.$('button[data-marker="search-filters/submit-button"]')
        //     // searchButtonSeacrch1.
        //     let link = await page1.$eval('button[data-marker="search-filters/submit-button"]', element => element.getAttribute("aria-busy"))
        //     if(link === false){
        //         console.log('')
        //         let searchButtonSeacrch1 = await page1.$('button[data-marker="search-filters/submit-button"]')
        //         await searchButtonSeacrch1.click()
        //         check1 = false
        //         console.log('Клик по поиску 1')
        //     }  
        // } 
        //////////////////////////////////////////////////////////////////////////////////////////////////// 25.10.2022

        // const sleep = (ms) => {
        //     return new Promise(resolve => setTimeout(resolve, ms));
        // }
        // console.log("Начало задержки")
        // await sleep(3000);
        // console.log("Конец задержки")
    }
    console.log("Начало задержки")
    await page1.waitForTimeout(7000)
    console.log("Конец задержки")

    try {
        await page1.waitForSelector('div[data-marker^="item"]')
    }
    catch (e) {
        console.log('Не найдены элементы 1')
    }

    let avitoResult = []
    console.log("Поиск")

    //Поиск авто
    const searchId1 = await page1.evaluate(() => {
        let arrayOfAvto = []
        let arrayOfId = []
        console.log("Поиск start")
        let totalSearchResults = Array.from(document.querySelectorAll('div[data-marker^="item"]'));
        console.log("Поиск arrray")
        totalSearchResults.map(el => {
            if (el.id.length > 0) {
                arrayOfId.push(el.id)
            }
        })
        let countOfAutoString
        if (document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`) !== null) {
            countOfAutoString = document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`).innerText;
            if (countOfAutoString !== undefined) {
                countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")

            }
            arrayOfAvto.push(countOfAutoString)
        }
        ////////////////////////////////////////////
        console.log("Поиск map res")
        arrayOfId.map(id => {
            let avto = {
                year: '',
                price: '',
                probeg: ''
            }
            let productName = document.querySelector(`div[id="${id}"] .title-root-zZCwT`).innerText;
            // avto.productName = productName
            var year = productName.substr(productName.length - 4)
            if (year !== undefined) {
                year = year.replace(/\s/g, '')
            }
            year = Number(year)
            avto.year = year
            //Цена
            let productPrice = document.querySelector(`div[id="${id}"] .price-text-_YGDY`).innerText;
            let priceArr = productPrice.split('')
            let price = ''
            let j = 0
            if (priceArr[0] === 'о') {
                j = 3
            }
            while (priceArr[j] !== '₽') {
                price += priceArr[j]
                j++
            }
            price = price.replace(/\s/g, '')
            price = Number(price)
            avto.price = price
            // Информация
            if (document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`) !== null) {
                let productInfo = document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`).innerText;
                let checkProbeg = productInfo.indexOf('км')
                let probeg = ''
                let i = 0
                if (checkProbeg === -1) {
                    probeg = 0
                }
                else {
                    let probegArr = productInfo.split('')
                    if (probegArr[0] === 'Б') { //Если битый
                        i = 7
                    }
                    while (probegArr[i] !== 'к') {
                        probeg += probegArr[i]
                        i++
                    }
                    if (probeg !== undefined && probeg !== '') {
                        probeg = probeg.replace(/\s/g, '')
                    }
                }
                probeg = Number(probeg)

                avto.probeg = probeg
            }
            else {
                probeg = 0
                avto.probeg = probeg
            }
            arrayOfAvto.push(avto)
        })

        return arrayOfAvto
    })

    avitoResult1 = searchId1

    console.log("REs1")
    console.log(avitoResult1)

    const arrayOfAuto = []
    arrayOfAuto.push(...avitoResult1)

    await page1.click('div[class="select-select-box-jJiQW select-size-s-VX5kS"]');
    const arraySelectorPromise = await page1.$$('select[class="select-select-IdfiC"]') ///
    if (arraySelectorPromise !== null) {
        let arraySelector = Array.from(arraySelectorPromise)
        console.log(arraySelector)
        if (arraySelector.length > 1) {
            await arraySelectorPromise[1].select('select[class="select-select-IdfiC"]', "2")
            console.log('Второй селектор')
        }
        else {
            await arraySelectorPromise[0].select('select[class="select-select-IdfiC"]', "2")
            console.log('Первый селектор')

        }
    }

    // await page1.select('select[class="select-select-IdfiC"]', "2")

    console.log("Начало задержки")
    await page1.waitForTimeout(7000)
    console.log("Конец задержки")

    try {
        await page1.waitForSelector('div[data-marker^="item"]')
    }
    catch (e) {
        console.log('Не найдены элементы 2')
    }

    console.log("Второй поиск")

    const searchId2 = await page1.evaluate(() => {
        let arrayOfAvto = []
        let arrayOfId = []
        console.log("Поиск start")
        let totalSearchResults = Array.from(document.querySelectorAll('div[data-marker^="item"]'));
        console.log("Поиск arrray")
        totalSearchResults.map(el => {
            if (el.id.length > 0) {
                arrayOfId.push(el.id)
            }
        })


        let countOfAutoString
        if (document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`) !== null) {
            countOfAutoString = document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`).innerText;
            if (countOfAutoString !== undefined) {
                countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")

            }
            arrayOfAvto.push(countOfAutoString)
        }

        arrayOfId.map(id => {
            let avto = {
                year: '',
                price: '',
                probeg: ''
            }
            let productName = document.querySelector(`div[id="${id}"] .title-root-zZCwT`).innerText;
            var year = productName.substr(productName.length - 4)
            if (year !== undefined) {
                year = year.replace(/\s/g, '')
            }
            year = Number(year)
            avto.year = year

            //Цена
            let productPrice = document.querySelector(`div[id="${id}"] .price-text-_YGDY`).innerText;
            let priceArr = productPrice.split('')
            let price = ''
            let j = 0
            if (priceArr[0] === 'о') {
                j = 3
            }
            while (priceArr[j] !== '₽') {
                price += priceArr[j]
                j++
            }
            price = price.replace(/\s/g, '')
            price = Number(price)
            avto.price = price

            // Информация
            if (document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`) !== null) {
                let productInfo = document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`).innerText;
                let checkProbeg = productInfo.indexOf('км')
                let probeg = ''
                let i = 0
                if (checkProbeg === -1) {
                    probeg = 0
                }
                else {
                    let probegArr = productInfo.split('')
                    if (probegArr[0] === 'Б') { //Если битый
                        i = 7
                    }
                    while (probegArr[i] !== 'к') {
                        probeg += probegArr[i]
                        i++
                    }
                    if (probeg !== undefined && probeg !== '') {
                        probeg = probeg.replace(/\s/g, '')
                    }
                }
                probeg = Number(probeg)
                avto.probeg = probeg
            }
            else {
                probeg = 0
                avto.probeg = probeg
            }

            arrayOfAvto.push(avto)
        })
        return arrayOfAvto
    })


    // avitoResult1 = searchId1
    avitoResult2 = searchId2

    // console.log("REs1")
    // console.log(avitoResult1)
    console.log("REs2")
    console.log(avitoResult2)

    await browser.close();

    // const arrayOfAuto = []
    // arrayOfAuto.push(...avitoResult1)
    arrayOfAuto.push(...avitoResult2)

    const uniq = new Set(arrayOfAuto.map(e => JSON.stringify(e)));
    const res1 = Array.from(uniq).map(e => JSON.parse(e));

    let res = []
    res.push(res1)


    console.log("Поиск по второму городу")
    if (filters.comparison === true) {
        const urlForMinPrice2 = `https://www.avito.ru/${city2}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&s=1&pmin=${priceFrom}&pmax=${priceTo}`;
        // const urlForMaxPrice2 = `https://www.avito.ru/${city2}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&s=2&pmin=${priceFrom}&pmax=${priceTo}`;

        console.log(urlForMinPrice2)
        // console.log(urlForMaxPrice2)

        const browser2 = await puppeteer.launch({ headless: false })

        console.log("launch")
        const page3 = await browser2.newPage();
        // const page4 = await browser2.newPage();

        console.log("newPage")

        await page3.goto(urlForMinPrice2, { waitUntil: 'domcontentloaded', timeout: 0 });
        // await page4.goto(urlForMaxPrice2, { waitUntil: 'domcontentloaded', timeout: 0 });
        console.log("Открытие браузера")

        ////////////////////////////////////////////////////////////////////////////////////////// Указание года
        if (yearFrom.length > 0) {
            // Вставка года от
            console.log("Вставка года от")
            const navigationPromiseYear3 = page3.waitForSelector('div[data-marker^="item"]');
            await navigationPromiseYear3
            // const navigationPromiseYear4 = page4.waitForSelector('div[data-marker^="item"]');
            // await navigationPromiseYear4
            await page3.type('input[data-marker="params[188]/from/input"]', yearFrom);
            // await page4.type('input[data-marker="params[188]/from/input"]', yearFrom);
        }
        if (yearTo.length > 0) {
            // Вставка года до
            console.log("Вставка года до")
            await page3.type('input[data-marker="params[188]/to/input"]', yearTo);
            // await page4.type('input[data-marker="params[188]/to/input"]', yearTo);
        }

        // const viewCars3 = await page3.$('button[data-marker="search-filters/submit-button"]');
        // const viewCars4 = await page4.$('button[data-marker="search-filters/submit-button"]');

        if (yearTo.length > 0 || yearFrom.length > 0) {
            const navigationPromisesearchButtonSeacrch3 = await page3.waitForSelector('button[data-marker="search-filters/submit-button"]');
            try {
                await navigationPromisesearchButtonSeacrch3
                console.log(" найдена кнопка поиск 3")
                let searchButtonSeacrch3 = await page3.$('button[data-marker="search-filters/submit-button"]')
                await searchButtonSeacrch3.click()
                console.log(" Нажата кнопка поиск 3")

            }
            catch (e) {
                console.log("НЕ найдена кнопка поиск 3")
            }
        }
        console.log("Начало задержки 3")
        await page3.waitForTimeout(5000)
        console.log("Конец задержки 3")

        try {
            await page3.waitForSelector('div[data-marker^="item"]')
        }
        catch (e) {
            console.log('Не найдены элементы 3')
        }
        // if (viewCars3 !== null) {
        //     await viewCars3.click()
        //     console.log("Открыто модальное окно для выбора города")
        // }
        // else {
        //     console.log("Кнопка показа обьявлений не доступна")
        // }
        // if (viewCars4 !== null) {
        //     await viewCars4.click()
        //     console.log("Открыто модальное окно для выбора города")
        // }
        // else {
        //     console.log("Кнопка показа обьявлений не доступна")
        // }
        // const navigationPromiseSelector3 = page3.waitForSelector('div[data-marker^="item"]');
        // await navigationPromiseSelector3
        // const navigationPromiseSelector4 = page4.waitForSelector('div[data-marker^="item"]');
        // await navigationPromiseSelector4

        //Поиск авто
        console.log("Поиск 3")
        const searchId3 = await page3.evaluate(() => {
            let arrayOfAvto = []
            let arrayOfId = []
            let totalSearchResults = Array.from(document.querySelectorAll('div[data-marker^="item"]'));
            totalSearchResults.map(el => {
                if (el.id.length > 0) {
                    arrayOfId.push(el.id)
                }
            })

            let countOfAutoString
            if (document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`) !== null) {
                countOfAutoString = document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`).innerText;
                if (countOfAutoString !== undefined) {
                    countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")
                }
                arrayOfAvto.push(countOfAutoString)
            }

            arrayOfId.map(id => {
                let avto = {
                    year: '',
                    price: '',
                    probeg: ''
                }
                let productName = document.querySelector(`div[id="${id}"] .title-root-zZCwT`).innerText;
                var year = productName.substr(productName.length - 4)
                if (year !== undefined) {
                    year = year.replace(/\s/g, '')
                }
                year = Number(year)
                avto.year = year

                //Цена
                let productPrice = document.querySelector(`div[id="${id}"] .price-text-_YGDY`).innerText;
                let priceArr = productPrice.split('')
                let price = ''
                let j = 0
                if (priceArr[0] === 'о') {
                    j = 3
                }
                while (priceArr[j] !== '₽') {
                    price += priceArr[j]
                    j++
                }
                price = price.replace(/\s/g, '')
                price = Number(price)
                avto.price = price

                // Информация
                if (document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`) !== null) {
                    let productInfo = document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`).innerText;
                    let checkProbeg = productInfo.indexOf('км')
                    let probeg = ''
                    let i = 0
                    if (checkProbeg === -1) {
                        probeg = 0
                    }
                    else {
                        let probegArr = productInfo.split('')
                        if (probegArr[0] === 'Б') { //Если битый
                            i = 7
                        }
                        while (probegArr[i] !== 'к') {
                            probeg += probegArr[i]
                            i++
                        }
                        if (probeg !== undefined && probeg !== '') {
                            probeg = probeg.replace(/\s/g, '')
                        }
                    }
                    probeg = Number(probeg)
                    avto.probeg = probeg
                }
                else {
                    probeg = 0
                    avto.probeg = probeg
                }
                arrayOfAvto.push(avto)
            })
            return arrayOfAvto
        })
        const arrayOfAuto3 = searchId3
        console.log("REs3")
        console.log(arrayOfAuto3)
        const arrayOfAuto1 = []
        arrayOfAuto1.push(...arrayOfAuto3)

        await page3.click('div[class="select-select-box-jJiQW select-size-s-VX5kS"]');

        const arraySelectorPromise3 = await page3.$$('select[class="select-select-IdfiC"]') ///
        if (arraySelectorPromise3 !== null) {
            let arraySelector3 = Array.from(arraySelectorPromise3)
            console.log(arraySelector3)
            if (arraySelector3.length > 1) {
                await arraySelectorPromise3[1].select('select[class="select-select-IdfiC"]', "2")
                console.log('Второй селектор')
            }
            else {
                await arraySelectorPromise3[0].select('select[class="select-select-IdfiC"]', "2")
                console.log('Первый селектор')

            }
        }

        console.log("Начало задержки 3")
        await page3.waitForTimeout(5000)
        console.log("Конец задержки 3")

        try {
            await page3.waitForSelector('div[data-marker^="item"]')
        }
        catch (e) {
            console.log('Не найдены элементы 3')
        }


        //Поиск авто
        console.log("Поиск 4")
        const searchId4 = await page3.evaluate(() => {
            let arrayOfAvto = []
            let arrayOfId = []
            let totalSearchResults = Array.from(document.querySelectorAll('div[data-marker^="item"]'));
            totalSearchResults.map(el => {
                if (el.id.length > 0) {
                    arrayOfId.push(el.id)
                }
            })

            let countOfAutoString
            if (document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`) !== null) {
                countOfAutoString = document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`).innerText;
                if (countOfAutoString !== undefined) {
                    countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")
                }
                arrayOfAvto.push(countOfAutoString)
            }

            arrayOfId.map(id => {
                let avto = {
                    year: '',
                    price: '',
                    probeg: ''
                }
                let productName = document.querySelector(`div[id="${id}"] .title-root-zZCwT`).innerText;
                var year = productName.substr(productName.length - 4)
                if (year !== undefined) {
                    year = year.replace(/\s/g, '')
                }
                year = Number(year)
                avto.year = year

                //Цена
                let productPrice = document.querySelector(`div[id="${id}"] .price-text-_YGDY`).innerText;
                let priceArr = productPrice.split('')
                let price = ''
                let j = 0
                if (priceArr[0] === 'о') {
                    j = 3
                }
                while (priceArr[j] !== '₽') {
                    price += priceArr[j]
                    j++
                }
                price = price.replace(/\s/g, '')
                price = Number(price)
                avto.price = price

                // Информация
                if (document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`) !== null) {
                    let productInfo = document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`).innerText;
                    let checkProbeg = productInfo.indexOf('км')
                    let probeg = ''
                    let i = 0
                    if (checkProbeg === -1) {
                        probeg = 0
                    }
                    else {
                        let probegArr = productInfo.split('')
                        if (probegArr[0] === 'Б') { //Если битый
                            i = 7
                        }
                        while (probegArr[i] !== 'к') {
                            probeg += probegArr[i]
                            i++
                        }
                        if (probeg !== undefined && probeg !== '') {
                            probeg = probeg.replace(/\s/g, '')
                        }
                    }
                    probeg = Number(probeg)
                    avto.probeg = probeg
                }
                else {
                    probeg = 0
                    avto.probeg = probeg
                }
                arrayOfAvto.push(avto)
            })
            return arrayOfAvto
        })
        // const arrayOfAuto3 = searchId3
        const arrayOfAuto4 = searchId4

        // console.log("REs3")
        // console.log(arrayOfAuto3)
        console.log("REs4")
        console.log(arrayOfAuto4)

        await browser2.close();

        // const arrayOfAuto1 = []
        // arrayOfAuto1.push(...arrayOfAuto3)
        arrayOfAuto1.push(...arrayOfAuto4)

        const uniq2 = new Set(arrayOfAuto1.map(e => JSON.stringify(e)));
        const res2 = Array.from(uniq2).map(e => JSON.parse(e));

        res.push(res2)
    }

    console.log('Итог')
    console.log(res)
    return res
}

module.exports.averegePriceAvito = averegePriceAvito
