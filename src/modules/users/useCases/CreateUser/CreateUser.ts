import { getCustomRepository } from "typeorm";
import { IUserRequest } from "../../dtos";
import { UsersRepositories } from "../../repositories";

class CreateUser {
 async execute({email, name, admin}: IUserRequest) {
  const usersRepository = getCustomRepository(UsersRepositories);

  if (!email) {
    throw new Error("Invalid email");
  }

  const userAlreadyExists = await usersRepository.findOne({
    email
  })

  if (userAlreadyExists) {
    throw new Error("User already exists");
  }

  const user = usersRepository.create({
    name, 
    email, 
    admin
  })

  await usersRepository.save(user);

  return user;
 }
}

export { CreateUser }