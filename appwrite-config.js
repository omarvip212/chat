import { Client, Account, Databases, Storage, Functions } from 'appwrite';

const client = new Client();

// الإعدادات الأساسية
client
    .setEndpoint('https://cloud.appwrite.io/v1') // عنوان خدمة Appwrite
    .setProject('67326caa002eb5f7c285'); // معرف المشروع الخاص بك

// تصدير الخدمات المطلوبة
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const functions = new Functions(client);

// معرفات قواعد البيانات والمجموعات
export const DATABASE_ID = 'love-chat-db';
export const MESSAGES_COLLECTION_ID = 'messages';
export const ROOMS_COLLECTION_ID = 'rooms';
export const USERS_COLLECTION_ID = 'users';
export const MEDIA_BUCKET_ID = 'media-files'; 