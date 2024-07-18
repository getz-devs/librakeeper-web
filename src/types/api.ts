export interface User {
    id: string;
    display_name: string;
    created_at: string; // Assuming your API returns timestamps as strings
    updated_at: string;
}

export interface UserUpdate {
    display_name?: string;
    updated_at: string;
}

export interface Bookshelf {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
    updated_at: string;
}

export interface BookshelfUpdate {
    name?: string;
    updated_at: string;
}

export interface Book {
    id: string;
    user_id: string;
    bookshelf_id: string;
    title: string;
    author: string;
    isbn: string;
    description: string;
    cover_image: string;
    created_at: string;
    updated_at: string;
}

export interface BookUpdate {
    title?: string;
    author?: string;
    description?: string;
    cover_image?: string;
    bookshelf_id?: string;
}

export interface BookInShop {
    // Add this type for the search result data
    title: string;
    author: string;
    publishing: string;
    imgUrl: string;
    shopName: string;
}

export interface SearchRequest {
    isbn: string;
    status: 'PENDING' | 'SUCCESS' | 'FAILED';
    books: BookInShop[];
}
