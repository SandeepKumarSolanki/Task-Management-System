import { Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request, Response,  NextFunction } from "express";
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    
    constructor(private configService: ConfigService) {
        
    }
    use(req: Request, res: Response, next: NextFunction) {

        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ message: "Token missing" });
        }
        const token = authHeader.split(' ')[1];

        try{
            const secret = this.configService.get('JWT_SECRET');
            const decoded = jwt.verify(token, secret!);
            req.user = decoded; 
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Invalid token" });
        }
    }
}