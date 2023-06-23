export const getPosts = async (params: any) => {
  Object.keys(params).forEach((k) => params[k] === '' && delete params[k]);
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?${new URLSearchParams(params).toString()}`);
  const count = Number(response.headers.get('x-total-count'));
  const data = await response.json();
  return { data, count };
}

export const getPost = async (id: string) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  const post = await response.json();
  return post;
}

export const createPost = async(title: string, body: string, userId: string) => {
  return fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title,
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
