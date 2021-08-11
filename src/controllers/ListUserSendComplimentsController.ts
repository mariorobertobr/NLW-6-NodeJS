import { Request, Response } from 'express';
import { ListUserSendComplimentsService } from '../service/ListUserSendComplimentsService';


class ListUserSendComplimentsController{

  async handle (request: Request, response: Response){

    const { user_id } = request
    const listUserSendCompliments = new ListUserSendComplimentsService()
    const compliments = await listUserSendCompliments.execute(user_id)

    return response.json(compliments)

  }
  

 

}
export { ListUserSendComplimentsController }