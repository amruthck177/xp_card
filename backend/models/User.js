const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isHolographic: { type: Boolean, default: false },
  icon: { type: String, default: '🏆' } // Default emoji representing badge
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  currentXP: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  currentStreak: { type: Number, default: 0 },
  longestStreak: { type: Number, default: 0 },
  lastActiveDate: { type: Date, default: null },
  streakShields: { type: Number, default: 2 },
  themePreference: { type: String, default: 'deep-space' },
  badges: [BadgeSchema],
  coopPartnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  isPowerHour: { type: Boolean, default: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
