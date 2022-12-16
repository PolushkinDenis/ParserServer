async function fetchProductListAvito(filters) {
    console.log("111111")


    const puppeteer = require('puppeteer');
    console.log("222222")
    console.log(filters)

    // params[188][from]:
    // params[188][to]: 

    // let yearFrom = filters.yearFrom
    // let yearTo = filter

    // if(filters.yearFrom !== ''){
    //     filters.yearFrom === '1990' && 
    //     1990 - 883
    //     1991 - 884
    //     1992 - 885
    //     1993 - 886
    //     1994 - 887
    //     1995 - 888
    //     1996 - 889
    //     1997 - 890
    //     1998 - 891
    //     1999 - 892
    //     2000 - 893
    //     2001 - 894
    //     2002 - 895
    //     2003 - 896
    //     2004 - 897
    //     2005 - 898
    //     2006 - 899
    //     2007 - 900
    //     2008 - 901
    //     2009 - 902
    //     2010 - 2844
    //     2011 - 2845
    //     2012 - 6045
    //     2013 - 8581
    //     2014 - 11017
    //     2015 - 13978
    //     2016 - 16381
    //     2017 - 19775
    //     2018 - 20303
    //     2019 - 405242
    //     2020 - 431789

    //     2021 - 505547
    //     2022 - 2370848
    // }

   const cookis = [
        {
            "domain": ".avito.ru",
            "expirationDate": '33123500554.131474',
            "hostOnly": false,
            "httpOnly": false,
            "name": "buyer_selected_search_radius4",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "0_general"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1666720399.6188',
            "hostOnly": false,
            "httpOnly": true,
            "name": "isLegalPerson",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "0"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1701280200.127352',
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ga_M29JC28873",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "GS1.1.1666719071.121.1.1666720200.60.0.0"
        },
        {
            "domain": "www.avito.ru",
            "expirationDate": 1679428596,
            "hostOnly": true,
            "httpOnly": false,
            "name": "lastViewingTime",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1647892596226"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '33115253181.137608',
            "hostOnly": false,
            "httpOnly": false,
            "name": "buyer_selected_search_radius2",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "0_job"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '33132100436.981308',
            "hostOnly": false,
            "httpOnly": true,
            "name": "buyer_local_priority_v2",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1666732523,
            "hostOnly": false,
            "httpOnly": false,
            "name": "ft",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "k4zKxCX2BJC0HxuJX8JSjZlvBcqao+T4Pkr+tdsWG/S40d0NX8Rh5wngkNWpadMtrnl+0ZCvBAdxViN8bBcvOkSFm+d5kq0SeMLg75SucU07ldIxAYJHfWLzvQA+q17TJ8zfmvV1F/yI+dqS+PNRZb+pVLv1soFdICv2rV0FC3qlqU8/qlXCr3+CyJbT03fe"
        },
        {
            "domain": "www.avito.ru",
            "hostOnly": true,
            "httpOnly": false,
            "name": "isCriteoSetNew",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "true"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '33131917990.969646',
            "hostOnly": false,
            "httpOnly": false,
            "name": "buyer_selected_search_radius0",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "100"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1695491400,
            "hostOnly": false,
            "httpOnly": false,
            "name": "tmr_lvid",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "702c5f968aa2822f6f3f0b62633f2a4d"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1666806599,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_gid",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "GA1.2.418300143.1666368378"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1701280200.219342',
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ga_9E363E7BES",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "GS1.1.1666719072.328.1.1666720200.60.0.0"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1723066413,
            "hostOnly": false,
            "httpOnly": false,
            "name": "uxs_uid",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "c110e590-1761-11ed-89f7-d141753c32b0"
        },
        {
            "domain": "www.avito.ru",
            "hostOnly": true,
            "httpOnly": false,
            "name": "abp",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1666720795.320053',
            "hostOnly": false,
            "httpOnly": true,
            "name": "dfp_group",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "51"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1701280200.224549',
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ga",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "GA1.1.2059068338.1604256234"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1695491400,
            "hostOnly": false,
            "httpOnly": false,
            "name": "tmr_reqNum",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1853"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1666732522,
            "hostOnly": false,
            "httpOnly": false,
            "name": "f",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "5.df155a60305e515acc0065cb1b69001fb456d7c4b56f6c0cb456d7c4b56f6c0c02c2f5f4b9c76ee4a68643d4d8df96e94f9572e6986d0c624f9572e6986d0c624f9572e6986d0c624f9572e6986d0c624f9572e6986d0c627e7721a3e5d3cdbb46b8ae4e81acb9fa143114829cf33ca746b8ae4e81acb9fa46b8ae4e81acb9fae992ad2cc54b8aa8fbcd99d4b9f4cbdabcc8809df8ce07f640e3fb81381f359178ba5f931b08c66a59b49948619279110df103df0c26013a2ebf3cb6fd35a0acf722fe85c94f7d0c0df103df0c26013a7b0d53c7afc06d0bba0ac8037e2b74f92da10fb74cac1eab71e7cb57bbcb8e0f71e7cb57bbcb8e0f2da10fb74cac1eab0df103df0c26013a037e1fbb3ea05095de87ad3b397f946b4c41e97fe93686adecb8388123cde3fbe04c1cd198727a0602c730c0109b9fbb09c552e66b89ff828a9e85e420cac82d29aa4cecca288d6b49f77c0a8fe06698dd77fd0f5435baf746b8ae4e81acb9fa46b8ae4e81acb9fa02c68186b443a7ac4c51f6e36372136388b3677e262d84672da10fb74cac1eab2da10fb74cac1eab25037f810d2d41a8134ecdeb26beb8b53778cee096b7b985bf37df0d1894b088"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1669293508,
            "hostOnly": false,
            "httpOnly": false,
            "name": "__gpi",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "00000000-0000-0000-0000-000000000000"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1689874127,
            "hostOnly": false,
            "httpOnly": false,
            "name": "__utma",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "99926606.2059068338.1604256234.1625171494.1626801873.179"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1670170719,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_gcl_au",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1.1.1851309939.1662394719"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1683804742,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ym_d",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1652268742"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1666763340,
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
            "domain": ".avito.ru",
            "expirationDate": 1683804742,
            "hostOnly": false,
            "httpOnly": false,
            "name": "_ym_uid",
            "path": "/",
            "sameSite": "no_restriction",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1604256236909952827"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1666722012,
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
            "domain": ".avito.ru",
            "expirationDate": '1772561248.594729',
            "hostOnly": false,
            "httpOnly": true,
            "name": "auth",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1698256195.319633',
            "hostOnly": false,
            "httpOnly": true,
            "name": "buyer_laas_location",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "653040"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1698256195.319733',
            "hostOnly": false,
            "httpOnly": true,
            "name": "buyer_location_id",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "653040"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1666777734.561801',
            "hostOnly": false,
            "httpOnly": true,
            "name": "luri",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "samara"
        },
        {
            "domain": ".avito.ru",
            "hostOnly": false,
            "httpOnly": false,
            "name": "redirectMav",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": true,
            "storeId": null,
            "value": "1"
        },
        {
            "domain": "www.avito.ru",
            "hostOnly": true,
            "httpOnly": false,
            "name": "SEARCH_HISTORY_IDS",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": true,
            "storeId": null,
            "value": "0%2C"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1772561248.594683',
            "hostOnly": false,
            "httpOnly": true,
            "name": "sessid",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "7b8942a4a81c3b2a3bf72f6fceda49a8.1614881248"
        },
        {
            "domain": "www.avito.ru",
            "expirationDate": 1684149211,
            "hostOnly": true,
            "httpOnly": false,
            "name": "showedStoryIds",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "144-143-142-136-133-111-135-124-129-134-132-131-128-121-122-120-116-115-112-104-99-94"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1667324995.319848',
            "hostOnly": false,
            "httpOnly": true,
            "name": "sx",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "H4sIAAAAAAAC%2F1zUXa7qvg4F8LnwvB%2BcxIntM5vESSj9pJRC6dGe%2BxVHggv%2FCfy0tLLivwdw1hsw1cQi2VJBW6skAVeganHu8Ofv4Xb4c0jnILPUh5OluIsOzUzbde37whcs4g4%2Fh3L4Y0II5Fzw9PtzgPr0MpAWyZFYc4wQORFIZrbxJWfUk%2BPF3%2F3O7VLrcFwX6vWczW5TLx8ySRD3%2B3MwBhxZIEOBBCpKiIELUs3ZGmfKS45dq43aKVC7G6sN2dmxRyrNNd5985kZHcBTluyq9x5rSWSiFLZYXMg1Zqihykv2dbbxOONw9nNP6XFtNLYzKBo506QfslgO4ffnYIuzFGtyCYv3gVIGWwqqN8Qs8O65GaZxHB7TY0orcvu4tgSZwV90S7e2%2F8psnPn9OTgSZlcQS45UpShTQKroDRVL8m4DB%2FRDukEAOVm9nIIoj5BOOV0WWcevnq3npxxziJo4pAihJKgUjGhRm5EJzTuzaOeXu84jRq657G1ptDzatMqKl5U%2BZAYnz8zecKzWZKta%2BTk%2Fq8WIQS21lmzfma92y6X39wrjfp2nsPLleh2nM8nS2Uf6ygzy7DmEEDRTqBLEBwxSKBUnmTyoUn6%2F4KO2UGBhXuYQU78tPnV2WS7hfFrYXP8vMwQv9E8WX61nTVSSgoJRsT4ZCsyJ8J05NI8y7hPs0NoE5201gHdzbd3lGNL23TP%2Fe8HAlZ65xXsbwSJmDE6TmJKtWKwvuWunfm6M2WO%2Fznk8wtLFjYbGn7b7Yw5fsoB9yoWyMdEkZWOIQ7IpCqoGjNnkSC%2B56AR0vs9xlCUPnZ2djYPDPR5Lrvj5u4UNPXsmpw5BnENXU7VgE2K0EITVOmD7zrwOJWoa5kD7vizny21jWceuP6UthuPnNghJfn8OnFkQCclhLYhotRabrDEeaq0EL7k9izZluZwuV75Nx9G6c53oVh6pzSDzfzI%2Fe47BGohu7ZY7d9AtCNOxQ%2By6F6mEnQ68%2B0vfyLLvodnb4dFNfjmNzfg5ZCLyz1OkSZmsl5ArYKVoc0DAEJ0rThK%2Fv8hdYVgGada%2BtJ3pL4%2FchCsH6%2FvtdOfu62BY9v%2FkWgopIUXIMdSUE0VrwVLSpDa%2FZJrS9hjjGIe9JxhuE2B4rEsV3Hj1t09ZGJ5DzgzoELy3it4GVs9ZnMuGs2cf3qPobLOkclQK8zrmnkq9nKHjPbFZR7p%2BHwzzbKM45uozUfHkSs3i1boEaqITjM6%2FM7vclXa6TtO%2B26L3kneN2zbnNmzSu6%2BDYfCfHDVC8c6r1ijKAlWMD9EwEzof3qO4coZEpWvP5yZh6eflTGRbOrHqCJ%2Fn03qA39%2F%2FBQAA%2F%2F83p%2BuyAgcAAA%3D%3D"
        },
        {
            "domain": "www.avito.ru",
            "expirationDate": 1666806609,
            "hostOnly": true,
            "httpOnly": false,
            "name": "tmr_detect",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "0%7C1666720209524"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": 1695491400,
            "hostOnly": false,
            "httpOnly": false,
            "name": "tmr_lvidTS",
            "path": "/",
            "sameSite": 'null',
            "secure": false,
            "session": false,
            "storeId": null,
            "value": "1656869694063"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1701280211.201382',
            "hostOnly": false,
            "httpOnly": true,
            "name": "u",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "2kdugaxn.1dfrena.wyiop9ruzag0"
        },
        {
            "domain": ".avito.ru",
            "expirationDate": '1666722050.766581',
            "hostOnly": false,
            "httpOnly": true,
            "name": "v",
            "path": "/",
            "sameSite": "lax",
            "secure": true,
            "session": false,
            "storeId": null,
            "value": "1666719497"
        }
    ]

    const city = filters.city.avitoHref
    const brand = filters.brand.hrefAvito
    const model = filters.model.hrefAvito
    const priceFrom = filters.priceFrom
    const priceTo = filters.priceTo
    const yearFrom = filters.yearFrom
    const yearTo = filters.yearTo
    const sorting = filters.sorting.avitoSorting
    console.log("AAAA")

    // const url = `https://www.avito.ru/${city}/avtomobili/?localPriority=1&cd=1&radius=0`;

    // if(brand !== '') {
    //     url = `https://www.avito.ru/${city}/avtomobili/?localPriority=1&cd=1&radius=0&${sorting}`    
    // }
    const url = `https://www.avito.ru/${city}/avtomobili/${brand}/${model}?localPriority=1&cd=1&radius=0&${sorting}&pmin=${priceFrom}&pmax=${priceTo}`;
    console.log(url)

    console.log("BBBB")

    //const url = `https://www.avito.ru/kazan/avtomobili/audi?cd=1&${sorting}&radius=0&localPriority=1`;
    //const url = `https://www.avito.ru/kazan/avtomobili?localPriority=1&cd=1&radius=0`;
    // const url = `https://www.avito.ru/kazan/avtomobili/audi?cd=1&radius=0`;


    const browser = await puppeteer.launch() //{ headless: false }
    console.log("launch")
    const page = await browser.newPage();
    // await page.setCookie(...cookis)
    console.log("newPage")

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 0 });
    await page.setCookie(...cookis)

    console.log("Открытие браузера")


    // await page.screenshot({ path: "scroll.png", fullPage: true })

    // //class="button-loaderBox-FsR1g"
    // //  samarskaya_oblast oktyabrsk

    ////////////////////////////////////////////////////////////////////////////////////////// Указание года
    if (yearFrom.length > 0) {
        // Вставка года от
        console.log("Вставка года от")
        await page.type('input[data-marker="params[188]/from/input"]', yearFrom);
    }
    if (yearTo.length > 0) {
        // Вставка года до
        console.log("Вставка года до")
        await page.type('input[data-marker="params[188]/to/input"]', yearTo);
    }
    // await page.screenshot({ path: "avitoYears.png", fullPage: true })
    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // ////////////////////////////////////////////////////////////////////////////////////////   Указание цены и переход по кнопке "показать объявления"
    // Вставка цены от
    // if (priceFrom.length > 0) {
    //     // Вставка цены от
    //     console.log(" Вставка цены от")
    //     await page.type('input[data-marker="price/from"]', priceFrom);
    // }
    // if (priceTo.length > 0) {
    //     // Вставка цены до
    //     console.log(" Вставка цены до")
    //     await page.type('input[data-marker="price/to"]', priceTo);
    // }


    // // кнопка "показать объявления"
    // const viewCars = await page.$('button[data-marker="search-filters/submit-button"]');
    // if (viewCars !== null) {
    //     await viewCars.click()
    //     console.log("Открыто модальное окно для выбора города")
    // }
    // else {
    //     console.log("Кнопка показа обьявлений не доступна")
    // }
    // const navigationPromiseSelector = page.waitForSelector('div[data-marker^="item"]');
    // await navigationPromiseSelector

    // console.log("Вставка")
    // ////////////////////////////////////////////////////////////////////////////////////////

    // await page.screenshot({ path: "Avito.png", fullPage: true })

    //Выбор города 
    console.log("Открытие модального окна для выбора города")
    const selectorCity = await page.$('div[data-marker="search-form/region"]');
    console.log(selectorCity)
    if (selectorCity !== null) {
        await selectorCity.click()
        console.log("Открыто модальное окно для выбора города")
    }
    // await page.screenshot({ path: "example.png", fullPage: true })

    // const  navigationPromiseSelector = page.waitForSelector('input[data-marker="popup-location/region/input"]');
    // await navigationPromiseSelector

    //await page.type('input[data-marker="popup-location/region/input"]', 'Казань'); // Вставка города в поиск

    // Искать только в выбранном городе
    const selectorLocation = await page.$('input[class="checkbox-input-uPrBY"]');
    if (selectorLocation === null) {
        console.log("Не удалось выбрать Сначала в выбранном городу")
    }
    else {
        // console.log(selectorLocation.innerHTML)
        await selectorLocation.click()
        console.log("Сначала в выбранном городе")
    }
    // ////////////////////////////////////////////////////////////////////////////////////////

    // // Искать только в выбранном городе
    // const location = await page.$('input[name="localPriority"]');
    // if (location !== null) {
    //     await location.click()
    // }
    // await page.screenshot({ path: "wxample.png", fullPage: true })
    // ////////////////////////////////////////////////////////////////////////////////////////

    const regionList = await page.$$('div[class="radio-group-item-_qq7z"]')
    if (regionList !== null && regionList !== undefined) {
        if (regionList[1] !== undefined) {
            await regionList[1].click()
            console.log("Нажатие на радиус")
        }
    }

    console.log("Нажатие на кнопку Поиск")
    const searchButton = await page.$('button[data-marker="popup-location/save-button"]')
    console.log(searchButton)
    if (searchButton) {
        try {
            await searchButton.click()
            console.log("Click location search")
        }
        catch (e) {
            console.log("Ошибка поиска")
        }
        try {
            const navigationPromise = page.waitForSelector('div[data-marker^="item"]');
            await navigationPromise
        }
        catch (e) {
            console.log("Ошибка ожидания после поиска")
        }
    }
    else {
        const searchButton = await page.$('button[data-marker="search-form/submit-button"]')
        if (searchButton !== null) {
            try{
                await searchButton.click()
                console.log("Нажатие кнопки Показать обьявления")
            }
            catch (e) {
                console.log("Ошибка Показать обьявления")
            }
            
        }
        
    }

    // Нажатие на кнопку НАйти
    // const searchButton = await page.$('button[data-marker="search-form/submit-button"]')
    // if (searchButton) {
    //     await searchButton.click()
    //     console.log("Click location search")
    // }
    const navigationPromise = page.waitForSelector('div[data-marker^="item"]');
    try{
        await navigationPromise
    }
    catch (e) {
        console.log("Ошибка")
    }
    // ////////////////////////////////////////////////////////////////////////////////////////

    //Ждем пока загрузиться нужный div
    // await page.waitForTimeout('div[data-marker^="item"]')

    try {
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
                    }, 10);
                });
            });
        }


        console.log("Scroll start")
        await autoScroll(page);
        console.log("Scroll end")

    }
    catch (e) {
        console.log("Ошибка при скролле")
    }




    // Скриншот
    // console.log("Скриншот")
    // await page.screenshot({ path: "location.png", fullPage: true })

    let avitoResult = []
    console.log("Поиск")
    //Поиск авто
    const searchId = await page.evaluate(() => {

        let arrayOfAvto = []
        let arrayOfId = []
        console.log("Поиск start")

        let countOfAutoString
        if (document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`) !== null) {
            countOfAutoString = document.querySelector(`button[data-marker="search-filters/submit-button"] .button-textBox-_SF60`).innerText;
            if (countOfAutoString !== undefined) {
                countOfAutoString = countOfAutoString.replace(/[^0-9]/g, "")

            }
            countOfAutoString = Number(countOfAutoString)
            arrayOfAvto.push(countOfAutoString)
        }

        let totalSearchResults = Array.from(document.querySelectorAll('div[data-marker^="item"]'));
        console.log("Поиск arrray")

        totalSearchResults.map(el => {
            if (el.id.length > 0) {
                arrayOfId.push(el.id)
            }
        })
        console.log("Поиск map res")
        arrayOfId.map(id => {
            let avto = {
                name: '',
                price: '',
                city: '',
                image: '',
                imageSecond: '',
                href: '',
                info: '',
                description: '',
                time: '',
                snippen: ''
            }
            console.log("Поиск formation")

            // Модель и год
            let productName = document.querySelector(`div[id="${id}"] .title-root-zZCwT`).innerText;
            avto.name = productName
            console.log("Model")
            // Цена
            let productPrice = document.querySelector(`div[id="${id}"] .price-text-_YGDY`).innerText;
            avto.price = productPrice
            console.log("Price")

            // Город
            let productCity = document.querySelector(`div[id="${id}"] .geo-root-zPwRk`).innerText;
            avto.city = productCity
            console.log("City")


            // Фото
            if (document.querySelector(`div[id="${id}"] .photo-slider-image-YqMGj`) !== null) {
                let productImage = document.querySelector(`div[id="${id}"] .photo-slider-image-YqMGj`).src;
                avto.image = productImage
                console.log("image")
            }
            // else {

            //     let productImageSecond = document.querySelector(`div[id="${id}"] .photo-slider-list-item-h3A51`).getAttribute("data-marker");
            //     avto.image = productImageSecond
            // }
            if (document.querySelector(`div[id="${id}"] .photo-slider-list-item-h3A51`) !== null) {
                let productImageSecond = document.querySelector(`div[id="${id}"] .photo-slider-list-item-h3A51`).getAttribute("data-marker");
                if (productImageSecond) {
                    avto.imageSecond = productImageSecond.substring(19, productImageSecond.length)
                }
            }


            //2518020402
            // document.querySelector(`div[id="i2518020402"] .photo-slider-list-item-h3A51`)


            // Ссылка
            if (document.querySelector(`div[id="${id}"] .iva-item-sliderLink-uLz1v`) !== null) {
                let productHref = document.querySelector(`div[id="${id}"] .iva-item-sliderLink-uLz1v`).getAttribute('href');
                avto.href = "https://www.avito.ru" + productHref
            }


            // Информация
            let productInfo = document.querySelector(`div[id="${id}"] .iva-item-autoParamsStep-WzfS8`).innerText;
            avto.info = productInfo
            console.log("Info")

            // Описание
            if (document.querySelector(`div[id="${id}"] .iva-item-descriptionStep-C0ty1`) !== null) {
                let productDescription = document.querySelector(`div[id="${id}"] .iva-item-descriptionStep-C0ty1`).innerText;
                avto.description = productDescription
                console.log("Discription")
            }


            // Время
            let productTime = document.querySelector(`div[id="${id}"] .iva-item-dateInfoStep-_acjp`).innerText;
            avto.time = productTime
            console.log("time")

            // Доп инфа
            if (document.querySelector(`div[id="${id}"] .iva-item-badgeBarStep-DJwW2`) !== null) {
                let productSnippet = document.querySelector(`div[id="${id}"] .iva-item-badgeBarStep-DJwW2`).innerText;
                avto.snippen = productSnippet
            }
            console.log("Snippet")


            arrayOfAvto.push(avto)
        })
        return arrayOfAvto
    })
    avitoResult = searchId
    await browser.close();
    console.log(avitoResult)

    console.log(avitoResult.length)
    let newAvitoResult = avitoResult.splice(1, avitoResult[0])

    console.log("Result")
    return newAvitoResult
}

module.exports.fetchProductListAvito = fetchProductListAvito
