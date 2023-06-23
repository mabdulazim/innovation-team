export const getUsers = async () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((json) => json);
}

export const getUser = async (id: string) => {
  return fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
  .then((response) => response.json())
  .then((json) => json);
}
