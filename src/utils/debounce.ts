export default function debounce(
  callback: (...args: any) => any,
  delay: number,
) {
  let watcher: NodeJS.Timeout;

  return (...args: any[]) => {
    if (watcher) {
      clearTimeout(watcher);
    }
    watcher = setTimeout(() => callback(...args), delay);
  };
}
