const alfy = require('alfy')
const pm = require('pretty-ms')
require('dotenv').config()

const getResults = async function(url) {
  const cache =  alfy.cache.get(url)
  if (cache) {
    return cache
  }
  return alfy.fetch(`https://api.figma.com/v1${url}`, {
    query: { },
    headers: { 'Content-Type': 'application/json', 'x-figma-token': process.env.FIGMA_TOKEN },
    json: true
  }).then(data => {
    alfy.cache.set(url, data, {maxAge: 1000 * 60 * 60 * 24})
    return data
  })
}

// Subtitle formatter, x is the repo object, and format is an array with named formats
const subtitle = (x, format) => {
  return format.map(f => {

    if (f == "modified") {
      return `Modified ${pm(new Date() - new Date(x.last_modified), { compact: true, verbose: true })} ago`
    }

  }).filter(x => x != null).join(" • ")
}

const getUrl = (path, type) => {
  const prefix = type === 'browser' ? 'https://www.figma.com' : 'figma:/'
  return `${prefix}${path}`
}

module.exports = {
  getResults: getResults,
  subtitle: subtitle,
  getUrl: getUrl
}
