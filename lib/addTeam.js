const alfy = require('alfy')

const teams = alfy.config.get('figma.teams') ? JSON.parse(alfy.config.get('figma.teams')) : []

const newTeam = JSON.parse(alfy.input)
if (!teams.find(e => e.id == newTeam.id)) {
  teams.push(newTeam)
}
alfy.config.set('figma.teams', JSON.stringify(teams))
