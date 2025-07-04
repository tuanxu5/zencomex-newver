const db = require("../models");

const getGroupWithRoles = async (user) => {
  let roles = await db.Group.findOne({
    where: { id: user.groupId },
    include: [
      {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    ],
  });
  return roles ? roles : {};
};
module.exports = {
  getGroupWithRoles,
};
