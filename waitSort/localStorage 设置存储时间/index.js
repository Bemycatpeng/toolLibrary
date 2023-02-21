// 存储数据
localStorage.setItem('key', JSON.stringify({ value: 'some data', timestamp: Date.now() }));

// 读取数据
const data = JSON.parse(localStorage.getItem('key'));
if (data) {
  const { value, timestamp } = data;
  const validUntil = timestamp + (24 * 60 * 60 * 1000); // 24 hours
  if (Date.now() > validUntil) {
    localStorage.removeItem('key');
  } else {
    console.log(value);
  }
}
