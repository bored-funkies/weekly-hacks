import ActivityType from "./ActivityType";

export default interface Activity {
    id: string,
    mobile: string,
    type: ActivityType,
    link: string,
    description: string,
    timestamp: Date
}