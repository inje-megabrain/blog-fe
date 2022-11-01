type IObject<T extends {}> = T & {};

export default function bindObject<T extends {}>(object: IObject<T>) {
  const binded: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(object)) {
    if (value instanceof Function) {
      binded[key] = (value as Function).bind(binded);
    } else {
      binded[key] = value;
    }
  }

  return binded as T;
}
