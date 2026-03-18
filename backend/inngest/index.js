import { Inngest } from '@inngest/sdk'
import User from '../models/User.js'

export const inngest = new Inngest({
    id: 'ywy-media',
})


const syncUserCreation = inngest.createFunction(

    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created',
    },
    async ({ event, step }) => {

        const {
            id,
            first_name,
            last_name,
            email_addresses,
            image_url,
        } = event.data;

        let username = email_addresses[0].email_address.split('@')[0];

        const user = await User.findOne({username})

        if (user) {
            username = username + Math.floor(Math.random() * 1000000);
        }

        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            full_name: `${first_name} ${last_name}`,
            username: username,
            profile_picture: image_url,
        }

        await User.create(userData);

    }
)


const syncUserUpdation = inngest.createFunction(

    {
        id: 'update-sync-user-from-clerk'
    },
    {
        event: 'clerk/user.updated',
    },
    async ({ event, step }) => {

        const {
            id,
            first_name,
            last_name,
            email_addresses,
            image_url,
        } = event.data;


        const updatedUserData = {
            email: email_addresses[0].email_address,
            full_name: `${first_name} ${last_name}`,
            profile_picture: image_url,
        }

        await User.findOneAndUpdate({_id: id}, updatedUserData);

    }
)

const syncUserDeletion = inngest.createFunction(

    {
        id: 'delete-sync-user-from-clerk'
    },
    {
        event: 'clerk/user.deleted',
    },
    async ({ event, step }) => {

        const { id } = event.data;

        await User.findOneAndDelete({_id: id});

    }
)


export const fuctions = [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
];