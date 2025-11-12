/**
 * Загружает данные из localStorage по указанному ключу
 * @param key - Ключ для хранения данных в localStorage
 * @param defaultValue - Значение по умолчанию, если данных нет или произошла ошибка
 * @returns Загруженные данные или значение по умолчанию
 */
export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored) as T;
    }
  } catch (error) {
    console.error(`Failed to load data from localStorage with key "${key}":`, error);
  }
  return defaultValue;
}

/**
 * Сохраняет данные в localStorage по указанному ключу
 * @param key - Ключ для хранения данных в localStorage
 * @param data - Данные для сохранения
 */
export function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Failed to save data to localStorage with key "${key}":`, error);
  }
}

/**
 * Удаляет данные из localStorage по указанному ключу
 * @param key - Ключ для удаления из localStorage
 */
export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove data from localStorage with key "${key}":`, error);
  }
}
