
const NormalizeData = (snapshot) => {
     const result = {};
    snapshot.forEach(likeObj => {
      const value = Object.values(likeObj)[0];
      const { postId, userId } = value;

      if (!result[postId]) result[postId] = {};
      result[postId][userId] = value;
    });
    return result;
}

export default NormalizeData