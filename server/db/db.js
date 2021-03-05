
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
    primaryKey: true,
    allowNull: false,
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
    unique: true
  }
});

const Outfit = db.define('Outfit', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  outfitTitle: {
    type: Sequelize.STRING,
    unique: true
  },
  imageUrl: {
    type: Sequelize.STRING,
  }
});

const WhiteboardPost = db.define('WhiteboardPost', {
  outfitId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: true,
    primaryKey: true
  },
  votes: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  comments: {
    type: Sequelize.STRING,
    unique: true
  },
});

WhiteboardPost.belongsTo(Outfit, {as: 'outfitsId'});
// saves all items into 1 outfit
//connect votes to whiteboardPost

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
  type: {
    type: Sequelize.STRING,
  },

});

// db.sync({ force: true })
//   .then(() => {
//     console.log('Database & tables created!');
//   }).catch((err) => { console.log(err); });

module.exports = {
  db,
  Users,
  Items,
  WhiteboardPost,
  Outfit,
  Calendar,
  Vote,

};