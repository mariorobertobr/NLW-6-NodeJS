import { UsersRepositories } from "../repositories/UsersRepositories";
import { response, Response } from "express";
import { getCustomRepository } from "typeorm"
import { hash  } from 'bcryptjs'

interface iUSerRequest{
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({name, email, admin = false, password} : iUSerRequest){ 
        const usersRepository = getCustomRepository(UsersRepositories);

        if(!email){
            throw new Error("invalid email");
        }

        const userAlreadyexists = await usersRepository.findOne({
            email,
        })
        if(userAlreadyexists){
            throw new Error ("User ja existe")
            
        }
        const passwordHash = await hash(password, 8)
        const user = usersRepository.create({name, email, admin, password: passwordHash})

        await usersRepository.save(user);


        return user;
    }

}

export  { CreateUserService }