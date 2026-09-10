const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// In-Memory Database Fallback for offline/no-MongoDB situations
let useInMemory = false;
const inMemoryDb = {
  users: {},
  boss: {
    name: 'Chronos the Streak Devourer',
    maxHp: 5000,
    currentHp: 3250,
    tier: 'Cosmic Beast • Rank IV',
    rewardBadge: 'Chronos Slayer',
    rewardCrystals: 200
  }
};

// Global/Shared Boss state for MongoDB mode
let mongoBossState = {
  name: 'Chronos the Streak Devourer',
  maxHp: 5000,
  currentHp: 3250,
  tier: 'Cosmic Beast • Rank IV',
  rewardBadge: 'Chronos Slayer',
  rewardCrystals: 200
};

// Available Shop Items
const SHOP_ITEMS = [
  {
    id: 'frame-electric',
    name: 'Electric Arc Frame',
    category: 'frame',
    cost: 150,
    icon: '⚡',
    description: 'High-voltage electric discharge pulsing along the card perimeter.'
  },
  {
    id: 'frame-magma',
    name: 'Molten Magma Frame',
    category: 'frame',
    cost: 250,
    icon: '🔥',
    description: 'Hyperthermal molten flare with pulsating ember particles.'
  },
  {
    id: 'frame-quantum',
    name: 'Quantum Hologram Frame',
    category: 'frame',
    cost: 400,
    icon: '💎',
    description: 'Ultra-rare chromatic rainbow dispersion with spectral sheen.'
  },
  {
    id: 'frame-matrix',
    name: 'Cyber Matrix Frame',
    category: 'frame',
    cost: 300,
    icon: '👾',
    description: 'CRT phosphor scanlines with binary code terminal glint.'
  },
  {
    id: 'title-voidwalker',
    name: 'Title: Void Walker',
    category: 'title',
    titleValue: 'Void Walker',
    cost: 100,
    icon: '🌌',
    description: 'Player title displayed proudly above your username.'
  },
  {
    id: 'title-chronos',
    name: 'Title: Chronos Slayer',
    category: 'title',
    titleValue: 'Chronos Slayer',
    cost: 200,
    icon: '⚔️',
    description: 'Conferred only to those who push streaks to the cosmic edge.'
  },
  {
    id: 'title-hyperdrive',
    name: 'Title: Hyperdrive Pilot',
    category: 'title',
    titleValue: 'Hyperdrive Pilot',
    cost: 150,
    icon: '🚀',
    description: 'Accelerate through streak velocity barriers.'
  },
  {
    id: 'shield-pack',
    name: 'Emergency Streak Shield',
    category: 'shield',
    cost: 120,
    icon: '🛡️',
    description: 'Replenishes 1 Streak Shield immediately (Max 3).'
  }
];

// Helper: Procedural daily quests generator
function generateDefaultQuests() {
  return [
    {
      id: 'quest_activity',
      title: 'Consistency Sprint',
      description: 'Log at least 2 activities today',
      target: 2,
      progress: 1,
      rewardXP: 150,
      rewardCrystals: 50,
      completed: false,
      claimed: false
    },
    {
      id: 'quest_xp',
      title: 'XP Overdrive',
      description: 'Accumulate 250 XP in active sessions',
      target: 250,
      progress: 100,
      rewardXP: 200,
      rewardCrystals: 75,
      completed: false,
      claimed: false
    },
    {
      id: 'quest_boss',
      title: 'Raid Vanguard',
      description: 'Strike Chronos the Raid Boss at least once',
      target: 1,
      progress: 0,
      rewardXP: 250,
      rewardCrystals: 100,
      completed: false,
      claimed: false
    }
  ];
}

// Helper: Procedural 60-day historical activity generator
function generateSampleHeatmap() {
  const history = [];
  const today = new Date();
  for (let i = 59; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    // Simulate streak pattern: higher density in recent 14 days
    let count = 0;
    let xp = 0;
    if (i < 7) {
      count = Math.floor(Math.random() * 3) + 1;
      xp = count * 100;
    } else if (i < 30) {
      if (Math.random() > 0.3) {
        count = Math.floor(Math.random() * 2) + 1;
        xp = count * 100;
      }
    } else {
      if (Math.random() > 0.5) {
        count = 1;
        xp = 100;
      }
    }
    history.push({ date: dateStr, xp, count });
  }
  return history;
}

