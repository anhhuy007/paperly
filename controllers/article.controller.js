// controllers/article.controller.js

import articleService from '../services/article.service.js'
import commentService from '../services/comment.service.js'
import categoryService from '../services/category.service.js'
import tagService from '../services/tag.service.js'
const getArticleById = async (req, res, next) => {
  try {
    const articleId = req.params.id

    // Fetch article, related articles, and comments
    const article = await articleService.getArticleById(articleId)
    const relatedArticles = await articleService.getRelatedArticles(articleId)
    const comments = await commentService.getCommentsByArticleId(articleId)
    const user = req.user

    console.log('=========================> Comments:', comments)

    // Render the detail view
    return res.render('articles/detail', {
      article,
      relatedArticles,
      comments,
      user,
    })
  } catch (error) {
    next(error)
  }
}

const increaseArticleViewCount = async (req, res, next) => {
  try {
    // Extract the article ID from the request parameters
    const { id } = req.params

    // Increase the article's view count using the article service
    const views = await articleService.increaseArticleViewCount(id)

    // Send a success response with the updated view count
    res.status(200).json({
      success: true,
      data: views,
    })
  } catch (error) {
    // Pass any errors to the next middleware
    next(error)
  }
}

const downloadArticle = async (req, res, next) => {
  try {
    // Retrieve the article ID from the request parameters
    const { id } = req.params

    // Retrieve the article from the database
    const article = await articleService.getArticleById(id)

    // Check if the article is found
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found' })
    }

    // Check if the article is premium
    if (article.is_premium) {
      return res.status(403).json({ success: false, message: 'Unauthorized' })
    }

    // Check if the article is published
    if (article.status !== 'published') {
      return res.status(403).json({ success: false, message: 'Article not published' })
    }

    // Download the file associated with the article
    const file = await articleService.downloadArticle(id)

    // Check if the file is found
    if (!file) {
      return res.status(404).json({ success: false, message: 'File not found' })
    }

    // Send the file as a response
    res.download(file.path)
  } catch (error) {
    // Pass any errors to the next middleware
    next(error)
  }
}

// GET /api/v1/articles/home?type=(featured|most-viewed|newest|top-categories)
const getHomepageArticles = async (req, res, next) => {
  try {
    const type = req.query.type
    const homepageData = await articleService.getHomepageArticles(type)
    
    return homepageData
  } catch (error) {
    next(error)
  }
}

const getArticlesByFilter = async (req, res, next) => {
  try {
    // Extract filters and pagination options
    const filters = {
      keyword: req.query.keyword || null,
      category_id: parseInt(req.query.category_id, 10) || null,
      tag_id: parseInt(req.query.tag_id, 10) || null,
      status: req.query.status || 'published',
    }

    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1) // Default: 10, min: 1
    const page = parseInt(req.query.page, 10) || 1 // Default: page 1
    const offset = (page - 1) * limit

    const options = {
      limit,
      offset,
      orderBy: req.query.orderBy || 'published_at DESC', // Default: Newest
    }

    // Fetch filtered articles and total count
    const { articles, totalArticles } = await articleService.getFilteredArticles(filters, options)

    // Fetch all categories and tags for filtering
    const allOptions = {
      limit: 100,
      offset: 0,
    }

    const allFilters = {}
    const { categories } = await categoryService.getAllCategories(allFilters, allOptions)
    const { tags } = await tagService.getAllTags(allFilters, allOptions)

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalArticles / limit)

    console.log('=========================> Article Filters: ', filters)
    console.log('=========================> Total Articles:', totalArticles)
    // Render view with articles, filters, and pagination
    res.render('articles/search', {
      articles,
      categories,
      tags,
      currentPage: page,
      totalPages,
      query: req.query,
      selectedCategory: filters.category_id,
      selectedTag: filters.tag_id,
      keyword: filters.keyword,
    })
  } catch (error) {
    next(error)
  }
}

const getArticlesByTagId = async (req, res, next) => {
  try {
    const tagId = req.params.tagId

    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1) // Default: 10, min: 1
    const page = parseInt(req.query.page, 10) || 1 // Default: page 1
    const offset = (page - 1) * limit

    const options = {
      limit,
      offset,
      orderBy: req.query.orderBy || 'published_at DESC',
    }

    const filters = {
      tag_id: tagId,
      status: 'published',
    }

    const { articles, totalArticles } = await articleService.getFilteredArticles(filters, options)
    const totalPages = Math.ceil(totalArticles / limit)
    const tag = await tagService.getTagById(tagId)

    res.render('articles/list', {
      articles,
      currentPage: page,
      totalPages,
      title: `Articles with Tag: ${tag.name}`,
      query: req.query,
    })
  } catch (error) {
    next(error)
  }
}

const getArticlesByCategoryId = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId

    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1) // Default: 10, min: 1
    const page = parseInt(req.query.page, 10) || 1 // Default: page 1
    const offset = (page - 1) * limit

    const options = {
      limit,
      offset,
      orderBy: req.query.orderBy || 'published_at DESC',
    }

    const filters = {
      category_id: categoryId,
      status: 'published',
    }
    const { articles, totalArticles } = await articleService.getFilteredArticles(filters, options)
    const totalPages = Math.ceil(totalArticles / limit)
    const category = await categoryService.getCategoryById(categoryId)

    console.log('=========================> Category:', category)
    console.log('=========================> Articles:', articles)

    res.render('articles/list', {
      articles,
      currentPage: page,
      totalPages,
      title: `Articles in Category: ${category.name}`,
      query: req.query,
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getArticlesByFilter,
  getArticleById,
  increaseArticleViewCount,
  downloadArticle,
  getHomepageArticles,
  getArticlesByTagId,
  getArticlesByCategoryId,
}
