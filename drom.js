async function fetchProductListDrom(filters) {
    console.log(filters)

    const city = filters.city.dromHref
    const brand = filters.brand.dromHref
    const model = filters.model.dromHref
    const priceFrom = filters.priceFrom
    const priceTo = filters.priceTo
    const yearFrom = filters.yearFrom
    const yearTo = filters.yearTo
    const sorting = filters.sorting.dromHref

    const puppeteer = require('puppeteer');
    console.log("Start")


    let url = `${city}lada/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&${sorting}`
    if(brand !== '') {
        url = `${city}${brand}/all/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&${sorting}`
        if(model !== ''){
            url = `${city}${brand}/${model}/?minprice=${priceFrom}&maxprice=${priceTo}&minyear=${yearFrom}&maxyear=${yearTo}&unsold=1&${sorting}`
        }
    }



    console.log(url)
    const browser = await puppeteer.launch() //{ headless: false }
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });


    const searchId = await page.evaluate(() => {
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
            let productName = avtoItem.querySelector('span[data-ftid="bull_title"]').innerText;
            avto.name = productName

            let productPrice = avtoItem.querySelector(`span[data-ftid="bull_price"]`).innerText;
            avto.price = productPrice

            // Город
            let productCity = avtoItem.querySelector(`span[data-ftid="bull_location"]`).innerText;
            avto.city = productCity

            // Фото
            if(avtoItem.querySelector(`img`) !== null) {
                let productImage = avtoItem.querySelector(`img`);
                if(productImage !== null || productImage !== undefined){
                    if(productImage.dataset !== null){
                        if(productImage.dataset.srcset !== undefined){
                            productImage = productImage.dataset.srcset.split(',')[0];
                            productImage = productImage.substring(0, productImage.length - 3)
                            avto.image = productImage
                        }
                    }
                   
                }
            }
     
            //Ссылка
            let productHref = avtoItem.getAttribute('href');
            avto.href = productHref

            // Информация
            let productInfo = ''
            // let productInfoArr = avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`);
            let productInfoArr = Array.from(avtoItem.querySelectorAll(`span[data-ftid="bull_description-item"]`));
            // avto.info = productInfoArr
            if (Array.isArray(productInfoArr)) {
                productInfoArr.map((item, index) => {
                    productInfo = productInfo + item.innerText
                })
                avto.info = productInfo
            }

            // Время
            let productTime = avtoItem.querySelector(`div[data-ftid="bull_date"]`).innerText;
            avto.time = productTime

            if (avtoItem.querySelector(`div[class="css-11m58oj evjskuu0"]`) !== null) {
                let productSnippet = avtoItem.querySelector(`div[class="css-11m58oj evjskuu0"]`).innerText;
                avto.snippen = productSnippet
            }


            arrayOfAvto.push(avto)

        })
        return arrayOfAvto
    })

    const arrayOfAuto = searchId
    await browser.close();

    console.log(arrayOfAuto)
    return arrayOfAuto

}

module.exports.fetchProductListDrom = fetchProductListDrom
