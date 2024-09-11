using db from '../db/schema';
service ms {
    @odata.draft.enabled
    entity teacher as projection on db.Teacher;

    

}