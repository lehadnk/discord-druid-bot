import {IDbAdapter} from "nergal";

export default class StatisticsService {
    private db: IDbAdapter;

    constructor(db: IDbAdapter) {
        this.db = db;
    }

    async getChannelStat(channelId: string, timeFrom: number, timeTo: number): Promise<string[]>
    {
        let rows = await this.db.all("SELECT u.name, count(cm.id) as cnt\n" +
            "FROM channel_messages cm\n" +
            "JOIN users u on cm.discord_user_id = u.discord_user_id\n" +
            "WHERE cm.discord_channel_id = ?1 AND cm.time BETWEEN ?2 AND ?3\n" +
            "GROUP BY u.id\n" +
            "ORDER BY cnt DESC\n" +
            "LIMIT 20", {
            1: channelId,
            2: timeFrom,
            3: timeTo,
        });

        return rows.map((row) => {
            return row.name + ' - ' + row.cnt;
        })
    }
}