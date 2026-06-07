
/*
==================================================

ILAW AI
Smart Library Edition (v2.0)

File:
models/User.js

Purpose:
User Schema

Notes:
- Legacy Credits System is still ACTIVE.
- Smart Library fields are added for gradual migration.
- Do NOT remove legacy fields until all routes
  have been migrated.

==================================================
*/

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  /*
  ==================================================
  BASIC INFORMATION
  ==================================================
  */

  fullname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  /*
  ==================================================
  LEGACY FIELDS (v1.5)

  Currently used by:

  ✓ server.js
  ✓ routes/auth.js
  ✓ public/script.js
  ✓ public/docxExport.js

  Do NOT remove until Smart Library migration
  is 100% complete.

  ==================================================
  */

  credits: {
    type: Number,
    default: 1
  },

  isPaid: {
    type: Boolean,
    default: false
  },

  /*
  ==================================================
  USER ROLE
  ==================================================
  */

  role: {
    type: String,
    default: "teacher"
  },

  /*
  ==================================================
  SMART LIBRARY EDITION (v2.0)

  These fields will gradually replace
  the legacy Credits System.

  ==================================================
  */

  freeGenerations: {
    type: Number,
    default: 1
  },

  remainingGenerations: {
    type: Number,
    default: 0
  },

  plan: {
    type: String,
    default: "FREE"
  },

  status: {
    type: String,
    default: "ACTIVE"
  },

  totalGenerated: {
    type: Number,
    default: 0
  },

  smartLibraryHits: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model(
  "User",
  UserSchema
);