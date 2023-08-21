const mongoose = require('./db/connection');
const Quest = require('./models/quest');

mongoose.connect('mongodb+srv://doueven1996:KfcqJfHC0uVIG9bZ@herocluster.ivt3edt.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const quests = [
  { description: 'Go outside and capture 3 squirrels.', difficulty: 'easy' },
  { description: 'Find a hidden treasure in your backyard.', difficulty: 'medium' },
  { description: 'Defeat the dragon that lives in the park.', difficulty: 'hard' },
  { description: 'Find the lost city of Atlantis.', difficulty: 'hard' },
  { description: 'Save your dog from the fire.(if no fire then start one).', difficulty: 'medium' },
  { description: 'stop walmart theft.', difficulty: 'hard af' },
  { description: 'eat a badguy.', difficulty: 'easy' },
  { description: 'take out trash.', difficulty: 'easy' },
  { description: 'find a new job.', difficulty: 'medium' },
  { description: 'bury your enemies.', difficulty: 'medium' },
  { description: 'find billies home address and walk his dog without him knowing.', difficulty: 'medium' },
  { description: 'fill out exit ticket.', difficulty: 'easy peazy' },
  { description: 'go plus ultra on ur dad.', difficulty: 'hard' },
];

Quest.insertMany(quests)
  .then(() => {
    console.log('Quests inserted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error inserting quests:', err);
  });
