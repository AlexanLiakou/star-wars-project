// Extract an id number from url
export const idFromUrl = (url: string): string =>{
    return url.split('/').filter(Boolean).pop() ?? '';
};