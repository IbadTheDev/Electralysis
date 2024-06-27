import { ID, Account, Client} from 'appwrite'
import Config from'react-native-config'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID:string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    email: string;
    password: string;
    phone: string;
}

type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    account;

    

    constructor(){
        appwriteClient
        .setEndpoint(APPWRITE_ENDPOINT)
        .setProject(APPWRITE_PROJECT_ID)

        this.account = new Account(appwriteClient)
    }
    

    //create a new record of user on appwrite

    async createAccount({ email, password, phone}:
        CreateUserAccount){
            try{
                const userAccount = await this.account.create(
                    ID.unique(),
                    email,
                    password,
                    email,
                )
                if (userAccount){
                     //Update user preferences with phone number
                    await this.account.updatePrefs({ phone: phone});
                    // create login
                    return this.login({email, password})
                } else {
                    return userAccount
                }
            } catch(error){
                console.log("Service :: createAccount() ::" + error)
            }
        }
    
    async login({email, password}: LoginUserAccount){
        try {
           return await this.account.createEmailPasswordSession(
                email, 
                password,
            )
            
        } catch (error) {
            console.log("Service :: loginAccount() ::" + error)
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Service :: getCurrentUser() ::" + error)
            
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Service :: getCurrentUser() ::" + error)
            
        }
    }
    async isInitialSetupComplete(userId: string): Promise<boolean> {
        try {
            const user = await this.account.get();
            return user?.prefs?.initialSetupComplete || false;
        } catch (error) {
            console.error('Error checking initial setup:', error);
            return false;
        }
    }

    async markInitialSetupComplete(): Promise<void> {
        try {
            await this.account.updatePrefs({ initialSetupComplete: true });
        } catch (error) {
            console.error('Error marking initial setup as complete:', error);
        }
    }


}

export default AppwriteService