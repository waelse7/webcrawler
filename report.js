function sortReport(pages){
    const lst = Object.entries(pages)
    lst.sort((a, b) => b[1] - a[1])
    return lst
}
function printReport(pages){
    const sortedPages = sortReport(pages)
    for (const page of sortedPages){
        console.log(`Found ${page[0]} internal links to ${page[1]}`);
    }
}

module.exports = { printReport, sortReport }