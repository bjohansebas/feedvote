/**
 * Takes a name as input and returns the initials of the name as a string.
 * If the name is empty or only contains whitespace, it returns 'SB'.
 * The function splits the name into an array of words and then concatenates
 * the first letter of each word to form the initials.
 *
 * @param name - The name from which to generate the initials.
 * @returns The initials of the input name.
 */
export function stringAvatar(name: string): string {
  const nameDivided = name.split(' ')
  let result = ''

  if (!nameDivided[0]?.[0]) {
    return 'SB'
  }

  result += nameDivided[0][0]

  if (nameDivided[1]?.length) {
    result += nameDivided[1][0]
  }

  return result
}
