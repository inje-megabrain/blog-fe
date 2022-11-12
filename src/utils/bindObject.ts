type IObject<T extends {}> = T & {};

export default function bindObject<T extends {}>(
  object: IObject<T>,
  target?: any,
) {
  const binder: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(object)) {
    if (value instanceof Function) {
      binder[key] = (value as Function).bind(!target ? binder : target);
    } else {
      binder[key] = value;
    }
  }

  return binder as T;
}
