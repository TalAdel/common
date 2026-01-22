import bcrypt from 'bcryptjs';

export class PasswordService {
    private static readonly SALT_ROUNDS = 10;

    static async hashPassword(plainPassword: string): Promise<string> {
        return bcrypt.hash(plainPassword, this.SALT_ROUNDS);
    }

    static async comparePassword(
        plainPassword: string, 
        hashedPassword: string
    ): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
}