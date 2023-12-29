import { ExtractJwt } from "passport-jwt";
import { getSeconds } from "../utils/getSeconds";

const JWTConfig = {
  TTL: getSeconds(process.env.JWT_ACCESS_TOKEN_EXP_DATE), // 15min
  TTL2: getSeconds(process.env.JWT_REFRESH_TOKEN_EXP_DATE), // 7days
  Options: {
    audience: "example.com",
    issuer: "api.example.com",
    secretOrKey: process.env.JWT_SECRET || "123",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
} as const;

export default JWTConfig;

export function verify(token: string, ACCESS_TOKEN_SECRET: string | undefined) {
  throw new Error("Function not implemented.");
}
