import { Strategy, ExtractJwt, StrategyOptionsWithoutRequest } from "passport-jwt";
import { CONFIG } from '../../../config/config';

const options:StrategyOptionsWithoutRequest = {
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:CONFIG.ACCES_TOKEN as string
}

export const JwtStrategy = new Strategy(options, (payload: any, done: (arg0: any, arg1: any) => any)=>{    
    return done(null,payload);
});


