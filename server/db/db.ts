import { DataTypes, Sequelize } from 'sequelize';
import mysql from 'mysql2';
import { create } from 'react-test-renderer';

const sequelize: Sequelize = new Sequelize('bao0spze4uyjnrjcstlm', 'us5tvpffhllqetkd', 'vnG2q19b3wbaZXBhVjLY', {
  host: 'bao0spze4uyjnrjcstlm-mysql.services.clever-cloud.com',
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
const db = {};
const Users = sequelize.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const Items = sequelize.define('Items', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  clothingType: {
    type: DataTypes.STRING,
    unique: false
  },
  description: {
    type: DataTypes.STRING,
    unique: false
  },
  price: {
    type: DataTypes.INTEGER,
    unique: false
  },
  imageUrl: {
    type: DataTypes.STRING(1000),
    unique: true
  }
});

export const Outfit = sequelize.define('Outfit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  outfitTitle: {
    type: DataTypes.STRING,
    unique: true
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
});

export const Likes = sequelize.define('Likes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  outfitId: {
    type: DataTypes.INTEGER,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false
  },
  favorite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

// Outfit.hasMany(Likes, { foreignKey: 'outfitId'});
// Likes.belongsTo(Outfit, { foreignKey: 'outfitId'});

export const WhiteboardPost = sequelize.define('WhiteboardPost', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: DataTypes.STRING,
    allowNull: true
  },
  likes: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT,
  },
});


export const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: true,
    defaultValue: DataTypes.UUID,
  },
  comment: {
    type: DataTypes.TEXT,

  },
  name: {
    type: DataTypes.STRING,

  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },


});

// saves all items into 1 outfit


export const Calendar = sequelize.define('Calendar', {
  id: {
    type: DataTypes.INTEGER,

    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },

  user: {
    type: DataTypes.STRING,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING
  },

  subTitle: {
    type: DataTypes.STRING,
  },

  imgUrl: {
    type: DataTypes.STRING,
  },

  releaseDate: {
    type: DataTypes.STRING
  }
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

export const addUser = (name: string): Promise<any> => {
  return Users.findOrCreate({
    where: {
      username: name
    }
  });
};
export const postComments = async( body: any): Promise<any> => {
  const { name, comment} = body;
  console.log({name, comment});
  const createComment = await Comment.create({
//maybe need an outfit id here?
    name: name,
    comment: comment
  });
  return createComment.save();
};
export const getComments = (): Promise<any> => {
  console.log(Comment.findAll());
  return Comment.findAll();
};

module.exports = {
  Items,
  WhiteboardPost,
  Users,
  Outfit,
  Calendar,
  Likes,
  getComments,
  postComments,
  addUser
};

// sequelize.sync({ force: true })
//   .then(() => console.log('Database & tables created!'))
//   .catch((err: any) => console.log(err));


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err: string) => console.error('Unable to connect to the database:', err));

