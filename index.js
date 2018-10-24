const alfy = require('alfy')
const utils = require('./lib/utils')

const promises = []
const items = []

// teams config
const teams = alfy.config.get('figma.teams') ? JSON.parse(alfy.config.get('figma.teams')) : []
const isAddingTeam = alfy.input.match(/^add\shttps:\/\/www\.figma\.com\/files\/team\/(\d+)\/([^\/]+)/i)

if(isAddingTeam) {
  return alfy.output([{
    title: isAddingTeam[2],
    subtitle: `Add ${isAddingTeam[2]} team’s project files to your search results.`,
    arg: JSON.stringify({id: isAddingTeam[1], name: isAddingTeam[2]}),
    variables: {
      action: 'add',
      notification: `${isAddingTeam[2]} team’s projects and files added to search results.`
    }
  }])
}

Promise.all(teams.map(team => {
  return Promise.resolve(items.push({
      title: team.name,
      subtitle: `Open figma team.`,
      arg: ''
    }))
    .then(() => utils.getResults(`/teams/${team.id}/projects`))
    .then(results => {
      return Promise.all(results.projects.map((p) => {
        return Promise.resolve(items.push({
          uid: `${p.id}/${p.name}`,
          title: p.name,
          subtitle: 'GitHub project',
          text: {
            copy: utils.getUrl(`/projects/${p.id}/${p.name}`, 'browser'),
          }
        }))
        .then(() => utils.getResults(`/projects/${p.id}/files`))
        .then(results => {
          return Promise.all(results.files.map((f) => {
            return Promise.resolve(items.push({
              uid: f.key,
              title: f.name,
              subtitle: utils.subtitle(f, ['modified']),
              arg:  utils.getUrl(`/file/${f.key}/${f.name}`, 'app'),
              variables: {
                action: 'browser'
              },
              quicklookurl: `https://www.figma.com${f.thumbnail_url}`,
              text: {
                copy: utils.getUrl(`/file/${f.key}/${f.name}`, 'browser'),
              },
              mods: {
                cmd: {
                  subtitle: 'Open file in web browser',
                  arg: utils.getUrl(`/file/${f.key}/${f.name}`, 'browser'),
                }
              }
            }))
          }))
        })
      }))
    })
}))
.then(() => {
  if(!isAddingTeam) {
    // Add Figma Team Item
    items.push({
      title: 'Add new Figma team',
      subtitle: 'Add Figma team projects to search results with url.',
      arg: 'figma add ',
      autocomplete: 'add ',
      variables: {
        action: 'rerun'
      }
    })
  }
})
.then(() => items.filter(item => {
  if (item.title.toLowerCase().includes(alfy.input.toLowerCase())) {
    return true
  }
  if (item.subtitle.toLowerCase().includes(alfy.input.toLowerCase())) {
    return true
  }
  return false
}))
.then((filteredItems) => alfy.output(filteredItems))
