import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDTO: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDTO;
    const user = this.create({ username, password });
    await this.save(user);
  }
}
