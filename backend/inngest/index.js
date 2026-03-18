import { Inngest } from "inngest";
import User from "../models/User.js";

export const inngest = new Inngest({
  id: "ywy-media",
});

const syncUserCreation = inngest.createFunction(
  { id: "sync-user-creation" },
  { event: "user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const email = email_addresses?.[0]?.email_address;
    if (!email) {
      throw new Error("Missing email in Clerk event");
    }

    let username = email.split("@")[0];

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      username = `${username}${Math.floor(Math.random() * 10000)}`;
    }

    const userData = {
      clerkId: id,
      email,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      username,
      profile_picture: image_url || "",
    };

    await User.create(userData);
  }
);

const syncUserUpdate = inngest.createFunction(
  { id: "sync-user-update" },
  { event: "user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const email = email_addresses?.[0]?.email_address;
    if (!email) {
      throw new Error("Missing email in Clerk event");
    }

    const updatedUserData = {
      email,
      full_name: `${first_name || ""} ${last_name || ""}`.trim(),
      profile_picture: image_url || "",
    };

    await User.findOneAndUpdate({ clerkId: id }, updatedUserData, {
      new: true,
    });
  }
);

const syncUserDeletion = inngest.createFunction(
  { id: "sync-user-deletion" },
  { event: "user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findOneAndDelete({ clerkId: id });
  }
);

export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDeletion,
];