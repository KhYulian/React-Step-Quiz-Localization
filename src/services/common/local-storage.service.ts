import { LocalStorageKeys } from "../../constants/misc/locale-storage-keys";

/**
 * Helper class to work with local storage
 */
export class LocalStorageService {
  /**
   * Set a value to the local storage. Can work both with strings and objects. If an object is passed it will be turned to a JSON string before writing to local storage
   * @param key
   * @param value
   */
  public setItem(key: LocalStorageKeys, value: string | object): void {
    const valueToWrite =
      typeof value === "string" ? value : JSON.stringify(value);

    localStorage.setItem(key, valueToWrite);
  }

  /**
   * Retrieve a value from a local storage by its key
   * @param key
   * @returns An object if the value stored in local storage is a valid JSON that can be parsed otherwise will return a string
   */
  public getItem<T = string | null | object | object[]>(
    key: LocalStorageKeys,
  ): T {
    const value = localStorage.getItem(key);

    if (!value) return value as T;

    try {
      return JSON.parse(value);
    } catch (error) {
      return value as T;
    }
  }

  /**
   * Remove a value from the local storage by the key
   * @param key
   */
  public removeItem(key: LocalStorageKeys): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear local storage (remove all values)
   */
  public clear(): void {
    localStorage.clear();
  }
}

export const localStorageService = new LocalStorageService();
