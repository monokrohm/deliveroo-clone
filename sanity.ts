import {createClient} from "@sanity/client"
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
    projectId: 'axilk2n0',
    dataset: 'production',
    useCdn: true, // set to `false` to bypass the edge cache
    apiVersion: '2024-01-22',
})

const builder = imageUrlBuilder(client);
export const urlFor = (source:string) => builder.image(source);


// sanity cors add http://localhost:3000 or in Sanity dashboard -> API 

export default client;