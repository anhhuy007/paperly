// routes/writer.routes.js

import express from 'express'
import writerController from '../controllers/writer.controller.js'
import articleController from '../controllers/article.controller.js'
import authMiddleware from '../middlewares/authMiddleware.js'
import viewRenderer from '../utils/viewRenderer.js'
import upload from '../middlewares/upload.js'
const router = express.Router()

// Protected Routes for Writers
router.use(authMiddleware(['writer']))

router.get('/articles', writerController.getDashboard)
router.get('/articles/create', writerController.getCreateArticle)
router.post('/articles/create', upload.single('thumbnail'), writerController.createArticle)

router.get('/articles/edit/:articleId', writerController.getEditArticle)
router.post('/articles/edit/:articleId', writerController.updateArticle)

export default router
