const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')

async function main(){
    if (process.argv.length !==3){
        console.error("Only one arguement is allowed")
        process.exit(1)
    }
    const baseURL = process.argv[2]
    const pages = await crawlPage(baseURL, baseURL, {})

    printReport(pages)
}

main()