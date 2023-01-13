import {
    Controller, Get, HttpStatus, Req, Res, UseGuards,
} from "@nestjs/common";
import AuthService from "../services/auth.service";
import JwtAuthGuard from "../../../guards/jwt-auth.guard";

@Controller("user")
@UseGuards(JwtAuthGuard)
class ProfileController {
    constructor(private readonly authService: AuthService) { }

    @Get("profile")
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }

    @Get("profile2")
    profile2(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }
}

export default ProfileController;
export { ProfileController };
