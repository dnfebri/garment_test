<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="icon" type="image/x-icon" href="/favicon.svg">
  @viteReactRefresh
  @vite('resources/css/app.css')
  @vite('resources/js/app.jsx')
  <title>Garment_test</title>
</head>
<body>
  {{-- <noscript>You need to enable JavaScript to run this app.</noscript>
    <script>
      if (localStorage.getItem('sidebar-expanded') == 'true') {
          document.querySelector('body').classList.add('sidebar-expanded');
      } else {
          document.querySelector('body').classList.remove('sidebar-expanded');
      }
    </script>   --}}
  <div id="app"></div>
  <script>

    var APP_URL_API = '{{ env('APP_URL_API') }}';
  
  </script>
</body>
</html>