export const message = {
  success: (msg: string) => {
    (window as any).$message.success(msg);
  },
  error: (msg: string) => {
    (window as any).$message.error(msg);
  }
};
