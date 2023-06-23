export const getComments = async (id: string, params: any) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments?${new URLSearchParams(params).toString()}`);
  const count = Number(response.headers.get('x-total-count'));
  const data = await response.json();
  return { data, count };
}

export const createComment = async(postId: string, body: string, userId: string) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
    method: 'POST',
    body: JSON.stringify({
      body,
      userId: Number(userId),
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response) => response.json())
  .then((json) => json);
}
