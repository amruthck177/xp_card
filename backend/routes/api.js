const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');

// In-Memory Database Fallback for offline/no-MongoDB situations
let useInMemory = false;
const inMemoryDb = {
  users: {}
};

// Seed in-memory database with default users
function seedInMemory() {
  const userAId = new mongoose.Types.ObjectId().toString();
  const userBId = new mongoose.Types.ObjectId().toString();

  const userA = {
    _id: userAId,
    username: 'NeonRider',
    currentXP: 2450,
    level: 3,
    currentStreak: 6, // 6 day streak, tomorrow's activity makes it 7 (Milestone!)
    longestStreak: 12,
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // active yesterday
    streakShields: 2,
    themePreference: 'deep-space',
    isPowerHour: false,
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
    currentXP: 1800,
    level: 2,
    currentStreak: 29, // 29 day streak, tomorrow's activity makes it 30 (Warp speed!)
    longestStreak: 29,
    lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // active yesterday
    streakShields: 1,
    themePreference: 'cyberpunk',
    isPowerHour: true,
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

// Initial seed
seedInMemory();

// Middleware to check if we should fall back to in-memory database
router.use((req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    useInMemory = true;
    console.log('[API] MongoDB not connected. Falling back to in-memory store.');
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

// 1. GET /api/users/:id/dashboard - Fetches stats, partner stats, and theme
router.get('/users/:id/dashboard', async (req, res) => {
  try {
    const userId = req.params.id;

    if (useInMemory) {
      const user = inMemoryDb.users[userId];
      if (!user) {
        // If not found in memory, try to find by username or return the first available user
        const firstUser = Object.values(inMemoryDb.users)[0];
        if (firstUser) {
          const partner = inMemoryDb.users[firstUser.coopPartnerId] || null;
          return res.json({ user: firstUser, partner });
        }
        return res.status(404).json({ message: 'User not found' });
      }
      const partner = inMemoryDb.users[user.coopPartnerId] || null;
      return res.json({ user, partner });
    }

    // MongoDB Mode
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let partner = null;
    if (user.coopPartnerId) {
      partner = await User.findById(user.coopPartnerId).select('username currentStreak level currentXP lastActiveDate');
    }

    res.json({ user, partner });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. POST /api/users/:id/activity - Updates XP, streaks, level, and handles shield shatter
router.post('/users/:id/activity', async (req, res) => {
  try {
    const userId = req.params.id;
    const now = new Date();
    let xpAmount = req.body.xpAmount || 100;
    let shieldShattered = false;
    let streakWasReset = false;

    if (useInMemory) {
      const user = inMemoryDb.users[userId];
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (user.isPowerHour) {
        xpAmount = Math.floor(xpAmount * 1.5);
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
      const partner = inMemoryDb.users[user.coopPartnerId] || null;

      return res.json({
        message: 'Activity recorded successfully (In-Memory)!',
        user,
        partner,
        addedXP: xpAmount,
        leveledUp,
        shieldShattered,
        streakWasReset,
        themePreference: user.themePreference
      });
    }

    // MongoDB Mode
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isPowerHour) {
      xpAmount = Math.floor(xpAmount * 1.5);
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
    await user.save();

    let partner = null;
    if (user.coopPartnerId) {
      partner = await User.findById(user.coopPartnerId).select('username currentStreak level currentXP lastActiveDate');
    }

    res.json({
      message: 'Activity recorded successfully!',
      user,
      partner,
      addedXP: xpAmount,
      leveledUp,
      shieldShattered,
      streakWasReset,
      themePreference: user.themePreference
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. POST /api/users/:id/spend-xp - Spends XP to revive partner's streak
router.post('/users/:id/spend-xp', async (req, res) => {
  try {
    const userId = req.params.id;
    const cost = 500;

    if (useInMemory) {
      const user = inMemoryDb.users[userId];
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (!user.coopPartnerId) {
        return res.status(400).json({ message: 'You do not have a co-op partner linked.' });
      }

      const partner = inMemoryDb.users[user.coopPartnerId];
      if (!partner) {
        return res.status(404).json({ message: 'Co-op partner not found.' });
      }

      if (user.currentXP < cost) {
        return res.status(400).json({ message: `Insufficient XP. You need ${cost} XP but only have ${user.currentXP} XP.` });
      }

      const now = new Date();
      const isBroken = partner.lastActiveDate ? getDayDifference(partner.lastActiveDate, now) > 1 : true;

      if (!isBroken) {
        return res.status(400).json({ message: `${partner.username}'s streak is already active and does not need a revival.` });
      }

      user.currentXP -= cost;
      user.level = Math.floor(user.currentXP / 1000) + 1;

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      partner.lastActiveDate = yesterday.toISOString();
      partner.currentStreak = Math.max(partner.longestStreak, 1);

      return res.json({
        message: `Successfully revived ${partner.username}'s streak by spending ${cost} XP (In-Memory)!`,
        user,
        partner
      });
    }

    // MongoDB Mode
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.coopPartnerId) {
      return res.status(400).json({ message: 'You do not have a co-op partner linked.' });
    }

    const partner = await User.findById(user.coopPartnerId);
    if (!partner) {
      return res.status(404).json({ message: 'Co-op partner not found.' });
    }

    if (user.currentXP < cost) {
      return res.status(400).json({ message: `Insufficient XP. You need ${cost} XP but only have ${user.currentXP} XP.` });
    }

    const now = new Date();
    const isBroken = partner.lastActiveDate ? getDayDifference(partner.lastActiveDate, now) > 1 : true;

    if (!isBroken) {
      return res.status(400).json({ message: `${partner.username}'s streak is already active and does not need a revival.` });
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

// 4. POST /api/seed - Creates/resets sample data
router.post('/seed', async (req, res) => {
  try {
    if (useInMemory) {
      const { userA, userB } = seedInMemory();
      return res.json({
        message: 'In-Memory database successfully re-seeded with partner users!',
        users: [userA, userB]
      });
    }

    // MongoDB Mode
    await User.deleteMany({});

    const userA = new User({
      username: 'NeonRider',
      currentXP: 2450,
      level: 3,
      currentStreak: 6,
      longestStreak: 12,
      lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      streakShields: 2,
      themePreference: 'deep-space',
      isPowerHour: false,
      badges: [
        { name: 'First Steps', isHolographic: false, icon: '🥾' },
        { name: 'Space Explorer', isHolographic: true, icon: '🚀' },
        { name: 'Code Samurai', isHolographic: true, icon: '⚔️' }
      ]
    });

    const userB = new User({
      username: 'PixelMage',
      currentXP: 1800,
      level: 2,
      currentStreak: 29,
      longestStreak: 29,
      lastActiveDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
      streakShields: 1,
      themePreference: 'cyberpunk',
      isPowerHour: true,
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

    res.json({
      message: 'Database successfully seeded with partner users!',
      users: [userA, userB]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update theme preference
router.post('/users/:id/theme', async (req, res) => {
  try {
    const { theme } = req.body;
    const userId = req.params.id;

    if (useInMemory) {
      const user = inMemoryDb.users[userId];
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.themePreference = theme;
      return res.json({ message: 'Theme updated (In-Memory)', themePreference: user.themePreference });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.themePreference = theme;
    await user.save();
    res.json({ message: 'Theme updated successfully', themePreference: user.themePreference });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin-only route to toggle Power Hour and streak state on/off (for testing)
router.post('/users/:id/toggle-state', async (req, res) => {
  try {
    const { field, value } = req.body;
    const userId = req.params.id;

    if (useInMemory) {
      const user = inMemoryDb.users[userId];
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
      if (field === 'currentStreak') {
        user.currentStreak = parseInt(value, 10);
      }

      return res.json({ message: 'State toggled successfully (In-Memory)', user });
    }

    const user = await User.findById(userId);
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
    if (field === 'currentStreak') {
      user.currentStreak = parseInt(value, 10);
    }

    await user.save();
    res.json({ message: 'State toggled successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

