export const validateLocationName = (name: string): boolean => {
    const regex = /^[a-zA-Z0-9-]+$/;
    return regex.test(name);
};