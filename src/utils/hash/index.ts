import bcrypt from 'bcrypt'

export async function hashPassword(password: string) {
  const saltRounds = 10; // cost factor
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  return hashedPassword
}

export async function comparePassword(password:string,hashedPassword:string,){
  const comparedPassword =  await bcrypt.compare(password,hashedPassword)
  return comparedPassword
}