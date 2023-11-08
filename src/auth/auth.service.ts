import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCredentialsDTO: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDTO;

    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