// Seed in-memory database with rich default users
function seedInMemory() {
  const userAId = new mongoose.Types.ObjectId().toString();
  const userBId = new mongoose.Types.ObjectId().toString();

  const userA = {
    _id: userAId,
    username: 'NeonRider',
    playerTitle: 'Cyber Samurai',
    currentXP: 2450,
    level: 3,
    currentStreak: 6,
    longestStreak: 14,
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    streakShields: 2,
    themePreference: 'deep-space',
    isPowerHour: false,
    crystals: 380,
    activeFrame: 'frame-electric',
    unlockedFrames: ['default', 'frame-electric', 'frame-matrix'],
    dailyQuests: generateDefaultQuests(),
    activityHistory: generateSampleHeatmap(),
    bossDamageDealt: 450,
    badges: [
      { _id: new mongoose.Types.ObjectId().toString(), name: 'First Steps', isHolographic: false, icon: '🥾' },
      { _id: new mongoose.Types.ObjectId().toString(), name: 'Space Explorer', isHolographic: true, icon: '🚀' },
      { _id: new mongoose.Types.ObjectId().toString(), name: 'Code Samurai', isHolographic: true, icon: '⚔️' }
    ],
    coopPartnerId: userBId
  };

  const userB = {
    _id: userBId,
    username: 'PixelMage',
    playerTitle: 'Quantum Sorcerer',
    currentXP: 1800,
    level: 2,
    currentStreak: 29,
    longestStreak: 29,
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    streakShields: 1,
    themePreference: 'cyberpunk',
    isPowerHour: true,
    crystals: 520,
    activeFrame: 'frame-magma',
    unlockedFrames: ['default', 'frame-magma'],
    dailyQuests: generateDefaultQuests(),
    activityHistory: generateSampleHeatmap(),
    bossDamageDealt: 720,
    badges: [
      { _id: new mongoose.Types.ObjectId().toString(), name: 'Pixel Artist', isHolographic: false, icon: '🎨' },
      { _id: new mongoose.Types.ObjectId().toString(), name: 'Hacker Elite', isHolographic: true, icon: '💻' }
    ],
    coopPartnerId: userAId
  };

  inMemoryDb.users[userAId] = userA;
  inMemoryDb.users[userBId] = userB;

  return { userA, userB };
}

// Initial in-memory seed
seedInMemory();

// Middleware to check database connection status
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    useInMemory = true;
  } else {
    useInMemory = false;
  }
  next();
});

