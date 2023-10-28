import { encryptedPassword, verifyPassword } from "../config/plugins/encripted-password.js";
import generateJWT from "../config/plugins/generate-JWT.js";
import { partialValidateUser, validateLogin, validateUser } from "./users.schema.js";
import { UserService } from "./users.service.js";

const userService = new UserService();

export const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();

    return res.status(201).json(users);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const createUser = async (req, res, next) => {
  try {

    const {hasError, errorMessage, userData} = validateUser(req.body)

    if(hasError) {
      return res.status(421).json({
        status: 'error',
        message: errorMessage
      })
    }

    const user = await userService.createUser(userData);

  

    const token = await generateJWT(user.id)

    return res.status(201).json({
      token,
      user
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const login = async(req, res, next) => {
  const {hasError, errorMessage, loginData} = validateLogin(req.body)

  if(hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessage
    })
  }

  const user = await userService.findOneUserByEmail(loginData.email)

  if(!user) {
    return res.status(401).json({
      status: 'error',
      message: 'This account does not exist'
    })
  }

  const isCorrectPassword = await verifyPassword(loginData.password, user.password)

  if(!isCorrectPassword) {
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect email or password'
    })
  }

  const token = await generateJWT(user.id)

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  })
}

export const changePassword = async(req, res,next) => {
  const {sessionUser} = req;
  const {currentPassword, newPassword} = req.body
  
  if(currentPassword === newPassword) {
    return res.status(401).json({
      status: 'error',
      message: 'The password can not be equals'
    })
  }

  const isCorrectPassword = await verifyPassword(loginData.password, user.password)

  if(!isCorrectPassword) {
    return res.status(401).json({
      status: 'error',
      message: 'Incorrect email or password'
    })
  }

  const hashedNewPassword = await encryptedPassword(newPassword)

  await userService.updateUser(sessionUser, {
    password:hashedNewPassword,
    changePasswordAt: new Date()
  })

  return res.status(200).json({
    message: 'The user password was updted successfully'
  })
}

export const findOneUser = async (req, res) => {
  try {
    const {user} = req

    return res.status(201).json(user);
  } catch (error) {
    return res.status(201).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const {user} = req

    const {hasError, errorMessage, userData} = partialValidateUser(req.body)

    if(hasError) {
      return res.status(421).json({
        status: 'error',
        message: errorMessage
      })
    }
    const userUpdate = await userService.updateUser(user, userData.name, userData.email);

    return res.status(201).json(userUpdate);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {user} = req

    await userService.deleteUser(user);

    return res.status(201).json(null);
  } catch (error) {
    return res.status(500).json(error)
  }
};
