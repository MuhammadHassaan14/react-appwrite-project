import conf from '../conf/conf.js';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;
       
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId); // Fixed typo: PorjectId → ProjectId
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(!userAccount) {
                throw new Error('Account creation failed');
            }
            return this.login(email, password);
        } 
        catch (error) {
            throw new Error(`Failed to create account: ${error.message}`);
        }
    }

    async login(email, password) {
        try {
            const session = await this.account.createEmailSession(email, password);
            if(!session) {
                throw new Error('Login failed');
            }
            return session;
        } 
        catch (error) {
            throw new Error(`Failed to login: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            const user = await this.account.get();
            console.log('User fetched:', user);
            return user;
        } catch (error) {
            if (error.code === 401) {
                // Don't log 401 — it's normal if user isn't logged in
                return null;
            }
            console.error('Unexpected error in getCurrentUser():', error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } 
        catch (error) {
            throw new Error(`Failed to logout: ${error.message}`);
        }
    }
}

const authService = new AuthService();

export default authService;