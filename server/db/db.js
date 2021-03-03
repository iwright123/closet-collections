
const Sequelize = require('sequelize');
const mysql = require('mysql2');

const db = new Sequelize('btt4kvk4tsp4q222gi6t', 'u9qyiwatcizohnzq', '2PF07QJi3HL9jWDhXb34', {
  host: 'btt4kvk4tsp4q222gi6t-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});

const database = 'btt4kvk4tsp4q222gi6t';

db.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
db.query(`USE \`${database}\`;`);

const Users = db.define('Users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  username: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Items = db.define('Items', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  clothingType: {
    type: Sequelize.STRING,
    unique: false
  },
  description: {
    type: Sequelize.STRING,
    unique: false
  },
  price: {
    type: Sequelize.INTEGER,
    unique: false
  },
  imageUrl: {
    type: Sequelize.STRING(1000),
    unique: false
  }
});

const WhiteboardPost = db.define('WhiteboardPost', {
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  outfitId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  likes: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  dislikes: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  comments: {
    type: Sequelize.STRING,
    unique: true
  }
});

// saves all items into 1 outfit
const Outfit = db.define('Outfit', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  outfit: {
    type: Sequelize.STRING,
    unique: true
  }
});

const Calendar = db.define('Calendar', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  date: {
    type: Sequelize.STRING
  }
});

const Vote = db.define('Vote', {
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idPost: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  like: {
    type: Sequelize.INTEGER,
  },
  dislike: {
    type: Sequelize.INTEGER
  }
});

db.sync({ force: true })
  .then(() => {
    console.log('Database & tables created!');
  }).catch((err) => { console.log(err); });

module.exports = {
  db,
  Users,
  Items,
  WhiteboardPost,
  Outfit,
  Calendar,
  Vote,

};