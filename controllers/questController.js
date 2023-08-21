const Quest = require('../models/quest');
const User = require('../models/user');
const router = require('express').Router();

router.get('/accept', async (req, res) => {
    try {
        const totalQuests = await Quest.countDocuments();
        const random = Math.floor(Math.random() * totalQuests);
        const quest = await Quest.findOne().skip(random);
        const user = await User.findById(req.session.userId);

        if (!quest || !user) {
            throw new Error('Quest or user not found');
        }

        user.active_quest = quest._id;
        user.active = true; // Set the active field to true
        await user.save();

        res.render('quest', { quest: quest });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/complete', async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);

        if (!user) {
            throw new Error('User not found');
        }

        // Reset the user's active quest status
        user.active_quest = null;
        user.active = false; // Set the active field to false
        await user.save();

        // Render the 'quest-completed' view and pass the user's data
        res.render('quest-completed', { user: user });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/accept', async (req, res) => {
  const userId = req.session.userId;

  try {
      await User.findByIdAndUpdate(userId, {
          active: true,
          questCompleted: false,
      });
      res.redirect('/index');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

router.post('/complete', async (req, res) => {
  const userId = req.session.userId;

  try {
      await User.findByIdAndUpdate(userId, {
          active: false,
          questCompleted: true,
      });
      res.redirect('/index');
  } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
  }
});

module.exports = router; // Make sure to export the router
