export const fixFirebaseURL = (str: string): string => str.replace(/value.jpg[\d]alt=media/, 'value.jpg?alt=media');