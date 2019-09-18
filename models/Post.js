const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const slug = require('slug')
const User = mongoose.model('User')

const PostSchema = new Schema({
  title: String,
  uploads: [{}],
  description: String,
  body: String,
  medium: String,
  shareable: Boolean,
  allow_comments: Boolean,
  purchasable: Boolean,
  price: String,
  tagList: [String],
  author_name: String,
  // thumb_url: String,
  // preview_url: String,
  // modal_url: String,
  // permalink: String,
  // featured: Boolean,
  slug: { type: String, lowercase: true, unique: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  favoritesCount: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
},
  { timestamps: true }
)

PostSchema.plugin(uniqueValidator, {
  message: 'is already taken'
})

PostSchema.pre('validate', function (next) {
  if (!this.slug) { this.slugify() } next()
})

PostSchema.methods.slugify = function () {
  this.slug = slug(this.title) + '-'
    + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

PostSchema.methods.updateFavoriteCount = function () {
  const post = this
  return User
    .countDocuments({ favorites: { $in: [post._id] } })
    .then(function (count) {
      post.favoritesCount = count
      return post.save()
    })
}

PostSchema.methods.toJSONFor = function (user) {
  return {
    title: this.title,
    uploads: this.uploads,
    description: this.description,
    body: this.body,
    medium: this.medium,
    purchasable: this.purchasable,
    price: this.price,
    shareable: this.shareable,
    tagList: this.tagList,
    author_name: this.author_name,
    //thumb_url: this.thumb_url,
    //preview_url: this.preview_url,
    //modal_url: this.modal_url,
    //permalink: this.perma_link,
    slug: this.slug,
    author: this.author.toProfileJSONFor(user),
    favoritesCount: this.favoritesCount,
    favorited: user ? user.isFavorite(this._id) : false,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  }
}

mongoose.model('Post', PostSchema)