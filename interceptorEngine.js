const interceptors = [];

function registerInterceptor(fn) {
  interceptors.push(fn);
}

function runInterceptors(context) {
  for (const interceptor of interceptors) {
    const result = interceptor(context);
    if (result !== true) {
      throw new Error(`Interceptor blocked submission: ${result}`);
    }
  }
}

module.exports = { registerInterceptor, runInterceptors };
