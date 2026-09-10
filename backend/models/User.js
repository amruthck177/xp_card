const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  isHolographic: { type: Boolean, default: false },
  icon: { type: String, default: '🏆' }
});

const QuestSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  target: { type: Number, default: 1 },
  progress: { type: Number, default: 0 },
  rewardXP: { type: Number, default: 150 },
  rewardCrystals: { type: Number, default: 50 },
  completed: { type: Boolean, default: false },
  claimed: { type: Boolean, default: false }
});

const ActivityRecordSchema = new mongoose.Schema({
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  xp: { type: Number, default: 0 },
  count: { type: Number, default: 0 }
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
  isPowerHour: { type: Boolean, default: false },

  // --- UPGRADED ATTRIBUTES ---
  crystals: { type: Number, default: 250 },
  playerTitle: { type: String, default: 'Cyber Pioneer' },
  activeFrame: { type: String, default: 'default' }, // 'default', 'frame-electric', 'frame-magma', 'frame-quantum', 'frame-matrix'
  unlockedFrames: { type: [String], default: ['default'] },
  activityHistory: [ActivityRecordSchema],
  dailyQuests: [QuestSchema],
  bossDamageDealt: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
