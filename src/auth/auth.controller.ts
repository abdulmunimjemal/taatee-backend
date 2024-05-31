import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { SigninDto, SignupDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('signup')
    async signup(@Body() signupDto: SignupDto) {
        return await this.authService.signup(signupDto);
    }

    @Post('signin')
    async signin(@Body() signinDto: SigninDto) {
        return await this.authService.signin(signinDto);
    }

    @Post("validate")
    async validate(@Body("token") token: string) {
        try {
            const result = await this.authService.validate(token);
            return {valid: true, user: result}
        } catch (error) {
            return {valid: false}
        }
    }
}
