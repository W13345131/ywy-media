import { Inngest } from 'inngest';
import User from '../models/User.js';

export const inngest = new Inngest({
    id: 'YWY_MEDIA',
});


export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-creation', triggers: { event: 'clerk/user.created' } },
    async ({ event, step }) => {

        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        
        let username = email_addresses[0].email_address.split('@')[0];
        let user = await User.findOne({ username });
        if (user) {
            username = username + Math.floor(Math.random() * 1000000);
        }


        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            full_name: `${first_name} ${last_name}`,
            username: username,
            profile_picture: image_url
        }
        await User.create(userData);
    }
);

export const syncUserUpdation = inngest.createFunction(
    { id: 'sync-user-updation', triggers: { event: 'clerk/user.updated' } },
    async ({ event, step }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        let username = email_addresses[0].email_address.split('@')[0];
        let user = await User.findOne({ username });
        if (user) {
            username = username + Math.floor(Math.random() * 1000000);
        }

        const updatedUserData = {
            email: email_addresses[0].email_address,
            full_name: `${first_name} ${last_name}`,
            profile_picture: image_url
        }
        await User.findOneAndUpdate({_id: id}, updatedUserData);
    }
);

export const syncUserDeletion = inngest.createFunction(
    { id: 'sync-user-deletion', triggers: { event: 'clerk/user.deleted' } },
    async ({ event, step }) => {
        const { id } = event.data;
        await User.findOneAndDelete({_id: id});
    }
);



export const functions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
];