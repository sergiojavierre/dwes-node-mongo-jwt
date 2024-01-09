import { collections } from "../../../context/db/mongo.db";
import User from "../../domain/User";
import { ObjectId } from "mongodb";
import UserRepository from "../../domain/user.repository";

export default class UserRepositoryMongoDB implements UserRepository {
  async register(user: User): Promise<User> {
    const result = await collections.users.insertOne(user);
    const id = String(result.insertedId);
    return await this.getUserById(id);
  }

  async login(user: User): Promise<User> {
    const userFromDB = await collections.users.findOne({
      email: user.email,
    });
    if (!userFromDB) throw new Error("User not found or password incorrect");
    else {
      const user: User = {
        id: String(userFromDB._id),
        name: userFromDB.name,
        email: userFromDB.email,
        password: userFromDB.password,
      };
      return user;
    }
  }

  async getUserById(id: string): Promise<User> {
    const objectId = new ObjectId(id);
    const userFromDB = await collections.users.findOne({ _id: objectId });
    if (!userFromDB) throw new Error("User not found or password incorrect");
    const user: User = {
      id: String(userFromDB._id),
      name: userFromDB.name,
      email: userFromDB.email,
      password: userFromDB.password,
    };
    return user;
  }
}
