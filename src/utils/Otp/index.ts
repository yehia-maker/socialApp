
export const generateOTP = () => {
    const otp = Math.floor(10000 + Math.random() * 90000); // 5-digit OTP
    return otp
};

    // const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

export const generateExpiryDate = (minutes: number = 5)=>{
  return new Date(Date.now() + minutes * 60 * 1000);;
};
