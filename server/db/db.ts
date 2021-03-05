
const { Sequelize } = require('sequelize');

// const mysql = require('mysql2');

const sequelize = new Sequelize('btt4kvk4tsp4q222gi6t', 'u9qyiwatcizohnzq', '2PF07QJi3HL9jWDhXb34', {
  host: 'btt4kvk4tsp4q222gi6t-mysql.services.clever-cloud.com',
  dialect: 'mysql'
});

// const database = 'btt4kvk4tsp4q222gi6t';

// db.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// db.query(`USE \`${database}\`;`);

// const sequelize = new Sequelize({
//   host: 'btt4kvk4tsp4q222gi6t-mysql.services.clever-cloud.com',
//   database: 'btt4kvk4tsp4q222gi6t',
//   dialect: 'mysql',
//   username: 'u9qyiwatcizohnzq',
//   password: '2PF07QJi3HL9jWDhXb34'
// });

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

// const database = 'btt4kvk4tsp4q222gi6t';

// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// sequelize.query(`USE \`${database}\`;`);

// // db.sync({ force: true })
// //   .then(() => {
// //     console.log('Database & tables created!');
// //   }).catch((err) => { console.log(err); });


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


// import { Table } from '@material-ui/core';
// import { userInfo } from 'os';
// import {
//   Model,
//   ModelDefined,
//   DataTypes,
//   HasManyGetAssociationsMixin,
//   HasManyAddAssociationMixin,
//   HasManyHasAssociationMixin,
//   Association,
//   HasManyCountAssociationsMixin,
//   HasManyCreateAssociationMixin,
//   Optional,
// } from 'sequelize';

// import Sequelize from 'sequelize/types/lib/sequelize';

// const sequelize = new Sequelize({
//   host: 'btt4kvk4tsp4q222gi6t-mysql.services.clever-cloud.com',
//   database: 'btt4kvk4tsp4q222gi6t',
//   dialect: 'mysql',
//   username: 'u9qyiwatcizohnzq',
//   password: '2PF07QJi3HL9jWDhXb34'
// });

// // export interface Users {
// //   id: {
// //     type: number,
// //     autoIncrement: true,
// //     primaryKey: true
// //   },
// //   username: {
// //     type: string,
// //     allowNull: false
// //   }
// //};

// interface Users {
//   id: number,
//   username: string
// };

//  interface UsersI extends Optional<Users, 'id' | 'username'> {};



// export interface Items {
//   id: {
//     type: number,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   clothingType: {
//     type: string,
//     unique: false
//   },
//   description: {
//     type: string,
//     unique: false
//   },
//   price: {
//     type: string,
//     unique: false
//   },
//   imageUrl: {
//     type: string,
//     unique: false
//   }
// };


// export interface WhiteboardPost {
//   idUser: {
//     type: number,
//     allowNull: false,
//     primaryKey: true
//   },
//   outfitId: {
//     type: number,
//     allowNull: false,
//     primaryKey: true
//   },
//   likes: {
//     type: number,
//     allowNull: false,
//   },
//   dislikes: {
//     type: number,
//     allowNull: false,
//   },
//   comments: {
//     type: string,
//     unique: true
//   }
// };

// export interface Outfit {
//   id: {
//     type: number,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true
//   },
//   outfit: {
//     type: string,
//     unique: true
//   }
// };

// export interface Vote {
//   idUser: {
//     type: number,
//     allowNull: false,
//     primaryKey: true
//   },
//   idPost: {
//     type: number,
//     allowNull: false,
//     primaryKey: true
//   },
//   like: {
//     type: number
//   },
//   dislike: {
//     type: number
//   }
// };

//  const database = 'btt4kvk4tsp4q222gi6t';

// sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
// sequelize.query(`USE \`${database}\`;`);

// sequelize.sync({ force: true })
//   .then(() => console.log('Database & tables created!'))
//   .catch((err: any) => console.log(err));


sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err: string) => console.error('Unable to connect to the database:', err));

