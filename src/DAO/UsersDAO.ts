import {AbstractDAO} from 'nergal';
import User from "../Models/User";
import {IDbAdapter} from 'nergal/src/Services/Db/IDbAdapter';

export default class UsersDAO extends AbstractDAO<User> {
    fields: string[] = ['id', 'name', 'discord_user_id'];
    table: string = 'users';

    public constructor(db: IDbAdapter) {
        super(db, () => new User());
    }
}