export function chunkData(data: any[], max = 10): Array<any> {
  const result: any[] = [];

  for (let i = 0; i < data.length; i = i + max) {
    result.push(data.slice(i, i + max));
  }

  return result;
}
