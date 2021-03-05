const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const sequelize = new Sequelize('b7gjvli8tydsaa3jdyaa', 'ugybjn6ukvevp2lb', 'jZxeIwWOFrcxpGFyLn4I', {
  host: 'b7gjvli8tydsaa3jdyaa-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});

const Users = sequelize.define('Users', {
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

const Items = sequelize.define('Items', {
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

const WhiteboardPost = sequelize.define('WhiteboardPost', {
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
const Outfit = sequelize.define('Outfit', {
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

const Calendar = sequelize.define('Calendar', {
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

const Vote = sequelize.define('Vote', {
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

// const database = 'b7gjvli8tydsaa3jdyaa';

// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// sequelize.query(`USE \`${database}\`;`);

const addItem = async(body: any) => {
  const { clothingType, description, price, imageUrl } = body;
   const newItem = await Items.create({
     clothingType: clothingType,
     description: description,
     price: price,
     imageUrl: imageUrl
   });
  return newItem.save();
};

const getAllItems = async() => {
  return await Items.findAll();
};

const deleteItem = (body: any) => {
  const { id } = body;
  return Items.destroy({
    where: {
      id: id
    }
  });
};

module.exports = {
  Users,
  Items,
  WhiteboardPost,
  Outfit,
  Calendar,
  Vote,
  addItem,
  getAllItems,
  deleteItem
};

// sequelize.sync({ force: true })
//   .then(() => console.log('Database & tables created!'))
//   .catch((err: any) => console.log(err));


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err: string) => console.error('Unable to connect to the database:', err));

