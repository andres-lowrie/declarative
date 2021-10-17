function green (s) {
  return `\x1b[32m${s}\x1b[0m`
}

function red (s) {
  return `\x1b[31m${s}\x1b[0m`
}

exports.test = function (name, fn) {
  return { name, fn }
}

exports.run = function (cases) {
  cases.forEach(c => {
    try {
      c.fn()
      console.log(`${green(`✓ ${c.name}`)}`)
    } catch (e) {
      console.log(`${red(`✗ ${c.name}:`)}`)
      console.error(e)
    }
  })
}
