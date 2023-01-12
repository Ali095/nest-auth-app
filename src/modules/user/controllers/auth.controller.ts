import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import AuthService from "../services/auth.service";
import AuthenticateDto from "../dto/authenticate.dto";
import JwtAuthGuard from "../jwt-auth.guard";
import RoleGuard from "../role.guard";
import Roles from "../roles.decorator";

@Controller("user/auth")
export default class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post("login")
    login(@Res() res, @Body() authenticateDto: AuthenticateDto) {
        try {
            const response = this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json({ response });
        } catch (error) {
            return res.status(error.status).json(error.response);
        }
    }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get("profile")
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }
}
