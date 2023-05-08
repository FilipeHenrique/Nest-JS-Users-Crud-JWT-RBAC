import { 
    Body, 
    Controller, 
    Post, 
    Get, 
    Put, 
    Patch,
    Delete, 
    Param 
} from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDto } from "./dto/update-put-user.dto";

@Controller('users')
export class UserController {

    @Post()
    async create(@Body() {email, name, password}: CreateUserDTO) {
        return {email, name, password};
    }

    @Get()
    async findAll(){
        return {users: []};
    }

    @Get(':id')
    async readOne(@Param() params){
        return {user: {}, params};
    }

    @Put(':id')
    async update(@Body() {email, name, password}: UpdatePutUserDto, @Param() params) {
        return {email,name,password, params} ;
    }

    @Patch(':id') 
    async updatePartial(@Body() body, @Param() params) {
        return {body,params};
    }

    @Delete(':id') 
    async delete(@Param() params) {
        return {params} ;
    }

}