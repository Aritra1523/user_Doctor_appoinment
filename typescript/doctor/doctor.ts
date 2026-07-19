export interface Doctor{
    _id:string,
    name:string,
    fees:string,
    department:string;

    schedule:{
        startTime:{
            startTime:string,
            endTime:string,
            slotDuration:string
        }
    }
}