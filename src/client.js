import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";

export const client = createClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: "production",
    useCdn: true,
    apiVersion: "2023-05-03", //
    token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// Using GROQ to query content
export async function getPosts() {
    const posts = await client.fetch('*[_type == "post"]');
    return posts;
}

export async function createPost(post) {
    const result = await client.create(post);
    return result;
}

export async function updateDocumentTitle(_id, title) {
    const result = await client.patch(_id).set({ title }).commit();
    return result;
}
