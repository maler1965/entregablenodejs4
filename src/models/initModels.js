//const Comment = require('./comment.model');
const { Repairs } = require('./repairs.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Repairs, { foreignKey: 'userId' });
  Repairs.belongsTo(User, { foreignKey: 'userId' });

  // Repairs.hasMany(Comment);
  //Comment.belongsTo(Repairs);

  // User.hasMany(Comment);
  //Comment.belongsTo(User);
};

module.exports = initModel;
