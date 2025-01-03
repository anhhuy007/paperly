// models/articleRejections.model.js

import BaseModel from './Base.model.js'
import db from '../utils/Database.js'
// CREATE TABLE article_rejections (
//   id SERIAL PRIMARY KEY,
//   article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
//   editor_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
//   reason TEXT NOT NULL,
//   rejected_at TIMESTAMPTZ DEFAULT NOW()
// );

class ArticleRejectionsModel extends BaseModel {
  constructor() {
    super('article_rejections')
  }

  async rejectArticle(articleId, editorId, reason) {
    return this.create({
      article_id: articleId,
      editor_id: editorId,
      reason,
      rejected_at: new Date(),
    })
  }

  async findByArticleId(articleId) {
    return this.find({ article_id: articleId })
  }

  async findRejectedByUserId(editorId) {
    return this.find({ editor_id: editorId })
  }

  async deleteByArticleId(articleId) {
    const query = 'DELETE FROM article_rejections WHERE article_id = $1'
    return db.query(query, [articleId])
  }

  async deleteByEditorId(editorId) {
    return this.delete({ editor_id: editorId })
  }

  async getArticleRejections(articleId) {
    const query = `
      SELECT ar.article_id, ar.reason, ar.rejected_at, a.title
      FROM article_rejections ar
      JOIN articles a ON ar.article_id = a.id
      WHERE ar.article_id = $1
      ORDER BY ar.rejected_at DESC;
    `
    const { rows } = await db.query(query, [articleId])
    return rows
  }
}

export default new ArticleRejectionsModel()
