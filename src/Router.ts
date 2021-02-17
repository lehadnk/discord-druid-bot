import {DiscordMessage, DiscordControllerResponse, IRouter} from "nergal";
import DirectMessageController from "./Controllers/DirectMessageController";
import PublicMessageController from "./Controllers/PublicMessageController";
import StatisticsController from "./Controllers/StatisticsController";

export default class Router implements IRouter {
    private dmController = new DirectMessageController();
    private publicController = new PublicMessageController();
    private statisticsController = new StatisticsController();

    async route(msg: DiscordMessage): Promise<DiscordControllerResponse> {
        if (msg.message.includes('!стата')) {
            return this.statisticsController.dispatch(msg);
        }
        if (msg.isPrivate) {
            return this.dmController.dispatch(msg);
        }
        return this.publicController.dispatch(msg);
    }
}