// Helper: Calculate difference in calendar days
function getDayDifference(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);
  const diffTime = Math.abs(d2 - d1);
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 1. GET /api/users/:id/dashboard - Fetches stats, partner stats, quests, frames
router.get('/users/:id/dashboard', async (req, res) => {
  try {
    const userId = req.params.id;

    if (useInMemory) {
      let user = inMemoryDb.users[userId];
      if (!user) {
        user = Object.values(inMemoryDb.users)[0];
        if (!user) return res.status(404).json({ message: 'User not found' });
      }
      const partner = inMemoryDb.users[user.coopPartnerId] || null;
      return res.json({ user, partner });
    }

    // MongoDB Mode
    let user = await User.findById(userId);
    if (!user) {
      user = await User.findOne();
      if (!user) {
        const seeded = await seedMongoData();
        user = seeded.userA;
      }
    }

    let partner = null;
    if (user.coopPartnerId) {
      partner = await User.findById(user.coopPartnerId).select('username currentStreak level currentXP lastActiveDate playerTitle activeFrame');
    }

    res.json({ user, partner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper: Seed MongoDB if empty
async function seedMongoData() {
  await User.deleteMany({});
  const userA = new User({
    username: 'NeonRider',
    playerTitle: 'Cyber Samurai',
    currentXP: 2450,
    level: 3,
    currentStreak: 6,
    longestStreak: 14,
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    streakShields: 2,
    themePreference: 'deep-space',
    isPowerHour: false,
    crystals: 380,
    activeFrame: 'frame-electric',
    unlockedFrames: ['default', 'frame-electric', 'frame-matrix'],
    dailyQuests: generateDefaultQuests(),
    activityHistory: generateSampleHeatmap(),
    bossDamageDealt: 450,
    badges: [
      { name: 'First Steps', isHolographic: false, icon: '🥾' },
      { name: 'Space Explorer', isHolographic: true, icon: '🚀' },
      { name: 'Code Samurai', isHolographic: true, icon: '⚔️' }
    ]
  });

  const userB = new User({
    username: 'PixelMage',
    playerTitle: 'Quantum Sorcerer',
    currentXP: 1800,
    level: 2,
    currentStreak: 29,
    longestStreak: 29,
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    streakShields: 1,
    themePreference: 'cyberpunk',
    isPowerHour: true,
    crystals: 520,
    activeFrame: 'frame-magma',
    unlockedFrames: ['default', 'frame-magma'],
    dailyQuests: generateDefaultQuests(),
    activityHistory: generateSampleHeatmap(),
    bossDamageDealt: 720,
    badges: [
      { name: 'Pixel Artist', isHolographic: false, icon: '🎨' },
      { name: 'Hacker Elite', isHolographic: true, icon: '💻' }
    ]
  });

  await userA.save();
  await userB.save();

  userA.coopPartnerId = userB._id;
  userB.coopPartnerId = userA._id;

  await userA.save();
  await userB.save();

  return { userA, userB };
}

// 2. POST /api/users/:id/activity - Logs activity with XP perks, heatmap update & socket pulse
router.post('/users/:id/activity', async (req, res) => {
  try {
    const userId = req.params.id;
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    let xpAmount = req.body.xpAmount || 100;
    let shieldShattered = false;
    let streakWasReset = false;

    const io = req.app.get('io');

    if (useInMemory) {
      let user = inMemoryDb.users[userId];
      if (!user) user = Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });

      // Power Hour multiplier
      if (user.isPowerHour) {
        xpAmount = Math.floor(xpAmount * 1.5);
      }

      // Streak Perk Multipliers
      if (user.currentStreak >= 30) {
        xpAmount = Math.floor(xpAmount * 1.25); // Hyperdrive buff
      } else if (user.currentStreak >= 7) {
        xpAmount = Math.floor(xpAmount * 1.1); // Momentum buff
      }

      if (user.lastActiveDate) {
        const diffDays = getDayDifference(user.lastActiveDate, now);
        if (diffDays > 1) {
          if (user.streakShields > 0) {
            user.streakShields -= 1;
            shieldShattered = true;
          } else {
            user.currentStreak = 0;
            streakWasReset = true;
          }
        }
        if (diffDays >= 1) {
          user.currentStreak += 1;
        }
      } else {
        user.currentStreak = 1;
      }

      user.currentXP += xpAmount;
      user.crystals = (user.crystals || 0) + 15; // Earn streak crystals on every activity

      const newLevel = Math.floor(user.currentXP / 1000) + 1;
      let leveledUp = false;
      if (newLevel > user.level) {
        user.level = newLevel;
        leveledUp = true;
      }

      if (user.currentStreak > user.longestStreak) {
        user.longestStreak = user.currentStreak;
      }

      user.lastActiveDate = now.toISOString();

      // Update Heatmap
      if (!user.activityHistory) user.activityHistory = [];
      const dayRecord = user.activityHistory.find(r => r.date === todayStr);
      if (dayRecord) {
        dayRecord.xp += xpAmount;
        dayRecord.count += 1;
      } else {
        user.activityHistory.push({ date: todayStr, xp: xpAmount, count: 1 });
      }

      // Update Daily Quests progress
      if (user.dailyQuests) {
        user.dailyQuests.forEach(q => {
          if (q.id === 'quest_activity') {
            q.progress = Math.min(q.target, q.progress + 1);
            if (q.progress >= q.target) q.completed = true;
          } else if (q.id === 'quest_xp') {
            q.progress = Math.min(q.target, q.progress + xpAmount);
            if (q.progress >= q.target) q.completed = true;
          }
        });
      }

      const partner = inMemoryDb.users[user.coopPartnerId] || null;

      // Broadcast Real-Time Shockwave via Socket.io
      if (io) {
        io.emit('tether_pulse', {
          sender: user.username,
          streak: user.currentStreak,
          addedXP: xpAmount
        });
      }

      return res.json({
        message: 'Activity recorded successfully!',
        user,
        partner,
        addedXP: xpAmount,
        earnedCrystals: 15,
        leveledUp,
        shieldShattered,
        streakWasReset,
        themePreference: user.themePreference
      });
    }

    // MongoDB Mode
    let user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.isPowerHour) {
      xpAmount = Math.floor(xpAmount * 1.5);
    }

    if (user.currentStreak >= 30) {
      xpAmount = Math.floor(xpAmount * 1.25);
    } else if (user.currentStreak >= 7) {
      xpAmount = Math.floor(xpAmount * 1.1);
    }

    if (user.lastActiveDate) {
      const diffDays = getDayDifference(user.lastActiveDate, now);
      if (diffDays > 1) {
        if (user.streakShields > 0) {
          user.streakShields -= 1;
          shieldShattered = true;
        } else {
          user.currentStreak = 0;
          streakWasReset = true;
        }
      }
      if (diffDays >= 1) {
        user.currentStreak += 1;
      }
    } else {
      user.currentStreak = 1;
    }

    user.currentXP += xpAmount;
    user.crystals = (user.crystals || 0) + 15;

    const newLevel = Math.floor(user.currentXP / 1000) + 1;
    let leveledUp = false;
    if (newLevel > user.level) {
      user.level = newLevel;
      leveledUp = true;
    }

    if (user.currentStreak > user.longestStreak) {
      user.longestStreak = user.currentStreak;
    }

    user.lastActiveDate = now;

    // Update Heatmap
    if (!user.activityHistory) user.activityHistory = [];
    const dayRecord = user.activityHistory.find(r => r.date === todayStr);
    if (dayRecord) {
      dayRecord.xp += xpAmount;
      dayRecord.count += 1;
    } else {
      user.activityHistory.push({ date: todayStr, xp: xpAmount, count: 1 });
    }

    // Update Quests
    if (user.dailyQuests) {
      user.dailyQuests.forEach(q => {
        if (q.id === 'quest_activity') {
          q.progress = Math.min(q.target, q.progress + 1);
          if (q.progress >= q.target) q.completed = true;
        } else if (q.id === 'quest_xp') {
          q.progress = Math.min(q.target, q.progress + xpAmount);
          if (q.progress >= q.target) q.completed = true;
        }
      });
    }

    await user.save();

    let partner = null;
    if (user.coopPartnerId) {
      partner = await User.findById(user.coopPartnerId).select('username currentStreak level currentXP lastActiveDate playerTitle activeFrame');
    }

    if (io) {
      io.emit('tether_pulse', {
        sender: user.username,
        streak: user.currentStreak,
        addedXP: xpAmount
      });
    }

    res.json({
      message: 'Activity recorded successfully!',
      user,
      partner,
      addedXP: xpAmount,
      earnedCrystals: 15,
      leveledUp,
      shieldShattered,
      streakWasReset,
      themePreference: user.themePreference
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST /api/users/:id/spend-xp - Revive partner
router.post('/users/:id/spend-xp', async (req, res) => {
  try {
    const userId = req.params.id;
    const cost = 500;

    if (useInMemory) {
      let user = inMemoryDb.users[userId];
      if (!user) user = Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });

      const partner = inMemoryDb.users[user.coopPartnerId];
      if (!partner) return res.status(404).json({ message: 'Co-op partner not found.' });

      if (user.currentXP < cost) {
        return res.status(400).json({ message: `Insufficient XP. You need ${cost} XP but only have ${user.currentXP} XP.` });
      }

      user.currentXP -= cost;
      user.level = Math.floor(user.currentXP / 1000) + 1;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      partner.lastActiveDate = yesterday.toISOString();
      partner.currentStreak = Math.max(partner.longestStreak, 1);

      return res.json({
        message: `Successfully revived ${partner.username}'s streak by spending ${cost} XP!`,
        user,
        partner
      });
    }

    // MongoDB Mode
    let user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const partner = await User.findById(user.coopPartnerId);
    if (!partner) return res.status(404).json({ message: 'Co-op partner not found.' });

    if (user.currentXP < cost) {
      return res.status(400).json({ message: `Insufficient XP. You need ${cost} XP but only have ${user.currentXP} XP.` });
    }

    user.currentXP -= cost;
    user.level = Math.floor(user.currentXP / 1000) + 1;
    await user.save();

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    partner.lastActiveDate = yesterday;
    partner.currentStreak = Math.max(partner.longestStreak, 1);
    await partner.save();

    res.json({
      message: `Successfully revived ${partner.username}'s streak by spending ${cost} XP!`,
      user,
      partner
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. GET /api/users/:id/heatmap - Returns activity matrix for last 60 days
router.get('/users/:id/heatmap', async (req, res) => {
  try {
    const userId = req.params.id;
    let history = [];

    if (useInMemory) {
      let user = inMemoryDb.users[userId];
      if (!user) user = Object.values(inMemoryDb.users)[0];
      history = user && user.activityHistory ? user.activityHistory : generateSampleHeatmap();
    } else {
      let user = await User.findById(userId);
      if (!user) user = await User.findOne();
      history = user && user.activityHistory && user.activityHistory.length > 0
        ? user.activityHistory
        : generateSampleHeatmap();
    }

    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. GET & CLAIM Quests
router.get('/users/:id/quests', async (req, res) => {
  try {
    const userId = req.params.id;
    let quests = [];

    if (useInMemory) {
      let user = inMemoryDb.users[userId];
      if (!user) user = Object.values(inMemoryDb.users)[0];
      quests = user && user.dailyQuests ? user.dailyQuests : generateDefaultQuests();
    } else {
      let user = await User.findById(userId);
      if (!user) user = await User.findOne();
      quests = user && user.dailyQuests && user.dailyQuests.length > 0
        ? user.dailyQuests
        : generateDefaultQuests();
    }

    res.json({ quests });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/users/:id/quests/:questId/claim', async (req, res) => {
  try {
    const { id: userId, questId } = req.params;

    if (useInMemory) {
      let user = inMemoryDb.users[userId];
      if (!user) user = Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });

      const quest = (user.dailyQuests || []).find(q => q.id === questId);
      if (!quest) return res.status(404).json({ message: 'Quest not found' });
      if (!quest.completed) return res.status(400).json({ message: 'Quest is not completed yet.' });
      if (quest.claimed) return res.status(400).json({ message: 'Quest reward already claimed.' });

      quest.claimed = true;
      user.currentXP += quest.rewardXP;
      user.crystals = (user.crystals || 0) + quest.rewardCrystals;
      user.level = Math.floor(user.currentXP / 1000) + 1;

      return res.json({
        message: `Claimed ${quest.rewardXP} XP and ${quest.rewardCrystals} Crystals!`,
        user,
        quest
      });
    }

    // MongoDB Mode
    let user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    const quest = (user.dailyQuests || []).find(q => q.id === questId);
    if (!quest) return res.status(404).json({ message: 'Quest not found' });
    if (!quest.completed) return res.status(400).json({ message: 'Quest is not completed yet.' });
    if (quest.claimed) return res.status(400).json({ message: 'Quest reward already claimed.' });

    quest.claimed = true;
    user.currentXP += quest.rewardXP;
    user.crystals = (user.crystals || 0) + quest.rewardCrystals;
    user.level = Math.floor(user.currentXP / 1000) + 1;
    await user.save();

    res.json({
      message: `Claimed ${quest.rewardXP} XP and ${quest.rewardCrystals} Crystals!`,
      user,
      quest
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. RAID BOSS: "Chronos the Streak Devourer"
router.get('/boss', (req, res) => {
  const boss = useInMemory ? inMemoryDb.boss : mongoBossState;
  res.json({ boss });
});

router.post('/boss/attack', async (req, res) => {
  try {
    const { userId, damage } = req.body;
    const dmg = damage || Math.floor(Math.random() * 150) + 100;
    const boss = useInMemory ? inMemoryDb.boss : mongoBossState;
    const io = req.app.get('io');

    boss.currentHp = Math.max(0, boss.currentHp - dmg);
    let bossDefeated = false;

    if (boss.currentHp === 0) {
      bossDefeated = true;
      boss.currentHp = boss.maxHp; // Resets for infinite fun with level up
    }

    // Reward user with crystals & XP
    let user = null;
    if (useInMemory) {
      user = inMemoryDb.users[userId] || Object.values(inMemoryDb.users)[0];
      if (user) {
        user.bossDamageDealt = (user.bossDamageDealt || 0) + dmg;
        user.currentXP += 50;
        user.crystals = (user.crystals || 0) + 20;
        if (bossDefeated) {
          user.crystals += boss.rewardCrystals;
          if (!user.badges.some(b => b.name === boss.rewardBadge)) {
            user.badges.push({ name: boss.rewardBadge, isHolographic: true, icon: '👑' });
          }
        }
        // Update quest
        if (user.dailyQuests) {
          const bq = user.dailyQuests.find(q => q.id === 'quest_boss');
          if (bq) {
            bq.progress = Math.min(bq.target, bq.progress + 1);
            if (bq.progress >= bq.target) bq.completed = true;
          }
        }
      }
    } else {
      user = await User.findById(userId);
      if (!user) user = await User.findOne();
      if (user) {
        user.bossDamageDealt = (user.bossDamageDealt || 0) + dmg;
        user.currentXP += 50;
        user.crystals = (user.crystals || 0) + 20;
        if (bossDefeated) {
          user.crystals += boss.rewardCrystals;
          if (!user.badges.some(b => b.name === boss.rewardBadge)) {
            user.badges.push({ name: boss.rewardBadge, isHolographic: true, icon: '👑' });
          }
        }
        if (user.dailyQuests) {
          const bq = user.dailyQuests.find(q => q.id === 'quest_boss');
          if (bq) {
            bq.progress = Math.min(bq.target, bq.progress + 1);
            if (bq.progress >= bq.target) bq.completed = true;
          }
        }
        await user.save();
      }
    }

    if (io) {
      io.emit('boss_damaged', {
        damage: dmg,
        currentHp: boss.currentHp,
        maxHp: boss.maxHp,
        bossDefeated,
        attacker: user ? user.username : 'Pioneer'
      });
    }

    res.json({
      message: `Dealt ${dmg} damage to Chronos!`,
      damage: dmg,
      boss,
      bossDefeated,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7. SHOP & CUSTOMIZATION
router.get('/shop/items', (req, res) => {
  res.json({ items: SHOP_ITEMS });
});

router.post('/shop/purchase', async (req, res) => {
  try {
    const { userId, itemId } = req.body;
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item) return res.status(404).json({ message: 'Item not found in shop catalog.' });

    let user = null;
    if (useInMemory) {
      user = inMemoryDb.users[userId] || Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });

      if ((user.crystals || 0) < item.cost) {
        return res.status(400).json({ message: `Insufficient crystals. Need ${item.cost} 💎.` });
      }

      user.crystals -= item.cost;

      if (item.category === 'frame') {
        if (!user.unlockedFrames) user.unlockedFrames = ['default'];
        if (!user.unlockedFrames.includes(item.id)) user.unlockedFrames.push(item.id);
        user.activeFrame = item.id;
      } else if (item.category === 'title') {
        user.playerTitle = item.titleValue;
      } else if (item.category === 'shield') {
        user.streakShields = Math.min(3, (user.streakShields || 0) + 1);
      }

      return res.json({
        message: `Purchased ${item.name} successfully!`,
        user,
        item
      });
    }

    // MongoDB Mode
    user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    if ((user.crystals || 0) < item.cost) {
      return res.status(400).json({ message: `Insufficient crystals. Need ${item.cost} 💎.` });
    }

    user.crystals -= item.cost;

    if (item.category === 'frame') {
      if (!user.unlockedFrames) user.unlockedFrames = ['default'];
      if (!user.unlockedFrames.includes(item.id)) user.unlockedFrames.push(item.id);
      user.activeFrame = item.id;
    } else if (item.category === 'title') {
      user.playerTitle = item.titleValue;
    } else if (item.category === 'shield') {
      user.streakShields = Math.min(3, (user.streakShields || 0) + 1);
    }

    await user.save();

    res.json({
      message: `Purchased ${item.name} successfully!`,
      user,
      item
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update customization (active frame or title)
router.post('/users/:id/customize', async (req, res) => {
  try {
    const { activeFrame, playerTitle } = req.body;
    const userId = req.params.id;

    if (useInMemory) {
      let user = inMemoryDb.users[userId] || Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (activeFrame) user.activeFrame = activeFrame;
      if (playerTitle) user.playerTitle = playerTitle;
      return res.json({ message: 'Customization applied successfully!', user });
    }

    let user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (activeFrame) user.activeFrame = activeFrame;
    if (playerTitle) user.playerTitle = playerTitle;
    await user.save();

    res.json({ message: 'Customization applied successfully!', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 8. GLOBAL LEADERBOARD
router.get('/leaderboard', async (req, res) => {
  try {
    let users = [];
    if (useInMemory) {
      users = Object.values(inMemoryDb.users);
    } else {
      users = await User.find().select('username playerTitle currentXP level currentStreak longestStreak activeFrame');
    }

    // Add extra synthetic competitors if database is sparse
    const dummyCompetitors = [
      { username: 'AstraValkyrie', playerTitle: 'Cosmic Empress', currentXP: 9840, level: 10, currentStreak: 54, longestStreak: 60, tier: 'Cosmic' },
      { username: 'SolarKnight', playerTitle: 'Void Walker', currentXP: 7200, level: 8, currentStreak: 41, longestStreak: 45, tier: 'Diamond' },
      { username: 'QuantumGhost', playerTitle: 'Chronos Slayer', currentXP: 5120, level: 6, currentStreak: 28, longestStreak: 30, tier: 'Diamond' },
      { username: 'VortexPilot', playerTitle: 'Hyperdrive Pilot', currentXP: 3400, level: 4, currentStreak: 18, longestStreak: 20, tier: 'Gold' }
    ];

    const mappedUsers = users.map(u => ({
      username: u.username,
      playerTitle: u.playerTitle || 'Pioneer',
      currentXP: u.currentXP,
      level: u.level,
      currentStreak: u.currentStreak,
      longestStreak: u.longestStreak,
      tier: u.currentStreak >= 40 ? 'Cosmic' : (u.currentStreak >= 20 ? 'Diamond' : (u.currentStreak >= 7 ? 'Gold' : 'Silver'))
    }));

    const fullLeaderboard = [...mappedUsers, ...dummyCompetitors]
      .sort((a, b) => b.currentXP - a.currentXP)
      .map((entry, index) => ({ rank: index + 1, ...entry }));

    res.json({ leaderboard: fullLeaderboard });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 9. RE-SEED ROUTE
router.post('/seed', async (req, res) => {
  try {
    if (useInMemory) {
      const { userA, userB } = seedInMemory();
      return res.json({
        message: 'In-Memory database successfully re-seeded with upgraded features!',
        users: [userA, userB]
      });
    }

    const { userA, userB } = await seedMongoData();
    res.json({
      message: 'MongoDB database successfully re-seeded with upgraded features!',
      users: [userA, userB]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 10. THEME PREFERENCE
router.post('/users/:id/theme', async (req, res) => {
  try {
    const { theme } = req.body;
    const userId = req.params.id;

    if (useInMemory) {
      let user = inMemoryDb.users[userId] || Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });
      user.themePreference = theme;
      return res.json({ message: 'Theme updated (In-Memory)', themePreference: user.themePreference });
    }

    let user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.themePreference = theme;
    await user.save();
    res.json({ message: 'Theme updated successfully', themePreference: user.themePreference });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 11. ADMIN TOGGLE STATE
router.post('/users/:id/toggle-state', async (req, res) => {
  try {
    const { field, value } = req.body;
    const userId = req.params.id;

    if (useInMemory) {
      let user = inMemoryDb.users[userId] || Object.values(inMemoryDb.users)[0];
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (field === 'isPowerHour') user.isPowerHour = !!value;
      if (field === 'streakShields') user.streakShields = parseInt(value, 10);
      if (field === 'lastActiveDate') {
        if (value === 'yesterday') {
          user.lastActiveDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        } else if (value === 'missed') {
          user.lastActiveDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
        } else {
          user.lastActiveDate = new Date().toISOString();
        }
      }
      if (field === 'currentStreak') user.currentStreak = parseInt(value, 10);

      return res.json({ message: 'State toggled successfully', user });
    }

    let user = await User.findById(userId);
    if (!user) user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (field === 'isPowerHour') user.isPowerHour = !!value;
    if (field === 'streakShields') user.streakShields = parseInt(value, 10);
    if (field === 'lastActiveDate') {
      if (value === 'yesterday') {
        user.lastActiveDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      } else if (value === 'missed') {
        user.lastActiveDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      } else {
        user.lastActiveDate = new Date();
      }
    }
    if (field === 'currentStreak') user.currentStreak = parseInt(value, 10);

    await user.save();
    res.json({ message: 'State toggled successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
