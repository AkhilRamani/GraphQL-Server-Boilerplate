export class ObjectUtils {
    static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
        return keys.reduce((result, key) => ({
            ...result,
            [key]: obj[key]
        }), {} as Pick<T, K>);
    }
}