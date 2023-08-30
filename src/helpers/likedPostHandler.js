export const likedPostsHandler = (posts, userId) => {
    const isLikedPosts = posts?.map(post => {
        if (post.likes.includes(userId)) {
            return { ...post, isLiked: true }
        } else {
            return { ...post, isLiked: false }
        }
    })

    return isLikedPosts;
};