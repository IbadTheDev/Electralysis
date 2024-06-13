import { ID, Account, Client} from 'appwrite'
import Config from'react-native-config'
import Snackbar from 'react-native-snackbar'

const appwriteClient = new Client();

const APPWRITE_ENDPOINT: string = Config.APPWRITE_ENDPOINT!;
const APPWRITE_PROJECT_ID:string = Config.APPWRITE_PROJECT_ID!;

type CreateUserAccount = {
    email: string;
    password: string;
    mobile: string;
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

    async createAccount({ email, password, mobile}:
        CreateUserAccount){
            try{
                const userAccount = await this.account.create(
                    ID.unique(),
                    email,
                    password,
                    mobile,
                )
                if (userAccount){
                    // create login
                    return this.login({email, password})
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
    
    async login({email, password}: LoginUserAccount){
        try {
           return await this.account.createEmailPasswordSession(
                email, 
                password,
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