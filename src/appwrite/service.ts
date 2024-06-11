import { ID, Account, Client} from 'appwrite'
import Config from'react-native-config'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID:string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    password: string;
    name: string;
    mobile: string;
}

type LoginUserAccount = {
    mobile: string;
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

    async createAccount({ name, password, mobile}:
        CreateUserAccount){
            try{
                const userAccount = await this.account.create(
                    ID.unique(),
                    password,
                    name,
                    mobile,
                )
                if (userAccount){
                    // create login
                    return this.login({mobile, password})
                } else {
                    return userAccount
                }
            } catch(error){
                Snackbar.show({
                    text: String(error),
                    duration: Snackbar.LENGTH_SHORT
                })
                console.log("Service :: createAccount() ::" + error)
            }
        }
    
    async login({mobile, password}: LoginUserAccount){
        try {
           return await this.account.createEmailPasswordSession(
                mobile, 
                password
            )
            
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_SHORT
            })
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
}

export default AppwriteService