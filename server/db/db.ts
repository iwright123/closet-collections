import Sequelize from 'sequelize';
import mysql from 'mysql2';

const sequelize = new Sequelize('bao0spze4uyjnrjcstlm', 'us5tvpffhllqetkd', 'vnG2q19b3wbaZXBhVjLY', {
  host: 'bao0spze4uyjnrjcstlm-mysql.services.clever-cloud.com',
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

export const Items = sequelize.define('Items', {
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

export const Outfit = sequelize.define('Outfit', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false
  },

  outfitTitle: {
    type: Sequelize.STRING,
    unique: true
  },
  imageUrl: {
    type: Sequelize.STRING,
  }
});

export const WhiteboardPost = sequelize.define('WhiteboardPost', {
  idUser: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  likes: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  dislikes: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
  comments: {
    type: Sequelize.STRING,
    unique: true
  },
});

WhiteboardPost.belongsTo(Outfit);
// saves all items into 1 outfit

export const Calendar = sequelize.define('Calendar', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  user: {
    type: Sequelize.STRING,
    allowNull: false
  },

  title: {
    type: Sequelize.STRING
  },

  subTitle: {
    type: Sequelize.STRING,
  },

  imgUrl: {
    type: Sequelize.STRING,
  },

  releaseDate: {
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
  type: {
    type: Sequelize.STRING,
  },

});

const database = 'bao0spze4uyjnrjcstlm';

sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
sequelize.query(`USE \`${database}\`;`);

// const addItem = async(body: any) => {
//   const { clothingType, description, price, imageUrl } = body;
//    const newItem = await Items.create({
//      clothingType: clothingType,
//      description: description,
//      price: price,
//      imageUrl: imageUrl
//    });
//   return newItem.save();
// };

// const getAllItems = async() => {
//   return await Items.findAll();
// };

// const deleteItem = (body: any) => {
//   const { id } = body;
//   return Items.destroy({
//     where: {
//       id: id
//     }
//   });
// };

export const addUser = (name: string): void => {
  return Users.findOrCreate({
    username: name,
    where: {
      username: name
    }
  });
};

const getFits = (): void => {
  return WhiteboardPost.findAll();
};

const getTrash = (): void => {
  return WhiteboardPost.findAll();
};

module.exports = {
  Items,
  WhiteboardPost,
  Users,
  Outfit,
  Calendar,
  Vote,
  getFits,
  getTrash,

};

// sequelize.sync({ force: true })
//   .then(() => console.log('Database & tables created!'))
//   .catch((err: any) => console.log(err));


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err: string) => console.error('Unable to connect to the database:', err));

