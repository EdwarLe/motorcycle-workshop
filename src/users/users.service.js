import User from "./users.model.js";

export class UserService {
  async findAllUsers() {
    return await User.findAll({
      where: {
        status: "available",
      },
    });
  }

  async createUser(data) {
    return await User.create(data);
  }

  async findOneUser(id) {
    return await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
  }

  async findOneUserByEmail(email) {
    return await User.findOne({
      where: {
        email,
        status: "available",
      },
    });
  }

  async updateUser(user, name, email) {
    return await user.update({
      name: name,
      email: email,
    });
  }

  async deleteUser(user) {
    return await user.update({ status: "disable" });
  }
}
