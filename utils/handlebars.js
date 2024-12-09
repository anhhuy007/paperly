// helpers/handlebars.js
import Handlebars from 'handlebars'
import { URLSearchParams } from 'url'
Handlebars.registerHelper('eq', function (a, b) {
  return a === b
})

Handlebars.registerHelper('ne', function (a, b) {
  return a !== b
})

Handlebars.registerHelper('gt', function (a, b) {
  return a > b
})

Handlebars.registerHelper('lt', function (a, b) {
  return a < b
})

Handlebars.registerHelper('gte', function (a, b) {
  return a >= b
})

Handlebars.registerHelper('lte', function (a, b) {
  return a <= b
})

Handlebars.registerHelper('hasSubCategorySelected', function (subCategories, currentCategoryId) {
  return subCategories.some((subCategory) => subCategory.subId === currentCategoryId)
})

Handlebars.registerHelper('or', function (a, b) {
  return a || b
})

Handlebars.registerHelper('between', function (value, min, max) {
  return value >= min && value <= max
})

Handlebars.registerHelper('add', function (a, b) {
  return a + b
})

Handlebars.registerHelper('subtract', function (a, b) {
  return a - b
})

Handlebars.registerHelper('formatDate', function (dateString, format) {
  if (!dateString) return ''

  const date = new Date(dateString)

  if (format === 'YYYY-MM-DD') {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
})

Handlebars.registerHelper('paginationPages', function (currentPage, totalPages) {
  const pages = []
  const startPage = Math.max(1, currentPage - 2)
  const endPage = Math.min(totalPages, currentPage + 2)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }
  return pages
})

Handlebars.registerHelper('buildPaginationUrl', function (query, page) {
  // Ensure query is always an object
  query = query || {}

  // Initialize URLSearchParams with existing query
  const params = new URLSearchParams(query)

  // Get the `limit` parameter, or set a default value
  const limit = parseInt(params.get('limit')) || 10

  // Calculate the offset based on the page and limit
  const offset = (page - 1) * limit

  // Update or set the necessary query parameters
  params.set('page', page)
  params.set('offset', offset)

  // Ensure `limit` is retained in the query
  if (!params.has('limit')) {
    params.set('limit', limit)
  }

  return `?${params.toString()}`
})

Handlebars.registerHelper('capitalize', function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

Handlebars.registerHelper('compare', function (a, operator, b, options) {
  switch (operator) {
    case '==':
      return a == b ? options.fn(this) : options.inverse(this)
    case '!=':
      return a != b ? options.fn(this) : options.inverse(this)
    case '===':
      return a === b ? options.fn(this) : options.inverse(this)
    case '!==':
      return a !== b ? options.fn(this) : options.inverse(this)
    case '>':
      return a > b ? options.fn(this) : options.inverse(this)
    case '<':
      return a < b ? options.fn(this) : options.inverse(this)
    case '>=':
      return a >= b ? options.fn(this) : options.inverse(this)
    case '<=':
      return a <= b ? options.fn(this) : options.inverse(this)
    default:
      throw new Error(`Unknown operator: ${operator}`)
  }
})

Handlebars.registerHelper('default', function (value, defaultValue) {
  return value || defaultValue
})

Handlebars.registerHelper('hasItems', function (array) {
  return Array.isArray(array) && array.length > 0
})

Handlebars.registerHelper('json', function (context) {
  return JSON.stringify(context)
})

Handlebars.registerHelper('includes', function (array, value) {
  return Array.isArray(array) && array.includes(value)
})

Handlebars.registerHelper('ifActive', function (path, options) {
  const currentPath = options.data.root.currentPath || ''
  return currentPath.includes(path) ? options.fn(this) : options.inverse(this)
})

Handlebars.registerHelper('split', function (input, delimiter) {
  if (typeof input !== 'string') return []
  return input.split(delimiter)
})
