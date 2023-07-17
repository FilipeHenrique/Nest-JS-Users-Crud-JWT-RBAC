import { Role } from '../../../src/enums/role.enums';
import { UserEntity } from '../../../src/user/entity/user.entity';

export const userEntityList: UserEntity[] = [
  {
    id: 1,
    name: 'Joao',
    email: 'joao@gmail.com',
    birthAt: new Date('2000-01-01'),
    password: '$2b$10$TEHFR8ZYQ3RTFJBgYOCp1uQ4dgBcGEPgczX7rJivPVAI5XkaNlXpy',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: 'Joao2',
    email: 'joao2@gmail.com',
    birthAt: new Date('2000-01-01'),
    password: '$2b$10$TEHFR8ZYQ3RTFJBgYOCp1uQ4dgBcGEPgczX7rJivPVAI5XkaNlXpy',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: 'Joao3',
    email: 'joao3@gmail.com',
    birthAt: new Date('2000-01-01'),
    password: '$2b$10$TEHFR8ZYQ3RTFJBgYOCp1uQ4dgBcGEPgczX7rJivPVAI5XkaNlXpy',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
