// routes/auth.routes.js

import express from 'express'
import authController from '../controllers/auth.controller.js'
import viewRenderer from '../utils/viewRenderer.js'
import { config } from 'dotenv'
import redirectIfAuthenticated from '../middlewares/redirectIfAuthenticated.js'
import { cacheMiddleware, deleteCacheMiddleware } from '../middlewares/cacheMiddleware.js'
import { authCacheKeyGenerator, articleCacheKeyGenerator } from '../utils/cacheKeyGenerator.js'
config()

const router = express.Router()

router.use(redirectIfAuthenticated())

// Root route: /auth

router.get(
  '/signup',
  // cacheMiddleware(authCacheKeyGenerator.signupPage),
  authController.getSignup,
)

router.post('/signup', authController.register)

router.get(
  '/login',
  cacheMiddleware(authCacheKeyGenerator.loginPage),
  deleteCacheMiddleware(articleCacheKeyGenerator.homepage),
  viewRenderer('auth/login', 'auth'),
)

router.post('/login', authController.login)

router.get(
  '/forgot-password',
  cacheMiddleware(authCacheKeyGenerator.forgotPasswordPage),
  viewRenderer('auth/forgot-password', 'auth'),
)

router.post('/forgot-password', authController.forgotPassword)

router.get('/reset-password', authController.getResetPassword)
router.post('/reset-password', authController.resetPassword)

router.get('/google', authController.googleLogin)

router.get('/google/callback', authController.googleCallback)

router.get(
  '/logout',
  deleteCacheMiddleware(articleCacheKeyGenerator.homepage),
  authController.logout,
)
export default router
