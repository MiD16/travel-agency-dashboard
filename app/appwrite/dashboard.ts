import { appwriteConfig, database } from "./client";



type FilterByDate = (
    items: Document[],
)

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
    const d = new Date();
    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrevious = new Date(d.getFullYear(), d.getMonth() - 1, 1).toISOString();
    const endPrevious = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

    const [users, trips] = await Promise.all([
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
        ),
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripsCollectionId,
        ),
    ]);

    const filterByDate: 
}