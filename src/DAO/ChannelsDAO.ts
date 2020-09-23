import {AbstractDAO} from 'nergal';
import {IDbAdapter} from 'nergal/src/Services/Db/IDbAdapter';
import Channel from "../Models/Channel";

export default class ChannelsDAO extends AbstractDAO<Channel> {
    fields: string[] = ['id', 'name', 'discord_channel_id'];
    table: string = 'channels';

    public constructor(db: IDbAdapter) {
        super(db, () => new Channel());
    }
}