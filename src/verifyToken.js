import { jwtVerify } from "jose";

export const verifyJwtToken = async (token) => {
  try {
    // В качестве ключа используется Uint8Array
    const { payload } = await jwtVerify(token, new TextEncoder().encode(
      process.env.JWT_SECRET
    ));

    return payload;
  } catch (error) {
    console.log(error)
    return null;
  }
}