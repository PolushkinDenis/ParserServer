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
    const urlForMaxPrice = `https://www.avito.ru/${city}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&s=2&pmin=${priceFrom}&pmax=${priceTo}`;

    // const urlForMinPrice = `https://www.avito.ru/${city}/avtomobili/${brand}?localPriority=1&cd=1&radius=0&s=1`;
    // const urlForMaxPrice = `https://www.avito.ru/${city}/avtomobili/${brand}?localPriority=1&cd=1&radius=0&s=2`;

    console.log(urlForMinPrice)
    console.log(urlForMaxPrice)

    // const browser = await puppeteer.launch({ headless: false })
    const browser = await puppeteer.launch()

    console.log("launch")
    const page1 = await browser.newPage();
    const page2 = await browser.newPage();

    console.log("newPage")

    // await page1.goto(urlForMinPrice, { waitUntil: 'networkidle2', timeout: 0 });
    // await page2.goto(urlForMaxPrice, { waitUntil: 'networkidle2', timeout: 0 });

    await page1.goto(urlForMinPrice, { waitUntil: 'domcontentloaded', timeout: 0 });
    await page2.goto(urlForMaxPrice, { waitUntil: 'domcontentloaded', timeout: 0 });

    console.log("Открытие браузера")

    ////////////////////////////////////////////////////////////////////////////////////////// Указание года
    if (yearFrom.length > 0) {
        // Вставка года от
        console.log("Вставка года от")
        const navigationPromiseYear1 = page1.waitForSelector('div[data-marker^="item"]');
        await navigationPromiseYear1
        const navigationPromiseYear2 = page2.waitForSelector('div[data-marker^="item"]');
        await navigationPromiseYear2
        await page1.type('input[data-marker="params[188]/from/input"]', yearFrom);
        await page2.type('input[data-marker="params[188]/from/input"]', yearFrom);

    }
    if (yearTo.length > 0) {
        // Вставка года до
        console.log("Вставка года до")
        await page1.type('input[data-marker="params[188]/to/input"]', yearTo);
        await page2.type('input[data-marker="params[188]/to/input"]', yearTo);

    }
    await page1.click('div[class="select-select-box-jJiQW select-size-s-VX5kS"]');
    await page1.select('select[class="select-select-IdfiC"]', "101")
    // await page1.waitForSelector('option[data-marker="option(101)"]');

    // await page1.click('option[data-marker="option(101)"]');

    await page1.click('button[data-marker="search-filters/submit-button"]');
    await page2.click('button[data-marker="search-filters/submit-button"]');

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    console.log('Wait start')
    new Promise(r => setTimeout(r, 3000));
    console.log('Wait end')

    const selectorKpp1 = await page1.$('button[class="input-input-Zpzc1"]');
    const selectorKpp2 = await page2.$('button[class="input-input-Zpzc1"]');
    if (selectorKpp1 !== null) {
        await selectorKpp1.click()
        console.log("Нажат слектор для кпп 1")
    }
    if (selectorKpp2 !== null) {
        await selectorKpp2.click()
        console.log("Нажат слектор для кпп 2")
    }

    let check1 = true
    let check2 = true
    const navigationPromisesearchButtonSeacrch1 = await page1.waitForSelector('button[data-marker="search-filters/submit-button"]');
    // await navigationPromisesearchButtonSeacrch1

    while (check1) {
        // let searchButtonSeacrch1 = await page1.$('button[data-marker="search-filters/submit-button"]')
        // searchButtonSeacrch1.
        let link = await page1.$eval('button[data-marker="search-filters/submit-button"]', element => element.getAttribute("aria-busy"))
        if(link === false){
            let searchButtonSeacrch1 = await page1.$('button[data-marker="search-filters/submit-button"]')
            await searchButtonSeacrch1.click()
            check1 = false
            console.log('Клик по поиску 1')
        }  
    }
    await page2.waitForSelector('button[data-marker="search-filters/submit-button"]');
    // await navigationPromiseSearchButtonSeacrch2
    while (check2) {
        // let searchButtonSeacrch2 = await page2.$('button[data-marker="search-filters/submit-button"]')
        // searchButtonSeacrch1.
        let link = await page2.$eval('button[data-marker="search-filters/submit-button"]', element => element.getAttribute("aria-busy"))
        console.log(link)
        if(link === false){
            let searchButtonSeacrch2 = await page1.$('button[data-marker="search-filters/submit-button"]')
            await searchButtonSeacrch2.click()
            check2 = false
            console.log('Клик по поиску 1')
        }  
    }
    // const searchButtonSeacrch1 = await page1.$('button[data-marker="search-filters/submit-button"]')
    // const searchButtonSeacrch2 = await page2.$('button[data-marker="search-filters/submit-button"]')

    // ////////////////////////////////////////////////////////////////////////////////////////   Указание цены и переход по кнопке "показать объявления"
    // Вставка цены от
    // if (priceFrom.length > 0) {
    //     // Вставка цены от
    //     console.log(" Вставка цены от")
    //     await page1.type('input[data-marker="price/from"]', priceFrom);
    //     await page2.type('input[data-marker="price/from"]', priceFrom);

    // }
    // if (priceTo.length > 0) {
    //     // Вставка цены до
    //     console.log(" Вставка цены до")
    //     await page1.type('input[data-marker="price/to"]', priceTo);
    //     await page2.type('input[data-marker="price/to"]', priceTo);

    // }


    // кнопка "показать объявления"
    // const navigationPromiseSelector1 = page1.waitForSelector('div[data-marker^="item"]');
    // await navigationPromiseSelector1
    // const navigationPromiseSelector2 = page2.waitForSelector('div[data-marker^="item"]');
    // await navigationPromiseSelector2

    {/* <span class="button-loaderBox-FsR1g"> */ }

    /////////////////////////////////////////////////////////////////////////////////////////
    // let viewCars1 = await page1.$('button[data-marker="search-filters/submit-button"]');
    // let viewCars2 = await page2.$('button[data-marker="search-filters/submit-button"]');


    // // while(viewCars1 === null){
    // //      viewCars1 = await page1.$('button[data-marker="search-filters/submit-button"]');
    // //      console.log(viewCars1)
    // // }
    // // while(viewCars2 === null){
    // //      viewCars2 = await page2.$('button[data-marker="search-filters/submit-button"]');
    // //      console.log(viewCars2)
    // // }

    // if (viewCars1 !== null) {
    //     await viewCars1.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // else {
    //     console.log("Кнопка показа обьявлений не доступна")
    // }
    // if (viewCars2 !== null) {
    //     await viewCars2.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // else {
    //     console.log("Кнопка показа обьявлений не доступна")
    // }
    // const navigationPromiseSelector1 = page1.waitForSelector('div[data-marker^="item"]');
    // await navigationPromiseSelector1
    // const navigationPromiseSelector2 = page2.waitForSelector('div[data-marker^="item"]');
    // await navigationPromiseSelector2
