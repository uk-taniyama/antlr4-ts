export const successHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>TITLE</title>
  <meta charset="UTF-8">
</head>
<body>
  <h1>HEADER</h1>
  <p>TEXT</p>
</body>
</html>
`;
export const lexerErrorHtml = `
<html>
<head>
  <title>TITLE</title>
  <meta charset="UTF-8"
</head>
<body>
  <h1>HEADER</h1>
  <p>TEXT</p>
</body>
</html>
`;
export const parserErrorHtml = `
<html>
<head>
  <title>TITLE</title>
  <meta charset="UTF-8" /
</head>
<body>
  <h1>HEADER</h1>
  <p>TEXT</p>
</body>
</html>
`;
