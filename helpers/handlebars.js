import Handlebars from 'handlebars'

Handlebars.registerHelper('eq', function (a, b) {
  return a === b
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

Handlebars.registerHelper('formatDate', function (dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
})