import AbstractDAO from 'nergal/src/DAO/AbstractDAO';
import { IDbAdapter } from 'nergal/src/Services/Db/IDbAdapter';
import ChannelMessage from "../Models/ChannelMessage";

export default class ChannelMessagesDAO extends AbstractDAO<ChannelMessage> {
    fields: string[] = ['id', 'discord_user_id', 'discord_channel_id', 'time'];
    table: string = 'channel_messages';

    public constructor(db: IDbAdapter) {
        super(db, () => new ChannelMessage());
    }
}