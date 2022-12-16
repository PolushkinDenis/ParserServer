async function fetchProductListAvtoRu(filters) {

    // console.log(ws)
    // const result = {
    //     event: 'message',
    //     data: "autoRu"
    //   }
    // ws.send(JSON.stringify(result))

    // const cookie = require('./cookie')
    const cookie = [
        {
            "domain": ".auto.ru",
            "expirationDate": 1666729296,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ym_visorc",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "b"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1669319596.059401',
            "hostOnly": false,
            "httpOnly": false,
            "name": "counter_ga_all7",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "2"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1697732341.291457',
            "hostOnly": false,
            "httpOnly": false,
            "name": "suid",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "b53ea2d03dd310573b32da7ee4593f4b.ee155a835e74b219d9660563405ccecf"
        },
        
        {
            "domain": ".auto.ru",
            "expirationDate": '1701287510.916494',
            "hostOnly": false,
            "httpOnly": false,
            "name": "_yasc",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "GfqST7zMNIkumTcd5x7V5lYjVoYdiq0gf4ubyHzVOn4ZZElo9vzZtEm3H3uTCg=="
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1698263603.134126',
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ym_uid",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1619469299519713448"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1667937117,
            "hostOnly": false,
            "httpOnly": false,
            "name": "bltsr",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1701287517.130227',
            "hostOnly": false,
            "httpOnly": true,
            "name": "i",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "m6fl3MnOG/UX7K+46Mekou9PDruAdmIpQnMiq++GmzLYn/uLUuBY7QQNkQB/jA3noAdfbWDpEfaGMDMvQ5LycyP+1ps="
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1666733519,
            "hostOnly": false,
            "httpOnly": false,
            "name": "sso_status",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "sso.passport.yandex.ru:synchronized"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1667842825.017254',
            "hostOnly": false,
            "httpOnly": true,
            "name": "autoru_sid",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "a%3Ag6350237521t22skdld0e69ec1l7hfj3.1f6c8de2d17d4932b42bd28204bf6a80%7C1666801141457.604800.caanz3rNIyREJxlSU3NrDw.d5Kb9oeCXOtsd4PZjzj2eQXPDXlTyK3S0a_3AHRGFts"
        },
        {// SESSION
            "domain": ".auto.ru", 
            "expirationDate": '1666734717.130004',
            "hostOnly": false,
            "httpOnly": true,
            "name": "Session_id",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "noauth:1666727516"
        },
        {
            "domain": ".auto.ru",
            "hostOnly": false,
            "httpOnly": false,
            "name": "_csrf_token",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": true,
            "storeId": null,
            "value": "a6a5914db22d3c21b9cd8ca3f737fa639ec04777094262b5"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1698263603.134352',
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ym_d",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1666727603"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1666799492,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ym_isad",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1669225234,
            "hostOnly": false,
            "httpOnly": false,
            "name": "autoru-visits-count",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "2"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1667405941.730571',
            "hostOnly": false,
            "httpOnly": true,
            "name": "autoruuid",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "g6350237521t22skdld0e69ec1l7hfj3.1f6c8de2d17d4932b42bd28204bf6a80"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1666801146,
            "hostOnly": false,
            "httpOnly": false,
            "name": "cmtchd",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "MTY2NjE5NjM0NjM2OQ=="
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1667405946,
            "hostOnly": false,
            "httpOnly": false,
            "name": "crookie",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "pNSLSYq/EXnz3hjPj4ZpO6Lz+ET+xGmz34qUNtOlNmly8XlZRxhTlkC4fhUipj2LOx1iQxYo/1oAafgZwEygvGB00g8="
        },
        { //////////////////////////////////////////
            "domain": ".auto.ru",
            "hostOnly": false,
            "httpOnly": false,
            "name": "from",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": true,
            "storeId": null,
            "value": "yandex"
        },
        {
            "domain": ".auto.ru",
            "hostOnly": false,
            "httpOnly": false,
            "name": "from_lifetime",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": true,
            "storeId": null,
            "value": "1666727601856"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1698263517,
            "hostOnly": false,
            "httpOnly": false,
            "name": "gdpr",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "0"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": 1667937117,
            "hostOnly": false,
            "httpOnly": false,
            "name": "los",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1701287517.130311',
            "hostOnly": false,
            "httpOnly": false,
            "name": "mda2_beacon",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1666727516563"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1669225233.152189',
            "hostOnly": false,
            "httpOnly": false,
            "name": "safe_deal_promo",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "3"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1669319510.136593',
            "hostOnly": false,
            "httpOnly": false,
            "name": "spravka",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "dD0xNjY2NzI3NTEwO2k9ODUuMjYuMTY1LjE2MztEPTMzMDRFQTk1NkExMTI4NkUzRTAwRkI2M0M5RjU5MEIxNjExOTAyMEMzQjQ2N0QwODkzNDRGNEY5MTM1M0E1NUNFQUFCODkyRTt1PTE2NjY3Mjc1MTAyMjg2NTM4ODU7aD03YzdhMWMyMDBjNjc3ZDUzZGNkMTdiNTNkZTdiNWE3Mw=="
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1698263517.130129',
            "hostOnly": false,
            "httpOnly": false,
            "name": "yandex_login",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": ""
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1669319595.395312',
            "hostOnly": false,
            "httpOnly": false,
            "name": "yandexuid",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "2582876301666722099"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1669319595.395443',
            "hostOnly": false,
            "httpOnly": false,
            "name": "ys",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "c_chck.2779159330%23wprid.1666727485496885-14629754174301370475-sas3-0677-e01-sas-l7-balancer-8080-BAL-7733"
        },
        {
            "domain": ".auto.ru",
            "expirationDate": '1667332395.395',
            "hostOnly": false,
            "httpOnly": false,
            "name": "yuidlt",
            "path": "/",
            "sameSite": 'null',
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1"
        }
    ]
    const puppeteer = require('puppeteer');
    const city = filters.city.autoRuHref
    const brand = filters.brand.hrefAutoRu
    const model = filters.model.hrefAutoRu
    const priceFrom = filters.priceFrom
    const priceTo = filters.priceTo
    const yearFrom = filters.yearFrom
    const yearTo = filters.yearTo
    const sorting = filters.sorting.autoRuSorting

    // const url = 'https://auto.ru/'
    // let url = `https://auto.ru/${city}/cars/${brand}/all?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    // if (city === 'all') {
    //     url = `https://auto.ru/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //     if (brand !== '') {
    //         url = `https://auto.ru/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //         if (model !== '') {
    //             url = `https://auto.ru/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //         }
    //     }
    // }

    // if(city !== 'all'){
    //     if (brand === '') {
    //         url = `https://auto.ru/${city}/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //     }
    //     else{
    //         url = `https://auto.ru/${city}/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //         if(model !== ''){
    //             url = `https://auto.ru/${city}/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}`
    //         }
    //     }
    // }
    let url = `https://auto.ru/${city}/cars/${brand}/all?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
    if (city === 'all') {
        url = `https://auto.ru/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
        if (brand !== '') {
            url = `https://auto.ru/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
            if (model !== '') {
                url = `https://auto.ru/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
            }
        }
    }
    if (city !== 'all') {
        if (brand === '') {
            url = `https://auto.ru/${city}/cars/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
        }
        else {
            url = `https://auto.ru/${city}/cars/${brand}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
            if (model !== '') {
                url = `https://auto.ru/${city}/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=${sorting}`
            }
        }
    }

    // const url = "https://youla.ru/samara/auto?attributes[auto_brand][0]=12092&attributes[price][to]=20000000&attributes[price][from]=150000"

    // const url = 'https://auto.ru/samara/cars/vaz/all/?sort=cr_date-desc'
    console.log(url)
    console.log("Start")
    const browser = await puppeteer.launch() //{ headless: false }
    // const pageTest = await browser.newPage();
    // await pageTest.goto('https://auto.ru/samara/cars/vaz/all/', { waitUntil: 'domcontentloaded', timeout: 0 });
    const page = await browser.newPage();
    // let a=0
    // for(a=0; a<cookie.length; a++){
    //     await page.setCookie(cookie[a])
    // }
    // console.log("Куки установлены")
    //await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
    await page.setCookie(...cookie)

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
    // const newFunc = async (page) => {
    //     console.log("Новоя функция")
    //     await page.screenshot({ path: "./client/src/images/Capcha.png", fullPage: true })

    // }
    // newFunc(page)

    console.log("Browser Ok")

    await page.screenshot({ path: "авторуКапча.png", fullPage: true })

    const checkCaptcha = await page.$('input[class="CheckboxCaptcha-Button"]');
    if (checkCaptcha !== null) {
        await checkCaptcha.click()
        console.log("Проход капчи")

        let result = {
            page: page,
            browser: browser,
            capchaSrc: ''
        }


        const navigationPromiseCaptcha = page.waitForSelector('img[class="AdvancedCaptcha-Image"]'); //{timeout: 0}
        try {
            await navigationPromiseCaptcha
        }
        catch (e) {
        }

        const searchCapchaSrc = await page.evaluate(() => {
            let capchaSrc = ''
            if (document.querySelector('img[class="AdvancedCaptcha-Image"]') !== null) {
                console.log('aaa')
                let productImage = document.querySelector('img[class="AdvancedCaptcha-Image"]').src;
                console.log(JSON.stringify(productImage))
                capchaSrc = productImage
            }
            return capchaSrc
        })
        const resOfSearch = searchCapchaSrc

        result.capchaSrc = resOfSearch

        // if (page.$(`img[class="AdvancedCaptcha-Image"]`) !== null && page.$(`img[class="AdvancedCaptcha-Image"]`) !== undefined) {

        // }

        // setTimeout(async () => {
        //     console.log("start screen")
        //     await page.screenshot({ path: "./client/src/images/Capcha.png", fullPage: true })

        //     const result = {
        //         page: page,
        //         browser: browser
        //     }

        //     return result
        // }, 3000);


        // console.log("Screen")

        await page.screenshot({ path: "./client/src/images/Capcha.png", fullPage: true })


        return result


        // const navigationPromiseCaptcha = page.waitForSelector('div[class^="ListingGeoRadiusCounters__item"]', {timeout: 0}); //{timeout: 0}
        // console.log(JSON.stringify(navigationPromiseCaptcha))

        // try{
        //     await navigationPromiseCaptcha
        //     console.log("Ожидание прохода капчи закончено")
        // }
        // catch (e) {
        //     await page.screenshot({ path: "авторуКапча.png", fullPage: true })
        // }
    }
    else {
        console.log("Капчи нет")
    }
    console.log('за функ')

    // await page.screenshot({ path: "Location.png", fullPage: true })

    ///////////////////////////////////////////////////////////////////////////////////////// Поиск по радиусу
    // const locationSelect = await page.$$('div[class="ListingGeoRadiusCounters__item"]')
    // if(locationSelect) {
    //     console.log("Ожидание клика по региону")
    //     await locationSelect[0].click()
    //     console.log("Клика по региону успешно")
    //     const navigationPromiseRegion = page.waitForSelector('div[class^="ListingItem"]');

    //     console.log(JSON.stringify(navigationPromiseRegion))
    //     try {
    //         await navigationPromiseRegion
    //     }
    //     catch (e) {
    //         console.log("Ошибка при ожидании")
    //     }

    // }
    /////////////////////////////////////////////////////////////////////////////////////////

    // console.log("Нажатие на кнопку Поиск")
    // const locationSelect = await page.$('span[class="GeoSelect__titleShrinker-wjCdV"]')
    // if (locationSelect) {
    //     await locationSelect.click()
    //     console.log("Click location search")
    //     // const navigationPromise = page.waitForSelector('div[data-marker^="item"]');
    //     // await navigationPromise
    // }
    // console.log("Нажатие на кнопку Поиск")
    // const locationSelected = await page.$('span[class="GeoSelectSlider__item GeoSelectSlider__item_value_0"]')
    // if (locationSelected) {
    //     await locationSelected.click()
    //     console.log("Click location")
    // }
    // await page.screenshot({ path: "Location.png", fullPage: true })

    // // 'button[class="Button Button_color_whiteHoverBlue Button_place_bottom Button_size_xl Button_type_button Button_width_full"]'
    // console.log("Нажатие на кнопку Поиск")
    // const locationBotton = await page.$('button[class="Button Button_color_whiteHoverBlue Button_place_bottom Button_size_xl Button_type_button Button_width_full"]')
    // if (locationBotton) {
    //     await locationBotton.click()
    //     await page.screenshot({ path: "авторуПоиск.png", fullPage: true })

    //     const navigationPromiseCaptcha = page.waitForSelector('div[class^="GeoSelect__title-wkExE"]');
    //     await navigationPromiseCaptcha
    //     console.log("Click location botton")
    // }

    // const url2 = `https://auto.ru/${city}/cars/${brand}/${model}/all/?year_from=${yearFrom}&year_to=${yearTo}&price_from=${priceFrom}&price_to=${priceTo}&sort=price-desc`

    // await page.goto(url2, { waitUntil: 'domcontentloaded', timeout: 0 });

    // const checkCaptcha2 = await page.$('input[class="CheckboxCaptcha-Button"]');
    // if (checkCaptcha2 !== null) {
    //     await checkCaptcha2.click()
    //     console.log("Проход капчи")
    //     const navigationPromiseCaptcha = page.waitForSelector('div[class^="GeoSelect__title-wkExE"]');
    //     await navigationPromiseCaptcha
    // }
    // else {
    //     console.log("Капчи нет")
    // }

    // await page.screenshot({ path: "url2.png", fullPage: true })


    // if (avtoItem.querySelector(`div[class="ListingItem__thumb"] .Link`) !== null) {
    //     let productHref = avtoItem.querySelector(`div[class="ListingItem__thumb"] .Link`).getAttribute('href');
    //     avto.href = productHref
    // }

    // if(sorting !== '') {
    //     const selectorSort = await page.$('div[class="ListingFilterPanel__controls ListingFilterPanel__controls_sortFilter"] .Button');
    //     console.log(selectorSort)
    //     if (selectorSort !== null) {
    //         await selectorSort.click()
    //         await page.screenshot({ path: "Sort.png", fullPage: true })
    //         console.log("Открыт селектор на сортировку")
    //     }
    //     const setSort = await page.$$('div[class="MenuItem MenuItem_size_m"]');
    //     if(sorting === 'price-asc'){
    //         await setSort[2].click()
    //         console.log("Искать дешевле")
    //         // setTimeout(function(){
    //         //     console.log("Ожидание 10 сек")
    //         // }, 18000);
    //         let i = true
    //         while(i === true ){
    //             let waitSort = await page.$('div[class="ListingCars__loaderOverlay ListingCars__loaderOverlay_visible"]');
    //             if(waitSort === null){
    //                 console.log("Подгрузка окончены")
    //                 i = false
    //             }
    //             else {
    //                 console.log("Подгрузка")
    //             }

    //         }

    //         await page.screenshot({ path: "SortPri2.png", fullPage: true })

    //         const navigationPromiseSort = page.waitForSelector('div[class^="ListingItem"]');
    //         console.log("Начало Ожидания подгрузки после сортировки")

    //         await navigationPromiseSort
    //         console.log("Конец Ожидание подгрузки после сортировки")
    //         // await page.evaluate(            await page.screenshot({ path: "SortPri2.png", fullPage: true })
    //         // );

    //     }
    // }
    // class="ListingCars__loaderOverlay ListingCars__loaderOverlay_visible"

    ////////////////////////////////////////////////////////////////////////////////////////// Указание года
    // if (yearFrom.length > 0) {
    //     // Вставка года от
    //     console.log("Вставка года от")
    //     await page.type('input[class="TextInput__control"]', yearFrom);
    // }
    // if (yearTo.length > 0) {
    //     // Вставка года до
    //     console.log("Вставка года до")
    //     await page.type('input[class="TextInput__control"]', yearTo);
    // }
    // await page.screenshot({ path: "авторуPrice.png", fullPage: true })
    // await page.screenshot({ path: "Res.png", fullPage: true })

    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 400;
                var timer = setInterval(() => {
                    var scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;

                    if (totalHeight >= scrollHeight - window.innerHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 50);
            });
        });
    }

    console.log("Scroll start")
    await autoScroll(page);
    console.log("Scroll end")
    // await page.screenshot({ path: "авторуScroll.png", fullPage: true })



    console.log("Поиск")


    //Поиск авто
    const searchId = await page.evaluate(() => {

        let arrayOfAvto = []
        let arrayOfId = []

        let totalSearchResults = Array.from(document.querySelectorAll('div[class="ListingItem"]'));

        let arr = []

        totalSearchResults.map(item => {
            if (item !== undefined) (
                arr.push(item)
            )
        })

        let countOfAutoString
        if (document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`) !== null) {
            countOfAutoString = document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`).innerText;
            if (countOfAutoString !== undefined) {
                countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")

            }
            arrayOfAvto.push(countOfAutoString)
        }

        arr.map(avtoItem => {
            let avto = {
                name: '',
                price: '',
                city: '',
                image: '',
                href: '',
                iframeSrc: '',
                info: '',
                description: '',
                time: '',
                snippen: ''
            }

            let productYear = avtoItem.querySelector('div[class="ListingItem__year"]').innerText;
            let productName = avtoItem.querySelector('a[class="Link ListingItemTitle__link"]').innerText;
            avto.name = productName + " " + productYear

            let productPrice = avtoItem.querySelector(`div[class="ListingItemPrice__content"]`).innerText;
            avto.price = productPrice

            // Город
            if (avtoItem.querySelector(`div[class="ListingItem__additionalInfo"]`) !== null) {
                let productCity = avtoItem.querySelector(`div[class="ListingItem__additionalInfo"]`).innerText;
                avto.city = productCity
            }

            // Фото
            // if (avtoItem.querySelector(`div[class="ListingItem__thumb"] .LazyImage__image`) !== null) {
            //     let productImage = avtoItem.querySelector(`div[class="ListingItem__thumb"] .LazyImage__image`).src;

            //     avto.image = productImage
            // }

            if (avtoItem.querySelector(`img[class="LazyImage__image"]`) !== null) {
                let productImage = avtoItem.querySelector(`img[class="LazyImage__image"]`).src;

                avto.image = productImage
            }

            // ><img class="LazyImage__image" alt="2012 LADA (ВАЗ) Priora I, красный, 480000 рублей, вид 1" src="


            // if (avtoItem.querySelector(`div[class="ListingItem__thumb"] `) !== null) {
            //     let productIframeHref = avtoItem.querySelector(`div[class="ListingItem__thumb"]`).innerHTML ;
            //     avto.iframeSrc = productIframeHref
            // }
            // if (avtoItem.querySelector(`div[class="ListingItem__thumb"] `) !== null) {
            //     let productImage = avtoItem.querySelector(`div[class="ListingItem__thumb"]`).innerHTML ;
            //     avto.image = productImage
            // }


            // Ссылка
            if (avtoItem.querySelector(`div[class="ListingItem__thumb"] .Link`) !== null) {
                let productHref = avtoItem.querySelector(`div[class="ListingItem__thumb"] .Link`).getAttribute('href');
                avto.href = productHref
            }
            if (avtoItem.querySelectorAll('div[class="ListingItemTechSummaryDesktop__cell"]') !== null) {
                let productHrefInfo = Array.from(avtoItem.querySelectorAll('div[class="ListingItemTechSummaryDesktop__cell"]'));
                let productInfo = ''

                productHrefInfo.map(item => {
                    productInfo += item.innerText
                })
                avto.info = productInfo
            }

            // ///////////////
            // let arrayOfInfo = Array.from(avtoItem.querySelectorAll('div[class="ListingItemTechSummaryDesktop__cell"]'));

            // predInfo = ''
            // arrayOfInfo.map(infiItem => {
            //     if (infiItem !== null) {
            //         let productInfo = infiItem.innerText;
            //         console.log(productInfo)
            //         predInfo += " " + productInfo
            //     }
            // })
            // avto.info = predInfo
            // // Информация


            // // Доп инфа
            // if (avtoItem.querySelector(`div[class="ListingItem__priceBadge"] .OfferPriceBadge `) !== null) {
            //     let productSnippen = avtoItem.querySelector(`div[class="ListingItem__priceBadge"] .OfferPriceBadge `).innerText;
            //     avto.snippen = productSnippen
            // }


            arrayOfAvto.push(avto)
        })

        return arrayOfAvto
    })

    const arrayOfAuto = searchId

    // const page2 = await browser.newPage();
    // await page2.goto(url, { waitUntil: 'networkidle2', timeout: 0 });

    // console.log(JSON.stringify(searchId))


    ////////////////////////////////////////////////////////////////////////////////////////   Указание цены и переход по кнопке "показать объявления"
    // Вставка цены от
    // await page.type('input[data-marker="price/from"]', priceFrom); 
    // // Вставка цены до
    // await page.type('input[data-marker="price/to"]', priceTo); 

    // // кнопка "показать объявления"
    // const viewCars = await page.$('button[data-marker="search-filters/submit-button"]');
    // if(viewCars !== null) {
    //     await viewCars.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // else {
    //     console.log("Кнопка показа обьявлений не доступна")
    // }
    // const  navigationPromiseSelector = page.waitForSelector('div[data-marker^="item"]');
    // await navigationPromiseSelector

    // console.log("Вставка")
    ////////////////////////////////////////////////////////////////////////////////////////

    // let arrOfImages = []

    // arrayOfAuto.map(item => {

    //     async function getImg() {
    //         const page2 = await browser.newPage();
    //         await page2.goto(item.href, { waitUntil: 'domcontentloaded', timeout: 0 });

    //         const searchId = await page2.evaluate(() => {
    //             let productImage = document.querySelector('div[class="ImageGalleryDesktop"] .ImageGalleryDesktop__image').src;
    //             arrOfImages.push(productImage)
    //         })
    //         await page2.close()
    //     }
    //     getImg()

    // })

    // console.log(arrOfImages)




    // arrayOfAuto.map(item => {
    //     let arrr = []
    //     async function getImg() {
    //         let images = {
    //             img: ''
    //         }
    //         const page2 = await browser.newPage();
    //         await page2.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
    //         const page2Img = await page.$('div[class="ImageGalleryDesktop__itemContainer"] .ImageGalleryDesktop__image').src;
    //         console.log(page2Img)
    //         images.img = page2Img
    //         await page2.close()
    //         return images
    //     }
    //     getImg()


    // })


    // await page.screenshot({ path: "example.png", fullPage: true })
    await browser.close();

    console.log(arrayOfAuto)
    return arrayOfAuto

    // //Выбор города 
    // const selectorCity = await page.$('div[data-marker="search-form/region"]');
    // console.log(selectorCity)
    // if(selectorCity !== null) {
    //     await selectorCity.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // await page.screenshot({ path: "example.png", fullPage: true })

    // const  navigationPromiseSelector = page.waitForSelector('input[data-marker="popup-location/region/input"]');
    // await navigationPromiseSelector


    //await page.type('input[data-marker="popup-location/region/input"]', 'Казань'); // Вставка города в поиск

    // // Искать только в выбранном городе
    // const selectorLocation = await page.$('input[class="checkbox-input-uPrBY"]');
    // if(selectorLocation === null){
    //     console.log("Не удалось выбрать Сначала в выбранном городу")
    // }
    // else {
    //     await selectorLocation.click()
    //     console.log("Сначала в выбранном городе")
    // }
    ////////////////////////////////////////////////////////////////////////////////////////

    // // Искать только в выбранном городе
    // const location = await page.$('input[name="localPriority"]');
    // if(location !== null){
    //     await location.click()
    // }
    // await page.screenshot({ path: "wxample.png", fullPage: true })
    ////////////////////////////////////////////////////////////////////////////////////////


    // // Нажатие на кнопку Поиск
    // const searchButton = await page.$('button[data-marker="search-form/submit-button"]')
    // if(searchButton){
    //     await searchButton.click()
    // }
    // const  navigationPromise = page.waitForSelector('div[data-marker^="item"]');
    // await navigationPromise
    // ////////////////////////////////////////////////////////////////////////////////////////


    // //Ждем пока загрузиться нужный div
    // await page.waitForTimeout('div[data-marker^="item"]')
    // // Скриншот
    // await page.screenshot({ path: "location.png", fullPage: true })

}

module.exports.fetchProductListAvtoRu = fetchProductListAvtoRu

