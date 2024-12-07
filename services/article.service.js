// services/article.service.js

import articleModel from '../models/article.model.js'
import articleTagModel from '../models/articleTag.model.js'
import categoryService from './category.service.js'
import tagService from './tag.service.js'
class ArticleService {
  async getArticles(filters = {}, options = {}) {
    return await articleModel.getArticles(filters, options)
  }

  async getArticleById(id) {
    const article = await articleModel.getArticleById(id)
    if (!article) {
      throw new Error('Article not found')
    }
    const tags = await articleTagModel.getTagsByArticleId(id)
    article.tags = tags
    return article
  }

  async createArticle(articleData, authorId) {
    const { title, content, abstract, category_id, thumbnail, is_premium } = articleData

    const newArticle = {
      title,
      content,
      abstract,
      author_id: authorId,
      category_id,
      thumbnail,
      is_premium,
    }

    const createdArticle = await articleModel.createArticle(newArticle)

    return createdArticle
  }

  async updateArticle(id, articleData, authorId) {
    const article = await articleModel.findById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    if (article.author_id !== authorId) {
      throw new Error('Unauthorized')
    }

    // Extract the tag IDs from the article data and update the article
    const { tag_ids, ...updateData } = articleData
    const updatedArticle = await articleModel.updateArticle(id, updateData)

    // If there are tag IDs, remove them from the article and re-add them
    if (tag_ids) {
      await articleTagModel.removeTagsFromArticle(id, tag_ids)
      await articleTagModel.addTagsToArticle(id, tag_ids)
    }

    return updatedArticle
  }

  async deleteArticle(id, authorId) {
    // Retrieve the article from the database
    const article = await articleModel.findById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    // Check if the author ID matches the article's author ID
    if (article.author_id !== authorId) {
      throw new Error('Unauthorized')
    }

    // Delete the article from the database
    return await articleModel.deleteArticle(id)
  }

  async submitArticleForApproval(id, authorId) {
    // Retrieve the article from the database
    const article = await articleModel.findById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    // Check if the author ID matches the article's author ID
    if (article.author_id !== authorId) {
      throw new Error('Unauthorized')
    }

    // Check if the article is in draft status
    if (article.status !== 'draft') {
      throw new Error('Article is not in draft status')
    }

    // Update the article status to "pending"
    return await articleModel.updateArticle(id, { status: 'pending' })
  }

  async approveArticle(id, editorId, categoryId, tagIds) {
    // Retrieve the article from the database
    const article = await articleModel.findById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    // Check if the article is in pending status
    if (article.status !== 'pending') {
      throw new Error('Article is not pending approval')
    }

    if (tagIds.length > 0) {
      await articleTagModel.addTagsToArticle(id, tagIds)
    }

    // Allow the editor to approve the article only if they have the rights to do so
    // TODO: Implement the logic to check if the editor has the rights to approve the article

    // Update the article status to "published" and set the published_at field to the current date
    return await articleModel.updateArticle(id, {
      status: 'approved',
      editor_id: editorId,
      category_id: categoryId,
    })
  }

  async rejectArticle(id, editorId, rejectionReason) {
    // Retrieve the article from the database
    const article = await articleModel.findById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    // Check if the article is in pending status
    if (article.status !== 'pending') {
      throw new Error('Article is not pending approval')
    }

    // Additional logic to check if editor has rights to reject this article

    // Update the article status to "rejected" and set the rejection_reason field to the provided reason
    return await articleModel.updateArticle(id, {
      status: 'rejected',
      rejection_reason: rejectionReason,
      editor_id: editorId,
    })
  }

  async publishArticle(id) {
    // Retrieve the article from the database
    const article = await articleModel.findById(id)
    if (!article) {
      throw new Error('Article not found')
    }

    // Update the article status to "published" and set the published_at field to the current date
    return await articleModel.updateArticle(id, {
      status: 'published',
      published_at: new Date(),
    })
  }

  async searchArticles(keyword, options = {}) {
    // Chuẩn hóa từ khóa để sử dụng trong to_tsquery
    const formattedKeyword = keyword
      .trim() // Loại bỏ khoảng trắng ở đầu/cuối
      .replace(/\s+/g, ' & ') // Thay khoảng trắng bằng & để dùng trong to_tsquery
    return await articleModel.searchArticles(formattedKeyword, options)
  }

  async getArticlesByCategory(categoryId, options = {}) {
    // Delegate the request to the article model to get articles by the specified category ID
    return await articleModel.getArticlesByCategory(categoryId, options)
  }

  async getRelatedArticles(articleId) {
    // Retrieve the specified article
    const article = await articleModel.findById(articleId)

    // If the article does not exist, throw an error
    if (!article) {
      throw new Error('Article not found')
    }

    // Retrieve related articles using the article model
    return await articleModel.getRelatedArticles(article.category_id, articleId)
  }

  async increaseArticleViewCount(id) {
    // Delegate the request to the article model to increase the view count
    return await articleModel.increaseViewCount(id)
  }

  async downloadArticle(id) {
    // TODO: Implement the download article functionality
  }

  async deleteArticleByUserID(user_id) {
    await articleModel.deleteArticleByUserID(user_id)
  }

  async getHomepageArticles(type) {
    let result

    switch (type) {
      case 'featured':
        result = await articleModel.getFeaturedArticles()
        break
      case 'most-viewed':
        result = await articleModel.getMostViewedArticles()
        break
      case 'newest':
        result = await articleModel.getNewestArticles()
        break
      case 'top-categories':
        result = await articleModel.getTopCategoryArticles()
        break
      default:
        result = await articleModel.getHomepageArticles()
    }

    return result
  }

  async getFilteredArticles(filters, options) {
    return await articleModel.getFilteredArticles(filters, options)
  }

  async updateArticleStatus(id, status) {
    return await articleModel.updateArticle(id, { status })
  }

  async getArticleStats(authorId) {
    return await articleModel.getArticleStats(authorId)
  }
}

export default new ArticleService()
