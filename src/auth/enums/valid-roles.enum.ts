import { registerEnumType } from "@nestjs/graphql";

export enum ValidRoles {
    admin = 'admin',
    user = 'user',
    superUser = 'superUser'
}

registerEnumType(ValidRoles, {name: 'ValidRoles', description: 'Velit ea commodo ipsum voluptate incididunt in dolor culpa ut sunt anim anim sunt anim.'})