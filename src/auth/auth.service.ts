import { Injectable } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCredentialsDTO: AuthCredentialsDto): Promise<void> {
    return this.userRepository.createUser(authCredentialsDTO);
  }
}
