import { account } from './appwrite-config.js';

class Auth {
    async register(email, password) {
        try {
            await account.create('unique()', email, password);
            await this.login(email, password);
        } catch (error) {
            throw new Error('فشل في إنشاء الحساب: ' + error.message);
        }
    }

    async login(email, password) {
        try {
            await account.createEmailSession(email, password);
        } catch (error) {
            throw new Error('فشل في تسجيل الدخول: ' + error.message);
        }
    }

    async logout() {
        try {
            await account.deleteSession('current');
        } catch (error) {
            console.error('فشل في تسجيل الخروج:', error);
        }
    }
}

export default new Auth(); 