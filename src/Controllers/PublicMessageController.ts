import {DiscordMessage} from "nergal/src/DTO/DiscordMessage";
import {DiscordControllerResponse} from "nergal/src/DTO/DiscordControllerResponse";
import UsersDAO from "../DAO/UsersDAO";
import AppServiceContainer from "../AppServiceContainer";
import ChannelMessagesDAO from "../DAO/ChannelMessagesDAO";
import User from "../Models/User";
import ChannelMessage from "../Models/ChannelMessage";
import ChannelsDAO from "../DAO/ChannelsDAO";
import Channel from "../Models/Channel";

export default class PublicMessageController {
    private usersDao = new UsersDAO(AppServiceContainer.db);
    private channelsDao = new ChannelsDAO(AppServiceContainer.db);
    private messagesDao = new ChannelMessagesDAO(AppServiceContainer.db);

    async dispatch(msg: DiscordMessage): Promise<DiscordControllerResponse> {
        let user = await this.usersDao.getOneByField('discord_user_id', msg.authorId);
        if (!user) {
            user = new User();
            user.name = msg.authorName;
            user.discord_user_id = msg.authorId;
            await this.usersDao.save(user).catch(r => console.error('Error while saving user: '+r));
        }

        let channel = await this.channelsDao.getOneByField('discord_channel_id', msg.channelId);
        if (!channel) {
            channel = new Channel();
            channel.name = msg.channelName;
            channel.discord_channel_id = msg.channelId;
            await this.channelsDao.save(channel).catch(r => console.error('Error while saving channel: '+r));
        }

        let message = new ChannelMessage();
        message.discord_channel_id = msg.channelId;
        message.discord_user_id = msg.authorId;
        message.time = Math.floor(Date.now() / 1000);
        await this.messagesDao.save(message).catch(r => console.error('Error while saving message: '+r));

        return null;
    }
}