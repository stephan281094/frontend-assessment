export function cx(...args: Array<string | undefined | false>) {
  return args.filter((arg) => arg && typeof arg === "string").join(" ");
}
