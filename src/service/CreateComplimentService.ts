import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";

interface iComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;

}

class CreateComplimentService{


  async execute({tag_id, user_sender, user_receiver, message}: iComplimentRequest){

    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    
    if (user_sender === user_receiver){
      throw new Error ("not allowed, o usuario que envia é o mesmo que recebe")
    }

    const userReceiverExists = await usersRepositories.findOne(user_receiver);
    

    if(!userReceiverExists){
      throw new Error("usuario que recebe elogio não existe");
    }

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    })
    
    await complimentsRepositories.save(compliment);

    return compliment;

  }

}

export { CreateComplimentService } 