const Sequelize = require('sequelize');
const mysql = require('mysql2');

const db = new Sequelize('btt4kvk4tsp4q222gi6t', 'u9qyiwatcizohnzq', '2PF07QJi3HL9jWDhXb34', {
  host: 'btt4kvk4tsp4q222gi6t-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});

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
    allowNull: false,
    primaryKey: true
  },
  shirts: {
    type: Sequelize.STRING,
    unique: true
  },
  pants: {
    type: Sequelize.STRING,
    unique: true
  },
  shoes: {
    type: Sequelize.STRING,
    unique: true
  },
  dresses: {
    type: Sequelize.STRING,
    unique: true
  },
  accessories: {
    type: Sequelize.STRING,
    unique: true
  },
});

const WhiteboardPost = db.define('WhiteboardPost', {
  id_user: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  outfit_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  likes: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  dislikes: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  comments: {
    type: Sequelize.STRING,
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
})






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

};