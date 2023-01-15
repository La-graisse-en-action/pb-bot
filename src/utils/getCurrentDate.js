/**
 * @returns {string} - The current date in the format of YYYY-MM-DD
 */
const getCurrentDate = () => {
  const date = new Date()
  const year = date.getFullYear()
  const monthName = date.toLocaleString('default', { month: 'long' })
  const day = date.getDate()
  return `${day} / ${monthName} / ${year}`
}

module.exports = getCurrentDate
