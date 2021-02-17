import {DiscordMessage, DiscordControllerResponse} from "nergal";
import AppServiceContainer from "../AppServiceContainer";
import StatisticsService from "../Services/StatisticsService";

export default class StatisticsController {
    private statisticsService = new StatisticsService(AppServiceContainer.db);

    async dispatch(msg: DiscordMessage): Promise<DiscordControllerResponse> {
        let args = msg.message.split(' ');
        if (args.length != 4) {
            return new DiscordControllerResponse("Command format should be: !стата <channel_id> <date_from> <date_to>");
        }

        let channel = args[1].replace(/\D/g,'');
        let dateFrom = Date.parse(args[2]);
        let dateTo = Date.parse(args[3]);

        let stats = await this.statisticsService.getChannelStat(channel, +dateFrom / 1000, +dateTo / 1000);

        return new DiscordControllerResponse(stats.join('\n'));
    }
}