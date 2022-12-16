async function fetchProductListAvtoRuCatptha(page, browser, capcha) {

    await page.type('input[class="Textinput-Control"]',capcha);

    const buttonSend = await page.$('button[aria-describedby="submit-description"]');
    if (buttonSend !== null) {
        await buttonSend.click()
        console.log("Оптравка капчи")
    }

    await page.waitForSelector('div[class="ListingItem"]');



    async function autoScroll(page) {
        await page.evaluate(async () => {
            await new Promise((resolve) => {
                var totalHeight = 0;
                var distance = 200;
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

            if (avtoItem.querySelector(`img[class="LazyImage__image"]`) !== null) {
                let productImage = avtoItem.querySelector(`img[class="LazyImage__image"]`).src;

                avto.image = productImage
            }

           
            // Ссылка
            if (avtoItem.querySelector(`div[class="ListingItem__thumb"] .Link`) !== null) {
                let productHref = avtoItem.querySelector(`div[class="ListingItem__thumb"] .Link`).getAttribute('href');
                avto.href = productHref
            }
            if(avtoItem.querySelectorAll('div[class="ListingItemTechSummaryDesktop__cell"]') !== null) {
                let productHrefInfo = Array.from(avtoItem.querySelectorAll('div[class="ListingItemTechSummaryDesktop__cell"]'));
                let productInfo = ''

                productHrefInfo.map(item => {
                    productInfo += item.innerText
                })
                avto.info = productInfo
            }   
            arrayOfAvto.push(avto)
        })

        return arrayOfAvto
    })

    const arrayOfAuto = searchId
    console.log(arrayOfAuto)
    await browser.close()
    return arrayOfAuto
}
module.exports.fetchProductListAvtoRuCatptha = fetchProductListAvtoRuCatptha