//////////////////////////////////////////////////////////////////////////////////////////////////// 25.10.2022
    // const selectorCity1 = await page1.$('div[data-marker="search-form/radius"]');
    // const selectorCity2 = await page2.$('div[data-marker="search-form/radius"]');

    // if (selectorCity1 !== null) {
    //     await selectorCity1.click()
    //     console.log("Открыто модальное окно для выбора радиус 1")

    // }
    // else {
    //     console.log("Не удалось нажать на кнопку радиуса 1")
    // }
    // if (selectorCity2 !== null) {
    //     await selectorCity1.click()
    //     console.log("Открыто модальное окно для выбора радиуса 2")
    // }
    // else {
    //     console.log("Не удалось нажать на кнопку радиуса 2")
    // }
    // // const navigationPromiseRadius1 = page1.waitForSelector('div[class="radio-group-item-_qq7z"]');
    // // const navigationPromiseRadius2 = page2.waitForSelector('div[class="radio-group-item-_qq7z"]');
    // if (selectorCity1 !== null) {
    //     try {
    //         await page1.waitForSelector('div[class="radio-group-item-_qq7z"]');
    //     }
    //     catch (e) {
    //         console.log("Ожидание 1 провалено div[class=radio-group-item-_qq7z")
    //     }
    // }
    // if (selectorCity2 !== null) {
    //     try {
    //         await page2.waitForSelector('div[class="radio-group-item-_qq7z"]');
    //     }
    //     catch (e) {
    //         console.log("Ожидание 2 провалено div[class=radio-group-item-_qq7z")
    //     }
    // }

    // if (selectorCity1 !== null) {
    //     const regionList1 = await page1.$$('div[class="radio-group-item-_qq7z"]')
    //     if (regionList1 !== null && regionList1 !== undefined) {
    //         if (regionList1[1] !== undefined) {
    //             await regionList1[1].click()
    //             console.log("Нажатие на радиус 1")
    //         }
    //     }
    // }
    // if (selectorCity2 !== null) {
    //     const regionList2 = await page2.$$('div[class="radio-group-item-_qq7z"]')
    //     if (regionList2 !== null && regionList2 !== undefined) {
    //         if (regionList2[1] !== undefined) {
    //             await regionList2[1].click()
    //             console.log("Нажатие на радиус 2")
    //         }
    //     }
    // }

    // console.log("Нажатие на кнопку Поиск 1")
    // const searchButton1 = await page1.$('button[data-marker="popup-location/save-button"]')
    // console.log(searchButton1)
    // if (searchButton1) {
    //     try {
    //         await searchButton1.click()
    //         console.log("Click location search 1")
    //     }
    //     catch (e) {
    //         console.log("Ошибка поиска 1")
    //     }
    //     try {
    //         const navigationPromise = page1.waitForSelector('div[data-marker^="item"]');
    //         await navigationPromise
    //     }
    //     catch (e) {
    //         console.log("Ошибка ожидания после поиска 1")
    //     }
    // }
    // else {
    //     const searchButtonForm1 = await page1.$('button[data-marker="search-form/submit-button"]')
    //     if (searchButtonForm1 !== null) {
    //         try {
    //             await searchButtonForm1.click()
    //             console.log("Нажатие кнопки Показать обьявления 1")
    //         }
    //         catch (e) {
    //             console.log("Ошибка Показать обьявления 1")
    //         }
    //     }
    // }
    // console.log("Нажатие на кнопку Поиск 2")
    // const searchButton2 = await page2.$('button[data-marker="popup-location/save-button"]')
    // console.log(searchButton2)
    // if (searchButton2) {
    //     try {
    //         await searchButton2.click()
    //         console.log("Click location search 2")
    //     }
    //     catch (e) {
    //         console.log("Ошибка поиска 2")
    //     }
    //     try {
    //         const navigationPromise2 = page2.waitForSelector('div[data-marker^="item"]');
    //         await navigationPromise2
    //     }
    //     catch (e) {
    //         console.log("Ошибка ожидания после поиска 2")
    //     }
    // }
    // else {
    //     const searchButtonFrom2 = await page2.$('button[data-marker="search-form/submit-button"]')
    //     if (searchButtonFrom2 !== null) {
    //         try {
    //             await searchButtonFrom2.click()
    //             console.log("Нажатие кнопки Показать обьявления 2")
    //         }
    //         catch (e) {
    //             console.log("Ошибка Показать обьявления 2")
    //         }
    //     }
    // }
