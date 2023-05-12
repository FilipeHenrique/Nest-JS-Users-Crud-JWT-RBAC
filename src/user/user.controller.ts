import { 
    Body, 
    Controller, 
    Post, 
    Get, 
    Put, 
    Patch,
    Delete, 
    Param, 
    ParseIntPipe,
    NotFoundException
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";
import { UpdatePatchUserDto } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() {email, name, password, birthAt}: CreateUserDTO) {
        return this.userService.create({email, name, password, birthAt});
    }

    @Get()
    async findAll(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id : number){
            let user = await this.userService.show(id);
            if (user && user.id !== null) {
                return user;
            } else {
                throw new NotFoundException('User Not Found');
            }
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDto, @Param('id', ParseIntPipe) id : number) {
        return this.userService.update(id, data);
    }

    @Patch(':id') 
    async updatePartial(@Body() data : UpdatePatchUserDto, @Param('id', ParseIntPipe) id : number) {
        return this.userService.patch(id, data);
    }

    @Delete(':id') 
    async delete(@Param('id', ParseIntPipe) id : number) {
        return this.userService.delete(id);
    }

}