import jwt, { JwtPayload } from 'jsonwebtoken'

export async function generateToken({payload,secretKey = 'mysecretkey',options}:{
    payload:object,
    secretKey?:string,
    options?:jwt.SignOptions
}){
    
return jwt.sign(payload,secretKey,options)
    
}


export async function verifyToken(token:string,secretKey:string = 'mysecretkey'){
   return  jwt.verify(token,secretKey) as JwtPayload
}