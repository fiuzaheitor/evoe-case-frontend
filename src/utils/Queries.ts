export const createUser = async (data: any) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const res = await response.json()

  return res
}

export const getUser = async (id: string, fields?: string) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}?fields=${fields}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  const res = await response.json()

  return res
}

export const updateUser = async (id: string, data: any) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  return response
}
