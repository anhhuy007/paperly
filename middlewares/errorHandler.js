// middlewares/errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err)
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'

  if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
    return res.status(statusCode).json({ 
      success: false, 
      message 
    })
  }

  res.status(statusCode).render('errors/error', {
    layout: 'main',
    statusCode,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : null
  })
}

export default errorHandler
