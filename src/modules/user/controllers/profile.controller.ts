import {
    Controller,
    Get,
    HttpStatus,
    Req,
    Res,
    UseGuards,
} from "@nestjs/common";
import AuthService from "../services/auth.service";
import JwtAuthGuard from "../jwt-auth.guard";
import RoleGuard from "../role.guard";
import Roles from "../roles.decorator";

@Controller("user")
export default class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Roles("admin")
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get("profile")
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }
}
