import { database, realtime, storage } from './appwrite-config.js';
import { account } from './appwrite-config.js';

class ChatRoom {
    constructor(roomId) {
        this.roomId = roomId;
        this.setupRoom();
        this.setupRealtimeSubscription();
    }

    setupRoom() {
        // إنشاء مستمع للرسائل الجديدة
        this.messageSubscription = realtime.subscribe([
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`
        ], (response) => {
            if (response.events.includes('databases.*.collections.*.documents.create')) {
                this.handleNewMessage(response.payload);
            }
        });
    }

    async sendMessage(content, type = 'text') {
        try {
            await database.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                'unique()',
                {
                    content,
                    type,
                    userId: (await account.get()).$id,
                    roomId: this.roomId,
                    timestamp: new Date().toISOString()
                }
            );
        } catch (error) {
            console.error('Error sending message:', error);
        }
    }

    async sendVoiceMessage(blob) {
        try {
            // رفع الملف الصوتي
            const file = await storage.createFile(
                BUCKET_ID,
                'unique()',
                blob
            );

            // إرسال رسالة صوتية
            await this.sendMessage(file.$id, 'voice');
        } catch (error) {
            console.error('Error sending voice message:', error);
        }
    }
} 