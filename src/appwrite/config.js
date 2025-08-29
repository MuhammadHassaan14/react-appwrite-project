import conf from '../conf/conf.js';
import { Client, ID, Storage, Databases, Query} from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwritePorjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost(title, slug, content, featuredImage, status, userId) {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage: featuredImage,
                    status,
                    userId   
                }
            );
            return post;
        } 
        catch (error) {
            throw new Error(`Failed to create post: ${error.message}`);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage: featuredImage,
                    status
                }
            );
            return post;
        } 
        catch (error) {
            throw new Error(`Failed to update post: ${error.message}`);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return { message: 'Post deleted successfully' };
        } 
        catch (error) {
            throw new Error(`Failed to delete post: ${error.message}`);
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return post;
        } 
        catch (error) {
            throw new Error(`Failed to get post: ${error.message}`);
        }
    }

    async getPosts(queries = [Query.equal('status', 'published')]) {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [...queries, Query.orderDesc('$createdAt')]
            );
            return posts.documents;
        } 
        catch (error) {
            throw new Error(`Failed to get posts: ${error.message}`);
        }
    }

    async uploadFile(file) {
        try {
            const response = await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } 
        catch (error) {
            throw new Error(`Failed to upload file: ${error.message}`);
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return { message: 'File deleted successfully' };
        } 
        catch (error) {
            throw new Error(`Failed to delete file: ${error.message}`);
        }
    }

    async getFilePreview(fileId) {
        try {
            const file = await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
            return file;
        } 
        catch (error) {
            throw new Error(`Failed to get file: ${error.message}`);
        }
    }
}

const service = new Service(); 
export default service;