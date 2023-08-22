import mongoose from 'mongoose';
const slug = require("mongoose-slug-generator");
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete');
mongoose.plugin(slug)

const Course = new Schema(
  {
    name: { type: String },
    description: String,
    image: { type: String, default: '' },
    slug: { type: String, slug: "name" },
    deleted: { type: Boolean, default: false }
  },
  { timestamps: true }
);

;
Course.plugin(mongoose_delete, { deletedAt: true, overrideMethods: ['countDocuments', 'restore', 'countDocumentsDeleted'] });

module.exports = mongoose.model("Course", Course);