//////////////////////////////////////////////////////////////////////////////////////////////////// 25.10.2022

    const sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    console.log("Начало задржки")
    await sleep(3000);
    console.log("Конец задржки")

    // ////////////////////////////////////////////////////////////////////////////////////////

    // await page.screenshot({ path: "Avito.png", fullPage: true })

    // //Выбор города 
    // console.log("Открытие модального окна для выбора города")
    // const selectorCity1 = await page1.$('div[data-marker="search-form/region"]');
    // const selectorCity2 = await page2.$('div[data-marker="search-form/region"]');

    // if (selectorCity1 !== null) {
    //     await selectorCity1.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // if (selectorCity2 !== null) {
    //     await selectorCity2.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // // await page.screenshot({ path: "example.png", fullPage: true })

    // // const  navigationPromiseSelector = page.waitForSelector('input[data-marker="popup-location/region/input"]');
    // // await navigationPromiseSelector

    // //await page.type('input[data-marker="popup-location/region/input"]', 'Казань'); // Вставка города в поиск

    // // Искать только в выбранном городе
    // const selectorLocation11 = await page1.$('div[class="popup-localPriority-QUZTA"] .checkbox-set-W_iAg');
    // const selectorLocation22 = await page2.$('div[class="popup-localPriority-QUZTA"] .checkbox-set-W_iAg');

    // // console.log(selectorLocation11.toString)
    // // console.log(selectorLocation12.toString())

    // const selectorLocation1 = await page1.$('input[class="checkbox-input-uPrBY"]');
    // const selectorLocation2 = await page2.$('input[class="checkbox-input-uPrBY"]');

    // if (selectorLocation1 === null) {
    //     console.log("Не удалось выбрать Сначала в выбранном городу")
    // }
    // else {
    //     if (selectorLocation11 === null) {
    //         await selectorLocation1.click()
    //         console.log("Сначала в выбранном городе")
    //     }

    // }
    // if (selectorLocation2 === null) {
    //     console.log("Не удалось выбрать Сначала в выбранном городу")
    // }
    // else {
    //     if (selectorLocation22 === null) {
    //         await selectorLocation2.click()
    //         console.log("Сначала в выбранном городе")
    //     }
    // }
    // ////////////////////////////////////////////////////////////////////////////////////////

    // // Искать только в выбранном городе
    // const location = await page.$('input[name="localPriority"]');
    // if (location !== null) {
    //     await location.click()
    // }
    // await page.screenshot({ path: "wxample.png", fullPage: true })
    // ////////////////////////////////////////////////////////////////////////////////////////


    //////////////////////////////////////////////////////////////////////////////////////// Поиск в выбранном радиусе регионе
    // console.log("Нажатие на кнопку Поиск")
    // const buttonPromise1 = page1.waitForSelector('button[data-marker="popup-location/save-button"]');
    // await buttonPromise1
    // console.log("ожидание1")
    // const buttonPromise2 = page2.waitForSelector('button[data-marker="popup-location/save-button"]');
    // await buttonPromise2
    // console.log("ожидание2")
    // const searchButton1 = await page1.$('button[data-marker="popup-location/save-button"]')
    // const searchButton2 = await page2.$('button[data-marker="popup-location/save-button"]')

    // if (searchButton1) {
    //     await searchButton1.click()
    //     console.log("Click location search")
    //     const navigationPromise1 = page1.waitForSelector('div[data-marker^="item"]');
    //     console.log("START navigationPromise1")
    //     await navigationPromise1
    //     console.log("END navigationPromise1")

    // }
    // if (searchButton2) {
    //     await searchButton2.click()
    //     console.log("Click location search")
    //     await page2.waitForSelector('div[data-marker^="item"]');
    //     console.log("START navigationPromise2")

    //     // await navigationPromise2
    //     console.log("END navigationPromise2")

    // }
    ////////////////////////////////////////////////////////////////////////////////////////

    // Нажатие на кнопку НАйти
    // const searchButton = await page.$('button[data-marker="search-form/submit-button"]')
    // if (searchButton) {
    //     await searchButton.click()
    //     console.log("Click location search")
    // }
    // const navigationPromise = page.waitForSelector('div[data-marker^="item"]');
    // await navigationPromise
    // ////////////////////////////////////////////////////////////////////////////////////////

    //Ждем пока загрузиться нужный div
    // await page.waitForTimeout('div[data-marker^="item"]')

    // async function autoScroll(page) {
    //     await page.evaluate(async () => {
    //         await new Promise((resolve) => {
    //             var totalHeight = 0;
    //             var distance = 400;
    //             var timer = setInterval(() => {
    //                 var scrollHeight = document.body.scrollHeight;
    //                 window.scrollBy(0, distance);
    //                 totalHeight += distance;

    //                 if (totalHeight >= scrollHeight - window.innerHeight) {
    //                     clearInterval(timer);
    //                     resolve();
    //                 }
    //             }, 10);
    //         });
    //     });
    // }

    // console.log("Scroll start")
    // await autoScroll(page);
    // console.log("Scroll end")

    // Скриншот
    // console.log("Скриншот")
    // await page.screenshot({ path: "location.png", fullPage: true })

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

            // // // Время
            // // let productTime = document.querySelector(`div[id="${id}"] .iva-item-dateInfoStep-_acjp`).innerText;
            // // avto.time = productTime

            arrayOfAvto.push(avto)
        })
        // if (countOfAutoString !== null) {
        //     arrayOfAvto.splice(countOfAutoString, arrayOfAvto.length - 1)
        // }
        return arrayOfAvto
    })

    const searchId2 = await page2.evaluate(() => {
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


    avitoResult1 = searchId1
    avitoResult2 = searchId2

    console.log("REs1")
    console.log(avitoResult1)
    console.log("REs2")
    console.log(avitoResult2)

    await browser.close();

    const arrayOfAuto = []
    arrayOfAuto.push(...avitoResult1)
    arrayOfAuto.push(...avitoResult2)

    const uniq = new Set(arrayOfAuto.map(e => JSON.stringify(e)));
    const res1 = Array.from(uniq).map(e => JSON.parse(e));

    let res = []
    res.push(res1)


    console.log("Поиск по второму городу")
    if (filters.comparison === true) {
        const urlForMinPrice2 = `https://www.avito.ru/${city2}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&s=1&pmin=${priceFrom}&pmax=${priceTo}`;
        const urlForMaxPrice2 = `https://www.avito.ru/${city2}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&s=2&pmin=${priceFrom}&pmax=${priceTo}`;

        console.log(urlForMinPrice2)
        console.log(urlForMaxPrice2)

        const browser2 = await puppeteer.launch({ headless: false })

        console.log("launch")
        const page3 = await browser2.newPage();
        const page4 = await browser2.newPage();

        console.log("newPage")

        await page3.goto(urlForMinPrice2, { waitUntil: 'domcontentloaded', timeout: 0 });
        await page4.goto(urlForMaxPrice2, { waitUntil: 'domcontentloaded', timeout: 0 });
        console.log("Открытие браузера")

        ////////////////////////////////////////////////////////////////////////////////////////// Указание года
        if (yearFrom.length > 0) {
            // Вставка года от
            console.log("Вставка года от")
            const navigationPromiseYear3 = page3.waitForSelector('div[data-marker^="item"]');
            await navigationPromiseYear3
            const navigationPromiseYear4 = page4.waitForSelector('div[data-marker^="item"]');
            await navigationPromiseYear4
            await page3.type('input[data-marker="params[188]/from/input"]', yearFrom);
            await page4.type('input[data-marker="params[188]/from/input"]', yearFrom);
        }
        if (yearTo.length > 0) {
            // Вставка года до
            console.log("Вставка года до")
            await page3.type('input[data-marker="params[188]/to/input"]', yearTo);
            await page4.type('input[data-marker="params[188]/to/input"]', yearTo);
        }

        const viewCars3 = await page3.$('button[data-marker="search-filters/submit-button"]');
        const viewCars4 = await page4.$('button[data-marker="search-filters/submit-button"]');


        if (viewCars3 !== null) {
            await viewCars3.click()
            console.log("Открыто модальное окно для выбора города")
        }
        else {
            console.log("Кнопка показа обьявлений не доступна")
        }
        if (viewCars4 !== null) {
            await viewCars4.click()
            console.log("Открыто модальное окно для выбора города")
        }
        else {
            console.log("Кнопка показа обьявлений не доступна")
        }
        const navigationPromiseSelector3 = page3.waitForSelector('div[data-marker^="item"]');
        await navigationPromiseSelector3
        const navigationPromiseSelector4 = page4.waitForSelector('div[data-marker^="item"]');
        await navigationPromiseSelector4

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
        //Поиск авто
        console.log("Поиск 4")
        const searchId4 = await page4.evaluate(() => {
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

    console.log('Итог')
    console.log(res)
    return res
}

module.exports.averegePriceAvito = averegePriceAvito
