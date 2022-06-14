import { Injectable,Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { NotifEntity } from 'src/entity/notif.entity';
import { NotifTokenEntity } from 'src/entity/push_notif_token.entity';
import * as serviceAccount from '../../push-notif-google-service-account.json';
import { Cron } from '@nestjs/schedule';
import { getManager } from 'typeorm';
import { NotifTypeEntity } from 'src/entity/m_notif_type.entity';

@Injectable()
export class PushNotifService {
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount as ServiceAccount)
        })
    }

    // @Cron('* * * */1 * *')
    async send(){
        const newseventnotif = await getManager().query(`
        select distinct  mn2."NEWS" ,mn2."DESCRIPTION", mn2."URL", mu."USERNAME", pnt."TOKEN" from m_notif mn
        join m_news mn2 ON mn."DATA_ID" = mn2."NEWS_ID"
        join m_group_news mgn on mgn."NEWS_ID" = mn2."NEWS_ID"
        join industry_group ig on ig."INDUSTRY_ID" = mgn."INDUSTRY_ID"
        join m_bp mb on mb."M_BP_ID" = ig."M_BP_ID"
        join m_user mu on mu."COMPANY_ID" = mb."COMPANY_ID"
        join push_notif_token pnt on mu."ID" = pnt."USER_ID"
        where  mn."START_DATE_NOTIF" >= current_date and mn."END_DATE_NOTIF" >= current_date
        `);
        newseventnotif.forEach(element=>{
            
        })
        const title='haloooo'
        const body='ínfone mazzeh'

        const tokenall= await NotifTokenEntity.find();
        const message={
            notification : {
                title,
                body
            },
        }

        tokenall.forEach(element => {
            Promise.all([ admin.messaging().sendToDevice(element.TOKEN,message)])
        });
        const webpush = require('web-push');

        const vapidKeys = {
        publicKey: 'BNQ-0td9CVUw_TJDaQV7Mby86U4hFs-t5pI2D7CHfvNZQtkDkOiBab21aWtfrdLlMF6q-iylrRoDHCf7dNLJxzk',
        privateKey: 'rvHRMZqyTkVuybEDmBb5G8kPEZAarPHOpe6YoWVLSi0'
        };

        // get client subscription config from db
        const subscription = {
            endpoint: 'https://fcm.googleapis.com/fcm/send/c5lAYn1CBDs:APA91bHIZt5X6YHiR8rj_nueH3Ce02NpCvH4l_ClnzpK1bT3VA45E0fRP1oKyavCMdsyMtq9CJ19kpl4We0l9qc6N1EICf-2UKgtT0O7_V5M_2ekDfiRi6snnpuiOgwLle4KPGTDjY5G',
            expirationTime: null,
            keys: {
                auth: 'LHAXouIKimXDBwJIX9Jgnw',
                p256dh: 'BFbKBEALs5YBsNklL7NyJKvl526I5eILOG4WEuNLib7YQVHvkx_Sof4lwqmrgp4gR1cb541jHyLFHA_8kz8BDxs',
            },
        };

        const payload = {
            notification: {
                title: 'Title',
                body: 'This is my body',
                // icon: 'assets/icons/icon-384x384.png',
                actions: [
                    { action: 'bar', title: 'Focus last' },
                    { action: 'baz', title: 'Navigate last' },
                ],
                data: {
                    onActionClick: {
                        default: { operation: 'openWindow' },
                        bar: {
                            operation: 'focusLastFocusedOrOpen',
                            url: '/signin',
                        },
                        baz: {
                            operation: 'navigateLastFocusedOrOpen',
                            url: '/signin',
                        },
                    },
                },
            },
        };

        const options = {
            vapidDetails: {
                subject: 'mailto:example_email@example.com',
                publicKey: vapidKeys.publicKey,
                privateKey: vapidKeys.privateKey,
            },
            TTL: 60,
        };

        // send notification
        webpush.sendNotification(subscription, JSON.stringify(payload), options)
            .then((_) => {
                console.log('SENT!!!');
                console.log(_);
            })
            .catch((_) => {
                console.log(_);
            });

    }

    async createtoken(token: NotifTokenEntity) {
        const news_data = NotifTokenEntity.create(token);
        await news_data.save();
    }

    async updatetoken(tokenid: string,token: NotifTokenEntity) {
        await NotifTokenEntity.update(tokenid,token);
    }

    async findtoken(tokenid: string){
        return await NotifTokenEntity.findOne(tokenid);
    }

    async create(notif: NotifEntity) {
        const data = NotifEntity.create(notif);
        await data.save();
        return notif;
    }
    
    async readAll() {
        return await NotifEntity.find();
    }

    async update(id: number,notif: NotifEntity){
        return await NotifEntity.update(id,notif);
    }

    async getDetailById(id_notif){
        return await NotifEntity.findOne(id_notif);
    }

    async delete(id) {
        return await NotifEntity.delete(id);
    }

    async getNotif(id: number){
        try {
            const model = await getManager()
            .createQueryBuilder(NotifEntity, 'dt')
            .select('dt.NOTIF_ID as "NOTIF_ID"')
            .addSelect('dt.START_DATE_NOTIF as "START_DATE_NOTIF"')
            .addSelect('dt.END_DATE_NOTIF as "END_DATE_NOTIF"')
            .addSelect('dt.NOTIF_TYPE_ID as "NOTIF_TYPE_ID"')
            .addSelect('dt.DATA_ID as "DATA_ID"')
            .addSelect('dt.DISCORD_ID as "DISCORD_ID"')
            .where(`dt.DATA_ID = :_id`, { _id: id })
            .getRawMany()
            if (model.length !== 0 ) {
                return model
            } else {
                return []
            }
            
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getnotiftype() {
        return await NotifTypeEntity.find();
    }

}
