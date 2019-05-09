// Takes an object with key: object
// and returns an array with key mapped to id
// => [{ name: 'fred', id: 123 }]
export const withId = (list) => {
	const mapped = []
  for (let item in list) {
    list[item].id = item
    mapped.push(list[item])
  }
  return mapped;
}

export const toArr = (list) => {
	const mapped = []
  for (let item in list) {
    mapped.push(list[item])
  }
  return mapped;
}
