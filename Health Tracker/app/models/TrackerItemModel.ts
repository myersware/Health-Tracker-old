export interface ITrackerItemModel {
    date: string;
    weight: number;
    workout: {
        treadmill: {
            distance: number;
            time: number;
        },
        rowing: {
            distance: number;
            time: number;
        }
    };
}