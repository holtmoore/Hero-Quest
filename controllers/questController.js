//controllers/quesrcontroller.js
const Quest = require('../models/quest');
const User = require('../models/user');
const router = require('express').Router();

router.get('/accept', async (req, res) => {
    try {
        const totalQuests = await Quest.countDocuments();
        const random = Math.floor(Math.random() * totalQuests);
        const quest = await Quest.findOne().skip(random);
        console.log(quest);
        const user = await User.findById(req.session.userId);
        console.log(user);

        if (!quest || !user) {
            throw new Error('Quest or user not found');
        }

        user.active_quest = quest._id;
        await user.save();

        res.render('quest', { quest: quest });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// router.get('/start', async (req, res) => {
//   try {
//       const user = await User.findById(req.session.userId);

//       if (!user) {
//           throw new Error('User not found');
//       }

//       user.active = true;
//       await user.save();

//       res.redirect('/index');
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//   }
// });


module.exports = router;
