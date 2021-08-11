import { UsersRepositories } from "../repositories/UsersRepositories";
import { getCustomRepository} from 'typeorm'
import { compare } from "bcryptjs"
import { sign }from "jsonwebtoken"

interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute ({email, password}:IAuthenticateRequest){

    const usersRepositories = getCustomRepository(UsersRepositories);

    //verificar se email existe
    const user = await usersRepositories.findOne({email})
    //verificar se senha esta correta
    if (!user){
      throw new Error("Email/password incorrect")
    }
    
    const passwordMatch =  await compare(password , user.password)
    
    if(!passwordMatch){
      throw new Error("Email/password incorrect")
    }
    //gerar token se tiver tudo certinho
    const token = sign ( { email: user.email}, "6909546d2d0860ac8f81a7acbcfc9485", { subject: user.id, expiresIn: "1d"})

    return token

  }            



}

export  { AuthenticateUserService } 