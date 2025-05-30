import app from './app';

const PORT = process.env.PORT || 11111;

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
