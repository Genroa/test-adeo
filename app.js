const data = require('./data')

'use strict'

const args = process.argv

function isEmpty(arr) {
    return (Array.isArray(arr) && arr.length === 0)
}

// This function filters out every animal that does not match the string pattern
const removeNonMatching = (searchedStr, person) => {
    return person.animals.map((animal) => {
        if (animal.name.includes(searchedStr)) {
            return animal
        }
    }).filter(e => e)
}

// "newList" variable + function body kept for readability and ease of edition, but could be simplified even more
const filter = (data, searchedStr) => {
    const newList = data.filter(q => {
        let newCountry = q
        newCountry.people = q.people.filter(p => {
            let newPerson = p
            newPerson.animals = removeNonMatching(searchedStr, p)

            // The 'animals' entry will be removed if there is nothing left inside
            return !isEmpty(newPerson.animals)
        })

        // The 'people' entry will be removed if there is nothing left inside
        return (!isEmpty(newCountry.people))
    })
    return newList
}

const count = (data) => {
    const newList = data.map((country) => {
        country.people.map((person) => {
            person.name = `${person.name} [${person.animals.length}]`
            return person
        })
        country.name = `${country.name} [${country.people.length}]`
        return country
    })
    return newList
}


// USAGE: node app.js --filter=[PATTERN] OR node app.js filter=[PATTERN]
// USAGE: node app.js --count OR node app.js count
// USAGE: node app.js --filter=[PATTERN] --count

// Jest doesn't seem to allow return outside functions yet, and I cannot add Babel allowReturnOutsideFunction for this exercise. Wrapping the logic in a function.
// Functions have been reworked to only do the transformation part, not the display part of the logic. Tests have been adjusted in consequence.
function main() {
    const filterArg = args.find(arg => arg.startsWith("--filter") || arg.startsWith("filter"))
    const countArg = args.find(arg => arg === "--count" || arg === "count")

    // Initial usage check
    if (args.length < 1 || filterArg === null && countArg === null) {
        console.log('Wrong arguments')
        return
    }

    let processedData = data

    // Filtering
    if (filterArg !== undefined) {
        const cmd = filterArg.split("=")
        processedData = filter(processedData, cmd[1])
        if (isEmpty(processedData)) {
            console.log('Nothing found')
            return
        }
    }

    // Counting
    if (countArg !== undefined) {
        processedData = count(processedData)
    }

    console.log(JSON.stringify(processedData))
}

try { main() }
catch (err) { throw err }


module.exports = {
    count, filter
}
