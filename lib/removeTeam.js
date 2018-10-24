const alfy = require('alfy')

const teams = alfy.config.get('figma.teams') ? JSON.parse(alfy.config.get('figma.teams')) : []

const removeTeam = JSON.parse(alfy.input)

alfy.config.set('figma.teams', JSON.stringify(teams.filter((t) => t.id != removeTeam.id)))
