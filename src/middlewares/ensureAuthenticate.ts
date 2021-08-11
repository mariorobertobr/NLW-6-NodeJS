import { Request, Response, NextFunction} from 'express'

import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

function ensureAuthenticate (request: Request, response: Response, next: NextFunction ) {


  const authToken = request.headers.authorization

  if (!authToken) {

    return response.status(401).end()
  }


  const [,token] = authToken.split(" ")

  try {
    const { sub }  = verify( token, "6909546d2d0860ac8f81a7acbcfc9485" )as IPayload


     request.user_id = sub

    return next()

  }
  catch (error) {
    return response.status(401).end()
  }
 




  





} 
export  { ensureAuthenticate }