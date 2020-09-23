import {DiscordMessage, DiscordControllerResponse, IRouter} from "nergal";
import DirectMessageController from "./Controllers/DirectMessageController";
import PublicMessageController from "./Controllers/PublicMessageController";

export default class Router implements IRouter {
    private dmController = new DirectMessageController();
    private publicController = new PublicMessageController();

    async route(msg: DiscordMessage): Promise<DiscordControllerResponse> {
        if (msg.isPrivate) {
            return this.dmController.dispatch(msg);
        }
        return this.publicController.dispatch(msg);
    }
}