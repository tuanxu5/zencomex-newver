const db = require("../models");
const bcrypt = require("bcryptjs");

// hash password
var salt = bcrypt.genSaltSync(10);
const hashPassword = (pass) => {
  var hash = bcrypt.hashSync(pass, salt);
  return hash;
};
// check password
const checkPassword = (pass, passHash) => {
  return bcrypt.compareSync(pass, passHash);
};
const createUser = async (email, password, username) => {
  const passHash = hashPassword(password);
  await db.table_user.create({
    email: email,
    password: passHash,
    username: username,
  });
};
const updateUser = async (email, username, userId) => {
  await db.table_user.update(
    {
      email: email,
      username: username,
    },
    {
      where: {
        id: userId,
      },
    }
  );
  //   return await db.table_user.save();
};
const deleteUser = async (userId) => {
  await db.table_user.destroy({
    where: {
      id: userId,
    },
  });
  //   return await db.table_user.save();
};

const getAllUser = async (req, res) => {
  // test relationship
  let newUser = await db.table_user.findOne({
    where: { id: 1 },
    attributes: ["id", "username", "email"],
    include: db.Group,
    raw: true,
    nest: true,
  });
  // let roles = await db.Role.findAll({
  //   include: {
  //     model: db.Group,
  //     attributes: ["id", "name", "description"],
  //     where: { id: 1 },
  //   },
  //   raw: true,
  //   nest: true,
  // });

  const users = await db.table_user.findAll();
  return users;
};
const getUserById = async (userId) => {
  const user = await db.table_user.findOne({
    where: {
      id: userId,
    },
  });
  return user.get({ plain: true });
};

module.exports = {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  deleteUser,
};
