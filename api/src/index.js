import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.disable('x-powered-by')

app.post('/fibonacci', (req, res) => {
  const currentTime = new Date();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const fibonacciSeries = generateFibonacciSeries(minutes, seconds);
  res.json({ series: fibonacciSeries });
});

function generateFibonacciSeries(x, y) {
  let fib = [x, y];
  for (let i = 2; i < y + 2
    ; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib.reverse();
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
